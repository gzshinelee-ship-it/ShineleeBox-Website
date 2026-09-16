const DEFAULT_T6_RATE_ENDPOINT = 'https://gzch.t6soft.com/api/order/searchChannelPrice';
const PRODUCT = Object.freeze({
  sku: 'CS-007',
  piecesPerCarton: 30,
  cartonLengthCm: 49,
  cartonWidthCm: 36,
  cartonHeightCm: 46,
  cartonWeightKg: 12
});

function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(JSON.stringify(body));
}

function asNumber(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function asText(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
  }
  return '';
}

function collectRateRows(payload) {
  const candidates = [
    payload?.data,
    payload?.datas,
    payload?.result,
    payload?.rows,
    payload?.data?.rows,
    payload?.data?.list,
    payload?.data?.data
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
}

function normalizeRate(row, index) {
  const freight = asNumber(row.freight, row.freightamt, row.freightAmount);
  const fuel = asNumber(row.fuel, row.fuelfee, row.fuelFee) || 0;
  const extra = asNumber(row.extrafees, row.extraFees, row.otherfee, row.otherFee) || 0;
  const amount = asNumber(
    row.totalamount,
    row.totalAmount,
    row.totalamt,
    row.total,
    row.amount,
    row.receivable,
    row.price,
    row.quotation,
    freight === null ? null : freight + fuel + extra
  );

  if (amount === null || amount < 0) return null;

  return {
    id: asText(row.channelid, row.channelId, row.code, row.id) || `rate-${index + 1}`,
    service: asText(row.channelname, row.channelName, row.cname, row.name, row.service) || `Shipping option ${index + 1}`,
    amount,
    currency: asText(row.currencycode, row.currencyCode, row.currency, row.coincode) || 'CNY',
    transitTime: asText(row.timeliness, row.transitTime, row.aging, row.deliverytime, row.deliveryTime, row.day),
    chargeableWeightKg: asNumber(row.chargeweight, row.chargeWeight, row.billingweight, row.billingWeight),
    remark: asText(row.remark, row.note, row.remarks)
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  const customerCode = process.env.T6_CUSTOMER_CODE;
  const apiToken = process.env.T6_API_TOKEN;
  const endpoint = process.env.T6_RATE_ENDPOINT || DEFAULT_T6_RATE_ENDPOINT;

  if (!customerCode || !apiToken) {
    return sendJson(res, 503, {
      ok: false,
      code: 'SHIPPING_NOT_CONFIGURED',
      message: 'Live shipping rates are being configured. Please request a manual quote.'
    });
  }

  const cartons = Number.parseInt(req.body?.cartons, 10);
  const countryCode = asText(req.body?.countryCode).toUpperCase();
  const city = asText(req.body?.city).slice(0, 80);
  const postalCode = asText(req.body?.postalCode).slice(0, 20);

  if (!Number.isInteger(cartons) || cartons < 2 || cartons > 99) {
    return sendJson(res, 400, { ok: false, message: 'Carton quantity must be between 2 and 99.' });
  }
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return sendJson(res, 400, { ok: false, message: 'Please select a valid destination country.' });
  }
  if (!postalCode) {
    return sendJson(res, 400, { ok: false, message: 'Destination postal code is required.' });
  }

  const totalWeightKg = cartons * PRODUCT.cartonWeightKg;
  const totalVolumeM3 = cartons * PRODUCT.cartonLengthCm * PRODUCT.cartonWidthCm * PRODUCT.cartonHeightCm / 1000000;
  const payload = {
    authorization: { code: customerCode, token: apiToken },
    datas: [{
      order: {
        number: cartons,
        forecastweight: totalWeightKg,
        forecastsquare: Number(totalVolumeM3.toFixed(4)),
        countrycode: countryCode,
        consigneecity: city,
        consigneezipcode: postalCode,
        isbattery: 0,
        ismagnet: 0,
        isliquid: 0,
        ispowder: 0,
        packagetypecode: 'C',
        goodstypecode: 'WPX'
      },
      volumes: [{
        prenum: cartons,
        prelength: PRODUCT.cartonLengthCm,
        prewidth: PRODUCT.cartonWidthCm,
        preheight: PRODUCT.cartonHeightCm,
        prerweight: PRODUCT.cartonWeightKg
      }]
    }]
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const rawText = await response.text();
    let upstream;
    try {
      upstream = JSON.parse(rawText);
    } catch {
      upstream = null;
    }

    if (!response.ok || !upstream) {
      return sendJson(res, 502, {
        ok: false,
        code: 'T6_UPSTREAM_ERROR',
        message: 'The shipping provider did not return a valid rate. Please try again or request a manual quote.'
      });
    }

    if (upstream.code !== undefined && Number(upstream.code) !== 0) {
      return sendJson(res, 422, {
        ok: false,
        code: 'T6_RATE_REJECTED',
        message: asText(upstream.msg, upstream.message) || 'No live shipping rate was returned for this destination.'
      });
    }

    const options = collectRateRows(upstream)
      .map(normalizeRate)
      .filter(Boolean)
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 8);

    if (!options.length) {
      return sendJson(res, 422, {
        ok: false,
        code: 'NO_RATES',
        message: 'No automatic rate was returned. Please request a manual shipping quote.'
      });
    }

    return sendJson(res, 200, {
      ok: true,
      product: PRODUCT.sku,
      shipment: {
        cartons,
        pieces: cartons * PRODUCT.piecesPerCarton,
        totalWeightKg,
        totalVolumeM3: Number(totalVolumeM3.toFixed(4))
      },
      options
    });
  } catch (error) {
    return sendJson(res, 502, {
      ok: false,
      code: error?.name === 'AbortError' ? 'T6_TIMEOUT' : 'T6_CONNECTION_ERROR',
      message: 'Live shipping rates are temporarily unavailable. Please try again or request a manual quote.'
    });
  }
};

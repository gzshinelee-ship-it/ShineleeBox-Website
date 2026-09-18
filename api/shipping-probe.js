const ENDPOINT = 'https://gzch.t6soft.com/api/searchChannelPrice';
const PROBE_KEY = 'slb-t6-20260918-diagnostic';

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' || req.query?.key !== PROBE_KEY) {
    return send(res, 404, { ok: false });
  }

  const customerCode = process.env.T6_CUSTOMER_CODE;
  const apiToken = process.env.T6_API_TOKEN;
  const endpoint = process.env.T6_RATE_ENDPOINT || ENDPOINT;

  if (!customerCode || !apiToken) {
    return send(res, 503, { ok: false, stage: 'configuration', code: 'MISSING_ENV' });
  }

  const payload = {
    authorization: { code: customerCode, token: apiToken },
    datas: [{
      order: {
        number: 2,
        forecastweight: 24,
        forecastsquare: 0.1623,
        countrycode: 'US',
        consigneecity: 'Los Angeles',
        consigneezipcode: '90001',
        isbattery: 0,
        ismagnet: 0,
        isliquid: 0,
        ispowder: 0,
        packagetypecode: 'C',
        goodstypecode: 'WPX'
      },
      volumes: [{ prenum: 2, prelength: 49, prewidth: 36, preheight: 46, prerweight: 12 }]
    }]
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timer);

    const text = await response.text();
    let result = null;
    try { result = JSON.parse(text); } catch {}

    const rows = Array.isArray(result?.data) ? result.data
      : Array.isArray(result?.datas) ? result.datas
      : Array.isArray(result?.result) ? result.result
      : Array.isArray(result?.rows) ? result.rows
      : [];

    return send(res, response.ok ? 200 : 502, {
      ok: response.ok,
      stage: 'upstream-response',
      httpStatus: response.status,
      parsedJson: Boolean(result),
      upstreamCode: result?.code ?? null,
      upstreamMessage: String(result?.msg || result?.message || '').slice(0, 300),
      rateRows: rows.length
    });
  } catch (error) {
    return send(res, 502, {
      ok: false,
      stage: 'connection',
      errorName: error?.name || 'Error',
      errorMessage: String(error?.message || '').slice(0, 200),
      causeCode: String(error?.cause?.code || '').slice(0, 80),
      causeMessage: String(error?.cause?.message || '').slice(0, 200)
    });
  }
};

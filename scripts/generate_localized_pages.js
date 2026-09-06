const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const common = {
  es: {
    lang: 'es', dir: 'ltr', locale: 'es_ES', label: 'Español',
    nav: ['Inicio', 'Productos', 'Chocolate y alimentos', 'Ramadán y Eid', 'Cajas con formas', 'Contacto'],
    links: ['/es/', '/es/productos/', '/es/envases-chocolate-alimentos/', '/es/envases-ramadan-eid/', '/es/cajas-formas-personalizadas/', '/es/contacto/'],
    eyebrow: 'Fabricante directo en Guangzhou',
    proof: ['MOQ desde 50 uds.*', 'Muestra gratuita', 'Muestra en 5–7 días', 'Respuesta en 2 horas'],
    processTitle: 'Del concepto de IA a una muestra física',
    process: 'Envíenos una imagen conceptual generada con IA, un boceto o una referencia. Nuestro equipo evalúa la viabilidad, desarrolla la estructura, los materiales y el inserto, y prepara una muestra física para comprobar el aspecto, el ajuste y la experiencia de apertura antes de la producción.',
    processNote: 'Si la imagen de IA contiene uniones, formas o acabados imposibles, proponemos ajustes fabricables manteniendo la dirección creativa.',
    factsTitle: 'Datos de compra',
    facts: ['MOQ general desde 50 unidades; algunos diseños requieren más.', 'Muestra personalizada gratuita: normalmente 5–7 días.', 'Producción estándar: normalmente 20–25 días tras la aprobación.', 'Logotipo, tamaño, color, estructura e inserto personalizables.', 'Fábrica de origen en Panyu, Guangzhou; certificaciones BSCI y FSC.'],
    faqTitle: 'Preguntas frecuentes',
    cta: 'Solicitar presupuesto', ctaLead: 'Envíenos medidas, cantidad, concepto o arte y país de destino. Respondemos a consultas cualificadas en 2 horas.',
    footer: 'Fabricación de envases rígidos personalizados para marcas globales.',
    disclaimer: '*El MOQ final depende de la estructura, el tamaño, los materiales y el acabado.'
  },
  ar: {
    lang: 'ar', dir: 'rtl', locale: 'ar_AR', label: 'العربية',
    nav: ['الرئيسية', 'المنتجات', 'تغليف الشوكولاتة والأغذية', 'تغليف رمضان والعيد', 'العلب ذات الأشكال الخاصة', 'اتصل بنا'],
    links: ['/ar/', '/ar/products/', '/ar/chocolate-food-packaging/', '/ar/ramadan-eid-packaging/', '/ar/custom-shape-boxes/', '/ar/contact/'],
    eyebrow: 'مصنّع مباشر في قوانغتشو',
    proof: ['الحد الأدنى يبدأ من 50 قطعة*', 'عينة مجانية', 'العينة خلال 5–7 أيام', 'الرد خلال ساعتين'],
    processTitle: 'من فكرة مصممة بالذكاء الاصطناعي إلى عينة حقيقية',
    process: 'أرسل لنا صورة مفهوم مولّدة بالذكاء الاصطناعي أو رسماً أو مرجعاً. يراجع فريقنا قابلية التصنيع ويطوّر الهيكل والخامات والبطانة الداخلية، ثم يصنع عينة فعلية لاختبار الشكل وملاءمة المنتج وتجربة الفتح قبل الإنتاج.',
    processNote: 'إذا احتوت صورة الذكاء الاصطناعي على وصلات أو أشكال أو تشطيبات غير قابلة للتنفيذ، نقترح تعديلات عملية مع الحفاظ على الاتجاه الإبداعي.',
    factsTitle: 'معلومات الشراء',
    facts: ['الحد الأدنى العام يبدأ من 50 قطعة، وقد تتطلب بعض التصاميم كمية أكبر.', 'عينة مخصصة مجانية خلال 5–7 أيام عادةً.', 'الإنتاج القياسي خلال 20–25 يوماً عادةً بعد الموافقة.', 'إمكانية تخصيص الشعار والمقاس واللون والهيكل والبطانة.', 'مصنع مباشر في بانيو، قوانغتشو، حاصل على BSCI وFSC.'],
    faqTitle: 'الأسئلة الشائعة',
    cta: 'اطلب عرض سعر', ctaLead: 'أرسل المقاسات والكمية والفكرة أو التصميم وبلد الوجهة. نرد على الاستفسارات المؤهلة خلال ساعتين.',
    footer: 'تصنيع علب هدايا صلبة مخصصة للعلامات التجارية العالمية.',
    disclaimer: '*تعتمد الكمية النهائية على الهيكل والمقاس والخامات والتشطيب.'
  }
};

const pages = {
  home: {
    out: {es:'es/index.html', ar:'ar/index.html'}, en:'/',
    es: {title:'Fabricante de Cajas de Regalo Personalizadas | ShineleeBox', description:'Fabricante de cajas rígidas, calendarios de Adviento y packaging interactivo. MOQ desde 50, muestra gratuita y diseño desde conceptos de IA.', h1:'Packaging personalizado que convierte una idea en una experiencia', lead:'Diseñamos y fabricamos cajas rígidas, calendarios de Adviento, packaging interactivo y regalos premium para marcas internacionales.', answer:'ShineleeBox es un fabricante de packaging personalizado en Panyu, Guangzhou. Desarrollamos cajas desde las medidas del producto, una referencia o un concepto de IA, con muestra física antes de producción.', useTitle:'Soluciones principales', uses:['Cajas rígidas premium','Calendarios de Adviento','Packaging interactivo con vídeo, luz o sonido','Packaging para alimentos, belleza, joyería y bebidas'], faq:[['¿Qué fabrica ShineleeBox?','Cajas rígidas, calendarios de Adviento, packaging interactivo, cajas de formas especiales y soluciones para regalos de marca.'],['¿Pueden trabajar desde un concepto de IA?','Sí. Revisamos la viabilidad y convertimos el concepto en una estructura fabricable y una muestra física.']]},
    ar: {title:'مصنع علب هدايا مخصصة وتغليف فاخر | ShineleeBox', description:'مصنع علب صلبة وتقويمات أدفنت وتغليف تفاعلي. حد أدنى يبدأ من 50 قطعة، عينة مجانية وتحويل أفكار الذكاء الاصطناعي إلى عينات.', h1:'تغليف مخصص يحوّل الفكرة إلى تجربة', lead:'نصمم ونصنع العلب الصلبة وتقويمات أدفنت والتغليف التفاعلي وعلب الهدايا الفاخرة للعلامات التجارية العالمية.', answer:'ShineleeBox مصنع تغليف مخصص في بانيو، قوانغتشو. نطوّر العلبة من مقاسات المنتج أو مرجع أو فكرة بالذكاء الاصطناعي، مع عينة فعلية قبل الإنتاج.', useTitle:'حلولنا الرئيسية', uses:['علب هدايا صلبة فاخرة','تقويمات أدفنت','تغليف تفاعلي بالفيديو أو الضوء أو الصوت','تغليف الأغذية والجمال والمجوهرات والمشروبات'], faq:[['ماذا تصنع ShineleeBox؟','نصنع العلب الصلبة وتقويمات أدفنت والتغليف التفاعلي والعلب ذات الأشكال الخاصة وحلول هدايا العلامات التجارية.'],['هل يمكنكم العمل من فكرة بالذكاء الاصطناعي؟','نعم. نراجع قابلية التنفيذ ونحوّل الفكرة إلى هيكل قابل للتصنيع وعينة فعلية.']]}
  },
  products: {
    out:{es:'es/productos/index.html',ar:'ar/products/index.html'}, en:'/products/',
    es:{title:'Cajas Personalizadas al por Mayor | Catálogo ShineleeBox',description:'Catálogo de cajas rígidas, calendarios de Adviento, cajas con formas y packaging interactivo personalizado para marcas. MOQ desde 50 unidades.',h1:'Cajas personalizadas para marcas y mayoristas',lead:'Explore estructuras de packaging premium y solicite una adaptación a las medidas, el producto y la identidad de su marca.',answer:'Nuestro catálogo incluye cajas rígidas magnéticas, con cajón, tapa y base, plegables, redondas, maletín, formas especiales, calendarios y packaging interactivo.',useTitle:'Tipos de producto',uses:['Cajas magnéticas, con cajón y tapa-base','Cajas plegables, redondas y tipo maletín','Cajas con formas especiales','Calendarios y packaging interactivo'],faq:[['¿Se puede personalizar cualquier producto?','Sí. Revisamos tamaño, estructura, inserto, papel, impresión y acabado para el proyecto.'],['¿Cuál es el MOQ?','Empieza desde 50 unidades para estructuras elegibles; los diseños complejos pueden requerir más.']]},
    ar:{title:'كتالوج علب مخصصة بالجملة | ShineleeBox',description:'كتالوج علب صلبة وتقويمات أدفنت وعلب بأشكال خاصة وتغليف تفاعلي للعلامات التجارية. الحد الأدنى يبدأ من 50 قطعة.',h1:'علب مخصصة للعلامات التجارية وتجار الجملة',lead:'استكشف هياكل التغليف الفاخرة واطلب تكييف التصميم مع مقاسات منتجك وهوية علامتك.',answer:'يشمل الكتالوج علباً مغناطيسية وبأدراج وغطاء وقاعدة وقابلة للطي ودائرية وحقائب وأشكالاً خاصة وتقويمات وتغليفاً تفاعلياً.',useTitle:'أنواع المنتجات',uses:['علب مغناطيسية وبأدراج وغطاء وقاعدة','علب قابلة للطي ودائرية وحقائب','علب بأشكال خاصة','تقويمات وتغليف تفاعلي'],faq:[['هل يمكن تخصيص كل منتج؟','نعم. نراجع المقاس والهيكل والبطانة والورق والطباعة والتشطيب.'],['ما الحد الأدنى للطلب؟','يبدأ من 50 قطعة للهياكل المناسبة، وقد تتطلب التصاميم المعقدة كمية أكبر.']]}
  },
  chocolate: {
    out:{es:'es/envases-chocolate-alimentos/index.html',ar:'ar/chocolate-food-packaging/index.html'}, en:'/applications/chocolate-and-food-packaging.html',
    es:{title:'Cajas para Chocolate y Alimentos Personalizadas | ShineleeBox',description:'Cajas personalizadas para chocolate, dátiles y alimentos premium con compartimentos y materiales aptos para contacto alimentario. MOQ desde 50.',h1:'Packaging personalizado para chocolate, dátiles y alimentos',lead:'Cajas rígidas premium, compartimentos e insertos desarrollados según el tamaño, peso, recuento y presentación del alimento.',answer:'Podemos diseñar cajas para chocolate y dátiles con papel alimentario u otra capa primaria adecuada. El cartón gris aporta la estructura exterior y normalmente no es la superficie de contacto directo.',useTitle:'Aplicaciones habituales',uses:['Bombones y trufas','Dátiles y surtidos de Ramadán','Galletas, dulces y postres','Sets gourmet y regalos corporativos'],faq:[['¿El alimento puede tocar la caja?','Debe especificarse una capa apta para contacto alimentario según el alimento y el mercado de destino.'],['¿Pueden diseñar los compartimentos?','Sí. Envíe medidas, recuento, peso y patrón de colocación.']]},
    ar:{title:'علب شوكولاتة وتمور وأغذية مخصصة | ShineleeBox',description:'علب مخصصة للشوكولاتة والتمور والأغذية الفاخرة مع فواصل وخامات مناسبة لملامسة الغذاء. الحد الأدنى يبدأ من 50 قطعة.',h1:'تغليف مخصص للشوكولاتة والتمور والأغذية',lead:'علب صلبة فاخرة وفواصل وبطانات مطوّرة حسب مقاس المنتج ووزنه وعدده وطريقة عرضه.',answer:'يمكننا تصميم علب شوكولاتة وتمور مع ورق مخصص لملامسة الغذاء أو طبقة أولية مناسبة. يوفر اللوح الرمادي الهيكل الخارجي ولا يكون عادةً سطح الملامسة المباشرة.',useTitle:'الاستخدامات الشائعة',uses:['الشوكولاتة والترفيل','التمور وتشكيلات رمضان','البسكويت والحلويات','مجموعات الأطعمة الفاخرة وهدايا الشركات'],faq:[['هل يمكن أن يلامس الطعام العلبة؟','يجب تحديد طبقة مناسبة لملامسة الغذاء حسب نوع الطعام ومتطلبات سوق الوجهة.'],['هل يمكن تصميم الفواصل؟','نعم. أرسل المقاسات والعدد والوزن وطريقة الترتيب.']]}
  },
  ramadan: {
    out:{es:'es/envases-ramadan-eid/index.html',ar:'ar/ramadan-eid-packaging/index.html'}, en:'/holiday-occasions/ramadan-and-eid-packaging.html',
    es:{title:'Cajas Personalizadas para Ramadán y Eid al por Mayor',description:'Packaging personalizado para Ramadán y Eid: cajas para dátiles, chocolate, oud y regalos corporativos. Muestra gratuita y logo personalizado.',h1:'Cajas personalizadas para Ramadán y Eid',lead:'Packaging rígido para dátiles, chocolate, oud y regalos premium, desarrollado según el producto, la marca y el calendario de entrega.',answer:'Fabricamos cajas de Ramadán y Eid con tamaños, compartimentos, colores, acabados y logotipo personalizados. Para alimentos se especifica por separado la capa de contacto alimentario.',useTitle:'Packaging para la temporada',uses:['Cajas para dátiles y chocolate','Cajas para oud y fragancias','Regalos corporativos de Eid','Formas de media luna, arco y geometrías especiales'],faq:[['¿Pueden crear una caja para 1 kg de dátiles?','Sí. El tamaño debe validarse con la variedad, las dimensiones, el recuento y una prueba de llenado.'],['¿Cuándo debo empezar?','Incluya tiempo para ingeniería, muestra, aprobación, producción y transporte antes de la fecha requerida.']]},
    ar:{title:'علب رمضان والعيد المخصصة بالجملة | ShineleeBox',description:'تغليف مخصص لرمضان والعيد للتمور والشوكولاتة والعود وهدايا الشركات. عينة مجانية وشعار مخصص وتصنيع مباشر.',h1:'علب مخصصة لرمضان وعيد الفطر',lead:'تغليف صلب للتمور والشوكولاتة والعود والهدايا الفاخرة، مطوّر حسب المنتج والعلامة التجارية وموعد التسليم.',answer:'نصنع علب رمضان والعيد بمقاسات وفواصل وألوان وتشطيبات وشعار مخصص. بالنسبة للأغذية، يتم تحديد طبقة ملامسة الغذاء بصورة مستقلة.',useTitle:'تغليف الموسم',uses:['علب التمور والشوكولاتة','علب العود والعطور','هدايا الشركات للعيد','أشكال الهلال والقوس والأشكال الهندسية الخاصة'],faq:[['هل يمكن صنع علبة لكيلوغرام واحد من التمور؟','نعم. يجب تأكيد المقاس حسب نوع التمر وأبعاده وعدده واختبار التعبئة.'],['متى يجب أن أبدأ؟','ضع وقتاً للهندسة والعينة والموافقة والإنتاج والنقل قبل موعد التسليم.']]}
  },
  shapes: {
    out:{es:'es/cajas-formas-personalizadas/index.html',ar:'ar/custom-shape-boxes/index.html'}, en:'/products/rigid-boxes/custom-shape-boxes.html',
    es:{title:'Fabricante de Cajas con Formas Personalizadas | ShineleeBox',description:'Cajas rígidas con formas de corazón, estrella, arco o media luna, desarrolladas desde su producto o concepto de IA. Muestra física gratuita.',h1:'Cajas rígidas con formas personalizadas',lead:'Convertimos siluetas no estándar y experiencias de apertura creativas en estructuras fabricables con insertos ajustados.',answer:'Una caja con forma personalizada debe resolver la silueta, la apertura, las tolerancias, el forrado y el soporte del producto. Podemos empezar desde un concepto de IA y crear una muestra física.',useTitle:'Formas y aplicaciones',uses:['Corazón, estrella, arco y media luna','Chocolate, dátiles y alimentos premium','Perfume, cosmética y joyería','Regalos promocionales y ediciones de temporada'],faq:[['¿Qué formas se pueden fabricar?','La viabilidad depende del tamaño, la apertura, la construcción y el forrado; evaluamos cada concepto.'],['¿Incluyen insertos a medida?','Sí. El inserto se diseña según las dimensiones, el peso y la orientación del producto.']]},
    ar:{title:'مصنع علب هدايا بأشكال مخصصة | ShineleeBox',description:'علب صلبة بشكل قلب أو نجمة أو قوس أو هلال، مطورة من منتجك أو فكرة ذكاء اصطناعي، مع عينة فعلية مجانية.',h1:'علب هدايا صلبة بأشكال مخصصة',lead:'نحوّل الأشكال غير القياسية وتجارب الفتح الإبداعية إلى هياكل قابلة للتصنيع مع بطانات ملائمة للمنتج.',answer:'يجب أن تحل العلبة ذات الشكل الخاص مسائل الشكل والفتح والتفاوتات والتغليف ودعم المنتج. يمكننا البدء من فكرة بالذكاء الاصطناعي وصنع عينة فعلية.',useTitle:'الأشكال والاستخدامات',uses:['القلب والنجمة والقوس والهلال','الشوكولاتة والتمور والأغذية الفاخرة','العطور ومستحضرات التجميل والمجوهرات','الهدايا الترويجية والمواسم'],faq:[['ما الأشكال التي يمكن تصنيعها؟','تعتمد القابلية على المقاس والفتح والبناء والتغليف، ونراجع كل فكرة.'],['هل تشمل بطانات مخصصة؟','نعم. نصمم البطانة حسب مقاسات المنتج ووزنه واتجاه عرضه.']]}
  },
  contact: {
    out:{es:'es/contacto/index.html',ar:'ar/contact/index.html'}, en:'/contact.html',
    es:{title:'Muestra Gratuita y Presupuesto en 2 Horas | ShineleeBox',description:'Solicite una muestra gratuita y precio de fábrica para packaging personalizado. Envíe medidas, cantidad, concepto y destino; respuesta en 2 horas.',h1:'Solicite una muestra y un presupuesto',lead:'Cuéntenos qué necesita envasar. Revisaremos la estructura, el inserto, el acabado, la cantidad y el calendario del proyecto.',answer:'Para recibir una primera respuesta útil, envíe las dimensiones y el peso del producto, la cantidad, el concepto o arte, el país de destino y la fecha requerida.',useTitle:'Incluya estos datos',uses:['Medidas, peso y cantidad de productos','Cantidad de cajas requerida','Concepto de IA, boceto o logotipo','País de destino y fecha de entrega'],faq:[['¿Cuándo recibiré respuesta?','Respondemos a consultas cualificadas en 2 horas.'],['¿Cómo contacto con ShineleeBox?','Escriba a info@slpack.net o use WhatsApp en +86 188 1884 0878.']]},
    ar:{title:'عينة مجانية وعرض سعر خلال ساعتين | ShineleeBox',description:'اطلب عينة مجانية وسعر مصنع للتغليف المخصص. أرسل المقاسات والكمية والفكرة والوجهة، وسنرد خلال ساعتين.',h1:'اطلب عينة وعرض سعر',lead:'أخبرنا بما تريد تغليفه. سنراجع الهيكل والبطانة والتشطيب والكمية والجدول الزمني للمشروع.',answer:'للحصول على رد أولي مفيد، أرسل مقاسات المنتج ووزنه والكمية والفكرة أو التصميم وبلد الوجهة وموعد التسليم المطلوب.',useTitle:'أرسل هذه المعلومات',uses:['مقاسات المنتجات وأوزانها وعددها','كمية العلب المطلوبة','فكرة بالذكاء الاصطناعي أو رسم أو شعار','بلد الوجهة وموعد التسليم'],faq:[['متى سأحصل على رد؟','نرد على الاستفسارات المؤهلة خلال ساعتين.'],['كيف أتواصل مع ShineleeBox؟','راسل info@slpack.net أو واتساب على +86 188 1884 0878.']]}
  }
};

function escJson(value){return JSON.stringify(value).replace(/</g,'\\u003c')}
function render(key, lang){
  const c=common[lang], p=pages[key], d=p[lang], canonical=`https://slpack.net/${p.out[lang].replace(/index\.html$/,'')}`;
  const alternates={en:`https://slpack.net${p.en}`,es:`https://slpack.net/${p.out.es.replace(/index\.html$/,'')}`,ar:`https://slpack.net/${p.out.ar.replace(/index\.html$/,'')}`};
  const faq=d.faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}));
  const json={"@context":"https://schema.org","@graph":[{"@type":key==='contact'?'ContactPage':'WebPage',"@id":`${canonical}#webpage`,url:canonical,name:d.title,description:d.description,inLanguage:c.lang},{"@type":"FAQPage",mainEntity:faq}]};
  const nav=c.nav.map((n,i)=>`<a href="https://slpack.net${c.links[i]}" class="hover:text-gold">${n}</a>`).join('');
  const uses=d.uses.map(x=>`<li>${x}</li>`).join('');
  const facts=c.facts.map(x=>`<li>${x}</li>`).join('');
  const faqHtml=d.faq.map(([q,a])=>`<article><h3>${q}</h3><p>${a}</p></article>`).join('');
  return `<!doctype html>
<html lang="${c.lang}" dir="${c.dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${d.title}</title><meta name="description" content="${d.description}"><link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${alternates.en}"><link rel="alternate" hreflang="es" href="${alternates.es}"><link rel="alternate" hreflang="ar" href="${alternates.ar}"><link rel="alternate" hreflang="x-default" href="${alternates.en}">
<meta property="og:type" content="website"><meta property="og:locale" content="${c.locale}"><meta property="og:title" content="${d.title}"><meta property="og:description" content="${d.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://slpack.net/images/products/CS-007_half-moon-date-gift-box/lifestyle-ramadan-v2.jpg">
<script type="application/ld+json">${escJson(json)}</script><link rel="stylesheet" href="https://slpack.net/assets/localized-pages.css"></head>
<body><div class="alert">BSCI · FSC · MOQ 50+ · Guangzhou Manufacturer</div><header><a class="brand" href="https://slpack.net${c.links[0]}">ShineleeBox<small>${c.eyebrow}</small></a><nav>${nav}</nav><div class="languages"><a href="${alternates.en}">EN</a><a href="${alternates.es}">ES</a><a href="${alternates.ar}">العربية</a></div></header>
<main><section class="hero"><div><span>${c.eyebrow}</span><h1>${d.h1}</h1><p>${d.lead}</p><a class="button" href="https://slpack.net${c.links[5]}">${c.cta}</a></div><img src="https://slpack.net/images/products/CS-007_half-moon-date-gift-box/lifestyle-ramadan-v2.jpg" alt="${d.h1}" width="1600" height="1200"></section>
<section class="answer"><strong>${lang==='es'?'Respuesta directa':'إجابة مباشرة'}</strong><p>${d.answer}</p></section>
<section class="proof">${c.proof.map(x=>`<div>${x}</div>`).join('')}</section>
<section class="two"><div><h2>${d.useTitle}</h2><ul>${uses}</ul></div><div><h2>${c.processTitle}</h2><p>${c.process}</p><p>${c.processNote}</p></div></section>
<section class="facts"><h2>${c.factsTitle}</h2><ul>${facts}</ul><small>${c.disclaimer}</small></section>
<section class="faq"><h2>${c.faqTitle}</h2><div>${faqHtml}</div></section>
<section class="cta"><h2>${c.cta}</h2><p>${c.ctaLead}</p><a class="button" href="mailto:info@slpack.net">info@slpack.net</a><a class="button outline" href="https://wa.me/8618818840878">WhatsApp</a></section></main>
<footer><strong>ShineleeBox</strong><p>${c.footer}</p><p>info@slpack.net · +86 188 1884 0878</p></footer></body></html>`;
}

for(const [key,p] of Object.entries(pages)) for(const lang of ['es','ar']){
  const target=path.join(root,p.out[lang]); fs.mkdirSync(path.dirname(target),{recursive:true}); fs.writeFileSync(target,render(key,lang));
}

const englishFiles={home:'index.html',products:'products/index.html',chocolate:'applications/chocolate-and-food-packaging.html',ramadan:'holiday-occasions/ramadan-and-eid-packaging.html',shapes:'products/rigid-boxes/custom-shape-boxes.html',contact:'contact.html'};
for(const [key,file] of Object.entries(englishFiles)){
  const p=pages[key], target=path.join(root,file); let html=fs.readFileSync(target,'utf8');
  const marker='<!-- localized-alternates -->';
  const block=`${marker}\n    <link rel="alternate" hreflang="en" href="https://slpack.net${p.en}">\n    <link rel="alternate" hreflang="es" href="https://slpack.net/${p.out.es.replace(/index\.html$/,'')}">\n    <link rel="alternate" hreflang="ar" href="https://slpack.net/${p.out.ar.replace(/index\.html$/,'')}">\n    <link rel="alternate" hreflang="x-default" href="https://slpack.net${p.en}">`;
  if(html.includes(marker)) html=html.replace(/<!-- localized-alternates -->[\s\S]*?<link rel="alternate" hreflang="x-default"[^>]*>/,block); else html=html.replace(/(<link rel="canonical"[^>]*>)/,`$1\n    ${block}`);
  const switcher='<script src="'+('../'.repeat(file.split('/').length-1))+'assets/language-switcher.js" data-language-switcher data-es="https://slpack.net/'+p.out.es.replace(/index\.html$/,'')+'" data-ar="https://slpack.net/'+p.out.ar.replace(/index\.html$/,'')+'"></script>';
  if(html.includes('data-language-switcher')) html=html.replace(/<script src="[^"]*assets\/language-switcher\.js"[^>]*><\/script>/,switcher); else html=html.replace('</body>',switcher+'\n</body>');
  fs.writeFileSync(target,html);
}

const sitemapEntries=[];
for(const p of Object.values(pages)) for(const lang of ['es','ar']) sitemapEntries.push(`  <url>\n    <loc>https://slpack.net/${p.out[lang].replace(/index\.html$/,'')}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p===pages.home?'0.9':'0.8'}</priority>\n  </url>`);
const sitemapPath=path.join(root,'sitemap-i18n.xml');
fs.writeFileSync(sitemapPath,`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`);
console.log(`Generated ${Object.keys(pages).length*2} localized pages, English alternates and i18n sitemap.`);

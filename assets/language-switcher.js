(function(){
  var script=document.currentScript;if(!script)return;
  var box=document.createElement('nav');box.setAttribute('aria-label','Language selector');
  box.style.cssText='position:fixed;left:16px;bottom:16px;z-index:60;background:#fff;border:1px solid #e5ddd0;box-shadow:0 8px 24px #0002;padding:10px 14px;display:flex;gap:12px;font:700 11px/1 Arial,sans-serif;direction:ltr';
  var current=location.pathname;var en=document.createElement('a'),es=document.createElement('a'),ar=document.createElement('a');
  en.href=current.replace(/^\/(es|ar)(\/|$).*/,'/')||'/';en.textContent='EN';es.href=script.dataset.es;es.textContent='ES';ar.href=script.dataset.ar;ar.textContent='العربية';
  [en,es,ar].forEach(function(a){a.style.cssText='color:#5a1f2b;text-decoration:none'});box.append(en,es,ar);document.body.appendChild(box);
})();

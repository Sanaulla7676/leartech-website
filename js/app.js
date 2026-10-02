(() => {
  const D = window.LEARTECH_DATA;
  if (!D) return;
  const money = n => "₹" + Number(n).toLocaleString("en-IN");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function renderShell() {
    const current = document.body.dataset.page || "home";
    document.getElementById("site-header").innerHTML =
      '<div class="topbar"><div class="container topbar-inner"><span>Billing • POS • Thermal Printing • Business Automation</span><span>Chandra Layout, Bengaluru · <a href="tel:+918904997113">08904 997113</a></span></div></div>' +
      '<header class="site-header"><div class="container nav"><a class="brand" href="./index.html">Lear<span>tech</span><small>Automation Ventures</small></a>' +
      '<nav id="siteNav">' +
      '<a class="' + (current==="home"?"active":"") + '" href="./index.html">Home</a>' +
      '<a class="' + (current==="products"?"active":"") + '" href="./products.html">Products</a>' +
      '<a class="' + (current==="industries"?"active":"") + '" href="./industries.html">Industries</a>' +
      '<a class="' + (current==="software"?"active":"") + '" href="./software.html">Software</a>' +
      '<a class="' + (current==="support"?"active":"") + '" href="./support.html">Support</a>' +
      '<a class="' + (current==="about"?"active":"") + '" href="./about.html">About</a>' +
      '<a class="' + (current==="contact"?"active":"") + '" href="./contact.html">Contact</a></nav>' +
      '<div class="nav-actions"><button class="quote-mini js-open-quote" type="button">Quote <span id="cartBadge">0</span></button><a class="btn btn-primary nav-cta" href="./contact.html">Get a quote</a><button class="menu-btn" id="menuBtn" type="button" aria-label="Open menu">Menu</button></div></div></header>';

    const nav=document.getElementById("siteNav");
    document.getElementById("menuBtn").addEventListener("click",()=>nav.classList.toggle("open"));
    nav.addEventListener("click",e=>{if(e.target.tagName==="A")nav.classList.remove("open")});
  }

  function renderFooter() {
    document.getElementById("site-footer").innerHTML =
      '<footer class="footer"><div class="container footer-grid">' +
      '<div><a class="brand footer-brand" href="./index.html">Lear<span>tech</span><small>Automation Ventures</small></a><p>Billing hardware, POS systems, business software and support for modern counters.</p></div>' +
      '<div><h4>Explore</h4><a href="./products.html">Products</a><a href="./industries.html">Industries</a><a href="./software.html">Software</a></div>' +
      '<div><h4>Company</h4><a href="./about.html">About</a><a href="./support.html">Support</a><a href="./contact.html">Contact</a></div>' +
      '<div><h4>Contact</h4><a href="tel:+918904997113">08904 997113</a><a href="mailto:info@leartech.in">info@leartech.in</a><span>Chandra Layout, Bengaluru</span></div>' +
      '</div><div class="container footer-bottom"><span>© 2026 Leartech Automation Ventures</span><span>Built for practical business operations.</span></div></footer>';
  }

  function reveal() {
    const els=document.querySelectorAll(".reveal,.reveal-scale");
    if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("visible"));return}
    const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");io.unobserve(x.target)}}),{threshold:.12});
    els.forEach(e=>io.observe(e));
  }

  function initQuote() {
    let cart=JSON.parse(localStorage.getItem("leartech_cart")||"[]");
    const root=document.createElement("div");
    root.innerHTML='<div class="drawer-overlay" id="drawerOverlay"></div><aside class="quote-drawer" id="quoteDrawer" aria-label="Selected products"><div class="drawer-head"><div><div class="eyebrow">YOUR QUOTE</div><h3>Selected products</h3></div><button class="icon-btn" id="drawerClose" type="button" aria-label="Close">×</button></div><div id="drawerItems" class="drawer-items"></div><div class="drawer-foot"><div class="drawer-total"><span>Estimated total</span><strong id="drawerTotal">₹0</strong></div><button class="btn btn-primary" id="sendQuote" type="button">Send via WhatsApp</button><button class="btn btn-ghost dark-text" id="clearQuote" type="button">Clear</button></div></aside>';
    document.body.appendChild(root);
    const drawer=document.getElementById("quoteDrawer"), overlay=document.getElementById("drawerOverlay");

    const render=()=>{
      const badge=document.getElementById("cartBadge");
      if(badge) badge.textContent=cart.reduce((s,i)=>s+i.qty,0);
      const box=document.getElementById("drawerItems");
      if(!cart.length){box.innerHTML='<div class="empty-state">Your quote drawer is empty.<br>Add products from the catalogue.</div>';document.getElementById("drawerTotal").textContent="₹0";return}
      box.innerHTML=cart.map(i=>'<div class="drawer-item"><img src="./assets/images/'+i.image+'.jpg" alt=""><div><b>'+esc(i.name)+'</b><span>'+money(i.price)+'</span><div class="qty"><button type="button" data-id="'+i.id+'" data-delta="-1">−</button><span>'+i.qty+'</span><button type="button" data-id="'+i.id+'" data-delta="1">+</button></div></div></div>').join("");
      document.getElementById("drawerTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
    };
    const open=()=>{render();drawer.classList.add("open");overlay.classList.add("open");document.body.classList.add("no-scroll")};
    const close=()=>{drawer.classList.remove("open");overlay.classList.remove("open");document.body.classList.remove("no-scroll")};
    window.Leartech={openQuote:open,addToQuote(id){const p=D.products.find(x=>x.id===id);if(!p)return;const f=cart.find(x=>x.id===id);f?f.qty++:cart.push({...p,qty:1});localStorage.setItem("leartech_cart",JSON.stringify(cart));open();}};
    document.addEventListener("click",e=>{
      if(e.target.closest(".js-open-quote")){e.preventDefault();open()}
      if(e.target.closest("#drawerClose")||e.target===overlay)close();
      const q=e.target.closest(".qty button");
      if(q){const it=cart.find(x=>x.id===q.dataset.id);if(it){it.qty+=Number(q.dataset.delta);if(it.qty<1)cart=cart.filter(x=>x!==it);localStorage.setItem("leartech_cart",JSON.stringify(cart));render()}}
      if(e.target.closest("#clearQuote")){cart=[];localStorage.removeItem("leartech_cart");render()}
      if(e.target.closest("#sendQuote")&&cart.length){let msg="Hi Leartech Automation Ventures! I would like a quote for:%0A%0A";cart.forEach((i,n)=>msg+=(n+1)+". "+i.name+" x "+i.qty+" = "+money(i.price*i.qty)+"%0A");msg+="%0APlease share availability, installation and delivery details.";window.open("https://wa.me/"+D.phone+"?text="+msg,"_blank","noopener")}
    });
    render();
  }

  function card(p){
    return '<article class="product-card reveal"><div class="product-image"><span class="tag">'+esc(p.tag)+'</span><img loading="lazy" src="./assets/images/'+p.image+'.jpg" alt="'+esc(p.name)+'"></div><div class="product-body"><span class="product-cat">'+esc(p.cat)+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="product-foot"><strong>'+money(p.price)+'</strong><a class="text-link" href="./product.html?id='+encodeURIComponent(p.id)+'">Details →</a></div><div class="product-actions"><button class="btn btn-primary js-add-product" data-id="'+p.id+'" type="button">Add to quote</button><a class="btn btn-secondary" href="./product.html?id='+encodeURIComponent(p.id)+'">View product</a></div></div></article>';
  }

  function initProducts(){
    const home=document.getElementById("homeProducts");
    if(home) home.innerHTML=D.products.slice(0,4).map(card).join("");
    const grid=document.getElementById("productsGrid");
    if(!grid)return;
    const search=document.getElementById("productSearch"),sort=document.getElementById("productSort"),filters=document.getElementById("categoryFilters");
    const cats=["All",...new Set(D.products.map(p=>p.cat))];let active="All";
    filters.innerHTML=cats.map(c=>'<button type="button" class="'+(c==="All"?"active":"")+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join("");
    const render=()=>{const q=(search.value||"").toLowerCase().trim();let list=D.products.filter(p=>(active==="All"||p.cat===active)&&(!q||(p.name+" "+p.desc).toLowerCase().includes(q)));if(sort.value==="low")list.sort((a,b)=>a.price-b.price);if(sort.value==="high")list.sort((a,b)=>b.price-a.price);grid.innerHTML=list.length?list.map(card).join(""):'<div class="empty-state catalog-empty">No products match your search.</div>';document.getElementById("productCount").textContent=list.length+" product"+(list.length===1?"":"s");reveal()};
    filters.addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;active=b.dataset.cat;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render()});
    search.addEventListener("input",render);sort.addEventListener("change",render);render();
  }

  function initProductDetail(){
    const box=document.getElementById("productDetail");if(!box)return;
    const id=new URLSearchParams(location.search).get("id")||D.products[0].id,p=D.products.find(x=>x.id===id)||D.products[0];
    document.title=p.name+" | Leartech";
    box.innerHTML='<div class="breadcrumbs"><a href="./products.html">Products</a><span>/</span>'+esc(p.cat)+'</div><div class="detail-grid"><div class="detail-media"><img src="./assets/images/'+p.image+'.jpg" alt="'+esc(p.name)+'"></div><div class="detail-copy"><span class="tag static">'+esc(p.tag)+'</span><div class="product-cat">'+esc(p.cat)+'</div><h1>'+esc(p.name)+'</h1><p class="lead">'+esc(p.desc)+'</p><div class="detail-price">'+money(p.price)+'</div><div class="actions"><button class="btn btn-primary js-add-product" data-id="'+p.id+'" type="button">Add to quote</button><a class="btn btn-ghost" target="_blank" rel="noopener" href="https://wa.me/'+D.phone+'?text='+encodeURIComponent("Hi Leartech, I want a quote for "+p.name+".")+'">Enquire on WhatsApp</a></div><div class="spec-grid">'+Object.entries(p.specs).map(([k,v])=>'<div><span>'+esc(k)+'</span><b>'+esc(v)+'</b></div>').join("")+'</div></div></div>';
  }

  function initSolutions(){
    const tabs=document.getElementById("solutionTabs");if(!tabs)return;
    const keys=Object.keys(D.solutions);
    tabs.innerHTML=keys.map((k,i)=>'<button type="button" class="'+(i===0?"active":"")+'" data-solution="'+k+'">'+k.charAt(0).toUpperCase()+k.slice(1)+'</button>').join("");
    const paint=k=>{const d=D.solutions[k];document.getElementById("solutionMeta").textContent=d.meta;document.getElementById("solutionTitle").textContent=d.title;document.getElementById("solutionCopy").textContent=d.copy;document.getElementById("solutionItems").innerHTML=d.items.map(x=>'<div>'+esc(x)+'</div>').join("");document.getElementById("solutionImage").src="./assets/images/"+d.image+".jpg"};
    tabs.addEventListener("click",e=>{const b=e.target.closest("[data-solution]");if(!b)return;tabs.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));paint(b.dataset.solution)});paint(keys[0]);
  }

  function initIndustries(){
    const grid=document.getElementById("industryGrid");if(!grid)return;
    grid.innerHTML=D.industries.map(([name,img,desc])=>'<article class="industry-card reveal"><div class="industry-image"><img loading="lazy" src="./assets/images/'+img+'.jpg" alt="'+esc(name)+'"></div><div><span class="product-cat">INDUSTRY WORKFLOW</span><h3>'+esc(name)+'</h3><p>'+esc(desc)+'</p><a class="text-link js-open-quote" href="#">Build a setup →</a></div></article>').join("");
    reveal();
  }

  function initPOS(){
    const wrap=document.getElementById("simProducts");if(!wrap)return;
    let cart=[];const paint=()=>{document.getElementById("simTotal").textContent=money(cart.reduce((s,x)=>s+x.price,0));document.getElementById("simReceiptBody").innerHTML=cart.length?cart.map(x=>'<div class="receipt-row"><span>'+esc(x.name)+'</span><span>'+money(x.price)+'</span></div>').join(""):'Tap items on the POS to start.'};
    wrap.addEventListener("click",e=>{const b=e.target.closest("button[data-name]");if(!b)return;cart.push({name:b.dataset.name,price:Number(b.dataset.price)});paint()});
    document.getElementById("simClear").addEventListener("click",()=>{cart=[];paint()});
    document.getElementById("simPrint").addEventListener("click",()=>{if(!cart.length)return;const r=document.getElementById("simReceipt");r.classList.remove("printing");void r.offsetWidth;r.classList.add("printing")});
    paint();
  }

  function initROI(){
    const s=document.getElementById("roiSlider");if(!s)return;
    const paint=()=>{const bills=Number(s.value),hours=Math.round(bills*1.5*30/60);document.getElementById("roiBills").textContent=bills;document.getElementById("roiHours").textContent=hours+" hrs"};
    s.addEventListener("input",paint);paint();
  }

  function initFAQ(){const box=document.getElementById("faqContainer");if(!box)return;box.innerHTML=D.faqs.map(([q,a])=>'<details class="faq-item"><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join("")}

  function initContact(){
    const form=document.getElementById("leadForm");if(!form)return;
    form.addEventListener("submit",e=>{e.preventDefault();const n=document.getElementById("formName").value.trim(),p=document.getElementById("formPhone").value.trim(),b=document.getElementById("formBiz").value,need=document.getElementById("formNeed").value.trim();const msg="Hi Leartech! My name is "+n+". Phone: "+p+". Business: "+b+". Requirement: "+need;window.open("https://wa.me/"+D.phone+"?text="+encodeURIComponent(msg),"_blank","noopener");document.getElementById("formNotice").textContent="WhatsApp has been prepared with your enquiry."});
  }

  function globalActions(){
    document.addEventListener("click",e=>{const b=e.target.closest(".js-add-product");if(b)window.Leartech.addToQuote(b.dataset.id)});
  }

  function boot(){
    renderShell();renderFooter();initQuote();reveal();initProducts();initProductDetail();initSolutions();initIndustries();initPOS();initROI();initFAQ();initContact();globalActions();
    const progress=document.getElementById("scrollProgress");
    window.addEventListener("scroll",()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(h?y/h*100:0)+"%";document.querySelector(".site-header")?.classList.toggle("scrolled",y>20)},{passive:true});
  }
  document.addEventListener("DOMContentLoaded",boot);
})();
const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
if(menuBtn&&mobileNav){
  menuBtn.addEventListener('click',()=>{
    const open=mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open);
  });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));
}

const filterToggle=document.querySelector('.filters-toggle');
const finder=document.querySelector('.finder');
if(filterToggle&&finder){
  filterToggle.addEventListener('click',()=>{
    const open=finder.classList.toggle('open');
    filterToggle.setAttribute('aria-expanded',open);
  });
}

const form=document.querySelector('#finderForm');
const propertyCards=[...document.querySelectorAll('#properties .property-card')];
const finderResults=document.querySelector('#finderResults');

if(form&&propertyCards.length){
  const normalizeArabic=value=>(value||'')
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g,'ا')
    .replace(/ى/g,'ي')
    .replace(/ة/g,'ه');

  const priceMatches=(price,bucket)=>{
    if(bucket==='under1') return price<=1000000;
    if(bucket==='1to5') return price>=1000000&&price<=5000000;
    if(bucket==='5plus') return price>5000000;
    return true;
  };

  form.addEventListener('submit',e=>{
    e.preventDefault();

    const data=new FormData(form);
    const demand=data.get('demand');
    const type=data.get('type');
    const city=data.get('city');
    const district=normalizeArabic(data.get('district'));
    const priceBucket=data.get('price');

    let visibleCount=0;

    propertyCards.forEach(card=>{
      const demands=(card.dataset.demand||'').split(' ');
      const cardType=card.dataset.type||'';
      const cardCity=card.dataset.city||'';
      const cardDistrict=normalizeArabic(card.dataset.district);
      const cardPrice=Number(card.dataset.price||0);

      const matchesDemand=demands.includes(demand);
      const matchesType=type==='الكل'||cardType===type;
      const matchesCity=!city||cardCity===city;
      const matchesDistrict=!district||cardDistrict.includes(district)||district.includes(cardDistrict);
      const matchesPrice=priceMatches(cardPrice,priceBucket);
      const matches=matchesDemand&&matchesType&&matchesCity&&matchesDistrict&&matchesPrice;

      card.hidden=!matches;
      if(matches){
        visibleCount++;
        card.classList.add('visible');
      }
    });

    if(finderResults){
      finderResults.textContent=visibleCount
        ? `تم العثور على ${visibleCount} ${visibleCount===1?'فرصة مطابقة':'فرص مطابقة'}`
        : 'لا توجد نتائج مطابقة لهذه الخيارات حاليًا.';
      finderResults.classList.toggle('is-empty',visibleCount===0);
    }

    document.querySelector('#properties')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
}

const revealEls=[...document.querySelectorAll('.reveal')];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(reduced){
  revealEls.forEach(el=>el.classList.add('visible'));
}else{
  // Wait for the first browser paint before observing. This makes the
  // fade/translate animation consistent on GitHub Pages/CDN as well as locally.
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        const io=new IntersectionObserver(entries=>{
          entries.forEach(entry=>{
            if(entry.isIntersecting){
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        },{threshold:.12,rootMargin:'0px 0px -24px 0px'});

        revealEls.forEach(el=>io.observe(el));
      },70);
    });
  });
}

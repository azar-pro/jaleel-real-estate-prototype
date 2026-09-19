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
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    document.querySelector('#properties')?.scrollIntoView({behavior:'smooth'});
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

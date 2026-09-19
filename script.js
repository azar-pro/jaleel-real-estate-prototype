const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
if(menuBtn&&mobileNav){menuBtn.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')))}
const filterToggle=document.querySelector('.filters-toggle');
const finder=document.querySelector('.finder');
if(filterToggle&&finder){filterToggle.addEventListener('click',()=>{const open=finder.classList.toggle('open');filterToggle.setAttribute('aria-expanded',open)})}
const form=document.querySelector('#finderForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#properties')?.scrollIntoView({behavior:'smooth'})})}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}

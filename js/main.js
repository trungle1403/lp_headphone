
const navMenu = document.querySelector('.nav-list')
const header = document.querySelector('.header');
const btnClose = document.querySelector('.nav-close')
const btnOpen = document.querySelector('.nav-toggle')
const btnToTop = document.querySelector('.btn-to-top')

btnOpen.addEventListener('click', () => {
    navMenu.classList.add('open')
    header.classList.add('open')
})
btnClose.addEventListener('click', () => {
    navMenu.classList.remove('open')
    header.classList.remove('open')
})

window.addEventListener('scroll',() =>{
    header.classList.toggle('sticky',window.scrollY > 50);
    btnToTop.classList.toggle('active',window.scrollY > 200);
})

btnToTop.addEventListener('click',() =>{
    document.documentElement.scrollTop = 0
})

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link')

navLink.forEach(n => n.addEventListener('click', ()=>{
    navMenu.classList.remove('open')
}))

const sections = document.querySelectorAll('section[id]')

function scrollActiveLink() {
    const scrollY = window.pageYOffset
    sections.forEach( s => {
        //height of section
        const sectionHeight = s.offsetHeight
        //sum height from top to section 0 620 1230 2000 ....
        //70 is height header
        const sectionTop = s.offsetTop - 90;
        sectionId = s.getAttribute('id')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-list a[href*='+ sectionId+']').classList.add('active')
        }else {
            document.querySelector('.nav-list a[href*='+ sectionId+']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActiveLink)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.nav-logo, .nav-list, .section-title`,{delay: 400})
sr.reveal(`.home-content`,{delay: 500})
sr.reveal(`.home-img`,{delay: 700, origin: 'top'})
sr.reveal(`.brand-img, .product-item, .footer-logo, .footer-column, .footer-copyright`,{origin: 'top', interval: 100})
sr.reveal(`.case-img`,{origin: 'top'})
sr.reveal(`.case-content`)
sr.reveal(`.specs-item`,{origin: 'left', interval: 100})
sr.reveal(`.specs-img, .discount-img`,{origin: 'right'})
sr.reveal(`.discount-content`,{origin: 'left'})

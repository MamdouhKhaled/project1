/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navbar_menu = document.querySelector('.navbar__menu');
const navbar = document.querySelector('#navbar__list');
const section = document.querySelectorAll('section');
const scrollToTopBtn = document.querySelector('.back__top');
const SectionPostion = {};
let isScroll = false;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createItemList(text, target, withLi = true) {
    let anchor = document.createElement('a');
    anchor.setAttribute('href', target);
    anchor.setAttribute('class', 'menu__link');
    anchor.textContent = text;
    // let el = ( withLi ) ? node.appendChild(anchor): anchor;
    if (withLi) {
        let node = document.createElement('li');
        node.appendChild(anchor);
        return node;
    } else {
        return anchor;
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// complate all section link && fill Section Postions array
section.forEach(el => {
    navbar.appendChild(createItemList(el.dataset.nav, `#${el.id}`));
    // fill Section Postions array
    SectionPostion[el.id] = el.offsetTop;
});
navbar.querySelector('a').classList.add('active');
// Add class 'active' to section when near top of viewport
function setActiveSection() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    // Clear timeout throughout the scroll
    window.clearTimeout( isScroll );
    isScroll = setTimeout(function() {
        navbar_menu.classList.remove('active');
		// Run add Active class Selection (Link and Section) after Scrolling has stopped.
        for (i in SectionPostion) {
            if (SectionPostion[i] <= scrollPosition) {
                document.querySelector('main .active').classList.remove('active');
                document.getElementById(i).classList.add('active');
                navbar.querySelector('.active').classList.remove('active');
                navbar.querySelector('a[href*=' + i + ']').classList.add('active');
            }
        }

	}, 100);
  var scrollTotal = document.body.scrollHeight;
  if ((scrollPosition / scrollTotal ) > 0.10 ) {
    // Show button
    scrollToTopBtn.classList.add("active")
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("active")
  }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e, y = 0) {
    e.preventDefault();
    window.scrollTo({
        top: y,
        left: 0,
        behavior: 'smooth'
    });

}
function handleScroll(e) {
    let y = 0;
    if (e.target.nodeName.toLowerCase() == 'a') {
        if (e.target.getAttribute('href').toString() != "#") {
            let target = document.querySelector(e.target.getAttribute('href').toString());
            y = target.offsetTop;
        }
        scrollToSection(e, y)
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function ShowMenu(){
    console.log(navbar_menu);
    navbar_menu.classList.toggle('active');
}
// Scroll to section on link click
navbar.addEventListener('click', handleScroll)
scrollToTopBtn.addEventListener('click', scrollToSection)
document.querySelector(".toggle").addEventListener('click', ShowMenu);
// Set sections as active
window.addEventListener('scroll', setActiveSection);



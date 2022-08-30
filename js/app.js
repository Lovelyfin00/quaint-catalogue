






fetch('https://api.escuelajs.co/api/v1/categories')
.then(res=>res.json())
.then(json=>console.log(json))



// fetch('https://dummyjson.com/products/categories')
// .then(res=>res.json())
// .then(json=>console.log(json))

// fetch('https://dummyjson.com/products/category/sunglasses')
// .then(res=>res.json())
// .then(json=>console.log(json.products))

// fetch('https://fakestoreapi.com/products/categories')
//             .then(res=>res.json())
//             .then(json=>console.log(json))



//             fetch('https://fakestoreapi.com/products/category/jewelery')
//             .then(res=>res.json())
//             .then(json=>console.log(json))


























// Showing the search input on mobile view
const searchNavBtnMobile = document.querySelector(".search-navbar-mobile");
let searchNavBoxMobile = document.querySelector(".search-navbar-box-mobile");

searchNavBtnMobile.addEventListener("click", () => {
  console.log('clicked')
  searchNavBoxMobile.classList.toggle("d-none")
})

// Closing search input on mobile screen
const closeSearchBtn = document.querySelector(".close-search-btn")
closeSearchBtn.addEventListener("click", () => {
  searchNavBoxMobile.classList.toggle("d-none")
})

// Showing the search input for scroll on tab and laptop views
const searchNavBtnScroll = document.querySelector(".search-navbar-scroll"); 
let searchNavBoxScroll = document.querySelector(".search-navbar-box-scroll");
searchNavBtnScroll.addEventListener("click", () => {
  console.log('clicked')
  searchNavBoxScroll.classList.toggle("d-none")
})

// Closing search input for scroll on tab and laptop views
const closeSearchBtnScroll = document.querySelector(".close-search-btn-scroll")
closeSearchBtnScroll.addEventListener("click", () => {
  searchNavBoxScroll.classList.toggle("d-none")
})


// Showing the search input for fixed on tab and laptop views
const searchNavBtnFixed= document.querySelector(".search-navbar-fixed"); 
let searchNavBoxFixed = document.querySelector(".search-navbar-box-fixed");
searchNavBtnFixed.addEventListener("click", () => {
  console.log('clicked')
  searchNavBoxFixed.classList.toggle("d-none")
})

// Closing search input for fixed on tab and laptop views
const closeSearchBtnFixed = document.querySelector(".close-search-btn-fixed")
closeSearchBtnFixed.addEventListener("click", () => {
  searchNavBoxFixed.classList.toggle("d-none")
})





// Hiding tablet and laptop navigation on scroll
const tabLapNav = document.querySelector(".tab-nav-js");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", ()=> {
  if (lastScrollY < window.scrollY){
    // console.log("we are going down")
    tabLapNav.classList.add("d-none")
    // console.log(searchNavBoxScroll.classList)
    searchNavBoxScroll.classList.add("d-none")
  } else{
    // console.log(window.scrollY)
    if (window.scrollY === 0){
      tabLapNav.classList.remove("d-none")
    }
  }
  lastScrollY = window.scrollY;
})

// Showing fixed tablet and laptop nav on scroll
let lastScrollOnY = window.scrollY;
const fixedNavLaptop = document.querySelector(".fixed-nav-laptop")
const navbarFixed2 = document.querySelector(".navbar-fixed-2")
window.addEventListener("scroll", ()=> {
  if (window.scrollY === 0){
    console.log(window.scrollY)
    fixedNavLaptop.classList.add("d-none")
    searchNavBoxFixed.classList.add("d-none")
  } else {
    if (lastScrollOnY < window.scrollY){
      fixedNavLaptop.classList.remove("d-none")
      navbarFixed2.classList.add("unhidden")
    }
    
  }
  lastScrollOnY = window.scrollY;
})







// Swipper Js Javascript style

var swiper = new Swiper(".mySwiper", {
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
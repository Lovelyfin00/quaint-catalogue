
let hotSellingSection = document.querySelector("#hot-deals-row")

let hotDealsArray = [];
let hotProducts = {}

const api_url = './database/store.json';

async function getHotProductsData(){
  const response =  await fetch (api_url);
  hotDealsArray = await response.json();

  hotDealsArray = hotDealsArray.slice(159 ,185)
    for (const product of hotDealsArray){
      // console.log(product)
      const catagoryName = product.category.name;
      if (catagoryName === "Clothes" || catagoryName === "Shoes"){
        // hotProducts = product.id 
        hotProducts = product 
        // console.log(hotProducts)
        hotDeals(hotProducts)
      }
    } 
}
getHotProductsData()


function hotDeals (products) {
  // console.log(products)
  let id = products.id
  let images = products.images
  let price = products.price
  let title = products.title
  // console.log(id)
  // console.log(images)
  // console.log(price)
  // console.log(title)
  let hotDealsStrings=""
  hotDealsStrings += `
    <div class="swiper-slide">
      <div class="card border-0 milk-color-bg">
          <div class="product-img position-relative">
            <img src="${images}" alt="product image" class="img-fluid">
            <div class="product-links d-flex position-absolute">
              <div class="add-to-cart bg-dark d-flex align-items-center justify-content-center me-2">
                <button id="product-link-${id}" class="border-0 bg-dark "><i class="fa-sharp fa-solid fa-cart-shopping fa-2xl text-white"></i></button>
              </div>
              <div class="product-details main-bg-blue d-flex align-items-center justify-content-center me-2">
                <a href="#" id="product-link-${id} "><i class="fa-solid fa-link fa-2xl text-white"></i></a>
              </div>
            </div>
          </div>
          <div class="product-descrip mb-4">
            <p class="product-name pt-3 mb-1 fs-5">${title}</p>
            <p class="product-price fw-bold">$${price}</p>
          </div>
        </div>
    </div>
  `
hotSellingSection.innerHTML += hotDealsStrings
}


function randomProducts (){
  let randomProd = Math.round(Math.random()*4 + 1);
  return randomProd
}
console.log(randomProducts())


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

  // Hot Deals swipper


  var swiperHot = new Swiper(".hotSwiper", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
      250: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      426: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


// Marquee effect

(function () {
    const script = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    script.async = true;
    script.src = "https://api.adnan-tech.com/public/js/at.js";
    script.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(script, s0);

    script.onload = function () {
        at.loadMarquee("#marquee", `<h5 class="text-center pb-5 main-blue-color">Hot products selling fast</h5>`, {
            duration: 5, // seconds
            direction: "rtl"
        });
    };
})();




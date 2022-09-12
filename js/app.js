
let hotSellingSection = document.querySelector("#hot-deals-row")
let hotDealsArray = [];
let hotProducts = {}

// Calling the api stored in  our store.json in database
const api_url = './database/store.json';


// creating an async function and fetching the api in the hot products category

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

// Creating a function to display the products filtered in the hot products section

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
            <img src="${images}" alt="product image" class="img-fluid swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            <div class="product-links d-flex position-absolute">
              <button onclick="addToCart(${id}, ${price})" class="border-0 bg-dark add-to-cart me-2"><i class="fa-sharp fa-solid fa-cart-shopping fa-2xl text-white"></i></button>
              <button onclick="productDetails(${id})" class="border-0 main-bg-blue me-2 d-flex align-items-center justify-content-center"><i class="fa-solid fa-link fa-2xl text-white"></i></button>
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


// Add to cart after hover on products
let cartIdArray = [];
let priceArray =[]
let cartOnFixed = document.querySelector(".cart-items-fixed")
let cartOnScroll = document.querySelector(".cart-items-scroll")
let count = 0;
let saveCount;

function addToCart(id, prices){
  count +=1
  // Displaying the count on click of addToCart
  cartOnFixed.innerHTML = count
  cartOnScroll.innerHTML = count
  // Saving the value of the count to localstorage
  localStorage.setItem("count", JSON.stringify(count));

  // getting value of id
  storeCartId (cartIdArray, id)

  // getting value of prices
  storeprices (priceArray, prices)

}

function storeCartId (itemCartArray, keyAndValue){
  //   // Get the existing data
  let existingProductsCart = window.localStorage.getItem('itemCartArray');

  // Otherwise, convert the localStorage string to an array
  existingProductsCart = existingProductsCart ? JSON.parse(existingProductsCart) : [];
  
  existingProductsCart.unshift(keyAndValue)
  
  // Save back to localStorage
  window.localStorage.setItem('itemCartArray', JSON.stringify(existingProductsCart));
}

function storeprices (itemPriceArray, price){
  //   // Get the existing data
  let existingPriceArray = window.localStorage.getItem('itemPriceArray');

  // Otherwise, convert the localStorage string to an array
  existingPriceArray = existingPriceArray ? JSON.parse(existingPriceArray) : [];
  
  existingPriceArray.unshift(price)
  
  // Save back to localStorage
  window.localStorage.setItem('itemPriceArray', JSON.stringify(existingPriceArray));
}


// Saving and displaying the count on reload

window.onload = () => {
  count = localStorage.getItem("count")
    ? JSON.parse(localStorage.getItem("count"))
    : 0;
  cartOnFixed.textContent = count;
  cartOnScroll.textContent = count;
};


//  Product Details section

async function productDetails(id){
  const response =  await fetch (api_url);
  data = await response.json();
  // console.log(data)
  // console.log(id)
  for (let i=0; i<data.length; i++){
    // console.log(data[i].id)
    if (data[i].id === id){
      // console.log(data[i])
      localStorage.setItem('productDetails', JSON.stringify(data[i]))
      // window.location.href = 'product-details.html';
    }
  }

}


// FEATURED PRODUCTS SECTION


const clothesTabShow = document.querySelector("#clothes-tab-show");
const shoesTabShow = document.querySelector("#shoes-tab-show");
const furnitureTabShow = document.querySelector("#others-tab-show");
let featuredClothesArray = [];

async function featuredClothesData (){
  const response =  await fetch (api_url);
  featuredClothesArray = await response.json();
  featuredClothesArray = featuredClothesArray.slice(1,49)
  for (let i=0; i<featuredClothesArray.length; i++){
    // console.log(featuredClothesArray[i].category)
    if (featuredClothesArray[i].category.name === 'Clothes'){
      let clothes =featuredClothesArray[i]
      featuredClothes (clothes)
    }
  }
}
featuredClothesData()

function featuredClothes (clothesData){
  let {id, images, price, title} = clothesData
  // let id = clothesData.id
  // let images = clothesData.images
  // let price = clothesData.price
  // let title = clothesData.title

  let clothesTabStrings=""
  clothesTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images[1]} alt="product image" class="img-fluid">
          <div class="product-links d-flex position-absolute">
            <button onclick="addToCart(${id}, ${price})" class="border-0 bg-dark add-to-cart me-2"><i class="fa-sharp fa-solid fa-cart-shopping fa-2xl text-white"></i></button>
            <button onclick="productDetails(${id})" class="border-0 main-bg-blue me-2 d-flex align-items-center justify-content-center"><i class="fa-solid fa-link fa-2xl text-white"></i></button>
          </div>
        </div>
        <div class="product-descrip mb-4">
          <p class="product-name pt-3 mb-1 fs-5">${title}</p>
          <p class="product-price fw-bold">$${price}</p>
        </div>
      </div>
  </div>
  `
  clothesTabShow.innerHTML += clothesTabStrings;
}


// SHOES TAB SHOW

async function featuredShoesData (){
  const response =  await fetch (api_url);
  let featuredShoesArray = await response.json();
  featuredShoesArray = featuredShoesArray.slice(1,49)
  for (let i=0; i<featuredShoesArray.length; i++){
    // console.log(featuredShoesArray[i].category)
    if (featuredShoesArray[i].category.name === 'Shoes'){
      let shoes =featuredShoesArray[i]
      featuredShoes(shoes)
      // console.log(shoes.id)
    }
  }
}
featuredShoesData()

function featuredShoes (shoesData){
  let {id, images, price, title} = shoesData
  // let id = shoesData.id
  // let images = shoesData.images
  // let price = shoesData.price
  // let title = shoesData.title

  let shoesTabStrings=""
  shoesTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images[0]} alt="product image" class="img-fluid">
          <div class="product-links d-flex position-absolute">
            <button onclick="addToCart(${id}, ${price})" class="border-0 bg-dark add-to-cart me-2"><i class="fa-sharp fa-solid fa-cart-shopping fa-2xl text-white"></i></button>
            <button onclick="productDetails(${id})" class="border-0 main-bg-blue me-2 d-flex align-items-center justify-content-center"><i class="fa-solid fa-link fa-2xl text-white"></i></button>
          </div>
        </div>
        <div class="product-descrip mb-4">
          <p class="product-name pt-3 mb-1 fs-5">${title}</p>
          <p class="product-price fw-bold">$${price}</p>
        </div>
      </div>
  </div>
  `
  shoesTabShow.innerHTML += shoesTabStrings;
}


// FURNITURE TAB SHOW

async function featuredFurnitureData(){
  const response =  await fetch (api_url);
  let featuredFurnitureArray  = []
  featuredFurnitureArray = await response.json();
  featuredFurnitureArray = featuredFurnitureArray.slice(1,43)
  for (let i=0; i<featuredFurnitureArray.length; i++){
    // console.log(featuredFurnitureArray[i].category.name)
    if (featuredFurnitureArray[i].category.name === 'Furniture'){
      let furniture =featuredFurnitureArray[i]
      // console.log(furniture)
      featuredFurniture (furniture)
    }
  }
}
featuredFurnitureData()

function featuredFurniture (furnitureData){
  let {id, images, price, title} = furnitureData
  let furnitureTabStrings=""
  furnitureTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images[1]} alt="product image" class="img-fluid">
          <div class="product-links d-flex position-absolute">
            <button onclick="addToCart(${id}, ${price})" class="border-0 bg-dark add-to-cart me-2"><i class="fa-sharp fa-solid fa-cart-shopping fa-2xl text-white"></i></button>
            <button onclick="productDetails(${id})" class="border-0 main-bg-blue me-2 d-flex align-items-center justify-content-center"><i class="fa-solid fa-link fa-2xl text-white"></i></button>
          </div>
        </div>
        <div class="product-descrip mb-4">
          <p class="product-name pt-3 mb-1 fs-5">${title}</p>
          <p class="product-price fw-bold">$${price}</p>
        </div>
      </div>
  </div>
  `
  furnitureTabShow.innerHTML += furnitureTabStrings;
}


// PRELOADER
let preLoader = document.querySelector("#preloader");
window.addEventListener("load", () => {
  preLoader.style.display = "none";
})



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





// Hiding tablet and laptop navigation on scroll
const tabLapNav = document.querySelector(".tab-nav-js");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", ()=> {
  if (lastScrollY < window.scrollY){
    // console.log("we are going down")
    tabLapNav.classList.add("d-none")
    searchNavBoxScroll.classList.add("d-none")
  } else{
    // console.log(window.scrollY)
    if (window.scrollY === 0){
      if (screen.availWidth < 768){
        tabLapNav.classList.add("d-none")
        searchNavBoxScroll.classList.add("d-none")
      }else{
        tabLapNav.classList.remove("d-none")
      }
    }
  }
  lastScrollY = window.scrollY;
})

// Showing fixed tablet and laptop nav on scroll
let lastScrollOnY = window.scrollY;
const fixedNavLaptop = document.querySelector(".mobile-header")

window.addEventListener("scroll", ()=> {
  if (window.scrollY === 0){
    if (screen.availWidth < 768){
      fixedNavLaptop.classList.remove("d-none")
    }else{
      fixedNavLaptop.classList.add("d-none")
      console.log(window.scrollY)
    }
  } else {
    if (lastScrollOnY < window.scrollY){
      fixedNavLaptop.classList.remove("d-none")
    }
    
  }
  lastScrollOnY = window.scrollY;
})

// Swiper js for hero section bg images

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

  // Hot Deals swipper js
  var swiperHot = new Swiper(".hotSwiper", {
    autoplay: {
      delay: 2000,
    },
    lazy: true,
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





let hotSellingSection = document.querySelector("#hot-deals-row")
let hotDealsArray = [];
let hotProducts = {};

// Calling the api stored in  our store.json in database
const api_url = 'https://dummyjson.com/products?skip=1&limit=100';

// creating an async function and fetching the api in the hot products category
async function getHotProductsData(){
  const response =  await fetch (api_url);
  let data = await response.json();
  hotDealsArray = data.products;
  hotDealsArray = hotDealsArray.slice(43 ,56);

    for (const product of hotDealsArray){
      const catagoryName = product.category;
      if (catagoryName === "mens-shoes" || catagoryName === "womens-dresses" || catagoryName === "mens-shirts" ){
        hotProducts = product;
        hotDeals(hotProducts)
      }
    } 
}
getHotProductsData()

// Creating a function to display the products filtered in the hot products section
function hotDeals (products) {
  let id = products.id;
  let [...images] = products.images;
  let price = products.price;
  let title = products.title;
  let hotDealsStrings="";

  hotDealsStrings += `
    <div class="swiper-slide">
      <div class="card border-0 milk-color-bg">
          <div class="product-img position-relative">
            <img src="${images[1]}" alt="product image" class="img-fluid swiper-lazy">
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

  // saving quantity of goods ordered
function quantityOfProduct(id, quantity){
  let quantityOrdered = window.localStorage.getItem('quantityOrdered');
  quantityOrdered = quantityOrdered ? JSON.parse(quantityOrdered) : [];
  
  quantityOrdered.unshift([quantity, id]);
  
  window.localStorage.setItem('quantityOrdered', JSON.stringify(quantityOrdered));
}

// add to cart

function addToCart(id, prices){
  count +=1;

  // Displaying the count on click of addToCart
  cartOnFixed.innerHTML = count;
  cartOnScroll.innerHTML = count;

  // Saving the value of the count to localstorage
  localStorage.setItem("count", JSON.stringify(count));

  // getting value of id
  storeCartId (cartIdArray, id);

  // getting value of prices
  storeprices (priceArray, prices);

  // saving quantity of goods ordered
  let quantityOfGoods = 1;
  quantityOfProduct(id, quantityOfGoods);

}

// FEATURED PRODUCTS SECTION
const clothesTabShow = document.querySelector("#clothes-tab-show");
const shoesTabShow = document.querySelector("#shoes-tab-show");
const furnitureTabShow = document.querySelector("#home-decoration-tab-show");

let featuredClothesArray = [];

async function featuredClothesData (){
  const response =  await fetch (api_url);
  data = await response.json();
  data = data.products;

  featuredClothesArray = data;
  featuredClothesArray = featuredClothesArray.slice(36,44);

  for (let i=0; i<featuredClothesArray.length; i++){
    if (featuredClothesArray[i].category === 'womens-dresses' || featuredClothesArray[i].category === 'tops'){
      let clothes =featuredClothesArray[i];
      featuredClothes (clothes);
    }
  }
}
featuredClothesData();

function featuredClothes (clothesData){
  let {id, images, price, title} = clothesData;
  images = images[1];

  let clothesTabStrings="";
  clothesTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images}" alt="product image" class="img-fluid">
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

  featuredShoesArray = featuredShoesArray.products;
  featuredShoesArray = featuredShoesArray.slice(46, 59);

  for (let i=0; i<featuredShoesArray.length; i++){
    if (featuredShoesArray[i].category === 'mens-shoes' || featuredShoesArray[i].category === 'womens-shoes'){
      let shoes =featuredShoesArray[i];
      featuredShoes(shoes);
    }
  }
}
featuredShoesData();

function featuredShoes (shoesData){
  let {id, images, price, title} = shoesData;
  images = images[0];
  let shoesTabStrings="";

  shoesTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images}" alt="product image" class="img-fluid">
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
  let featuredFurnitureArray  = [];

  featuredFurnitureArray = await response.json();
  featuredFurnitureArray = featuredFurnitureArray.products;
  featuredFurnitureArray = featuredFurnitureArray.slice(26,34);

  for (let i=0; i<featuredFurnitureArray.length; i++){
    if (featuredFurnitureArray[i].category === 'furniture' || featuredFurnitureArray[i].category === 'home-decoration'){
      const furniture =featuredFurnitureArray[i];
      featuredFurniture (furniture);
    }
  }
}
featuredFurnitureData()

function featuredFurniture (furnitureData){
  let {id, images, price, title} = furnitureData;
  images = images[2];
  let furnitureTabStrings="";

  furnitureTabStrings += `
    <div class="col-lg-3 col-md-6">
      <div class="card border-0">
        <div class="product-img position-relative">
          <img src="${images}" alt="product image" class="img-fluid">
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





// Add to cart after hover on products
let cartIdArray = [];
let priceArray =[]
let cartOnFixed = document.querySelector(".cart-items-fixed")
let cartOnScroll = document.querySelector(".cart-items-scroll")
let count = 0;
let saveCount;



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


// //  Product Details section

async function productDetails(id){
  const response =  await fetch ('https://dummyjson.com/products?skip=1&limit=100');
  data = await response.json();
  data = data.products;
  // console.log(data)
  // console.log(id)
  for (let i=0; i<data.length; i++){
    // console.log(data[i].id)
    if (data[i].id === id){
      console.log(data[i])
      localStorage.setItem('productDetails', JSON.stringify(data[i]))
      window.location.href = 'product-details.html';
    }
  }

}



// Saving and displaying the count on reload

window.onload = () => {
  count = localStorage.getItem("count")
    ? JSON.parse(localStorage.getItem("count"))
    : 0;
  cartOnFixed.textContent = count;
  cartOnScroll.textContent = count;
};


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
      // console.log(window.scrollY)
    }
  } else {
    if (lastScrollOnY < window.scrollY){
      fixedNavLaptop.classList.remove("d-none")
    }
    
  }
  lastScrollOnY = window.scrollY;
})
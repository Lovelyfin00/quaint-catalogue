
// Getting the data from local storage
let openedProduct = window.localStorage.getItem('productDetails')
openedProduct = JSON.parse(openedProduct)


// linking to the dom of the needed
let productTitle = document.querySelector("#title");
let priceWithoutDisc = document.querySelector("#without-discount");
let finalPrice = document.querySelector("#price");
let shortDescription = document.querySelector("#short-description")
let productImgHolder = document.querySelector("#product-bg-img")
let image = openedProduct.images

// For background image

function displayProductDetails (){
  let title = openedProduct.title;
  productTitle.innerHTML = title
  shortDescription.innerHTML = openedProduct.description;
  
}
displayProductDetails ()

function changeImg () {
  image = image[1]

  let imageHolder = ""
  imageHolder += `
    <div class="product-zoom" onmousemove="zoom(event)" style="background-image: url(${image});">
      <img src="${image}" alt="product image" class="product-zoom-img" id="product-image">
    </div>
  `
  productImgHolder.innerHTML += imageHolder
}
changeImg ()

function priceSec (){
  let discount  = openedProduct.discountPercentage
  let realPrice = ((discount/100) * openedProduct.price) + openedProduct.price;

  priceWithoutDisc.innerHTML = `$${realPrice}`;
  finalPrice.innerHTML = `$${openedProduct.price}.00`;
}

priceSec ()

// counter section
let counterAndCartSec = document.querySelector("#counter-cart-sec")
let decrement = document.querySelector("#decrement")
let increment = document.querySelector("#increment")
let inputValue = document.querySelector("#counter-quantity")

let countValue = 1;
inputValue.value = countValue


function incrementBtn(){
  countValue += 1
  inputValue.value = countValue
}

function decrementBtn (){
  countValue -= 1
  inputValue.value = countValue

}


// add to cart
let addingProductTOCart = document.querySelector("#add-to-cart-details")

function cartDetails(){
  let id = openedProduct.id
  let price = openedProduct.price

  let cartHolder=""
  cartHolder += `
  <button onclick="addToCart(${id}, ${price})" class="border-0 main-bg-blue pt-2 pb-2 text-white px-5">Add to cart</button>
  <p class="text-success px-5 mt-2" id="success-message">Item successfully added to cart</p>
  `
  addingProductTOCart.innerHTML = cartHolder

  
}
cartDetails()

function quantityOfProduct(id, quantity){
  let quantityOrdered = window.localStorage.getItem('quantityOrdered');
  quantityOrdered = quantityOrdered ? JSON.parse(quantityOrdered) : [];
  
  quantityOrdered.unshift([quantity, id])
  
  window.localStorage.setItem('quantityOrdered', JSON.stringify(quantityOrdered));
}

let successMessage = document.querySelector("#success-message")

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

  // saving quantity of goods ordered

  let quantityOfGoods = Number(inputValue.value);
  quantityOfProduct(id, quantityOfGoods)

  successMessage.style.display ="block"
}

// checkout button

function checkoutBtn(){
  window.location.href='checkout.html'
}


// Images in description

let descripImg1 = document.querySelector("#descrip-img-1")
let descripImg2 = document.querySelector("#descrip-img-2")
function descripImages(){
  let image = openedProduct.images
  let image1 = image[0]
  let image2 = image[2]

  descripImg1.src = `${image1}`;
  descripImg2.src = `${image2}`;
}
descripImages()

// Related post section
let relatedPostRow = document.querySelector("#related-product-holder");
let postDataArray = []

async function displayRelatedPosts (){
  const response =  await fetch ('https://dummyjson.com/products?skip=1&limit=100');
  let data = await response.json();
  postDataArray = data.products;

  let selectedProdCat = openedProduct.category;
  
  for (let i=0; i<postDataArray.length; i++){
    if (postDataArray[i].category === selectedProdCat){
      let {id, images, price, title} = postDataArray[i]
      images = images[1]
      // console.log(images)

      let similarProductStrings=""
      similarProductStrings += `
        <div class="swiper-slide">
          <div class="card border-0">
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
      relatedPostRow.innerHTML += similarProductStrings
    }
  }
}

displayRelatedPosts ()



// Zoom product image on hover
function zoom(e){
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetY = e.touches[0].pageY
    x = offsetX/zoomer.offsetWidth*100
    y = offsetY/zoomer.offsetHeight*100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }

  // Similar products swipper js
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





























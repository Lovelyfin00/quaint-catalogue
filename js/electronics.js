
let electronicsItemSection = document.querySelector("#electronics-items")
let electronicsItemsArray = [];
let electronicsProducts = {}

// Calling the api stored in  our store.json in database
const api_url = 'https://dummyjson.com/products?skip=1&limit=100';


// creating an async function and fetching the api in the electronics products category

async function getElectronicsProductsData(){
    const response =  await fetch (api_url);
    let data = await response.json();
    data = data.products
    electronicsItemsArray = data
    // console.log(data)
    for (const product of electronicsItemsArray){
      // console.log(product.category)
      const catagoryName = product.category;
    //   console.log(catagoryName)
      if (catagoryName === "smartphones" || catagoryName === "laptops" || catagoryName === "lighting" || catagoryName === "mortocycle" || catagoryName === "automotive"){
        // console.log(electronicsProducts = product.id )
        electronicsProducts = product 
        // console.log(electronicsProducts)
        electronicsItems(electronicsProducts)
      }
    } 
}
getElectronicsProductsData()

// Creating a function to display the products filtered in the electronics products section

function electronicsItems (products) {
  // console.log(products)
  let {id, images, price, title} = products
  images = images[0]
  let electronicsItemsStrings=""
  electronicsItemsStrings += `
    <div class="col-lg-3 col-md-6 mb-3">
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
electronicsItemSection.innerHTML += electronicsItemsStrings
}
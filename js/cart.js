// getting id in itemsCartArray
let idOfProducts = window.localStorage.getItem("itemCartArray");
idOfProducts = JSON.parse(idOfProducts);

// getting quantity ordered from quantityOrdered
let quantityOrdered = window.localStorage.getItem("quantityOrdered");
quantityOrdered = JSON.parse(quantityOrdered);

async function gettingApiData(data) {
  const response = await fetch(
    "https://dummyjson.com/products?skip=1&limit=100"
  );
  data = await response.json();
  data = data.products;

  getIdAndData(data);
}
gettingApiData();

// Saving the quantity
let quantitySaved;
let cartProductTable = document.querySelector("#cart-product-holder");

// Checking if there is nothing in itemCartArray
let emptyCart = document.querySelector("#empty-cart");
let cartSection = document.querySelector("#cart-section");

// Calculating cart totals
let cartTotalHolder = document.querySelector("#total-of-cart");

let subTotal = 0;

if (idOfProducts === null) {
  emptyCart.style.display = "block";
  cartSection.style.display = "none";
} else {
  emptyCart.style.display = "none";
  cartSection.style.display = "block";

  // Displaying the content of the cart
  let newData = [];
  function getIdAndData(data) {
    for (let i = 0; i < idOfProducts.length; i++) {
      for (let a = 0; a < data.length; a++) {
        if (idOfProducts[i] === data[a].id) {
          newData.push(data[a]);
          let id = data[a].id;
          let title = data[a].title;
          let price = data[a].price;
          let image = data[a].images;
          image = image[0];
          let quantity = quantityOrdered[i][0];

          let tableString = "";
          tableString += `
            <tr>
                <th scope="row" class="pt-3 pb-3">
                    <div class="cart-img text-center">
                        <img src="${image}" alt="product image" class="img-fluid">
                    </div>
                </th>
                <td>
                    <div class="cart-product-title text-center ">
                        <p class="text-truncate">${title}</p>
                    </div>
                </td>
                <td>
                    <div class="cart-price text-center">
                        <p>$${price}</p>
                    </div>
                </td>
                <td>
                    <div class="cart-quantity text-center">
                        <p>${quantity}</p>
                    </div>
                </td>
                <td>
                    <div class="cart-subtotal text-center">
                        <p>$${quantity * price}</p>
                    </div>
                </td>
                <td>
                    <div class="remove-product text-center">
                        <button onclick="removeItem(${id})" class=".btn-close fa-sharp fa-solid fa-xmark border-0 bg-white fa-xl"></button>
                    </div>
                </td>
            </tr>
        `;
          cartProductTable.innerHTML += tableString;

          // Adding all the price multiplied by the quantity
          subTotal += data[a].price * quantityOrdered[i][0];
        }
      }
    }

    // Dsiplaying the UI for the subtotal section
    displaySubTotal(subTotal);
  }
}

// Dsiplaying the UI for the subtotal section
function displaySubTotal(subTotal) {
  let totalString = "";
  totalString += `
        <h2 class="main-blue-color mb-4 mt-2">Cart totals</h2>

        <table class="table align-middle table-bordered table-hover mb-5">
            <tbody>
            <tr>
                <th scope="row" class="pt-3 pb-3 px-3">Subtotal</th>
                <td>$${subTotal}.00</td>
            </tr>
            <tr>
                <th scope="row" class="pt-3 pb-3 px-3">Delivery fee</th>
                <td>$150.00</td>
            </tr>
            <tr>
                <th scope="row" class="pt-3 pb-3 px-3">Total</th>
                <td>$${subTotal + 150}.00</td>
            </tr>
            </tbody>
        </table>
        <div class="checkout-div text-center mb-5">
            <button class="border-0 main-bg-green text-dark fw-bold" onclick="checkoutBtn()">Proceed to checkout</button>
        </div>
    `;
  cartTotalHolder.innerHTML += totalString;
}

// checkout button
function checkoutBtn() {
  window.location.href = "checkout.html";
}

//   Remove item from cart
function removeItem(id) {
  for (let i = 0; i < idOfProducts.length; i++) {
    if (idOfProducts[i] === id) {
      idOfProducts.splice(i, 1);
      return idOfProducts;
    }
  }
}

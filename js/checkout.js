// PRELOADER
let preLoader = document.querySelector("#checkout-preloader");
window.addEventListener("load", () => {
  preLoader.style.display = "none";
});

// getting id in itemsCartArray
let idOfProducts = window.localStorage.getItem("itemCartArray");
idOfProducts = JSON.parse(idOfProducts);

// getting quantity ordered from quantityOrdered
let quantityOrdered = window.localStorage.getItem("quantityOrdered");
quantityOrdered = JSON.parse(quantityOrdered);

// getting data
async function gettingApiData(data) {
  const response = await fetch(
    "https://dummyjson.com/products?skip=1&limit=100"
  );
  data = await response.json();
  data = data.products;

  getIdAndData(data);
}
gettingApiData();

// displaying the content of the checkout goods
let checkoutProducts = document.querySelector("#checkout-products");
let checkoutGrandTotal = document.querySelector("#checkout-grand-total");

// variable to save grand total
let subTotal = 0;

function getIdAndData(data) {
  for (let i = 0; i < idOfProducts.length; i++) {
    for (let a = 0; a < data.length; a++) {
      if (idOfProducts[i] === data[a].id) {
        let title = data[a].title;
        let price = data[a].price;
        let quantity = quantityOrdered[i][0];

        let tableString = "";
        tableString += `
          <tr>
            <th scope="row" class="pt-3 pb-3 fw-light">${title} <span class="fw-bold">x ${quantity}</span></th>
            <td class="text-center price-color">$${quantity * price}</td>
          </tr>
                `;
        checkoutProducts.innerHTML += tableString;

        // Adding all the price multiplied by the quantity
        subTotal += data[a].price * quantityOrdered[i][0];
      }
    }
  }

  // Dsiplaying the UI for the subtotal section
  displaySubTotal(subTotal);
}

// Dsiplaying the UI for the grand total section
function displaySubTotal(subTotal) {
  let totalString = "";
  totalString += `
    <tr>
      <th scope="row" class="pt-3 pb-3">Total</th>
      <td class="text-center price-color fw-bold fs-5">$${subTotal}.00</td>
    </tr>
    `;
  checkoutGrandTotal.innerHTML += totalString;
}

// Reset the local storage when click on go home
let resetBtn = document.querySelector("#goHomeBtn");
resetBtn.addEventListener("click", () => {
  window.localStorage.clear();
  window.location.href = "index.html";
});

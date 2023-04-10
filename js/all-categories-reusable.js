// saving quantity of goods ordered
function quantityOfProduct(id, quantity) {
  let quantityOrdered = window.localStorage.getItem("quantityOrdered");
  quantityOrdered = quantityOrdered ? JSON.parse(quantityOrdered) : [];

  quantityOrdered.unshift([quantity, id]);

  window.localStorage.setItem(
    "quantityOrdered",
    JSON.stringify(quantityOrdered)
  );
}

// add to cart

function addToCart(id, prices) {
  count += 1;
  // Displaying the count on click of addToCart
  cartOnFixed.innerHTML = count;
  cartOnScroll.innerHTML = count;
  // Saving the value of the count to localstorage
  localStorage.setItem("count", JSON.stringify(count));

  // getting value of id
  storeCartId(cartIdArray, id);

  // getting value of prices
  storeprices(priceArray, prices);

  // saving quantity of goods ordered
  let quantityOfGoods = 1;
  quantityOfProduct(id, quantityOfGoods);
}

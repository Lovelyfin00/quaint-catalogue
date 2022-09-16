// getting id in itemsCartArray
let idOfProducts = window.localStorage.getItem("itemCartArray")
idOfProducts = JSON.parse(idOfProducts)
console.log(idOfProducts)

// getting quantity ordered from quantityOrdered

let quantityOrdered = window.localStorage.getItem("quantityOrdered")
quantityOrdered = JSON.parse(quantityOrdered)
// console.log(quantityOrdered)

// Checking if there is nothing in itemCartArray
let emptyCart = document.querySelector("#empty-cart")
if (idOfProducts===null){
    emptyCart.style.display = 'block';
} else{
    emptyCart.style.display = 'none';
}

// getting the quantity number
// function getQuantity (){
//     for (let i=0; i<quantityOrdered.length; i++){
//         let quantityNo = quantityOrdered[i][0]
//         console.log(quantityNo)
//     }
//  }
// getQuantity()

// getting the data

async function gettingApiData(data){
    const response =  await fetch ('https://dummyjson.com/products?skip=1&limit=100');
    data = await response.json();
    data = data.products
    // console.log(data)
    getIdAndData(data)
}
gettingApiData()

// 
let cartProductTable = document.querySelector("#cart-product-holder")

function getIdAndData(data){
    for (let i=0; i<idOfProducts.length; i++){
        data.forEach(element => {
            if (idOfProducts[i] === element.id){
                // console.log(element)
                let title = element.title
                let price = element.price
                let image = element.images
                image = image[1]
                let quantity = quantityOrdered[i][0]

                let tableString = ""
                tableString += `
                    <tr>
                        <th scope="row">
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
                                <input type="number" class="border-0" id="product-quantity" value="${quantity}">
                            </div>
                        </td>
                        <td>
                            <div class="cart-subtotal text-center">
                                <p>$${quantity*price}</p>
                            </div>
                        </td>
                        <td>
                            <div class="remove-product text-center">
                                <button class=".btn-close fa-sharp fa-solid fa-xmark border-0 bg-white fa-xl"></button>
                            </div>
                        </td>
                    </tr>
                `
                cartProductTable.innerHTML += tableString;
            }
        });
    }
}



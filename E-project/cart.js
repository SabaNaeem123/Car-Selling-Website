import products from "./products.js";
const cart = () => {
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.cartTab .close');
    let body = document.querySelector('body');
    let cart = [];
    
    iconCart.addEventListener('click', () => {
     body.classList.toggle('activeTabCart');
    })
    closeBtn.addEventListener('click', () => {
     body.classList.toggle('activeTabCart');  
    })

document.querySelector('.checkOut').addEventListener('click', function() {
    document.querySelector('.right').style.display = 'block';
});

    document.querySelector('.checkoutForm').addEventListener('submit', function() {
        alert("Thank you for choosing Car Breezy! Your order has been successfully placed. You will receive an email confirmation shortly.");
        document.querySelector('.right').style.display = 'none';
        
    });

     const setProductInCart = (idProduct, quantity, position) => {
         if(quantity > 0){
             if(position < 0){
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
             }else{
                cart[position].quantity = quantity;
            }
         }else{
            cart.splice(position, 1)
         }
         localStorage.setItem('cart', JSON.stringify(cart));
         refreshCartHTML();
     }
 const refreshCartHTML = () => {
     let listHTML = document.querySelector('.listCart');
     let totalHTML = document.querySelector('.icon-cart span');
     let totalPriceContainer = document.querySelector('.total-price-container');
     let totalPriceHTML = document.querySelector('.total-price'); 
     let totalQuantity = 0;
     let totalPrice = 0;
    listHTML.innerHTML = null;
cart.forEach(item => {
    let position = products.findIndex((value) => value.id == item.product_id);
    if (position !== -1) { // Ensure product is found in the products array
        totalQuantity += item.quantity;
        let info = products[position];
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML =
        `
        <div class="image">
          <img src="${info.image}"/>
      </div>
      <div class="name">${info.name}</div>
      <div class="totalPrice">$ 
        ${info.price * item.quantity}
      </div>
      <div class="quantity">
      <span class="minus" data-id="${info.id}">-</span>
      <span>${item.quantity}</span>
      <span class="plus" data-id="${info.id}">+</span>
      </div>
        `;
        listHTML.appendChild(newItem);
        totalPrice += info.price * item.quantity; 
    } else {
        console.error(`Product with ID ${item.product_id} not found.`);
    }
});
     totalHTML.innerText = totalQuantity;
     totalPriceHTML.innerText = `Total: $ ${totalPrice.toFixed(2)}`; 
     totalPriceContainer.querySelector('.total-pirice').innerText =  `$ ${totalPrice.toFixed(2)}`;

 }
     // event click
     document.addEventListener('click', (event) => {
         let buttonClick = event.target;
         let idProduct = buttonClick.dataset.id;
         let position = cart.findIndex((value) => value.product_id == idProduct);
         let quantity = position < 0 ? 0 : cart[position].quantity;

        
         if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
             quantity++;
             setProductInCart(idProduct, quantity, position);
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
     })
     const initApp = () => {
         if(localStorage.getItem('cart')){
             cart = JSON.parse(localStorage.getItem('cart'));
         }
         refreshCartHTML();
     }
     initApp();
}
export default cart;


// cart

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick = () =>{
cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () =>{
cart.classList.remove("active");
};


// Cart Working JS

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Making Function
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged); 
    } 
    // Add To cart
    var addCart = document.getElementsByClassName  ("btn-comprar");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
       button.addEventListener("click", addCartClicked)
    }
}
//Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Quantity Change
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
  } 
// Add to Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName ("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName ("preço")[0].innerText
    var productImg = shopProducts.getElementsByClassName ("product-img")[0].src;    
    console.log(title,price,productImg);
}


//Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("R$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //If price Contains some Cents Values
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'R$' + total;
    }
}


// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
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
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To cart
    var addCart = document.getElementsByClassName("btn-comprar");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    // Buy Button Work
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
}

// Buy button
function buyButtonClicked() {
    alert('Parabéns, Sua Compra Foi Um Sucesso!');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
    updateCartCounter();
}


//Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    updateCartCounter();
}

//Quantity Change
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
    updateCartCounter();
}
// Add to Cart
function updateCartCounter() {
    var cartItems = document.getElementsByClassName('cart-box');
    var cartCounter = document.getElementById('cart-counter');
    var totalItems = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var quantityElement = cartItems[i].getElementsByClassName('cart-quantity')[0];
        var quantity = parseInt(quantityElement.value);
        totalItems += quantity;
    }
    cartCounter.innerText = totalItems;
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest(".product-box");
    var title = shopProducts.querySelector(".product-title").innerText;
    var price = shopProducts.querySelector(".preço").innerText;
    var productImg = shopProducts.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
    updateTotal();
    updateCartCounter();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Você já adicionou esse item à sua sacola!");
            return;
        }
    }
    var cartBoxContent = ` <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" min="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}


//Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }

    document.getElementsByClassName('total-price')[0].innerText = 'R$' + total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

}


"use strict";

const cartItemsContainer = document.querySelector("#cart-items");
const emptyCartMessage = document.querySelector("#empty-cart");
const subtotalElement = document.querySelector("#subtotal");
const totalPriceElement = document.querySelector("#total-price");
const cartCountElement = document.querySelector("#cart-count");
const clearCartButton = document.querySelector("#clear-cart-button");
const checkoutButton = document.querySelector("#checkout-button");

function getCart() {
    try {
        const savedCart = localStorage.getItem("hardwareHubCart");

        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error("Der Warenkorb konnte nicht geladen werden:", error);
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("hardwareHubCart", JSON.stringify(cart));
}

function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(price);
}

function updateCartCount(cart) {
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCountElement.textContent = totalQuantity;
}

function renderCart() {
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    const isEmpty = cart.length === 0;

    emptyCartMessage.hidden = !isEmpty;
    cartItemsContainer.hidden = isEmpty;
    clearCartButton.disabled = isEmpty;
    checkoutButton.disabled = isEmpty;

    let subtotal = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const article = document.createElement("article");
        article.className = "cart-item";

        article.innerHTML = `
            <img
                class="cart-item-image"
                src="${item.image}"
                alt="${item.name}"
            >

            <div>
                <h2 class="cart-item-name">${item.name}</h2>

                <p class="cart-item-category">
                    ${item.categoryName}
                </p>

                <p class="cart-item-price">
                    Einzelpreis: ${formatPrice(item.price)}
                </p>

                <div class="quantity-controls">
                    <button
                        type="button"
                        class="quantity-button decrease-button"
                        data-product-id="${item.id}"
                        aria-label="Menge reduzieren"
                    >
                        −
                    </button>

                    <strong>${item.quantity}</strong>

                    <button
                        type="button"
                        class="quantity-button increase-button"
                        data-product-id="${item.id}"
                        aria-label="Menge erhöhen"
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    class="remove-button"
                    data-product-id="${item.id}"
                >
                    Produkt entfernen
                </button>
            </div>

            <p class="item-total">
                ${formatPrice(itemTotal)}
            </p>
        `;

        cartItemsContainer.appendChild(article);
    });

    subtotalElement.textContent = formatPrice(subtotal);
    totalPriceElement.textContent = formatPrice(subtotal);

    updateCartCount(cart);
}

function changeQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find(
        (product) => product.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    const updatedCart = cart.filter(
        (product) => product.quantity > 0
    );

    saveCart(updatedCart);
    renderCart();
}

function removeProduct(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        (item) => item.id !== productId
    );

    saveCart(updatedCart);
    renderCart();
}

cartItemsContainer.addEventListener("click", (event) => {
    const productId = Number(
        event.target.dataset.productId
    );

    if (!productId) {
        return;
    }

    if (event.target.classList.contains("increase-button")) {
        changeQuantity(productId, 1);
    }

    if (event.target.classList.contains("decrease-button")) {
        changeQuantity(productId, -1);
    }

    if (event.target.classList.contains("remove-button")) {
        removeProduct(productId);
    }
});

clearCartButton.addEventListener("click", () => {
    const confirmed = window.confirm(
        "Möchtest du den Warenkorb wirklich leeren?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("hardwareHubCart");
    renderCart();
});

checkoutButton.addEventListener("click", () => {
    window.alert(
        "Die Bestellfunktion wird später implementiert."
    );
});

renderCart();
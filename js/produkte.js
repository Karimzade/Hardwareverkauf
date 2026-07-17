"use strict";

const products = [
    {
        id: 1,
        name: "NovaBook Pro 15",
        category: "laptop",
        categoryName: "Laptop",
        price: 999.99,
        image: "../bilder/laptop.jpg",
        description: "Leistungsstarker Laptop mit 16 GB RAM und 1 TB SSD."
    },
    {
        id: 2,
        name: "UltraBook Air 14",
        category: "laptop",
        categoryName: "Laptop",
        price: 749.99,
        image: "../bilder/laptop2.jpg",
        description: "Leichter Laptop für Studium, Arbeit und unterwegs."
    },
    {
        id: 3,
        name: "VisionView 27",
        category: "monitor",
        categoryName: "Monitor",
        price: 279.99,
        image: "../bilder/monitor.jpg",
        description: "27-Zoll-Monitor mit hoher Auflösung und kräftigen Farben."
    },
    {
        id: 4,
        name: "Gaming Monitor 32",
        category: "monitor",
        categoryName: "Monitor",
        price: 429.99,
        image: "../bilder/monitor2.jpg",
        description: "Schneller Gaming-Monitor mit 165 Hz Bildwiederholrate."
    },
    {
        id: 5,
        name: "SoundBeat Wireless",
        category: "headphone",
        categoryName: "Kopfhörer",
        price: 89.99,
        image: "../bilder/headphone.jpg",
        description: "Kabellose Kopfhörer mit klarem Klang und langer Akkulaufzeit."
    },
    {
        id: 6,
        name: "ProSound ANC",
        category: "headphone",
        categoryName: "Kopfhörer",
        price: 149.99,
        image: "../bilder/headphone2.jpg",
        description: "Over-Ear-Kopfhörer mit aktiver Geräuschunterdrückung."
    },
    {
        id: 7,
        name: "AirFlow RGB Case",
        category: "case",
        categoryName: "PC-Gehäuse",
        price: 119.99,
        image: "../bilder/case.jpg",
        description: "Modernes PC-Gehäuse mit RGB-Beleuchtung und guter Kühlung."
    },
    {
        id: 8,
        name: "Mechanical Pro Keyboard",
        category: "keyboard",
        categoryName: "Tastatur",
        price: 79.99,
        image: "../bilder/keyboard.jpg",
        description: "Mechanische Tastatur mit Hintergrundbeleuchtung."
    },
    {
        id: 9,
        name: "Precision Gaming Mouse",
        category: "mouse",
        categoryName: "Maus",
        price: 49.99,
        image: "../bilder/mouse.jpg",
        description: "Ergonomische Gaming-Maus mit einstellbarer DPI."
    },
    {
        id: 10,
        name: "SmartOne X",
        category: "smartphone",
        categoryName: "Smartphone",
        price: 699.99,
        image: "../bilder/smartphone.jpg",
        description: "Modernes Smartphone mit 5G und hochwertiger Kamera."
    },
    {
        id: 11,
        name: "TabVision 11",
        category: "tablet",
        categoryName: "Tablet",
        price: 449.99,
        image: "../bilder/tablet.jpg",
        description: "Leistungsstarkes Tablet für Arbeit und Unterhaltung."
    },
    {
        id: 12,
        name: "FastDrive SSD 1 TB",
        category: "storage",
        categoryName: "Speicher",
        price: 89.99,
        image: "../bilder/ssd.jpg",
        description: "Schnelle interne SSD mit einer Speicherkapazität von 1 TB."
    },
    {
        id: 13,
        name: "Performance RTX Grafikkarte",
        category: "component",
        categoryName: "PC-Komponente",
        price: 599.99,
        image: "../bilder/grafikkarte.jpg",
        description: "Leistungsfähige Grafikkarte für Gaming und kreative Anwendungen."
    },
    {
        id: 14,
        name: "PowerCore Prozessor",
        category: "component",
        categoryName: "PC-Komponente",
        price: 329.99,
        image: "../bilder/prozessor.jpg",
        description: "Moderner Prozessor für leistungsstarke Desktop-Computer."
    }
];

const categoryNames = {
    alle: "Alle Produkte",
    laptop: "Laptops",
    monitor: "Monitore",
    headphone: "Kopfhörer",
    case: "PC-Gehäuse",
    keyboard: "Tastaturen",
    mouse: "Mäuse",
    smartphone: "Smartphones",
    tablet: "Tablets",
    storage: "Speicher",
    component: "PC-Komponenten"
};

const productsGrid = document.querySelector("#products-grid");
const categoryTitle = document.querySelector("#category-title");
const categoryButtons = document.querySelectorAll(".category-button");
const searchInput = document.querySelector("#product-search");
const cartCount = document.querySelector("#cart-count");
const notification = document.querySelector("#notification");
const noProductsMessage = document.querySelector("#no-products");

let selectedCategory = "alle";

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

function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "alle" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.categoryName.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    productsGrid.innerHTML = "";
    noProductsMessage.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach((product) => {
        const article = document.createElement("article");
        article.className = "product-card";

        article.innerHTML = `
            <div class="product-image-wrapper">
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <div class="product-content">
                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-footer">
                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        type="button"
                        class="add-to-cart-button"
                        data-product-id="${product.id}"
                    >
                        In den Warenkorb
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(article);
    });
}

function addToCart(productId) {
    const selectedProduct = products.find(
        (product) => product.id === productId
    );

    if (!selectedProduct) {
        return;
    }

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === selectedProduct.id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showNotification(`${selectedProduct.name} wurde zum Warenkorb hinzugefügt.`);
}

function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");

    window.clearTimeout(showNotification.timeout);

    showNotification.timeout = window.setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        categoryTitle.textContent = categoryNames[selectedCategory];

        renderProducts();
    });
});

searchInput.addEventListener("input", renderProducts);

productsGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-button");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.productId);

    addToCart(productId);
});

renderProducts();
updateCartCount();
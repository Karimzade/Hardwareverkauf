"use strict";

/* =========================
   PRODUKTDATEN
========================= */

const offerProducts = [
    {
        id: 101,
        name: "NovaBook Pro 15",
        category: "laptop",
        categoryName: "Laptop",
        oldPrice: 1199.99,
        price: 999.99,
        discount: 17,
        image: "../bilder/laptop.jpg",
        description:
            "Leistungsstarker Laptop mit 16 GB RAM, 1 TB SSD und schnellem Prozessor.",
        badge: "Bestseller"
    },
    {
        id: 102,
        name: "UltraBook Air 14",
        category: "laptop",
        categoryName: "Laptop",
        oldPrice: 899.99,
        price: 719.99,
        discount: 20,
        image: "../bilder/laptop2.jpg",
        description:
            "Leichter und kompakter Laptop für Studium, Büro und unterwegs.",
        badge: "Top-Angebot"
    },
    {
        id: 103,
        name: "VisionView 27",
        category: "monitor",
        categoryName: "Monitor",
        oldPrice: 349.99,
        price: 279.99,
        discount: 20,
        image: "../bilder/monitor.jpg",
        description:
            "27-Zoll-Monitor mit hoher Auflösung und hervorragender Farbdarstellung.",
        badge: "Beliebt"
    },
    {
        id: 104,
        name: "Gaming Monitor 32",
        category: "monitor",
        categoryName: "Monitor",
        oldPrice: 549.99,
        price: 439.99,
        discount: 20,
        image: "../bilder/monitor2.jpg",
        description:
            "Großer Gaming-Monitor mit 165 Hz und schneller Reaktionszeit.",
        badge: "Gaming"
    },
    {
        id: 105,
        name: "SoundBeat Wireless",
        category: "headphone",
        categoryName: "Kopfhörer",
        oldPrice: 129.99,
        price: 89.99,
        discount: 31,
        image: "../bilder/headphone.jpg",
        description:
            "Kabellose Kopfhörer mit klarem Klang und langer Akkulaufzeit.",
        badge: "Top-Rabatt"
    },
    {
        id: 106,
        name: "ProSound ANC",
        category: "headphone",
        categoryName: "Kopfhörer",
        oldPrice: 199.99,
        price: 149.99,
        discount: 25,
        image: "../bilder/headphone2.jpg",
        description:
            "Komfortable Kopfhörer mit aktiver Geräuschunterdrückung.",
        badge: "Premium"
    },
    {
        id: 107,
        name: "Mechanical Pro Keyboard",
        category: "keyboard",
        categoryName: "Tastatur",
        oldPrice: 109.99,
        price: 79.99,
        discount: 27,
        image: "../bilder/keyboard.jpg",
        description:
            "Mechanische Gaming-Tastatur mit RGB-Beleuchtung.",
        badge: "Gaming"
    },
    {
        id: 108,
        name: "Precision Gaming Mouse",
        category: "mouse",
        categoryName: "Maus",
        oldPrice: 69.99,
        price: 49.99,
        discount: 29,
        image: "../bilder/mouse.jpg",
        description:
            "Ergonomische Gaming-Maus mit anpassbarer DPI.",
        badge: "Beliebt"
    },
    {
        id: 109,
        name: "FastDrive SSD 1 TB",
        category: "storage",
        categoryName: "Speicher",
        oldPrice: 119.99,
        price: 84.99,
        discount: 29,
        image: "../bilder/ssd.jpg",
        description:
            "Schnelle SSD mit 1 TB Speicherplatz für kurze Ladezeiten.",
        badge: "Top-Preis"
    },
    {
        id: 110,
        name: "Performance RTX Grafikkarte",
        category: "component",
        categoryName: "PC-Komponente",
        oldPrice: 749.99,
        price: 599.99,
        discount: 20,
        image: "../bilder/grafikkarte.jpg",
        description:
            "Leistungsstarke Grafikkarte für Gaming und kreative Anwendungen.",
        badge: "Limited"
    },
    {
        id: 111,
        name: "PowerCore Prozessor",
        category: "component",
        categoryName: "PC-Komponente",
        oldPrice: 399.99,
        price: 329.99,
        discount: 18,
        image: "../bilder/prozessor.jpg",
        description:
            "Moderner Mehrkern-Prozessor für leistungsstarke Desktop-PCs.",
        badge: "Neu"
    },
    {
        id: 112,
        name: "AirFlow RGB Case",
        category: "component",
        categoryName: "PC-Komponente",
        oldPrice: 159.99,
        price: 119.99,
        discount: 25,
        image: "../bilder/case.jpg",
        description:
            "Modernes PC-Gehäuse mit RGB-Beleuchtung und optimaler Kühlung.",
        badge: "Gaming"
    }
];


/* =========================
   DOM-ELEMENTE
========================= */

const offersGrid = document.querySelector("#offers-grid");
const noOffersMessage = document.querySelector("#no-offers");

const searchInput = document.querySelector("#offer-search");
const categoryFilter = document.querySelector("#offer-filter");
const sortSelect = document.querySelector("#offer-sort");

const cartCount = document.querySelector("#cart-count");
const notification = document.querySelector("#notification");

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

const newsletterEmail =
    document.querySelector("#newsletter-email");

const newsletterButton =
    document.querySelector("#newsletter-button");

const newsletterMessage =
    document.querySelector("#newsletter-message");

const currentYear =
    document.querySelector("#current-year");


/* =========================
   WARENKORB
========================= */

function getCart() {
    try {
        const storedCart =
            localStorage.getItem("hardwareHubCart");

        if (!storedCart) {
            return [];
        }

        const parsedCart = JSON.parse(storedCart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];
    } catch (error) {
        console.error(
            "Der Warenkorb konnte nicht geladen werden:",
            error
        );

        return [];
    }
}


function saveCart(cart) {
    try {
        localStorage.setItem(
            "hardwareHubCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error(
            "Der Warenkorb konnte nicht gespeichert werden:",
            error
        );

        showNotification(
            "Der Warenkorb konnte nicht gespeichert werden."
        );
    }
}


function updateCartCount() {
    if (!cartCount) {
        return;
    }

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, product) => {
            const quantity =
                Number(product.quantity) || 0;

            return total + quantity;
        },
        0
    );

    cartCount.textContent = String(totalQuantity);
}


function addProductToCart(productId) {
    const selectedProduct = offerProducts.find(
        (product) => product.id === productId
    );

    if (!selectedProduct) {
        showNotification(
            "Das Produkt wurde nicht gefunden."
        );

        return;
    }

    const cart = getCart();

    const existingProduct = cart.find(
        (item) => item.id === selectedProduct.id
    );

    if (existingProduct) {
        existingProduct.quantity =
            (Number(existingProduct.quantity) || 0) + 1;
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            category: selectedProduct.category,
            categoryName:
                selectedProduct.categoryName,
            price: selectedProduct.price,
            image: selectedProduct.image,
            description:
                selectedProduct.description,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    showNotification(
        `${selectedProduct.name} wurde zum Warenkorb hinzugefügt.`
    );
}


/* =========================
   PREISE
========================= */

function formatPrice(price) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(price);
}


function calculateSaving(product) {
    return product.oldPrice - product.price;
}


/* =========================
   FILTERN UND SORTIEREN
========================= */

function getFilteredOffers() {
    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "alle";

    const selectedSort = sortSelect
        ? sortSelect.value
        : "default";

    const filteredProducts = offerProducts.filter(
        (product) => {
            const matchesCategory =
                selectedCategory === "alle" ||
                product.category === selectedCategory;

            const searchableContent = [
                product.name,
                product.description,
                product.categoryName,
                product.badge
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchableContent.includes(searchTerm);

            return matchesCategory && matchesSearch;
        }
    );

    if (selectedSort === "discount-desc") {
        filteredProducts.sort(
            (firstProduct, secondProduct) =>
                secondProduct.discount -
                firstProduct.discount
        );
    }

    if (selectedSort === "price-asc") {
        filteredProducts.sort(
            (firstProduct, secondProduct) =>
                firstProduct.price -
                secondProduct.price
        );
    }

    if (selectedSort === "price-desc") {
        filteredProducts.sort(
            (firstProduct, secondProduct) =>
                secondProduct.price -
                firstProduct.price
        );
    }

    return filteredProducts;
}


/* =========================
   PRODUKTE DARSTELLEN
========================= */

function createOfferCard(product) {
    const saving = calculateSaving(product);

    const article = document.createElement("article");

    article.className = "offer-card";

    article.innerHTML = `
        <span class="discount-badge">
            -${product.discount} %
        </span>

        <span class="product-badge">
            ${product.badge}
        </span>

        <div class="offer-image-wrapper">
            <img
                class="offer-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >
        </div>

        <div class="offer-content">

            <span class="offer-category">
                ${product.categoryName}
            </span>

            <h3 class="offer-title">
                ${product.name}
            </h3>

            <p class="offer-description">
                ${product.description}
            </p>

            <div class="offer-price-area">

                <p class="old-price">
                    ${formatPrice(product.oldPrice)}
                </p>

                <div class="new-price-row">

                    <span class="new-price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="saving">
                        Du sparst ${formatPrice(saving)}
                    </span>

                </div>

                <button
                    type="button"
                    class="add-to-cart-button"
                    data-product-id="${product.id}"
                    aria-label="${product.name} in den Warenkorb legen"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    In den Warenkorb
                </button>

            </div>

        </div>
    `;

    return article;
}


function renderOffers() {
    if (!offersGrid || !noOffersMessage) {
        return;
    }

    const filteredProducts =
        getFilteredOffers();

    offersGrid.innerHTML = "";

    const hasNoProducts =
        filteredProducts.length === 0;

    noOffersMessage.hidden = !hasNoProducts;
    offersGrid.hidden = hasNoProducts;

    if (hasNoProducts) {
        return;
    }

    const fragment =
        document.createDocumentFragment();

    filteredProducts.forEach((product) => {
        const offerCard =
            createOfferCard(product);

        fragment.appendChild(offerCard);
    });

    offersGrid.appendChild(fragment);
}


/* =========================
   BENACHRICHTIGUNG
========================= */

function showNotification(message) {
    if (!notification) {
        return;
    }

    notification.textContent = message;
    notification.classList.add("show");

    window.clearTimeout(
        showNotification.timeout
    );

    showNotification.timeout =
        window.setTimeout(() => {
            notification.classList.remove("show");
        }, 2600);
}


/* =========================
   NEWSLETTER
========================= */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}


function showNewsletterMessage(
    message,
    type = "error"
) {
    if (!newsletterMessage) {
        return;
    }

    newsletterMessage.textContent = message;

    newsletterMessage.style.color =
        type === "success"
            ? "#15803d"
            : "#dc2626";
}


function handleNewsletter() {
    if (!newsletterEmail) {
        return;
    }

    const email =
        newsletterEmail.value.trim();

    if (!email) {
        showNewsletterMessage(
            "Bitte gib deine E-Mail-Adresse ein."
        );

        newsletterEmail.focus();
        return;
    }

    if (!isValidEmail(email)) {
        showNewsletterMessage(
            "Bitte gib eine gültige E-Mail-Adresse ein."
        );

        newsletterEmail.focus();
        return;
    }

    showNewsletterMessage(
        "Vielen Dank! Du hast dich erfolgreich angemeldet.",
        "success"
    );

    newsletterEmail.value = "";
}


/* =========================
   MOBILE NAVIGATION
========================= */

function closeNavigation() {
    if (!navigation || !menuButton) {
        return;
    }

    navigation.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.textContent = "☰";
}


function toggleNavigation() {
    if (!navigation || !menuButton) {
        return;
    }

    const isOpen =
        navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.textContent =
        isOpen ? "✕" : "☰";
}


/* =========================
   URL-SUCHE
========================= */

function applySearchFromUrl() {
    if (!searchInput) {
        return;
    }

    const parameters =
        new URLSearchParams(
            window.location.search
        );

    const searchTerm =
        parameters.get("search");

    if (!searchTerm) {
        return;
    }

    searchInput.value = searchTerm;

    const offersSection =
        document.querySelector("#angebote");

    offersSection?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================
   JAHR IM FOOTER
========================= */

function updateCurrentYear() {
    if (!currentYear) {
        return;
    }

    currentYear.textContent =
        String(new Date().getFullYear());
}


/* =========================
   EVENT LISTENER
========================= */

if (searchInput) {
    searchInput.addEventListener(
        "input",
        renderOffers
    );
}


if (categoryFilter) {
    categoryFilter.addEventListener(
        "change",
        renderOffers
    );
}


if (sortSelect) {
    sortSelect.addEventListener(
        "change",
        renderOffers
    );
}


if (offersGrid) {
    offersGrid.addEventListener(
        "click",
        (event) => {
            const button = event.target.closest(
                ".add-to-cart-button"
            );

            if (!button) {
                return;
            }

            const productId =
                Number(button.dataset.productId);

            if (!Number.isInteger(productId)) {
                return;
            }

            addProductToCart(productId);
        }
    );
}


if (newsletterButton) {
    newsletterButton.addEventListener(
        "click",
        handleNewsletter
    );
}


if (newsletterEmail) {
    newsletterEmail.addEventListener(
        "keydown",
        (event) => {
            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();
            handleNewsletter();
        }
    );

    newsletterEmail.addEventListener(
        "input",
        () => {
            if (newsletterMessage) {
                newsletterMessage.textContent = "";
            }
        }
    );
}


if (menuButton && navigation) {
    menuButton.addEventListener(
        "click",
        toggleNavigation
    );

    navigation.addEventListener(
        "click",
        (event) => {
            if (!event.target.closest("a")) {
                return;
            }

            closeNavigation();
        }
    );
}


document.addEventListener(
    "click",
    (event) => {
        if (!navigation || !menuButton) {
            return;
        }

        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            closeNavigation();
        }
    }
);


window.addEventListener(
    "resize",
    () => {
        if (window.innerWidth > 850) {
            closeNavigation();
        }
    }
);


/* =========================
   INITIALISIERUNG
========================= */

function initializePage() {
    applySearchFromUrl();
    renderOffers();
    updateCartCount();
    updateCurrentYear();
}


document.addEventListener(
    "DOMContentLoaded",
    initializePage
);
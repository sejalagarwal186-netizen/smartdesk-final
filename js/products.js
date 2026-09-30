// =====================================
// PRODUCT DATA
// =====================================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        category: "Electronics"
    },

    {
        id: 2,
        name: "Laptop Stand",
        price: 1499,
        category: "Accessories"
    },

    {
        id: 3,
        name: "Keyboard",
        price: 2499,
        category: "Electronics"
    }
];



// =====================================
// CART DATA
// =====================================

let cart = [];



// =====================================
// SELECT HTML ELEMENTS
// =====================================

const productListEl =
    document.querySelector("#productList");

const productSearchEl =
    document.querySelector("#productSearch");

const categoryFilterEl =
    document.querySelector("#categoryFilter");

const priceSortEl =
    document.querySelector("#priceSort");

const cartListEl =
    document.querySelector("#cartList");

const cartSubtotalEl =
    document.querySelector("#cartSubtotal");

const cartCountEl =
    document.querySelector("#cardCount");



// =====================================
// RENDER PRODUCTS
// =====================================

export function renderProducts(productArray = products) {

    productListEl.innerHTML = "";

    productArray.forEach((product) => {

        const item =
            document.createElement("div");

        item.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p>
                Category: ${product.category}
            </p>

            <p>
                Price: ₹${product.price}
            </p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

            <hr>

        `;

        productListEl.appendChild(item);

    });

}


// =====================================
// SEARCH + FILTER + SORT PRODUCTS
// =====================================

function applyFilters() {

    let filteredProducts =
        [...products];

    const searchText =
        productSearchEl.value
            .toLowerCase()
            .trim();

    const category =
        categoryFilterEl.value;

    const sortValue =
        priceSortEl.value;


    // SEARCH

    filteredProducts =
        filteredProducts.filter(

            (product) =>

                product.name
                    .toLowerCase()
                    .includes(searchText)

        );


    // CATEGORY FILTER

    if (category !== "All") {

        filteredProducts =
            filteredProducts.filter(

                (product) =>
                    product.category === category

            );

    }


    // LOW → HIGH

    if (
        sortValue === "low-high" ||
        sortValue === "low"
    ) {

        filteredProducts.sort(

            (a, b) =>
                a.price - b.price

        );

    }


    // HIGH → LOW

    if (
        sortValue === "high-low" ||
        sortValue === "high"
    ) {

        filteredProducts.sort(

            (a, b) =>
                b.price - a.price

        );

    }


    renderProducts(filteredProducts);

}



// =====================================
// ADD PRODUCT TO CART
// =====================================

function addToCart(productId) {

    const existing =
        cart.find(

            (item) =>
                item.id === productId

        );


    if (existing) {

        existing.quantity += 1;

    }

    else {

        const product =
            products.find(

                (product) =>
                    product.id === productId

            );


        if (!product) {

            return;

        }


        cart.push({

            ...product,

            quantity: 1

        });

    }


    renderCart();

}



// =====================================
// RENDER CART
// =====================================

function renderCart() {

    cartListEl.innerHTML = "";

    cart.forEach((item) => {

        const cartItem =
            document.createElement("div");

        cartItem.innerHTML = `

            <strong>
                ${item.name}
            </strong>

            <p>
                Price: ₹${item.price}
            </p>

            <button
                onclick="decreaseQuantity(${item.id})"
            >
                -
            </button>

            <span>
                ${item.quantity}
            </span>

            <button
                onclick="increaseQuantity(${item.id})"
            >
                +
            </button>

            <hr>

        `;

        cartListEl.appendChild(cartItem);

    });


    calculateSubtotal();

    updateCartCount();

}



// =====================================
// INCREASE CART QUANTITY
// =====================================

function increaseQuantity(productId) {

    const item =
        cart.find(

            (item) =>
                item.id === productId

        );


    if (item) {

        item.quantity += 1;

    }


    renderCart();

}



// =====================================
// DECREASE CART QUANTITY
// =====================================

function decreaseQuantity(productId) {

    const item =
        cart.find(

            (item) =>
                item.id === productId

        );


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity -= 1;

    }

    else {

        cart =
            cart.filter(

                (item) =>
                    item.id !== productId

            );

    }


    renderCart();

}



// =====================================
// CALCULATE CART SUBTOTAL
// =====================================

function calculateSubtotal() {

    const subtotal =
        cart.reduce(

            (total, item) => {

                return total +
                    item.price *
                    item.quantity;

            },

            0

        );


    cartSubtotalEl.textContent =
        subtotal;

}



// =====================================
// UPDATE CART COUNT
// =====================================

function updateCartCount() {

    const totalItems =
        cart.reduce(

            (total, item) => {

                return total +
                    item.quantity;

            },

            0

        );


    if (cartCountEl) {

        cartCountEl.textContent =
            totalItems;

    }

}



// =====================================
// PRODUCT EVENT LISTENERS
// =====================================

productSearchEl.addEventListener(

    "input",

    applyFilters

);


categoryFilterEl.addEventListener(

    "change",

    applyFilters

);


priceSortEl.addEventListener(

    "change",

    applyFilters

);



// =====================================
// INITIAL PRODUCT RENDER
// =====================================

renderProducts();

renderCart();
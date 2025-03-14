document.addEventListener("DOMContentLoaded", function () {
    let modalProductName = document.getElementById("modalProductName");
    let modalProductPrice = document.getElementById("modalProductPrice");
    let modalProductDescription = document.getElementById("modalProductDescription");
    let modalProductImage = document.getElementById("productImage");
    let totalPrice = document.getElementById("totalPrice");
    let productQty = document.getElementById("productQty");
    let decreaseQty = document.getElementById("decreaseQty");
    let increaseQty = document.getElementById("increaseQty");
    let confirmPayment = document.getElementById("confirmPayment");
    let selectedPayment = document.getElementById("selectedPayment");

    let activeBuyNowButton = null; // Stores the clicked "Buy Now" button

    // Handle Buy Now button clicks
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price").replace("$", ""));
            let description = this.getAttribute("data-description");
            let image = this.getAttribute("data-image");

            modalProductName.textContent = name;
            modalProductPrice.textContent = `$${price.toFixed(2)}`;
            modalProductDescription.textContent = description;
            modalProductImage.src = image;
            productQty.value = 1;
            totalPrice.textContent = `$${price.toFixed(2)}`;
            confirmPayment.disabled = true; // Disable until payment selected
            confirmPayment.classList.remove("btn-primary", "btn-success");
            confirmPayment.classList.add("btn-danger");

            selectedPayment.textContent = "";
            activeBuyNowButton = this; // Store the clicked button
        });
    });

    // Quantity Control
    function updateTotal() {
        let price = parseFloat(modalProductPrice.textContent.replace("$", ""));
        let qty = parseInt(productQty.value);
        totalPrice.textContent = `$${(price * qty).toFixed(2)}`;
    }

    increaseQty.addEventListener("click", function () {
        let qty = parseInt(productQty.value);
        productQty.value = qty + 1;
        updateTotal();
    });

    decreaseQty.addEventListener("click", function () {
        let qty = parseInt(productQty.value);
        if (qty > 1) {
            productQty.value = qty - 1;
            updateTotal();
        }
    });

    // Payment Selection
    document.querySelectorAll(".payment-option").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".payment-option").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            let method = this.getAttribute("data-method");
            selectedPayment.textContent = `Selected Payment: ${method}`;
            confirmPayment.disabled = false;
        });
    });

    // Confirm Order
    confirmPayment.addEventListener("click", function () {
        if (!activeBuyNowButton) return;

        // Change Confirm Order button style
        confirmPayment.textContent = "Order Placed";
        confirmPayment.classList.remove("btn-danger");
        confirmPayment.classList.add("btn-primary");

        // Update Buy Now button for the ordered product
        activeBuyNowButton.textContent = "Order Placed";
        activeBuyNowButton.classList.remove("btn-primary");
        activeBuyNowButton.classList.add("btn-success");
        activeBuyNowButton.disabled = true; // Disable button
    });
});




document.addEventListener("DOMContentLoaded", function () {
    // Handle Add to Cart button clicks
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            this.textContent = "Added to Cart";
            this.classList.remove("btn-outline-secondary");
            this.classList.add("btn-success");
            this.disabled = true; // Disable button after adding to cart
        });
    });
});




// Perfect Perfume Result

function showPerfumes(type) {
    const results = document.getElementById("perfume-results");
    let perfumes = "";
    let bgColor = "";
    let textColor = "";

    if (type === "fresh") {
        perfumes = "🌊 Best picks: Cool Water, Aqua Essence, Ocean Breeze";
        bgColor = "#0d6efd";  // Blue
        textColor = "white";
    } else if (type === "floral") {
        perfumes = "🌸 Best picks: Rose Bloom, Jasmine Mist, Orchid Elegance";
        bgColor = "#d63384";  // Pink
        textColor = "white";
    } else if (type === "woody") {
        perfumes = "🌳 Best picks: Sandalwood Noir, Cedar Soul, Forest Mystery";
        bgColor = "#795548";  // Brown
        textColor = "white";
    } else if (type === "spicy") {
        perfumes = "🔥 Best picks: Pepper Fusion, Spiced Oud, Intense Ember";
        bgColor = "#dc3545";  // Red
        textColor = "white";
    }

    if (perfumes !== "") {
        results.innerHTML = `<p>${perfumes}</p>`;
        results.style.display = "block";
        results.style.opacity = "0"; // Start invisible
        results.style.padding = "15px";
        results.style.backgroundColor = bgColor;
        results.style.color = textColor;
        results.style.transform = "translateY(10px)"; // Start slightly lower

        // Add fade-in effect
        setTimeout(() => {
            results.style.opacity = "1";
            results.style.transform = "translateY(0px)";
        }, 100);
    }
}



// diff....................................................................................
/* JavaScript to trigger animation on scroll */
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".compare-item");

    function reveal() {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Initial check in case elements are already in view
});




// Shop script************************************************************************************
/* JavaScript to trigger animation on scroll */
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".compare-item");

    function reveal() {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Initial check in case elements are already in view
});




//footer......................................................
document.addEventListener("DOMContentLoaded", function () {
    const subscribeButton = document.getElementById("subscribe");
    const emailInput = document.querySelector("input[type='email']");

    subscribeButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

        if (email === "") {
            alert("Please enter your email.");
        } else if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
        } else {
            subscribeButton.textContent = "Subscribed";
            subscribeButton.classList.remove("btn-primary");
            subscribeButton.classList.add("btn-success");
            subscribeButton.disabled = true; // Prevent multiple clicks
            emailInput.disabled = true; // Disable input after subscribing
        }
    });
});


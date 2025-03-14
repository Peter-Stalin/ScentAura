document.addEventListener("DOMContentLoaded", function () {
    let activeBuyNowButton = null; // Stores the clicked "Buy Now" button

    // Handle "Add to Cart" and "Buy Now" Buttons
    document.querySelectorAll(".col").forEach(cardContainer => {
        const addToCartBtn = cardContainer.querySelector(".cart");
        const buyNowBtn = cardContainer.querySelector(".buy-now");
        const productName = cardContainer.querySelector(".card-title")?.textContent.trim();
        const productPrice = cardContainer.querySelector(".price")?.textContent.replace("$", "").trim();
        const productDescription = cardContainer.querySelector(".text-muted")?.textContent.trim();
        const productImage = cardContainer.querySelector(".card-img-top")?.src;

        if (buyNowBtn) {
            buyNowBtn.setAttribute("data-name", productName || "");
            buyNowBtn.setAttribute("data-price", productPrice || "0");
            buyNowBtn.setAttribute("data-description", productDescription || "");
            buyNowBtn.setAttribute("data-image", productImage || "");
        }

        addToCartBtn?.addEventListener("click", function () {
            this.textContent = "Added to Cart";
            this.classList.replace("btn-outline-secondary", "btn-success");
            this.disabled = true;
        });

        buyNowBtn?.addEventListener("click", function () {
            if (addToCartBtn) addToCartBtn.disabled = true;
        });
    });

    // Modal Elements
    let modal = new bootstrap.Modal(document.getElementById("productModal"));
    let modalProductName = document.getElementById("productModalLabel");
    let modalProductPrice = document.getElementById("productPrice");
    let modalProductDescription = document.getElementById("productDescription");
    let modalProductImage = document.getElementById("productImage");
    let totalPrice = document.getElementById("totalPrice");
    let productQty = document.getElementById("productQty");
    let decreaseQty = document.getElementById("decreaseQty");
    let increaseQty = document.getElementById("increaseQty");
    let confirmPayment = document.getElementById("confirmPayment");
    let selectedPaymentText = document.getElementById("selectedPayment");

    // Handle Buy Now Button Click
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function () {
            activeBuyNowButton = this;

            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));
            let description = this.getAttribute("data-description");
            let image = this.getAttribute("data-image");

            if (!name || isNaN(price) || !image) {
                console.error("Missing product data!");
                return;
            }

            // Update Modal Content
            modalProductName.textContent = name;
            modalProductPrice.textContent = `$${price.toFixed(2)}`;
            modalProductDescription.textContent = description;
            modalProductImage.src = image;
            productQty.value = 1;
            totalPrice.textContent = `$${price.toFixed(2)}`;

            // Reset Payment Selection
            confirmPayment.disabled = true;
            confirmPayment.textContent = "Confirm Payment";
            confirmPayment.classList.remove("btn-success", "btn-danger");
            confirmPayment.classList.add("btn-primary");
            selectedPaymentText.textContent = "";

            modal.show();
        });
    });

    // Update Total Price Based on Quantity
    function updateTotal() {
        let price = parseFloat(modalProductPrice.textContent.replace("$", ""));
        let qty = parseInt(productQty.value);
        totalPrice.textContent = `$${(price * qty).toFixed(2)}`;
    }

    // Quantity Control
    increaseQty.addEventListener("click", function () {
        productQty.value = parseInt(productQty.value) + 1;
        updateTotal();
    });

    decreaseQty.addEventListener("click", function () {
        if (parseInt(productQty.value) > 1) {
            productQty.value = parseInt(productQty.value) - 1;
            updateTotal();
        }
    });

    // Payment Selection
    document.querySelectorAll(".payment-option").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".payment-option").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            let method = this.getAttribute("data-method");
            selectedPaymentText.textContent = `Selected Payment: ${method}`;
            confirmPayment.disabled = false;
        });
    });

    // Confirm Order
    confirmPayment.addEventListener("click", function () {
        if (!activeBuyNowButton) return;

        confirmPayment.textContent = "Order Placed";
        confirmPayment.classList.remove("btn-primary");
        confirmPayment.classList.add("btn-success");

        activeBuyNowButton.textContent = "Order Placed";
        activeBuyNowButton.classList.remove("btn-primary");
        activeBuyNowButton.classList.add("btn-success");
        activeBuyNowButton.disabled = true;
    });

    // Reset Modal on Close
    document.getElementById("productModal").addEventListener("hidden.bs.modal", function () {
        modalProductName.textContent = "";
        modalProductPrice.textContent = "";
        modalProductDescription.textContent = "";
        modalProductImage.src = "";
        productQty.value = 1;
        totalPrice.textContent = "$0.00";
        selectedPaymentText.textContent = "";
        confirmPayment.textContent = "Confirm Payment";
        confirmPayment.disabled = true;
        confirmPayment.classList.remove("btn-success");
        confirmPayment.classList.add("btn-primary");
    });
});

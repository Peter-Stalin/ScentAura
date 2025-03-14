// shop..............................................................

// Search Bar Toggle
document.getElementById("searchIcon").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("searchBar").classList.toggle("show");
});


document.addEventListener("DOMContentLoaded", function () {
    // Handle Add to Cart & Buy Now Buttons
    document.querySelectorAll(".col").forEach(cardContainer => {
        const addToCartBtn = cardContainer.querySelector(".add-to-cart");
        const buyNowBtn = cardContainer.querySelector(".buy-now");

        // Add to Cart Button
        addToCartBtn?.addEventListener("click", function () {
            this.textContent = "Added to Cart";
            this.classList.replace("btn-outline-secondary", "btn-success");
            this.disabled = true;
        });

        // Buy Now Button
        buyNowBtn?.addEventListener("click", function () {
            this.textContent = "Sold Out";
            this.classList.replace("btn-primary", "btn-danger");
            this.disabled = true;
            addToCartBtn.disabled = true; // Disable Add to Cart when Buy Now is clicked
        });
    });

    // Modal Functionality
    let selectedPayment = "";
    let activeBuyNowButton = null; // Track the clicked Buy Now button
    const buyNowButtons = document.querySelectorAll(".buy-now");
    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    const qtyInput = document.querySelector(".product-qty"); // Updated to use class instead of ID
    const totalPriceElem = document.getElementById("totalPrice");
    const confirmPaymentBtn = document.getElementById("confirmPayment");
    const paymentOptions = document.querySelectorAll(".payment-option");
    const selectedPaymentText = document.getElementById("selectedPayment");
    const modalBody = document.querySelector(".modal-body");

    // Handle Buy Now Button Clicks
    buyNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".card");
            const productName = card.querySelector(".card-title").textContent;
            const productPrice = parseFloat(card.querySelector(".fw-bold").textContent.replace("$", ""));
            const productDescription = card.querySelector(".text-muted").textContent;
            const productImage = card.querySelector(".card-img-top").src;

            // Set Modal Content
            document.getElementById("productModalLabel").textContent = productName;
            document.getElementById("productPrice").textContent = `$${productPrice.toFixed(2)}`;
            document.getElementById("productDescription").textContent = productDescription;
            document.getElementById("productImage").src = productImage;

            // Reset Quantity and Total Price
            qtyInput.value = 1; // Ensure quantity is reset to 1
            totalPriceElem.textContent = `$${productPrice.toFixed(2)}`;

            // Reset Payment Selection
            selectedPayment = "";
            selectedPaymentText.textContent = "";
            confirmPaymentBtn.textContent = "Confirm Order";
            confirmPaymentBtn.disabled = true;
            confirmPaymentBtn.classList.remove("btn-success");
            confirmPaymentBtn.classList.add("btn-danger");

            // Track the clicked Buy Now button
            activeBuyNowButton = this;

            // Show Modal
            productModal.show();
        });
    });

    // Quantity Adjustment
    document.getElementById("increaseQty").addEventListener("click", function () {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
        updateTotalPrice();
    });

    document.getElementById("decreaseQty").addEventListener("click", function () {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) {
            qtyInput.value = qty - 1;
            updateTotalPrice();
        }
    });

    // Update Total Price Function
    function updateTotalPrice() {
        const unitPrice = parseFloat(document.getElementById("productPrice").textContent.replace("$", ""));
        const quantity = parseInt(qtyInput.value);
        totalPriceElem.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
    }

    // Payment Selection
    paymentOptions.forEach(option => {
        option.addEventListener("click", function () {
            selectedPayment = this.getAttribute("data-method");
            selectedPaymentText.textContent = `Selected Payment Method: ${selectedPayment}`;
            confirmPaymentBtn.disabled = false;
        });
    });

    // Confirm Payment
    confirmPaymentBtn.addEventListener("click", function () {
        if (selectedPayment && activeBuyNowButton) {
            // Update Confirm Payment Button
            confirmPaymentBtn.textContent = "Order Placed";
            confirmPaymentBtn.disabled = true;
            confirmPaymentBtn.classList.remove("btn-danger");
            confirmPaymentBtn.classList.add("btn-success");

            // Update the Buy Now button for the specific product
            activeBuyNowButton.textContent = "Order Placed";
            activeBuyNowButton.classList.replace("btn-primary", "btn-success");
            activeBuyNowButton.disabled = true;

            // Disable the corresponding Add to Cart button
            const addToCartBtn = activeBuyNowButton.closest(".card").querySelector(".add-to-cart");
            if (addToCartBtn) {
                addToCartBtn.disabled = true;
            }

            // Display Order Confirmation Message
            const confirmationMessage = document.createElement("div");
            confirmationMessage.classList.add("text-center", "mt-3");
            confirmationMessage.innerHTML = `
                <h5 class="text-success">Order Confirmed!</h5>
                <p><strong>Total Amount:</strong> ${totalPriceElem.textContent}</p>
                <p><strong>Payment Mode:</strong> ${selectedPayment}</p>
                <p class="text-success fw-bold">Thank you for shopping with us!</p>
            `;
            modalBody.appendChild(confirmationMessage);

            // Reset activeBuyNowButton after purchase
            activeBuyNowButton = null;
        }
    });

    // Reset Modal on Close
    productModal._element.addEventListener("hidden.bs.modal", function () {
        // Remove confirmation message if it exists
        const confirmationMessage = modalBody.querySelector(".text-center");
        if (confirmationMessage) {
            confirmationMessage.remove();
        }

        // Reset quantity
        qtyInput.value = 1; // Ensure quantity is reset to 1

        // Reset total price
        totalPriceElem.textContent = "$0.00";

        // Reset payment selection
        selectedPaymentText.textContent = "";

        // Reset confirm payment button
        confirmPaymentBtn.textContent = "Confirm Order";
        confirmPaymentBtn.disabled = true;
        confirmPaymentBtn.classList.remove("btn-success");
        confirmPaymentBtn.classList.add("btn-danger");

        // Reset active Buy Now button
        activeBuyNowButton = null;
    });
});

//footer.........................................................................
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



// extra...................................

document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (!this.classList.contains("added")) {
                this.classList.add("added");
                this.textContent = "Added to Cart";
                this.classList.remove("btn-outline-secondary");
                this.classList.add("btn-success");
            }
        });
    });
});



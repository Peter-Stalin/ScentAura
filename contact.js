document.addEventListener("DOMContentLoaded", function () {
    // Toggle Search Bar
    const searchIcon = document.getElementById("searchIcon");
    const searchBar = document.getElementById("searchBar");

    if (searchIcon && searchBar) {
        searchIcon.addEventListener("click", function (event) {
            event.preventDefault();
            searchBar.classList.toggle("active");
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector("#contact-form form");
    const submitButton = document.getElementById("send");

    if (contactForm && submitButton) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
                return;
            }

            // Change button text & style
            submitButton.textContent = "Message Sent";
            submitButton.classList.remove("btn-primary");
            submitButton.classList.add("btn-success");
            submitButton.disabled = true; // Disable button after submission

            // Clear form fields
            contactForm.reset();
        });
    }

    // Footer - Subscribe Button Validation
    const subscribeButton = document.getElementById("subscribe");
    const emailInput = document.querySelector("input[type='email']");

    if (subscribeButton && emailInput) {
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
    }
});

// Toggle Search Bar
document.getElementById("searchIcon").addEventListener("click", function () {
    let searchBar = document.getElementById("searchBar");
    if (searchBar.style.display === "block") {
        searchBar.style.display = "none";
    } else {
        searchBar.style.display = "block";
    }
});

// Select Fragrance Notes
let noteButtons = document.querySelectorAll(".fragrance-notes button");
noteButtons.forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("active"); // Toggle selection
    });
});

// Select Recommended Blend
let blendButtons = document.querySelectorAll(".recommended-blends .btn");
blendButtons.forEach(button => {
    button.addEventListener("click", function () {
        let blendName = this.previousElementSibling.textContent;
        alert("You selected: " + blendName);
    });
});


//footer...................................................
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

document.addEventListener("DOMContentLoaded", function () {
    var mobileToggle = document.getElementById("mobile-toggle");
    var mobileMenu = new bootstrap.Offcanvas(document.getElementById("mobile-menu"));

    mobileToggle.addEventListener("click", function (event) {
        event.preventDefault();  // Prevent default anchor behavior
        mobileMenu.show();       // Show menu without toggling issues
    });
});

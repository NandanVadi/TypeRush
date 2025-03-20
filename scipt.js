document.addEventListener("DOMContentLoaded", () => {
    // Smooth fade-in effect on page load
    document.body.style.opacity = "1";

    // Navbar background change on scroll
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector("nav");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Contact Form Validation
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
            } else if (!validateEmail(email)) {
                alert("Please enter a valid email.");
            } else {
                alert("Message sent successfully!");
                contactForm.reset();
            }
        });
    }
});

// Email validation function
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

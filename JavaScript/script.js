/* =========================================
   ELEGANCE FRAGRANCE CO.
   PART 3 - JAVASCRIPT
   IMAGE GALLERY LIGHTBOX
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const perfumeImages = document.querySelectorAll(
        ".product-images img"
    );

    // Create the lightbox
    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        cursor: pointer;
    `;

    // Enlarged image
    const enlargedImage = document.createElement("img");

    enlargedImage.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
        border: 2px solid #c9a65c;
        padding: 8px;
        background: white;
    `;

    // Close instruction
    const closeText = document.createElement("p");

    closeText.textContent = "Click anywhere to close  ×";

    closeText.style.cssText = `
        color: #d4b06a;
        margin-top: 15px;
        font-family: Georgia, serif;
        text-align: center;
    `;

    lightbox.appendChild(enlargedImage);
    lightbox.appendChild(closeText);
    document.body.appendChild(lightbox);

    // Open the lightbox when a perfume image is clicked
    perfumeImages.forEach(function (image) {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {

            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt;

            lightbox.style.display = "flex";

        });

    });

    // Close the lightbox
    lightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
        enlargedImage.src = "";
    });

    // Close with the Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            lightbox.style.display = "none";
            enlargedImage.src = "";
        }

    });

});



/* =========================================
   ENQUIRY FORM VALIDATION
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.querySelector(
        'form:has(#collection):has(#product)'
    );

    if (!enquiryForm) {
        return;
    }

    enquiryForm.addEventListener("submit", function (event) {

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const collection = document.getElementById("collection");
        const product = document.getElementById("product");
        const message = document.getElementById("message");

        // Remove spaces from the beginning and end
        name.value = name.value.trim();
        email.value = email.value.trim();
        message.value = message.value.trim();

        // Check required fields
        if (
            name.value === "" ||
            email.value === "" ||
            collection.value === "" ||
            product.value === "" ||
            message.value === ""
        ) {
            event.preventDefault();

            alert(
                "Please complete your name, email, collection, " +
                "fragrance and enquiry message."
            );

            return;
        }

        // Check email format
        if (!email.validity.valid || email.value.trim() === "") {
    event.preventDefault();

    alert("Please enter a valid email address, for example: name@gmail.com");
    email.focus();

    return;
}

        // Confirm submission
        alert(
            "Thank you, " + name.value +
            "! Your enquiry form has passed validation."
        );

    });

});


/* =========================================
   CONTACT FORM VALIDATION
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector(
        'form[action="https://formspree.io/f/mqpejjpd"]'
    );

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {

        const name = contactForm.querySelector("#name");
        const email = contactForm.querySelector("#email");
        const message = contactForm.querySelector("#message");

        name.value = name.value.trim();
        email.value = email.value.trim();
        message.value = message.value.trim();

        if (!name.value || !email.value || !message.value) {
            event.preventDefault();
            alert("Please complete your name, email address and message.");
            return;
        }

        if (!email.validity.valid) {
            event.preventDefault();
            alert("Please enter a valid email address.");
            email.focus();
            return;
        }

        // Allow the form to submit to Formspree.
        // Do not prevent the default submission.
    });

});


/* =========================================
   PRODUCT SEARCH AND FILTER
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("productSearch");
    const collectionFilter = document.getElementById("collectionFilter");
    const searchMessage = document.getElementById("searchMessage");
    const collections = document.querySelectorAll(".product-collection");

    if (!searchInput || !collectionFilter || !searchMessage) {
        return;
    }

    function searchProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCollection = collectionFilter.value;
        let totalMatches = 0;
        let firstMatch = null;

        collections.forEach(function (section) {
            const category = section.dataset.category;
            const products = section.querySelectorAll(".product-list li");
            let visibleProducts = 0;

            products.forEach(function (product) {
                const name = product.textContent.trim().toLowerCase();

                const matchesName = name.includes(searchTerm);
                const matchesCategory =
                    selectedCollection === "all" ||
                    selectedCollection === category;

                const matches = matchesName && matchesCategory;

                product.hidden = !matches;

                if (matches) {
                    visibleProducts++;
                    totalMatches++;

                    if (!firstMatch) {
                        firstMatch = product;
                    }
                }
            });

            section.hidden = visibleProducts === 0;
        });

        if (totalMatches === 0) {
            searchMessage.textContent =
                "No matching perfumes found. Try another name.";
        } else {
            searchMessage.textContent =
                totalMatches + " perfume(s) found.";
        }

        return firstMatch;
    }

    searchInput.addEventListener("input", searchProducts);
    collectionFilter.addEventListener("change", searchProducts);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            const match = searchProducts();

            if (match) {
                match.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }
    });

    searchProducts();

});
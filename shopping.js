document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountBadge = document.getElementById('cart-count');

    // 1. Function to update the number on the View Cart button
    function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCountBadge) {
        cartCountBadge.textContent = totalItems;
        // Hide the badge if 0 items, show it if 1 or more
        cartCountBadge.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    }
}

    // Run immediately when the page loads so the badge is accurate
    updateCartCount();

    // 2. Add to Cart Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('.product-title').innerText;
            const priceText = card.querySelector('.product-price').innerText;
            const price = parseFloat(priceText.replace('£', ''));
            const imgSrc = card.querySelector('.product-img img').getAttribute('src');

            // Get existing cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if product is already in cart
            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ title, price, quantity: 1, imgSrc });
            }

            // Save back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update the counter badge instead of showing an alert
            updateCartCount();
        });
    });
});
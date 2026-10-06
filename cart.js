// Load cart from the same 'cart' key used in your product page
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discountRate = 0;

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const itemsListContainer = document.getElementById('cart-items-list');
    const sidebarPreview = document.getElementById('sidebar-items-summary');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');
    // Check if user is a first-time buyer (hasn't checked out yet)
    const buyerBanner = document.getElementById('first-buyer-banner');
    const hasOrderedBefore = localStorage.getItem('coffee_has_ordered');

    if (buyerBanner) {
        if (!hasOrderedBefore && cart.length > 0) {
            buyerBanner.style.display = 'block';
        } else {
            buyerBanner.style.display = 'none';
        }
    }

    if (!itemsListContainer) return;

    if (cart.length === 0) {
        itemsListContainer.innerHTML = `<div class="empty-cart-msg">Your cart is currently empty. <a href="products.html" style="color: #d2b48c; font-weight:600;">Return to shop</a></div>`;
        sidebarPreview.innerHTML = `<div class="empty-cart-msg" style="padding:10px 0;">No items in cart</div>`;
        subtotalEl.textContent = '£0.00';
        shippingEl.textContent = '£0.00';
        totalEl.textContent = '£0.00';
        if(discountRow) discountRow.style.display = 'none';
        return;
    }
    

    let htmlMain = '';
    let htmlSidebar = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Use item.title and item.imgSrc from your product page JS structure
        htmlMain += `
            <div class="cart-item-row">
                <div class="cart-item-info-group">
                    <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>${item.weight || '500g'}<br>${item.grind || 'Whole Beans'}</p>
                    </div>
                </div>
                <div class="quantity-controller">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div class="cart-item-price-col">£${itemTotal.toFixed(2)}</div>
                <button class="cart-item-delete" onclick="removeItem(${index})" title="Remove item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;

        // Right sidebar preview item row
        htmlSidebar += `
            <div class="summary-preview-item">
                <span>${item.title} x ${item.quantity}</span>
                <span>£${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    itemsListContainer.innerHTML = htmlMain;
    sidebarPreview.innerHTML = htmlSidebar;

    // Calculate Totals & Discounts
    const shipping = subtotal > 0 ? 0.00 : 0.00;
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount + shipping;

    subtotalEl.textContent = `£${subtotal.toFixed(2)}`;
    shippingEl.textContent = shipping === 0 ? '£0.00' : `£${shipping.toFixed(2)}`;

    if (discountRate > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-£${discountAmount.toFixed(2)}`;
    } else {
        discountRow.style.display = 'none';
    }

    totalEl.textContent = `£${finalTotal.toFixed(2)}`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-input').value.trim().toUpperCase();
    const promoMsg = document.getElementById('promo-message');

    if (promoInput === 'COFFEE10') {
        discountRate = 0.10;
        promoMsg.textContent = 'Promo code applied: 10% off!';
        promoMsg.className = 'promo-msg success';
        renderCart();
    } else {
        discountRate = 0;
        promoMsg.textContent = 'Invalid promotional code.';
        promoMsg.className = 'promo-msg error';
        renderCart();
    }
}

function handleCheckout(event) {
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    if (!email) return;

    alert(`Proceeding to delivery for email: ${email}`);
    function handleCheckout(event) {
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    if (!email) return;

    // Mark that this browser/user has now placed an order
    localStorage.setItem('coffee_has_ordered', 'true');

    alert(`Proceeding to delivery for email: ${email}`);
    // You can redirect to your payment/delivery page here
}
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
//Tải các mặt hàng trong giỏ hàng từ localStorage

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('order-summary');
    const totalItemsElement = document.getElementById('total-items');
    let totalAmount = 0;
    let totalItems = 0;
    let uniqueCart = [];

    cart.forEach(item => {
        const existingItem = uniqueCart.find(uniqueItem => uniqueItem.title === item.title && uniqueItem.size === item.size && uniqueItem.price === item.price);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            uniqueCart.push({...item});
        }
    });

    uniqueCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        totalItems += item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = 
            `<div class="cart-item-details">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-size">Kích thước: ${item.size}</p>
                    <div class="cart-item-quantity">${item.quantity}</div>
                    <p class="cart-item-price">Giá: ${item.price.toLocaleString('vi-VN')}đ</p>
                    <p class="cart-item-total">Thành tiền: ${itemTotal.toLocaleString('vi-VN')}đ</p>
                </div>
            </div>`;
        orderSummary.appendChild(itemElement);
    });

    totalItemsElement.textContent = totalItems;
    document.getElementById('subtotal').textContent = `${totalAmount.toLocaleString('vi-VN')}đ`;

    // Tính phí vận chuyển
    let shippingFee = 0;
    if (totalAmount < 99000) {
        shippingFee = 10000;
        document.getElementById('shipping-fee').textContent = `${shippingFee.toLocaleString('vi-VN')}đ`;
    } else {
        document.getElementById('shipping-fee').textContent = "Miễn phí";
    }

    const finalAmount = totalAmount + shippingFee;
    document.getElementById('total-amount').textContent = `${finalAmount.toLocaleString('vi-VN')}đ`;
}

document.addEventListener('DOMContentLoaded', loadCartItems);

// Chức năng thanh toán (sẽ được triển khai)
function checkout() {
    alert('Đặt hàng thành công!');
}



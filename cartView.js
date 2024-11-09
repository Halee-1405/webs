// CART-VIEW (GIỎ HÀNG, LIST SẢN PHẨM ĐÃ THÊM VÀO GIỎ, XÓA SP TRONG GIỎ)


// cartView.js

$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCartItems() {
        let cartItemsContainer = $('#cart-items');
        cartItemsContainer.empty();

        if (cart.length === 0) {
            cartItemsContainer.append('<p>Giỏ hàng của bạn đang trống.</p>');
        } else {
            cart.forEach((item, index) => {
                let cartItem = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-item-info">
                            <h3>${item.title}</h3>
                            <p>${item.price}</p>
                            <p>Số lượng: ${item.quantity}</p>
                            <button class="remove-item" data-index="${index}">&times;</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.append(cartItem);
            });
        }
    }

    // Function to update cart count in navigation
    function updateCartCount() {
        $('#cart-count').text(cart.length);
    }

    // Render cart items on page load
    renderCartItems();
    updateCartCount();

    // Remove item from cart
    $(document).on('click', '.remove-item', function() {
        let index = $(this).data('index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    });

    // Checkout button click event
    $('#checkout-btn').on('click', function(event) {
        if (cart.length === 0) {
            event.preventDefault();
            alert('Giỏ hàng của bạn đang trống.');
        }
    });
});




// SLIDE PRODUCTS //

    document.addEventListener('DOMContentLoaded', function () {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const products = document.querySelector('.products');
        const productElements = Array.from(document.querySelectorAll('.producta'));
        const productCount = productElements.length;
        const visibleProducts = 3;
        const productWidth = productElements[0].offsetWidth + 50; // Bao gồm cả ký quỹ
        let currentIndex = 0;
        let autoSlideInterval;
        let autoSlideTimeout;

        // Sao chép một vài sản phẩm đầu tiên và nối chúng vào cuối
        for (let i = 0; i < visibleProducts; i++) {
            const clone = productElements[i].cloneNode(true);
            products.appendChild(clone);
        }

        function slideProducts(index) {
            products.style.transition = 'transform 0.5s ease';
            products.style.transform = `translateX(-${index * productWidth}px)`;
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(autoSlide, 3000); // Trượt cứ sau 3 giây
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            clearTimeout(autoSlideTimeout);
            autoSlideTimeout = setTimeout(startAutoSlide, 3000); // Tiếp tục trượt tự động sau 3 giây
        }

        prevButton.addEventListener('click', function () {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = productCount;
                products.style.transition = 'none';
                products.style.transform = `translateX(-${currentIndex * productWidth}px)`;
                setTimeout(() => {
                    products.style.transition = 'transform 0.5s ease';
                    currentIndex--;
                    slideProducts(currentIndex);
                }, 20);
            } else {
                slideProducts(currentIndex);
            }
            resetAutoSlide();
        });

        nextButton.addEventListener('click', function () {
            currentIndex++;
            if (currentIndex > productCount) {
                currentIndex = 1;
                products.style.transition = 'none';
                products.style.transform = `translateX(0px)`;
                setTimeout(() => {
                    products.style.transition = 'transform 0.5s ease';
                    slideProducts(currentIndex);
                }, 20);
            } else {
                slideProducts(currentIndex);
            }
            resetAutoSlide();
        });

        function autoSlide() {
            currentIndex++;
            if (currentIndex > productCount) {
                currentIndex = 1;
                products.style.transition = 'none';
                products.style.transform = `translateX(0px)`;
                setTimeout(() => {
                    products.style.transition = 'transform 0.5s ease';
                    slideProducts(currentIndex);
                }, 20);
            } else {
                slideProducts(currentIndex);
            }
        }

        startAutoSlide();
    });
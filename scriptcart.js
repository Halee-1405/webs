// CART PRICE //

document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    const priceElement = document.getElementById('price');
    
    // Thiết lập trạng thái ban đầu
    sizeButtons.forEach(button => {
        if (button.classList.contains('active')) {
            button.style.borderColor = 'red';
            priceElement.textContent = button.getAttribute('data-price');
        } else {
            button.style.borderColor = '#ccc';
        }
    });
    
    // Thêm sự kiện click cho mỗi nút
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Loại bỏ lớp active và đặt lại màu viền cho tất cả các nút
            sizeButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.borderColor = '#ccc';
            });
            
            // Thêm lớp active và đặt màu viền thành đỏ cho nút được nhấp
            this.classList.add('active');
            this.style.borderColor = 'red';
            
            // Cập nhật giá
            priceElement.textContent = this.getAttribute('data-price');
        });
    });
});

// LIÊN KẾT & LƯU TRỮ THÔNG TIN GIỎ HÀNG
$(document).ready(function() {
    // Hàm cập nhật số lượng giỏ hàng
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalCount > 0) {
            $('#cart-count').text(totalCount).show();
        } else {
            $('#cart-count').hide();
        }
    }

    // Khởi tạo số lượng giỏ hàng khi tải trang
    updateCartCount();

    // Hàm định dạng giá tiền nhất quán với dấu phẩy
    function formatPrice(price) {
        return price.toLocaleString('vi-VN').replace(/\./g, ',') + "đ";
    }

    // Thiết lập giá ban đầu khi mới vào web
    var initialPrice = parseFloat($("#price").text().replace("Giá: ", "").replace("đ", "").replace(".", ""));
    $("#price").text("Giá: " + formatPrice(initialPrice));
    var basePrice = parseFloat($(".size-btn.active").data("price").replace("Giá: ", "").replace("đ", "").replace(".", ""));

    // Cập nhật giá khi thay đổi kích thước
    $(".size-btn").click(function() {
        $(".size-btn").removeClass("active");
        $(this).addClass("active");
        basePrice = parseFloat($(this).data("price").replace("Giá: ", "").replace("đ", "").replace(".", ""));
        $("#price").text("Giá: " + formatPrice(basePrice));
    });

    // Tăng số lượng
    $("#increase").click(function() {
        var quantity = parseInt($("#quantity").text()); //lấy giá trị hiện tại của số lượng
        $("#quantity").text(quantity + 1);
    });

    // Giảm số lượng
    $("#decrease").click(function() {
        var quantity = parseInt($("#quantity").text());
        if (quantity > 1) {
            $("#quantity").text(quantity - 1);
        }
    });

    // Thêm vào giỏ hàng
    $(".add-to-cart").click(function() {
        // Lấy thông tin sản phẩm từ các phần tử trên giao diện
        var productTitle = $(".cart-title").text(); //Lấy nội dung văn bản của phần tử có lớp "cart-title"
        var productSize = $(".size-btn.active").text();
        var productPrice = parseFloat($(".size-btn.active").data("price").replace("Giá: ", "").replace("đ", "").replace(".", ""));
        var productQuantity = parseInt($("#quantity").text());
        var productImage = $(".cart-img img").attr("src");
        var totalPrice = productPrice * productQuantity;
    // Kiểm tra thông tin sản phẩm
        if (!productTitle || !productSize || isNaN(productPrice) || isNaN(productQuantity) || !productImage) {
            alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
            return;
        }
    // Lấy giỏ hàng từ localStorage
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var existingProductIndex = cart.findIndex(item => item.title === productTitle && item.size === productSize);

        if (existingProductIndex !== -1) {
            // Cập nhật số lượng nếu sản phẩm đã tồn tại trong giỏ
            cart[existingProductIndex].quantity += productQuantity;
        } else {
            // Thêm sản phẩm mới vào giỏ
            cart.push({
                title: productTitle,
                size: productSize,
                price: productPrice,
                quantity: productQuantity,
                image: productImage
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật thông tin sản phẩm trong popup
        $("#cart-items").html(`
            <div class="cart-item">
                <img src="${productImage}" alt="${productTitle}">
                <div class="cart-item-info">
                    <h3>${productTitle}</h3>
                    <p>Kích thước: ${productSize}</p>
                    <p>Số lượng: ${productQuantity}</p>
                    <p>Giá: ${formatPrice(totalPrice)}</p>
                </div>
            </div>
        `);

        // Hiển thị popup
        $("#cart-popup").fadeIn();

        // Cập nhật số lượng giỏ hàng ngay lập tức
        updateCartCount();
    });

    // Đóng popup
    $(".close").click(function() {
        $("#cart-popup").fadeOut();
    });

    // Đóng popup khi nhấn ra ngoài
    $(window).click(function(event) {
        if (event.target.id === "cart-popup") {
            $("#cart-popup").fadeOut();
        }
    });

    // Nút thanh toán
    $("#checkout-button").click(function() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống.");
            return;
        }
        window.location.href = "cart-Pay.html";
    });
});


// NHẤN VÀO MUA HÀNG HIỂN THỊ NGAY ĐƠN HÀNG 
function getProductDetails() {
    const title = document.querySelector('.cart-title').innerText;
    const image = document.querySelector('.cart-img img').src;
    const price = parseInt(document.querySelector('.cart-price h1').innerText.replace('Giá: ', '').replace('đ', '').replace(',', ''));
    const size = document.querySelector('.size-btn.active').innerText;
    const quantity = parseInt(document.getElementById('quantity').innerText);

    return {
        title,
        image,
        price,
        size,
        quantity
    };
}

// Chức năng lưu sản phẩm vào bộ nhớ cục bộ
function saveProductToLocalStorage(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Trình xử lý sự kiện cho nút "MUA NGAY"
document.getElementById('buy-now').addEventListener('click', function(event) {
    event.preventDefault();
    const product = getProductDetails();
    saveProductToLocalStorage(product);
    window.location.href = 'cart-Pay.html';
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


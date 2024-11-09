// SEARCH-BAR //

$(document).ready(function() {
// Hiển thị thanh tìm kiếm khi nhấn vào biểu tượng tìm kiếm
    $('#search').on('click', function() {
        $('.search-form').toggleClass('active');
    });

// Đóng thanh tìm kiếm khi nhấn bất cứ đâu ngoài thanh tìm kiếm và biểu tượng tìm kiếm
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-form, #search').length) {
            $('.search-form').removeClass('active');
        }
    });
});


// Tìm kiếm sản phẩm
    $(document).ready(function() {
        // Chức năng tìm kiếm sản phẩm khi nhấn phím Enter
        $('#search-box').on('keyup', function(event) {
            if (event.keyCode === 13) { // Kiểm tra nếu phím Enter được nhấn
                searchProduct();
            }
        });
    
        // Chức năng tìm kiếm sản phẩm khi nhấn vào biểu tượng tìm kiếm
        $('#search-btn').on('click', function() {
            searchProduct();
        });
    
        function searchProduct() {
            var searchValue = $('#search-box').val().toLowerCase();
            
            // Tìm kiếm sản phẩm
            $('.list-menu').each(function() {
                var productName = $(this).find('.name').text().toLowerCase();
                if (productName.includes(searchValue)) {
                    var productLink = $(this).attr('href');
                    window.location.href = productLink;
                    return false; // Thoát khỏi vòng lặp each
                }
            });
            $('.producta').each(function() {
                var productName = $(this).find('.name').text().toLowerCase();
                if (productName.includes(searchValue)) {
                    var productLink = $(this).attr('href');
                    window.location.href = productLink;
                    return false; // Thoát khỏi vòng lặp each
                }
            });
        }
    });


//  SLIDE-POSTER //

// Khởi tạo Biến
    let currentIndex = 0;
    let slides = document.querySelectorAll('.slide');
    let navBtns = document.querySelectorAll('.nav-btn');
    let totalSlides = slides.length;
// Hàm này hiển thị slide cập nhật trạng thái nút điều hướng
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${-100 * index}%)`;
            navBtns[i].classList.remove('active');
        });
        navBtns[index].classList.add('active');
    }
// Hàm này tăng currentIndex và hiển thị slide tiếp theo.
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }
// Hàm này đặt currentIndex thành slide cụ thể và hiển thị nó.
    function currentSlide(index) {
        currentIndex = index - 1;
        showSlide(currentIndex);
    }
// Thêm các sự kiện nhấp vào tất cả các nút điều hướng
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => currentSlide(index + 1));
    });
// Tự động chuyển đến slide tiếp theo mỗi 5 giây.
    setInterval(nextSlide, 5000);

// Khởi tạo slide đầu tiên
    showSlide(currentIndex);











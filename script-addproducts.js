
// ADD PRODUCTS //

document.addEventListener("DOMContentLoaded", function() {
    const loadMoreButton = document.getElementById("loadMore");
    let currentIndex = 2; // Bắt đầu từ phần tử thứ 3 đã hiển thị

    loadMoreButton.addEventListener("click", function() {
        const items = document.querySelectorAll(".menu-hot");
        let nextIndex = currentIndex + 1; // Chỉ hiển thị thêm một menu-hot

        for (let i = currentIndex; i < nextIndex; i++) {
            if (items[i]) {
                items[i].style.display = "flex";
            }
        }

        currentIndex = nextIndex;

        // Nếu đã hiển thị hết tất cả menu-hot, ẩn nút "Xem Thêm"
        if (currentIndex >= items.length) {
            loadMoreButton.style.display = "none";
        }
    });
});


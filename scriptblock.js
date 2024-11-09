// BLOCK ĐỘNG

document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 500); // Hiển thị mỗi phần tử sau 500ms
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var swiper;

    // Function to initialize Swiper
    function initSwiper() {
        swiper = new Swiper(".cards", {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            centeredSlides: true,
            fade: true,
            navigation: {
                nextEl: ".next",
                prevEl: ".prev",
            },
        });
    }

    // Initialize Swiper on DOMContentLoaded
    initSwiper();

    // Function to update Swiper settings based on screen width
    function updateSwiperSettings() {
        if (window.matchMedia("(max-width: 900px)").matches) {
            if (swiper.params.slidesPerView !== 'auto') {
                swiper.params.slidesPerView = 'auto';
                swiper.update(); // Update Swiper instance
            }
        } else if (window.matchMedia("(max-width: 480px)").matches) {
            if (swiper.params.slidesPerView !== 'auto') {
                swiper.params.slidesPerView = 'auto';
                swiper.update(); // Update Swiper instance
            }
        } else {
            if (swiper.params.slidesPerView !== 3) {
                swiper.params.slidesPerView = 3;
                swiper.update(); // Update Swiper instance
            }
        }
    }

    // Check and update Swiper settings on page load and resize
    window.addEventListener('resize', updateSwiperSettings);
});

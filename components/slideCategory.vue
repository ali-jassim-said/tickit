<template>
  <div class="category-picture">
    <img src="../public/img/text2.png" alt="" />
    <div class="middle swiper-container3">
      <div class="icons-category">
        <i class="ri-arrow-left-s-line prev3"></i>
        <i class="ri-arrow-right-s-line next3"></i>
      </div>
      <div class="slide-middle">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide card-middle"
            v-for="(item, index) in categories"
            :key="index"
            :class="{ 'active-slide': index === activeIndex }"
          >
            <div>{{ item.order }}</div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <img class="pic2" src="../public/img/text1.png" alt="" />
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/stores/categories";
import { onMounted, ref, watch } from "vue";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

// Swiper setup
Swiper.use([Navigation]);

const categoriesStore = useCategoriesStore();
const categories = ref([]);
const error = ref(null);
const activeIndex = ref(0);

const fetchCategories = async () => {
  await categoriesStore.fetchCategories();
  categories.value = categoriesStore.categories;
  error.value = categoriesStore.error;
};

const initSwiper = () => {
  const swiperContainer = document.querySelector(".swiper-container3 .slide-middle");
  const swiperOptions = {
    navigation: {
      nextEl: ".next3",
      prevEl: ".prev3",
    },
    slidesPerView: 'auto',
    spaceBetween: 7,
    loop: categories.value.length > 1, // Enable loop only if there are enough slides
    centeredSlides: false,
    fade: true,
  };

  

  if (swiperContainer) {
    new Swiper(swiperContainer, swiperOptions);
  }

  new Swiper(swiperContainer, swiperOptions);
};

onMounted(async () => {
  await fetchCategories();
  initSwiper();
});

watch(categories, () => {
  if (categories.value.length > 0) {
    initSwiper();
  }
});
</script>

<style scoped>
.category-picture {
  background-image: url("../public/img/categoryPic.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 302px;
  margin: 100px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-picture img:nth-child(1) {
  width: 231px;
  height: 130px;
}

.category-picture .pic2 {
  width: 137px !important;
  height: 98px !important;
}

.icons-category {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icons-category i {
  width: 32px;
  height: 32px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 100px;
  border: 1px;
  background: rgba(34, 129, 217, 0.5);
  color: #fff;
  cursor: pointer;
  z-index: 100;
}

.card-middle {
  width: 177px;
  height: 216px;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  position: relative;
  cursor: pointer;
  user-select: none;
}

.card-middle i {
  font-size: 50px;
  color: #fff;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-middle p {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 19.5px;
  color: #fff;
}

.active-slide {
  background: rgba(255, 255, 255, 1);
}

.middle {
  overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}

.slide-middle{
  overflow: hidden;
}
</style>

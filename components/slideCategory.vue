<template>
  <div class="category-picture">
    <div class="text-imgs">
      <img src="../public/img/text2.png" alt="" />
      <img src="../public/img/text1.png" alt="" />
    </div>
    <div class="icons-category">
      <i class="ri-arrow-left-s-line next3"></i>
      <i class="ri-arrow-right-s-line prev3"></i>
    </div>
    <div class="slide-middle swiper-container3">
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

const fetchCategories = async () => {
  await categoriesStore.fetchCategories();
  categories.value = categoriesStore.categories;
  error.value = categoriesStore.error;
};

const initSwiper = () => {
  const swiperContainer = document.querySelector(".swiper-container3");
  const swiperOptions = {
    navigation: {
      nextEl: ".next3",
      prevEl: ".prev3",
    },
    slidesPerView: "auto",
    spaceBetween: 7,
    loop: categories.value.length > 1, // Enable loop only if there are enough slides
    centeredSlides: false,
    fade: true,
  };

  if (swiperContainer.swiper) {
    swiperContainer.swiper.destroy(true, true); // Destroy previous Swiper instance if exists
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

<style>
.category-picture {
  background-image: url("../public/img/categoryPic.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 302px;
  position: relative;
  margin: 100px 0px;
}

.category-picture .text-imgs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.category-picture .text-imgs :nth-child(1) {
  width: 231px;
  height: 98px;
}

.category-picture .text-imgs :nth-child(2) {
  width: 137px;
  height: 98px;
}

.icons-category {
  position: absolute;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  width: 51%;
  height: 10%;
  display: flex;
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

.slide-middle {
  position: absolute;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  width: 48%;
  height: 70%;
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  gap: 10px;
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
</style>

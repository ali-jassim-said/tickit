<template>
  <div class="category-picture">
    <div class="head-category"><span>كلشي</span> موجود بمنصة واحد</div>
    <div
      class="swiper-containerM2"
      style="
        height: 116px;
        overflow: hidden;
      "
    >
      <div class="swiper-wrapper container-slide">
        <div
          class="swiper-slide card"
          v-for="(category, index) in categories"
          :key="category.id"
          :class="{ active: isActiveSlide(index) }"
          @click="updateActiveSlide(category)"
        >
          <h3>{{ category.name }}</h3>
          <i class="ri-calendar-2-line"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { useCategoriesStore } from "@/stores/categories";

const categoriesStore = useCategoriesStore();
const categories = ref([]);
const error = ref(null);
const activeIndex = ref(0);

const fetchCategories = async () => {
  try {
    await categoriesStore.fetchCategories();
    categories.value = categoriesStore.categories;
    error.value = categoriesStore.error;
  } catch (err) {
    console.error('Error fetching categories:', err);
    error.value = 'Failed to fetch categories.';
  }
};

const initSwiper = () => {
  const swiperContainer = document.querySelector(".swiper-containerM2");
  if (swiperContainer) {
    new Swiper(swiperContainer, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
      fadeEffect: { crossFade: true },
      effect: "fade",
    });
  }
};

function updateActiveSlide(category) {
  activeIndex.value = categories.value.indexOf(category);
}

function isActiveSlide(index) {
  return index === activeIndex.value;
}

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
  height: 190px;
  position: relative;
  margin: 100px 0px;
}

.head-category {
  font-size: 23px;
  font-weight: 300;
  line-height: 48px;
  text-align: right;
  padding: 20px;
  color: rgba(255, 255, 255, 1);
}

.head-category span {
  font-size: 24px;
  font-weight: 700;
  line-height: 48px;
}

.container-slide {
  height: 96px;
  display: flex;
  align-items: center;
  margin-left: 13px;
}

.container-slide .card {
  width: 160px;
  height: 68px;
  padding: 18px 24px 18px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  position: relative;
  transition: all 0.3s ease;
}

.container-slide .card.active {
  width: 180px !important;
  height: 68px;
  padding: 18px 24px 18px 24px;
  gap: 8px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 1);
}

.container-slide .card.active::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 84px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 24px;
  border: 3px;
  border: 3px solid rgba(255, 255, 255, 1);
}

.card h3 {
  font-size: 16px;
  font-weight: bold;
  line-height: 19.5px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}

.card.active h3 {
  font-size: 20px;
  font-weight: 700;
  line-height: 19.5px;
  text-align: center;
  color: rgba(34, 129, 217, 1);
}

.card i {
  font-size: 20px;
  color: #fff;
}

.card.active i {
  font-size: 25px;
  color: rgba(34, 129, 217, 1);
}
</style>



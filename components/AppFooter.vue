<template>
  <div
    class="home"
    :style="{ backgroundImage: `url(${activeSlideImage}) !important` }"
  >
    <nav class="nav-home">
      <div class="svg-nav">
        <img src="../public/svg/Logo.svg" alt="svg-home" />
      </div>
      <div class="nav-login">
        <button>Login</button>
        <i class="ri-logout-box-r-line"></i>
      </div>
    </nav>
    <div class="collections">
      <div class="collections-head">
        <div class="collections-icon">
          <i class="ri-arrow-left-s-line next"></i>
          <i class="ri-arrow-right-s-line prev"></i>
        </div>
        <div class="collections-text">
          <p>الاحداث الاكثر حجزا</p>
        </div>
      </div>
      <div class="collections-cards">
        <div class="card-text">
          <h2>{{ activeSlideText }}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Curabitur morbi est euismod
            mi sed morbi odio feugiat convallis. Phasellus blandit donec turpis
            adipiscing. Sed interdum leo in scelerisque elementum massa eros
            morbi lectus. Malesuada vivamus nec pharetra interdum molestie.
          </p>
        </div>
        <Swiper
          class="cards"
          :modules="[Navigation, Autoplay]"
          :slides-per-view="3"
          :loop="true"
          
          :autoplay="{
            delay: 2000,
          }"
          :navigation="{
            nextEl: '.prev',
            prevEl: '.next',
          }"
      
          :space-between="20"
        >
          <SwiperSlide
            class="card"
            v-for="(slide, index) in slides"
            :key="index"
            @click="updateActiveSlide(slide)"
            :class="{ active: isActiveSlide(index) }"
          >
            <div class="img">
              <img :src="slide.image" alt="" />
            </div>
            <div class="text">
              <h2 :class="{ activeText: isActiveSlide(index) }">{{ slide.text }}</h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-text">عرض المزيد</div>
      <div class="scroll-icon"><i class="ri-arrow-down-double-fill"></i></div>
    </div>
  </div>
</template>

<script setup>
import { Navigation, Autoplay } from "swiper/modules";

const slides = ref([
  {
    image: "/img/home.png",
    text: "Lorem ipsum dolor sit amet consectetur 1.",
  },
  {
    image: "/img/home2.png",
    text: "Lorem ipsum dolor sit amet consectetur 2.",
  },
  {
    image: "/img/home.png",
    text: "Lorem ipsum dolor sit amet consectetur 3.",
  },
  {
    image: "/img/home.png",
    text: "Lorem ipsum dolor sit amet consectetur 4.",
  },
]);


const activeSlideText = ref(slides.value[0].text);
const activeSlideImage = ref(slides.value[0].image);
const activeIndex = ref(0);

function updateActiveSlide(slide) {
  activeSlideText.value = slide.text;
  activeSlideImage.value = slide.image;
  activeIndex.value = slides.value.findIndex((s) => s === slide);
}

function isActiveSlide(index) {
  return index === activeIndex.value;
}
</script>

<style>
@import url("remixicon/fonts/remixicon.css");

/*
import { onMounted, ref } from "vue";
import { useCategoriesStore } from "@/stores/categories";




const categoriesStore = useCategoriesStore();
const categories = ref([]);
const error = ref(null);



const fetchCategories = async () => {
  await categoriesStore.fetchCategories();
  categories.value = categoriesStore.categories;
  error.value = categoriesStore.error;
};

onMounted(async () => {
  await fetchCategories();
});
*/

.active{
  background-color: #fff !important;
}

.activeText{
  color: black !important;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* loading.css */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.home {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: relative;
}

.nav-home {
  width: 90%;
  height: 62px;
  margin: auto;
  padding: 18px 0px 18px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.svg-nav {
  width: 116.71px;
  height: 18px;
}

.nav-login {
  width: 73px;
  height: 24px;
  padding: 6px 12px 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
}

.nav-login button {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(255, 255, 255, 1);
}

.nav-login i {
  color: rgba(255, 255, 255, 1);
}

.collections {
  width: 90%;
  height: 258px;
  margin: auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 18px;
  position: absolute;
  bottom: 130px;
  right: 5%;
  left: 5%;
}

.collections-head {
  width: 567px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collections-icon {
  width: 60px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.collections-icon i {
  width: 24px;
  height: 24px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: 1px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

.collections .collections-text {
  font-size: 20px;
  font-weight: 700;
  line-height: 24.38px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}

.collections-cards {
  width: 100%;
  height: 216px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.collections-cards .card-text {
  height: 191px;
  justify-content: space-between;
  border-right: 2px solid rgba(255, 255, 255, 1);
  padding-right: 15px;
}

.collections-cards .card-text h2 {
  font-size: 48px;
  font-weight: 400;
  line-height: 48px;
  text-align: right;
  color: rgba(255, 255, 255, 1);
}

.collections-cards .card-text p {
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 1);
}

.collections-cards .cards {
  height: 216px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.collections-cards .cards .card {
  width: 177px !important;
  height: 216px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  cursor: pointer;
}

.collections-cards .cards .card .img img {
  width: 159px;
  height: 149px;
  border-radius: 8px;
}

.collections-cards .cards .card .text h2 {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  text-align: left;
  color: #fff;
}

.scroll {
  width: 117px;
  height: 77px;
  gap: 12px;
  position: absolute;
  bottom: 20px;
  left: 50% !important;
  transform: translateX(-50%) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scroll .scroll-text {
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  color: #fff;
}

.scroll .scroll-icon {
  width: 40px;
  height: 40px;
  padding: 15px 0px 14px 0px;
  border-radius: 100px;
  border: 1px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.scroll .scroll-icon i {
  color: #fff;
}
</style>

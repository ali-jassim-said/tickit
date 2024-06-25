<template>
 <home1 v-show="!isMobile" />
 <home-mopile v-show="isMobile" />
 <slide-category v-show="!isMobile"/>
 <slide-category-mopile v-show="isMobile"/>
 <collection1/>
 <collection2/>
 <category1/>
 <footer-up/>
</template>

<script setup>



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


import { ref, onMounted } from "vue";

const isMobile = ref(false);

const handleResize = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth <= 400;
  }
};

onMounted(() => {
  handleResize(); // Set initial value
  window.addEventListener('resize', handleResize);
});






</script>

<style>





</style>

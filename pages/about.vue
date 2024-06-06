<template>
  <h3>about</h3>
  <ul>
    <li v-for="collection in collections" :key="collection.id">
      <p>{{ collection.name }}</p>
    </li>
  </ul>
  <div class="flex">
            <div v-if="collectionStore.loading" class="loading-spinner"></div>
          </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import {useCollectionStore} from '@/stores/collections'

const collectionStore = useCollectionStore();

const collections = ref([])
const error = ref(null)

const fetchCollections = async () => {
  await collectionStore.fetchCollections();
  collections.value = collectionStore.collections;
  error.value = collectionStore.error;
}

onMounted(async () => {
  await fetchCollections()
})
</script>

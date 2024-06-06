<template>
  <div>
    <h1>Customer Events</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="event in events" :key="event.id">
          <p>{{ event.title }}</p>
        </li>
      </ul>
      <button @click="loadMore">Load More</button>
    </div>
    <div class="flex">
          <div v-if="eventsStore.loading" class="loading-spinner"></div>
          </div>
  </div>   
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useEventsStore} from '@/stores/events';

const eventsStore = useEventsStore();

const events = ref([]);
const error = ref(null);
const PageNumber = eventsStore.PageNumber;
const PageSize = eventsStore.PageSize;
const categoryId = eventsStore.categoryId;
const collectionId = eventsStore.collectionId;

const fetchEvents = async (pageNumber, pageSize, categoryId, collectionId) => {
  await eventsStore.fetchEvents(pageNumber, pageSize, categoryId, collectionId);
  events.value = eventsStore.events;
  error.value = eventsStore.error;
}

const loadMore = async () => {
  await fetchEvents(PageNumber + 1, PageSize, categoryId, collectionId);
  if(eventsStore.totalCount/eventsStore.PageSize > eventsStore.lastPage){
    
  }
};


onMounted(async () => {
  await  fetchEvents(PageNumber, PageSize, categoryId, collectionId);
})

</script>
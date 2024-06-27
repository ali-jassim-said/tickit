<template>
  <div>
    <h3>Collections</h3>
    <ul v-if="collections.length > 0">
      <li v-for="collection in collections" :key="collection.id">
        <p>{{ collection.name }}</p>
        <button @click="fetchEvents(collection.id)">Fetch Events</button>
      </li>
    </ul>
    <p v-else>No collections available.</p>

    <div v-if="collectionStore.loading" class="loading-spinner"></div>
    <p v-if="error">{{ error }}</p>

    <h3>Events</h3>
    <ul v-if="events.length > 0">
      <li v-for="event in events" :key="event.id">
        <p>{{ event.description || 'No description available' }}</p>
      </li>
    </ul>
    <p v-else>No events fetched.</p>

    <div v-if="collectionStore.eventLoading" class="loading-spinner"></div>
    <p v-if="eventError">{{ eventError }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCollectionStore } from '@/stores/collections';

const collectionStore = useCollectionStore();

const collections = ref([]);
const events = ref([]);
const error = ref(null);
const eventError = ref(null);

const fetchCollections = async () => {
  try {
    await collectionStore.fetchCollections();
    collections.value = collectionStore.collections;
    error.value = collectionStore.error;
  } catch (err) {
    console.error('Error fetching collections:', err);
    error.value = 'Failed to fetch collections.';
  }
};

const fetchEvents = async (collectionId) => {
  const pageNumber = 1; // Example page number
  const pageSize = 10; // Example page size
  try {
    await collectionStore.fetchEventsByCollection(pageNumber, pageSize, collectionId);
    events.value = collectionStore.events;
    eventError.value = collectionStore.eventError;
  } catch (err) {
    console.error('Error fetching events:', err);
    eventError.value = 'Failed to fetch events.';
  }
};

watch(
  () => collectionStore.collections,
  (newCollections) => {
    collections.value = newCollections;
  }
);

watch(
  () => collectionStore.events,
  (newEvents) => {
    events.value = newEvents;
  }
);

watch(
  () => collectionStore.error,
  (newError) => {
    error.value = newError;
  }
);

watch(
  () => collectionStore.eventError,
  (newEventError) => {
    eventError.value = newEventError;
  }
);

onMounted(async () => {
  await fetchCollections();
});
</script>

<style scoped>
.loading-spinner {
  /* Define your loading spinner styles here */
}
</style>

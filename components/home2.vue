<template>
  <div>
    <h3>Collections</h3>
    <ul v-if="collections.length > 0">
      <li v-for="collection in collections" :key="collection.id">
        <p>{{ collection.name }}</p>
        <ul v-if="events[collection.id] && events[collection.id].length > 0">
          <li v-for="event in events[collection.id]" :key="event.id">
            <p>{{ event.description || 'No description available' }}</p>
          </li>
        </ul>
        <p v-else>No events available.</p>
      </li>
    </ul>
    <p v-else>No collections available.</p>

    <div v-if="collectionStore.loading" class="loading-spinner"></div>
    <p v-if="error">{{ error }}</p>
    <div v-if="collectionStore.eventLoading" class="loading-spinner"></div>
    <p v-if="eventError">{{ eventError }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCollectionStore } from '@/stores/collections';

const collectionStore = useCollectionStore();

const collections = ref([]);
const events = ref({});
const error = ref(null);
const eventError = ref(null);

const fetchCollections = async () => {
  try {
    await collectionStore.fetchCollections();
    collections.value = collectionStore.collections;
    events.value = collectionStore.events;
    error.value = collectionStore.error;
    eventError.value = collectionStore.eventError;
  } catch (err) {
    console.error('Error fetching collections:', err);
    error.value = 'Failed to fetch collections.';
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

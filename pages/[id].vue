<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1>{{ event?.event.title }} ali</h1>
    <!-- Add other event details here -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useEventsStore } from '~/stores/events';

const route = useRoute();
const { id } = route.params;
const eventsStore = useEventsStore();

const loading = ref(false);
const error = ref(null);
const event = ref(null);

const fetchEvent = async (eventId) => {
  loading.value = true;
  error.value = null;
  event.value = null;
  try {
    await eventsStore.fetchEventById(eventId);
    event.value = eventsStore.event;
  } catch (err) {
    error.value = err.response ? err.response.data.message : err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEvent(id);
});

watch(() => route.params.id, (newId) => {
  fetchEvent(newId);
});
</script>

<template>
  <div class="home" :style="{ backgroundImage: `url(${activeSlideImage}) !important` }">
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
      <div class="collections-cards">
        <div class="card-text">
          <h2>{{ activeEvent.title || 'No title available' }}</h2>
          <p class="description">{{ activeEvent.description || 'No description available' }}</p>
        </div>
        <v-sheet style="background-color: transparent" max-width="50%">
          <v-slide-group v-model="activeIndex" class="pa-2">
            <v-slide-group-item
              v-for="event in events[selectedCollection.id]"
              :key="event.id"
            >
              <v-card
                style="border-radius: 50%; background-color: transparent"
                class="ma-1 card"
               
                @click="() => updateActiveSlide(event)"
              >
                <v-img
                  height="50"
                  width="50"
                  style="border-radius: 50%"
                  cover
                  :src="eventImage(event)"
                ></v-img>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-text">عرض المزيد</div>
      <div class="scroll-icon"><i class="ri-arrow-down-double-fill"></i></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCollectionStore } from '@/stores/collections';

const collectionStore = useCollectionStore();

const collections = ref([]);
const events = ref({});
const error = ref(null);
const eventError = ref(null);
const selectedCollection = ref({});
const activeEvent = ref({});
const activeSlideImage = ref('');
const activeIndex = ref(0);

const fetchCollections = async () => {
  try {
    await collectionStore.fetchCollections();
    collections.value = collectionStore.collections;
    events.value = collectionStore.events;
    error.value = collectionStore.error;
    eventError.value = collectionStore.eventError;

    // Filter collections where collectionType === 2
    const filteredCollections = collections.value.filter(collection => collection.collectionType === 2);
    selectedCollection.value = filteredCollections.length > 0 ? filteredCollections[0] : {};

    if (events.value[selectedCollection.value.id] && events.value[selectedCollection.value.id].length > 0) {
      activeEvent.value = events.value[selectedCollection.value.id][0];
      activeSlideImage.value = eventImage(activeEvent.value);
    }
  } catch (err) {
    console.error('Error fetching collections:', err);
    error.value = 'Failed to fetch collections.';
  }
};

const eventImage = (event) => {
  if (!event || !event.images) {
    return '/path/to/default-image.jpg'; // Replace with a default image path if needed
  }
  const image = event.images.find(image => image.eventImageType === 1);
  return image ? `https://${image.imageUrl}` : '/path/to/default-image.jpg'; // Replace with a default image path if needed
};

const updateActiveSlide = (event) => {
  activeEvent.value = event;
  activeSlideImage.value = eventImage(event);
  activeIndex.value = events.value[selectedCollection.value.id].findIndex((e) => e.id === event.id);
};

const isActiveSlide = (index) => {
  return index === activeIndex.value;
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

.active {
  border: 5px solid #fff !important;
  border-radius: 50% !important;
  background-color: #fff !important;
  overflow: hidden;
}

.activeText {
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
  width: 90px;
  height: 24px;
  padding: 10px 20px 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
}

.nav-login button {
  font-size: 16px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(255, 255, 255, 1);
}

.nav-login i {
  color: rgba(255, 255, 255, 1);
}

.collections {
  width: 90%;
  height: 300px;
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

.collections .collections-text {
  font-size: 20px;
  font-weight: 700;
  line-height: 24.38px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}

.collections-cards {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: end;
  justify-content: center;
  gap: 18px;
}

.swiper-container {
  overflow: hidden;
}

.collections-cards .card-text {
  justify-content: space-between;
}

.collections-cards .card-text h2 {
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  text-align: right;
  color: rgba(255, 255, 255, 1);
}

.collections-cards .card-text p {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 1);
}

.collections-cards .cards {
  width: 140px;
  height: 85px;
  display: flex;
  justify-content: end;
}

.collections-cards .cards .card {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.collections-cards .cards .card img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
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

.description {
  max-height: 4em; /* Three lines of text */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Limit to three lines */
  -webkit-box-orient: vertical;
  margin-top: 20px;
}
</style>

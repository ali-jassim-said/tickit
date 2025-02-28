<template>
  <div
    class="home"
    :style="{ backgroundImage: `url(${activeSlideImage}) !important` }"
  >
    <nav class="nav-home">
      <div class="svg-nav">
        <img src="/svg/Logo.svg" alt="svg-home" />
      </div>
      <div class="nav-login">
        <button>Login</button>
        <i class="ri-logout-box-r-line"></i>
      </div>
    </nav>
    <div class="collections">
      <div class="collections-head">
        <div class="collections-icon">
          <i class="ri-arrow-left-s-line" @click="prevSlide"></i>
          <i class="ri-arrow-right-s-line" @click="nextSlide"></i>
        </div>
        <div class="collections-text">
          <p>{{ selectedCollection.name }}</p>
        </div>
      </div>
      <div class="collections-cards">
        <div class="card-text">
          <h2>{{ activeEvent.title || "No title available" }}</h2>
          <p class="description">
            {{ activeEvent.description || "No description available" }}
          </p>
        </div>
        <v-sheet style="background-color: transparent" max-width="50%">
          <v-slide-group next-icon=""
          prev-icon="" v-model="activeIndex" class="pa-2">
            <v-slide-group-item
              v-for="event in events[selectedCollection.id]"
              :key="event.id"
            >
              <v-card
                style="border-radius: 12px; background-color: #fff; text-align: end;"
                class="ma-4 card"
                height="216"
                width="177"
                @click="() => updateActiveSlide(event)"
              >
                <v-img
                  height="70%"
                  style="margin: 10px; border-radius: 12px;"
                  cover
                  :src="eventImage(event)"
                ></v-img>
                <v-card-subtitle
                  class="card-subtitle"
                  height="100%"
                  style="color: #000 !important; z-index: 100 !important"
                >
                  {{ event.title || "No title available" }}
                </v-card-subtitle>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
    <div class="scroll" @click="scrollToSecondPage">
      <div class="scroll-text">عرض المزيد</div>
      <div class="scroll-icon"><i class="ri-arrow-down-double-fill"></i></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useCollectionStore } from "@/stores/collections";

const collectionStore = useCollectionStore();

const collections = ref([]);
const events = ref({});
const error = ref(null);
const eventError = ref(null);
const selectedCollection = ref({});
const activeEvent = ref({});
const activeSlideImage = ref("");
const activeIndex = ref(0);

const fetchCollections = async () => {
  try {
    await collectionStore.fetchCollections();
    collections.value = collectionStore.collections;
    events.value = collectionStore.events;
    error.value = collectionStore.error;
    eventError.value = collectionStore.eventError;

    // Filter collections where collectionType === 2
    const filteredCollections = collections.value.filter(
      (collection) => collection.collectionType === 2
    );
    selectedCollection.value =
      filteredCollections.length > 0 ? filteredCollections[0] : {};

    if (
      events.value[selectedCollection.value.id] &&
      events.value[selectedCollection.value.id].length > 0
    ) {
      activeEvent.value = events.value[selectedCollection.value.id][0];
      activeSlideImage.value = eventImage(activeEvent.value);
    }
  } catch (err) {
    console.error("Error fetching collections:", err);
    error.value = "Failed to fetch collections.";
  }
};

const eventImage = (event) => {
  if (!event || !event.images) {
    return "/path/to/default-image.jpg"; // Replace with a default image path if needed
  }
  const image = event.images.find((image) => image.eventImageType === 1);
  return image ? `https://${image.imageUrl}` : "/path/to/default-image.jpg"; // Replace with a default image path if needed
};

const updateActiveSlide = (event) => {
  activeEvent.value = event;
  activeSlideImage.value = eventImage(event);
};

const prevSlide = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    updateActiveSlide(
      events.value[selectedCollection.value.id][activeIndex.value]
    );
  }
};

const nextSlide = () => {
  if (
    activeIndex.value <
    events.value[selectedCollection.value.id].length - 1
  ) {
    activeIndex.value++;
    updateActiveSlide(
      events.value[selectedCollection.value.id][activeIndex.value]
    );
  }
};

const scrollToSecondPage = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
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
.card-subtitle {
  color: rgba(255, 255, 255, 1) !important;
}

.card-subtitle.active-card {
  color: black !important;
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
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collections-icon {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.collections-icon i {
  width: 30px;
  height: 30px;
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
  width: 50%;
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
  justify-content: flex-start;
  gap: 18px;
}

.collections-cards .cards .card {
  width: 177px !important;
  height: 216px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: start;
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

.scroll .scroll-icon::after {
  content: "";
  position: absolute;
  width: 70px;
  height: 70px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 50%;
  border: 1px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.scroll .scroll-icon::before {
  content: "";
  position: absolute;
  width: 110px;
  height: 110px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 50%;
  border: 1px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.scroll .scroll-icon i {
  color: #fff;
}

.description {
  max-height: 6em; /* Three lines of text */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* Limit to three lines */
  -webkit-box-orient: vertical;
  margin-top: 20px;
}
</style>

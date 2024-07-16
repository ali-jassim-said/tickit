<template>
  <div class="details">
    <div class="details-flex">
      <div class="img1">
        <div
          v-if="event && event.event"
          class="details-img2"
          :style="{ backgroundImage: `url(${eventImage(event)})` }"
        ></div>
        <div class="map" id="map" style="width: 100%; height: 245px"></div>
        <div class="event-details">
          <div class="one"></div>
          <div class="two"></div>
        </div>
      </div>
      <div class="img2">
        <div class="category-cards">
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">{{ error }}</div>
          <div v-else>
            <div v-if="event && event.event" class="card">
              <div
                class="card-img"
                :style="{ backgroundImage: `url(${eventImage(event)})` }"
              >
                <div class="date">
                  <p class="number">
                    {{ new Date(event.event.startDate).getDate() }}
                  </p>
                  <p class="text">
                    {{
                      new Date(event.event.startDate).toLocaleString(
                        "default",
                        { month: "short" }
                      )
                    }}
                  </p>
                </div>
                <i class="ri-calendar-2-line"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-if="event && event.event" class="card-text">
          <h1>{{ event.event.title }}</h1>
          <p>{{ event.event.description }}</p>
        </div>
        <div class="text">
          <div class="pay">
            <button>
              <img src="/img/Mobile app store badge.png" alt="" />
            </button>
            <button>
              <img src="/img/Mobile app store badge.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="footer-down">
        <div class="one">
          <div class="logo">
            <img src="/img/logoFooter.png" alt="" />
          </div>
          <div class="text">
            <div>Site map <span>|</span></div>
            <div>Terms & Conditions <span>|</span></div>
            <div>Accessibility <span>|</span></div>
            <div>Legal <span>|</span></div>
            <div>Privacy Policy</div>
          </div>
        </div>
        <div class="two">
          <div class="text">
            <p>Copyright © 2024 Alphabet Co.</p>
            <p>All rights reserved</p>
          </div>
          <div class="icons">
            <i class="ri-twitter-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-twitter-fill"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useEventsStore } from "~/stores/events";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = ref(null);
let leafletMap = null;

onMounted(() => {
  // Initialize the Leaflet map
  leafletMap = L.map("map").setView([33.3152, 44.3661], 13);

  // Add OpenStreetMap tile layer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(leafletMap);

  // Example marker addition, modify or remove as needed
  L.marker([33.3152, 44.3661]).addTo(leafletMap).bindPopup("A sample popup.");

  // Store the map instance in the ref
  map.value = leafletMap;
});

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

watch(
  () => route.params.id,
  (newId) => {
    fetchEvent(newId);
  }
);

// Helper function to get event image
const eventImage = (event) => {
  const image = event?.event?.images?.find(
    (image) => image.eventImageType === 1
  );
  return image ? `https://${image.imageUrl}` : "default-image-url";
};
</script>

<style scoped>
.details {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.details-flex {
  width: 90%;
  margin: auto;
  display: flex;
  gap: 20px;
}

.map {
  border-radius: 24px;
}

.event-details {
  width: 100%;
  height: 253px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
}

.event-details .one{
  width: 100%;
height: 55px;
padding: 7px 0px 7px 24px;
border-radius: 8px;
display: flex;
justify-content: space-between;
}

.img1 {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.img2 {
  width: 80%;
}

.details-img2 {
  height: 116px;
  width: 100%;
  border-radius: 24px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.category-cards {
  gap: 14px;
}

.category-cards .card {
  height: 100%;
  border-radius: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
}

.category-cards .card .card-img {
  width: 100%;
  height: 379px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 24px;
}

.card .card-img .date {
  width: 78px;
  height: 78px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  position: absolute;
  bottom: 0;
  right: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  border: 0px 0px 2px 0px;
}

.card .card-img .date .number {
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
}

.card .card-img .date .text {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.card .card-img i {
  position: absolute;
  bottom: 15px;
  left: 80px;
  font-size: 30px;
  color: #fff;
}

.card-text {
  width: 100%;
  margin-top: 20px;
  gap: 18px;
}

.card-text h1 {
  width: 100%;
  font-size: 48px;
  font-weight: 400;
  line-height: 48px;
  text-align: right;
  color: #1d2329;
}

.card-text p {
  min-height: 260px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
  color: #1d2329;
}

.text .pay {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

.text .pay button img {
  width: 120px;
  height: 40px;
  border-radius: 7px;
  border: 1px solid rgba(166, 166, 166, 1);
  margin-top: 10px;
}

.down {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.footer-down {
  width: 100%;
  height: 100%;
  padding: 24px 0 0 0;
  display: flex;
  flex-direction: column;
  background: rgba(20, 20, 23, 1);
}

.footer-down .one {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-down .one .text {
  display: flex;
  gap: 24px;
  color: #fff;
  margin: 10px;
}

.footer-down .one .text div {
  font-size: 10.1px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  display: flex;
  gap: 16px;
  cursor: pointer;
}

.footer-down .one .text div span {
  color: rgba(255, 255, 255, 0.15);
  height: 10px;
}

.footer-down .two {
  width: 100%;
  padding: 12px 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #9e499e, #733b8b);
}

.footer-down .two .text {
  display: flex;
  align-items: center;
  gap: 48px;
  color: #fff;
}

.footer-down .two .icons {
  display: flex;
  align-content: center;
  gap: 16px;
  color: #fff;
}

.footer-down .two .icons i {
  cursor: pointer;
}

@media (max-width: 400px) {
  .footer-down .two {
    height: 100%;
    flex-direction: column-reverse;
    padding: 12px 60px;
  }

  .footer-down .two .text {
    flex-direction: column;
    gap: 5px;
  }

  .footer-down .two .icons i {
    font-size: 25px;
  }

  .footer-down .one .text div:nth-child(1),
  .footer-down .one .text div:nth-child(3),
  .footer-down .one .text div:nth-child(4) {
    display: none;
  }
}
</style>

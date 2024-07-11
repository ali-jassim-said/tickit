<template>
  <div class="section-category">
    <div v-if="filteredCollections.length > 0" class="container" v-for="(collection, collectionIndex) in filteredCollections" :key="collectionIndex">
      <div class="category">
        <div class="header">
          <div class="text">{{ collection.name }}</div>
        </div>
        <v-sheet style="background-color: transparent; direction: rtl;" width="100%" class="category-cards">
          <v-slide-group class="pa-2" style="width: 100%;">
            <v-slide-group-item v-for="(event, index) in events[collection.id]" :key="index" class="cards">
              <v-card class="card ma-4">
                <div class="card-img" :style="{ backgroundImage: `url(${eventImage(event)})` }">
                  <div class="date">
                    <p class="number">{{ new Date(event.startDate).getDate() }}</p>
                    <p class="text">{{ new Date(event.startDate).toLocaleString('default', { month: 'short' }) }}</p>
                  </div>
                  <i class="ri-calendar-2-line"></i>
                </div>
                <div class="card-text">
                  <div class="card-date">
                    <p>{{ event.title }}</p>
                    <div class="date">
                      <p>{{ new Date(event.startDate).toLocaleDateString() }}</p>
                      <i class="ri-calendar-2-line"></i>
                    </div>
                    <div class="date">
                      <p>{{ event.ticketTypes.length ? event.ticketTypes[0].price : 'N/A' }} د.ع</p>
                      <i class="ri-calendar-2-line"></i>
                    </div>
                    <div class="date">
                      <p>{{ event.ticketTypes.length ? event.ticketTypes[0].title : 'No ticket types available' }}</p>
                      <i class="ri-calendar-2-line"></i>
                    </div>
                  </div>
                  <div class="card-price">
                    <button><span>حجز تذكرة</span></button>
                    <div class="price">
                      <p>يبدء سعر حجز التذاكر</p>
                      <div class="iq">{{ event.ticketTypes.length ? event.ticketTypes[0].price : 'N/A' }} د.ع</div>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
    <div v-else class="no-events-message">No collections with events available.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useAllCollectionsStore } from '~/stores/collectionsAll';
import { useEventsStore } from '~/stores/events';

const store = useAllCollectionsStore();
const eventsStore = useEventsStore();

const collections = ref([]);
const events = ref({});

async function fetchData() {
  await store.fetchCollections();
  collections.value = store.collections;
  events.value = store.events;

  await nextTick();

  filteredCollections.value = collections.value.filter(collection => events.value[collection.id] && events.value[collection.id].length > 0);
}

function eventImage(event) {
  if (!event || !event.images) {
    return '/path/to/default-image.jpg'; // Replace with a default image path if needed
  }
  const image = event.images.find(image => image.eventImageType === 1);
  return image ? `https://${image.imageUrl}` : '/path/to/default-image.jpg'; // Replace with a default image path if needed
}

const filteredCollections = ref([]);

onMounted(() => {
  fetchData();
});

watch(() => events.value, (newEvents) => {
  filteredCollections.value = collections.value.filter(collection => newEvents[collection.id] && newEvents[collection.id].length > 0);
});
</script>





<style scoped>

.no-events-message {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: red; /* Adjust color as needed */
}

.section-category {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}

.container {
  padding: 30px 64px;
}

.category {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category .header {
  height: 24px;
  direction: rtl;
}

.category .header .text{
  
font-size: 20px;
font-weight: 700;
line-height: 24.38px;
}

.category .header .icons{
  display: flex;
  flex-direction: row;
gap: 12px;

}

.category .header .icons i{
  width: 24px;
height: 24px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
border-radius: 100px;
border: 1px;
background: rgba(0, 0, 0, 0.1);
border: 1px solid rgba(0, 0, 0, 0.15);
cursor: pointer;
}

.category-cards{
height: 418px;
display: flex;
align-items: center;
justify-content: center;
gap: 14px;
}

.category-cards .card{
  width: 279px !important;
height: 415px;
padding: 16px;
display: flex;
flex-direction: column;
align-items: end;
gap: 9px;
border-radius: 12px;
cursor: pointer;

background: rgba(255, 255, 255, 1);


}

.category-cards .card .card-img{
  width: 247px;
height: 231px;
border-radius: 8px;
background-image: url('../public/img/category.png');
background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.card .card-img .date {
  width: 60px;
height: 60px;
border-radius: 8px 8px 0px 0px;
border: 0px 0px 2px 0px;
background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
position: absolute;
bottom: 0;
right: 15px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}

.card .card-img .date .number{
font-size: 24px;
font-weight: 700;
line-height: 28.8px;
color: rgba(255, 255, 255, 1);
}

.card .card-img .date .text{
font-size: 14px;
font-weight: 400;
line-height: 16.8px;
color: rgba(255, 255, 255, 1);
}

.card .card-img i {
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 20px;
color: #fff;
}

.category-cards .card .card-text{
  width: 247px;
height: 143px;
display: flex;
flex-direction: column;
gap: 12px;
}

.category-cards .card .card-text .card-date{
  width: 247px;
height: 92px;
display: flex;
flex-direction: column;
gap: 8px;
}

.card-date p {
font-size: 12px;
font-weight: 700;
line-height: 14.4px;
text-align: right;
}

.card-date .date{
  
height: 18px;
display: flex;
align-items: center;
justify-content: end;
gap: 8px;
}

.card-date .date p {
font-size: 12px;
font-weight: 400;
line-height: 14.4px;
}

.card-date .date i{
  color:rgba(0, 0, 0, 0.25)
}

.card .card-text .card-price{
height: 39px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 31px;
}

.card .card-text .card-price .price{
height: 36px;
display: flex;
align-items: center;
flex-direction: column;
gap: 2px;
}

.card .card-text .card-price .price p{
font-size: 12px;
font-weight: 400;
line-height: 14.4px;
color: rgba(29, 35, 41, 0.5);
}

.card .card-text .card-price .price .iq{
font-size: 16px;
font-weight: 700;
line-height: 19.5px;
color: rgba(29, 35, 41, 1);
}

.card .card-text .card-price  button{
height: 39px;
padding: 12px 32px 12px 32px;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
border-radius: 8px;
border: 1.5px;
border: 1.5px solid rgba(34, 129, 217, 1)
}


.card .card-text .card-price  button span{
font-size: 12px;
font-weight: 400;
line-height: 14.63px;
color: rgba(34, 129, 217, 1);
}

.swiper-wrapper{
  transition-duration: 0ms;
  transform: none; 
  transition-delay: 0ms;
}
</style>

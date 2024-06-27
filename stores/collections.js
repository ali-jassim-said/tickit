import { defineStore } from 'pinia';
import { getCustomerCollections } from '~/api/Collection';
import { getCustomerEvents } from '~/api/Events';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collections: [],
    error: null,
    loading: false,
    events: [],
    eventError: null,
    eventLoading: false,
  }),
  actions: {
    async fetchCollections() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getCustomerCollections();
        this.collections = response.data.collections;
      } catch (error) {
        this.error = 'Failed to fetch collections.';
        console.error('Error fetching collections:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchEventsByCollection(pageNumber, pageSize, collectionId) {
      this.eventLoading = true;
      this.eventError = null;
      try {
        const response = await getCustomerEvents({ PageNumber: pageNumber, PageSize: pageSize, collectionId: collectionId });
        
        if (response.data && response.data.data) {
          this.events = response.data.data.map(event => ({
            ...event,
            description: event.description || 'No description available'
          }));
        } else {
          this.events = [];
        }
      } catch (error) {
        this.eventError = 'Failed to fetch events.';
        console.error('Error fetching events:', error);
      } finally {
        this.eventLoading = false;
      }
    },
  },
});

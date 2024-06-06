import { defineStore } from "pinia";
import { getCustomerCollections } from "~/api/Collection";

export const useCollectionStore = defineStore("collection", {
    state: () => ({
            collections: [],
            error: null,
            loading: false,
    }),
    actions: {
        async fetchCollections() {
            this.loading = true;
            try {
                const response = await getCustomerCollections();
                this.collections = response.data.collections;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    }
})
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: () => ({
        // socketN: `${idRest}/${numTaula}`,
        id: null,
        numTaula: null,
        restaurant: null,
        clients: [{
            id: null,
            nom: null,
            email: null,
            productes: [{
                prducteid: null,
                producteNom: null,
                preu: null,
                quantitat: null,
                comentari: null,
                estat: null,
            }],
        }],
        qr: null,
    }),
    actions: {
        setId(id) {
            this.id = id;
        },
        getId() {
            return this.id;
        },
        setNumTaula(numTaula) {
            this.numTaula = numTaula;
        },
        getNumTaula() {
            return this.numTaula;
        },
        setRestaurant(restaurant) {
            this.restaurant = restaurant;
        },
        getRestaurant() {
            return this.restaurant;
        },
        setClients(clients) {
            this.clients = clients;
        },
        getClients() {
            return this.clients;
        },
        setQr(qr) {
            this.qr = qr;
        },
        getQr() {
            return this.qr;
        },        
    },
});

export default useAppStore;
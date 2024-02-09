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
        buscadorQuery: '',
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
        setTaula(taula) {
            this.taula = taula;
        },
        setBuscadorQuery(query) {
            this.buscadorQuery = query;
        },
        getQr() {
            return this.qr;
        },
        setQr(qr) {
            this.qr = qr;
        },
        getBuscadorQuery() {
            return this.buscadorQuery;
        },
        setBuscadorQuery(query) {
            this.buscadorQuery = query;
        }
    },
});

export default useAppStore;
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: () => ({
        restaurant: null,
        comandes: [
            {
                taula: 1,
                productes: [
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "En espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "En preparación"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servido"
                    }
                ]
            },
            {
                taula: 2,
                productes: [
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "En espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "En preparación"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servido"
                    }
                ]
            },
            {
                taula: 3,
                productes: [
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "En espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "En preparación"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servido"
                    }
                ]
            },
            {
                taula: 4,
                productes: [
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "En espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "En preparación"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servido"
                    }
                ]
            }
        ],
        buscadorQuery: '',
        taules: [],
        taula: {},
        qr: '',
    }),
    actions: {
        setRestaurant(restaurant) {
            this.restaurant = restaurant;
        },
        getRestaurant() {
            return this.restaurant;
        },
        setComandes(comandes) {
            this.comandes = comandes;
        },
        getComandes() {
            return this.comandes;
        },
        setTaula(taula) {
            this.taula = taula;
        },
        getTaula() {
            return this.taula;
        },
        setBuscadorQuery(query) {
            this.buscadorQuery = query;
        },
        getBuscadorQuery() {
            return this.buscadorQuery;
        },
        setTaules(taules) {
            this.taules = taules;
        },
        getTaules() {
            return this.taules;
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
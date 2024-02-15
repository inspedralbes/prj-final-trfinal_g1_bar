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
                        estat: "Espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "Preparacio"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servit"
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
                        estat: "Espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "Preparacio"
                    },
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "Espera"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servit"
                    }
                ]
            },
            {
                taula: 1,
                productes: [
                    {
                        producte: "Pizza Margarita",
                        preu: 10.99,
                        quantitat: 1,
                        comentari: "Sin cebolla",
                        estat: "Espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "Preparacio"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servit"
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
                        estat: "Espera"
                    },
                    {
                        producte: "Hamburguesa con queso",
                        preu: 8.49,
                        quantitat: 2,
                        comentari: "Agregar papas fritas",
                        estat: "Preparacio"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servit"
                    },
                    {
                        producte: "Ensalada César",
                        preu: 6.99,
                        quantitat: 1,
                        comentari: "Sin crutones",
                        estat: "Servit"
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
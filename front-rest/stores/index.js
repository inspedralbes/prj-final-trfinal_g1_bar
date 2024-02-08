import { defineStore } from 'pinia';

const useAppStore = defineStore('app',{
    state: () => ({
        qr: '',
        taula:'',
        buscadorQuery: '',
    }),
    actions: {
        setQr(qr) {
            this.qr = qr;
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
        getTaula() {
            return this.taula;
        },
        getBuscadorQuery() {
            return this.buscadorQuery;
        },
    },
});

export default useAppStore;
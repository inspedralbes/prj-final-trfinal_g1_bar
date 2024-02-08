import { defineStore } from 'pinia';

const useAppStore = defineStore('app',{
    state: () => ({
        qr: '',
        taula:'',
    }),
    actions: {
        setQr(qr) {
            this.qr = qr;
        },
        setTaula(taula) {
            this.taula = taula;
        },
        getQr() {
            return this.qr;
        },
        getTaula() {
            return this.taula;
        },
    },
});

export default useAppStore;
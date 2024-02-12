import { defineStore } from 'pinia';

const useAppStore = defineStore('app',{
    state: () => ({
        qr: '',
    }),
    actions: {
        setQr(qr) {
            this.qr = qr;
        },
        getQr() {
            return this.qr;
        },
    },
});

export default useAppStore;
<template>
    <div>
        <h1>Llistat de comandes</h1>
        <div class="cont">
            <div v-for="comanda in comandes" :key="comanda.id" class="comanda">
                <span class="comanCont">
                    <h2>Taula {{ comanda.taula }}</h2>
                    <div class="flex-c prodCont">
                        <div v-for="producte in comanda.productes" class="gridA" :class="getClass(producte.estat)">
                            <span id="prod">
                                <p>{{ producte.producte }}</p>
                            </span>
                            <span id="quant">
                                <p>{{ producte.quantitat }}</p>
                            </span>
                            <span v-if="producte.comentari" class="comentari">
                                <p>{{ producte.comentari }}</p>
                            </span>
                            <span id="stat">
                                <p>{{ producte.estat }}</p>
                            </span>
                            <span v-if="producte.estat == 'Espera'" id="btn">
                                <PrimeButton class="btn" label="Cuinar" raised outlined />
                            </span>
                            <span v-else-if="producte.estat == 'Preparacio'" id="btn">
                                <PrimeButton class="btn" label="Servir" raised outlined />
                            </span>
                            <span v-else-if="producte.estat == 'Servit'" id="btn">
                                <PrimeButton class="btn" label="Eliminar" raised outlined />
                            </span>
                        </div>
                    </div>
                </span>
                <span class="btnCont">
                    <PrimeButton class="btn" label="Eliminar" raised outlined />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
import socket from '~/socket';
export default {
    data() {
        return {
            store: useAppStore()
        }
    },
    computed: {
        comandes() {
            return this.store.comandes
        }
    },
    methods: {
        getClass(estat) {
            if (estat == 'Espera') {
                return 'bg-espera'
            } else if (estat == 'Preparacio') {
                return 'bg-començat'
            } else if (estat == 'Servit') {
                return 'bg-acabat'
            }
        }
    },

}
</script>

<style scoped>
.cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* Allow the commands to wrap to the next line */
    justify-content: space-between;
    /* Add some space between the commands */
    align-items: start;
    /* Align the commands at the top */
    background-color: #282c34;
    color: #fff;
    font-family: Arial, sans-serif;
    padding: 20px;
}

h1 {
    color: #61dafb;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
    /* Make the title span the full width */
}

.gridA {
    display: grid;
    grid-template-areas:
        "prod prod quant "
        "comentari estat btn";
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    width: 100%;
    text-align: center;
}

.gridA button {
    width: 100%;
    padding: 10px 0;
}

#prod {
    grid-area: prod;
}

#quant {
    grid-area: quant;
}

#btn {
    grid-area: btn;
    margin-right: 1rem;
    margin-bottom: 1rem;
}

#estat {
    grid-area: estat;
}

.comentari {
    grid-area: comentari;
}

.comanda {
    background-color: #3b4049;
    width: calc(33% - 20px);
    /* Make the commands take up half the width minus some margin */
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.comanda:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.comanda p {
    margin: 10px 10px;
    color: #fff;
    line-height: 1.5;
}

.comanda>p:first-child {
    font-weight: bold;
    color: #61dafb;
}

.flex-r {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.comanCont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.flex-c {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.btnCont {
    width: 100%;
}

.btnCont .btn {
    width: 100%;
    margin-top: 10px;

}

.btn {
    font-weight: bold;
    color: #61dafb;
    border-color: #61dafb;
    padding: 10px;
    cursor: pointer;
    transition: 0.3s;
}

.btn:hover {
    background-color: #61dafb;
    color: #282c34;
}

.comentari {
    width: 90%;
    text-align: left;
    font-size: small;
}

.prodCont {
    width: 100%;
}

.prodCont>:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.prodCont>:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.bg-espera {
    background-color: rgba(255, 159, 26, 0.6);
    /* Light orange with 60% opacity */
}

.bg-espera button:hover {
    background-color: rgba(0, 123, 255, 0.7);
}

.bg-començat {
    background-color: rgba(0, 123, 255, 0.6);
    /* Light blue with 60% opacity */
}

.bg-començat button:hover {
    background-color: rgba(40, 167, 69, 0.7);
    /* Light orange with 80% opacity */
}

.bg-acabat {
    background-color: rgba(40, 167, 69, 0.6);
    /* Light green with 60% opacity */
}

.bg-acabat button:hover {
    background-color: red;
    /* Light orange with 80% opacity */
}
</style>
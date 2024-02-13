<template>
    <div>
        <h1>Taula {{ taula.nombre_taula }}</h1>
        <h2>Clients:</h2>
        <ul>
            <li v-for="client in taula.clients">
                <span class="nomCli">
                    {{ client.name }}
                </span>
                    
                <ul>
                    <li v-for="producte in getProducts(client.id)">
                        {{ producte.nom }} ... {{ producte.preu }}€ x{{ producte.quantity }}
                    </li>
                </ul>
            </li>
        </ul>
        <button @click="print()">prodCli</button>

        <PrimeButton class="tornarEnrere" @click="this.$router.push('/llistat')">Tornar enrere</PrimeButton>


    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
export default {
    data() {
        return {
            store: useAppStore(),
            products:[],
        }
    },
    methods: {
        getTiquets(tiquets,idCli) {
            return tiquets.filter(tiquet => tiquet.pivot.user_id == idCli);
        },
        getProducts(clientId) {
            let tiquetsInitial = this.store.getTaula().tiquets.filter(tiquet => tiquet.pivot.user_id == clientId);
            let groupedTiquets = tiquetsInitial.reduce((acc, tiquet) => {
                const exixtingTiquet = acc.find(t => t.pivot.producte_id === tiquet.pivot.producte_id);
                if (exixtingTiquet) {
                    exixtingTiquet.quantity = exixtingTiquet.quantity + tiquet.pivot.quantitat;
                } else {
                    acc.push({ ...tiquet, quantity: tiquet.pivot.quantitat });
                }
                return acc;
            }, []); 

            return groupedTiquets;
        },

    },
    created() {
        console.log(this.store.getTaula());
    },
    computed: {
        taula() {
            return this.store.getTaula();
        }
    }
}



</script>

<style scoped>
div {
    margin-top: 10%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    border-radius: 15px;

}

h1 {
    font-size: 2em;
    text-align: center;
}

h2 {
    font-size: 1.5em;
    margin-top: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
}
.nomCli{
    font-size: 1.2rem;
    font-weight: bold;
}
li {
    margin-bottom: 10px;
}

li ul {
    margin-left: 20px;
}
.tornarEnrere{
    display: block;
    width: fit-content;
    padding: 0.7rem 1.3rem;
    margin: 0 auto;
}
</style>
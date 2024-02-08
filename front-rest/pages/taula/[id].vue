<template>
    <div>
        <h1>Taula {{ taula.numTaula }}</h1>
        <h2>Clients:</h2>
        <ul>
            <li v-for="client in taula.clients">
                <span class="nomCli">
                    {{ client.nom }}
                </span>
                    
                <ul>
                    <li v-for="producte in client.productes">
                        {{ producte.producteNom }} ... {{ producte.preu }}€ x{{ producte.quantitat }}
                    </li>
                </ul>
            </li>
        </ul>

        <PrimeButton class="tornarEnrere" @click="this.$router.push('/llistat')">Tornar enrere</PrimeButton>


    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
export default {
    data() {
        return {
            store: useAppStore(),
            id: null
        }
    },
    created() {
        this.id = this.$route.params.id; // Get id from route params
    },
    computed: {
        taula() {
            // return this.store.getTaula();
            let novaTaula = {
                socketN: `1/1`,
                id: this.$route.params.id,
                numTaula: 1,
                restaurant: null,
                ocupants: 0,
                clients: [
                    {
                        id: 1,
                        nom: 'paco',
                        email: 'aaa@aaa',
                        productes: [
                            {
                                prducteid: 1,
                                producteNom: 'patata',
                                preu: 2.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            },
                            {
                                prducteid: 2,
                                producteNom: 'cervesa',
                                preu: 1.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            }
                        ],
                    },
                    {
                        id: 2,
                        nom: 'pepe',
                        email: 'xxx@xxx',
                        productes: [
                            {
                                prducteid: 3,
                                producteNom: 'coca-cola',
                                preu: 1.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            },
                            {
                                prducteid: 4,
                                producteNom: 'pizza',
                                preu: 5.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            }
                        ],
                    },
                    {
                        id: 3,
                        nom: 'pepa',
                        email: 'xxx@xxx',
                        productes: [
                            {
                                prducteid: 5,
                                producteNom: 'cervesa',
                                preu: 1.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            },
                            {
                                prducteid: 6,
                                producteNom: 'pizza',
                                preu: 5.99,
                                quantitat: 1,
                                comentari: null,
                                estat: null,
                            }
                        ],
                    },
                ],
                qr: null,
            }
            return novaTaula;
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
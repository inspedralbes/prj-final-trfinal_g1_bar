<template>
    <div class="border-round">
        <h1>TAULES</h1>
        <div class="taules-container">
            <div v-for="(actual,index) in taulesFiltered" @click="enterTable(actual.id)" :key=index >
                <h2>Taula {{actual.nombre_taula}}</h2>
                <p>Capacitat: {{actual.capacitat}}</p>
                <p class="clientsTitle">Clients:</p>
                <ul>
                    <li v-for="client in actual.clients">{{client.nom}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import useAppStore from '~/stores';
export default {
    data() {
        return {
            store: useAppStore(),
            taules:[
                {
                    id: 1,
                    nombre_taula: 12,
                    capacitat: 4,
                    clients: [
                        {
                            id: 1,
                            nom: 'Pep',
                        },
                        {
                            id: 2,
                            nom: 'Maria',
                        },
                        {
                            id: 3,
                            nom: 'Joan',
                        },
                        {
                            id: 4,
                            nom: 'Anna',
                        }
                    ]
                },
                {
                    id: 2,
                    nombre_taula: 22,
                    capacitat: 2,
                    clients: [
                        {
                            id: 5,
                            nom: 'Pau',
                        },
                        {
                            id: 6,
                            nom: 'Laura',
                        },
                        {
                            id: 11,
                            nom: 'Lluis',
                        },
                        {
                            id: 12,
                            nom: 'Ernesto',
                        }
                    ]
                },
                {
                    id: 3,
                    nombre_taula: 23,
                    capacitat: 6,
                    clients: [
                        {
                            id: 7,
                            nom: 'Pere',
                        },
                        {
                            id: 8,
                            nom: 'Marta',
                        },
                        {
                            id: 9,
                            nom: 'Jordi',
                        },
                        {
                            id: 10,
                            nom: 'Clara',
                        }
                    ]
                },
                {
                    id: 4,
                    nombre_taula: 34,
                    capacitat: 8,
                    clients: [
                        {
                            id: 13,
                            nom: 'Pablo',
                        },
                        {
                            id: 14,
                            nom: 'Lola',
                        },
                        {
                            id: 15,
                            nom: 'Jordina',
                        },
                        {
                            id: 16,
                            nom: 'Clara',
                        }
                    ]
                },
                {
                    id: 5,
                    nombre_taula: 35,
                    capacitat: 4,
                    clients: [
                        {
                            id: 17,
                            nom: 'Pablo',
                        },
                        {
                            id: 18,
                            nom: 'Lola',
                        },
                        {
                            id: 19,
                            nom: 'Jordina',
                        },
                        {
                            id: 20,
                            nom: 'Clara',
                        }
                    ]
                },
                {
                    id: 6,
                    nombre_taula: 46,
                    capacitat: 2,
                    clients: [
                        {
                            id: 21,
                            nom: 'Pablo',
                        },
                        {
                            id: 22,
                            nom: 'Lola',
                        },
                        {
                            id: 23,
                            nom: 'Jordina',
                        },
                        {
                            id: 24,
                            nom: 'Clara',
                        }
                    ]
                },
                {
                    id: 7,
                    nombre_taula: 47,
                    capacitat: 6,
                    clients: [
                        {
                            id: 25,
                            nom: 'Pablo',
                        },
                        {
                            id: 26,
                            nom: 'Lola',
                        },
                        {
                            id: 27,
                            nom: 'Jordina',
                        },
                        {
                            id: 28,
                            nom: 'Clara',
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        enterTable(id){
            this.$router.push(`/taula/${id}`,{params: {id: id}});
        }
    },
    created() {
    },
    computed: {
        taulesFiltered(){
            let taulesFiltered = this.taules;
            if(this.store.buscadorQuery){
                taulesFiltered = this.taules.filter(taula => taula.nombre_taula.toString().includes(this.store.buscadorQuery));
            }
            return taulesFiltered;
        }
    }
}
</script>

<style scoped>
.border-round {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.taules-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    margin-top: 20px;
}

.taules-container > div {
    background-color: black;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.15);
    padding: 20px;
    width: 200px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.taules-container > div:hover {
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
    transform: translateY(-10px);
}

h2 {
    margin-bottom: 10px;
}

.clientsTitle {
    margin-bottom: 0px;
}
ul {
    margin-top: 5px;
    /* list-style-type: none;
    padding: 0; */
}
</style>
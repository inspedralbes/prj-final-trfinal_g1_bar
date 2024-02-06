<template>
    <div>
        <h1>TAULES</h1>
        <div v-for="(actual,index) in getTaules()">
            <h2>Taula {{actual.numero}}</h2>
            <p>Capacitat: {{actual.capacitat}}</p>
            <p>Clients:</p>
            <ul>
                <li v-for="client in actual.clients">{{client.nom}}</li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            taules:[
                {
                    id: 1,
                    numero: 1,
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
                    numero: 2,
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
                    numero: 3,
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
                    numero: 4,
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
                    numero: 5,
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
                }
            ]
        }
    },
    methods: {
        getTaules(){
            return this.taules;
        }
    }
}
</script>

<style scoped>
</style>
<template>
    <div class="border-round">
        <h1>TAULES</h1>
        <div class="taules-container">
            <div v-for="(actual,index) in taulesFiltered" @click="enterTable(actual.nombre_taula)" :key=index >
                <h2>Taula {{actual.nombre_taula}}</h2>
                <p class="clientsTitle">Clients:</p>
                <ul>
                    <li v-for="client in actual.clients">{{client.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '~/socket';
import useAppStore from '~/stores';
export default {
    data() {
        return {
            store: useAppStore(),
        }
    },
    methods: {
        enterTable(id){
            let taula = this.store.getTaules().find(taula => taula.nombre_taula == id);
            this.store.setTaula(taula);
            this.$router.push(`/taula`);
        }
    },
    created() {
        this.store.setRestaurant(1);
        socket.emit('getTaules', this.store.getRestaurant());
    },
    computed: {
        taulesFiltered(){
            let taulesFiltered = this.store.getTaules();
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
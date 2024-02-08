<template>
    <div class="cont">
        <PrimeButton @click="emitGetTiquet">Get Tiquet</PrimeButton>
        <PrimeButton @click="emitGetCategories">Get Categories</PrimeButton>
        <PrimeButton @click="emitGetProductes">Get Productes</PrimeButton>
        <PrimeButton @click="emitGetIngredients">Get Ingredients</PrimeButton>
        <PrimeButton @click="emitGetAllIngredients">Get All Ingredients</PrimeButton>
    </div>
</template>

<script>

import socket from '~/socket';

export default {
    methods: {
        emitGetTiquet() {
            socket.emit('getTiquet', 1);
        },
        emitGetCategories() {
            socket.emit('getCategories', 1);
        },
        emitGetProductes() {
            socket.emit('getProductes', 1);
        },
        emitGetIngredients() {
            socket.emit('getIngredients', 1);
        },
        emitGetAllIngredients() {
            socket.emit('getAllIngredients');
        },
    },
}
</script>

<style scoped>
.cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 10px;
    width: 10%;
    margin: 0 auto;
}

.cont button {
    display: block;
    width: 100%;
    padding: 10px;
    cursor: pointer;
    text-align: center;
}
</style>
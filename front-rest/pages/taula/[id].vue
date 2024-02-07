<template>
    <div>
        <h1>Taula {{ id }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            taula:null,
        }
    },
    created() {
        this.id = this.$route.params.id; // Get id from route params
        console.log(this.id);
    },
    computed: {
        taula() {
            const taula = {}
            return taula;
        }
    }
}
</script>

<style scoped>

</style>
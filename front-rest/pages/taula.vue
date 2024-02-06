<template>
    <div class="border-round">
        <h1>TAULES</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        //wait 3 seconds and then call the function
        setTimeout(() => {
            console.log('This is a message from the created hook');
        }, 3000);

    },
}
</script>

<style scoped>

</style>
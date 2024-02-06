<template>
    <div class="login-container" >
        <h1>Login</h1>
        <form @submit.prevent="loginFetch">
            <label for="formEmail">Email</label>
            <PrimeInputText class="formEmail" name="formEmail" type="email" v-model="email" required />
            <label for="formPasswd">Contrasenya</label>
            <PrimeInputText class="formPasword" name="formPasswd" type="password" v-model="password" required />
            <PrimeButton class="formSubmit" type="submit">Login</PrimeButton>
        </form>
        <p class='register-link'>No t'has registrat? <nuxt-link to="/register" class="linkA">Registrat</nuxt-link></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        loginFetch() {
            console.log(`Email: ${this.email}, Password: ${this.password}`);
        }
    }
}
</script>
<style>
.login-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 98vh;
}
.login-container form{
    display: flex;
    flex-direction: column;
}
.login-container form label{
    margin: 10px 0;
}
.login-container form .formEmail, .formPasword, .formSubmit{
    width: 300px;
}
.login-container form .formSubmit{
    margin-top: 20px;
    justify-content: center;
}
.login-container .register-link{
    margin-top: 20px;
}
.register-link{
    margin-top: 20px;
}
.register-link .linkA{
    color: white;
    font-weight: bold;
}
.register-link .linkA:hover{
    color: turquoise;
}
</style>
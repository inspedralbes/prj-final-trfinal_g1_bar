<template>
    <div class="login-container" >
        <h1>Registre</h1>
        <form @submit.prevent="registerFetch">
            <label for="fomrNom">Nom</label>
            <PrimeInputText class="formNom" name="formNom" type="text" v-model="nom" required />
            <label for="formEmail">Email</label>
            <PrimeInputText class="formEmail" name="formEmail" type="email" v-model="email" required />
            <label for="formPasswd">Contrasenya</label>
            <PrimeInputText class="formPasword" name="formPasswd" type="password" v-model="password" required />
            <label for="formPasswdConfirm">Confirma contrasenya</label>
            <PrimeInputText class="formPasword" name="formPasswdConfirm" type="password" v-model="password_confirmation" required />
            <PrimeButton class="formSubmit" type="submit">Registre</PrimeButton>
        </form>
        <p class='login-link'>Ja tens compte? <nuxt-link to="/login" class="linkA">Inicia Sessió</nuxt-link></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nom: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        registerFetch(){
            if(this.password !== this.password_confirmation){
                alert('Les contrasenyes no coincideixen');
                return;
            }
            console.log(`Nom: ${this.nom}, Email: ${this.email}, Password: ${this.password}, Password Confirmation: ${this.password_confirmation}`);
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
.login-container form .formEmail, .formPasword, .formSubmit, .formNom{
    width: 300px;
}
.login-container form .formSubmit{
    margin-top: 20px;
    justify-content: center;
}
.login-container .register-link{
    margin-top: 20px;
}
.login-link{
    margin-top: 20px;
}
.login-link .linkA{
    color: white;
    font-weight: bold;
}
.login-link .linkA:hover{
    color: turquoise;
}
</style>
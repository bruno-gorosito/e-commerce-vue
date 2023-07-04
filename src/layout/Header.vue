<template>
    <div class="container">
        <div class="logo-img">
            <img class="logo" src="../imgs/logo.png" alt="logo">
            <router-link to="/checkout" class="carrito-header"><span class="material-symbols-outlined">shopping_cart</span>{{ cantidadTotal }}</router-link> 
        </div>
        <nav>
            <router-link to="/" class="router-link">Home</router-link>
            <router-link to="/checkout" class="router-link">Ver carrito</router-link>
        </nav>
    </div>
</template>
<script>

export default {
    data(){
        return {
            cantidad: 0
        }
    },
    inject: ['carrito'],
    computed:  {
        cantidadTotal(){
            return this.carrito.reduce((total, producto) => (total + producto.cant) , 0);
        } 
    },
}

</script>
<style>

    .carrito-header {
        position: absolute;
        bottom: 0;
        font-size: 1rem;
        font-weight: 600;
        right: 1rem;
        color: var(--color-text);
        display: flex;
        color: var(--color-text);
        text-decoration: none;
    }

    span {
        padding: 0 .2rem;
    }

    .logo-img{
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 2rem 0;
    }
    .logo {
        height: 6rem;
        margin: 0 auto;
    }
    nav {
        display: flex;
        height: 4rem;
        border-bottom: 2px solid #000;
        width: 100%;
    }
    ul {
        display: flex;
        padding: 0;
        width: 100%;
        list-style: none;
        text-align: center;
        align-items: center;
        color: var(--color-text);
        text-decoration: none !important;
    }

    .router-link:hover {
        background-color:var(--hover-bg);
        cursor: pointer;
    }
    .router-link {
        width: 50%;
        padding: 1rem;
        text-align: center;
        color: var(--color-text);
        text-decoration: none;
    }

</style>
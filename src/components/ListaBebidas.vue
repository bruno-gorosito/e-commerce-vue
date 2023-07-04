<template >
    <h2 class="titulo">{{ categoriaseleccionada }}</h2>
    <div class="container-cards">
        <CardBebida
            v-for="bebida in bebidas"
            :bebida="bebida"
        />
    </div>
</template>
<script>
import CardBebida from './CardBebida.vue'

export default {
    props: {
        categoriaseleccionada: {
            type: String,
            required: true
        },
        bebidas: {
            type: Array, 
            required: true
        }
    },
    components: {
        CardBebida
    }
}
</script>
<style >
    .titulo {
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        background: var(--gradient-bg);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        animation: animatedGradient 2s infinite linear;
        animation-direction: alternate;
    }

    @keyframes animatedGradient {
        from {
            background-size: 100%;
            
        }
        to {
            background-size: 250%;
        }
    }

    .container-cards {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 100%;
        padding: 1rem;
    }
</style>
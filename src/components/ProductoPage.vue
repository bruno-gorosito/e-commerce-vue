<template>
    <div class="container">
        <div class="row">
            <img class="trago-img" :src="info.strDrinkThumb">
            <h3>{{ info.strDrink }}</h3>
        </div>
        <div class="container-cards">
            <div class="ingredientes" v-for="ingrediente in ingredientes">
                <h4>{{ ingrediente }}</h4>
                <img :src="`https://www.thecocktaildb.com/images/ingredients/${ingrediente}.png`">
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            info: {},
            ingredientes: []
        }
    },
    mounted() {
        this.cargarBebida().then(informacion => {
            this.info = informacion;
        });
        setTimeout(() => {
            this.ingredientes = this.crearArrayIngredientes(this.info);
        }, 1000)
    },
    methods: {
        async cargarBebida() {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`)
            return(res.data.drinks[0]);
        }, 
        crearArrayIngredientes(objeto) {
            const ingredientes = [];

            for (const key in objeto) {
                if (key.startsWith('strIngredient') && objeto[key]) {
                    ingredientes.push(objeto[key]);
                }
            }
            return ingredientes;
        }
        
    }
}
</script>
<style scoped>
    .row {
        display: flex;
        width: 100%;
        align-items: center;
    }
    .trago-img {
        width: 50%;
        max-width: 300px;
        border-radius: 50%;
        padding: 1rem;

    }

    h3 {
        font-size: 3rem;
        font-weight: 800;
        text-align: center;
        width: 50%;
    }

    .ingredientes {
        width: calc((100% - 1rem) / 3);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        overflow: hidden;
        transition: transform .1s linear;
    }

    .ingredientes img {
        width: 100%;
    }

    h4 {
        font-size: 2rem;
        width: 100%;
        text-align: center;
    }

    p {
        padding: 1rem;
        font-size: 1rem;
    }

    @media (max-width: 500px) {
        h3 {
            font-size: 2rem;
        }

        h4 {
            font-size: 1rem;
        }
    }

</style>
<template>
    <div class="container">
        <Formulario 
            :categoriaseleccionada="categoriaseleccionada"  
            v-model:categoriaseleccionada="categoriaseleccionada"
        />
        <ListaBebidas 
            :categoriaseleccionada="categoriaseleccionada"
            :bebidas="bebidas"
        />
    </div>
</template>
<script>
import Formulario from './Formulario.vue';
import ListaBebidas from './ListaBebidas.vue';

import axios from 'axios';

export default {
    data() {
        return {
            categoriaseleccionada: "",
            bebidas: []
        };
    },
    watch: {
        categoriaseleccionada(newValue){
            this.cargarBebidas(newValue).then((drinks) => {
                this.bebidas = drinks;
            })
        }
    },
    methods: {
        async cargarBebidas() {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.categoriaseleccionada}`)
            return res.data.drinks;
        }
    },

    components: { Formulario, ListaBebidas }
}
</script>
<style>
    .container {
        box-sizing: border-box;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
        color: var(--color-text);
    }
</style>



<script>
import axios from 'axios'



export default{
    props: {
        categoriaseleccionada: {
            type: String,
            required: true
        }
    },
    mounted(){
        const cargarCategorias = async() => {
            const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
            return res.data.drinks;
        }
        cargarCategorias().then((categorias) => {
            this.categorias = categorias
        })
    },


    data() {
        return{
            categorias: []
        }
    },
    methods: {
        updateCategoria(event) {
            this.$emit("update:categoriaseleccionada", event.target.value);
        }
    }
    
}
</script>

<template>
    <form>
        <div class="form-group">
            <label>Categoria</label>
            <select title="Selecciona una categoria" :value="categoriaseleccionada" @input="updateCategoria">
                <option value="">-- Seleccione una categoria --</option>
                <option v-for="categoria in categorias" :value="categoria.strCategory">{{ categoria.strCategory }}</option>
            </select>
        </div>
    </form>
</template>

<style>

    form {
        padding: 1rem;
    }
    .form-group {
        width: 100%;
        font-size: 1.4rem;
    }
    label {
        display: block;
        margin: 1rem 0;
    }

    select {
        width: 100%;
        height: 3rem;
        border-radius: .5rem;
        padding: 0 1rem;
        font-size: 1rem;
    }


    option:hover {
        background-color: red;
    }
</style>
<template >
    
    <div class="card">
        <router-link class="router" :to="`/drink/${idDrink}`">
            <img :src="strDrinkThumb">
            <p>{{ nombre }}</p>
            <p class="precio">${{ precio }}</p>
            
        </router-link>
        <div class="info">
            <button @click="agregarProducto"><span class="material-symbols-outlined carrito">shopping_cart</span>Agregar al carrito</button>
        </div>
    </div>
</template>
<script>


export default {
    props: {
        bebida: {
            type: Object,
            required: true
        } 
    }, 
    data() {
        return {
            precio: Math.trunc(Math.random() * 1000)
        }
    },
    inject: ['actualizarCarrito', 'carrito'],
    methods: {
        agregarProducto() {
            // this.carrito.push(this.bebida); // añadir un nuevo producto al carrito
            // this.actualizarCarrito(this.carrito); // actualizar el carrito en App.vue mediante el método proporcionado por provide
            const productoExistente = this.carrito.find(producto => producto.strDrink === this.bebida.strDrink); // buscar si el producto ya existe en el carrito
            if (productoExistente) {
                productoExistente.cant += 1; // si el producto ya existe, aumentar su cantidad
            } else {
                this.bebida.precio = this.precio;
                this.carrito.push({...this.bebida, cant: 1}); // si el producto no existe, añadirlo al carrito con cantidad 1
            }
            this.actualizarCarrito(this.carrito); // actualizar el carrito en App.vue mediante el método proporcionado por provide
        }
    },
    computed: {
        //Realizando destructuring
        nombre() {
            const {strDrink} = this.bebida;
            return strDrink;
        },
        idDrink() {
            const {idDrink} = this.bebida;
            return idDrink;
        },
        strDrinkThumb() {
            const {strDrinkThumb} = this.bebida;
            return strDrinkThumb;
        }
    }
}
</script>
<style scoped>
    .card {
        width: calc((100% - 1rem) / 3);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        overflow: hidden;
    }
    
    .precio {
        width: 100%;
        font-size: 1rem;
    }

    p {
        padding: .5rem 1rem 0;
        font-size: 1.5rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    img {
        width: 100%;
    }

    .info {
        width: 100%;
        padding: 1rem .5rem;
    }
    button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        padding: .5rem 1rem;
        border: 1px solid #236919;
        background-color: #236919;
        color: #fff;
        transition: all .2s linear;
        font-size: 1rem;
        font-weight: 600;
        word-break: keep-all;
        white-space: nowrap;
    }

    button:hover {
        cursor: pointer;
        background-color: #329c24;
    }

    
    .router {
        text-decoration: none;
        color: inherit
    }

    .carrito {
        color: #fff;
    }

    @media (max-width: 900px) {
        .card {
            width: calc(50% - 1rem);
        }
    }

    @media (max-width: 500px) {
        .card {
            width: 100%;
        }
    }

</style>
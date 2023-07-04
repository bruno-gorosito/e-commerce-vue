<template>
    <div class="product-container">
        <img :src="product.strDrinkThumb" :alt="product.strDrink">
        <div class="details">
            <div class="cant">
                <p>{{ product.strDrink }}</p>
                <div class="cantidad">
                    <button @click="restarCantidad">-</button>
                    <p>{{ product.cant }}</p>
                    <button @click="agregarCantidad">+</button>
                </div>
            </div>
            <p>${{ product.precio }}</p>
        </div>
    </div>
    <div v-if="carrito.length > 1" class="line"></div>
</template>
<script>
export default {
    props: {
        product: {
            type: Object
        }
    },
    data() {
        return{
            carritoActualizado: []
        }
    },
    inject: ['carrito', 'actualizarCarrito'],
    methods: {
        agregarCantidad() {
            const index = this.carrito.findIndex(producto => producto.strDrink === this.product.strDrink)
            if (index > -1) {
                this.carrito[index].cant++
            } else {
                this.carrito.push({...this.product, cant: 1})
            }
            this.actualizarCarrito(this.carrito)
        },
        restarCantidad() {
            const index = this.carrito.findIndex(producto => producto.strDrink === this.product.strDrink)
            if (index > -1) {
                if (this.carrito[index].cant > 1) {
                    this.carrito[index].cant--
                } else {
                    this.carrito.splice(index, 1)
                }
                this.actualizarCarrito(this.carrito)
            }
        }
    }


}
</script>
<style scoped>
    .product-container {
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
    }

    img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        margin: 0 1rem 0 0;
    }

    .cant>p {
        font-weight: 600;
    }

    .details {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .line{
        width: calc(100% - 4rem);
        margin: 0 auto;
    }

    .cantidad {
        display: flex;
        width: 4rem;
        border-radius: 9px;
        overflow: hidden;
        font-size: 1rem;
        margin: .5rem 0;
    }

    .cantidad>button {
        border: none;
        font-size: 1.2rem;
        background-color: #fff;
        width: 1.4rem;
        cursor: pointer;
    }

    .cantidad>p {
        width: 2rem;
        background-color: #fff;
        color: #000;
        text-align: center;
    }


    @media (max-width: 500px) {
        .product-container {
            padding: 1rem 1rem;
        }
    }


</style>
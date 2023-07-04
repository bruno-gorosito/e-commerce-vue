<template>
    <div v-if="carrito.length !== 0" class="checkout-container">
        <div class="cart-list">
            <h2>Tu carrito</h2>
            <ProductCart v-for="product in carrito" :product="product"/>
        </div>
        
        <div class="info-price">
            <h2>Total</h2>
            <div v-if="!tengoCupon" @click="this.agregarCupon" class="divCupon descuento"><span class="material-icons">discount</span>Tengo un cupon</div>
            <div v-if="tengoCupon" class="divCupon descuento">
                <input v-model="cuponIngresado" class=" descuento" type="text" placeholder="Ingrese su cupón">
                <button @click="this.validarCupon" class="button-desc">Añadir</button>
            </div>
            <div v-if="respuestaCupon.clase !== ''" :class="respuestaCupon.clase">{{ respuestaCupon.msg }}</div>
            
            <p>Subtotal <span>${{ subtotal }}</span></p>
            <p>Descuentos <span>${{ descuento }}</span></p>
            
            <div class="line"></div>
            <p>Total <span>${{ total }}</span></p>
            <button class="continue" @click="comprar">
                Continuar
            </button>
        </div>
    </div>
    <div v-else-if="compra.clase !== ''" :class="compra.clase">
            <router-link class="error-redirect" to="/"><p>{{ compra.msg }}</p></router-link>
    </div>
</template>

<script>
import ProductCart from './ProductCart.vue';


export default {
    data() {
        return {
            tengoCupon: false,
            cuponIngresado: '',
            cuponvalido: false,
            cupon: '',
            respuestaCupon: {
                clase: '',
                msg: ''
            },
            compra: {
                clase: '',
                msg: ''
            }
        };
    },
    mounted() {
            const verificarErrorCarritoVacio = () => {
                if (this.carrito.length === 0 ) {
                    this.compra = {clase: 'mensaje error', msg: 'Tu carrito está vacío. ¡Vamos a comprar!'}
                }
            }

            verificarErrorCarritoVacio();
    },
    methods: {
        agregarCupon() {
            this.tengoCupon = !this.tengoCupon
        },
        validarCupon() {
            console.log('cuponIngresado:', this.cuponIngresado);
            let existe = this.cupones.filter(elem => elem.nombre === this.cuponIngresado.toLowerCase());
            this.cuponvalido = existe.length !== 0 ? true : false;
            this.cuponIngresado = '';
            this.cupon = this.cuponvalido ? existe[0] : null;
            this.respuestaCupon = this.cuponvalido ? {clase: "mensaje aceptado", msg: `!Cupón aceptado! Tienes un ${this.cupon.desc}% de descuento.`} : {clase: "mensaje error", msg: "Cupón inválido, ingrese nuevamente."}
        },
        comprar() {
            this.borrarCupon(this.cupon);
            this.tengoCupon = false,
            this.cuponIngresado = '',
            this.cuponvalido = false,
            this.cupon = '';
            this.carrito.splice(0, this.carrito.length)
            this.actualizarCarrito(this.carrito);
            this.respuestaCupon = {
                clase: '',
                msg: ''
            }
            this.compra = {clase: 'mensaje aceptado', msg: 'Gracias por su compra. ¡Hagamos otra compra!'};
        }
    },
    computed: {
        subtotal() {
            return( this.carrito.reduce((total, producto) => ( total + producto.precio * producto.cant), 0))
        },
        descuento() {
            if (this.cuponvalido) {
                let adescontar = this.subtotal * (this.cupon.desc / 100)
                let aux = adescontar.toFixed(2);
                return parseFloat(aux)
            } else {
                return 0;
            }
        },
        total () {
            let total = this.subtotal - this.descuento;
            let aux = total.toFixed(2);
            return parseFloat(aux)
        }
    },
    inject: ['carrito', 'actualizarCarrito', 'cupones', "borrarCupon"],
    components: { ProductCart }
}
</script>
<style scoped>

    h2 {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        margin: 0 0 1rem 0;
    }
    .checkout-container {
        width: 100%;
        max-width: 1000px;
        margin: 1rem auto;
        display: flex;
        flex-wrap: wrap;
    }

    .cart-list {
        width: 70%;
    }
    
    input {
        padding: .5rem;
        text-transform: uppercase;
        position: absolute;
    }

    input:focus {
        outline: none;
        color: #4a4a4a;
    }

    .error {
        background-color: var(--error-bg);
        width: 100%;
        max-width: 1000px;
        margin: 1rem auto;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .divCupon {
        background-color: aliceblue;
        height: 2.5rem;
        color: #4a4a4a;
        font-weight: 400;
        font-size: 1rem;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem 0;
    }

    .descuento {
        width: 100%;
        height: 2.5rem;
        font-size: 1rem;
    } 

    .button-desc {
        height: 100%;
        background-color: var(--button-bg);
        border: none;
        color: #fff;
        font-size: 1rem;
        padding: .5rem;
        position: absolute;
        right: 0;
    }

    .button-desc:hover {
        background-color: var(--hover-button-bg);
    }

    
    .error-redirect {
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
    }

    .info-price {
        width: 30%;
        padding: 0 1rem;
        border-left: 2px solid var(--border-color);
    }

    p {
        display: flex;
        justify-content: space-between;
    }

    

    .continue {
        width: 100%;
        height: 3rem;
        margin: 2rem 0;
        border-radius: 10px;
        background-color: var(--button-bg);
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: .2rem;
    }

    .continue:hover {
        background-color: var(--hover-button-bg);
    }

    .mensaje {
        width: 100%;
        max-width: 1000px;
        margin: 1rem auto;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .aceptado {
        background-color: var(--aceptado-bg);
    }
    
    .error {
        background-color: var(--error-bg);
    }

    @media (max-width: 500px) {
        .cart-list{ 
            width: 100%;
        }

        

        .info-price {
            width: 100%;
            margin: 2rem 0;
            border: none;
        }
    }
</style>
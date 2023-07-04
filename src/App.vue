<script>
import Header from './layout/Header.vue';

export default {
    data() {
      return {
        carrito: JSON.parse(localStorage.getItem('carrito')) || [],// el carrito inicialmente está vacío
        cupones: JSON.parse(localStorage.getItem('cupones')) || [{nombre: 'soyela', desc: 99}, {nombre: 'brunokpo', desc: 15}, {nombre: 'julieta', desc: 99}, {nombre: 'mis15off', desc: 15}, {nombre: 'angel', desc: 20}]
      }
    },  
    provide() {
      return {
        actualizarCarrito: (nuevoCarrito) => {
          this.carrito = nuevoCarrito;
          localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        carrito: this.carrito, // el carrito inicialmente está vacío
        borrarCupon: (cupon) => {
          let indiceBorrar = this.cupones.indexOf(cupon);
          this.cupones.splice(indiceBorrar, 1)
          localStorage.setItem('cupones', JSON.stringify(this.cupones))
        },
        cupones: this.cupones
    }
    },
    methods: {
    },
    components: { Header }
}


</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style scoped>

</style>

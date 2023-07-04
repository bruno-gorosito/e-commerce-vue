
import {createRouter, createWebHashHistory} from 'vue-router'
import Principal from '../components/Principal.vue'
import ProductoPage from '../components/ProductoPage.vue'
import CheckoutPage from '../components/checkout/CheckoutPage.vue'

const routes = [
    {path:'/', name: 'Principal', component: Principal},
    {path:'/drink/:id', name: 'ProductoPage', component: ProductoPage},
    {path:'/checkout', name: 'CheckoutPage', component: CheckoutPage}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
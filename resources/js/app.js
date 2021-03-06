/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/** this line for moment library */
import moment from 'moment'


/** import line for Vue progressBar*/
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
window.swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

window.toast = Toast;

/** this line for VForm package */
import { Form, HasError, AlertError } from 'vform'
window.form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/** this line for Vue-Router package */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component:  require('./components/DashboardComponent.vue').default },
    { path: '/users', component:  require('./components/UsersComponent.vue').default },
    { path: '/profile', component:  require('./components/ProfileComponent.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})


/**  this is a global filter using by vue , you well give you possibility to add filter for your code vue
 *   and this is a global filter you can called from everywhere you want
 * */
Vue.filter('upText',(text)=>{ return text[0].toUpperCase() + text.slice(1); });
Vue.filter('myDateToHuman' ,(date_created)=>{return moment(date_created).format('MMMM Do YYYY');})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});

import Vue from 'vue'
Vue.use(VueRouter)

import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import Admin from './components/Admin.vue'
import About from './components/about/About.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'


import Contact from './components/about/Contact.vue'
import Delivery from './components/about/Delivery.vue'
import History from './components/about/History.vue'
import OrderingGuide from './components/about/OrderingGuide.vue'


import Phone from './components/about/contact/Phone.vue'
import PersonName from './components/about/contact/personName.vue'



export default new VueRouter({
	routes:[
		{path: '/', redirect: '/home' },
		{path:'/home',name:'homeLink',components:{
			default:Home,
			'orderingGuide':OrderingGuide,
			'delivery':Delivery,
			'history':History

		}},
		{path:'/menu',name:'menuLink',component:Menu},
		{path:'/admin',name:'adminLink',component:Admin,//beforeEnter:(to,from,next)=>{
			//alert("123");
			//next();
		//},
		},
		{path:'/about',name:'aboutLink',redirect:'/phone',component:About ,children:[
			{path:'/contact',name:"contactLink",component:Contact,children:[
				{path:'/phone',name:'phoneNumber',component:Phone},
				{path:'/personname',name:'personName',component:PersonName}
			]},
			{path:'/delivery',name:"deliveryLink",component:Delivery},
			{path:'/history',name:"historyLink",component:History},
			{path:'/orderingGuide',name:"orderingGuideLink",component:OrderingGuide},
		]},
		{path:'/login',component:Login},
		{path:'/register',component:Register},
		{path:'*',redirect:'/'}
	],
	mode:'history',
	scrollBehavior(to,from,savedPosition){
		return {x:0,y:200}
		//return {selector:'.btn'}
	}

})

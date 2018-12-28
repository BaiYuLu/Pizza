<template>
		<div class="row">

			<div class="col-sm-12 col-md-8">
				<newPizza></newPizza>
			</div>
			<div class="col-sm-12 col-md-4">
				<h3 class="text-muted my-5">菜单</h3>
				<table class="table">
					<thead class="table table-default">
						<tr>
							<th>品种</th>
							<th>删除</th>
						</tr>
					</thead>
					<tbody v-for="item in getMenuItems" :key="item.id">
						<tr>
							<td>{{item.name}}</td>
							<td>
								<button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">删除</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>   					
		</div>
</template>

<script>
	import axios from 'axios'
	import newPizza from './newPizza'

	export default {
		data() {
			return {
				//getMenuItems:[]
			};
		},
		computed:{
			getMenuItems(){

					return this.$store.getters.getMenuItems

			}
		},

		components:{
			newPizza
		},
		created(){
			axios.get('/menu.json')
				.then(result=>{
				let data=result.data
				let menuArray=[]
				//console.log(data)
				for(let key in data){
					//console.log(data[key])
					data[key].id=key
					menuArray.push(data[key])
				}
				//console.log(menuArray)
				//this.getMenuItems=menuArray
				this.$store.commit('setMenuItems',menuArray)
			})
		},
		methods:{
			deleteData(item){
				axios.delete('/menu/'+item.id+".json")
					//.then(data=>this.$router.push('/menu'))
					.then(data=>{
						this.$store.commit('removeMenuItems',item)
					})
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			 next(vm=>{
				 if(vm.$store.getters.isLogin===false){
					 alert("请先登录");
					 next("/login")
				 }
				 else
				 next()

				 })

		},

	}
</script>

<style>

</style>

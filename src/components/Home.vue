<template>
  <div class="row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎大家品尝pizza!</h1>
        <h2>这里有你非常喜欢的pizza!</h2>
        <button @click="goToMenu" class="btn btn-success">Let's order!</button>
      </div>
    </div>
		
  </div>
	
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goToMenu(){
				this.$router.push({name:'menuLink'})
			}
		}
	}
</script>

<style lang="scss" scoped="">
#home{
  background: url('../assets/pizza.jpg') no-repeat center;
  height: 80vh;
  padding: 10%;
  max-width: 100%;
  .background{
    background: #eee;
    opacity: 0.8;
    max-width: 50vw;
    margin: 0 auto;
    padding: 20px 0;
  }
  h1,h2{
    margin: 6%;
  }
  
}

</style>

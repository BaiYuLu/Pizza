const state={
    currentUser:null
}
const mutations={
  userStatus(state,user){
       if(user){
         state.currentUser = user
         state.isLogin = true
       }else{
         state.currentUser = null
         state.isLogin = false
       }
     },
}
const getters={
     currentUser: state => state.currentUser
}
const actions={
  setUser({commit},user){
       commit("userStatus",user)
     }
}
export default{
  state,
  mutations,
  getters,
  actions
}

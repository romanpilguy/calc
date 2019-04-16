<template>
  <div id="app" class = "row">
  <nav>
    <div class="nav-wrapper black head">
      <router-link class = "col s6 quotes_btn" to = "/quotes" v-bind:class = "{active : showQuotes}"></router-link>
      <router-link class = "col s6 calc_btn" to = "/calculator" v-bind:class = "{active : showCalc}"></router-link>
    </div>
  </nav>
  
  <div class = "col s12 wrapper">
    <transition name = "fade" mode = "out-in">
      <router-view></router-view>
    </transition>
  </div>
  
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      showQuotes : (this.$route.path == '/quotes'),
      showCalc : (this.$route.path == '/calculator'),
      animation : ''
    }
  },
  methods:{
    ...mapActions(['loadData','updateQuotes']),
     ...mapGetters(['getFlag','getData',])
  },
  created(){
    this.loadData()
    this.updateQuotes(JSON.parse(localStorage.getItem('quotes')))
  },
  watch:{
    $route (to, from){
        if(this.$route.path == '/quotes'){
          this.showQuotes = true
          this.showCalc = false 
          
        }
        else{
          this.showQuotes = false
          this.showCalc = true
         
        }

    }
} 
}
</script>

<style lang="scss">

.head{
  height:100px;
  padding:0;
  a{
    height:100%;
    padding:0!important;
    margin:0;
    background-size : auto 60%;
    background-position:center;
    background-repeat: no-repeat;
    background-color:black;
    transition: 0.2s;
    &.active{
      filter : invert(100)
    }
  }
  .calc_btn{
    background-image: url(./assets/calc_white.png);
   
  }
  .quotes_btn{
    background-image: url(./assets/chart_white.png);
    
  }
}
.fade-enter-active{
  
  transition: .5s;
}


.fade-enter {
  
  opacity: 0;
}
.wrapper{
  display: flex;
  justify-content: center
}
</style>

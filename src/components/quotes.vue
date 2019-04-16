<template>
    <div class = "quotes_wrapper container row ">
        
        <transition-group name = "list-complete" tag = "div">
            
                <quote v-for = "item in list" v-bind:key = "item.id" v-bind:id = "item.id" class = "list-complete-item"></quote>
            
       
        <div class = "col s12 list-complete-item" v-bind:key = "10000">
            <a class="waves-effect waves-light btn-large black" v-on:click = "addQuote()"><i class="material-icons">add</i></a>
        </div>
         </transition-group>
    </div>
</template>
<script>
import quote from './quote.vue'
import {mapGetters} from 'vuex'
export default {
    components : {
        quote
    },
    data(){
        return {
            list : this.getQuotes()
        }
    },
    methods : {
        addQuote(){
            let id = this.list.length != 0 ? this.list[this.list.length - 1].id + 1 : 0
            this.list.push({ id : id, body : ['USD','EUR']})
        },
        ...mapGetters(['getQuotes'])
    },
    created(){
        
        this.list = this.getQuotes()
    }
}
</script>
<style lang="scss">
.quotes_wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center
}

.list-complete-item {
  transition: transform 0.5s;
  display: inline-block;
  
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  
}
.list-complete-leave-active {
  position: absolute;
}
</style>

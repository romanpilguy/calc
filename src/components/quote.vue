<template>
    <div class = "quote card row col s12" v-bind:class = "{deleted : deleted}">
        <div class = "col s12 m5">
            <div class="input-field col s4   select" v-if = "getFlag">
                    <select v-model = "leftVal">
                        <option value="" disabled selected>Choose Valute</option>
                    <option v-for = "(item,id) in getData.Valute"  v-bind:value = "id" v-bind:key = "id"
                    >{{id}}</option>
                    </select>        
            </div>
            <h3 class = " input-field col s1 slash"> / </h3>
            <div class="input-field col s4 select" v-if = "getFlag">
                    <select v-model = "rightVal">
                        <option value = "" disabled selected>Choose Valute</option>
                    <option v-for = "(item,id) in getData.Valute"  v-bind:value = "id" v-bind:key = "id"
                    >{{id}}</option>
                    </select>    
            </div>
        </div>
        <div class = "input-field row col s10 m5 info" v-if = "getFlag" >
                <div class = "">{{calculate()}}
                <div class = "arrow arrow-up " v-if = "!compare()"></div>
                <div class = "arrow arrow-down " v-if = "compare()"></div>
                </div>
                
        </div>
        <a class="waves-effect waves-light btn-small red darken-4 " v-on:click = "deleteQuote()"> <i class="material-icons">close</i></a>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    props : {
        id: { 
            type : Number,
            default(){
                return 0
            }
        },
        
    },
    data(){
        return{
            
            leftVal : '',
            rightVal : '',
            deleted : false
        }
    },
    methods : {
        ...mapGetters(['getFlag','getQuotes']),
        ...mapActions(['updateQuotes']),
        initializeLists(){
           
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        },
        init(){
            try {
                let data = this.getQuotes()
                
                this.leftVal = data.find(item =>item.id == this.id).body[0]
                this.rightVal = data.find(item =>item.id == this.id).body[1]
            } catch (error) {
               
                this.rightVal = 'USD'
                this.leftVal = 'EUR'
            
            }

        },
        updateQuote(){
            let data = this.getQuotes()
            
            data[data.indexOf(data.find(item =>item.id == this.id))].body = [this.leftVal,this.rightVal]
            this.updateQuotes(data)
          
        },
        deleteQuote(){
            let data = this.getQuotes()
            
                data.splice(data.indexOf(data.find(item =>item.id == this.id)),1)
                this.updateQuotes(data)
            
            
                 
           
            
        },
        compare(){
            try {
                if(this.getData.Valute[this.leftVal].Previous/this.getData.Valute[this.rightVal].Previous > this.getData.Valute[this.leftVal].Value/this.getData.Valute[this.rightVal].Value)
           {
               return false
           }
           else return true 
                
            } catch (error) {
                
            }
           
        },
        calculate(){
            try {
                return this.getData.Valute[this.leftVal].Value/this.getData.Valute[this.rightVal].Value
            } catch (err){}
            
        },
        
    },
    created(){
       this.init() 
       setTimeout(()=>{
                this.initializeLists()
            },50)
        this.updateQuote()
    },
    computed : {
        ...mapGetters(['getData'])
    },
    watch : {
        getData : function(){
            
            
            
          
            setTimeout(()=>{
                
                this.initializeLists()
            },50)
        },
        rightVal : function(){
            this.updateQuote()
            
        },
        leftVal : function(){
             this.updateQuote()
        }
    }
}
</script>
<style lang="scss">

  .arrow{
      width : 1em;
      height: 1em;
      
      background-size : contain;
      background-position: center;
      background-repeat: no-repeat;
      margin : 0;
      display: inline-block;
      &.arrow-up{
          background-image: url(../assets/green.png);
      }
      &.arrow-down{
          transform: rotate(180deg);
          background-image: url(../assets/red.png);
      }
  }
  
    .info{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 1.3em;
    }
    .quote{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        transition: 1s;

        
    }
    .btn-small{
        height:100%;
        position:absolute;
        right:0;
        display: flex;
        align-items: center;
    }
    
    
</style>


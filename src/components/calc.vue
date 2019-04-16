<template>
    <div class = 'calc container'>
        <div class = "row">
            <div class = "col s5 row">
                <div class="input-field col s12">
                    <input id="input" type="text" class="validate" v-model = "intVal">
                
                </div>
                <div class="input-field col s8 m4 select" v-if = "getFlag">
                    <select v-model = "inputValute">
                        <option value="" disabled selected>Choose Valute</option>
                    <option v-for = "(item,id) in getData.Valute"  v-bind:value = "id" v-bind:key = "id"
                    >{{id}}</option>
                    </select>
                    
                </div>
                <div class = "input-field col m6 s12 " v-if = "getFlag">
                    
                    <h5>{{getData.Valute[inputValute].Name}}</h5>
                </div>
            </div>
            <div class = "input-field col s2 sign">
                <i class="material-icons">arrow_forward</i>
            </div>
            <div class = "col s5 row">
               <div class="input-field col s12">
                    <input disabled id="output" type="text" v-bind:value = "calculated " class="validate output" >
                    
                </div>
                
                <div class="input-field col s8 m4 select" v-if = "getFlag">
                    <select v-model = "outputValute">
                        <option value= "" disabled selected>Choose Valute</option>
                        <option v-for = "(item,id) in getData.Valute"  v-bind:value = "id" v-bind:key = "id" >{{item.CharCode}}</option>
                        
                    </select>
                
                </div>
                <div class = "input-field col m6 s12 " v-if = "getFlag">
                    
                    <h5>{{getData.Valute[outputValute].Name}}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
           
            a:false,
            inputValute : 'USD',
            outputValute : 'USD',
            intVal : 0,
            
        }
    },
    
    methods : {
        
        initializeLists(){
           
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        
        },
        ...mapGetters(['getFlag'])
        
    },
    computed : {
        calculated : function() {
           if(this.getData != null)
            return this.getData.Valute[this.inputValute].Value/this.getData.Valute[this.outputValute].Value * this.intVal
            else return 0
        },
        ...mapGetters(['getData']),
        
    },
    created(){
        setTimeout(()=>{
                this.initializeLists()
            },50)
    },
    watch : {
        intVal : function(){
            if(this.intVal[this.intVal.length - 1] > '9' || this.intVal[this.intVal.length - 1] < '0'){
                   this.intVal =  this.intVal.substring(0, this.intVal.length - 1)

            }
        },
        getData : function(){
            
            this.json = this.getData
            this.a = this.getFlag
            setTimeout(()=>{
                this.initializeLists()
            },50)
        }
    },
    
}
</script>
<style lang="scss">
    .select {
        ul{
            overflow-x : hidden;
            max-height:300px;
            overflow-y: scroll;
        }
    }
    .sign
    {
        font-size: 2em;
    }
    .output{
        color: black!important ;
       border-bottom: 1px solid #4CAF50!important ;
           box-shadow: 0 1px 0 0 #4CAF50!important;
    }
</style>


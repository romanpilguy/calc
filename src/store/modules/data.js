import axios from 'axios'

const state = {
    json : {},
    loadFlag : false,
    quotes : []
    
}

const mutations = 
{
    
   setData(state,val){
       state.json = val
   },
   setFlag(state,val){
       state.loadFlag = val
   },
   setQuotes(state,val){
       state.quotes = val
       }
    
}
 const actions = 
 {
     loadData({commit})
     {
        return new Promise((resolve,reject ) =>{
                axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(res =>{
                    commit('setData', res.data)
                    commit('setFlag',true)
                    resolve(res.data)
            })
        })
     },
     updateQuotes({commit},val){
        
         commit('setQuotes',val)
         localStorage.setItem('quotes',JSON.stringify(val))
     }
 }

 const getters = 
 {
     getData(){
         return state.json
     },
     getFlag(){
        return state.loadFlag
     },
    getQuotes(){
        
        return state.quotes
    }

 }

 export default {
     state,
     mutations,
     actions,
     getters
 }
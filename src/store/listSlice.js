import { createSlice } from "@reduxjs/toolkit";
let count =0;
export const listSlice = createSlice({
    name:'list',
    initialState:{
        values:[]
    },

    reducers:{
        addToList:(state,action) =>{
            state.values = [{id:count++,...action.payload},...state.values];
            const stringify = JSON.stringify(state.values);
            localStorage.setItem('list',stringify);
        },
        markIt:(state,action)=>{
            for(let i =0; i<state.values.length; i++){
                if(state.values[i].id === action.payload){
                    state.values[i].marked = !state.values[i].marked;
                }
            }
            const stringify = JSON.stringify(state.values);
            localStorage.setItem('list',stringify);
        },
        removeItem:(state, action) =>{
            state.values = state.values.filter(d => d.id != action.payload);
            const stringify = JSON.stringify(state.values);
            localStorage.setItem('list',stringify);
        },
        setToList:(state,action)=>{
            state.values = action.payload;
        }

    }
})

export const {addToList,markIt,removeItem,setToList} = listSlice.actions;

export default listSlice.reducer
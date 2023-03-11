import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
    name:'modals',
    initialState:{
        connect:{state:false},
        complete:{state:false},
        buy:{state:false},
        confirm:{state:false},
        wallet:{state:false},
        search:{state:false},
        settings:{state:false},
        nav:{state:false},
        share:{state:false},
        cookie:{state:false}
    },
    reducers:{
        closeModal(state,action){
            state[action.payload].state = false
        },
        openModal(state,action){
            state[action.payload].state = true
        },
        toggleModal(state,action){
            state[action.payload].state = !state[action.payload].state
        }
    }
})
    
export const {closeModal,openModal,toggleModal} = modalsSlice.actions
export default modalsSlice.reducer
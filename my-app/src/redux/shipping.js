import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shipping:null,
    card:null
    }

    export const userSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        saveShipping:(state,action)=>
        {
            state.shipping = action.payload.shipping
        },
        saveCard:(state,action)=>
        {
            state.card = action.payload.card
        },
        clearShipping:(state)=>
        {
            state.shipping = null;
            state.card = null
        },
    },
})
export const { saveShipping ,clearShipping , saveCard} = userSlice.actions
export default userSlice.reducer
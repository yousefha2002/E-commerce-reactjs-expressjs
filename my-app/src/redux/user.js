import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token:null
    }

    export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startUser:(state,action)=>
        {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        closeUser:(state)=>
        {
            state.user = null
            state.token = null
        },
    },
})
export const { startUser ,closeUser} = userSlice.actions
export default userSlice.reducer
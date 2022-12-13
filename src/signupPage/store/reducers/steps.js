import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    step1: [],
    step2: [],
}

export const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        updateStep1: (state, action) => {
            return {
                ...state,
                step1: action.payload
            }
        },
        updateStep2: (state, action) => {
            return {
                ...state,
                step2: action.payload
            }
        },
    },
})
// Action creators are generated for each case reducer function
export const { updateStep1,updateStep2 } = stepsSlice.actions

export default stepsSlice.reducer
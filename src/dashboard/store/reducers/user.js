import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedin: false,
  agents:[]

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        isLoggedin: true,
        ...action.payload
      }
    },
     updateAgentsList: (state, action) => {
      return {
        ...state,
        agents:action.payload
      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateUser,updateAgentsList} = userSlice.actions

export default userSlice.reducer
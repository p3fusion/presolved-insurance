import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTask:null,
  showConnect: false,
  contactData: null,
  state: null, agentStates: []
}

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
})
// Action creators are generated for each case reducer function
export const { updateSettings } = settings.actions

export default settings.reducer
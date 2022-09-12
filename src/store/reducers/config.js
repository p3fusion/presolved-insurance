import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  templates: {},
  allTemplates: {
    isLoaded: false,
    data: []
  }



}

export const config = createSlice({
  name: 'config',
  initialState,
  reducers: {

    updateTemplates: (state, action) => {
      const id = action.payload.id
      return {
        ...state,
        templates: {
          ...state.templates,
          [id]: action.payload.data,
        }

      }
    },
    updateAllTemplates: (state, action) => {
      console.log({action});
      return {
        ...state,
        allTemplates: {
          isLoaded: true,
          data: action.payload,
        }

      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateTemplates, updateAllTemplates } = config.actions

export default config.reducer
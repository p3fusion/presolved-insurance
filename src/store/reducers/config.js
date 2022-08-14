import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  aggregators: {
    "PayPal": {
      logo: "https://1.bp.blogspot.com/-ro2dP_igRy4/YCAQM0M3GlI/AAAAAAAAJVg/Hz6jyEIBHzMqj3Hlsg9j6eE18Cz_24nQACLcBGAsYHQ/w400-h155/paypal-logo.png"
    },
    "Stripe": {
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
    },
  }


}

export const config = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    updateConfig: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateConfig } = config.actions

export default config.reducer
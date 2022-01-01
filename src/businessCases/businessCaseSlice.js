import { createSlice } from '@reduxjs/toolkit'

export const businessCaseSlice = createSlice({
  name: 'businessCase',
  initialState: {
    data:[]
  },
  reducers: {
    addOne: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data.push(action.payload);
    },
    updateOne: state => {
      state.value -= 1
    },
    deleteOne: (state, action) => {
      state.data = state.data.filter((elt)=>{
        return elt.name !== action.payload.name;
      })
    }
  }
})

export const { addOne, updateOne, deleteOne } = businessCaseSlice.actions
export const selectBCList = state => state.businessCase.data;

export default businessCaseSlice.reducer


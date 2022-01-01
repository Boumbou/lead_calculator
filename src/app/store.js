import { configureStore } from '@reduxjs/toolkit'
import businessCaseReducer from '../businessCases/businessCaseSlice';

export default configureStore({
  reducer: {
    businessCase: businessCaseReducer
  }
})
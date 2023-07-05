import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersSlice';

const store = configureStore({
 reducer: {
  users: usersReducer,
 },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';
import { getUsers, deleteUser, addUserAPI, updateUserAPI } from '../api/users';

const usersSlice = createSlice({
 name: 'users',
 initialState: {
  users: [],
  loading: false,
 },
 reducers: {
  setUsers: (state, action) => {
   state.users = action.payload
  },
  removeUser: (state, action) => {
   const userId = action.payload;
   state.users = state.users.filter((user) => user.id !== userId);
  },
  addUser: (state, action) => {
   const newUser = action.payload;
   state.users.push(newUser);
  },
  updateUser: (state, action) => {
   const updatedUser = action.payload;
   const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
   if (userIndex !== -1) {
    state.users[userIndex] = updatedUser;
   }
  },
  sortUsersByAge: (state, action) => {
   const sortDirection = action.payload;
   state.users.sort((a, b) => {
    if (sortDirection === 'asc') {
     return a.age - b.age;
    } else {
     return b.age - a.age;
    }
   });
  },
  sortUsersByLogin: (state, action) => {
   const sortDirection = action.payload;
   state.users.sort((a, b) => {
    if (sortDirection === 'asc') {
     return a.login.localeCompare(b.login);
    } else {
     return b.login.localeCompare(a.login);
    }
   });
  },
  isLoading: (state, action) => {
   state.loading = action.payload
  }
 },
});

export const { setUsers, removeUser, addUser, updateUser, sortUsersByAge, sortUsersByLogin, isLoading } = usersSlice.actions;

export const fetchUsers = () => async (dispatch) => {
 dispatch(isLoading(true))
 const users = await getUsers();
 dispatch(setUsers(users));
 dispatch(isLoading(false))

};

export const deleteAndRemoveUser = (userId) => async (dispatch) => {
 dispatch(isLoading(true))
 const deletedUser = await deleteUser(userId);
 if (deletedUser) {
  dispatch(removeUser(userId));
 }
 dispatch(isLoading(false))

};

export const addAndSaveUser = (user) => async (dispatch) => {
 dispatch(isLoading(true))
 const newUser = await addUserAPI(user);
 if (newUser) {
  dispatch(addUser(newUser));
 }
 dispatch(isLoading(false))
};

export const updateAndSaveUser = (user) => async (dispatch) => {
 dispatch(isLoading(true))
 const updatedUser = await updateUserAPI(user);
 if (updatedUser) {
  dispatch(updateUser(updatedUser));
 }
 dispatch(isLoading(false))

};

export default usersSlice.reducer;

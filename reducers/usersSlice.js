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
  sortUsersByField: (state, action) => {
   const { field, direction } = action.payload;
   state.users.sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];
    if (field === 'age') {
     // Проверяем, является ли значение возраста числом
     const ageA = parseInt(valueA);
     const ageB = parseInt(valueB);
     if (!isNaN(ageA) && !isNaN(ageB)) {
      valueA = ageA;
      valueB = ageB;
     }
    }
    if (direction === 'asc') {
     return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
     return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
   });
  },
  isLoading: (state, action) => {
   state.loading = action.payload
  }
 },
});

export const { setUsers, removeUser, addUser, updateUser, sortUsersByAge, sortUsersByLogin, isLoading, sortUsersByField } = usersSlice.actions;

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

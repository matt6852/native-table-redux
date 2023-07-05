import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 FlatList,
 Button,
 TextInput,
 TouchableOpacity,
 ActivityIndicator,
 Keyboard,
 TouchableWithoutFeedback,
 ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
 deleteAndRemoveUser,
 addAndSaveUser,
 updateAndSaveUser,
 fetchUsers,
 sortUsersByAge,
 sortUsersByLogin
} from '../reducers/usersSlice';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
 login: Yup.string().required('Login is required'),
 email: Yup.string().email('Invalid email').required('Email is required'),
});

const UserTable = () => {
 const dispatch = useDispatch();
 const { users, loading } = useSelector((state) => state.users);
 const [sortByAgeDirection, setSortByAgeDirection] = useState('asc');
 const [sortByLoginDirection, setSortByLoginDirection] = useState('asc');
 const [editingUserId, setEditingUserId] = useState(null);
 const [login, setLogin] = useState('');
 const [email, setEmail] = useState('');
 const [country, setCountry] = useState('');
 const [sex, setSex] = useState('');
 const [age, setAge] = useState('');
 const [loginError, setLoginError] = useState('');
 const [emailError, setEmailError] = useState('');

 useEffect(() => {
  dispatch(fetchUsers());
 }, []);

 const handleDelete = (userId) => {
  dispatch(deleteAndRemoveUser(userId));
 };

 const handleAddUser = () => {
  UserSchema.validate({ login, email })
   .then(() => {
    const newUser = {
     login: login,
     email: email,
     country: country,
     sex: sex,
     age: age,
    };

    dispatch(addAndSaveUser(newUser));
    Keyboard.dismiss()

    setLogin('');
    setEmail('');
    setCountry('');
    setSex('');
    setAge('');
    setLoginError('');
    setEmailError('');
   })
   .catch((error) => {
    if (error.path === 'login') {
     setLoginError(error.message);
    }
    if (error.path === 'email') {
     setEmailError(error.message);
    }
   });
 };

 const handleEditUser = (user) => {
  setEditingUserId(user.id);
  setLogin(user.login);
  setEmail(user.email);
  setCountry(user.country);
  setSex(user.sex);
  setAge(user.age);
  setLoginError('');
  setEmailError('');
 };

 const handleUpdateUser = () => {
  UserSchema.validate({ login, email })
   .then(() => {
    const updatedUser = {
     id: editingUserId,
     login: login,
     email: email,
     country: country,
     sex: sex,
     age: age,
    };

    dispatch(updateAndSaveUser(updatedUser));
    Keyboard.dismiss()


    setEditingUserId(null);
    setLogin('');
    setEmail('');
    setCountry('');
    setSex('');
    setAge('');
    setLoginError('');
    setEmailError('');
   })
   .catch((error) => {
    if (error.path === 'login') {
     setLoginError(error.message);
    }
    if (error.path === 'email') {
     setEmailError(error.message);
    }
   });
 };

 const handleSortByAge = () => {
  const direction = sortByAgeDirection === 'asc' ? 'desc' : 'asc';
  dispatch(sortUsersByAge(direction));
  setSortByAgeDirection(direction);
 };

 const handleSortByLogin = () => {
  const direction = sortByLoginDirection === 'asc' ? 'desc' : 'asc';
  dispatch(sortUsersByLogin(direction));
  setSortByLoginDirection(direction);
 };
 const validateLogin = () => {
  if (!login) {
   setLoginError('Login is required');
  } else {
   setLoginError('');
  }
 };

 const validateEmail = () => {
  if (!email) {
   setEmailError('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
   setEmailError('Invalid email format');
  } else {
   setEmailError('');
  }
 }

 const renderUserItem = ({ item }) => (
  <View style={{ marginBottom: 20 }}>
   <View style={{ marginBottom: 10 }}>
    <Text>Login: {item.login}</Text>
    <Text>Email: {item.email}</Text>
    <Text>Country: {item.country}</Text>
    <Text>Sex: {item.sex}</Text>
    <Text>Age: {item.age}</Text>
   </View>
   <View style={{ flexDirection: 'row' }}>

    <TouchableOpacity style={{
     alignItems: 'center',
     backgroundColor: '#DDDDDD',
     padding: 10,
     marginHorizontal: 2
    }} onPress={() => handleEditUser(item)} >
     <Text>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
     alignItems: 'center',
     backgroundColor: 'red',
     padding: 10,

     marginHorizontal: 2
    }} onPress={() => handleDelete(item.id)}  >
     <Text style={{ color: "#fff" }}>delet</Text>
    </TouchableOpacity>
   </View>
  </View>
 );

 return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   <View style={{ flex: 1, padding: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
     <TouchableOpacity style={{
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginHorizontal: 2

     }} onPress={handleSortByAge}>
      <Text>{`Sort by Login ${sortByAgeDirection}`}</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginHorizontal: 2
     }} onPress={handleSortByLogin}>
      <Text>{`Sort by Login ${sortByLoginDirection}`}</Text>
     </TouchableOpacity>
    </View>


    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Add User</Text>
    <ScrollView>
     <View style={{ marginBottom: 10 }}>
      <Text>Login:</Text>
      <TextInput
       value={login}
       onBlur={validateLogin}

       onChangeText={setLogin}
       style={{ borderWidth: 1, padding: 5, borderColor: loginError ? 'red' : 'gray' }}
      />
      {loginError ? <Text style={{ color: 'red' }}>{loginError}</Text> : null}
     </View>
     <View style={{ marginBottom: 10 }}>
      <Text>Email:</Text>
      <TextInput
       value={email}
       onBlur={validateEmail}
       onChangeText={setEmail}
       style={{ borderWidth: 1, padding: 5, borderColor: emailError ? 'red' : 'gray' }}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
     </View>
     <View style={{ marginBottom: 10 }}>
      <Text>Country:</Text>
      <TextInput
       value={country}
       onChangeText={setCountry}
       style={{ borderWidth: 1, padding: 5 }}
      />
     </View>
     <View style={{ marginBottom: 10 }}>
      <Text>Sex:</Text>
      <TextInput
       value={sex}
       onChangeText={setSex}
       style={{ borderWidth: 1, padding: 5 }}
      />
     </View>
     <View style={{ marginBottom: 10 }}>
      <Text>Age:</Text>
      <TextInput
       value={age.toString()}
       onChangeText={setAge}
       style={{ borderWidth: 1, padding: 5 }}
      />
     </View>
     {editingUserId ? (
      <Button title="Update User" onPress={handleUpdateUser} />
     ) : (
      <Button title="Add User" onPress={handleAddUser} />
     )}
    </ScrollView>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>User Table</Text>
    {loading ? <ActivityIndicator size="large" color="blue" />
     : <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item) => item.id.toString()}
     />
    }
   </View>
  </TouchableWithoutFeedback>

 );
};

export default UserTable;

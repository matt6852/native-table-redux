import {
 View,
 Text,
 Button,
 TextInput,
 ScrollView,
 Keyboard
} from 'react-native';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';

import {
 addAndSaveUser,
 updateAndSaveUser,
} from '../reducers/usersSlice';
import { useDispatch } from 'react-redux';


const UserSchema = Yup.object().shape({
 login: Yup.string().required('Login is required'),
 email: Yup.string().email('Invalid email').required('Email is required'),
});

const Form = ({ editUser, setEditingUser }) => {
 const dispatch = useDispatch();

 const [editingUserId, setEditingUserId] = useState(null);
 const [login, setLogin] = useState('');
 const [email, setEmail] = useState('');
 const [country, setCountry] = useState('');
 const [sex, setSex] = useState('');
 const [age, setAge] = useState('');
 const [loginError, setLoginError] = useState('');
 const [emailError, setEmailError] = useState('');

 useEffect(() => {
  if (editUser) {
   setEditingUserId(editUser.id);
   setLogin(editUser.login);
   setEmail(editUser.email);
   setCountry(editUser.country);
   setSex(editUser.sex);
   setAge(editUser.age);
   setLoginError('');
   setEmailError('');
  }

 }, [editUser])


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
    setEditingUser(null);
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


 return (
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
 )
}

export default Form

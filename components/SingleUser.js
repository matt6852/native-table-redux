import React from 'react'
import {
 TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
 Text,
 Pressable,
 View,
} from "native-base";
import {
 deleteAndRemoveUser,
} from '../reducers/usersSlice';

const SingleUser = ({ item, handleEditUser }) => {
 const dispatch = useDispatch();

 const handleDelete = (userId) => {
  dispatch(deleteAndRemoveUser(userId));
 };
 return (
  <Pressable style={{ marginBottom: 20, }}>
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
     <Text style={{ color: "#fff" }}>delete</Text>
    </TouchableOpacity>
   </View>
  </Pressable>
 )
}

export default SingleUser

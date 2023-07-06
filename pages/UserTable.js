import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {

  FlatList,
} from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../reducers/usersSlice';
import SortUsers from '../components/SortUsers';
import Form from '../components/Form';
import SingleUser from '../components/SingleUser';




const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user)
  };

  return (
    <TouchableWithoutFeedback >
      <View style={{ flex: 1, padding: 20 }}>
        <SortUsers />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Add User</Text>
        <Form editUser={editingUser} setEditingUser={setEditingUser} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>User Table</Text>
        {loading ? <ActivityIndicator size="large" color="blue" />
          : <FlatList
            data={users}
            renderItem={({ item }) => <SingleUser item={item} handleEditUser={handleEditUser} />}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
    </TouchableWithoutFeedback>

  );
};

export default UserTable;

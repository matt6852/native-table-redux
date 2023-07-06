import React, { useState } from 'react';
import { Select, Button, View, } from "native-base";
import { useDispatch } from 'react-redux';
import { sortUsersByField } from '../reducers/usersSlice';

const SortUsers = () => {
 const dispatch = useDispatch();
 const [selectedField, setSelectedField] = useState('');
 const [sortByDirection, setSortByDirection] = useState('asc');

 const handleSortByField = (field) => {
  if (selectedField === field) {
   const newDirection = sortByDirection === 'asc' ? 'desc' : 'asc';
   setSortByDirection(newDirection);
   dispatch(sortUsersByField({ field, direction: newDirection }));
  } else {
   setSortByDirection('asc');
   dispatch(sortUsersByField({ field, direction: 'asc' }));
  }
  setSelectedField(field);
 };

 return (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 30, gap: 20 }}>

   <Select selectedValue={selectedField} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" mt={1} onValueChange={itemValue => handleSortByField(itemValue)}>
    <Select.Item label="Select a field" value="" />
    <Select.Item label="Login" value="login" />
    <Select.Item label="Email" value="email" />
    <Select.Item label="Country" value="country" />
    <Select.Item label="Sex" value="sex" />
    <Select.Item label="Age" value="age" />
   </Select>
   <Button
    disabled={!selectedField}
    onPress={() => handleSortByField(selectedField)}>
    {`Sort ${sortByDirection === 'asc' ? 'Ascending' : 'Descending'}`}
   </Button>
  </View>
 );
};

export default SortUsers;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import UserTable from './pages/UserTable';


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>

        <StatusBar style="auto" />
        <UserTable />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

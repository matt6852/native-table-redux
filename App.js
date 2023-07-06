
import { StyleSheet, View } from 'react-native';
import { Provider, } from 'react-redux';
import store from './store';
import UserTable from './pages/UserTable';
import { NativeBaseProvider, Box } from "native-base";



export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <UserTable />
        </View>
      </NativeBaseProvider>

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

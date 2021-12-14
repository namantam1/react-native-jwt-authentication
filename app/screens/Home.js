import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useBaseApi} from '../api/hooks';
import {useAuthContext} from '../auth/hooks';
import authApi from '../api/auth';

export default function Home() {
  const {user, logoutUser} = useAuthContext();
  const usersApi = useBaseApi(authApi.users);

  // console.log(usersApi.data);
  //   console.log(usersApi.data);

  useEffect(() => {
    usersApi.request().then(response => {
      if (response && !response?.ok)
        console.log('res', response.originalError, response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user.username}</Text>
      <TouchableOpacity style={styles.button} onPress={logoutUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {usersApi.loading && <Text>Loading users...</Text>}
      <ScrollView style={styles.userContainer}>
        {usersApi.data &&
          usersApi.data.map(user => (
            <View style={styles.userCard} key={user.id}>
              <Text>id - {user.id}</Text>
              <Text>email - {user.email}</Text>
              <Text>username - {user.username}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'blue',
  },
  button: {
    backgroundColor: 'orange',
    marginTop: 10,
    padding: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
  },
  userContainer: {
    marginVertical: 10,
    backgroundColor: '#eee',
    flexDirection: 'column',
    flex: 1,
  },
  userCard: {
    borderBottomWidth: 1,
  },
});

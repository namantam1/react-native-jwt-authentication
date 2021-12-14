import {Formik} from 'formik';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { useAuthContext } from '../auth/hooks';
import authApi from "../api/auth";
import { useBaseApi } from '../api/hooks';

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export default function Login() {
    const { loginUser } = useAuthContext();
    const loginApi = useBaseApi(authApi.login)

  const handleSubmit = async data => {
    const res = await loginApi.request(data);
    if (!res.ok) {
      if (res.data?.detail) return alert(res.data.detail);

      // console.log(res);
      return alert(res?.originalError);
    }

    // console.log(res.data);
    loginUser(res.data);
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={loginSchema}
        initialValues={{username: '', password: ''}}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <Text style={styles.heading}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#bbb',
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
  error: {
    color: 'red',
  },
});

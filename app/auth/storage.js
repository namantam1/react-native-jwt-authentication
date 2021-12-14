import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const _prefix = 'appUser';

const getData = async key => {
  try {
    const res = await AsyncStorage.getItem(_prefix + key);
    return JSON.parse(res);
  } catch (error) {
    console.log('something went wrong...', error);
  }
};

const setData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(_prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log('somthing went wrong...', error);
  }
};

const setAllData = async ({access, refresh}) => {
  try {
    const user = jwtDecode(access);
    await AsyncStorage.multiSet([
      [_prefix + 'user', JSON.stringify(user)],
      [_prefix + 'access', JSON.stringify(access)],
      [_prefix + 'refresh', JSON.stringify(refresh)],
    ]);
    return user;
  } catch (error) {
    console.log('something went wrong...', error);
  }
};

const removeAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      _prefix + 'access',
      _prefix + 'refresh',
      _prefix + 'user',
    ]);
  } catch (error) {
    console.log('somthing went wrong...', error);
  }
};

export default {setAllData, setData, getData, removeAllData};

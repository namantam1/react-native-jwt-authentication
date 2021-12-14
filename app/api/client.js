import {create} from 'apisauce';
import authStorage from '../auth/storage';
import { BASE_URL } from '@env';

const REFRESH_URL = '/api/token/refresh/';

const apiClient = create({
  baseURL: BASE_URL,
  timeout: 1000 // 1 sec
});

apiClient.addAsyncRequestTransform(async request => {
  const access = await authStorage.getData('access');

  if (!access) return;
  request.headers['Authorization'] = 'Bearer ' + access;
});

apiClient.addAsyncResponseTransform(async response => {
  if (
    response.status === 401 &&
    // to prevent inifinite loop
    response.config.url !== REFRESH_URL
  ) {
    const refresh = await authStorage.getData('refresh');

    if (refresh) {
      const refreshResponse = await apiClient.post(REFRESH_URL, {refresh});

      if (refreshResponse.ok) {
        // if status ok set new token
        const access = refreshResponse.data.access;
        await authStorage.setData("access", access)

        // retry same request
        const newResponse = await apiClient.any(response.config);
        response.config = newResponse.config;
        response.data = newResponse.data;
        response.duration += newResponse.duration;
        response.headers = newResponse.headers;
        response.ok = newResponse.ok;
        response.originalError = newResponse.originalError;
        response.problem = newResponse.problem;
        response.status = newResponse.status;
        return;
      }
    }
    // if refresh is failed or refresh token not present
    // its api consumer responsibility to logout user
    response['tokenExpired'] = true;
  }
});

export default apiClient;

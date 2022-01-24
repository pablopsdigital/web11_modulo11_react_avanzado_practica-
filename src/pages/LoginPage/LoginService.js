import ApiClient, {
  removeAuthorizationHeader,
  setAuthorizationHeader
} from '../../services/ApiClient';
import CustomLocalStorageManager from '../../utils/CustomLocalStorageManager';

export const login = (credentials) => {
  return (
    ApiClient.post('/api/auth/login', credentials)
      //Save token in localStorage and default header axios
      .then(({ accessToken }) => {
        setAuthorizationHeader(accessToken);
        if (credentials.rememberme) {
          CustomLocalStorageManager.setItem('token', accessToken);
        }
        return accessToken;
      })
  );
};

export const logout = () =>
  Promise.resolve().then(() => {
    //Delete headers autentication axios and delete auth of localStorage
    removeAuthorizationHeader();
    //CustomLocalStorageManager.clear();
    CustomLocalStorageManager.removeItem('token');
  });

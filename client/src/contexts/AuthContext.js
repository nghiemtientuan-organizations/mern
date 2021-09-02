import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { LOGIN, AUTH, REGISTER } from '../utils/apis';
import { LOCAL_STORAGE_NAME_TOKEN } from '../utils/const';
import { setAuthToken } from '../utils/axiosHelper';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    loadCurrentUser();
  }, []);

  // Authenticated
  const loadCurrentUser = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME_TOKEN) || null;
    setAuthToken(token);

    try {
      const response = await axios.get(AUTH);
      if (response?.data?.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.result,
          },
        });
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_NAME_TOKEN);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(LOGIN, userForm);
      if (response?.data?.success) {
        const { accessToken } = response.data;
        localStorage.setItem(LOCAL_STORAGE_NAME_TOKEN, accessToken);

        await loadCurrentUser();

        return response.data;
      }

      return null;
    } catch (error) {
      if (error?.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(REGISTER, userForm);
      if (response?.data?.success) {
        const { accessToken } = response.data;
        localStorage.setItem(LOCAL_STORAGE_NAME_TOKEN, accessToken);

        await loadCurrentUser();

        return response.data;
      }

      return null;
    } catch (error) {
      if (error?.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME_TOKEN);
    setAuthToken(null);
    dispatch({
      type: 'SET_AUTH',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logout, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import axios from 'axios';
import { 
  USER_LOGIN,
  USER_AUTH,
  USER_LOGOUT,
} from '../types'

// USER
export const loginUser = ({email, password}) => {
  const request = axios.post('/api/users/login', {email, password})
  .then(res => res.data);

  return {
    type: USER_LOGIN,
    payload: request
  }
}

export function auth(){
  const request = axios.get('/api/users/auth')
                  .then(res => res.data);

  return {
    type: USER_AUTH,
    payload: request
  }
}

export function logoutUser(){
  const request = axios.get('/api/users/logout')
                    .then(res => {
                      return null
                    })
  return {
    type: USER_LOGOUT,
    payload: request
  }
}
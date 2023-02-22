import { User, UserInfo } from '../../types';
import ServerURL from './serverUrl';

const userAPIs = {
  postUser: async (user: UserInfo) => {
    const data = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
      },
    };
    const res = await fetch(ServerURL + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },

  updateUser: async (accessToken: string, user: User) => {
    const data = {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
      },
    };
    const res = await fetch(ServerURL + '/user', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },

  changePW: async (accessToken: string, user: User, oldPassword: string, newPassword: string) => {
    const data = {
      user: {
        _id: user._id,
        oldPassword,
        newPassword,
      },
    };
    const res = await fetch(ServerURL + '/changepw', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },

  loginUser: async (user: {email: string, password: string}) => {
    const data = {
      user: {
        email: user.email,
        password: user.password,
      },
    };
    const res = await fetch(ServerURL + '/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },

  getInitialUser: async (accessToken: string) => {
    const res = await fetch(ServerURL + '/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },
};

export default userAPIs;

const url = 'http://localhost:3001';

const userAPIs = {
  postUser: async (user) => {
    const data = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        address: user.address,
      }
    }
    const res = await fetch(url + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error));
    return res.json();
  },

  loginUser: async (user) => {
    const data = {
      user: {
        email: user.email,
        password: user.password,
      }
    }
    const res = await fetch(url + '/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error));
    return res.json();
  },

  getInitialUser: async (accessToken) => {
    const res = await fetch(url + '/user', {
      method: 'GET',
      // credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error));
    return res.json();
  },
}

export default userAPIs
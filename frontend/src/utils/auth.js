export const BASE_URL = 'https://api.myeducateproject.nomoredomainsrocks.ru';


export const registration = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email,
    })
  })
    /* .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) */
    .then(res => {if (res.ok) return res.json()})
};

export const login = (password, email, token) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      password,
      email,
    })
  })
    /* .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      if (data.token) {
        console.log(data);
        const { token } = data;
        localStorage.setItem('token', token);

        return token;
      };
    }) */
    .then(res => {if (res.ok) return res.json()})
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    //method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    }
    /* headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    } */
  })
    .then(res => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      console.log(data);
      return data})
    //.then(res => {if (res.ok) return res.json()})
} 
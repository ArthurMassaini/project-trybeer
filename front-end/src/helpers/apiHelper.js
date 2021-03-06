import { setUser, getUser } from './localStorageHelper';

const applicationType = 'application/json';

export async function fetchToken(email, password) {
  const requestTokenUrl = 'http://localhost:3001/login';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': applicationType,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();
    const { name, token, role, id } = responseJson;
    const user = {
      name,
      email,
      token,
      role,
      id,
    };
    if (token) {
      setUser(user);
      return token;
    }
    return responseJson.message;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchRegister(name, email, password, queroVender) {
  const SUCCESS = 200;
  const requestTokenUrl = 'http://localhost:3001/users';
  const request = {
    method: 'POST',
    headers: {
      'Content-type': applicationType,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      queroVender,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();

    if (responseJson.user) {
      await fetchToken(email, password);
      return SUCCESS;
    }
    return responseJson.message;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProducts() {
  const endpoint = 'http://localhost:3001/products';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function fetchOrders() {
  const endpoint = 'http://localhost:3001/sales';
  const { token } = getUser();
  const request = {
    method: 'GET',
    headers: {
      'Content-type': applicationType,
      Authorization: token,
    },
  };
  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();
    const { sales } = responseJson;

    if (sales) {
      return sales;
    }
    return responseJson.message;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOrderById(id) {
  const endpoint = `http://localhost:3001/sales/${id}`;
  const { token } = getUser();
  const request = {
    method: 'GET',
    headers: {
      'Content-type': applicationType,
      Authorization: token,
    },
  };
  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();
    const sale = responseJson;

    if (sale) {
      return sale;
    }
    return responseJson.message;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchImage(name) {
  const endpoint = `http://localhost:3001/images/${name.replace('250', '350')}`;
  const response = await fetch(endpoint);
  const data = await response.blob();
  const image = URL.createObjectURL(data);
  return image;
}

export async function fetchCreateSale(userId, totalPrice, delivery, cart) {
  const { deliveryAddress, deliveryNumber } = delivery;
  const endpoint = 'http://localhost:3001/sales';
  const request = {
    method: 'POST',
    headers: {
      'Content-type': applicationType,
      Authorization: getUser().token,
    },
    body: JSON.stringify({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    }),
  };
  try {
    const response = await fetch(endpoint, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUpdateClient(name, id, token) {
  const requestTokenUrl = `http://localhost:3001/users/${id}`;
  const request = {
    method: 'PUT',
    headers: {
      'Content-type': applicationType,
      Authorization: token,
    },
    body: JSON.stringify({
      name,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchChangeStatus(id) {
  const requestTokenUrl = `http://localhost:3001/sales/${id}`;
  const request = {
    method: 'PUT',
    headers: {
      'Content-type': applicationType,
      Authorization: getUser().token,
    },
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

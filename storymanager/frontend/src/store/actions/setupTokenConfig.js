export default function setupTokenConfig(getState) {
  const { token } = getState().auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
};



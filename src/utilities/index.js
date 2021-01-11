export const baseUrl = () => {
  return 'https://airandapi.azurewebsites.net/';
};

export const processResponse = (response) => {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
  }));
};



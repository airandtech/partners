import {NotificationManager} from 'react-notifications';
import moment from 'moment';

const ls = require('local-storage');

export const baseUrl = () => {
  return 'https://cors-anywhere.herokuapp.com/https://airandapi.azurewebsites.net/';
};

export const payStackBaseUrl = () => {
  return 'https://api.paystack.co/';
};

export const flutterwaveBaseUrl = () => {
  return 'https://cors-anywhere.herokuapp.com/https://api.flutterwave.com/';
};

export const getToken = () => {

  let sessionToken = sessionStorage.getItem('token');
  let localToken = ls.get('token');
  let token;
  if (sessionToken) {
    token = sessionToken;
  } else if (localToken) {
    token = localToken;
  }
  return token;
}

export const psToken = () => {
  return 'pk_test_c78f193a7340923195cea7b1e4108f585346e254'
}

export const fwToken = () => {
  return 'FLWSECK-891e490e3196c2de0debb041ed1eb6dd-X'
}

export const processResponse = (response) => {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then((res) => ({
    statusCode: res[0],
    data: res[1],
  }));
};


export const createNotification = (type) => {
  return () => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };
};

export const formatDate = (dateString) => {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('Do MMM YYYY HH:mm');
};

export const isActive = (dateString) => {
  var now = moment(Date.now());
  var before = moment(dateString);

  var duration = moment.duration(now.diff(before));
  var hours = Math.abs(duration.asHours());
  if(hours < 3)
    return true;
  else 
    return false;
}


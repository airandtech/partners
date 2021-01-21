import {NotificationManager} from 'react-notifications';

const ls = require('local-storage');

export const baseUrl = () => {
  return 'https://airandapi.azurewebsites.net/';
};

export const payStackBaseUrl = () => {
  return 'https://api.paystack.co/';
};

export const flutterwaveBaseUrl = () => {
  return 'https://api.flutterwave.com/';
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
  return 'FLWPUBK-a29ddac56a7570b18a41073432b4abf9-X'
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
  console.log("CREATE NOTIFICATION")
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



// export const showToast = (type, message) => {

//   let color;

//   switch (type) {
//     case "success":
//       color = "#5ba035";
//       break;
//     case "error":
//       color = "#bf441d";
//       break;
//     default:
//       color = "#3b98b5";
//       break;
//   }

//   const options = {
//     position: 'top-left',
//     style: {
//       backgroundColor: color,
//       color: '#FFF',
//       fontSize: '20px',
//       textAlign: 'center',
//     },
//     closeStyle: {
//       color: 'lightcoral',
//       fontSize: '16px',
//     },
//   }

//   const [open] = useSnackbar(options);

//   open(message);
// };


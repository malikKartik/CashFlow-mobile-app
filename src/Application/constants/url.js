<<<<<<< HEAD
let dev = true;
let url = '';
if (dev) {
  url = 'https://jsonplaceholder.typicode.com';
} else {
  url = '';
=======
let dev = false;
let url = '';
if (dev) {
  url = 'http://192.168.43.195:3001';
} else {
  url = 'https://jsonplaceholder.typicode.com';
>>>>>>> 43e9f5bb554bd41a7120d29cfe6f3529595cf3cc
}

export default url;

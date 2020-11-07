let dev = true;
let url = '';
if (dev) {
  url = 'http://192.168.1.204:3001';
} else {
  url = 'https://jsonplaceholder.typicode.com';
}

export default url;

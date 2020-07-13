const axios = require('axios');

//async version
(async() => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
})();

//promise version
axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => console.log(response.data.title))
    .catch(error => console.log(error))
    .finally(() => console.log('Axios end'));
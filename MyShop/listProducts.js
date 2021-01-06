const faker = require('faker');
const bar = ''.padEnd(22, '=')

console.log(bar);
console.log(' WELCOME TO MY SHOP! ');
console.log(bar);

for (let i = 0; i < 10; i++) {
    console.log(`${faker.commerce.productName()} - $${faker.commerce.price()}`)
}
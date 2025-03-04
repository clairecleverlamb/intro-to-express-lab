const express = require('express');
const app = express();


// #1 
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}!`);
})

// #2 Rolling the dice 

app.get('/roll/:num', (req, res) => {
    const num = parseInt(req.params.num);
    if (isNaN(num)){
        res.send("You must specify a number.")
    } else {
        const roll = Math.floor(Math.random() * (num + 1));
        res.send(`You rolled a ${roll}`)
    }
})

// #3  I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < collectibles.length) {
    const name = collectibles[index].name;
    const price = collectibles[index].price;
    res.send(`So, you want the ${name}? For ${price}, it can be yours!`)
  } else {
    res.send("This item is not yet in stock. Check back soon!");
  }
})


// #4 Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPriceQuery = req.query['min-price'];
    const maxPriceQuery = req.query['max-price'];
    const type = req.query.type;

    const minPrice = minPriceQuery ? parseFloat(minPriceQuery) : undefined;
    const maxPrice = maxPriceQuery ? parseFloat(maxPriceQuery) : undefined;
     
    let filterShoes = [];
    for (let shoe of shoes){
        let include = true;
        if (minPrice !== undefined && shoe.price < minPrice) include = false;
        if (maxPrice!== undefined && shoe.price > maxPrice) include  = false;
        if (type !== undefined && shoe.type !== type) include = false;
        if (include) {
            filterShoes.push(shoe);
        }
    }
    res.send(filterShoes);
})


app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
  });
  
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })




// // require dependencies 
// const express = require('express');
// const morgan = require('morgan');

// // create an Express app
// const app = express();

// app.use(morgan('dev'));

// // First middleware function
// app.use((req, res, next) => {
//     console.log('Middleware 1: Logging request details');
//     next(); // Pass control to the next middleware
//   });
  
//   // Second middleware function
//   app.use((req, res, next) => {
//     console.log('Middleware 2: Performing some operation');
//     next(); // Pass control to the next middleware
//   });





// // root route 
// app.get('/', (req, res) => {
//     res.send('<h1>Hello, Express</h1>'); // special send to send all the html; 
// });
// // req = request 


// app.get('/home', (req,res) => {
//     res.send('<h1>Home Page</h1>');
// });

// app.get('/hello', (req, res) => {
//     console.log(req.query);
//     const name = req.query.name;
//     const age = req.query.age;

//     res.send(`hello, ${name}! I heard you are ${age}`);
// })

// ///////////////important: order matters! Note: no more than 2 params

// app.get('/:name', (req, res) => {
//     res.send(`Hello, ${req.params.name}`);
// })

// app.get('/greet/:name', (req, res) => {
//     res.send(`Greetings, ${req.params.name}`);
// })


// app.listen(3000, () => {
//     console.log('Listening on port 3000');
// });

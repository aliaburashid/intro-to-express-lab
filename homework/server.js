const express = require('express') // loads the express code
const app = express() // creates an app (your server )

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/greetings/:username', (req, res) => {
    console.log(req)
    const user = req.params.username;

    if (user === 'Mathilda') {
        res.send(`What a delight it is to see you once more, ${user}.`);
    } else {
        res.send(`Hello there, ${user}`)
    }
})

app.get('/roll/:number', (req, res) => {
    console.log(req)
    const num = req.params.number;
    const max = parseInt(num);


    if (isNaN(max)) { //checks if its not a number
        res.send('You must specify a number.');
    } else {
        // Math.random() gives a decimal between 0 and just under 1 (like 0.473)
        // When you multiply that by a number (say 6), you get a decimal (like 2.84)
        // Math.floor() removes the decimal so you get a whole number (like 2)
        // This gives you a random number from 0 to (max - 1), that's why we use max + 1 when we want the full range including the max
        const roll = Math.floor(Math.random() * (max + 1));
        res.send(`You rolled a ${roll}.`);
    }
})

app.get('/collectibles/:index', (req, res) => {
    console.log(req)
    const index = req.params.index;
    const item = collectibles[index];

    if (!item) {
        res.send(`This item is not yet in stock. Check back soon!`);
    } else {
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
    }
})

app.get('/shoes', (req, res) => {
    let result = shoes;
    console.log(req.query)

    const min = parseInt(req.query['min']);
    const max = parseInt(req.query['max']);
    const type = req.query.type;

    if (!isNaN(min)) {
        result = result.filter(shoe => shoe.price >= min);
    }
    if (!isNaN(max)) {
        result = result.filter(shoe => shoe.price <= max);
    }

    if (type) {
        result = result.filter(shoe => shoe.type === type);
    }

    res.send(result);
})

// start the server on port 3000
app.listen(3001, () => {
    console.log('Listening on port 3001')
})
var total = 0;
var acceptedCoins = [];
var selectedFood = [];
var food = [
    { type: "cola", price: 100, quantity: 2 },
    { type: "chips", price: 50, quantity: 5 },
    { type: "candy", price: 65, quantity: 0 }
];

function chooseFood(food) {
    if (food.quantity <= 0) {
        console.log(food.type + " is SOLD OUT. Please make another selection.");
    } else {
        selectedFood.push(food);
        console.log(selectedFood[0].type + " was selected");
        console.log("There are " + food.quantity + " " + food.type + " left.");
        console.log("You chose " + food.type + " and you owe " + food.price);
        total = food.price;
    }
}

function checkSelectedFood() {
    for (i = 0; i < food.length; i++) {
        if (selectedFood[0] === food[i]) {
            console.log(selectedFood[0].type + " and " + food[i].type + " match");
            food[i].quantity = food[i].quantity - 1;
            console.log(food[i].type + " now has " + food[i].quantity);
        }
    }
}

function insertCoin(coin) {
    checkSelection();
    if (total > 0) {
        if (coin === 25 || coin === 10 || coin === 5) {
            total = total -= coin;
            acceptedCoins.push(coin);
            console.log(acceptedCoins);
            metTotal();
        } else {
            console.log("Please enter a valid coin. Here is your coin back.");
        }
    }
}

function metTotal() {
    if (total > 0) {
        console.log("You still owe: " + total);
    } else if (total < 0) {
        total = Math.abs(total);
        console.log("Thank you! Enjoy your snack! Here is your change: " + total);
        checkSelectedFood();
        selectedFood = [];
        acceptedCoins = [];
        total = 0;
    } else {
        console.log("Thank you! Enjoy your snack!");
        checkSelectedFood();
        selectedFood = [];
    }
}

function returnCoins() {
    if (acceptedCoins === []) {
        console.log("INSERT COIN");
    } else {
        console.log("Returning Coins");
        for (i = 0; i < acceptedCoins.length; i++) {
            console.log("Here is your coin back: " + acceptedCoins[i]);
        }
        selectedFood = [];
        acceptedCoins = [];
        total = 0;
        console.log("Please make a selection.");
        console.log("INSERT COIN");
    }
}

function checkSelection() {
    if (total === 0) {
        console.log("Please make a selection first. Here is your coin back.");
    }
}

chooseFood(food[2]);
chooseFood(food[1]);

insertCoin(10);
insertCoin(1);
insertCoin(5);
insertCoin(25);
insertCoin(25);

chooseFood(food[1]);
insertCoin(25);
insertCoin(10);

returnCoins();

chooseFood(food[1]);

insertCoin(5);
insertCoin(25);
insertCoin(25);
insertCoin(25);

chooseFood(food[0]);

insertCoin(10);
insertCoin(10);
insertCoin(5);
insertCoin(25);
insertCoin(25);
insertCoin(25);

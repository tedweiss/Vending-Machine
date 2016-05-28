var total = 0;
var acceptedCoins = [];
var selectedFood = [];
var food = [
    { type: "cola", price: 1.00, quantity: 2 },
    { type: "chips", price: 0.50, quantity: 5 },
    { type: "candy", price: 0.65, quantity: 0 }
];

function chooseFood(food) {
    if (food.quantity <= 0) {
        console.log(food.type + " is SOLD OUT. Please make another selection.");
    } else if (selectedFood.length <= 0 || (selectedFood.length === 1 && acceptedCoins.length <= 0)) {
        selectedFood = [];
        selectedFood.push(food);
        var foodPrice = food.price;
        foodPrice = foodPrice.toFixed(2);
        console.log(selectedFood[0].type + " was selected");
        console.log("There are " + food.quantity + " " + food.type + " left.");
        console.log("You chose " + food.type + " and you owe $" + foodPrice);
        total = food.price;
    } else {
        console.log("You've chosen " + selectedFood[0].type + ". Press Return Coins to make another selection.");
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
        if (coin === 0.25 || coin === 0.10 || coin === 0.05) {
            total = total -= coin;
            total = total.toFixed(2);
            coin = coin.toFixed(2);
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
        console.log("You still owe: $" + total);
    } else if (total < 0) {
        total = Math.abs(total);
        console.log("Thank you! Enjoy your snack! Here is your change: $" + total);
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
            var returnedCoin = acceptedCoins[i];
            returnedCoin = returnedCoin.toFixed(2);
            console.log("Here is your coin back: $" + returnedCoin);
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

insertCoin(0.10);
insertCoin(0.01);
insertCoin(0.05);
insertCoin(0.25);
insertCoin(0.25);

chooseFood(food[1]);
insertCoin(0.25);
insertCoin(0.10);

returnCoins();

chooseFood(food[1]);

insertCoin(0.05);
insertCoin(0.25);
insertCoin(0.25);
insertCoin(0.25);

chooseFood(food[0]);

insertCoin(0.10);
insertCoin(0.10);
insertCoin(0.05);
insertCoin(0.25);
insertCoin(0.25);
insertCoin(0.25);

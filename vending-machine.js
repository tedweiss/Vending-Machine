var total = 0;
var acceptedCoins = [];
var food = [
    { type: "cola", price: 100 },
    { type: "chips", price: 50 },
    { type: "candy", price: 65 }
];

function chooseFood(food) {
    console.log("You chose " + food.type + " and you owe " + food.price);
    total = food.price;
}

function insertCoin(coin) {
    if (coin === 25 || coin === 10 || coin === 5) {
        total = total -= coin;
        acceptedCoins.push(coin);
        console.log(acceptedCoins);
        metTotal();
    } else {
        console.log("Please enter a valid coin.");
    }
}

function metTotal() {
    if (total > 0) {
        console.log("You still owe: " + total);
    } else if (total < 0) {
        total = Math.abs(total);
        console.log("Here is your change: " + total);
    } else {
        console.log("Thank you! Enjoy your snack!");
    }
}

function returnCoins() {
    console.log("Returning Coins");
    for (i = 0; i < acceptedCoins.length; i++) {
        console.log("Here is your coin back: " + acceptedCoins[i]);
    }
    acceptedCoins = [];
    total = 0;
    console.log(acceptedCoins);
    console.log("Please make a selection.");
    console.log("INSERT COIN");
}

chooseFood(food[0]);

insertCoin(25);
insertCoin(10);
insertCoin(5);
insertCoin(1);
insertCoin(25);
insertCoin(25);

returnCoins();

chooseFood(food[2]);

insertCoin(5);
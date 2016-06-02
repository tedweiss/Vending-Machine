var total = 0;
var acceptedCoins = [];
var selectedFood = [];
var food = [
    { type: "cola", price: 1.00, quantity: 2 },
    { type: "chips", price: 0.50, quantity: 5 },
    { type: "water", price: 0.75, quantity: 1 },
    { type: "candy", price: 0.65, quantity: 0 }
];
var money = [
    { coin: "quarter", value: 0.25, quantity: 3 },
    { coin: "dime", value: 0.10, quantity: 7 },
    { coin: "nickel", value: 0.05, quantity: 10 },
    { coin: "penny", value: 0.01, quantity: 5 }
];

var displayMessage = document.getElementById("display-message");
var displayTotal = document.getElementById("display-total");

var quarterId = document.getElementById("quarterId");
var dimeId = document.getElementById("dimeId");
var nickelId = document.getElementById("nickelId");
var pennyId = document.getElementById("pennyId");

// Create Vending Machine 

var machine = document.getElementById("vending-machine");

function createVendingMachine() {
    for (i = 0; i < food.length; i++) {
        var element = document.createElement('div');
        element.id = "food-" + i;
        element.className = "food";
        var foodPrice = food[i].price;
        foodPrice = foodPrice.toFixed(2);
        element.innerHTML = "<p>" + food[i].type + "</p>";
        element.innerHTML += "<p>$" + foodPrice + "</p>";
        element.setAttribute("onclick", "chooseFood(food[" + i + "]);");
        machine.appendChild(element);
    }
}

createVendingMachine();

// Create Allowance

var bankContainer = document.getElementById("money-container");
var bank = document.getElementById("money");

function createAllowance() {
    var bank = document.createElement("div");
    bank.id = "money";
    bankContainer.appendChild(bank);
    for (i = 0; i < money.length; i++) {
        var element = document.createElement("div");
        element.id = "money-" + money[i].coin;
        element.className = "coin-div";
        var moneyFixed = money[i].value;
        element.innerHTML = "<p class='" + money[i].coin + "' onclick='insertCoin(" + money[i].value + ")'>$" + moneyFixed.toFixed(2) + "</p>";
        element.innerHTML += "<p id='" + money[i].coin + "Id'>" + money[i].quantity + "</p>";
        bank.appendChild(element);
    }
}

createAllowance();

// Display Allowance

var displayAllowance = document.getElementById("display-allowance");
var allowance = 0;

function calculateAllowance() {
    for (i = 0; i < money.length; i++) {
        allowance += money[i].value * money[i].quantity;
    }
    console.log(allowance.toFixed(2));
    displayAllowance.innerHTML = "<p>Amount Left</p><p>$ " + allowance.toFixed(2) + "</p>";
}

calculateAllowance();

function chooseFood(food) {
    if (food.quantity <= 0) {
        console.log(food.type + " is SOLD OUT. Please make another selection.");
        returnCoins();
        displayMessage.innerHTML = "<p>" + food.type + " is SOLD OUT. Please make another selection.</p>";
        displayTotal.innerHTML = "<p>INSERT COIN</p>";
    } else if (selectedFood.length <= 0 || (selectedFood.length === 1 && acceptedCoins <= 0)) {
        selectedFood = [];
        selectedFood.push(food);
        var foodPrice = food.price;
        foodPrice = foodPrice.toFixed(2);
        console.log(selectedFood[0].type + " was selected");
        console.log("There are " + food.quantity + " " + food.type + " left.");
        console.log("You chose " + food.type + " and you owe $" + foodPrice);
        displayMessage.innerHTML = "<p>You chose " + food.type + " and you owe:</p>";
        total = food.price;
        displayTotal.innerHTML = "<p>$ " + total.toFixed(2) + "</p>";
    } else {
        console.log("You've chosen " + selectedFood[0].type + ". Press Return Coins to make another selection.");
        displayMessage.innerHTML = "<p>You've chosen " + selectedFood[0].type + ". Press Return Coins to make another selection.</p>";
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
    if (checkCoin(coin) === true && checkSelection() === true) {
        if (coin === 0.25 || coin === 0.10 || coin === 0.05) {
            findCoin(coin);
            total = total -= coin;
            total = total.toFixed(2);
            coin = coin.toFixed(2);
            acceptedCoins.push(coin);
            console.log(acceptedCoins);
            displayTotal.innerHTML = "<p>$ " + total + "</p>";
            metTotal();
            allowance = 0;
            calculateAllowance();
        } else {
            console.log("Please enter a valid coin. Here is your coin back.");
            displayMessage.innerHTML = "<p>Please enter a valid coin. Here is your coin back.</p>";
        }
    }
}

function findCoin(coin) {
    for (i = 0; i < money.length; i++) {
        if (coin === money[i].value) {
            money[i].quantity = money[i].quantity - 1;
            console.log("coin: " + coin);
            console.log(money[i].coin + ": " + money[i].quantity);
            coinId = money[i].coin + "Id";
            var bank = document.getElementById("money");
            bank.parentNode.removeChild(bank);
            coinId.innerHTML = money[i].quantity;
            createAllowance();
        }
    }
}

var displayAllowanceMessage = document.getElementById("display-allowance-message");

function checkCoin(coin) {
    for (i = 0; i < money.length; i++) {
        if (money[i].quantity <= 0 && money[i].value === coin) {
            var displayAllowanceMessage = document.getElementById("display-allowance-message");
            displayAllowanceMessage.innerHTML = "<p>Sorry, you don't have anymore " + money[i].coin + "s.</p>";
            return false;
        }
    }
    var displayAllowanceMessage = document.getElementById("display-allowance-message");
    displayAllowanceMessage.innerHTML = "<p></p>";
    return true;
}

function metTotal() {
    if (total > 0) {
        console.log("You still owe: $" + total);
    } else if (total < 0) {
        total = Math.abs(total);
        console.log("Thank you! Enjoy your " + selectedFood[0].type + "! Here is your change: $" + total.toFixed(2));
        displayMessage.innerHTML = "<p>Thank you! Enjoy your " + selectedFood[0].type + "! Here is your change.</p>";
        displayTotal.innerHTML = "<p>INSERT COIN</p>";
        giveChange();
        updateBank();
        checkSelectedFood();
        selectedFood = [];
        acceptedCoins = [];
        total = 0;
    } else {
        console.log("Thank you! Enjoy your " + selectedFood[0].type + "!");
        displayMessage.innerHTML = "<p>Thank you! Enjoy your " + selectedFood[0].type + "!</p>";
        displayTotal.innerHTML = "<p>INSERT COIN</p>";
        checkSelectedFood();
        selectedFood = [];
        acceptedCoins = [];
        total = 0;
    }
}

function returnCoins() {
    if (acceptedCoins.length === 0) {
        console.log("INSERT COIN");
        displayMessage.innerHTML = "<p>Please make a selection.</p>";
        displayTotal.innerHTML = "<p>INSERT COIN</p>";
    } else {
        console.log("Returning Coins");
        checkReturnCoins();
        allowance = 0;
        updateBank();
        selectedFood = [];
        acceptedCoins = [];
        total = 0;
        console.log("Please make a selection.");
        displayMessage.innerHTML = "<p>Please make a selection.</p>";
        displayTotal.innerHTML = "<p>INSERT COIN</p>";
        console.log("INSERT COIN");
    }
}

function checkSelection() {
    if (selectedFood.length === 0) {
        console.log("Please make a selection first. Here is your coin back.");
        displayMessage.innerHTML = "<p>Please make a selection first. Here is your coin back.</p>";
        return false;
    }
    return true;
}

function checkReturnCoins() {
    for (j = 0; j < money.length; j++) {
        for (i = 0; i < acceptedCoins.length; i++) {
            if (money[j].value == acceptedCoins[i]) {
                console.log("Here is your coin back: $" + acceptedCoins[i]);
                money[j].quantity = money[j].quantity + 1;
            }
        }
    }
}

function giveChange() {
    for (i = 0; i < money.length; i++) {
        if (total === 0.20 && money[i].value === 0.10) {
            money[j].quantity = money[j].quantity + 2;
        } else if (total === 0.15) {
            if (money[i].value === 0.10) {
                money[i].quantity = money[i].quantity + 1;
            } else if (money[i].value === 0.05) {
                money[i].quantity = money[i].quantity + 1;
            }
        } else if (total === 0.10) {
            if (money[i].value === 0.10) {
                money[i].quantity = money[i].quantity + 1;
            }
        } else if (total === 0.05) {
            if (money[i].value === 0.05) {
                money[i].quantity = money[i].quantity + 1;
            }
        }
    }
}

function updateBank() {
    var bank = document.getElementById("money");
    bank.parentNode.removeChild(bank);
    createAllowance();
    calculateAllowance();
}

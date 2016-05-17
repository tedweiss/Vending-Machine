var total = 0;

function insertCoin(coin) {

	if(coin === 25 || coin === 10 || coin === 5){
		console.log(total += coin);
	} else {
    console.log("Please enter a valid coin. Here is your coin back.");
  }
}

insertCoin(25);
insertCoin(10);
insertCoin(5);
insertCoin(1);
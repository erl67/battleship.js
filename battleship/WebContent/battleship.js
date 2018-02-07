var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var ships = ["Aircraft Carrier", "Battleship", "Submarine"];
var userNames = ["Alice", "Bob"];
var positions = [0,0,0,0,0,0];
var scores = [0,0];

var inProgress = localStorage.getItem("GameInProgress") == null ? false : true;
var activeTurn = localStorage.getItem("activeTurn") == 2 ? 2 : 1;

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
	if (inProgress == true) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
		userNames[0] = localStorage.getItem("Player1");
		userNames[1] = localStorage.getItem("Player2");
		positions[0] = localStorage.getItem("Player1 Aircraft Carrier");
		positions[1] = localStorage.getItem("Player1 Battleship");
		positions[2] = localStorage.getItem("Player1 Submarine");
		positions[3] = localStorage.getItem("Player2 Aircraft Carrier");
		positions[4] = localStorage.getItem("Player2 Battleship");
		positions[5] = localStorage.getItem("Player2 Submarine");
		
		buildOceans();
		gameTurnReady (activeTurn);

	} else {
		document.getElementById("player1input").style.display = "block";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
	}
	
	document.cookie += userNames + "," + scores;
}


function gameTurnReady (player) {
	document.getElementsByTagName("header")[0].style.display = "none";
	document.getElementById("player1").style.display = "none";
	document.getElementById("player2").style.display = "none";
	
	if (player == 1) {
		document.getElementById("player1warn").style.display = "block";
	} else if (player == 2) {
		document.getElementById("player2warn").style.display = "block";
	}
}

function gameTurn (player) {
	console.log ("Player " + player + " attacking");
	document.getElementById("player"+player+"warn").style.display = "none";
	document.getElementById("player"+player).style.display = "block";
}

function buildOceans() {
	gameBoard('board1', 'board1', 1, 2, true);
	gameBoard('board1a', 'board1a', 1, 2, false);

	gameBoard('board2','board2', 2, 1, true);
	gameBoard('board2a','board2a', 2, 1, false);
}

function gameBoard(output, boardName, player, opponent, event) {
	
//	var hit = true; 
	
	this.name = output;
	var output = document.getElementById(output);
	
	table = document.createElement("table");
	table.setAttribute("id", boardName);

	for (i = 1; i <= boardSize; i++) {
		tableRow = document.createElement("tr");
		tableRow.setAttribute("class", player);
		
		for (j = 0; j < boardSize; j++) {
			
		    tableData = document.createElement("td");
		    var cellString = i.toString() + cols[j].toString();
		    tableData.innerHTML = cellString;
		    
			tableData.setAttribute("id", "p" + player + "_" + cellString);
			tableData.setAttribute("class", "ocean" + "_" + event);
			
			previousAttack = localStorage.getItem("p" + opponent + "_" + cellString);
			previousDefense = localStorage.getItem("p" + player + "_" + cellString);
			
			if (event == true) {
				if (previousAttack == null) {
					tableData.setAttribute("style", "cursor:pointer");
					hitBox (tableData, player, opponent);
				} else if (previousAttack == "-") {
					tableData.setAttribute("style", "background-color:#c0c0c0");
				} else if ((previousAttack == "A") || (previousAttack == "B") || (previousAttack == "S")) {
					tableData.setAttribute("style", "background-color:#dd00c0");
				}
			} else if (event == false) {
				if (previousDefense == null) {
				} else if (previousDefense == "-") {
					tableData.setAttribute("style", "background-color:#e0e0e0");
				} else if (previousDefense == "A") {
					tableData.innerHTML = previousDefense.toString();
				} else if (previousDefense == "B") {
					tableData.innerHTML = previousDefense.toString();
					Object.assign(tableData.style,{"background-color":"#FF0000", "text":"#c0c0c0"});
				} else if (previousDefense == "S") {
					tableData.innerHTML = previousDefense.toString();
					Object.assign(tableData.style,{"background-color":"#FF0000", "text":"#c0c0c0"});
				}
			}
			
		    tableRow.append(tableData);
		}
		table.append(tableRow);
	}
	output.append(table);
}

function hitBox (obj, player, opponent) {
	obj.addEventListener("click", function(e) {
		
//		localStorage.setItem(e.currentTarget.getAttribute("class").charAt(5) + " " + e.currentTarget.innerHTML, "-");
		localStorage.setItem(e.currentTarget.getAttribute("id"), "-");
		
//		var hit = localStorage.getItem(e.currentTarget.getAttribute("class")) != null ? true : false;
		
		var hit = localStorage.getItem("p" + opponent + "_" + e.currentTarget.innerHTML) != null ? true : false;
		
//		var hit = Math.random() >= 0.5;
		
		if (hit == false) { //need to get class from board name
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
			//document.getElementById("p" + opponent + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#002200");
			document.querySelectorAll("td.ocean_false#p1_1A").setAttribute("style", "background-color:#cc0000");
		} else {
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#cc0000");
			//document.getElementById("p" + opponent + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#00FF00");
		}
		
		var bda = hit == true ? "Direct Hit" : "Miss";
		
//		alert("You clicked: " + e.currentTarget.innerHTML + " on board: " + e.currentTarget.getAttribute("class") + " " + bda);
//		alert("You clicked: " + e.currentTarget.innerHTML + " on board: " + e.currentTarget.parentNode.getAttribute("class") + " " + bda);
		alert("You clicked: " + e.currentTarget.innerHTML + " on board: " + e.currentTarget.parentNode.getAttribute("class") + " " + bda);

		var old_element = document.getElementById("p" + player + "_" + e.currentTarget.innerHTML);	//remove event listener stackoverflow.com/a/9251864/7491839
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		
		activeTurn = activeTurn == 1 ? 2 : 1;
		localStorage.setItem("activeTurn", activeTurn);
		
		gameTurnReady(activeTurn);
	});
}

function regexShip(input, player) {
	var rSuccess = true;
//	var search = new RegExp("abc");
//	var search2 = new RegExp("abcde");
	
	alert("Player" + player + " input is: " + input);
	
	var inputArr = input.split(",");
	
	rSuccess = rSuccess == true ? inputArr : false;
	return rSuccess;
}

function processShips(player) {
	var success = true;

	if (player == 1) {
		var input = document.inputForm.inputShips.value;
		userNames[0] = document.inputForm.inputName.value;
		localStorage.setItem("Player1", userNames[0]);
	} else if (player == 2) {
		var input = document.inputForm2.inputShips2.value;
		userNames[1] = document.inputForm2.inputName2.value;
		localStorage.setItem("Player2", userNames[1]);
	}
		
    if (input == "" || input.length <= 5 || input.split(",").length != 3) {
		success = false;
		alert ("Not valid starting positions.");
		return false;
    } else {
    	var inputArr = regexShip (input, player);
    	if (inputArr == false) {
			success = false;
			alert ("No valid regex found.");
			return false;
    	}
		console.log("Player " + player + " success");
		
		for (var i = 0; i < inputArr.length; i++) {
    		positions[i] = inputArr[i];
			setShips(player, ships[i], inputArr[i]);
		}
    }
    
    console.log (inputArr);

	if ((player == 1) && (success == true)) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "block";
	} else if ((player == 2) && (success == true)) {
		document.getElementById("player"+player+"input").style.display = "none";
		document.getElementById("player1").style.display = "block";  // change to game method
		
		localStorage.setItem("GameInProgress", true);
		localStorage.setItem("activeTurn", activeTurn);
		
		buildOceans();
		gameTurnReady(1);
	}

	alert("Returning");
	return false;	// must stay false or form will reload
}

//function regexShip(string, player) {
//	var success = true;
//	var search = new RegExp("abc");
//	var search2 = new RegExp("abcde");
//	
//	alert("Player" + player + " input is: " + input);
//	
//	var inputArr = input.split(",");
//	
////	if (inputArr.length !== 3) {
////		alert("Not proper number of positions " + inputArr.length);
////		success = false;
////	} 
//	
//	success = success == true ? inputArr : false;
//	return success;
//}

function getShip(player, ship) {
	return localStorage.getItem("Player" + player + " " + ship);
}

function setShips(player, ship, coords) {
	return localStorage.setItem("Player" + player + " " + ship, coords);
}

function resetGame () {
	if (window.confirm("Click OK to Reset Game")) {
		localStorage.clear();
		window.reload();
	} else {
	    // do nothing
	}
	return false;
}

function gameOver () {
	localStorage.clear();
	alert ("Game Over");
}
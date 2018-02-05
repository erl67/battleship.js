/**
 * 
 */

var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var ships = ["Aircraft Carrier", "Battleship", "Submarine"];
var userNames = ["Alice", "Bob"];
var positions = [0,0,0,0,0,0];

var inProgress = localStorage.getItem("GameInProgress") == null ? false : true;
var activeTurn = localStorage.getItem("activeTurn") == 2 ? 2 : 1;

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
//	for (x in document.querySelectorAll('.initialInput')) document.querySelectorAll('.initialInput')[x].style.display = 'none';
//	x = document.querySelectorAll('.initialInput');
//	for (var i = 0; i < x.length; i++) x[i].style.display = 'none';
	// for (x in document.getElementsByClassName('initialInput')) document.getElementsByClassName('initialInput')[x].style.display = 'none';
	
	if (inProgress == true) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
		userNames[0] = localStorage.getItem("Player1");
		userNames[1] = localStorage.getItem("Player2");
		
	} else {
		document.getElementById("player1input").style.display = "block";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
	}
		
}


function gameBoard(output, boardName) {
	
	var hit = true; 
	
	this.name = output;
	var output = document.getElementById(output);
	
	table = document.createElement("table");

	for (i = 1; i <= boardSize; i++) {
		tableRow = document.createElement("tr");
		tableRow.setAttribute("id", output);
		//tableRow.setAttribute("id", boardName);
		
		for (j = 0; j < boardSize; j++) {
			
		    tableData = document.createElement("td");
		    tableData.innerHTML = i.toString() + cols[j].toString();
			tableData.setAttribute("id", i.toString() + cols[j].toString());
			tableData.setAttribute("class", boardName);
			tableData.setAttribute("style", "cursor:pointer");
			
			tableData.addEventListener("click", function(e) {
				
				var old_element = document.getElementById(e.currentTarget.innerHTML);	//remove event listener stackoverflow.com/a/9251864/7491839
				var new_element = old_element.cloneNode(true);
				old_element.parentNode.replaceChild(new_element, old_element);
				
				alert("You clicked: " + e.currentTarget.innerHTML + " on board: " + e.currentTarget.getAttribute("class"));
				
				var hit = Math.random() >= 0.5;
				
				if (hit == false) { //need to get class from board name
					document.getElementById(e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
				} else {
					document.getElementById(e.currentTarget.innerHTML).setAttribute("style", "background-color:#cc0000");
				}
				
			});

		    tableRow.append(tableData);
		}
		table.append(tableRow);
		
	}
	output.append(table);
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
		alert("Player " + player + " success?");
		
		for (var i = 0; i < inputArr.length; i++) {
    		positions[i] = inputArr[i];
			setShips(player, ships[i], inputArr[i]);
		}
    }
    
    alert (inputArr);

	if ((player == 1) && (success == true)) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "block";
	} else if ((player == 2) && (success == true)) {
		document.getElementById("player"+player+"input").style.display = "none";
		document.getElementById("player1").style.display = "block";  // change to game method
		localStorage.setItem("GameInProgress", inProgress);
		localStorage.setItem("ActiveTurn", activeTurn);
	}

	alert("Returning");
	return false;	// must stay false or form won't work
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

function gameOver () {
	localStorage.clear();
	alert ("Game Over");
}
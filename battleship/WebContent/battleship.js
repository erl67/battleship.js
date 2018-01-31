/**
 * 
 */

var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var ships = ["Aircraft Carrier", "Battleship", "Submarine"];
var userNames = ["Alice", "Bob"];
//var positions = [0,0,0,0,0,0];

//var inProgress = localStorage.getItem("GameInProgress") == null ? false : true;
var inProgress = false;

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
	
//	for (x in document.querySelectorAll('.initialInput')) document.querySelectorAll('.initialInput')[x].style.display = 'none';
//	x = document.querySelectorAll('.initialInput');
//	for (var i = 0; i < x.length; i++) x[i].style.display = 'none';
	// for (x in document.getElementsByClassName('initialInput')) document.getElementsByClassName('initialInput')[x].style.display = 'none';
	
//	if (inProgress == false) {
		
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
		document.getElementById("board1").style.display = "block";
		
//		do {
//		} while (positions[0]==0 && positions[1]==0 && positions[2]==0);
		
//	} else {
//		document.getElementById("player1input").style.display = "none";
//		document.getElementById("player2input").style.display = "none";
//	}
}


function gameBoard(output, boardName) {
	
//	board = new Array(new Array());
//	board2 = new Array();
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

//function processShips(player) {
//	var success = true;
//	
//	if (player == 1) {
//		var input = document.inputForm.inputShips.value;
//		userNames[0] = document.inputForm.inputName.value;
//		localStorage.setItem("Player1", userNames[0]);
//		
//	    if (input == "" || input.length <= 5) {
//			success = false;
//			alert ("Not valid starting positions.");
//	    } else {
//			alert("Player 1 input is: " + input);
//	    	var inputArr = input.split(",");
//	    	if (inputArr.length !== 3) {
//	    		alert("Not proper number of positions " + inputArr.length);
//	    	} 
//	    }
//		
//		if (success == true) {
//			alert("Player 1 success");
//			document.getElementById("player1input").style.display = "none";
//			document.getElementById("player2input").style.display = "block";
//			
//			for (var i = 0; i < inputArr.length; i++) {
////	    		positions[i] = inputArr[i];
////				setShips(player, ships[i], inputArr[i]);
//				alert("Player 1 setting");
//			}
//			document.getElementById("player"+player+"input").style.display = "none";
//
//		}
//	}
//
//	if (player == 2) {
//		var input = document.inputForm2.inputShips2.value;
//		userNames[1] = document.inputForm2.inputName2.value;
//		localStorage.setItem("Player2", userNames[1]);
//
//	    if (input == "" || input.length <= 5) {
//			success = false;
//			alert ("Not valid starting positions.");
//	    } else {
//			alert("Player 2 input is: " + input);
//	    	var inputArr = input.split(",");
//	    	if (inputArr.length !== 3) {
//	    		alert("Not proper number of positions " + inputArr.length);
//	    	}
//    	}
//		if (success == true) {
//			for (var i = 0; i < inputArr.length; i++) {
////	    		positions[i+3] = inputArr[i];
//				setShips(player, ships[i], inputArr[i]);
//			}
//			document.getElementById("player"+player+"input").style.display = "none";
////			document.getElementById("player1").style.display = "block";  // change to game method
//		}
//	}
//
//	alert("Returning");
//
//    return success;
//}

function processShips(player) {
	var success = true;
	
	if (player == 1) {
		var input = document.inputForm.inputShips.value;
		userNames[0] = document.inputForm.inputName.value;
		localStorage.setItem("Player1", userNames[0]);
		
	    if (input == "" || input.length <= 5) {
			success = false;
			alert ("Not valid starting positions.");
	    } else {
			alert("Player " + player + " input is: " + input);
	    	var inputArr = input.split(",");
	    	if (inputArr.length !== 3) {
	    		alert("Not proper number of positions " + inputArr.length);
	    	}
	    }
		
		if (success === true) {
			for (var i = 0; i < inputArr.length; i++) {
				setShips(player, ships[i], inputArr[i]);
			}
			
			document.getElementById("player"+player+"input").style.display = "none";
			document.getElementById("player2input").style.display = "block";
		}
		
	} else if (player == 2) {
		var input = document.inputForm2.inputShips2.value;
		userNames[1] = document.inputForm2.inputName2.value;
		localStorage.setItem("Player2", userNames[1]);

	    if (input == "" || input.length <= 5) {
			success = false;
			alert ("Not valid starting positions.");
	    } else {
			alert("Player " + player + " input is: " + input);
	    	var inputArr = input.split(",");
	    	if (inputArr.length !== 3) {
	    		alert("Not proper number of positions " + inputArr.length);
	    	}
    	}
		if (success === true) {
			for (var i = 0; i < inputArr.length; i++) {
				setShips(player, ships[i], inputArr[i]);
			}
			document.getElementById("player"+player+"input").style.display = "none";
			document.getElementById("player1").style.display = "block";
		}
	}
	

    return success;
}

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
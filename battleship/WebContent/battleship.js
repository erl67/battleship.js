/**
 * 
 */

var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
//	for (x in document.querySelectorAll('.initialInput')) document.querySelectorAll('.initialInput')[x].style.display = 'none';
//	for (x in document.getElementsByClassName('initialInput')) document.getElementsByClassName('initialInput')[x].style.display = 'none';
	
	document.getElementById("player2input").style.display = "none";
	document.getElementById("board1a").style.display = "none";
	document.getElementById("board2").style.display = "none";
	document.getElementById("board2a").style.display = "none";
}


function gameBoard(output, boardName) {
	board = new Array(new Array());
	board2 = new Array();
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

function processShips(player) {
	var success = true;
	
	if (player == 1) {
		var input = document.inputForm.inputShips.value;
		
	    if (input == "" || input.length <= 5) {
			success = false;
			alert ("Not a valid ship position")
	    } else {
			alert("Player " + player + " input is: " + input);
	    }
		

		if (success === true) {
			localStorage.setItem("Player 1 positions", input);
			
			document.getElementById("player"+player+"input").style.display = "none";
			document.getElementById("player2input").style.display = "block";
		}
		
	} else if (player == 2) {
		var input = document.inputForm.inputShips.value;

	    if (input == "" || input.length <= 5) {
			success = false;
			alert ("Not a valid ship position")
	    } else {
			alert("Player " + player + " input is: " + input);
	    }
		if (success === true) {
			localStorage.setItem("Player 2 positions", value);

			document.getElementById("player"+player+"input").style.display = "none";
		}
	}
	
	
//	if (success === true) {
//		document.getElementById("player"+player+"input").style.display = "none";
//		if (player == 1) document.getElementById("player2input").style.display = "block";
//	}

    return success;
}

function getShips(player) {
	return localStorage.getItem("Player "+player+" positions", value);
}

function setShips(player, ship, coords) {
	localStorage.setItem("Player" + player + " " + ship, coords);

	return false;
}

function gameOver () {
	localStorage.clear();
}
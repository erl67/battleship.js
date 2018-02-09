var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var ships = ["Aircraft Carrier", "Battleship", "Submarine"];
var userNames = ["Alice", "Bob"];
var strength = [543, 543];
//var positions = [0,0,0,0,0,0];
var scores = [0,0];
var ocean = ["🌊", "🏊", "🏄", "🤽", "⛵", "🐟", "🐡", "🦀", "🦈", "🐋", "🐳", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]

var inProgress = localStorage.getItem("GameInProgress") == null ? false : true;
var activeTurn = localStorage.getItem("activeTurn") == 2 ? 2 : 1;
inProgress = localStorage.getItem("GameInProgress") == null ? false : true;

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
	if (inProgress == true) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
		
		userNames[0] = localStorage.getItem("Player1");
		userNames[1] = localStorage.getItem("Player2");
		document.getElementById("player1Name").innerHTML = userNames[0];
		document.getElementById("player2Name").innerHTML = userNames[1];
		document.getElementById("player1NameB").innerHTML = userNames[0];
		document.getElementById("player2NameB").innerHTML = userNames[1];
		
//		positions[0] = localStorage.getItem("Player1 Aircraft Carrier");
//		positions[1] = localStorage.getItem("Player1 Battleship");
//		positions[2] = localStorage.getItem("Player1 Submarine");
//		positions[3] = localStorage.getItem("Player2 Aircraft Carrier");
//		positions[4] = localStorage.getItem("Player2 Battleship");
//		positions[5] = localStorage.getItem("Player2 Submarine");
		
		buildOceans();
		gameTurnReady (activeTurn);

	} else {
		document.getElementById("player1input").style.display = "block";
		document.getElementById("player2input").style.display = "none";
		document.getElementById("player1").style.display = "none";
		document.getElementById("player2").style.display = "none";
	}
	
//	document.cookie += userNames[0] + "," + scores[0] + "," + userNames[1] + "," + scores[1] + ",";
	document.cookie += userNames[0] + "," + randO() + "," + userNames[1] + "," + randO() + ",";
}


function gameTurnReady (player) {
    window.scrollTo(0, 0);

	document.getElementsByTagName("header")[0].style.display = "none";
	document.getElementById("player1").style.display = "none";
	document.getElementById("player2").style.display = "none";
	
	if (player == 1) {
		document.getElementById("player1warn").style.display = "flex";
	} else if (player == 2) {
		document.getElementById("player2warn").style.display = "flex";
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
			
			previousAttack = localStorage.getItem("p" + player + "_" + cellString);
			previousDefense = localStorage.getItem("p" + opponent + "_" + cellString);
			
			if (event == true) {
				if (previousAttack == null) {
					tableData.setAttribute("style", "cursor:pointer");
					hitBox (tableData, player, opponent);
				} else if (previousAttack == "-") {
					tableData.setAttribute("style", "background-color:#c0c0c0"); 
					Object.assign(tableData,{innerHTML: randO()});
				} else if ((previousAttack == "A") || (previousAttack == "B") || (previousAttack == "S")) {
					tableData.setAttribute("style", "background-color:#dd00c0");
					Object.assign(tableData,{innerHTML: "???"});
				} else if (previousAttack.indexOf('❌') > -1) {
					Object.assign(tableData.style,{"background-color":"#FF0010"});
					Object.assign(tableData,{innerHTML: "❌"});
				}
			} else if (event == false) {
				if (previousDefense == null) {
					//do nothing
				} else if (previousDefense == "-") {
					tableData.setAttribute("style", "background-color:#a0c0c0");
					tableData.innerHTML = randO();
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
		
		var hit = localStorage.getItem(e.currentTarget.getAttribute("id")) != null ? localStorage.getItem(e.currentTarget.getAttribute("id")) : false;
		//hit = Math.random() >= 0.5;
		
		var bda = hit == true ? "Direct Hit" : "Miss";
		alert("You clicked: " + e.currentTarget.innerHTML + " on board: " + e.currentTarget.parentNode.getAttribute("class") + " " + bda);
		
		if (hit != false) {
			localStorage.setItem(e.currentTarget.getAttribute("id"), localStorage.getItem(e.currentTarget.getAttribute("id")) + "❌");
			var hitType = hit.charAt(0);
			if (hitType == "A") {
				
			} else if (hitType == "B") {
				
			} 
			else if (hitType == "S") {
				
			}
		} else {
			localStorage.setItem(e.currentTarget.getAttribute("id"), "-");
		}

		if (hit == false) {
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).innerHTML = " ";
			e.currentTarget.innerHTML = randO();
		} else {
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#cc0000");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).setAttribute("style", "background-color:#FF0010");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).innerHTML = "❌";
		}
		
		var old_element = e.currentTarget;	//remove event listener stackoverflow.com/a/9251864/7491839
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		
		activeTurn = activeTurn == 1 ? 2 : 1;
		localStorage.setItem("activeTurn", activeTurn);
		
		gameTurnReady(activeTurn);
	});
}

function regexShip(input, player) {
	var rSuccess = true;
	var aSearch = new RegExp("/[a]:[A-K](10|[0-9])-[A-K](10|[0-9])/gmi");
	var bSearch = new RegExp("/[b]:[A-K](10|[0-9])-[A-K](10|[0-9])/gmi");
	var aSearch = new RegExp("/[s]:[A-K](10|[0-9])-[A-K](10|[0-9])/gmi");
//	var search = new RegExp("abc");
//	var search2 = new RegExp("abcde");
	
	alert("Player" + player + " input is: " + input);
	
	var inputArr = input.split(",");
	
	rSuccess = rSuccess == true ? inputArr : false;
//	return rSuccess;
	return false;
}

function processShips(player) {
	var success = true;

	if (player == 1) {
		var input = document.inputForm.inputShips.value;
		userNames[0] = document.inputForm.inputName.value != null ? document.inputForm.inputName.value : "Alice";
		localStorage.setItem("Player1", userNames[0]);
	} else if (player == 2) {
		var input = document.inputForm2.inputShips2.value;
		userNames[1] = document.inputForm2.inputName2.value != null ? document.inputForm2.inputName2.value : "Bob";
		localStorage.setItem("Player2", userNames[1]);
	}
		
    if (input == "" || input.length <= 5 || input.split(",").length != 3) {
		success = false;
		alert ("Not valid starting positions.");
		return false;
    } else {
//    	var inputArr = regexShip (input, player);
    	var inputArr = true;
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
		
	    window.scrollTo(0, 0); //reload to update names using inProgress
		location.reload();
		
		//buildOceans();
		//gameTurnReady(1);
	}

	return false;	// must stay false or form will reload
}

function getShip(player, ship) {
	return localStorage.getItem("Player" + player + " " + ship);
}

function setShips(player, ship, coords) {
	return localStorage.setItem("Player" + player + " " + ship, coords);
}

function resetGame () {
	if (window.confirm("Click OK to Reset Game")) {
		localStorage.clear();
	    window.scrollTo(0, 0);
		location.reload();
	} else {
	    // do nothing
	}
	return false;
}

function viewScores(output) {
	if (document.getElementById("noise").innerHTML.length > 5){ break;};

	var scores = document.cookie;
	scores = scores.split(",");
	score = scores.splice(-1,1);
	
	table = document.createElement("table");
	table.setAttribute("id", "score board");

	for (i=0; i < scores.length; i+=4) {
		tableRow = document.createElement("tr");

		console.log(scores[i] + " " + scores[i+1] + " " + scores[i+2] + " " + scores[i+3]);
		for (j=0; j < 4; j++) {
			tableData = document.createElement("td");
		    tableData.innerHTML = scores[i+j];
		    tableRow.append(tableData);
		}
	table.append(tableRow);
	}
	
	var button = document.createElement("button");
	button.setAttribut("id", "btnScores");
	button.innerHTML = "Return to Game";
	button.addEventListener ("click", function() {
		document.getElementById("noise").style.display = "none";
		document.getElementById("noise").innerHTML = "";
	    window.scrollTo(0, 0);
		location.reload();
	});
	
	document.getElementById(output).append(button);
	document.getElementById(output).append(table);
	
	document.getElementById("player1input").style.display = "none";
	document.getElementById("player2input").style.display = "none";
	document.getElementById("player1").style.display = "none";
	document.getElementById("player2").style.display = "none";
	document.getElementById("noise").style.display = "none";
	
	document.getElementById(output).style.display = "block";
}

function gameOver () {
	localStorage.clear();
	alert ("Game Over");
}

function randO () {
	return ocean[Math.floor(Math.random()*ocean.length)];
}
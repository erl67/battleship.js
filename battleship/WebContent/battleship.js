var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var inputArr;
var ships = ["Aircraft Carrier", "Battleship", "Submarine"];
var shipTypes = ["A", "B", "S"];
var userNames = ["Alice", "Bob"];
var scores = [0,0];
var health = [5,4,3,5,4,3];

var inProgress = localStorage.getItem("GameInProgress") == null ? false : true;
var activeTurn = localStorage.getItem("activeTurn") == 2 ? 2 : 1;

health = JSON.parse(localStorage.getItem("health")) == null ? health : JSON.parse(localStorage.getItem("health"));
userNames[0] = localStorage.getItem("Player1") == null ? "Player 1" : localStorage.getItem("Player1");
userNames[1] = localStorage.getItem("Player2") == null ? "Player 2" : localStorage.getItem("Player2");

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
	
	if (inProgress == true) {
		blankScreen();
		health = localStorage.getItem("health") == null ? health : JSON.parse(localStorage.getItem("health"));

		document.getElementById("player1Name").innerHTML = userNames[0];
		document.getElementById("player2Name").innerHTML = userNames[1];
		document.getElementById("player1NameB").innerHTML = userNames[0];
		document.getElementById("player2NameB").innerHTML = userNames[1];
		document.getElementById("player1NameC").innerHTML = userNames[0];
		document.getElementById("player2NameC").innerHTML = userNames[1];

		updateScores();
		buildOceans();
		gameTurnReady (activeTurn);

	} else {
		blankScreen();
		document.getElementsByTagName("header")[0].style.display = "block";
		document.getElementsByTagName("footer")[0].style.display = "block";
		document.getElementById("player1input").style.display = "block";
	}
	
}

function gameTurnReady (player) {
    window.scrollTo(0, 0);
    blankScreen();
	document.getElementsByTagName("footer")[0].style.display = "block";
	
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
	document.getElementById("scores").style.display = "block";
	document.getElementsByTagName("footer")[0].style.display = "block";
}

function buildOceans() {
	gameBoard('board1', 'board1', 1, 2, true);
	gameBoard('board1a', 'board1a', 1, 2, false);
	gameBoard('board2','board2', 2, 1, true);
	gameBoard('board2a','board2a', 2, 1, false);
}

function gameBoard(output, boardName, player, opponent, event) {
	
	var output = document.getElementById(output);
	
	table = document.createElement("table");
	table.setAttribute("id", boardName);
	caption = document.createElement("caption");
	caption.innerHTML = event == true ? "<b>Enemy</b>" : "<b>Friendly</b>";
	this.name = event == true ? table.setAttribute("class", "enemy") : table.setAttribute("class", "friendly");
	table.appendChild(caption);

	for (i = 1; i <= boardSize; i++) {
		tableRow = document.createElement("tr");
		tableRow.setAttribute("class", player);
		
		for (j = 0; j < boardSize; j++) {
			
		    tableData = document.createElement("td");
		    var cellString = cols[j].toString() + i.toString();
		    tableData.innerHTML = cellString;
		    
			tableData.setAttribute("id", "p" + player + "_" + cellString);
			tableData.setAttribute("class", "ocean" + "_" + event);
			
			previousAttack = localStorage.getItem("p" + player + "_" + cellString);
			previousDefense = localStorage.getItem("p" + opponent + "_" + cellString);
			
			shipAttack = localStorage.getItem(opponent+"z"+cellString) != null ? localStorage.getItem(opponent+"z"+cellString).substring(1,2) : null;
			shipDefend = localStorage.getItem(player+"z"+cellString) != null ? localStorage.getItem(player+"z"+cellString).substring(1,2) : null;
			
			if (event == true) {
				if (previousAttack == null) {
					tableData.classList.add("open");
					hitBox (tableData, player, opponent);
				} else if (previousAttack == "-") {
					tableData.classList.add("miss");
					Object.assign(tableData,{innerHTML: randO()});
				} else if (shipAttack != null) {
					//tableData.innerHTML = shipAttack;
					tableData.classList.add("hit");
					Object.assign(tableData,{innerHTML: "❌"});
				} else if (previousAttack.indexOf('❌') > -1) {
					tableData.classList.add("hit");
					Object.assign(tableData,{innerHTML: "❌❌❌"});
				}
			} else if (event == false) {
				if (previousDefense == null) {
					if (shipDefend != null) {
						tableData.innerHTML = shipDefend;
						tableData.classList.add("ship");
					}
				} else if (previousDefense == "-") {
					tableData.classList.add("miss");
					tableData.innerHTML = randO();
				} else if (previousDefense.indexOf('❌') > -1) {
					tableData.classList.add("hit");
					tableData.innerHTML = previousDefense.toString();
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
		
		//hit = Math.random() >= 0.5;
		
		var hit = localStorage.getItem(opponent+"z"+e.currentTarget.innerHTML) != null ? localStorage.getItem(opponent+"z"+e.currentTarget.innerHTML) : null;
		var bda = hit != null ? "Direct Hit" : "Miss";
		
		alert("You attacked: " + e.currentTarget.innerHTML + "\n\nBDA as follows: " + bda);
		
		if (hit != null) {
			localStorage.setItem(e.currentTarget.getAttribute("id"), "❌");
			var hitType = hit.substring(1).charAt(0);
			
			if (hitType == "A") {
				health[3 * (opponent-1) + 0] = health[3 * (opponent-1) + 0] - 1;
				if (health[3 * (opponent-1) + 0]==0) alert ("You sank " + userNames[opponent-1] + "'s Aircraft Carrier");
			} else if (hitType == "B") {
				health[3 * (opponent-1) + 1] = health[3 * (opponent-1) + 1] - 1;
				if (health[3 * (opponent-1) + 1]==0) alert ("You sank " + userNames[opponent-1] + "'s Battleship");
			} 
			else if (hitType == "S") {
				health[3 * (opponent-1) + 2] = health[3 * (opponent-1) + 2] - 1;
				if (health[3 * (opponent-1) + 2]==0) alert ("You sank " + userNames[opponent-1] + "'s Submarine");
			}
			
			updateScores();
			if (document.getElementById("player2Score").innerHTML == 24 || document.getElementById("player1Score").innerHTML == 24) gameOver();
			
		} else {
			localStorage.setItem(e.currentTarget.getAttribute("id"), "-");
		}

		if (hit == null) {
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).classList.add("miss");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).classList.add("miss");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).innerHTML = " ";
			e.currentTarget.innerHTML = randO();
		} else {
			document.getElementById("p" + player + "_" + e.currentTarget.innerHTML).classList.add("hit");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).classList.add("hit");
			document.querySelector("td.ocean_false#p" + opponent + "_" + e.currentTarget.innerHTML).innerHTML = "❌";
			e.currentTarget.innerHTML = "❌";
		}
		
		var old_element = e.currentTarget;	//remove event listener stackoverflow.com/a/9251864/7491839
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		
		activeTurn = activeTurn == 1 ? 2 : 1;
		localStorage.setItem("activeTurn", activeTurn);
		
		gameTurnReady(activeTurn);
	});
}

function regexShip(inputArr, input, player) {
	var rSuccess = true;
	var matched;
	var searches = [0,0,0];
	inputArr = [];

	searches[0] = /([A]:?\(?[A-K](10|[0-9])-?[A-K](10|[0-9])\)?)/gmi;
	searches[1] = /([B]:?\(?[A-K](10|[0-9])-?[A-K](10|[0-9])\)?)/gmi;
	searches[2] = /([S]:?\(?[A-K](10|[0-9])-?[A-K](10|[0-9])\)?)/gmi;
	var startPosition = /([A-K](10|[0-9]))/mi;
	var endPosition = /(?<=\-)([A-K](10|[0-9]))/mi;
	
	for (x=0; x<shipTypes.length; x++) {
		y = input.match(searches[x]);
		if (y != null) {
			inputArr[x] = y;
			console.log(inputArr);
		} else {
			rSuccess = false;
			return false;
		}
	}
	
	alert("Player" + player + " input is: " + inputArr);
	
	for (x=0; x < shipTypes.length; x++) {
		shipType = shipTypes[x];
		
		if (shipType == "A") {  //could optimize this
			
			grids = calculateGrid(startPosition.exec(inputArr[x])[0], endPosition.exec(inputArr[x])[0]);
			
			startGrid = grids[0];
			endGrid = grids[1];
			h = grids[2];
			hi = grids[3];
			v = grids[4];

			for (i = 0; i < 5; i++) {
				value = (orientation == 0 ) ? h + (v+i) : cols[hi+i]+v; 
				if (localStorage.getItem(player + "z" + value) != null) {localStorage.clear(); return false;};
				localStorage.setItem(player + "z" + value, player + "A" + (i+1));
			}
		} else if (shipType == "B") {
			
			grids = calculateGrid(startPosition.exec(inputArr[x])[0], endPosition.exec(inputArr[x])[0]);
			
			startGrid = grids[0];
			endGrid = grids[1];
			h = grids[2];
			hi = grids[3];
			v = grids[4];

			for (i = 0; i < 4; i++) {
				value = (orientation == 0 ) ? h + (v+i) : cols[hi+i]+v; 
				if (localStorage.getItem(player + "z" + value) != null) {localStorage.clear(); return false;};
				localStorage.setItem(player + "z" + value, player + "B" + (i+1));
			}
		} else if (shipType == "S") {
			
			grids = calculateGrid(startPosition.exec(inputArr[x])[0], endPosition.exec(inputArr[x])[0]);
			
			startGrid = grids[0];
			endGrid = grids[1];
			h = grids[2];
			hi = grids[3];
			v = grids[4];

			for (i = 0; i < 3; i++) {
				value = (orientation == 0 ) ? h + (v+i) : cols[hi+i]+v; 
				if (localStorage.getItem(player + "z" + value) != null) {localStorage.clear(); return false;};
				localStorage.setItem(player + "z" + value, player + "S" + (i+1));
			}
		}
	}
}

function calculateGrid(startGrid, endGrid) {
	//alert (startGrid + " - " + endGrid);

	orientation = startGrid.charAt(0) == endGrid.charAt(0) ? 0 : 1;
	
	if (orientation == 0) {
		if (parseInt(startGrid.substring(1)) > parseInt(endGrid.substring(1))){
			swap = startGrid;
			startGrid = endGrid;
			endGrid = swap;
		}
	} else {
		if (cols.indexOf(startGrid.charAt(0)) > cols.indexOf(endGrid.charAt(0))){
			swap = startGrid;
			startGrid = endGrid;
			endGrid = swap;
		}
	}
	h = startGrid.charAt(0);
	hi = cols.indexOf(startGrid.charAt(0));
	v = parseInt(startGrid.substring(1));
	
	//alert ("v:" + v + " h:" + h + " o:" + orientation + " cols:" + hi);
	
	return [startGrid, endGrid, h, hi, v];
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
	
	if (input.indexOf(',') > -1) inputArr = input.split(",");
	if (input.indexOf(';') > -1) inputArr = input.split(";");

    if (input == "" || input.length <= 5 || inputArr.length != 3) {
		success = false;
		alert ("Not valid starting positions.");
		return false;
    } else {
    	
    	var regex = regexShip (inputArr, input, player);
    	
    	if (regex == false) {
    		success = false;
			alert ("No valid regex found.");
		    //window.scrollTo(0, 0);
			//location.reload();
    	}
		console.log("Player " + player + " success " + regex);
    }
    
    console.log (inputArr);

	if ((player == 1) && (success == true)) {
		document.getElementById("player1input").style.display = "none";
		document.getElementById("player2input").style.display = "block";
	} else if ((player == 2) && (success == true)) {
		blankScreen();
		
		localStorage.setItem("GameInProgress", true);
		localStorage.setItem("activeTurn", activeTurn);

	    window.scrollTo(0, 0); //reload to update names using inProgress
		location.reload();
	}

	return false;	// must stay false or form will reload
}

function viewScores(output) {
    window.scrollTo(0, 0);

	var scores = document.cookie;
	scores = scores.split(",");
	score = scores.splice(-1,1); //remove last comma
	
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
	button.setAttribute("id", "btnScores");
	button.innerHTML = "Return to Game";
	button.addEventListener ("click", function() {
		document.getElementById(output).style.display = "none";
		document.getElementById(output).innerHTML = "";
	    window.scrollTo(0, 0);
		location.reload();
	});
	
	document.getElementById(output).append(button);
	document.getElementById(output).append(table);
	
	blankScreen();
	document.getElementById(output).style.display = "block";
}

function blankScreen(){
	document.getElementById("player1input").style.display = "none";
	document.getElementById("player2input").style.display = "none";
	document.getElementById("player1warn").style.display = "none";
	document.getElementById("player2warn").style.display = "none";
	document.getElementById("player1").style.display = "none";
	document.getElementById("player2").style.display = "none";
	document.getElementById("scores").style.display = "none";
	document.getElementById("highScores").style.display = "none";
	document.getElementsByTagName("header")[0].style.display = "none";
	document.getElementsByTagName("footer")[0].style.display = "none";
}

function gameOver () { //not the best way to handle scores
	blankScreen();
	
	var x = document.getElementById("player1Score").innerHTML;
	var y = document.getElementById("player2Score").innerHTML;
	
	var winner = x > y ? userNames[0] : userNames[1];
	
	document.getElementById("gameOver").innerHTML = "Game Over</br>The winner is: " + winner;
	document.cookie += userNames[0] + "," + x + "," + userNames[1] + "," + y + ",";
	
	document.getElementsByTagName("header")[0].style.display = "block";
	document.getElementsByTagName("footer")[0].style.display = "block";
	document.getElementById("gameOver").style.display = "block";

	alert ("Game Over.\n\nThe winner is " + winner);
	resetGame();
}

function resetGame () {
	if (window.confirm("Click OK to Reset Game")) {
		localStorage.clear();
	    window.scrollTo(0, 0);
		location.reload();
	} 
	return false;
}

function updateScores(){
	document.getElementById("player2Score").innerHTML = 24 - 2 * (health[0] + health[1] + health[2]);
	document.getElementById("player1Score").innerHTML = 24 - 2 * (health[3] + health[4] + health[5]);
	localStorage.setItem("health", JSON.stringify(health));
	document.getElementById("scores").style.display = "block";
}

var ocean = ["🌊", "🏊", "🏄", "🤽", "⛵", "🐟", "🐡", "🦀", "🦈", "🐋", "🐳", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
function randO () {
	return ocean[Math.floor(Math.random()*ocean.length)];
}
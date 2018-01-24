/**
 * 
 */

var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

function intro(obj) {
	document.getElementById(obj).append("Welcome to " + gameName);
}


function gameBoard(output) {
	board = new Array(new Array());
	board2 = new Array();
	var hit = true; 
	
	var output = document.getElementById(output);
	
	table = document.createElement("table");

	for (i = 1; i <= boardSize; i++) {
		tableRow = document.createElement("tr");
		
		for (j = 0; j < boardSize; j++) {
//		    board[i][j] = board.push(i,j);
//		    output.append(board[i][j]);
//		    output.append(i + cols[j]);
//			board2.push(i.toString + cols[j].toString);
			
		    tableData = document.createElement("td");
		    tableData.innerHTML = i.toString() + cols[j].toString();
			tableData.setAttribute("id", i.toString() + cols[j].toString());
			
			tableData.setAttribute("style", "cursor:pointer");
			tableData.addEventListener("click", function(e) {
				
				var old_element = document.getElementById(e.currentTarget.innerHTML);	//remove event listener stackoverflow.com/a/9251864/7491839
				var new_element = old_element.cloneNode(true);
				old_element.parentNode.replaceChild(new_element, old_element);
				
				alert("You clicked: " + e.currentTarget.innerHTML);
				
				var hit = Math.random() >= 0.5;
				
				if (hit == false) {
					document.getElementById(e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
				} else {
					document.getElementById(e.currentTarget.innerHTML).setAttribute("style", "background-color:#cc0000");
				}
				
			})

		    tableRow.append(tableData);
		}
		table.append(tableRow);
		
	}
	output.append(table);
	
	for (space in board2) {
		document.write(space);
	}
	
	
}
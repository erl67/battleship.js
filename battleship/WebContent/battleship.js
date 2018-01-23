/**
 * 
 */

var gameName = "Battleship";
var boardSize = 10;
var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

function intro(obj) {
	document.getElementsByTagName(obj)[0].append("Welcome to " + gameName);
}


function gameBoard(output) {
	board = new Array(new Array());
	board2 = new Array();
	
	var output = document.getElementById(output);
	
	table = document.createElement("table");

	for (i = 1; i <= boardSize; i++) {
		tableRow = document.createElement("tr");
		
		for (j = 0; j < boardSize; j++) {
//		    board[i][j] = board.push(i,j);
//		    output.append(board[i][j]);
			
//		    output.append(i + cols[j]);
//		    output.append("  ");
//			board2.push(i.toString + cols[j].toString);
			
		    tableData = document.createElement("td");
		    tableData.innerHTML = i.toString() + cols[j].toString();
		    tableRow.append(tableData);
		}
		table.append(tableRow);
		
//		output.append(document.createElement("br"));
	}
	output.append(table);
	
	for (space in board2) {
		document.write(space);
	}
	
	
}
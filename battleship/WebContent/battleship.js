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
	
	var output = document.getElementById(output);

	for (i = 1; i <= boardSize; i++) {
		for (j = 0; j < boardSize; j++) {
//		    board[i][j] = board.push(i,j);
//		    output.append(board[i][j]);
		    output.append(i + cols[j]);
		    output.append("  ");
		}
		output.append(document.createElement("br"));
	}
	
}
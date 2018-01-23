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
			tableData.setAttribute("id", i.toString() + cols[j].toString());
			
			tableData.setAttribute("style", "cursor:pointer");
			tableData.addEventListener("click", function(e) {
				alert("You clicked: " + e.currentTarget.innerHTML);
				document.getElementById(e.currentTarget.innerHTML).setAttribute("style", "background-color:#c0c0c0");
				document.getElementById(e.currentTarget.innerHTML).removeEventListener("click");

				//e.setAttribute("style", "background-color:#c0c0c0");
			})

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
// Entrance and exit color
// Solver

window.addEventListener('load', function() {
	var gridSize = [500, 500];
	var cellSize = [50, 50];
	var colour = ['#FFFFFF', '#000000']; // path/background
	var exit = [0, 0];
	var canvas = document.getElementById('grid');
	var grid = canvas.getContext('2d');
	
	var cells = {};
	var path = [];
	var curruntCell = exit;
	
	function setup() {
		// Formtas the canvas and creates empty cells
		canvas.width = gridSize[0];
		canvas.height = gridSize[1];
		
		grid.fillStyle = colour[2];
		grid.fillRect(0, 0, gridSize[0], gridSize[1]);
	
		for (var x = 0; x < gridSize[0]/cellSize[0]; x++) {
			for (var y = 0; y < gridSize[1]/cellSize[1]; y++) { 
				cells[[x, y]] = 0;
			}				
		}
		cells[exit] = 1;
		path.push(exit);
	}
	
	function neighbours(x, y) {
		// Returns array of unvisted neighbours
		var check = [[0, -1], [-1, 0], [1, 0], [0, 1]];
		var n = [];
		for (var i = 0; i < check.length; i++) {
			var nx = x + check[i][0];
			var ny = y + check[i][1];
			
			if (nx > gridSize[0]/cellSize[0] - 1 || nx < 0 || ny > gridSize[1]/cellSize[1] - 1 || ny < 0) {	// Off grid so ignore
				continue;
			}
			if (cells[[nx, ny]] == 0) {
				n.push([nx, ny]);
			}
		}
		return n
	}
	
	function draw() {
		// Draws all cells
		grid.strokeStyle = colour[0];
		grid.lineWidth  = cellSize[0] - 2;
		grid.lineCap = 'square';
		grid.beginPath();		
		
		while (path.length > 0) {
			n = neighbours(curruntCell[0], curruntCell[1]);
			if (n.length > 0) {
				grid.moveTo(curruntCell[0] * cellSize[1] + cellSize[0]/2, curruntCell[1] * cellSize[1] + cellSize[1]/2);
				
				curruntCell = n[Math.floor(Math.random() * n.length)]; // pick a random neighbour
				cells[curruntCell] = 1;
				path.push(curruntCell);
				
				grid.lineTo(curruntCell[0] * cellSize[1] + cellSize[0]/2, curruntCell[1] * cellSize[1] + cellSize[1]/2);
			} 
			else {
				curruntCell = path.pop();
			}
		}
		grid.stroke();
		grid.closePath();
		
	}
	
	setup();
	draw();
}, false);
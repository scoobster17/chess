var chessBoard = {
	'A': [
		{
			currentPiece: 'Black Rook',
			blackValidNextMove: true,
			whiteValidNextMove: false
		},
		{
			currentPiece: 'Black Knight'
		}
	],
	'B': [
		{
			currentPiece: 'Black Pawn',
			blackValidNextMove: true,
			whiteValidNextMove: false
		},
		{
			currentPiece: 'Black Pawn'
		}
	],
}
var renderBoard = function(whiteMove) {
	if (whiteMove) {
		// render board for white
	} else {
		// render board for black
	}
}
window.addEventListener('load', () => {
  return new ChessGame();
});

class ChessGame {

  defaultPieces: {
    teams: Array<'white' | 'black'>;
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    positions: {
      row: 'front' | 'back';
      column: 'outside-left' | 'outside-but-1-left' | 'inside-but-1-left' | 'inside-left' | 'inside-right' | 'inside-but-1-right' | 'outside-but-1-right' | 'outside-right';
    }[];
  }[] = [
    {
      teams: ['white', 'black'],
      type: 'pawn',
      positions: [
        {
          row: 'front',
          column: 'outside-left',
        },
        {
          row: 'front',
          column: 'outside-but-1-left',
        },
        {
          row: 'front',
          column: 'inside-but-1-left',
        },
        {
          row: 'front',
          column: 'inside-left',
        },
        {
          row: 'front',
          column: 'inside-right',
        },
        {
          row: 'front',
          column: 'inside-but-1-right',
        },
        {
          row: 'front',
          column: 'outside-but-1-right',
        },
        {
          row: 'front',
          column: 'outside-right',
        },
      ],
    },
    {
      teams: ['white', 'black'],
      type: 'rook',
      positions: [
        {
          row: 'back',
          column: 'outside-left',
        },
        {
          row: 'back',
          column: 'outside-right',
        },
      ],
    },
    {
      teams: ['white', 'black'],
      type: 'knight',
      positions: [
        {
          row: 'back',
          column: 'outside-but-1-left',
        },
        {
          row: 'back',
          column: 'outside-but-1-right',
        },
      ],
    },
    {
      teams: ['white', 'black'],
      type: 'bishop',
      positions: [
        {
          row: 'back',
          column: 'inside-but-1-left',
        },
        {
          row: 'back',
          column: 'inside-but-1-right',
        },
      ],
    },
    {
      teams: ['white', 'black'],
      type: 'queen',
      positions: [
        {
          row: 'back',
          column: 'inside-left',
        },
      ],
    },
    {
      teams: ['white', 'black'],
      type: 'king',
      positions: [
        {
          row: 'back',
          column: 'inside-right',
        },
      ],
    },
  ];

  constructor() {
    this.placePieces();
  }

  placePieces() {
    ['white', 'black'].forEach((team: 'white' | 'black') => {
      const piecesToPlace = this.defaultPieces.filter(piece => piece.teams.indexOf(team) !== -1);
      piecesToPlace.forEach(piece => {
        piece.positions.forEach(position => {
          this.placePiece(team, piece.type, position.row, position.column);
        });
      });
    });
  };

  placePiece(team, type, row, column) {
    const tile = document.querySelector(`tr[data-row="${ this.mapRow(team, row) }"] td[data-col="${ this.mapColumn(column) }"]`);
    if (tile) {
      tile.innerHTML = `${ team[0].toUpperCase() }${ team.slice(1) } ${ type[0].toUpperCase() }${ type.slice(1) }`;
      tile.classList.add(`${team}-piece`, `${type}-type-piece`);
      tile.setAttribute('data-piece', type);
    }
    tile.addEventListener('click', this.suggestMoves);
  };

  mapRow(team, row) {
    // assuming normal mapping
    enum mapping {
      'black back' = 8,
      'black front' = 7,
      'white front' = 2,
      'white back' = 1,
    }
    return mapping[`${ team } ${ row }`];
  }

  mapColumn(column) {
    // assuming normal mapping
    enum mapping {
      'outside-left' = 'A',
      'outside-but-1-left' = 'B',
      'inside-but-1-left' = 'C',
      'inside-left' = 'D',
      'inside-right' = 'E',
      'inside-but-1-right' = 'F',
      'outside-but-1-right' = 'G',
      'outside-right' = 'H',
    }
    return mapping[column];
  }

  suggestMoves(event) {
    const currentTile = event.target;
    const currentTilePosition = `${currentTile.getAttribute('data-col')}${currentTile.parentElement.getAttribute('data-row')}`;
    let directions: { direction: string, limit?: number }[] = [];

    switch(currentTile.getAttribute('data-piece')) {
      case 'pawn':
        directions = [{ direction: 'forward', limit: 2 }];
        break;

      case 'rook':
        directions = [{ direction: 'horizontal' }, { direction: 'vertical'}];
        break;

      // case 'knight':
      //   directions = [{ direction: 'horizontal' }, { direction: 'vertical'}];
      //   break;

      case 'bishop':
        directions = [{ direction: 'diagonal' }];
        break;

      case 'queen':
        directions = [
          { direction: 'diagonal' },
          { direction: 'horizontal' },
          { direction: 'vertical' }
        ];
        break;

      case 'king':
        directions = [
          { direction: 'diagonal', limit: 1 },
          { direction: 'horizontal', limit: 1 },
          { direction: 'vertical', limit: 1 }
        ];
        break;
    }

    const validMoves = this.getValidMoves(directions, currentTilePosition);

    // validMoves.forEach((validMove) => { getTile(validMove), then classlist.add('suggested-move') });
  }

  getValidMoves(directions, currentPosition) {
    // directions = [ [0, 1], [0, 2] ];
    // directions = [ [-7, 0], [-6, 0] [1, 0], [0, 1], [0, 2], [0, 3] ];
    return [];
  }

  https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters
}
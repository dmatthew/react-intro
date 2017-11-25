import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={"square" + (props.winningSquare ? ' highlight' : '')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, winningSquare) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winningSquare={winningSquare}
      />
    );
  }

  render() {
    let rows = [];
    for (let i = 0; i <= 2; i++) {
      rows.push(
        <div className="board-row">
          {this.getRows(i)}
        </div>
      );
    }
    return (
      <div>{rows}</div>
    );
  }

  getRows(i) {
    let rows = [];
    for (let j = 0; j <= 2; j++) {
      let winningSquare;
      if (this.props.winningSquares) {
          winningSquare = this.props.winningSquares.indexOf(i * 3 + j) !== -1;
      }
      rows.push(this.renderSquare(i * 3 + j, winningSquare));
    }
    return rows;
  }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            sortIsAscending: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastMove: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    toggleSortOrder() {
        this.setState({
            sortIsAscending: !this.state.sortIsAscending,
        });
    }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
          let point = getColumnAndRow(step.lastMove);
          let className = (move === this.state.stepNumber) ? 'current' : '';

          const desc = move ?
            'Go to move #' + move + ' (' + point[0] + ', ' + point[1] + ')'  :
            'Go to game start';
          return (
            <li key={move}>
              <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });

    let status, winningSquares;
    if (winner) {
        status = 'Winner: ' + winner.player;
        winningSquares = winner.moves;
    }
    else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let sortOrder;
    if (this.state.sortIsAscending) {
        sortOrder = 'Sort Descending';
    }
    else {
        sortOrder = 'Sort Ascending';
        moves.reverse();
    }
    let sort = (
        <button onClick={() => this.toggleSortOrder()}>{sortOrder}</button>
    );

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{sort}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function getColumnAndRow(move) {
    const points = [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
    ];
    return points[move];
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
          player: squares[a],
          moves: [a, b, c],
      }
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

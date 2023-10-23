import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const X = "X";
const O = "O";

const TicTacToe = () => {
  const [turn, setTurn] = useState(X);
  const [value, setValue] = useState(Array(9).fill(""));
  const [win, setWin] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    winner();
  }, [value]);

  useEffect(() => {
    if (count === 9) {
      setWin("No one");
    }
  }, [count]);

  const winner = () => {
    const obj = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    };

    for (let key in obj) {
      obj[key].forEach(p => {
        if (
          value[p[0]] === "" ||
          value[p[1]] === "" ||
          value[p[2]] === ""
        ) {
          // Do nothing
        } else if (value[p[0]] === value[p[1]] && value[p[1]] === value[p[2]]) {
          setWin(value[p[0]]);
        }
      });
    }
  };

  const playAgain = () => {
    setValue(Array(9).fill(""));
    setTurn(X);
    setCount(0);
    setWin(null);
  };

  const handleClick = n => {
    if (value[n] !== "") {
      alert("Already Clicked");
      return;
    }

    const square = [...value];

    if (turn === X) {
      square[n] = X;
      setTurn(O);
    } else {
      square[n] = O;
      setTurn(X);
    }

    setValue(square);
    setCount(count + 1);
  };

  const Cell = ({ n }) => (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => handleClick(n)}
    >
      <Text style={styles.cellText}>{value[n]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View>
        {win === null ? (
          <View>
            <Text style={styles.playGameText}>!!Play The Game!!</Text>
            <Text style={styles.turnText}>Turn of: {turn}</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Cell n={0} />
                <Cell n={1} />
                <Cell n={2} />
              </View>
              <View style={styles.row}>
                <Cell n={3} />
                <Cell n={4} />
                <Cell n={5} />
              </View>
              <View style={styles.row}>
                <Cell n={6} />
                <Cell n={7} />
                <Cell n={8} />
              </View>
            </View>
          </View>
        ) : win === "No one" ? (
          <View style={styles.tie}>
            <Text style={styles.tieText}>It's a Tie!</Text>
            <Text style={styles.restartText}>
              Click on the restart button to play again
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                playAgain();
              }}
            >
              <Text>Restart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.result}>
            <Text style={styles.winnerText}>{win} is the winner</Text>
            <Text style={styles.restartText}>
              Click on the restart button to play again
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                playAgain();
              }}
            >
              <Text>Restart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  playGameText: {
    color: 'rgb(67,21,31)',
  },
  turnText: {
    color: 'rgb(67,21,31)',
  },
  table: {
    justifyContent: 'center',
    width:200,
    margin:5
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    margin:2
  },
  cellText: {
    fontSize: 40,
  },
  tie: {
    width: '100%',
    height: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  tieText: {
    color: 'rgb(67,21,31)',
  },
  restartText: {
    textAlign: 'center',
  },
  resetBtn: {
    backgroundColor: '#6d87cc',
    borderRadius: 100,
    shadowColor: 'rgba(43, 40, 233, 0.2)',
    shadowOffset: {
      width: 0,
      height: -25,
    },
    shadowRadius: 18,
    shadowOpacity: -14,
    elevation: 1,
    color: 'rgb(12, 14, 12)',
    cursor: 'pointer',
    padding: 7,
    paddingHorizontal: 20,
    textAlign: 'center',
    textDecorationLine: 'none',
    fontSize: 16,
    userSelect: 'none',
    touchAction: 'manipulation',
    textAlign: 'center',
  },
  result: {
    width: '100%',
    height: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  winnerText: {
    color: 'rgb(142, 142, 196)',
  },
});

export default TicTacToe;

import React from 'react';

let tableData = [];
let i = 0;
for (i = 0; i < 1000; i++) {
  tableData.push([{props: {rowSpan: 2}}, {props: {rowSpan: 2}}, {props: {rowSpan: 2}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  tableData.push([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
}

window.MODE = {
  NORMAL: 'NORMAL',
  SELECT: 'SELECT',
  INPUT : 'INPUT'
};

window.KEY = {
  DELETE : 8,
  TAB    : 9,
  ENTER  : 13,
  SHIFT  : 16,
  CTRL   : 17,
  ALT    : 18,
  ESC    : 27,
  LEFT   : 37,
  UP     : 38,
  RIGHT  : 39,
  DOWN   : 40,
  C      : 67, // TODO: Win, Mac検証
  T      : 84, // TODO: Win, Mac検証
  V      : 86, // TODO: Win, Mac検証
  COMMAND: 91
};

export default class Spreadsheet extends React.Component {
  constructor() {
    super();
    this.state = {
      data: tableData,
      row : 0,
      col : 0
    };
  }
  render() {
    let ri, ci, cellData, cellComponent;
    let indexedCells = [];
    let data   = this.state.data;
    let _cells = [];
    let _tr    = [];

    for (ri = 0; ri < data.length; ri++) {
      _cells = [];
      indexedCells[ri] = [];
      for (ci = 0; ci < data[ri].length; ci++) {
        cellData = this.state.data[ri][ci];
        if (!cellData.props) cellData.props = {};
        cellComponent = <Cell ref={item_ri_ci} row={ri} col={ci} setCurrentPosition={this._setCurrentPosition.bind(this)} rowSpan={cellData.props.rowSpan} colSpan={cellData.props.colSpan}/>;
        _cells.push(cellComponent);
      }
      _tr.push(<tr>{_cells}</tr>);
    }
    return (
      <table>
        <tbody>{_tr}</tbody>
      </table>
    );
  }
  _setCurrentPosition(row, col) {
    console.log(this.data[row][col]);
    return;
    this.setState({
      row: row,
      col: col
    });
  }
}

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: MODE.NORMAL
    };
  }
  render() {
    let mode = this.props.mode || this.state.mode;
    switch (mode) {
      case MODE.NORMAL:
        return (<td rowSpan={this.props.rowSpan} className="js-cell" onClick={this._onClickCell.bind(this)}>{this.props.row}-{this.props.col}</td>);
      case MODE.SELECT:
        return (
          <td rowSpan={this.props.rowSpan} className="js-cell select-mode" onClick={this._onClickCell.bind(this)}>
            <input autoFocus={true}
              value={this.state.value}
              onChange={this._onChangeInput.bind(this)}
              onBlur={this._onBlurInput.bind(this)}
              onKeyDown={this._onKeyDownInput.bind(this)}
            />
          </td>
        );
      case MODE.INPUT:
        return (
          <td rowSpan={this.props.rowSpan} className="js-cell input-mode" onClick={this._onClickCell.bind(this)}>
            <input autoFocus={true}
              value={this.state.value}
              onChange={this._onChangeInput.bind(this)}
              onBlur={this._onBlurInput.bind(this)}
              onKeyDown={this._onKeyDownInput.bind(this)}
            />
          </td>
        );
    }
  }
  _onClickCell() {
    this.props.setCurrentPosition(this.props.row, this.props.col);
    this.switchToSelectMode();
  }
  _onBlurInput() {
    this.switchToNormalMode();
  }
  _onKeyDownInput(event) {
    let key = event.keyCode;
    switch (key) {
      case KEY.LEFT:
        event.preventDefault();
        this.props.setCurrentPosition(this.props.row, this.props.col - 1);
        this.switchToNormalMode();
        break;
      case KEY.UP:
        break;
      case KEY.RIGHT:
        event.preventDefault();
        this.props.setCurrentPosition(this.props.row, this.props.col + 1);
        // this.switchToNormalMode();
        break;
      case KEY.DOWN:
        break;
      case KEY.ESC:
        this.switchToSelectMode();
        break;
      case KEY.ENTER:
        this.switchToInputMode();
        break;
      default:
        this.switchToInputMode();
        break;
    }
  }
  _onChangeInput(event) {
    // TODO: setStateするのでなくStoreに反映すべき
    this.setState({
      value: event.target.value
    });
  }
  switchToNormalMode() {
    this.setState({
      mode: MODE.NORMAL
    });
  }
  switchToSelectMode() {
    this.setState({
      mode: MODE.SELECT
    });
  }
  switchToInputMode() {
    this.setState({
      mode: MODE.INPUT
    });
  }
}

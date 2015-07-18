import React from 'react';
import PropertyActionCreators from '../actions/PropertyActionCreators';

export default class PropertyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      amount: ''
    };
  }
  render() {
    return (
      <form id="property-form">
        <div id="property-name">
          <input type="text"
                 name="name"
                 value={this.state.name}
                 onChange={this._onChange.bind(this)} />
        </div>
        <div id="property-amount">
          <input type="number"
                 name="amount"
                 value={this.state.amount}
                 onChange={this._onChange.bind(this)} />
        </div>
        <div id="property-submit-btn"><button type="button" onClick={this._onSubmitNewProperty.bind(this)}>SUBMIT</button></div>
      </form>
    );
  }
  _onSubmitNewProperty() {
    PropertyActionCreators.create(this.state.name, this.state.amount);
    this.setState({
      name: '',
      amount: ''
    });
  }
  _onChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
}

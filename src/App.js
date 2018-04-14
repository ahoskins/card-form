import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import cardValidate from 'card-validator';

const METHODS_TO_BIND = ['onCardChange', 'onNameChange', 'onCVV2Change', 'onMonthBlur', 'onYearBlur', 'onMonthChange', 'onYearChange'];

class App extends Component {
  constructor() {
    super();

    this.state = {
      card: '',
      name: '',
      cvv2: '',
      month: '',
      year: '',
      formattedCard: '',
      inferredCardType: null,
      expiryWarning: '',
      monthWarning: ''
    };

    METHODS_TO_BIND.forEach(method => this[method] = this[method].bind(this));
  }

  getCurrentDate() {
    let d = new Date();
    return {
      year: d.getFullYear(),
      month: d.getMonth()
    }
  }

  onMonthBlur() {
    let { year, expiryWarning, month } = this.state;

    const currentDate = this.getCurrentDate();    
    if (year <= currentDate.year && month <= currentDate.month) {
      expiryWarning = "Expiry be after current date";      
    }

    this.setState({ expiryWarning });
  }

  onYearBlur() {
    let { month, expiryWarning, year } = this.state;

    const currentDate = this.getCurrentDate();
    if (year < currentDate.year) {
      expiryWarning = "Expiry be after current date";      
    } else if (year === currentDate.year && month <= currentDate.month) {
      expiryWarning = "Expiry be after current date";
    }

    this.setState({ expiryWarning });
  }

  onMonthChange(event) {
    let { monthWarning } = this.state;
    let month = event.target.value;

    month = month.replace(/\D/g,'');
    month = month.substring(0, 2);

    if (month > 12) {
      monthWarning = "Must be between 0-12";
    }

    this.setState({ month, monthWarning });
  }

  onYearChange(event) {
    let year = event.target.value;

    year = year.replace(/\D/g,'');
    year = year.substring(0, 4);

    this.setState({ year });
  }

  onNameChange(event) {
    const { inferredCardType } = this.state;
    let name = event.target.value;

    if (inferredCardType === "visa") {
      name = name.substring(0, 3);
    } else if (inferredCardType === "american-express") {
      name = name.substring(0, 4);      
    }

    this.setState({ name });
  }

  onCVV2Change(event) {
    const cvv2 = event.target.value;

    this.setState({ cvv2 });
  }

  onCardChange(event) {
    let card = event.target.value;
    let formattedCard = '';    

    card = card.replace(/\D/g,'');

    let validationInformation = cardValidate.number(card);

    const type = validationInformation.card ? validationInformation.card.type : null;
    if (type === "visa") {
      // 4-4-4-4 grouping, 16 total
      card.substring(0, 16).split("").forEach((digit, index) => {
        if ([4, 8, 12].includes(index)) {
          formattedCard += ' ';
        }
        formattedCard += digit;
      });
    } else if (type === "american-express") {
      // 4-6-5 grouping, 15 total
      card.substring(0, 15).split("").forEach((digit, index) => {
        if ([4, 10].includes(index)) {
          formattedCard += ' ';
        }
        formattedCard += digit;
      });
    } else {
      formattedCard = card;
    }

    this.setState({ card, formattedCard, inferredCardType: type });
  }

  render() {
    const { formattedCard, name, cvv2, month, year } = this.state;

    return (
      <div className="App">
        <div className="App-title">Enter your credit card information</div>
        <input 
          className="App-input" 
          type="text" 
          placeholder="Name" 
          onChange={this.onNameChange} 
          value={name} 
        />        
        <input 
          className="App-input" 
          type="text" 
          placeholder="Card Number" 
          onChange={this.onCardChange} 
          value={formattedCard} 
        />
        <input 
          className="App-input" 
          type="text" 
          placeholder="CVV2" 
          onChange={this.onCVV2Change} 
          value={cvv2} 
        />
        <div className="App-expiry">
          <input 
            className="App-input App-input--expiry" 
            type="text" 
            placeholder="Exp. Month" 
            onBlur={this.onMonthBlur} 
            onChange={this.onMonthChange}
            value={month}             
          />
          <input 
            className="App-input App-input--expiry" 
            type="text" 
            placeholder="Exp. Year" 
            onBlur={this.onYearBlur} 
            onChange={this.onYearChange}   
            value={year}                      
          />
        </div>
      </div>
    );
  }
}

export default App;

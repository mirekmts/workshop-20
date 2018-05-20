import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FlightsView } from './flights/FlightsView';
import { SearchView } from './flights/SearchView';
import { AirportService } from './shared/components/AirportService';

class App extends Component {
  state = {
    searchVisible: true,
    airports: []
  };

  componentDidMount() {
    AirportService.getAirportSources().then(airports => {
        console.log(airports);
        this.setState({
            airports    //shortcut
        })
    })
  }

  constructor(props){
    super(props);
    this.searchPressed = this.searchPressed.bind(this);
    this.searchPress = this.searchPress.bind(this);
  }

  searchPressed() {
    this.setState({
        searchVisible: false
    })
  }

  searchPress() {
    this.setState({
      searchVisible: true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Dome something fancy!
        </p>
        {this.state.searchVisible && <SearchView onClick={this.searchPressed} airports={this.state.airports}/>}
        {!this.state.searchVisible && <FlightsView onClick={this.searchPress}/>}
      </div>
    );
  }
}

export default App;

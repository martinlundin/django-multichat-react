import React, { Component } from 'react';
import './assets/scss/style.css';
import LoginRegister from "./containers/LoginRegister";

class App extends Component {
  render() {
    return (
      <div className="App">

          <LoginRegister/>

      </div>
    );
  }
}

export default App;

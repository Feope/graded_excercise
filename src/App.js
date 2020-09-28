import React from 'react';
import Login from './components/Login'
import Account from './components/Account'
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: false,
      accountOpen: false,
    }
  }


  render()
  {
    let output = 
      <>
        <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Login</button>
        <div className="searchBar">
          Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.productSearchString }/>
        </div>
      </>

    if(this.state.loggedIn)
    {
      if(this.state.accountOpen)
      {
        output = 
        <>
          <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Logout</button>
          <div className="searchBar">
            Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.productSearchString }/>
          </div>
          <Login/>
          <button onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
          <Account/>
        </>
      }
      else{
        output = 
        <>
          <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Logout</button>
          <div className="searchBar">
            Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.productSearchString }/>
          </div>
          <Login/>
          <button onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
        </>
      }
    }

    return (
      <>
        { output }
      </>
    )
  }

}

export default App;

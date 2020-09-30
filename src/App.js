import React from 'react';
import Login from './components/Login'
import Account from './components/Account'
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      content: [],
      loggedIn: false,
      accountOpen: false,
    }
  }

  componentDidMount = () =>
  {    
    axios.get('http://localhost:4000/content').then(result => {
      this.setState({ content: result.data });
    })
    .catch(error => {
      console.error(error);
      this.setState({ networkError: true })
    })
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
          <Account info={ this.state.content } />
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

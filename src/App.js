import React from 'react';
import Login from './components/Login'
import Account from './components/Account'
import Searchview from './components/Searchview'
import Allsearch from './components/Allsearch'
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      content: [],
      productSearchString: "",
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

  onSearchFieldChange = (event) => {
    console.log('Keyboard event');
    console.log(event.target.value);
    this.setState({ productSearchString: event.target.value });
  }

  render()
  {
    let output = 
      <>
        <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Login</button>
      </>

    let searchOutput =
      <>
        <div className="searchBar">
          Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.searchString }/>
        </div>
        <Allsearch content={ this.state.content }/>
      </>
    if(this.state.productSearchString !== "")
    {
      searchOutput =
      <>
        <div className="searchBar">
          Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.searchString }/>
        </div>
        <Searchview content={ this.state.content.filter((content) => content.name.includes(this.state.productSearchString)) }/>
      </>
    }

    if(this.state.loggedIn)
    {
      if(this.state.accountOpen)
      {
        output = 
        <>
          <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Logout</button>
          <Login/>
          <button onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
          <Account info={ this.state.content } />
        </>
      }
      else{
        output = 
        <>
          <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Logout</button>
          <Login/>
          <button onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
        </>
      }
    }

    return (
      <>
        { searchOutput }
        { output }
      </>
    )
  }

}

export default App;

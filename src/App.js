import React from 'react';
import Login from './components/Login'
import Account from './components/Account'
import Searchview from './components/Searchview'
import Allsearch from './components/Allsearch'
import Status from './components/Status'
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      content: [],
      charger: [],
      history: [],
      chargerTaken: false,
      charging: false,
      productSearchString: "",
      loggedIn: false,
      accountOpen: false,
      secondsPassed: 0,
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

  handleClick = (id, name, price) => {
    console.log('Click happened ' + id + ' ' + name);
    const data = [{"id": id,"name": name,"price": price, currentPrice: 0}];
    this.setState({ charger: data });
    this.setState({ chargerTaken: true });
  }

  timer = () => {
    if(this.state.charger.length > 0){
      if(this.state.charging === false){
        this.setState({ charging: !this.state.charging })
        var time = setInterval(() => this.statusChange() , 1000);
        this.setState({ time: time })
      }
      else if(this.state.charging === true){
        clearInterval(this.state.time);
        this.setState({ charging: false });
        var newHistory = this.state.history;
        newHistory.push(this.state.charger);
        this.setState({history: newHistory})
        this.setState({secondsPassed: 0})
        this.setState({charger: []})
        console.log(this.state.history);
      }
    }
  }

  statusChange = () => {
    this.setState({ secondsPassed: this.state.secondsPassed + 1 })
    if(typeof this.state.charger[this.state.charger.length - 1].price !== 'string'){
      var modifiedPrice = this.state.charger[this.state.charger.length - 1].price;
      modifiedPrice = (modifiedPrice / 60) * this.state.secondsPassed; 
      var modifiedCharger = this.state.charger;
      modifiedCharger[modifiedCharger.length - 1].currentPrice = modifiedPrice;
      this.setState({ charger: modifiedCharger })
    }
  }

  render()
  {
    let output = 
      <>
        <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Login</button>
      </>

    if( this.state.chargerTaken === true)
    {
      output = 
        <>
          <button onClick={ () => this.setState({loggedIn: !this.state.loggedIn}) }>Login</button>
          <Status charger={ this.state.charger } time={ this.state.secondsPassed } timer={ this.timer }/>
        </>
    }

    let searchOutput =
      <>
        <div className="searchBar">
          Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.searchString }/>
        </div>
        <Allsearch content={ this.state.content } handleClick={ this.handleClick }/>
      </>
    if(this.state.productSearchString !== "")
    {
      searchOutput =
      <>
        <div className="searchBar">
          Search <input type="text" onChange={ this.onSearchFieldChange } value={ this.state.searchString }/>
        </div>
        <Searchview handleClick={ this.handleClick } content={ this.state.content.filter((content) => content.name.includes(this.state.productSearchString)) }/>
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

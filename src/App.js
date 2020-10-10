import React from 'react';
import Login from './components/Login';
import Account from './components/Account';
import Searchview from './components/Searchview';
import Allsearch from './components/Allsearch';
import Status from './components/Status';
import LoginButton from './components/LoginButton';
import finland2 from './finland2.png';
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
      user: "",
      password: "",
      chargerTaken: false,
      charging: false,
      logState: "Login",
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
    var uppercase = event.target.value.toUpperCase();
    console.log(uppercase);
    this.setState({ productSearchString: uppercase });
  }

  handleClick = (id, name, price, status) => {
    if(status === "taken"){
      alert("This charger is currently occupied!")
    }
    else if(this.state.charging === true){
      alert("You are already charging somewhere else!");
    }
    else{
      if(this.state.loggedIn === true){
        console.log('Click happened ' + id + ' ' + name);
        var date = String(new Date());
        const data = [{"id": id,"name": name,"price": price, "currentPrice": 0, "date": date}];
        this.setState({ charger: data });
        this.setState({ chargerTaken: true });
      }
      else{
        alert("Please login first!")
      }
    }
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
        newHistory.push(this.state.charger[0]);
        this.setState({history: newHistory})
        this.setState({secondsPassed: 0})
        this.setState({charger: []})
        console.log(this.state.history);
        console.log(this.state.content);
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

  changeStartToStop = () =>{
    if(this.state.charging === true){
      return "Stop"
    }
    else{
      return "Start"
    }
  }

  updateUser = (event) =>{
    this.setState({user: event.target.value});
    console.log(this.state.user);
  }

  updatePassword = (event) =>{
    this.setState({password: event.target.value});
    console.log(this.state.password);
  }

  login = () =>{
    if(this.state.logState === "Logout" && this.state.charging === true){
      alert("Please stop charging first!")
    }
    else if(this.state.logState === "Logout"){
      this.setState({logState: "Login"});
      this.setState({loggedIn: false});
    }
    else if(this.state.user === "user" && this.state.password ==="password"){
      this.setState({logState: "Logout"});
      this.setState({loggedIn: true});
    }
    else{
      alert("Password or Username incorrect, the question mark can help you.")
    }
  }

  render()
  {
    let chargerOutput = 
      <>
      </>

    let output =
      <>
        <LoginButton logState={this.state.logState} login={this.login} />  
        <Login user={ this.state.user } password={ this.state.password } updateUser={ this.updateUser } updatePassword={ this.updatePassword } />
      </>

    if( this.state.chargerTaken === true)
    {
      if(this.state.charger.length < 1){
        chargerOutput = 
        <>
        </>
      }
      else{
        chargerOutput = 
        <>
          <Status charger={ this.state.charger } time={ this.state.secondsPassed } timer={ this.timer } StartToStop={ this.changeStartToStop }/>
        </>
      }
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
          <LoginButton logState={this.state.logState} login={this.login} />
          <button className="accountButton" onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
          <Account info={ this.state.content } history={ this.state.history }/>
        </>
      }
      else{
        output = 
        <>
          <LoginButton logState={this.state.logState} login={this.login} />
          <button className="accountButton" onClick={ () => this.setState({accountOpen: !this.state.accountOpen}) }>Account</button>
        </>
      }
    }

    return (
      <>
        { searchOutput }
        { chargerOutput }
        { output }
        { <img className="imagery" alt="Finland" src={finland2}></img> }
      </>
    )
  }

}

export default App;

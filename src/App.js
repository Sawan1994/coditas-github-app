import React, { Component } from 'react';
import './App.css';
import UserContainer from './UserDetails/containers/UserContainer';
import NavBar from './NavBar/containers/NavBar';
import Pagination from "./pagination/Pagination";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items_per_page: 30,

    }
  }

  render() {
    return (
      <div className="container-fluid">
        <NavBar items_per_page={this.state.items_per_page}/>
        <UserContainer/>
        <Pagination items_per_page={this.state.items_per_page}/>
      </div>
    );
  }
}

export default App;

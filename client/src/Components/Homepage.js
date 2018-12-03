import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class Homepage extends Component {
   state = {
      username:"",
      password:""
   }
   onInputChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
   login = (event) => {

      axios.post(`/api/login`,this.state)
      .then((res) =>{
         if(res.data.success){
            history.push({
               pathname:"/dashboard",
               state:{
                  user:res.data.name
               }
            })
         }
      })

      // }).then(function (response) {
      //     if(response.success){
      //         activeUser = username;
      //         activeName = response.name;
      //         dashboardPage();
      //     }
      //     else{
      //         homePage();
      //     }
      // })
  }
	render() {
		return (
			<div>
				<div className="right400">
					<h3>Log in</h3>
					<label htmlFor="username">Username (email address):</label>
					<input name="username" onChange={this.onInputChange}></input><br></br>
					<label htmlFor="password">Password:</label>
					<input name="password" type="password" onChange={this.onInputChange}></input><br></br>
					<button id="loginButton" onClick={this.login}>Log in</button>
					<button id="signupButton">Sign up</button><br></br><br></br><br></br><br></br>
				</div>
				<h2>I-O-U is the online ledger for peer to peer lending.</h2>
			</div>
		)
	}
}

export default Homepage;

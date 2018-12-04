import React, { Component } from "react";
import axios from "axios";
import history from "../history"
class Signup extends Component {
   state = {
      email: "",
      password: "",
      name: "",
      phone: "",
      password1: "",
      password2: ""
   }
   onInputChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }
   signupSubmit = (event) => {
      event.preventDefault();
      if (this.state.name && this.state.email && this.state.phone && this.state.password1 && this.state.password1 === this.state.password2) {
         axios.post(`/api/users`, {
            email: this.state.email,
            password: this.state.password1,
            name: this.state.name,
            phone: this.state.phone
         }).then((res) => {
            history.push({
               pathname:"/dashboard",
               state:{
                  user:this.state.email,
                  activeName:this.state.name
               }
            })
         })
      }
      else {
         alert("Please fill out all fields")
      }
   }
   cancel = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/"
      })
   }

   render() {
      return (
         <div>
            <div className="right400">
               <h3>Sign up</h3>
               <label htmlFor="name">Name:</label>
               <input name="name" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="email">Email address:</label>
               <input name="email" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="phone">Phone number:</label>
               <input name="phone" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="password1">Create password:</label>
               <input name="password1" type="password" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="password2">Confirm password:</label>
               <input name="password2" type="password" onChange={this.onInputChange}></input><br></br>
               <button name="logoutButton" onClick={this.cancel}>Cancel</button>
               <button name="signupSubmit" onClick={this.signupSubmit}>Submit</button>
            </div>
         </div>
      )
   }
}

export default Signup;

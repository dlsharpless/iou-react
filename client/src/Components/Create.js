import React, { Component } from "react";
import axios from "axios";
import history from "../history";

class Create extends Component {
   state = {
      otherParty: "",
      principal: 0,
      interest: 0,
      startDate: "",
      endDate: "",
      notes1: "",
      status: "Pending",
      authority: "",
      purpose:"Lend",
      lender:"",
      borrower:""
   }
   onInputChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }
   createLoan = (event) => {
      event.preventDefault();
      this.setState({
         authority:this.state.otherParty,
         notes1: `${this.props.location.state.user}: ${this.state.notes1}`
      })
      if (this.state.purpose === "Lend") {
         this.setState({
            lender: this.props.location.state.user,
            borrower: this.state.otherParty
         })
         console.log("iffy");
      } else {
         this.setState({
            borrower: this.props.location.state.user,
            lender: this.state.otherParty
         })
         console.log("elsy");
      }
      console.log(this.state);
      axios.post("/api/loans", this.state).then((response) => {
         console.log(response.data);
         history.push({
            pathname:"/viewdetails",
            state:{
               user:this.props.location.state.user,
               activeName:this.props.location.state.activeName,
               loanId:response.data._id
            }
         })
      })
   }
   cancel = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/dashboard",
         state:{
            user:this.props.location.state.user,
            activeName:this.props.location.state.activeName
         }
      })
   }
   render() {
      return (
         <div>
            <div className="right400">
               <h3>Create an I-O-U</h3>
               <p>Purpose
                    <select onChange={this.onInputChange} name="purpose">
                     <option value="Lend">Lend</option>
                     <option value="Borrow">Borrow</option>
                  </select>
               </p>
               <label htmlFor="otherParty">Other party:</label>
               <input name="otherParty" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="principal">Principal amount:</label>
               <input name="principal" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="interest">Interest:</label>
               <input name="interest" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="startDate">Start date:</label>
               <input name="startDate" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="endDate">End date:</label>
               <input name="endDate" onChange={this.onInputChange}></input><br></br>
               <label htmlFor="notes1">Notes:</label>
               <textarea name="notes1" onChange={this.onInputChange}></textarea><br></br>
               <button name="dashboardButton" onClick={this.cancel}>Cancel</button>
               <button name="createLoan" onClick={this.createLoan}>Submit</button>
            </div>
         </div>
      )
   }
}

export default Create;

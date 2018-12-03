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
      notes: "",
      status: "Pending",
      authority: "",
      purpose: "",
      lender:"",
      borrower:""
   }
   onInputChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }
   postLoan = (user) =>{
      axios.post("/api/loans", user).then((response) => {
         console.log(response)
         history.push({
            pathname:"/viewdetails",
            state:{
               loanId:response.data._id
            }
         })
      })
   }
   createLoan = (event) => {
      event.preventDefault();
      if (this.state.purpose === "Lend") {
         this.setState({
            lender: this.props.location.state.user || "None",
            borrower: this.state.otherParty,
            authority:this.state.otherParty
         })
         this.postLoan(this.state)
      } else {
         this.setState({
            borrower: this.props.location.state.user || "None",
            lender: this.state.otherParty,
            authority:this.state.otherParty
         })
         this.postLoan(this.state)
      }
      
   }
   cancel = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/dashboard",
         // state:{
         //    user:res.data.name
         // }
      })
   }
   render() {
      return (
         <div>
            <div className="right400">
               <h3>Create an IOU</h3>
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
               <label htmlFor="notes">Notes:</label>
               <textarea name="notes" onChange={this.onInputChange}></textarea><br></br>
               <button name="dashboardButton" onClick={this.cancel}>Cancel</button>
               <button name="createSubmit" onClick={this.createLoan}>Submit</button>
            </div>
         </div>
      )
   }
}

export default Create;

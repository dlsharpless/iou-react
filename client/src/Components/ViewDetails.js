import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class ViewDetails extends Component {
   state = {
      lender: "",
      borrower: "",
      status: "",
      principal: 0,
      interest: 0,
      balance: 0,
      startDate: "",
      endDate: "",
      notes1: "",
      notes2: "",
      authority: "",
      newnote: ""
   }
   componentDidMount() {
      axios.get(`/api/loans/${this.props.location.state.loanId}`)
         .then((res) => {
            if (res.data) {
               this.setState({
                  lender: res.data.lender,
                  borrower: res.data.borrower,
                  status: res.data.status,
                  principal: res.data.principal,
                  interest: res.data.interest,
                  balance: res.data.balance,
                  startDate: res.data.startDate,
                  endDate: res.data.endDate,
                  notes1: res.data.notes1,
                  notes2: res.data.notes2,
                  authority: res.data.authority,
               })
            }
         })
   }
   onInputChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }
   backToDashboard = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/dashboard",
         state:{
            user:this.props.location.state.user,
            activeName:this.props.location.state.activeName
         }
      })
   }
   approve = (event) => {
      event.preventDefault();
      axios.put("/api/loans",{
         loanId: this.props.location.state.loanId,
         status: "Active",
         balance: parseFloat(this.state.principal.$numberDecimal) + parseFloat(this.state.interest.$numberDecimal),
         notes2: `${this.props.location.state.user}: ${this.state.newnote}`,
         authority: null
      }).then((response) => {
         console.log(response)
         this.componentDidMount();
      })
   }
   deny = (event) => {
      event.preventDefault();
      
   }
   render() {
      return (
         <div>
            <div className="center400">
               <h3>Loan Details</h3>
               <button id="dashboardButton" onClick={this.backToDashboard}>Back to Dashboard</button>
            </div>
            <div className="left400">
               <p>Lender: {this.state.lender}</p>
               <p>Borrower: {this.state.borrower}</p>
               <p>Status: {this.state.status}</p>
               <p>Principal: ${this.state.principal.$numberDecimal}</p>
               <p>Interest: ${this.state.interest.$numberDecimal}</p>
               <p>Balance: {this.state.balance ? `$${this.state.balance.$numberDecimal}` : "Pending"}</p>
               <p>Start Date: {this.state.startDate}</p>
               <p>End Date: {this.state.endDate}</p>
               <p>Notes:</p><p>{this.state.notes1}</p>
               <p>{this.state.notes2 ? this.state.notes2 : ""}</p>
               {this.state.authority===this.props.location.state.user
                  ? <div>
                        <p><label htmlFor="newnote">Add notes:</label></p><p><textarea id="newnote" name="newnote" onChange={this.onInputChange}></textarea><br></br></p>
                        <button id="approveButton" onClick={this.approve}>Approve</button>
                        <button id="denyButton" onClick={this.deny}>Deny</button>
                  </div>
                  : ""}
            </div>
         </div>
      )
   }
}

export default ViewDetails;
import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class ViewDetails extends Component {
   state = {
      lender:"",
      borrower:"",
      status: "",
      principal: 0,
      interest: 0,
      balance: 0,
      startDate: "",
      endDate: "",
      notes1: "",
      notes2: "",
      authority: ""
   }
   componentDidMount(){
      console.log(this.props.location.state)
   }
   render() {
      return (
         <div>
            hello world
			</div>
      )
   }
}

export default ViewDetails;

///

$.ajax({
   url: `/api/loans/${loanId}`,
   method: "GET",
   // data: {
   //     _id: loanId
   // }
}).then(function (response) {
   let balance = parseFloat(response.principal.$numberDecimal) + parseFloat(response.interest.$numberDecimal);
   $("#content").html(`
       <div class="center400">
           <h3>Loan Details</h3>
           <button id="dashboardButton">Back to Dashboard</button>
       </div>
       <div class="left400">
           <p>Lender: ${response.lender}</p>
           <p>Borrower: ${response.borrower}</p>
           <p>Status: ${response.status}</p>
           <p>Principal: ${response.principal.$numberDecimal}</p>
           <p>Interest: ${response.interest.$numberDecimal}</p>
           <p>Balance: ${response.balance ? response.balance.$numberDecimal : "Pending"}</p>
           <p>Start Date: ${response.startDate}</p>
           <p>End Date: ${response.endDate}</p>
           <p>Notes:</p><p>${response.notes1}</p>
       </div>
   `)
   if (response.notes2) {
       $(".left400").append(`
           <p>${response.notes2}</p>
       `)
   }
   if (activeUser === response.authority) {
       $(".left400").append(`
           <label for="notes">Notes:</label>
           <textarea id="notes"></textarea><br>
       `)
       $("#content").append(`
           <button id="approveButton" balance=${balance} loanId=${loanId}>Approve</button>
           <button id="denyButton" loanId=${loanId}>Deny</button>
       `)
   }
})
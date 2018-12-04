import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class Dashboard extends Component {
   state = {
      loans: []
   }
   componentDidMount() {
      // console.log(this.props);
      axios.post(`/api/dashboard`, {
         activeUser: this.props.location.state.user
      }).then((response) => {
         this.setState({
            loans: response.data
         })
         if (response.data.length === 0) {
            document.getElementById("loansTbody").innerHTML = `<tr><td colspan='5'>No loans to display.</td></tr>`;
         }
      })
   }
   goToCreate = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/create",
         state: {
            user: this.props.location.state.user,
            activeName:this.props.location.state.activeName
         }
      })
   }
   logout = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/",
      })
   }
   viewDetails = (event) => {
      event.preventDefault();
      history.push({
         pathname:"/viewdetails",
         state:{
            user:this.props.location.state.user,
            activeName:this.props.location.state.activeName,
            loanId:event.target.value
         }
      })
   }
   render() {
      return (
         <div>
            <div className="center400">
               <h3 id="hello">Hello, {this.props.location.state.activeName} </h3>
               <button id="createButton" onClick={this.goToCreate}>Create an I-O-U</button>
               <button id="logoutButton" onClick={this.logout}>Logout</button>
            </div>
            <table>
               <thead>
                  <tr>
                     <th>Peer</th>
                     <th>Status</th>
                     <th>Payable</th>
                     <th>Receivable</th>
                     <th>Details</th>
                  </tr>
               </thead>
               <tbody id="loansTbody">
                  {this.state.loans.map((loan) =>
                     <tr className='loan'>
                        {/* Peer */}
                        <td>{loan.lender === this.props.location.state.user ? loan.borrower : loan.lender}</td>
                        {/* Status */}
                        <td>{loan.status}</td>
                        {/* Payable */}
                        <td className="payable">{loan.balance && loan.borrower === this.props.location.state.user ? loan.balance.$numberDecimal : ''}</td>
                        {/* Receivable */}
                        <td>{loan.balance && loan.lender === this.props.location.state.user ? loan.balance.$numberDecimal : ''}</td>
                        {/* Details */}
                        <td><button className="details" value={loan._id} onClick={this.viewDetails}>View</button></td>
                     </tr>)}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Dashboard;

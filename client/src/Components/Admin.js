import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class Admin extends Component {
   state = {
      users: [],
      loans: []
   }
   componentDidMount() {
      // console.log(this.props);
      axios.get(`/api/users`, {
      }).then((response) => {
         this.setState({
            users: response.data
         })
         if (response.data.length === 0) {
            document.getElementById("usersTbody").innerHTML = `<tr><td colspan='5'>No users to display.</td></tr>`;
         }
      })
      axios.get(`/api/loans`, {
      }).then((response) => {
         this.setState({
            loans: response.data
         })
         if (response.data.length === 0) {
            document.getElementById("loansTbody").innerHTML = `<tr><td colspan='5'>No loans to display.</td></tr>`;
         }
      })
   }
   logout = (event) => {
      event.preventDefault();
      history.push({
         pathname: "/",
      })
   }
   deleteUser = (event) => {
      event.preventDefault();
      axios.delete(`/api/users/${event.target.value}`, {
      }).then((response) => {
         this.componentDidMount()
      })
      
   }
   deleteLoan = (event) => {
      event.preventDefault();
      axios.delete(`/api/loans/${event.target.value}`, {
      }).then((response) => {
         this.componentDidMount()
      })
   }
   render() {
      return (
         <div>
            <div className="center400">
               <h3 id="hello">Hello, {this.props.location.state.activeName} </h3>
               <button id="logoutButton" onClick={this.logout}>Logout</button>
            </div>
            <h3>Users</h3>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Admin</th>
                  </tr>
               </thead>
               <tbody id="usersTbody">
                  {this.state.users.map((user) =>
                     <tr className='loan'>
                        {/* Name */}
                        <td>{user.name}</td>
                        {/* Email */}
                        <td>{user.email}</td>
                        {/* Phone */}
                        <td>{user.phone}</td>
                        {/* Delete */}
                        {user.email != "admin" ? <td><button className="details" value={user._id} onClick={this.deleteUser}>Delete</button></td> : <td></td>}
                     </tr>
                     )}
               </tbody>
            </table>
            <h3>Loans</h3>
            <table>
               <thead>
                  <tr>
                     <th>Lender</th>
                     <th>Borrower</th>
                     <th>Status</th>
                     <th>Balance</th>
                     <th>Admin</th>
                  </tr>
               </thead>
               <tbody id="loansTbody">
                  {this.state.loans.map((loan) =>
                     <tr className='loan'>
                        {/* Lender */}
                        <td>{loan.lender}</td>
                        {/* Borrower */}
                        <td>{loan.borrower}</td>
                        {/* Status */}
                        <td>{loan.status}</td>
                        {/* Balance */}
                        <td>{loan.balance ? loan.balance.$numberDecimal || '' : ''}</td>
                        {/* Delete */}
                        <td><button className="details" value={loan._id} onClick={this.deleteLoan}>Delete</button></td>
                     </tr>)}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Admin;

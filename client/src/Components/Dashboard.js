import React, { Component } from "react";
import axios from "axios";
import history from "../history"

class Dashboard extends Component {
   componentDidMount(){
      console.log(this.props)
   }
   goToCreate = (event) =>{
      event.preventDefault();
      history.push({
         pathname:"/create",
         state:{
            user:this.props.location.state.user
         }
      })
   }
	render() {
		return (
			<div>
				<div className="center400">
					<h3 id="hello">Hello, {this.props.location.state.user} </h3>
					<button id="createButton" onClick={this.goToCreate}>Create an I.O.U</button>
					<button id="logoutButton">Logout</button>
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
					</tbody>
				</table>
			</div>
		)
	}
}

export default Dashboard;

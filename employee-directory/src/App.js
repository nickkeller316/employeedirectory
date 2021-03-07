//importing react and components
import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Table from "./components/Table";
import axios from "axios";
import "./style.css";
import { findAllByTestID } from "@testing-library/react";

let data;

//extend to react component and declare api data sets
class App extends React.Component {
	state = {
		loading: true,
		employeeList: {},
		filteredList: null,
		ascending: true,
	};

	//componentDidMount calls the api and employeelist and filtered list for data sets
	async componentDidMount() {
		let response = await axios({
			//get method for randomuser api
			method: "get",
			url: "https://randomuser.me/api/?results=50",
			responseType: "stream",
		});
		//setloading state to false and then sets employee and filtered to data.results
		data = response.data.results;
		this.setState({
			loading: false,
			employeeList: response.data.results,
			filteredList: response.data.results,
		});
	}
	//search function
	search = (str) => {
		const filteredList = this.state.employeeList.filter((employee) => {
			const fullName = (
				employee.name.first +
				" " +
				employee.name.last
			).toLowerCase();
			//returns whole list when page is loaded
			return fullName.startsWith(str);
		});
		this.setState({ filteredList: filteredList });
	};
	//sort function for columns
	sort = (header) => {
		if (header === "Name") {
			if (this.state.ascending === true) {
				this.sortAscending(this.state.filteredList);
				this.setState({ ascending: false });
			}
			if (this.state.ascending === false) {
				this.sortDecending(this.state.filteredList);
				this.setState({ ascending: true });
			}
		} else if (header === "Email") {
			if (this.state.ascending === true) {
				this.sortAscending(this.state.filteredList);
				this.setState({ ascending: false });
			}
			if (this.state.ascending === false) {
				this.sortDecending(this.state.filteredList);
				this.setState({ ascending: true });
			}
		}
	};
	//function for ascending sorting
	sortAscending = (arr) => {
		arr.sort(function (a, b) {
			var nameA = (a.name.first + a.name.last).toUpperCase();
			var nameB = (b.name.first + b.name.last).toUpperCase();
			if (nameA > nameB) {
				return -1;
			}
			if (nameA < nameB) {
				return 1;
			}
			return 0;
		});
		this.setState({ filteredList: arr });
	};
	//function for decending sorting
	sortDecending = (arr) => {
		arr.sort(function (a, b) {
			var nameA = (a.name.first + a.name.last).toUpperCase();
			var nameB = (b.name.first + b.name.last).toUpperCase();
			if (nameA > nameB) {
				return 1;
			}
			if (nameA < nameB) {
				return -1;
			}
			return 0;
		});
		this.setState({ filteredList: arr });
	};
	render() {
		if (this.state.loading) {
			return (
				<div className="spinner">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		//this is used to make searched and filter data
		return (
			<div className="App">
				<Header />
				<Search searchFunction={this.search} />
				<div className="card">
					<div className="card-body text-center">
						Click on the name or email to sort the table by name or email.
					</div>
				</div>
				<Table employees={this.state.filteredList} sort={this.sort} />
			</div>
		);
	}
}

export default App;

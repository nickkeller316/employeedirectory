//importing react
import React from "react";

//search functionality, see app.js
function Search(input) {
	const searchFunction = (event) => {
		const fullName = event.target.value.trim().toLowerCase(); //no need for uppercase for our purposes
		if (event.keyCode === 8) {
			input.searchFunction(fullName);
		}
		input.searchFunction(fullName);
	};
	return (
		//html search bar (bootstrap)
		<nav className="navbar navbar-light bg-light justify-content-center">
			<form className="form-inline">
				<input
					className="form-control mr-sm-2"
					type="search"
					placeholder="Search by Name"
					aria-label="Search"
					onKeyUp={searchFunction}
				/>
			</form>
		</nav>
	);
}

export default Search;

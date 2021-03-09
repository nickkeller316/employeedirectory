//import react
import React from "react";

//function to be called in app.js
function Header() {
	return (
		//using bootstrap
		<nav className="navbar navbar-light bg-light justify-content-center">
			<span className="navbar-brand mb-0 h1">Employee Directory</span>
		</nav>
	);
}

//exporting
export default Header;

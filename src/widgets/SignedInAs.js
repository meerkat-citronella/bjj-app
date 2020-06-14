import React from "react";

class SignedInAs extends React.Component {
	render() {
		let showSignedIn = "";
		let uid = this.props.uid;

		uid !== ""
			? (showSignedIn = "Currently signed in as: " + uid)
			: (showSignedIn = "");

		return (
			<div>
				<h2>{showSignedIn}</h2>
			</div>
		);
	}
}

export default SignedInAs;

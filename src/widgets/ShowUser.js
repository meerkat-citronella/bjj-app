import React from "react";
import firebase from "./../firebase/firebaseConfig";

class ShowUser extends React.Component {
	render() {
		const firebaseData = this.props.data;

		console.log(firebaseData);

		return (
			<div>
				<h1>{firebaseData}</h1>
			</div>
		);
	}
}

export default ShowUser;

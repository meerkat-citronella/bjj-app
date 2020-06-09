import React from "react";
import firebase from "./../firebase/firebaseConfig";

class ShowUser extends React.Component {
	render() {
		const firebaseData = this.props.data;

		let liArray = [];
		Array.isArray(firebaseData) // type of an array in JS is an object...
			? (liArray = firebaseData.map((item) => <li>{item}</li>))
			: (liArray = "");

		console.log(Array.isArray(firebaseData));
		console.log(firebaseData);
		console.log(liArray);

		return (
			<div>
				<ul>{liArray}</ul>
			</div>
		);
	}
}

export default ShowUser;

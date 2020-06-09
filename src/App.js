import React from "react";
import firebase from "firebase";
import "./App.css";

import AddUser from "./widgets/AddUser";
import ShowUser from "./widgets/ShowUser";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			fullname: "",
			firebaseData: "",
		};
	}

	updateInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	addUser = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		//returns DocumentReference for the user just created
		const userRefPath = (
			await db.collection("users").add({
				fullname: this.state.fullname,
				email: this.state.email,
			})
		).path;

		const userDocData = (await db.doc(userRefPath).get()).data(); // data() doesn't return a promise
		const usersCollection = (await db.collection("users").get()).docs;

		const usersDocsDataArr = usersCollection.map((QueryDocSnap) => {
			return JSON.stringify(QueryDocSnap.data());
		});

		// console.log(usersDocsDataArr);

		// const email = userDocData.email;
		// const fullname = userDocData.fullname;

		// const firebaseData = `email: ${email}, fullname: ${fullname}`;

		this.setState({
			fullname: " ",
			email: " ",
			firebaseData: usersDocsDataArr,
		});

		// console.log(this.state);
	};

	render() {
		return (
			<div>
				<AddUser
					addUser={this.addUser}
					onChange={this.updateInput}
					fullname={this.state.fullname}
					email={this.state.email}
				></AddUser>
				<ShowUser data={this.state.firebaseData}></ShowUser>
			</div>
		);
	}
}

export default App;

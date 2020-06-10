import React from "react";
import firebase from "firebase";
import "./firebase/firebaseConfig";
import "./App.css";

import AddTechnique from "./widgets/AddTechnique";
import ShowFirebaseData from "./widgets/ShowFirebaseData";
import AddUser from "./widgets/AddUser";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			// add technique to firebase
			startingPosition: "choose",
			topBottom: "top",
			offenseDefense: "offense",
			endsInSubmission: "no",
			endingPosition: "choose",
			fullname: "", //DEFUNCT
			firebaseData: "",

			// add user
			email: "",
			password: "",
		};
	}

	updateInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	pushTechniqueToFirebase = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		//creates doc in FireStore; returns DocumentReference path for the doc just created
		const techniquesRefPath = (
			await db.collection("techniques").add({
				startingPosition: this.state.startingPosition,
				topBottom: this.state.topBottom,
				offenseDefense: this.state.offenseDefense,
				endsInSubmission: this.state.endsInSubmission,
				fullname: this.state.fullname,
			})
		).path;

		const techniquesCollection = (await db.collection("techniques").get()).docs;

		const techniquesDocsDataArr = techniquesCollection.map((QueryDocSnap) => {
			return JSON.stringify(QueryDocSnap.data());
		});

		this.setState({
			startingPosition: "closedGuard",
			topBottom: "top",
			offenseDefense: "offense",
			endsInSubmission: "no",
			fullname: "",
			firebaseData: techniquesDocsDataArr,
		});
	};

	addUserToFirebase = async (event) => {
		event.preventDefault();
		const auth = firebase.auth();

		// get user input
		const email = this.state.email;
		const password = this.state.password;

		// sign up the user
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				alert("thank you for signing up. you are now signed in");
				console.log(cred);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === "auth/weak-password") {
					alert("password is too weak");
				} else {
					alert(errorMessage);
				}
			});

		this.setState({
			email: "",
			password: "",
		});
	};

	render() {
		return (
			<div>
				<AddTechnique
					onSubmit={this.pushTechniqueToFirebase}
					onChange={this.updateInput}
					startingPosition={this.state.startingPosition}
					topBottom={this.state.topBottom}
					offenseDefense={this.state.offenseDefense}
					endsInSubmission={this.state.endsInSubmission}
					endingPosition={this.state.endingPosition}
					fullname={this.state.fullname}
				></AddTechnique>
				<ShowFirebaseData data={this.state.firebaseData}></ShowFirebaseData>
				<AddUser
					onSubmit={this.addUserToFirebase}
					onChange={this.updateInput}
					email={this.state.email}
					password={this.state.password}
				></AddUser>
			</div>
		);
	}
}

export default App;

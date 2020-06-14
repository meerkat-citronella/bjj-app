import React from "react";
import firebase from "firebase";
import "./firebase/firebaseConfig";
import "./App.css";

import AddTechnique from "./widgets/AddTechnique";
import ShowFirebaseData from "./widgets/ShowFirebaseData";
import AddUser from "./widgets/AddUser";
import SignIn from "./widgets/SignIn";
import LogOut from "./widgets/LogOut";

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

			// user
			email: "",
			password: "",
			uid: "",

			// signed in
			signedIn: false,
		};
	}

	async componentDidMount() {
		const db = firebase.firestore();

		if (this.state.uid !== "") {
			console.log("rendering: ", this.state.uid);

			const techniquesCollection = (await db.collection(this.state.uid).get())
				.docs;

			const techniquesDocsDataArr = techniquesCollection.map((QueryDocSnap) => {
				return JSON.stringify(QueryDocSnap.data());
			});

			this.setState({
				firebaseData: techniquesDocsDataArr,
			});
		}
	}

	////// GENERAL //////
	updateInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	////// Add Technique //////
	pushTechniqueToFirebase = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		//creates doc in FireStore; returns DocumentReference path for the doc just created
		const techniquesRefPath = (
			await db.collection(this.state.uid).add({
				startingPosition: this.state.startingPosition,
				topBottom: this.state.topBottom,
				offenseDefense: this.state.offenseDefense,
				endsInSubmission: this.state.endsInSubmission,
				fullname: this.state.fullname,
			})
		).path;

		const techniquesCollection = (await db.collection(this.state.uid).get())
			.docs;

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

	////// Show Technique //////
	showTechniques = async (event) => {};

	////// Add User //////
	addUserToFirebase = async (event) => {
		event.preventDefault();
		const auth = firebase.auth();

		// get user input
		const email = this.state.email;
		const password = this.state.password;

		// sign up the user
		const userCred = await auth
			.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				alert("thank you for signing up. you are now signed in");
				this.setState({
					signedIn: true,
					uid: cred.user.uid,
				});
				this.componentDidMount();
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

	////// Sign In //////
	signIn = async (event) => {
		event.preventDefault();
		const auth = firebase.auth();

		// get user input
		const email = this.state.email;
		const password = this.state.password;

		// sign in the user
		const userCred = await auth
			.signInWithEmailAndPassword(email, password)
			.then((cred) => {
				alert("you are now signed in.");
				this.setState({
					signedIn: true,
					uid: cred.user.uid,
				});
				this.componentDidMount();
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === "auth/wrong-password") {
					alert("Wrong password.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});

		this.setState({
			email: "",
			password: "",
		});
	};

	////// Log Out //////
	logOut = async (event) => {
		event.preventDefault();
		const auth = firebase.auth();

		// log out the user
		auth.signOut();

		this.setState({
			firebaseData: "",
			uid: "",
			signedIn: false,
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
					signedIn={this.state.signedIn}
				></AddUser>
				<SignIn
					onSubmit={this.signIn}
					onChange={this.updateInput}
					email={this.state.email}
					password={this.state.password}
					signedIn={this.state.signedIn}
				></SignIn>
				<LogOut onSubmit={this.logOut} signedIn={this.state.signedIn}></LogOut>
			</div>
		);
	}
}

export default App;

import React from "react";
import firebase from "firebase";
import "./firebase/firebaseConfig";
import "./App.css";

import AddTechnique from "./widgets/AddTechnique";
import ShowFirebaseData from "./widgets/ShowFirebaseData";
import AddUser from "./widgets/AddUser";
import SignIn from "./widgets/SignIn";
import SignedInAs from "./widgets/SignedInAs";
import LogOut from "./widgets/LogOut";
import DynamicSelect from "./widgets/DynamicSelect";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			// add technique
			startingPosition: "choose",
			topBottom: "top",
			offenseDefense: "offense",
			endsInSubmission: "no",
			endingPosition: "choose",
			fullname: "",
			firebaseData: "",

			// user
			email: "",
			password: "",
			uid: "",

			// DynamicSelect
			addPosition: "",
			positionsArray: "",
			startingPositionDYNAMICSELECT: "",
		};
	}

	async componentDidMount() {
		this.showTechniques();
		this.showPositions();
	}

	////// GENERAL //////
	updateInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	showTechniques = async () => {
		const db = firebase.firestore();

		if (this.state.uid !== "") {
			const techniquesCollection = (
				await db
					.collection("users")
					.doc(this.state.uid)
					.collection("techniques")
					.get()
			).docs;

			const techniquesArr = techniquesCollection.map((QueryDocSnap) => {
				return JSON.stringify(QueryDocSnap.data());
			});

			this.setState({
				firebaseData: techniquesArr,
			});
		}
	};

	////// Add Technique //////
	pushTechniqueToFirebase = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		//creates doc in FireStore; returns DocumentReference path for the doc just created

		await db
			.collection("users")
			.doc(this.state.uid)
			.collection("techniques")
			.doc(this.state.fullname)
			.set({
				startingPosition: this.state.startingPosition,
				topBottom: this.state.topBottom,
				offenseDefense: this.state.offenseDefense,
				endsInSubmission: this.state.endsInSubmission,
				fullname: this.state.fullname,
			});

		this.showTechniques();
		this.setState({
			startingPosition: "closedGuard",
			topBottom: "top",
			offenseDefense: "offense",
			endsInSubmission: "no",
			fullname: "",
		});
	};

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
					uid: cred.user.uid,
				});
				this.showTechniques();
				this.showPositions();
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
					uid: cred.user.uid,
				});
				this.showTechniques();
				this.showPositions();
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
			positionsArray: "",
			uid: "",
		});
	};

	////// Dynamic Select //////

	// addPosition
	addNewPosition = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		const uid = this.state.uid;
		const addPosition = this.state.addPosition;

		// handle blank pos
		if (this.state.addPosition !== "") {
			// define firestore pos ref
			const newPositionRef = db
				.collection("users")
				.doc(uid)
				.collection("positions")
				.doc(addPosition);

			newPositionRef.get().then(async (docSnap) => {
				// does it exist already?
				if (docSnap.exists) {
					alert("position already exists");
					// if not, add
				} else {
					(await newPositionRef).set({ position: addPosition });
					this.showPositions();
					alert("position added!");
				}
			});

			this.setState({
				addPosition: "",
			});
		} else {
			alert("don't add a blank position!");
		}
	};

	// show positions
	showPositions = async () => {
		const db = firebase.firestore();

		if (this.state.uid !== "") {
			const positionsCollection = (
				await db
					.collection("users")
					.doc(this.state.uid)
					.collection("positions")
					.get()
			).docs;

			const positionsArr = positionsCollection.map((QueryDocSnap) => {
				return JSON.stringify(QueryDocSnap.data());
			});

			this.setState({
				positionsArray: positionsArr,
			});
		}
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
					uid={this.state.uid}
				></AddTechnique>
				<ShowFirebaseData data={this.state.firebaseData}></ShowFirebaseData>
				<AddUser
					onSubmit={this.addUserToFirebase}
					onChange={this.updateInput}
					email={this.state.email}
					password={this.state.password}
				></AddUser>
				<SignIn
					onSubmit={this.signIn}
					onChange={this.updateInput}
					email={this.state.email}
					password={this.state.password}
					uid={this.state.uid}
				></SignIn>
				<SignedInAs uid={this.state.uid}></SignedInAs>
				<LogOut onSubmit={this.logOut} uid={this.state.uid}></LogOut>
				<DynamicSelect
					onChange={this.updateInput}
					addNewPosition={this.addNewPosition}
					addPosition={this.state.addPosition}
					startingPositionDYNAMICSELECT={
						this.state.startingPositionDYNAMICSELECT
					}
					positionsArray={this.state.positionsArray}
					uid={this.state.uid}
				></DynamicSelect>
			</div>
		);
	}
}

export default App;

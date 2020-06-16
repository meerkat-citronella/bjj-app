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

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			// add technique
			startingPosition: "",
			topBottom: "top",
			offenseDefense: "offense",
			endsInSubmission: "no",
			endingPosition: "",
			fullname: "",
			firebaseData: "",

			// user
			email: "",
			password: "",
			uid: "",

			// DynamicSelect
			addPosition: "",
			positionsArray: "",
		};
	}

	////// GENERAL //////
	async componentDidMount() {
		this.showTechniques();
		this.showPositions();
	}

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

			this.setState({
				firebaseData: techniquesCollection,
			});
		}
	};

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

			this.setState({
				positionsArray: positionsCollection,
			});
		}
	};

	////// Add Technique //////
	pushTechniqueToFirebase = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		const docId = this.state.fullname.trim().toLowerCase().replace(/\s/gi, "-");

		//creates doc in FireStore; returns DocumentReference path for the doc just created
		if (this.state.fullname !== "") {
			const newTechniqueRef = db
				.collection("users")
				.doc(this.state.uid)
				.collection("techniques")
				.doc(docId);

			newTechniqueRef.get().then(async (docSnap) => {
				if (docSnap.exists) {
					alert("the technique already exists!");
				} else {
					(await newTechniqueRef).set({
						startingPosition: this.state.startingPosition,
						topBottom: this.state.topBottom,
						offenseDefense: this.state.offenseDefense,
						endsInSubmission: this.state.endsInSubmission,
						endingPosition: this.state.endingPosition,
						fullname: this.state.fullname,
					});
					this.showTechniques();
				}
			});

			this.setState({
				startingPosition: "",
				topBottom: "top",
				offenseDefense: "offense",
				endsInSubmission: "no",
				endingPosition: "",
				fullname: "",
			});
		} else {
			alert("add technique name before submitting");
		}
	};

	addNewPosition = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();

		const uid = this.state.uid;
		const addPosition = this.state.addPosition;
		const docId = addPosition.trim().toLowerCase().replace(/\s/gi, "-");

		// handle blank pos
		if (this.state.addPosition !== "") {
			// define firestore pos ref
			const newPositionRef = db
				.collection("users")
				.doc(uid)
				.collection("positions")
				.doc(docId);

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

	deleteTechnique = async (event) => {
		const db = firebase.firestore();
		const docId = event.target.getAttribute("data-id");
		await db
			.collection("users")
			.doc(this.state.uid)
			.collection("techniques")
			.doc(docId)
			.delete();

		this.showTechniques();
	};

	deleteStartingPosition = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();
		const docId = this.state.startingPosition
			.trim()
			.toLowerCase()
			.replace(/\s/gi, "-");

		await db
			.collection("users")
			.doc(this.state.uid)
			.collection("positions")
			.doc(docId)
			.delete();

		this.showPositions();
	};

	deleteEndingPosition = async (event) => {
		event.preventDefault();
		const db = firebase.firestore();
		const docId = this.state.endingPosition
			.trim()
			.toLowerCase()
			.replace(/\s/gi, "-");

		await db
			.collection("users")
			.doc(this.state.uid)
			.collection("positions")
			.doc(docId)
			.delete();

		this.showPositions();
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

	/////// RENDER //////
	render() {
		return (
			<div>
				<AddTechnique
					pushTechniqueToFirebase={this.pushTechniqueToFirebase}
					onChange={this.updateInput}
					startingPosition={this.state.startingPosition}
					topBottom={this.state.topBottom}
					offenseDefense={this.state.offenseDefense}
					addPosition={this.state.addPosition}
					addNewPosition={this.addNewPosition}
					endsInSubmission={this.state.endsInSubmission}
					endingPosition={this.state.endingPosition}
					fullname={this.state.fullname}
					uid={this.state.uid}
					positionsArray={this.state.positionsArray}
					deleteStartingPosition={this.deleteStartingPosition}
					deleteEndingPosition={this.deleteEndingPosition}
				></AddTechnique>
				<ShowFirebaseData
					data={this.state.firebaseData}
					deleteTechnique={this.deleteTechnique}
				></ShowFirebaseData>
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
			</div>
		);
	}
}

export default App;

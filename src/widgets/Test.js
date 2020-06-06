import React from "react";
import firebase from "./../firebase/firebaseConfig";

class Test extends React.Component {
	getFirestoreData = () => {
		const db = firebase.firestore();
		db.collection("TEST")
			.doc("testing")
			.get()
			.then((d) => {
				let data = d.data();
				console.log(data);
				return <p>{data}</p>;
			})
			.catch((e) => console.log(e));
	};

	render() {
		return (
			<div>
				<h1> the firestore data</h1>
				<p>{this.getFirestoreData()}</p>
			</div>
		);
	}
}

export default Test;

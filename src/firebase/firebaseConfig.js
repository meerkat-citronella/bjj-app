import React from "react";
import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyAE9cWlpl1ZTXwdP1RyXJrYi4Skac6OAUs",
	authDomain: "bjj-app-d003e.firebaseapp.com",
	databaseURL: "https://bjj-app-d003e.firebaseio.com",
	projectId: "bjj-app-d003e",
	storageBucket: "bjj-app-d003e.appspot.com",
	messagingSenderId: "1088700396353",
	appId: "1:1088700396353:web:0ebe4f3b405962ffa4a7c0",
	measurementId: "G-63GTX7CPSN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

import React from "react";

class ShowFirebaseData extends React.Component {
	render() {
		const firebaseData = this.props.data;

		let liArray = [];
		Array.isArray(firebaseData)
			? (liArray = firebaseData.map((item, i) => <li key={i}>{item}</li>))
			: (liArray = "");

		return (
			<div>
				<ul>{liArray}</ul>
			</div>
		);
	}
}

export default ShowFirebaseData;

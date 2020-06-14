import React from "react";

class ShowFirebaseData extends React.Component {
	render() {
		const firebaseData = this.props.data;

		let liArray = [];
		Array.isArray(firebaseData)
			? (liArray = firebaseData.map((item, i) => {
					const technique = JSON.parse(item);

					return (
						<li key={i}>
							{
								<ul>
									<li>
										<h3>{technique.fullname}</h3>
									</li>
									<li>ends in submission? {technique.endsInSubmission}</li>
									<li>offense or defenser? {technique.offenseDefense}</li>
									<li>starting position: {technique.startingPosition}</li>
									<li>top or bottom? {technique.topBottom}</li>
								</ul>
							}
						</li>
					);
			  }))
			: (liArray = "");

		return (
			<div>
				<ul>{liArray}</ul>
			</div>
		);
	}
}

export default ShowFirebaseData;

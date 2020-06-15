import React from "react";
import firebase from "firebase";

class ShowFirebaseData extends React.Component {
	render() {
		const firebaseData = this.props.data;

		let liArray = [];
		Array.isArray(firebaseData)
			? (liArray = firebaseData.map((item, i) => {
					const techniqueId = item.id;
					const technique = item.data();

					return (
						<li key={i} data-id={techniqueId}>
							{
								<ul>
									<li>
										<h3>{technique.fullname}</h3>
									</li>
									<li>{technique.offenseDefense}</li>
									<li>
										starting position: {technique.startingPosition},{" "}
										{technique.topBottom}
									</li>
									<li>ends in submission? {technique.endsInSubmission}</li>
									<li>ending position: {technique.endingPosition}</li>
									<li>
										<button
											data-id={techniqueId}
											onClick={this.props.deleteTechnique}
										>
											delete
										</button>
									</li>
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

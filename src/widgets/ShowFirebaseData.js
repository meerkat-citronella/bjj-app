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
									<li>{technique.offenseDefense}</li>
									<li>
										starting position: {technique.startingPosition},{" "}
										{technique.topBottom}
									</li>
									<li>ends in submission? {technique.endsInSubmission}</li>
									<li>ending position: {technique.endingPosition}</li>
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

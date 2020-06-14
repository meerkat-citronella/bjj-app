import React from "react";
import firebase from "firebase";
import "./../firebase/firebaseConfig";

class DynamicSelect extends React.Component {
	render() {
		const positionsArray = this.props.positionsArray;

		let optionsArray = [];
		if (Array.isArray(positionsArray)) {
			optionsArray = positionsArray.map((item) => {
				const position = JSON.parse(item).position;
				return <option value={position}>{position}</option>;
			});
		}

		return (
			<div>
				<h1>dynamic select</h1>
				<form onSubmit={this.props.addNewPosition}>
					<label>
						Add a new position:
						<input
							type="text"
							name="addPosition"
							placeholder="add a position"
							onChange={this.props.onChange}
							value={this.props.addPosition}
						></input>
					</label>
					<button type="submit">Add position</button>
				</form>
				<form>
					<label>
						Or, choose an existing position:
						<select
							name="startingPositionDYNAMICSELECT"
							value={this.props.startingPositionDYNAMICSELECT}
							onChange={this.props.onChange}
						>
							{optionsArray}
						</select>
					</label>
				</form>
			</div>
		);
	}
}

export default DynamicSelect;

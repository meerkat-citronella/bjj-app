import React from "react";

class AddTechnique extends React.Component {
	render() {
		let positionsArray = this.props.positionsArray;

		let optionsArray = [];
		if (Array.isArray(positionsArray)) {
			optionsArray = positionsArray.map((item) => {
				const position = JSON.parse(item).position;
				return <option value={position}>{position}</option>;
			});
		}

		return (
			<form>
				<div>
					<input
						type="text"
						name="fullname"
						placeholder="Full name"
						onChange={this.props.onChange}
						value={this.props.fullname}
					/>
				</div>
				<div>
					<label>
						<input
							type="radio"
							name="topBottom"
							value="top"
							checked={this.props.topBottom === "top"}
							onChange={this.props.onChange}
						></input>
						Top
					</label>
					<label>
						<input
							type="radio"
							name="topBottom"
							value="bottom"
							checked={this.props.topBottom === "bottom"}
							onChange={this.props.onChange}
						></input>
						Bottom
					</label>
				</div>
				<div>
					<label>
						Starting Position:
						<div>
							<select
								name="startingPosition"
								value={this.props.startingPosition}
								onChange={this.props.onChange}
								className="select"
								multiple
							>
								{optionsArray}
							</select>
						</div>
					</label>
				</div>
				<div>
					<label>
						Or, add a new position:
						<input
							type="tex"
							name="addPosition"
							placeholder="add a position"
							onChange={this.props.onChange}
							value={this.props.addPosition}
						></input>
					</label>
					<button onClick={this.props.addNewPosition}>Add position</button>
				</div>
				<div>
					<label>
						<input
							type="radio"
							name="offenseDefense"
							value="offense"
							checked={this.props.offenseDefense === "offense"}
							onChange={this.props.onChange}
						></input>
						Offense
					</label>
					<label>
						<input
							type="radio"
							name="offenseDefense"
							value="defense"
							checked={this.props.offenseDefense === "defense"}
							onChange={this.props.onChange}
						></input>
						Defense
					</label>
				</div>
				<div>
					Ends in submission?
					<label>
						<input
							type="radio"
							name="endsInSubmission"
							value="yes"
							checked={this.props.endsInSubmission === "yes"}
							onChange={this.props.onChange}
						></input>
						Yes
					</label>
					<label>
						<input
							type="radio"
							name="endsInSubmission"
							value="no"
							checked={this.props.endsInSubmission === "no"}
							onChange={this.props.onChange}
						></input>
						No
					</label>
				</div>
				<div>
					<label>
						Ending Position:
						<div>
							<select
								name="endingPosition"
								value={this.props.endingPosition}
								onChange={this.props.onChange}
								disabled={this.props.endsInSubmission === "yes" ? true : false}
								className="select"
								multiple
							>
								{optionsArray}
							</select>
						</div>
					</label>
				</div>
				<div>
					<button
						onClick={this.props.pushTechniqueToFirebase}
						disabled={this.props.uid !== "" ? false : true}
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default AddTechnique;

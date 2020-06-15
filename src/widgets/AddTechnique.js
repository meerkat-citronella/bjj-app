import React from "react";

class AddTechnique extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
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
						<select
							name="startingPosition"
							value={this.props.startingPosition}
							onChange={this.props.onChange}
						>
							<option value="choose">(choose)</option>
							<option value="closedGuard">Closed Guard</option>
							<option value="spiderGuard">Spider Guard</option>
							<option value="legLasso">Leg Lasso</option>
							<option value="sideControl">Side Control</option>
						</select>
					</label>
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
						<select
							name="endingPosition"
							value={this.props.endingPosition}
							onChange={this.props.onChange}
							disabled={this.props.endsInSubmission === "yes" ? true : false}
						>
							<option value="choose">(choose)</option>
							<option value="closedGuard">Closed Guard</option>
							<option value="spiderGuard">Spider Guard</option>
							<option value="legLasso">Leg Lasso</option>
							<option value="sideControl">Side Control</option>
						</select>
					</label>
				</div>
				<div>
					<button type="submit" disabled={this.props.uid !== "" ? false : true}>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default AddTechnique;

import React from "react";

class Test extends React.Component {
	render() {
		return (
			<div>
				<label>
					Position:
					<input
						type="text"
						placeholder="Enter a new position"
						autoComplete="off"
					></input>
				</label>
			</div>
		);
	}
}

import React from "react";

class LogOut extends React.Component {
	render() {
		return (
			<div>
				<p>
					<strong>Logout</strong>
					<form onSubmit={this.props.onSubmit}>
						<button
							type="submit"
							disabled={this.props.uid !== "" ? false : true}
						>
							Logout
						</button>
					</form>
				</p>
			</div>
		);
	}
}

export default LogOut;

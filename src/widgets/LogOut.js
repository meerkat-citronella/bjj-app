import React from "react";

class LogOut extends React.Component {
	render() {
		return (
			<div>
				<p>
					<strong>Logout</strong>
					<form
						onSubmit={this.props.onSubmit}
						disabled={this.props.signedIn ? false : true}
					>
						<button type="submit">Logout</button>
					</form>
				</p>
			</div>
		);
	}
}

export default LogOut;

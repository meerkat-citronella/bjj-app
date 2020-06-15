import React from "react";

class SignIn extends React.Component {
	render() {
		return (
			<div>
				<h2>Sign In</h2>
				<form onSubmit={this.props.onSubmit}>
					<input
						type="text"
						name="email"
						placeholder="email"
						onChange={this.props.onChange}
						value={this.props.email}
					></input>
					<input
						type="text"
						name="password"
						placeholder="password"
						onChange={this.props.onChange}
						value={this.props.password}
					></input>
					<button type="submit" disabled={this.props.uid !== "" ? true : false}>
						Sign In
					</button>
				</form>
			</div>
		);
	}
}

export default SignIn;

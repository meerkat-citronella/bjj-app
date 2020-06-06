import React from "react";

class User extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.addUser}>
				<input
					type="text"
					name="fullname"
					placeholder="Full Name"
					onChange={this.props.onChange}
					value={this.props.fullname}
				/>
				<input
					type="email"
					name="email"
					placeholder="email"
					onChange={this.props.onChange}
					value={this.props.email}
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default User;

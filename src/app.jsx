"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import FRC from "formsy-react-components";

window.addEventListener("load", () => {
	ReactDOM.render(<Component/>, document.getElementById("main"));
});

const Component = React.createClass({
	getInitialState() {
		return {
			selected: 1,
			form1: {
				text1: "text1",
				show: true,
				text2: "text2"
			},
			form2: {
				text1: "text1-2",
				show: true,
				text2: "text2-2"
			}
		};
	},
	onChanged(values) {
		const formName = `form${this.state.selected}`;
		console.log(`changing ${formName}`);
		console.log(values);
		this.setState({[formName]: values});
	},
	render() {
		const formData = this.state[`form${this.state.selected}`];
		return (
			<div>
				<p>This is a demonstration to a quirk in Formsy's onChange handling.</p>
				<p>You can use the select to switch between form 1 and form 2. The upper text input is always
					shown, and the lower is conditional to the checkbox</p>
				<p>You can see that if you only modify the texts, and change between the forms, everything works
					as expected</p>
				<p>But when you uncheck one of the checkbox and switch to the other form, the values are overwritten
				</p>
				<p>Steps to reproduce:</p>
				<ul>
					<li>Switch to form 2</li>
					<li>Notice that the text says text1-2</li>
					<li>Switch back to form 1</li>
					<li>Uncheck the checkbox</li>
					<li>Switch to form 2</li>
					<li>Notice that the text says text1</li>
				</ul>
				<select value={this.state.selected} onChange={(event) => {this.setState({selected: event.target.value})}}>
			 		<option value="1">1</option>	
			 		<option value="2">2</option>	
				</select>
				<Formsy.Form onChange={this.onChanged}>
					<FRC.Input name="text1" value={formData.text1}/>
					<FRC.Checkbox name="show" label="Show?" value={formData.show}/>
					{formData.show &&
						<FRC.Input name="text2" value={formData.text2}/>
					}

				</Formsy.Form>
			</div>
		);
	}
});


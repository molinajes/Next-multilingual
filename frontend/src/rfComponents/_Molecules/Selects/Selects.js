// Inspiration  http://blueprintjs.com/docs/#core/components/forms/select
// Inspired by the functionality not the appearance

import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import Select from "react-select";

import {Div} from 'glamorous';

@observer class Selects extends Component {
	static propTypes = {};

	render() {
		const options = [
			{ value: "All", label: "All" },
			{ value: "Approved", label: "Approved" },
			{ value: "Not approved", label: "Not approved" }
		];

		return (
			<Div width="8rem" fontSize="14px" height="32px">
				<Select
					name="requirement-approval-filter"
					value="draft"
					placeholder="Filter"
					options={options}
					// onChange={(e) => this.handleChange(e)}
					clearable={false}
				/>
			</Div>
		);
	}
}

export default Selects;
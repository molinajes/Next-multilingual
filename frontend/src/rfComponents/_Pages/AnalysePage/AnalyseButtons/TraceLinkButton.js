import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import { Div } from "glamorous";

import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";
import { _Palette } from "../../../_Utils/Colours";

import TraceDropdown from './TraceDropdown';

// @inject("uiStore")
@observer
class TraceLinkButton extends Component {
	static propTypes = {
		// uiStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
	}

	onClickButton = () => {
		const { data, componentType } = this.props;
		console.log(data.name, componentType);
		this.setState(prevState => ({
			active: !prevState.active
		}))
	};

	handleCloseMenu = () => {
		console.log('handling outside touch2')
		this.setState({
			active: false
		})
	}

	render() {
		const { componentType, data } = this.props;

		return (
			<Div position="relative">
				<RaisedButton
					css={{ padding: "4px", margin: "2px" }}
					colorScheme="Light"
					bgActiveColor={_Palette.OrangeInactive}
					iconColorScheme="TextInactive"
					size="MEDIUM"
					iconName={getIcon(componentType)}
					onClick={this.onClickButton}
				/>
				{/*this.state.active && <TraceDropdown data={data}/>*/}
				{this.state.active && <TraceDropdown handleCloseMenu={this.handleCloseMenu} parentData={data} componentType={componentType}/>}
			</Div>
		);
	}
}

export default TraceLinkButton;

const getIcon = type => {
	switch (type) {
		case "iface":
			return "np_interface";
		case "rule":
			return "np_businessRule";
		case "object":
			return "np_object";
		case "form":
			return "np_form";
		case "useCase":
			return "np_useCaseScreen";
		default:
			return "";
	}
};

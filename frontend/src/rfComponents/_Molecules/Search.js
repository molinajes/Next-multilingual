// Component for a search bar

import React, { Component, PropTypes } from 'react';
import Input from './Input';

import glamorous from "glamorous";
// import { _Palette } from "../_Utils/Colours";
// import { _Size } from "../_Utils/Sizing";
// import {_Shadow} from '../_Utils/Shadows';

import {observer, inject} from 'mobx-react';

const SearchBar = glamorous.div({
	// backgroundColor: _Palette.LightBg,
	// boxShadow: _Shadow.Size0,
	// padding: _Size.TINY,
	// borderRadius: _Size.TINY/2,
	// height: 25,
	// width: 180, // this is placeholder - width is set in the containing element 
	width: "100%",
},
	// props => propStyles(props)	

)


@inject('uiStore')
@observer
class Search extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		activityColor: PropTypes.string,
		fontSize: PropTypes.string,
		placeholder: PropTypes.string,
		colorScheme: PropTypes.string,
	}

	handleSearchChange = (value) => {
		const {uiStore} = this.props;
		uiStore.requirementSearchChange(value);
	}

	render() {
		const {colorScheme, fontSize, placeholder, uiStore} = this.props;

		return (
			<SearchBar>
				<Input
					// Need to set color to _Palette.TextWeak on default
					colorScheme={colorScheme}
					value={uiStore.requirementSearchInput}
					fontSize={fontSize} 
					placeholder={placeholder}
					onChange={this.handleSearchChange}
				/>
			</SearchBar>
		);
	}
}

export default Search;

// const propStyles = props => {
// 	let activityColor;
// 	if (props.isActive) {
// 		// can we get a border color 
// 		// 1px solid ActiveColor
// 	}
// }
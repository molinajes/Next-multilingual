// TODO: Make inputs great again | AjH
	// Add style to textarea so it cannot be resized
// Add colorScheme 
// add isEditing labelhint prompts for the user
	// previously people haven't known what to press or submit
	// existing padding bottom so the input doesn't jump 
	// when isEditing. 
// Create Glamorous form to contain the element? 


import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous from "glamorous";
// import { BodyText} from "../_Atoms/Headings";
import { _Palette } from "../_Utils/Colours";
import { _Size, _TextScale } from "../_Utils/Sizing";
import {LabelHint} from "../_Molecules/Labels/LabelHint";
// need to use a different method of the glamorous component
// factory so the text area and input elements can be switched via props
const InputStyled = glamorous.input(
	() => baseStyles(),
	props => propStyles(props)
);

const TextareaStyled = glamorous.textarea(
	() => baseStyles(),
	props => propStyles(props)
);

// const InputTitle = glamorous.input(
// 	{
// 		fontFamily: `"Source Sans Pro", Tahoma, sans-serif`, // TODO: Add this to input override in base styles | AjH
// 		lineHeight: 1.2,
// 		color: _Palette.TextActive, // TODO: How do we set this? | AjH
// 		width: "100%",
// 		// padding: '0.5rem'
// 	},
// 	props => propStyles(props)	
// );

const Form = glamorous.form(
	{
		width: '100%',
		display: "flex",
		flexDirection: "column",
		position: "relative"
	}
)

@observer class Input extends Component {
	static propTypes = {
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,

		isHovered: PropTypes.bool,
		isActive: PropTypes.bool,
		disabled: PropTypes.bool,
		autoSubmit: PropTypes.bool,
		autoFocus: PropTypes.bool,
		textarea: PropTypes.bool, // Changes element to textarea
		addPrompt: PropTypes.bool,
		autoClearOnSubmit: PropTypes.bool,
		transparent: PropTypes.bool,

		colorScheme: PropTypes.string,
		fontSize: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,

	};

	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			value: this.props.value
		};
	}

	componentDidMount = () => {
		if (this.props.autoFocus) {
			this.textInput.focus();
		}
	}

	onSubmitForm = (e) => {
		e.preventDefault();
		if (e.target.value !== this.props.value) {
			const fn = this.props.onSubmit;
			fn && fn(e.target.input.value);
		}
		this.setState(prevState => ({
			editing: false,
			value: this.props.autoClearOnSubmit ? '' : prevState.value
		}))

	}

	onChange = (e) => {
		if (this.props.disabled) return;
		
		this.setState({
			value: e.target.value,
			editing: true
		})

		const fn = this.props.onChange;
		fn && fn(e.target.value);
	}

	onBlur = (e) => {
		if (this.props.disabled) return;
  
		if (this.props.autoSubmit && (this.textInput.value !== this.props.value)) {
			console.log(this.textInput.value, this.props.value)
			const fn = this.props.onSubmit;
			fn && fn(this.textInput.value);
		}
		this.setState(prevState => ({
			editing: false,
			value: this.props.autoClearOnSubmit ? '' : prevState.value
		}))

		const fn = this.props.onBlur;
		fn && fn(e);
	}

	render() {
		const { addPrompt, colorScheme, textarea, placeholder, ...other } = this.props;

		let promptLabel =
			addPrompt &&
			this.state.editing &&
			<LabelHint 
				css={{right: "0", position: "absolute", bottom: "-16px"}}
				colorScheme={colorScheme}>
				tab or enter to submit
			</LabelHint>

		return (
			<Form
				onSubmit={this.onSubmitForm}
				// css={{backgroundColor: "aquamarine"}}
				// onKeyDown={this.handleKeyDown}
			>
				{textarea ? <TextareaStyled
					{...other}
					colorScheme={colorScheme}
					onChange={this.onChange}
					onBlur={this.onBlur}
					isEditing={this.state.editing}
					innerRef={ref => (this.textInput = ref)}
					value={this.state.value}
					name="input"
					placeholder={placeholder}
					type="text"
				/> 
				:
				<InputStyled
					{...other}
					colorScheme={colorScheme}
					onChange={this.onChange}
					onBlur={this.onBlur}
					isEditing={this.state.editing}
					innerRef={ref => (this.textInput = ref)}
					value={this.state.value}
					name="input"
					placeholder={placeholder}
					type="text"
				/>}
				{promptLabel}
			</Form>
		);
	}
}

export default Input;

const baseStyles = () => {
	return {
		lineHeight: 1.6, // this needs more consideration // how do we know to set lh: 1.6 when in use?
		borderRadius: "2px",
		color: _Palette.TextActive, // TODO: How do we set this? | AjH
		flex: "1",
		padding: _Size.TINY,
		// backgroundColor: _Palette.Light,
		boxShadow: `inset 0 0 1px ${_Palette.Shadow}`,
	};
};

const propStyles = props => {
	let textColor;
	if (props.isHovered) textColor = _Palette.TextInactive;
	if (props.isActive) textColor = _Palette.TextStrong;

	const fontSize = _TextScale[props.fontSize] || _TextScale.SMALL;

	const fontWeight = props.fontWeight;

	const bgColor = props.transparent ? null : _Palette.Light; 

	// Color scheme switch from base button :)
	let shadowColor;
	// Needs a default props on colorScheme or something similar so shadow doesn't get removed
	// shadowColor is repeating itself because a ` ` in the return overrides the style
	if (props.isEditing) {
	switch (props.colorScheme) {
		case "Yellow":
			shadowColor = `inset 0 0 2px ${_Palette.YellowStrong}`;
			break;
		case "Orange":
			shadowColor = `inset 0 0 2px ${_Palette.OrangeStrong}`;
			break;
		case "Mango":
			shadowColor = `inset 0 0 2px ${_Palette.MangoStrong}`;
			break;
		case "Primary":
		default:
			shadowColor = `inset 0 0 2px ${_Palette.PrimaryActive}`;
			break;
	} 
	}

	return {
		backgroundColor: bgColor,
		color: textColor,
		fontSize: fontSize,
		fontWeight: fontWeight,
		boxShadow: shadowColor,
	};
}

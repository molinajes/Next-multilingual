import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';

@observer
class InputField extends Component {
	static propTypes = {
		inputClass: PropTypes.string,
		formClass: PropTypes.string,
		divClass: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		editingText: PropTypes.string,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
		onKeyDown: PropTypes.func,
		iconicType: PropTypes.string,
		iconActiveColor: PropTypes.string,
		iconSize: PropTypes.string,
		disabled: PropTypes.bool
	};

	static defaultProps = {
		value: "",
		divClass: "inputField__div",
		editingText: 'editing',
		disabled: false
	}

	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			value: this.props.value
		}
	}

	componentWillReceiveProps = (nextProps) => {
		
		if (nextProps.value !== this.props.value) {
			this.state = {
				value: nextProps.value
			}
		}
	}

	handleSubmit = (e) => {
		
		e.preventDefault();
		if (e.target.value !== this.props.value) {
			this.props.onSubmit(e.target.input.value);
		}
		/*e.target.input.value = '';*/
	}

	handleChange = (e) => {
		if (!this.props.disabled) {
			this.setState({
				value: e.target.value,
				editing: true
			})
			if (this.props.onChange) {
				this.props.onChange(e);
			}
		}		
	}

	handleClick = () => {
		if (!this.props.disabled) {
			this.setState({
				editing: true
			})
			this.textInput.focus();
		}
	}

	handleBlur = () => {
		
		if (!this.props.disabled) {
			if (this.textInput.value !== this.props.value) {
				if (this.props.onSubmit) {
					this.props.onSubmit(this.textInput.value);				
				}
			}
			this.setState({
				editing: false
			})
		}
	}

	handleFocus = () => {
		if (!this.props.disabled) {
			this.setState({
				editing: true
			})
		}
	}

	handleKeyDown = (e) => {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(e);
		}
		/*if(e.keyCode === 27 ) { //Escape
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				value: this.props.value
			})
			this.textInput.blur();

		}*/
		if(e.keyCode === 13 ) { //enter
			
			e.preventDefault();
			e.stopPropagation();
			this.textInput.blur();
			// this.handleBlur();

		}
		/*if(e.keyCode === 9 ) { //tab
			e.preventDefault();
			e.stopPropagation();
			this.handleBlur();

		}*/
	}

	render() {
		const {inputClass, 
			formClass, 
			divClass, 
			placeholder, 
			label, 
			iconicType, 
			iconActiveColor, 
			iconSize,
			editingText
		} = this.props;

		let editingStyle = this.state.editing ? 'inputField--editing ' : '' ;

		let editableOutput = (
			<form 
				onSubmit={this.handleSubmit} 				
				style={{marginTop: '-0.125rem'}}
				className={formClass + ' defaultInputForm'} >
				
				<input 
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onKeyDown={this.handleKeyDown}
					onBlur={this.handleBlur}
					ref={(ref) => this.textInput = ref}
					value={this.state.value} 
					className={inputClass + ' defaultInput'}
					name="input"
					placeholder={placeholder}
					type="text" 
					/>
			</form>
		)		
		
		let showIcon = iconSize || iconActiveColor ||  iconicType;

		let labelText = '';
		if (this.state.editing && editingText !== '') {
			labelText = label + '- ' + editingText;
		}
		else {
			labelText = label;
		}

		return (
			<div className={editingStyle + divClass} onClick={this.handleClick}>
					{label ? <label>{labelText}</label> : null}
				<div style={{display: 'flex', paddingTop: '0.25rem'}}>
					{showIcon ? 
						<IconPositioned 
						iconSize={iconSize} 
						iconColor={this.state.editing ? iconActiveColor : 'primary'} 
						iconicType={iconicType}  />
						: ''}
					{editableOutput}
				</div>
			</div>
		)

		
	}
}

export default InputField;

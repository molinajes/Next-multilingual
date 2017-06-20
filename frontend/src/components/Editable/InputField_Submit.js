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
		editingText: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
		iconicType: PropTypes.string,
		iconActiveColor: PropTypes.string,
		iconSize: PropTypes.string,
		disabled: PropTypes.bool
	}

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

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.props.disabled) {
			if (e.target.input.value !== this.props.value) {
				this.props.onSubmit(e.target.input.value);
			}
			this.setState({
				value: "",
				editing: false
			})
		}
		
	}

	handleChange = (e) => {
		if (!this.props.disabled) {
			this.setState({
				value: e.target.value
			})
		}
	}

	handleClick = () => {
		this.setState({
			editing: true
		})
	}


	handleBlur = (e) => {

		if (e.target.value !== this.props.value) {
			this.props.onSubmit(e.target.value);
		}
		this.setState({
			editing: false
		})
		// this.props.onSubmit(e.target.value);
		this.textInput.blur();

	}

	handleKeyDown = (e) => {
		if(e.keyCode === 27 ) { //Escape
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				value: this.props.value
			})
			this.textInput.blur();

		}
	}

	render() {
		const {inputClass, formClass, divClass, placeholder, label, editingText, iconicType, iconActiveColor, iconSize} = this.props;

		let editingStyle = this.state.editing ? 'inputField--editing ' : '' ;

		let editableOutput = (
			<form 
				onSubmit={this.handleSubmit} 
				onKeyDown={this.handleKeyDown}
				style={{marginTop: '-0.125rem'}}
				className={formClass + ' defaultInputForm'} >
				
				<input 
					onChange={this.handleChange}
					// onBlur={this.handleBlur}
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
			<div className={editingStyle + divClass} onClick={this.handleClick} style={{width: '100%'}}>
					{label ? <label>{labelText}</label> : null}
				<div style={{display: 'flex', paddingTop: '0.25rem', width: '100%'}}>
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

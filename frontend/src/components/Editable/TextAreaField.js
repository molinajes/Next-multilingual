import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

@observer
class TextAreaField extends Component {
	static propTypes = {
		inputClass: PropTypes.string,
		formClass: PropTypes.string,
		divClass: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		editingText: PropTypes.string,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func.isRequired
	}

	static defaultProps = {
		value: "",
		inputClass: '',
		divClass: "inputField__div",
		editingText: 'editing'
	}

	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			value: this.props.value || ""
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value,
			editing: true
		});
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	handleClick = () => {
		this.setState({
			editing: true
		})
		this.textInput.focus();
	}



	handleBlur = () => {

		if (this.textInput.value !== this.props.value) {
			this.props.onSubmit(this.textInput.value);
		}
		this.setState({
			editing: false
		})
		// console.log('set state');
		// this.textInput.blur();


	}

	handleKeyDown = (e) => {
		/*if(e.keyCode === 27 ) { //Escape
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				value: this.props.value,
				editing: false
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
			// e.preventDefault();
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
			editingText
		} = this.props;

		let editingStyle = this.state.editing ? 'inputField--editing ' : '' ;



		let editableOutput = (
			<form 
			onSubmit={this.handleSubmit} 
			// onKeyDown={this.handleKeyDown}
			className={formClass + ' defaultInputForm'} >
				<textarea 
					onChange={this.handleChange}
					// onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					ref={(ref) => this.textInput = ref}
					value={this.state.value} 
					className={inputClass + ' defaultTextArea'}
					// rows={rows}
					name="input"
					placeholder={placeholder}
					style={{resize: 'none'}}
					type="text" 
					/>
			</form>
		)

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
					{editableOutput}
				</div>
			</div>
		)

		
	}
}

export default TextAreaField;

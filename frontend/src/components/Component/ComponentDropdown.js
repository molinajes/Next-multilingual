import React, { Component, PropTypes } from 'react';
// import onClickOutside from 'react-onclickoutside';

import ComponentDropdownLinkedItem from './ComponentDropdownLinkedItem';
import ComponentDropdownUnlinkedItem from './ComponentDropdownUnlinkedItem';

import {observer, inject} from 'mobx-react';

@inject('uiStore', 'traceStore', 'componentStore', 'stepObjectStore')
@observer
class ComponentDropdown extends Component {

	static propTypes= {
		linkedComponentsData: PropTypes.array.isRequired,
		parentType: PropTypes.string.isRequired,
		parentData: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired,
		uiStore: PropTypes.object.isRequired,
		traceStore: PropTypes.object.isRequired,
		componentStore: PropTypes.object.isRequired,
		stepObjectStore: PropTypes.object.isRequired,
		storeData: PropTypes.object.isRequired,
		handleCloseMenu: PropTypes.func.isRequired
	}

	componentDidMount = () => {
		if (this.dropDownInputRef) this.dropDownInputRef.focus();
		if (!document.addEventListener && document.attachEvent) {
			document.attachEvent('onclick', this.handleTouchOutside);
		} else {
			document.addEventListener('click', this.handleTouchOutside);
		}
	}

	handleTouchOutside = (e) => {
		
		if (this.wrapper && !this.wrapper.contains(e.target)) {
			
			this.props.handleCloseMenu();
			// this.closeMenu();
		}

	}

	handleClickWrapper = (e) => {
		e.stopPropagation();
		// Stops the propagation so the selector doesn't handle the click
	}

	componentWillUnmount = () => {
		const {uiStore} = this.props;
		uiStore.updateDropdownInput('');
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('onclick', this.handleTouchOutside);
		} else {
			document.removeEventListener('click', this.handleTouchOutside);
		}
	}

	onChange = (e) => {
		const {uiStore} = this.props;
		uiStore.updateDropdownInput(e.target.value);
    }
	
	onClickNewComponent = () => {
		
		const {uiStore, componentStore, traceStore, parentData, componentType, stepObjectStore} = this.props;
		if (!uiStore.dropdownInput || uiStore.dropdownInput === '') return;


		let joinType;
		if (parentData.object === '9') {
			joinType = '14';
		}
		if (parentData.object === '21') {
			joinType = '22';
		}
		componentStore.createAndLinkComponent(componentType, uiStore.dropdownInput, parentData.persistent_id, joinType)
		.then(res => {
			// console.log('res', res)
			if (parentData.object === '9' && res[1]) {  //if it is a step
				stepObjectStore.loadStepObject(res[1]);
				// console.log('newstepobject', newStepObject);
			}
			if (parentData.object === '21' && res[1]) {  //if it is a trace
				traceStore.loadTrace(res[1]);
				// console.log('newstepobject', newStepObject);
			}
		})
		.catch(() => {})  // This has been handled at lower levels.  Just ensures link/trace aren't created. JH


		// uiStore.updateComponentDropdownActive('');
		uiStore.updateDropdownInput('');
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 27) { //Escape
			e.preventDefault();
			this.props.handleCloseMenu();
		}
	}

	handleKeyDownOnInput = (e) => {
		if (e.keyCode === 38) {  // Up
			e.preventDefault();
			if (this.dropDownInputRef && this.dropDownInputRef.previousElementSibling) {
				this.dropDownInputRef.previousElementSibling.focus();
			}
		}

		else if (e.keyCode === 40) {  // Down
			e.preventDefault();
			/*if (this.dropDownInputRef && this.dropDownInputRef.nextElementSibling) {
				this.dropDownInputRef.nextElementSibling.focus();
			}*/
			if (this.newComponentRef) {
				this.newComponentRef.focus();
			}
			/*else {
				this.dropDownInputRef.parentElement.parentElement.nextElementSibling.focus();
			}*/
		}

		else if (e.keyCode === 13) {  //Enter
			// uiStore.updateComponentDropdownActive('');
			this.onClickNewComponent();
		}
	}

	handleKeyDownOnNewComponent = (e) => {
		if (e.keyCode === 13) {// Enter
			e.preventDefault();
			this.onClickNewComponent();
		}
		else if (e.keyCode === 38) {  // Up
			e.preventDefault();
			if (this.dropDownInputRef) this.dropDownInputRef.focus();
		}

		else if (e.keyCode === 40) {  // Down
			e.preventDefault();
			if (this.newComponentRef && this.newComponentRef.nextElementSibling) {
				this.newComponentRef.nextElementSibling.focus();
			}
		}
	}

	render() {
		
		const { uiStore, 
				storeData,
				linkedComponentsData,
				parentType,
				parentData,
				componentType} = this.props;
		

		let newComponent = (
			<div  
				className='componentDropdown__listItem'
				onClick={this.onClickNewComponent}
				tabIndex={"0"}
				onKeyDown={this.handleKeyDownOnNewComponent}
				ref={ref => this.newComponentRef = ref}
				>
				{(uiStore.dropdownInput.length > 0) ? 
					`Add "${uiStore.dropdownInput}"`
					:
					`Add/Search Above`
				}
			</div>
		)

		const linkedComponents = linkedComponentsData.filter((component) => {
			// Then show all unlinked components by search query
			if (uiStore.dropdownInput === '') return true;
			return component.name.toLowerCase().indexOf(uiStore.dropdownInput.toLowerCase()) !== -1;
		}).map((linkedComponent) => {
			// Linked component argument are traces
			const componentData = storeData.find((obj) => obj.persistent_id === linkedComponent.related1_id);
			let linkedComponentId = '';
			if (parentType === 'requirement' || parentType === 'detail') {
				linkedComponentId = linkedComponent.persistent_id.toString();
			}
			else if (parentType === 'step') {
				linkedComponentId = linkedComponent.persistent_id.toString();
			}
			else {
				console.error('Got an unknown type of component in Component Dropdown'); // TODO: Better Logging | JH
			}
			
			return <ComponentDropdownLinkedItem 
						componentType={componentType}
						componentData={componentData}
						parentType={parentType}
						linkedComponentId={linkedComponentId}
						key={linkedComponent.id}
					/>
		});
		

		const unlinkedComponents = storeData.filter((component) => {
			return !linkedComponentsData.some((linkedComponent) => {
				return linkedComponent.related1_id === component.persistent_id;
			})
		}).filter((component) => {
			// Then show all unlinked components by search query
			if (uiStore.dropdownInput === '') return true;
			return component.name.toLowerCase().indexOf(uiStore.dropdownInput.toLowerCase()) !== -1;
		}).map((componentData) => {
			let parentId;
			if (parentType === 'step' ) {
				parentId = parentData.persistent_id;
			}
			else {
				parentId = parentData.persistent_id;
			}
			return (
				<ComponentDropdownUnlinkedItem 
					componentType={componentType}
					componentData={componentData}
					componentId={componentData.persistent_id}
					parentId={parentId}
					parentType={parentType}
					key={componentData.persistent_id}
				/>
			)
		});
		
		return (
			<div className="componentDropdown" ref={ref => this.wrapper = ref} onClick={this.handleClickWrapper} onKeyDown={this.handleKeyDown}>
				<div className="componentDropdown__input">
						<form onSubmit={e => e.preventDefault()}>
							<input 
								onChange={this.onChange}
								onKeyDown={this.handleKeyDownOnInput}
								value={uiStore.dropdownInput} 
								className='' 
								type="text"
								placeholder='Add or search'
								ref={dropdownInput => this.dropDownInputRef = dropdownInput}
							/>
						</form>
				</div>
				{newComponent}
				{linkedComponents}
				{unlinkedComponents}
			</div>
		);
	}
}

export default ComponentDropdown;




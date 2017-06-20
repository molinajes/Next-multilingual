import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import LinkedRequirement from '../Requirement/LinkedRequirement';
import UnlinkedRequirement from '../Requirement/UnlinkedRequirement';

import getItemFromArray from '../../utils/getItemFromArray';

@inject('uiStore', 'requirementStore')
@observer
class RequirementsDropdown extends Component {
	static propTypes = {
		linkedTraces: PropTypes.array.isRequired,
		onClickOutSide: PropTypes.func.isRequired,
		requirementStore: PropTypes.object.isRequired,
		useCaseData: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		// this.dropDownInputRef.focus();
		if (!document.addEventListener && document.attachEvent) {
			document.attachEvent('onclick', this.handleTouchOutside);
		} else {
			document.addEventListener('click', this.handleTouchOutside);
		}
	}

	handleTouchOutside = (e) => {
		if (this.wrapper && !this.wrapper.contains(e.target)) {
			// console.log("Outside click");
			this.props.onClickOutSide();
			// this.closeMenu();
		}
		else {
			// console.log("Inside click");
		}
	}

	handleRequestCloseMenu = () => {
		this.props.onClickOutSide();
	}

	handleClickWrapper = (e) => {
		e.stopPropagation();
		// Stops the propagation so the selector doesn't handle the click
	}

	componentWillUnmount = () => {
		// const {uiStore} = this.props;
		// uiStore.updateDropdownInput('');
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('onclick', this.handleTouchOutside);
		} else {
			document.removeEventListener('click', this.handleTouchOutside);
		}
	}

	render() {
		const {requirementStore, useCaseData, linkedTraces} = this.props;


		// TODO: Tidy up this whole implementation.... | JH

		let linkedComponents = [];
		linkedTraces.forEach(trace => {
			let linkedBasic = getItemFromArray(requirementStore.requirementData, trace.parent_id);
			if (linkedBasic) {
				// console.log('linked req', linkedBasic);
				linkedComponents.push(<LinkedRequirement 
										key={linkedBasic.id} 
										reqData={linkedBasic} 
										traceId={trace.persistent_id}
										onRequestCloseMenu={this.handleRequestCloseMenu} />);
			}
			else {
				linkedBasic = getItemFromArray(requirementStore.detailData, trace.parent_id);
				if (linkedBasic) {
					// console.log('linked detail', linkedBasic);
					linkedComponents.push(<LinkedRequirement 
											key={linkedBasic.id} 
											reqData={linkedBasic} 
											traceId={trace.persistent_id} 
											onRequestCloseMenu={this.handleRequestCloseMenu}
											isDetail/>);
				}
			}
		})



		let unlinkedComponents = [];
		requirementStore.requirementData.forEach(req => {
			unlinkedComponents.push(<UnlinkedRequirement 
									key={req.id} 
									reqData={req} 
									useCaseData={useCaseData}
									onRequestCloseMenu={this.handleRequestCloseMenu}/>);
			// console.log('here')
			req.children.forEach(detail => {
				// console.log('here child')
				unlinkedComponents.push(<UnlinkedRequirement 
										key={detail.id} 
										reqData={detail} 
										useCaseData={useCaseData} 
										onRequestCloseMenu={this.handleRequestCloseMenu}
										isDetail />);
			})
		})

		/*const unlinkedComponents = traceStore.traceData.filter(trace => {
			return trace.parent_id === 
		})	*/



		return (
			<div className="componentDropdown" ref={ref => this.wrapper = ref} onClick={this.handleClickWrapper} onKeyDown={this.handleKeyDown}>
				{/*<input 
					// onChange={this.onChange}
					// onKeyDown={this.handleKeyDownOnInput}
					// value={uiStore.dropdownInput} 
					className='componentDropdown__input' 
					type="text"
					placeholder='This search doesnt work yet'
					ref={dropdownInput => this.dropDownInputRef = dropdownInput}
				/>*/}
				<p>Linked</p>
				{linkedComponents}
				<p>Requirements & Details</p>
				{unlinkedComponents}
			</div>
		);
	}
}

export default RequirementsDropdown;

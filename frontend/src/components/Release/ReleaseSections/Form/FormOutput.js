import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';

import IconPositioned from '../../../Iconic/IconPositioned';
import FormPropertyOutput from './FormPropertyOutput';
import getIconicName from '../../../../utils/getIconicName';

@inject('uiStore')
@observer
class FormOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		selected: PropTypes.bool
	}

	componentDidUpdate = () => {
		const {selected} = this.props;
		if (selected && this.wrapper) {
			console.log('wrapper', this.wrapper)
			window.wrapper = this.wrapper;
			window.scrollTo(0, this.wrapper.getBoundingClientRect().top-100);
		}
	}

	handleWaypointEnter = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('forms','')
	}

	handleClickEdit = () => {
		const { data, uiStore } = this.props;
		
		uiStore.setBottomBarDetails('form', data.persistent_id);
	}

	render() {
		const {data} = this.props;

		const formProperties = data.children.map(formProp => {
			return <FormPropertyOutput data={formProp} ref={ref => this.wrapper = ref} key={formProp.persistent_id}/>
		})

		let formTable; 

		let tableHead = (
					<div className=" formEditor__table formOuput__table">
						<div className="formEditor__tableHead">
							<div className="formEditor__cell">#</div>
							<div className="formEditor__cell">Field Name</div>
							<div className="formEditor__cell">Type</div>
							<div className="formEditor__cell">Validation</div>
							<div className="formEditor__cell">*</div>
							<div className="formEditor__cell">Description</div>
						</div>
					</div>
			)

		if (data.children.length) {
			formTable = (
				<div className="formEditor__sectionContent formOuput__sectionContent">
					{tableHead}
					{formProperties}
				</div>
			)
		}
		else if (!IS_EXTERNAL_RELEASE) {
			formTable = (
				<div className="formEditor__sectionContent formOuput__sectionContent">
					{tableHead}
					Add form properties
				</div>
			)
		}
 


		return (
			<div className="output__child releaseContent__componentGroup" id={"form_"+data.persistent_id}>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				<div className="output__componentTitle">
							<IconPositioned 
								iconSize="40"
								iconColor='orange'
								iconicType={'list-rich-sm'}/>
						<h3 className="rf-h3"><span className="rf-highlight">{data.number}&nbsp;</span>- {data.name}</h3>
					<h3 className="rf-h3"> </h3>
					{!IS_EXTERNAL_RELEASE && (
						<div className='releaseContent__editIcon' onClick={this.handleClickEdit}>
							<IconPositioned 
								iconSize="40" 
								iconicType={getIconicName('edit')} 
								iconHoverColor='orange'/>
						</div>
					)}
				</div>

				<h4 className="rf-h4">Description</h4>
				{data.text ? <p className="rf-p">{data.text}</p> : <p className="rf-p" style={{opacity: 0.5}}>(Empty Description)</p>}
				
				<div className="output__nestedComponent">
					{formTable}
				</div>
			</div>
		);
	}
}

export default FormOutput;

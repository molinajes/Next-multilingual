import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';

import ObjectPropertiesOutput from './ObjectPropertyOutput';
import IconPositioned from '../../../Iconic/IconPositioned';

import getIconicName from '../../../../utils/getIconicName';

@inject('uiStore')
@observer
class ObjectOutput extends Component {
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
		uiStore.setOutputScrollTo('objects','')
	}

	handleClickEdit = () => {
		const { data, uiStore } = this.props;
		
		uiStore.setBottomBarDetails('object', data.persistent_id);
	}

	render() {
		const {data} = this.props;

		const objectProperties = data.children.map(objectProp => {
			return <ObjectPropertiesOutput data={objectProp} parentNumber={data.number} key={objectProp.id}/>
		})

		let objectTable; 

		let tableHead = (
			<div className="objectEditor__tableHead">
				<div className="objectEditor__cell">#</div>
				<div className="objectEditor__cell">Object Property</div>
				<div className="objectEditor__cell">Description</div>
				<div className="objectEditor__cell"></div>
			</div>
			)

		if (data.children.length) {
			objectTable = (
				<div className="objectEditor__sectionContent objectOutput__sectionContent">
					<div className="objectEditor__table">
						{tableHead}
						{objectProperties}
					</div>
				</div>
			)
		}
		else if (!IS_EXTERNAL_RELEASE) {
			objectTable = (
				<div className="objectEditor__sectionContent objectOutput__sectionContent">
						<div className="objectEditor__table">
						{tableHead}
						<span style={{padding: '1rem'}}>No object properties</span>
					</div>
				</div>
			)
		}

		return (
			<div className="output__child releaseContent__componentGroup" ref={ref => this.wrapper = ref} id={"object_"+data.persistent_id}>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				<div className="output__componentTitle">
					<IconPositioned 
						iconSize="40"
						iconColor='orange' 
						iconicType={'connections-sm'}/>
					<h3 className="rf-h3"><span className="rf-highlight">{data.number}&nbsp;</span>- {data.name}</h3>
					{!IS_EXTERNAL_RELEASE && (
						<div className='releaseContent__editIcon' onClick={this.handleClickEdit}>
							<IconPositioned 
								iconSize="32" 
								iconicType={getIconicName('edit')} 
								iconHoverColor='orange'/>
						</div>
					)}
				</div>
 
				<h4 className="rf-h4">Description</h4>
				{data.text ? <p className="rf-p">{data.text}</p> : <p className="rf-p" style={{opacity: 0.5}}>(Empty Description)</p>}
				
				<div className="output__nestedComponent">
					{objectTable}
				</div>
			</div>
		);
	}
}

export default ObjectOutput;

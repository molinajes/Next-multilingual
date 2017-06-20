
import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Tooltip  from 'rc-tooltip';
import Select from 'react-select'

import IconPositioned from '../../Iconic/IconPositioned';

@inject('actorStore')
@observer
class MergeActorConfirmation extends Component {
	static propTypes = {
		actorStore: PropTypes.object.isRequired,
		toMergeId: PropTypes.string.isRequired,
		onMerge: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			selectedActor: ''
		}
	}

	handleClick = (e) => {
		e.stopPropagation();
		this.setState({
			open: this.state.open
		})
	}

	handleMerge = (value) => {
		this.props.onMerge(value);			
		
	}

	handleChange = (data) => {
		if (data.value !== '') {
			this.handleMerge(data.value)
		}
		
	}


	render() {
		const {actorStore, toMergeId} = this.props;

		const options = []
		actorStore.actorData.forEach(actor => {
			if (actor.persistent_id !== toMergeId) {
				options.push({
					value: actor.persistent_id,
					label: actor.name
				})
			}
		})
		

		const popup = (
			<div className="delete__popup">
				<p>Select Actor to merge with</p>
				<Select
					name=""
					value={this.state.selectedActor}
					options={options}
					onChange={(e) => this.handleChange(e)}
					onValueClick={e => e.preventDefault()}
					clearable={false}
				/>
				
				
			</div>
		)

		
		return (
			
				<Tooltip 
					placement="left" 
					trigger={['click']} 
					overlay={popup} 
					mouseEnterDelay={0.5}
					destroyTooltipOnHide={true} >
					{/*<div
						className={'delete__wrapper'} >
						{(this.state.open && toDelete.length) && popup }*/}
					<span className="delete__icon" onClick={this.handleClick}>
						<IconPositioned iconSize="40" iconicType={'random-sm'}  iconHoverColor='yellow' />
					</span>
				</Tooltip>
				
		
		);
	}
}

export default MergeActorConfirmation;






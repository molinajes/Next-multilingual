
import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import Tooltip  from 'rc-tooltip';

import IconPositioned from '../Iconic/IconPositioned';

// @inject('')
@observer
class DeleteObject extends Component {
	static propTypes = {
		data: PropTypes.object,
		onDelete: PropTypes.func.isRequired,
		confirmationMessage: PropTypes.string,
		icon: PropTypes.string

	}

	static defaultProps = {
		confirmationMessage: "Are you sure?",
		icon: "trash-sm"
	}

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	handleClick = (e) => {
		e.stopPropagation();
		this.setState({
			open: !this.state.open
		})
	}

	handleDelete = () => {
		this.props.onDelete();
	}


	render() {
		const {data, confirmationMessage, icon} = this.props;

		const toDelete = calculateChildren(data).map(obj => {
			return `${obj.number} ${obj.name}`;
		}).join(', ');

		const popup = (
			<div className="delete__popup">
				{toDelete.length ? `This will also delete: ${toDelete}.  ` : ''}
				{confirmationMessage}<br/>
				<button className="delete__buttons" onClick={this.handleDelete}>YES</button>
				
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
						<IconPositioned iconSize="40" iconicType={icon}  iconHoverColor='yellow' />
					</span>
				</Tooltip>
				
		
		);
	}
}

export default DeleteObject;


const calculateChildren = (data) => {
	if (!data) return [];
	let toDelete = [];
	let totalSteps = 0;
	switch (data.object) {
		case '2': //form
			if (data.children.length) {
				toDelete.push({
					name: "Form Property(ies)",
					number: data.children.length
				})
			}			
			break;
		case '5': // package
			if (data.children.length) {
				toDelete.push({
					name: "Use Case(s)",
					number: data.children.length
				});
				totalSteps = 0;
				data.children.forEach(useCase => {
					useCase.children.forEach(flow => {
						totalSteps += flow.children.length;
					})
				});
				if (totalSteps) {
					toDelete.push({
						name: "Steps",
						number: totalSteps
					})
				}
			}
			break;
		case '6': //object
			if (data.children.length) {
				toDelete.push({
					name: "Object Property(ies)",
					number: data.children.length
				})
			}
			break;
		case '8': //flow
			if (data.children.length) {
				toDelete.push({
					name: "Step(s)",
					number: data.children.length
				})
			}			
			break;
		case '10': //usecase
			if (data.children.length) {
				totalSteps = 0;
				data.children.forEach(flow => {
					totalSteps += flow.children.length;
				})
				if (totalSteps) {
					toDelete.push({
						name: "Step(s)",
						number: totalSteps
					})
				}
			}
			break;
		case '12': //object
			if (data.children.length) {
				toDelete.push({
					name: "Image(s)",
					number: data.children.length
				})
			}			
			break;
		case '21': //object
			if (data.children.length) {
				toDelete.push({
					name: "Requirements",
					number: data.children.length
				})
				totalSteps = 0;
				data.children.forEach(req => {
					totalSteps += req.children.length;
				})
				if (totalSteps) {
					toDelete.push({
						name: "Details",
						number: totalSteps
					})
				}
			}			
			break;
		default:
			break;
	}
	return toDelete;
}




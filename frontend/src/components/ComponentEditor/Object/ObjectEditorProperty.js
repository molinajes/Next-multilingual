import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import ObjectPropertyName from './ObjectPropertyName';
import ObjectPropertyDescription from './ObjectPropertyDescription.js';

import DeleteObject from '../../Delete/DeleteObject';

@inject('objectPropertyStore')
@observer
class ObjectEditorProperty extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		objectPropertyStore: PropTypes.object.isRequired
	}

	handleSubmitName = (value) => {
		const {data, objectPropertyStore} = this.props;
		objectPropertyStore.editObjectProperty(data, 'name', value)
	}

	handleSubmitDescription = (value) => {
		const {data, objectPropertyStore} = this.props;
		objectPropertyStore.editObjectProperty(data, 'text', value)
	}

	handleDelete = () => {
		const {data, objectPropertyStore} = this.props;
		objectPropertyStore.deleteObjectProperty(data);
	}

	render() {
		const {data} = this.props;
		return (
			<div className="objectEditor__row">
				<div className="objectEditor__cell">#</div>
				<div className="objectEditor__cell">
					<ObjectPropertyName data={data} onSubmit={this.handleSubmitName}/>					
				</div>
				<div className="objectEditor__cell">
					<ObjectPropertyDescription data={data} onSubmit={this.handleSubmitDescription}/>				
				</div>
				<div className="objectEditor__cell">
					<DeleteObject 
						onDelete={this.handleDelete} />
				</div>
			</div>
		);
	}
}

export default ObjectEditorProperty;

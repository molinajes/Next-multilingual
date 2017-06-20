import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';


@inject('objectPropertyStore')
@observer
class CreateObjectProperty extends Component {

	static propTypes = {
		objectPropertyStore: PropTypes.object.isRequired,
		objectId: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired
	}

	handleClickCreate = () => {
		const {objectPropertyStore, objectId, number} = this.props;
		objectPropertyStore.createObjectProperty(objectId, number);
	}

	render() {
		
		return (
			<div className="objectEditor__row" onClick={this.handleClickCreate}>
				<div className="objectEditor__cell objectEditor__cell--text">+</div>
				<div className="objectEditor__addRowCell">Create a new object property</div>
			</div>
		);
	}
}

export default CreateObjectProperty;

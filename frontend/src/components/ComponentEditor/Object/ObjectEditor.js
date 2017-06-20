import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../../Iconic/IconPositioned';
import ObjectEditorProperty from './ObjectEditorProperty';
import CreateObjectProperty from './CreateObjectProperty';

@inject('uiStore')
@observer
class ObjectEditor extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired
	}

	handleClickDelete = () => {

	}

	render() {
		const {componentData} = this.props;
		const objectProperties = componentData.children.map(objectProp => {
			return <ObjectEditorProperty data={objectProp} key={objectProp.persistent_id}/>
		})

		return (
			<div className="objectEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType='connections-sm'  />
					Define your object properties below

				</div>
				<div className="objectEditor__sectionContent">
					<div className="objectEditor__table">
						<div className="objectEditor__tableHead">
							<div className="objectEditor__cell">#</div>
							<div className="objectEditor__cell">Object Property</div>
							<div className="objectEditor__cell">Description</div>
							<div className="objectEditor__cell"></div>
						</div>
						{objectProperties}
						<CreateObjectProperty objectId={componentData.persistent_id} number={componentData.children.length + 1}/>
					</div>
				</div>
			</div>
		);
	}
}

export default ObjectEditor;

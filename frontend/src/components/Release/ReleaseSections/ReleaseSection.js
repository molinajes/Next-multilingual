import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';

import IconPositioned from '../../Iconic/IconPositioned';
import RichTextEditor from 'react-rte';
import InputField_Auto from '../../Editable/InputField_Auto';
import DeleteObject from '../../Delete/DeleteObject';

import getIconicName from '../../../utils/getIconicName';
// import { ContentState, EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const toolbarConfig = {
	// Optionally specify the groups to display (displayed in the order listed).
	display: 
		['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
		INLINE_STYLE_BUTTONS: [
			{label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
			{label: 'Italic', style: 'ITALIC'},
			{label: 'Underline', style: 'UNDERLINE'}
		],
		BLOCK_TYPE_DROPDOWN: [
			{label: 'Normal', style: 'unstyled'},
			{label: 'H1', style: 'header-one'},
			{label: 'H2', style: 'header-two'},
			{label: 'H3', style: 'header-three'}
		],
		BLOCK_TYPE_BUTTONS: [
			{label: 'UL', style: 'unordered-list-item'},
			{label: 'OL', style: 'ordered-list-item'}
		]
};

const styleMap = {
	root: {
		fontFamily: '\'monospace\', serif',
		fontSize: 45,
		padding: 20,
		width: 600,
	}
}


@inject('uiStore', 'categoryStore')
@observer
class ReleaseCreateSection extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		categoryStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			value: RichTextEditor.createValueFromString(props.data.text, 'html'),
			readOnly: true
		}
	}

	handleWaypointEnter = () => {
		const {uiStore, data} = this.props;
		uiStore.setOutputScrollTo('category', data.persistent_id)
	}

	handleSave = () => {
		const {categoryStore, data} = this.props;
		categoryStore.editCategory(data.persistent_id, 'text', this.state.value.toString('html'))		
		
		this.setState({
			readOnly: true
		})
	}

	handleSubmitName = (value) => {
		const {categoryStore, data} = this.props;
		categoryStore.editCategory(data.persistent_id, 'name', value)
	}

	handleDelete = () => {
		const {categoryStore, data} = this.props;
		categoryStore.deleteCategory(data.persistent_id);
	}

	handleEdit = () => {
		this.setState({
			readOnly: false
		})
	}

	onChange = (value) => {
		this.setState({
			value: value
		})
	}

	render() {
		const {data} = this.props;
		const {value, readOnly} = this.state;
		return (
			<div className="releaseContent__container" 
				id={"category_" + data.persistent_id}
			>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				{!IS_EXTERNAL_RELEASE ? (
					<div className="releaseContent__header">
							
						<InputField_Auto
							value={data.name}
							onSubmit={this.handleSubmitName}
							placeholder={"Name this section here"}
							divClass={"reqModel__title"}
							inputClass={"reqSection__title"}
							formClass={""}
						/>
						{this.state.readOnly ?
							<IconPositioned 
								onClick={this.handleEdit}
								iconSize='40' 
								iconicType={getIconicName('edit2')}
								iconHoverColor='yellow'  />
							:
							<IconPositioned 
								onClick={this.handleSave}
								iconSize='40' 
								iconicType={getIconicName('save')}
								iconHoverColor='yellow'  />
						}										
						<DeleteObject 
							onDelete={this.handleDelete}
							data={data} />
					</div>
				)
				:
				(
					<div className="releaseContent__header">
						<h2 className="rf-h2">{data.name}</h2>
					</div>
				)
				}	

				<div className="releaseContent__componentGroup">
				{!this.state.readOnly && <div className="releaseContent__rte--editing">Editing:</div>}
				<RichTextEditor
					value={value}
					onChange={this.onChange}
					toolbarConfig={toolbarConfig}
					customStyleMap={styleMap}
					readOnly={readOnly}
					className={`releaseContent__rte${this.state.readOnly ? '' : ' releaseContent__editing'}`}
				/>
				</div>
				
			</div>
		);
	}
}

export default ReleaseCreateSection;

import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Dropzone from 'react-dropzone';
// import IconicIcon from '../../Iconic/IconicIcon';
import IconPositioned from '../../Iconic/IconPositioned';

import DeleteObject from '../../Delete/DeleteObject';

// import Select from 'react-select';
// import axios from 'axios';

@inject('uiStore', 'imageStore', 'ifaceTypeStore', 'ifaceStore')
@observer
class IfaceEditor extends Component {
	static propTypes = {
		componentData: PropTypes.object.isRequired,
		divClass: PropTypes.string.isRequired,
		imageStore: PropTypes.object.isRequired,
		ifaceStore: PropTypes.object.isRequired,
		ifaceTypeStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			isUploading: false
		}
	}

	handleDelete = (image) => {
		const {imageStore} = this.props;
		imageStore.deleteImage(image);
	}

	handleChangeType = (data) => {		
		const {ifaceStore, componentData} = this.props;
		console.log(data)
		ifaceStore.editIface(componentData.persistent_id, 'related1_id', data.value);
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		if (!ENV_PRODUCTION) return;
		const {componentData, imageStore} = this.props;
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);

		this.setState({
			images: acceptedFiles,
			isUploading: true
		})

		var form_data = new FormData();

		// console.log('type', typeof acceptedFiles[0])
		form_data.append('fileToUpload',acceptedFiles[0],acceptedFiles[0].name);
		// console.log('image form data', form_data)

		$.ajax({
			url: '/app/component/reactimage?parent_id=' + componentData.persistent_id, // point to server-side PHP script 
			dataType: 'text',  // what to expect back from the PHP script, if anything
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,                         
			type: 'post',
			success: (response) => {
				console.log(response); // display response from the PHP script, if any
				window.response = response;
				var output = JSON.parse(response).content.content
				// console.log(output);
				imageStore.loadImage(output);
				this.setState({
					isUploading: false
				})

			}
		});
	}

	render() {
		const {componentData, ifaceTypeStore, divClass} = this.props;

		const images = componentData.children.map(image => {
			return (
				<div key={image.id}>
					<img src={`/app/images/${image.name}`} />
					<DeleteObject onDelete={() => this.handleDelete(image)} />
					
				</div>
			)
		});

		let output = images.length ?
		images
		: 
		<Dropzone style={{}} onDrop={this.onDrop} multiple={false}>
			<div className="interfaceEditor__dropzone">
				<IconPositioned 
				iconSize='56' 
				iconColor='mango'
				iconicType='iphone-lg'  />
				<div className="interfaceEditor__dropzoneTitle">
					Drag and drop a file here, or click to select file to upload.
				</div>
					<IconPositioned 
					iconSize='56' 
					iconColor='mango'
					iconicType='laptop-lg'  />
			</div>
		</Dropzone>

		if (this.state.isUploading) {
			output = <h1>Uploading file...</h1>
		}

		const options = []
		ifaceTypeStore.ifaceTypeData.forEach(ifaceType => {
			options.push({
				value: ifaceType.persistent_id,
				label: ifaceType.name
			})
		})

		return (
			<div className={divClass}>
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType='laptop-sm'  />
					Upload an interface

				</div>
				<div className="componentEditorModal__sectionContent--centered">
					<div className="componentEditor__image">
						{output}
					</div>
				</div>				
			</div>
		);
	}
}

export default IfaceEditor;

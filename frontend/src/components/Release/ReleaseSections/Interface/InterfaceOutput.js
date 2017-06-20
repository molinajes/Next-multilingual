import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

import IconPositioned from '../../../Iconic/IconPositioned';
import getIconicName from '../../../../utils/getIconicName';


@inject('uiStore', 'imageStore')
@observer
class InterfaceOutput extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		imageStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	}

	handleWaypointEnter = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('interfaces','')
	}

	handleClickEdit = () => {
		const {uiStore, data} = this.props;
		uiStore.setBottomBarDetails('iface', data.persistent_id);
	}

	handleResize = (callback, persistentId) => {
		const {imageStore} = this.props;
		imageStore.editImage(persistentId, 'text2', `${this.imageElement.offsetWidth},${this.imageElement.offsetHeight}`)
	}

	render() {
		const {data} = this.props;

		const images = data.children.map(image => {
			let dimensions = {x: null, y: null};
			// TODO: Make this code more robust and intuitive | JH
			if (image.text2) {
				const splitDimensions = image.text2.split(',');
				
				dimensions.x = parseFloat(splitDimensions[0]);
				dimensions.y = parseFloat(splitDimensions[1]);					
				
				if (isNaN(dimensions.x)) {
					// need to get the image dimensions since they weren't in the db
					var img = new Image();

					img.onload = function(){
						var width = img.width;
						var height = img.height;
						dimensions = {x: width, y: height};
					}

					img.src = "/app/images/" + image.name;
				}
			
			}
			else {
				img = new Image();

				img.onload = function(){
					var width = img.width;
					var height = img.height;
					dimensions = {x: width, y: height};
					console.log({dimensions})
				}

				img.src = "/app/images/" + image.name;
			}

			if (IS_EXTERNAL_RELEASE) {
				return (
					<img
						style={{width: dimensions.x || 200, height: dimensions.y || 200}}
						src={"/app/images/" + image.name} 
						className="ifaceOutput__image" 
						ref={ref => this.imageElement = ref} />
				)
			}
			else {
				return (
					<ResizableBox 
						key={image.persistent_id}
						width={dimensions.x || 200} 
						height={dimensions.y || 200}
						maxConstraints={[500, 500]}
						onResizeStop={(e, data) => this.handleResize(data, image.persistent_id)}
						lockAspectRatio={true}
						
					>
						<img 
							src={"/app/images/" + image.name} 
							className="ifaceOutput__image" 
							ref={ref => this.imageElement = ref} />
					</ResizableBox>
				)
			}
			
		})

		let imageBlock;
		if (data.children.length) {
			imageBlock = (
					images
				)
		}
		else {
			imageBlock = (
				<div className="ifaceOutput__image" style={{opacity: 0.5}}>
					No Image
					<IconPositioned 
						iconSize="56" 
						iconicType={'laptop-lg'}/>
				</div>
				)
		}

		return (
			<div className="output__child releaseContent__componentGroup" id={"iface_"+data.persistent_id}>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				<div className="output__componentTitle">

						<div className="output__inlineIcon">
							<IconPositioned 
								iconSize="40"
								iconColor='orange' 
								iconicType={'laptop-sm'}/>
						</div>
						<h3 className="rf-h3"><span className="rf-highlight">{data.number} </span>&nbsp;- {data.name}</h3>
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
				{/*<h4 className="rf-h4">Interface Image</h4>*/}
				<div className="output__nestedComponent">
					{imageBlock}
				</div>
			</div>
		);
	}
}

export default InterfaceOutput;

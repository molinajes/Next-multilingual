import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';

const iconList = [
	'bug', 
	'screenshot', 
	'fire', 
	'chat', 
	'radiation', 
	'ratio',
	'puzzle-piece',
	'rocket',
	'rss',
	'settings',
	'shield',
	'star-empty',
	'tag',
	'terminal',
	'vertical-align-bottom',
	'video',
	'aperture',
	'audio-spectrum',
	'beaker',
	'briefcase',
	'brush',
	'calendar',
	'camera-rangefinder',
	'cart',
	'cloud',
	'compass',
	'cpu',
	'dollar',
	'euro',
	'british-pound',
	'easel',
	'envelope-closed',
	'eye-open',
	'firefly',
	'flag',
	'game-controller',
	'globe',
	'graph',
	'headphones',
	'home',
	'image-landscape',
	'lightbulb-alt-on',
	'map',
	'microphone',
	'network',
	'palette',
	'paperclip',
	'people',
	'pie-chart',
];

@inject('projectStore', 'mainStore')
@observer
class ProjectIconSelector extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpened: false
		}
	}

	handleSubmit = (value) => {
		const {projectStore, mainStore} = this.props;
		projectStore.editProjectDetails('project_icon', value);
		mainStore.getMetaData();  // so that the icon will be updated if the user returns to the index page
		this.setState({
			isOpened: false
		})
	}

	handleClick = () => {
		const {isOpened} = this.state;
		this.setState({
			isOpened: !isOpened
		})
	}

	renderDropdown = () => {
		const icons = iconList.map(icon => {
			return (
				<IconPositioned 
					iconSize='56' 
					iconicType={icon + "-md"}
					onClick={() => this.handleSubmit(icon)}
					className="iconDropdown__icon"
					key={icon}
				/>
			)
		})
		return (
			<div className="iconDropdown__dropdown">				
				<div className="iconDropdown__container">
					{icons}
				</div>
			</div>
		)
	}

	render() {
		const {projectStore} = this.props;
		const {isOpened} = this.state;

		return (
			<div className="overviewEditor__iconSelector">
				<p>Select an icon for this project</p>
				<IconPositioned 
					iconSize='56' 
					iconicType={`${projectStore.projectDetails.project_icon || 'fire'}-md`}
					onClick={this.handleClick}
				/>
				{isOpened && this.renderDropdown()}
			</div>
		);
	}
}

export default ProjectIconSelector;

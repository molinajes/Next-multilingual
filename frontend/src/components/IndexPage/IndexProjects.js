import React, { Component, PropTypes } from 'react';

import ProjectTile from './ProjectTile';

class IndexProjects extends Component {
	static propTypes = {
		data: PropTypes.object,
		color: PropTypes.string,
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string,
		rightAlignment: PropTypes.bool,
		linkText: PropTypes.string,
		children: PropTypes.node
	};

	static defaultProps = {
		color: 'primary'
	}

	constructor(props) {
		super(props);
		this.state = {
			numberToDisplay: 8
		}
	}

	handleClickSeeMore = () => {
		this.setState({
			numberToDisplay: Infinity
		})
	}

	render() {
		const {title, subtitle, rightAlignment, linkText, data} = this.props;	

		const rightAlignmentClass = rightAlignment ? 'indexProjects--rightAlign' : ' ';

		let projectList;
		let marginBottom = ''
		if (data) {
			projectList = data.map(project => {
				return <ProjectTile data={project} icon={project.icon ? project.icon : 'fire'} key={project.id} />
			})
			.filter((project, index) => {
				return index < this.state.numberToDisplay
			})

			marginBottom = projectList.length ? '' : 0;
		} 

		return (
			<div className={'indexProjects ' + rightAlignmentClass} style={{marginBottom}}>
				<div className="indexProjects--container">
					<div className="indexProjects__title">{title}</div>
					{subtitle !== '' && <div className="indexProjects__subtitle">{subtitle}</div>}
					<div className="indexProjects__divider"></div>
						
					<div className="indexProjects__contents">
						{this.props.children}
						{projectList}
					</div>
						{(linkText && (data.length > this.state.numberToDisplay)) ? 
							<div className="indexProjects__link" onClick={this.handleClickSeeMore}>{linkText}</div>
							: ''}
				</div>
			</div>
		);
	}
}

export default IndexProjects;

import React, { Component, PropTypes } from 'react';
// import IconPositioned from '../Iconic/IconPositioned';
import LibraryTag from '../Library/LibraryTag';

import tagReference from '../../assets/tagReference.json';


class IndexFeature extends Component {
	static propTypes = {
		color: PropTypes.string,
		data: PropTypes.object.isRequired,
		icon: PropTypes.string,
		fullWidth: PropTypes.bool,
		buttonText: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		children: PropTypes.node
	};

	static defaultProps = {
		color: 'primary',
		fullWidth: false,
		icon: 'tools-sm'
	}

	render() {
		const {data, fullWidth} = this.props;	

		const indexFeatureClass = fullWidth ? 'indexFeature--fullWidth' : 'indexFeature';		

		let tags;
		if (data.tags) {
			tags = data.tags.split(',');
		}

		let tagsList = [];
		if (tags) {
			tagsList = tags.reduce((output, tag) => {
				if (tagReference[tag]) {
					return output.concat(<LibraryTag key={tag} data={tagReference[tag]} />);
				}
			}, [])
		}

		return (
			<div className={indexFeatureClass} onClick={this.props.onClick}>
				<div className="indexFeature__content">
					<div className="projectDetail__header">
						<div className="projectDetail__titles">
							<h1 className="projectDetail__projectTitle">{data.name}</h1>
							<h3 className="projectDetail__description">{data.description}</h3>
						</div>
						{this.props.children}
					</div>
					<div className="projectDetail__tags">
						{tagsList}
					</div>
				</div>
			</div>
		);
	}
}

export default IndexFeature;

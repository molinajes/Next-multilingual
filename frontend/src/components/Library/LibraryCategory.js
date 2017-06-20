import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import LibraryItem from '../Library/LibraryItem';


// @inject('libraryStore')
@observer
class CreateProject extends Component {

	static propTypes = {
		categoryName: PropTypes.string.isRequired,
		categoryItems: PropTypes.object.isRequired,
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

	render() {
		const {categoryItems, categoryName, subtitle, rightAlignment, linkText} = this.props;

		const rightAlignmentClass = rightAlignment ? 'indexProjects--rightAlign' : ' ';

		const libraryItems = categoryItems.map(item => {
			return (
				<LibraryItem data={item} key={item.id} /> 
			)
		})

		return (
			<div className={'indexProjects ' + rightAlignmentClass}>
				<div className="indexProjects--container">
					<div className="indexProjects__title">{categoryName}</div>
					<div className="indexProjects__subtitle">{subtitle}</div>
					<div className="indexProjects__divider"></div>
						
					<div className="indexProjects__contents">
						{this.props.children}
						{libraryItems}
					</div>
						{linkText ? 
							<div className="indexProjects__link">{linkText}</div>
							: ''}
				</div>
			{/*<div className="createProject__category">
				<div className="category__heading">{categoryName}</div>
				<div className="category__list">
					{libraryItems}
				</div>
				<div className="indexPage__section__link--mango"><a>Browse More From This Category</a></div>
			</div>			*/}
			</div>

		);
	}
}

export default CreateProject;

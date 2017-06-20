import React, { Component, PropTypes } from 'react';
// import {Link} from 'react-router';
import IconPositioned from '../Iconic/IconPositioned';
import {observer, inject} from 'mobx-react';

// const prefix = IS_EXTERNAL_RELEASE ? "/" : "/app/output";

@inject('uiStore')
@observer
class ReleaseNavigationItem extends Component {
	static propTypes = {
		children: PropTypes.object,
		name: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		uiStore: PropTypes.object.isRequired,
		useCasePackageItem: PropTypes.bool,
		id: PropTypes.string
	}

	static defaultProps = {
		id: ''
	}

	scrollTo = () => {
		const {slug, id} = this.props;
		let element;
		if (id && slug === 'package') {
			element = document.getElementById('package_' + id);
		}
		else if (id && slug === 'category') {
			element = document.getElementById('category_' + id);
		}
		else {
			element = document.getElementById(slug);	
		}
		if (element) {
			element.scrollIntoView({behavior: "smooth"});
			window.scrollBy(0, -100);
		}

	}


	render() {
		const {name, useCasePackageItem, slug, icon, children, uiStore, id} = this.props;

		let packageClass = (name === "Packages" ? " releaseNavigation__item--packages" : ''); 

		let activeClass = uiStore.outputScrollTo.type === slug;
		
		if (uiStore.outputScrollTo.type === 'package' && uiStore.outputScrollTo.id !== id) {
			activeClass = false;
		}

		if (uiStore.outputScrollTo.type === 'category' && uiStore.outputScrollTo.id !== id) {
			// terrible logic these last two lines...
			activeClass = false;
		}

		return (
			<div className={"releaseNavigation__item" + packageClass + (activeClass ? ' releaseNavigation__item--active' : '')} >
				<IconPositioned 
					iconSize={useCasePackageItem ? "24" : '40'} 
					iconicType={icon} />
				{/*<Link to={linkTo}>*/}
					<div onClick={this.scrollTo} className="releaseNavigation__title">{name}</div>
				{/*</Link>*/}
				{children}
			</div>
		)
	}
}

export default ReleaseNavigationItem;

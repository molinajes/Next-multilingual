import React, { Component, PropTypes } from 'react';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import glamorous from 'glamorous'
glamorous.config.useDisplayNameInClassName = true;

import Nav from './Nav/Nav';
// import IndexNav from './Nav/IndexNav';
import Loading from './Loading/Loading';
import ComponentEditorModal from './ComponentEditor/ComponentEditorModal';
import HelpModal from './HelpContent/HelpModal';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import '../styles/main.scss';
import '../../node_modules/rc-tooltip/assets/bootstrap.css';


@inject('uiStore', 'mainStore')
@DragDropContext(HTML5Backend)
@withRouter
@observer
export default class Main extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired,
		children: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired
	}

	componentWillMount = () => {
		const {mainStore, uiStore, router} = this.props;

		uiStore.router = router;
		// window.router = this.props.router;

		if (!mainStore.appStores.some(store => {
			return store.length > 0;
		})) {
			uiStore.setIsLoadingData(true);
			axios.all([
				mainStore.getMetaData(),
				mainStore.getInitialData(null)
			])
			.then(() => {
				uiStore.setIsLoadingData(false);
			})			
		}
		
	}

	componentDidUpdate = (nextProps) => {
		const {uiStore} = this.props;
		
		if (!uiStore.tutorialActive && nextProps.uiStore.tutorialActive) {
			runTutorial();
		}
	}

	render() {
		const {uiStore} = this.props;

		return (
			
				<div className="app">
					{/*<DevTools />*/}
					<Nav />						
					<div className="main__container">
						{uiStore.isLoadingData ? <Loading /> : (
							this.props.children
						)}
					</div>
					{!uiStore.isLoadingData && <ComponentEditorModal />}
					{!uiStore.isLoadingData && <HelpModal />}
				</div>
			
		);
	}
}

const runTutorial = () => {
	console.log('yep')
}

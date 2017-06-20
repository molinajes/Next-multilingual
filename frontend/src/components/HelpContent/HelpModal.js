import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'react-modal';

import tutorialContent from '../../assets/tutorialContent';


@inject('uiStore')
@observer
class HelpModal extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}



	addKeyListener = () => {
		window.addEventListener('keyup', this.handleArrowKey)
	}

	removeKeyListener = () => {
		window.removeEventListener('keyup', this.handleArrowKey)
	}

	handleArrowKey = (e) => {
		if (e.keyCode === 37) {
			this.handlePrevious();
		}
		else if (e.keyCode === 39) {
			this.handleNext();
		}
	}

	handleClose = () => {
		// const {uiStore} = this.props;

		this.removeKeyListener();
	}

	handleQuit = () => {
		const {uiStore} = this.props;
		uiStore.quitTutorial();
		this.handleClose();
	}

	handleNext = () => {
		const {uiStore} = this.props;
		if (!uiStore.nextTutorial(true)) {
			this.handleClose();
		}
	}

	handlePrevious = () => {
		const {uiStore} = this.props;
		if (!uiStore.nextTutorial(false)) {
			this.handleClose();
		}
	}

	render() {
		const {uiStore} = this.props;

		let helpPos;
		let modalPosition = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}

		if (uiStore.helpContentTarget !== ''){
			helpPos = uiStore.helpContentTarget.getBoundingClientRect();
			if (helpPos.height === 0 && helpPos.width === 0) {
				// Don't render the modal if the target is not rendered
				return null;
			}

			const windowHeight = window.innerHeight;
			const windowWidth = window.innerWidth;

			if (helpPos.right < (windowWidth / 2)) {
				modalPosition.left = helpPos.right;
				// modalPosition.right = 40;
			} else {
				// modalPosition.left = 40;
				modalPosition.right = (windowWidth - helpPos.left);
			}

			if (helpPos.bottom < (windowHeight / 2)) {
				modalPosition.top = helpPos.bottom;
				// modalPosition.bottom = 40;
			} else {
				// modalPosition.top = 40;
				modalPosition.bottom = windowHeight - helpPos.top;
			}
		}


		const customStyles = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(255, 255, 255, 0.75)'
			},
			content : {
				position                   : 'absolute',
				top            				: modalPosition.top || 'auto',
				left           				: modalPosition.left || 'auto',
				right          				: modalPosition.right || 'auto',
				bottom         				: modalPosition.bottom || 'auto',
				border                     : '1px solid #ccc',
				// background                 : '#fff',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '4px',
				outline                    : 'none',
				padding                    : '20px'

			}
		}
		
		
		return (
			<Modal
				isOpen={uiStore.helpContentTarget !== ''}
				onAfterOpen={this.addKeyListener}
				// onRequestClose={this.handleClose}
				// closeTimeoutMS={n}
				style={customStyles}
				contentLabel="Help Modal"
				overlayClassName="helpModal__overlay"
				className={"helpModal"}
			>
				<div className="helpModal__wrapper">
					<div className={"helpModal__header"}>						
						<div className="helpModal__navigation" onClick={this.handleQuit}>Quit Tutorial</div>
						<div className="helpModal__navigation" onClick={this.handlePrevious}>&lt;= Previous</div>
						<div className="helpModal__navigation" onClick={this.handleNext}>Next =&gt;</div>
					</div>
					<div className="helpModal__content">
						{tutorialContent[uiStore.tutorialNumber].content}
					</div>
				</div>
			</Modal>
			
		);

	}
}



export default HelpModal;

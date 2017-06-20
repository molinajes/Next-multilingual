// import React, { Component, PropTypes } from 'react';
// import {observer, inject} from 'mobx-react';

// import IconicIcon from '../Iconic/IconicIcon';

// @inject('uiStore', 'requirementStore')
// @observer
// class LibraryPanel extends Component {
// 	static propTypes = {
// 		uiStore: PropTypes.object.isRequired,
// 		requirementStore: PropTypes.object.isRequired
// 	}

// 	handleClickAdd = () => {
// 		const {requirementStore} = this.props;
// 		requirementStore.addLibrary(1);
// 	}

// 	render() {

// 		// const classModifier = "componentView__itemIcons--iface";
// 		const tileModifier = "componentView__componentTile--iface";
// 		return (
// 			<div>
// 				LibraryPanel				
// 				<div className={tileModifier}>
// 					<div className="componentView__contents">
// 						<div className="componentView__typeCount">
// 							<IconicIcon dataSrc={"person-genderless-sm"} iconClass={"componentView__contentsIcon"}/>
// 							<div>2 Actors</div>
// 						</div>						
// 						<div className="componentView__typeCount">
// 							<IconicIcon dataSrc={"chat-sm"} iconClass={"componentView__contentsIcon"}/>
// 							<div>6 Use Cases</div>
// 						</div>
// 						<div className="componentView__typeCount">
// 							<IconicIcon dataSrc={"laptop-sm"} iconClass={"componentView__contentsIcon"}/>
// 							<div>3 Interfaces</div>
// 						</div>
// 						<div className="componentView__typeCount">
// 							<IconicIcon dataSrc={"cogs-sm"} iconClass={"componentView__contentsIcon"}/>
// 							<div>12 Business Rules</div>
// 						</div>	
// 						<div className="componentView__typeCount">
// 							<IconicIcon dataSrc={"list-rich-sm"} iconClass={"componentView__contentsIcon"}/>
// 							<div>2 Forms</div>
// 						</div>						
// 					</div>					
// 					<div className="componentView__componentInformation">
// 						{/*<IconicIcon dataSrc={icon} iconClass={"componentView__itemIcons"} />*/}
// 						<div>
// 							<p className="componentView__componentName">iOS Social App Template</p>
// 						</div>
// 						<div className="componentView__itemEdit" onClick={this.handleClickAdd} style={{flexShrink: '0'}}>
// 							<IconicIcon dataSrc={"plus-sm"} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default LibraryPanel;

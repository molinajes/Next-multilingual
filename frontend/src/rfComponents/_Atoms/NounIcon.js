import React, { Component, PropTypes } from "react";


// import ReactSVG from "react-svg";
// import ReactSVG from "./ReactSVGFork";
import Isvg from "react-inlinesvg";

class NounIcon extends Component {
	static propTypes = {
		svgSrc: PropTypes.string,
		onClick: PropTypes.func
	};

	// componentDidMount = () => {
	// 	window.iconic.inject(this.icon);
	// }

	// componentDidUpdate = (prevProps) => {
	// 	const {svgSrc} = this.props;
	// 	// console.log("Component Did Update", prevProps.svgSrc, svgSrc)
	// 	if (svgSrc !== prevProps.svgSrc) {
	// 		window.iconic.inject(this.icon)
	// 	}
	// }

	// // componentWillReceiveProps(nextProps) {
	// // 	console.log("will rec next props", nextProps.svgSrc)
	// // }

	// render() {
	// 	const {svgSrc} = this.props;

	// 	let prefix = '/np/';
	// 	if (ENV_PRODUCTION || IS_EXTERNAL_RELEASE) {
	// 		prefix = '/app/assets/icons/svg/np/';
	// 	}

	// 	return (
	// 		<img key={svgSrc} data-src={`${prefix}${svgSrc}.svg`} ref={(icon) => {this.icon = icon}}/>
	// 	);
	// }

	onClick = () => {
		console.log("doing this");
		const fn = this.props.onClick;
		fn && fn();
	};

	render() {
		const { svgSrc } = this.props;
		let prefix = "/np/";
		if (ENV_PRODUCTION || IS_EXTERNAL_RELEASE) {
			prefix = "/app/assets/icons/svg/np/";
		}
		return (
			<Isvg
				src={`${prefix}${svgSrc}.svg`}
				cacheGetRequests={true}
				// key={`${prefix}${svgSrc}.svg`}
				onClick={this.onClick}
			/>
		);
	}
}

export default NounIcon;

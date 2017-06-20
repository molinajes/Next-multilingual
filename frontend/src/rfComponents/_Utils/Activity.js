const _TransitionEase = 'cubic-bezier(0.4, 1, 0.75, 0.9)'
const _TransitionEaseBounce = 'cubic-bezier(0.54, 1.12, 0.38, 1.11)'
const _TransitionDuration = 100


const _TransitionHighlight = `all ${_TransitionEase} ${_TransitionDuration*4}ms`;
const _TransitionNotify = `all ${_TransitionEaseBounce} ${_TransitionDuration*2}ms`;
const _TransitionChange = `all ${_TransitionEase} ${_TransitionDuration*12}ms`;

const _Transition = {
	Highlight: _TransitionHighlight,
	Notify: _TransitionNotify,
	Change: _TransitionChange,
}

export {
	_Transition
}
import removeItemFromArray from './removeItemFromArray';

import traceStore from '../stores/traceStore';
import stepObjectStore from '../stores/stepObjectStore';

export default function (deletedContent) {
	const traces = deletedContent.filter(obj => obj.object === '22');
	const links = deletedContent.filter(obj => obj.object === '14');

	traces.forEach(trace => {
		removeItemFromArray(traceStore.traceData, trace.persistent_id);
	})
	links.forEach(link => {
		removeItemFromArray(stepObjectStore.stepObjectData, link.persistent_id);
	})
}
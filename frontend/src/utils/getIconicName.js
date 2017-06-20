import iconReference from '../assets/iconReference.json';

export default function (iconName, iconSize = 'sm') {
	
	const icon =  iconReference[iconName];

	return icon ? `${icon}-${iconSize}` : null;
}
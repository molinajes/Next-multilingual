export default (name) => {
	let id = '';
	switch(name) {
		case 'rule':
			id = '1';
			break;
		case 'form':
			id = '2';
			break;
		case 'formproperty':
			id = '3';
			break;
		case 'actor':
			id = '4';
			break;
		case 'package':
			id = '5';
			break;
		case 'object':
			id = '6';
			break;
		case 'objectproperty':
			id = '7';
			break;
		case 'flow':
			id = '8';
			break;
		case 'step':
			id = '9';
			break;
		case 'usecase':
			id = '10';
			break;
		case 'photo':
			id = '11';
			break;
		case 'iface':
			id = '12';
			break;
		case 'interfacetype':
			id = '13';
			break;
		case 'stepobject':
			id = '14';
			break;
		case 'stepiface':
			id = '15';
			break;
		case 'steprule':
			id = '16';
			break;
		case 'category':
			id = '17';
			break;
		case 'simple':
			id = '18';
			break;
		case 'statetransition':
			id = '19';
			break;
		case 'glossary':
			id = '20';
			break;
		case 'basic':
			id = '21';
			break;
		case 'trace':
			id = '22';
			break;
		default:
			break;
	}
	return id;
}
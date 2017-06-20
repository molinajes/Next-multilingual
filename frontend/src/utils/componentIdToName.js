export default (id) => {
	let name = '';
	switch(id) {
		case '1':
			name = 'rule';
			break;
		case '2':
			name = 'form';
			break;
		case '3':
			name = 'formproperty';
			break;
		case '4':
			name = 'actor';
			break;
		case '5':
			name = 'package';
			break;
		case '6':
			name = 'object';
			break;
		case '7':
			name = 'objectproperty';
			break;
		case '8':
			name = 'flow';
			break;
		case '9':
			name = 'step';
			break;
		case '10':
			name = 'usecase';
			break;
		case '11':
			name = 'photo';
			break;
		case '12':
			name = 'iface';
			break;
		case '13':
			name = 'interfacetype';
			break;
		case '14':
			name = 'stepobject';
			break;
		case '15':
			name = 'stepiface';
			break;
		case '16':
			name = 'steprule';
			break;
		case '17':
			name = 'category';
			break;
		case '18':
			name = 'simple';
			break;
		case '19':
			name = 'statetransition';
			break;
		case '20':
			name = 'glossary';
			break;
		case '21':
			name = 'basic';
			break;
		case '22':
			name = 'trace';
			break;
		default:
			break;
	}
	return name;
}
import Rule from '../models/ruleModel';
import Form from '../models/formModel';
import FormProperty from '../models/formPropertyModel';
import Actor from '../models/actorModel';
import PackageModel from '../models/packageModel';
import ObjectModel from '../models/objectModel';
import ObjectProperty from '../models/objectPropertyModel';
import Flow from '../models/flowModel';
import Step from '../models/stepModel';
import UseCase from '../models/useCaseModel';
import Image from '../models/imageModel';
import Iface from '../models/ifaceModel';
import IfaceType from '../models/ifaceTypeModel';
import StepObject from '../models/stepObjectModel';
import Requirement from '../models/requirementModel';
import Trace from '../models/traceModel';
import Category from '../models/categoryModel';


export default (data) => {
	let model;
	switch(data.object) {
		case '1':
			// name = 'rule';
			model = new Rule();
			return model.load(data)
			
		case '2':
			// name = 'form';
			model = new Form();
			return model.load(data)
		case '3':
			// name = 'formproperty';
			model = new FormProperty();
			return model.load(data)
		case '4':
			// name = 'actor';
			model = new Actor();
			return model.load(data)
		case '5':
			// name = 'package';
			model = new PackageModel();
			return model.load(data)
		case '6':
			// name = 'object';
			model = new ObjectModel();
			return model.load(data)
		case '7':
			// name = 'objectproperty';
			model = new ObjectProperty();
			return model.load(data)
		case '8':
			// name = 'flow';
			model = new Flow();
			return model.load(data)
		case '9':
			// name = 'step';
			model = new Step();
			return model.load(data)
		case '10':
			// name = 'usecase';
			model = new UseCase();
			return model.load(data)
		case '11':
			// name = 'photo';
			model = new Image();
			return model.load(data)
		case '12':
			// name = 'iface';
			model = new Iface();
			return model.load(data)
		case '13':
			// name = 'interfacetype';
			model = new IfaceType();
			return model.load(data)
		case '14':
			// name = 'stepobject';
			model = new StepObject();
			return model.load(data)
		// case '15':
		// 	// name = 'stepiface';
		// 	// model = new Rule();
		// 	// return model.load(data)
		// case '16':
		// 	// name = 'steprule';
		// 	// model = new Rule();
		// 	// return model.load(data)
		case '17':
			// name = 'category';
			model = new Category();
			return model.load(data)
		// case '18':
		// 	// name = 'simple';
		// 	// model = new Rule();
		// 	// return model.load(data)
		// case '19':
		// 	// name = 'statetransition';
		// 	// model = new Rule();
		// 	// return model.load(data)
		// case '20':
		// 	// name = 'glossary';
		// 	// model = new Rule();
		// 	// return model.load(data)
		case '21':
			// name = 'basic';
			model = new Requirement();
			return model.load(data)
		case '22':
			// name = 'trace';
			model = new Trace();
			return model.load(data)
		default:
			new Error('Tried to make model from unknown object type');
	}
}
import { UnitModel } from './../shared/unit.model';
import { FireModel } from './fire.model';

export class LegModel extends UnitModel {
	protected view = {
		'background-image': 'url(i/18.png)'
	};

	constructor() {
		super();

		const fire = new FireModel();
		this.addChild(fire, {
			top: 53,
			left: -57,
			width: 83,
			height: 173,
			transform: 'rotate(-156deg)',
			'z-index': -1
		});
	}
}
import { UnitModel } from './../shared/unit.model';
import { RaqModel } from './raw.model';

export class TorsoModel extends UnitModel {
	constructor() {
		super();

		this.addChild(new RaqModel(), {
			'background-image': 'url(i/11.png)',
			top: 1,
			left: 8,
			width: 91,
			height: 149
		});

		this.addChild(new RaqModel(), {
			'background-image': 'url(i/14.png)',
			top: 11,
			left: 15,
			width: 81,
			height: 147,
			'z-index': -1
		});

		this.addChild(new RaqModel(), {
			'background-image': 'url(i/15.png)',
			width: 68,
			height: 90,
			top: 47,
			left: 21
		});

		this.addChild(new RaqModel(), {
			'background-image': 'url(i/15.png)',
			width: 48,
			height: 83,
			top: 49,
			left: 50,
			transform: 'rotateY(-113deg)'
		});
	}
}
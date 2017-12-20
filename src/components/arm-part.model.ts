import { UnitModel } from './../shared/unit.model';

export class ArmPartModel extends UnitModel {
	protected view = {
		width: 100,
		height: 100,
		top: 36,
		left: -41,
		'background-image': 'url(i/13.png)',
		transform: 'rotateX(190deg) rotateY(190deg)'
	};
}
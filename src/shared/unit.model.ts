import { UnitChild } from './unit-child.type';
import { View } from './view.type';

export class UnitModel {
	protected view: View = {};
	protected children: UnitChild[] = [];

	getView() {
		return this.view;
	}

	getChildren() {
		return this.children;
	}

	addChild(component: UnitModel, view: View) {
		this.children.push({
			view: view,
			unit: component
		});
	}
}
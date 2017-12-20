import { UnitModel } from './../shared/unit.model';
import { View } from './../shared/view.type';
import { UnitChild } from './../shared/unit-child.type';

export class HTMLGeneratorService {
	private elId = 0;

	generate(unit: UnitModel): string {
		this.elId = 0;
		return this.createDivsWithStyles(unit, true);
	}

	private createDivsWithStyles(unit: UnitModel, root = false, wrapView?: View): string {
		const f = root ? 'px' : '%';

		let view = unit.getView();
		if(wrapView) {
			view = Object.assign(view, wrapView);
		}

		const children: UnitChild[] = unit.getChildren();
		const childrenHtml = children
			.map(info => {
				const unit = info.unit;
				const wrapView = info.view;
				return this.createDivsWithStyles(unit, false, wrapView);
			})
			.join('');

		const backgroundStyles = this.getBackgroundStyles(view)
			.map(name => {
				return `${name}: ${view[name]} !important`;
			})
			.join(';');

		const noBackgroundStyles = this.getNoBackgroundStyles(view)
			.map(name => {
				const value = view[name];
				let line = `${name}: ${value}`;
				if(this.isSize(name) && typeof value === 'number') {
					line = line + f;
				}
				return line;
			})
			.join(';');

		const className = this.getClassName();
		let html = `<div class="${className}" style="${noBackgroundStyles}">${childrenHtml}</div>`;
		if(backgroundStyles) {
			html += `<style>.${className}:before { ${backgroundStyles} }</style>`;
		}
		return html;
	}

	private getClassName(): string {
		++this.elId;
		return 'id' + this.elId;
	}

	private getBackgroundStyles(view: View): string[] {
		return Object.keys(view)
			.filter(name => {
				return !!~name.indexOf('background');
			});
	}

	private getNoBackgroundStyles(view: View): string[] {
		return Object.keys(view)
			.filter(name => {
				return !~name.indexOf('background');
			});
	}

	private isSize(name: string): boolean {
		const sizes = ['width', 'height', 'right', 'left', 'top', 'bottom'];
		return !!~sizes.indexOf(name); 
	}
}
import { HTMLGeneratorService } from './html-generator.service';
import { UnitModel } from './../shared/unit.model';

export class StageService {
	private htmlGeneratorService = new HTMLGeneratorService();
	private renderInterval: number;
	private unit: UnitModel;
	private html: string;

	constructor(private $stageElem: Element) {}

	run() {
		this.render();
		this.renderInterval = setInterval(() => {
			this.render();
		}, 100);
	}

	stop() {
		clearInterval(this.renderInterval);
	}

	setUnit(unit: UnitModel) {
		this.unit = unit;
	}

	private render() {
		const html = this.htmlGeneratorService.generate(this.unit);
		if(this.html === html) {
			return;
		}
		this.html = html;
		this.$stageElem.innerHTML = this.html;
	}
}
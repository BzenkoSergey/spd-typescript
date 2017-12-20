import { StageService } from './modules/stage.service';
import { RobotModel } from './units/robot.model';

const $stageElem: Element = document.getElementById('stage');
const stageService = new StageService($stageElem);

const robot = new RobotModel();
stageService.setUnit(robot);
stageService.run();

window.onkeydown = handle;
function handle(e: any) {
	const map = {
		13: 'enter',
		39: 'arrow-right',
		37: 'arrow-left',
		38: 'arrow-top',
		40: 'arrow-bottom',
		32: 'space'
	};
	const key = map[e.keyCode];
	if(key === 'enter') {
		robot.shot();
	}
	if(key === 'arrow-right') {
		robot.forward();
	}
	if(key === 'arrow-left') {
		robot.back();
	}
	if(key === 'arrow-top') {
		robot.up();
	}
	if(key === 'arrow-bottom') {
		robot.down();
	}
	console.log(key);
}
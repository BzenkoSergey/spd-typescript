import {UnitModel} from './../shared/unit.model';

export class BulletModel extends UnitModel {
    protected view = {
        width: 50,
        height: 50,
        top: 200,
        left: 50,
        'background-image': 'url(i/0.png)',
        transform: 'rotateZ(-88deg) rotateX(0deg) rotateY(176deg)',
        'z-index': -10,
        'display': 'none'
    };

    private interval: number;

    shoot() {
        clearInterval(this.interval);

        const rotateZTo = 90;
        const delay = 1000;
        let up = true;
        let rotateZ = 11;

        this.interval = setInterval(() => {
            if (rotateZ === 10) {
                clearInterval(this.interval);
                return;
            }
            if (rotateZ >= rotateZTo) {
                up = false;
            }

            if (!up) {
                --rotateZ;
                this.view.top = 200;
                return;
            }
            else {
                ++rotateZ;
                this.view.top = rotateZ*11;
                this.view.display = 'block';
                return;
            }

        }, 1);
    }

}
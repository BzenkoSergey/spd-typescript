import { Flyable } from './../shared/flyable.interface';
import { Defensible } from './../shared/defensible.interface';
import { UnitModel } from './../shared/unit.model';
import { UnitChild } from './../shared/unit-child.type';
import { View } from './../shared/view.type';

import { ShoulderModel } from './../components/shoulder.model';
import { HeadModel } from './../components/head.model';
import { LegModel } from './../components/leg.model';
import { TorsoModel } from './../components/torso.model';
import { BulletModel } from './../components/bullet.model';

export class RobotModel extends UnitModel implements Flyable, Defensible {
    protected view: View = {
        width: 100,
        height: 100,
        left: 300,
        bottom: 300
    };
    private interval: number;
    private moveStep = 10;
    private moveDelay = 100;

    private shoulderLeft = new ShoulderModel();

    private bull = new BulletModel();

    constructor() {
        super();

        const head = new HeadModel();
        this.children.push({
            view: {
                width: 85,
                height: 85,
                left: 32,
                top: -68,
                'z-index': 2
            },
            unit: head
        });

        this.shoulderLeft.addWeapon();
        this.children.push({
            view: {
                width: 68,
                height: 68,
                'z-index': 30
            },
            unit: this.shoulderLeft
        });

        const shoulderRight = new ShoulderModel();
        this.children.push({
            view: {
                width: 48,
                height: 55,
                top: 3,
                left: 'auto',
                right: -16,
                'z-index': -1,
                transform: 'rotateZ(-14deg)'
            },
            unit: shoulderRight
        });

        const legLeft = new LegModel();
        this.children.push({
            view: {
                top: 115,
                left: 8,
                width: 64,
                height: 98,
                'z-index': -20
            },
            unit: legLeft
        });

        const legRight = new LegModel();
        this.children.push({
            view: {
                top: 114,
                left: 44,
                width: 51,
                height: 83
            },
            unit: legRight
        });

        const torso = new TorsoModel();
        this.children.push({
            view: {
                width: 100,
                height: 100,
                top: 0,
                left: 0
            },
            unit: torso
        });
    }

    shot() {
        this.shoulderLeft.shot();
    }

    forward() {
        this.view.transform = 'rotateZ(10deg)';
        clearInterval(this.interval);
        let left = +this.view.left;
        const leftTo = left + this.moveDelay;
        this.interval = setInterval(() => {
            if(left === leftTo) {
                clearInterval(this.interval);
                this.view.transform = 'rotateZ(0deg)';
                return;
            }
            ++left;
            this.view.left = left;
        }, this.moveDelay / this.moveStep);
    }

    back() {
        this.view.transform = 'rotateY(180deg) rotateZ(10deg)';
        clearInterval(this.interval);
        let left = +this.view.left;
        const leftTo = left - this.moveDelay;
        this.interval = setInterval(() => {
            if(left === leftTo) {
                clearInterval(this.interval);
                this.view.transform = 'rotateY(180deg)';
                return;
            }
            --left;
            this.view.left = left;
        }, this.moveDelay / this.moveDelay);
    }

    up() {
        clearInterval(this.interval);
        let bottom = +this.view.bottom;
        const bottomTo = bottom + this.moveStep;
        this.interval = setInterval(() => {
            if(bottom === bottomTo) {
                clearInterval(this.interval);
            }
            ++bottom;
            this.view.bottom = bottom;
        }, this.moveDelay / this.moveStep);
    }

    down() {
        clearInterval(this.interval);
        let bottom = +this.view.bottom;
        const bottomTo = bottom - this.moveStep;
        this.interval = setInterval(() => {
            if(bottom === bottomTo) {
                clearInterval(this.interval);
            }
            --bottom;
            this.view.bottom = bottom;
        }, this.moveDelay / this.moveStep);
    }
}
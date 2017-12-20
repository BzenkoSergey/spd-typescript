var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("shared/view.type", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("shared/unit-child.type", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("shared/unit.model", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var UnitModel;
    return {
        setters: [],
        execute: function () {
            UnitModel = /** @class */ (function () {
                function UnitModel() {
                    this.view = {};
                    this.children = [];
                }
                UnitModel.prototype.getView = function () {
                    return this.view;
                };
                UnitModel.prototype.getChildren = function () {
                    return this.children;
                };
                UnitModel.prototype.addChild = function (component, view) {
                    this.children.push({
                        view: view,
                        unit: component
                    });
                };
                return UnitModel;
            }());
            exports_3("UnitModel", UnitModel);
        }
    };
});
System.register("modules/html-generator.service", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var HTMLGeneratorService;
    return {
        setters: [],
        execute: function () {
            HTMLGeneratorService = /** @class */ (function () {
                function HTMLGeneratorService() {
                    this.elId = 0;
                }
                HTMLGeneratorService.prototype.generate = function (unit) {
                    this.elId = 0;
                    return this.createDivsWithStyles(unit, true);
                };
                HTMLGeneratorService.prototype.createDivsWithStyles = function (unit, root, wrapView) {
                    var _this = this;
                    if (root === void 0) { root = false; }
                    var f = root ? 'px' : '%';
                    var view = unit.getView();
                    if (wrapView) {
                        view = Object.assign(view, wrapView);
                    }
                    var children = unit.getChildren();
                    var childrenHtml = children
                        .map(function (info) {
                        var unit = info.unit;
                        var wrapView = info.view;
                        return _this.createDivsWithStyles(unit, false, wrapView);
                    })
                        .join('');
                    var backgroundStyles = this.getBackgroundStyles(view)
                        .map(function (name) {
                        return name + ": " + view[name] + " !important";
                    })
                        .join(';');
                    var noBackgroundStyles = this.getNoBackgroundStyles(view)
                        .map(function (name) {
                        var value = view[name];
                        var line = name + ": " + value;
                        if (_this.isSize(name) && typeof value === 'number') {
                            line = line + f;
                        }
                        return line;
                    })
                        .join(';');
                    var className = this.getClassName();
                    var html = "<div class=\"" + className + "\" style=\"" + noBackgroundStyles + "\">" + childrenHtml + "</div>";
                    if (backgroundStyles) {
                        html += "<style>." + className + ":before { " + backgroundStyles + " }</style>";
                    }
                    return html;
                };
                HTMLGeneratorService.prototype.getClassName = function () {
                    ++this.elId;
                    return 'id' + this.elId;
                };
                HTMLGeneratorService.prototype.getBackgroundStyles = function (view) {
                    return Object.keys(view)
                        .filter(function (name) {
                        return !!~name.indexOf('background');
                    });
                };
                HTMLGeneratorService.prototype.getNoBackgroundStyles = function (view) {
                    return Object.keys(view)
                        .filter(function (name) {
                        return !~name.indexOf('background');
                    });
                };
                HTMLGeneratorService.prototype.isSize = function (name) {
                    var sizes = ['width', 'height', 'right', 'left', 'top', 'bottom'];
                    return !!~sizes.indexOf(name);
                };
                return HTMLGeneratorService;
            }());
            exports_4("HTMLGeneratorService", HTMLGeneratorService);
        }
    };
});
System.register("modules/stage.service", ["modules/html-generator.service"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var html_generator_service_1, StageService;
    return {
        setters: [
            function (html_generator_service_1_1) {
                html_generator_service_1 = html_generator_service_1_1;
            }
        ],
        execute: function () {
            StageService = /** @class */ (function () {
                function StageService($stageElem) {
                    this.$stageElem = $stageElem;
                    this.htmlGeneratorService = new html_generator_service_1.HTMLGeneratorService();
                }
                StageService.prototype.run = function () {
                    var _this = this;
                    this.render();
                    this.renderInterval = setInterval(function () {
                        _this.render();
                    }, 100);
                };
                StageService.prototype.stop = function () {
                    clearInterval(this.renderInterval);
                };
                StageService.prototype.setUnit = function (unit) {
                    this.unit = unit;
                };
                StageService.prototype.render = function () {
                    var html = this.htmlGeneratorService.generate(this.unit);
                    if (this.html === html) {
                        return;
                    }
                    this.html = html;
                    this.$stageElem.innerHTML = this.html;
                };
                return StageService;
            }());
            exports_5("StageService", StageService);
        }
    };
});
System.register("shared/movable.interface", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("shared/flyable.interface", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("shared/defensible.interface", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/arm-part.model", ["shared/unit.model"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var unit_model_1, ArmPartModel;
    return {
        setters: [
            function (unit_model_1_1) {
                unit_model_1 = unit_model_1_1;
            }
        ],
        execute: function () {
            ArmPartModel = /** @class */ (function (_super) {
                __extends(ArmPartModel, _super);
                function ArmPartModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.view = {
                        width: 100,
                        height: 100,
                        top: 36,
                        left: -41,
                        'background-image': 'url(i/13.png)',
                        transform: 'rotateX(190deg) rotateY(190deg)'
                    };
                    return _this;
                }
                return ArmPartModel;
            }(unit_model_1.UnitModel));
            exports_9("ArmPartModel", ArmPartModel);
        }
    };
});
System.register("components/weapon.model", ["shared/unit.model"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var unit_model_2, WeaponModel;
    return {
        setters: [
            function (unit_model_2_1) {
                unit_model_2 = unit_model_2_1;
            }
        ],
        execute: function () {
            WeaponModel = /** @class */ (function (_super) {
                __extends(WeaponModel, _super);
                function WeaponModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.view = {
                        'background-image': 'url(i/21.png)',
                        'background-position': '0 19px'
                    };
                    return _this;
                }
                return WeaponModel;
            }(unit_model_2.UnitModel));
            exports_10("WeaponModel", WeaponModel);
        }
    };
});
System.register("components/shoulder.model", ["shared/unit.model", "components/arm-part.model", "components/weapon.model"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var unit_model_3, arm_part_model_1, weapon_model_1, ShoulderModel;
    return {
        setters: [
            function (unit_model_3_1) {
                unit_model_3 = unit_model_3_1;
            },
            function (arm_part_model_1_1) {
                arm_part_model_1 = arm_part_model_1_1;
            },
            function (weapon_model_1_1) {
                weapon_model_1 = weapon_model_1_1;
            }
        ],
        execute: function () {
            ShoulderModel = /** @class */ (function (_super) {
                __extends(ShoulderModel, _super);
                function ShoulderModel() {
                    var _this = _super.call(this) || this;
                    _this.view = {
                        width: 200,
                        height: 200,
                        top: -9,
                        left: -24,
                        'background-image': 'url(i/12.png)',
                        transform: 'rotateZ(10deg)'
                    };
                    _this.topPart = new arm_part_model_1.ArmPartModel();
                    _this.bottomPart = new arm_part_model_1.ArmPartModel();
                    _this.addChild(_this.topPart, {});
                    _this.addChild(_this.bottomPart, {
                        top: 107,
                        left: -41,
                        transform: 'rotateY(190deg)'
                    });
                    return _this;
                }
                ShoulderModel.prototype.shot = function () {
                    var _this = this;
                    clearInterval(this.interval);
                    var rotateZTo = 90;
                    var delay = 1000;
                    var up = true;
                    var rotateZ = 11;
                    this.interval = setInterval(function () {
                        if (rotateZ === 10) {
                            _this.view.transform = 'rotateZ(' + 10 + 'deg)';
                            clearInterval(_this.interval);
                            return;
                        }
                        if (rotateZ >= rotateZTo) {
                            up = false;
                        }
                        if (!up) {
                            --rotateZ;
                            _this.view.transform = 'rotateZ(-' + rotateZ + 'deg)';
                            return;
                        }
                        else {
                            ++rotateZ;
                            _this.view.transform = 'rotateZ(-' + rotateZ + 'deg)';
                            return;
                        }
                    }, delay / rotateZTo);
                };
                ShoulderModel.prototype.addWeapon = function () {
                    var weapon = new weapon_model_1.WeaponModel();
                    this.bottomPart.addChild(weapon, {
                        width: 148,
                        height: 72,
                        top: 67,
                        left: -95,
                        transform: 'rotateZ(-88deg) rotateX(0deg) rotateY(176deg)'
                    });
                };
                return ShoulderModel;
            }(unit_model_3.UnitModel));
            exports_11("ShoulderModel", ShoulderModel);
        }
    };
});
System.register("components/head.model", ["shared/unit.model"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var unit_model_4, HeadModel;
    return {
        setters: [
            function (unit_model_4_1) {
                unit_model_4 = unit_model_4_1;
            }
        ],
        execute: function () {
            HeadModel = /** @class */ (function (_super) {
                __extends(HeadModel, _super);
                function HeadModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.view = {
                        'background-image': 'url(i/5.png)'
                    };
                    return _this;
                }
                return HeadModel;
            }(unit_model_4.UnitModel));
            exports_12("HeadModel", HeadModel);
        }
    };
});
System.register("components/fire.model", ["shared/unit.model"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var unit_model_5, FireModel;
    return {
        setters: [
            function (unit_model_5_1) {
                unit_model_5 = unit_model_5_1;
            }
        ],
        execute: function () {
            FireModel = /** @class */ (function (_super) {
                __extends(FireModel, _super);
                function FireModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.view = {
                        top: 16,
                        left: 42,
                        'background-image': 'url(i/20.png)',
                        'background-size': '100% 100%'
                    };
                    return _this;
                }
                return FireModel;
            }(unit_model_5.UnitModel));
            exports_13("FireModel", FireModel);
        }
    };
});
System.register("components/leg.model", ["shared/unit.model", "components/fire.model"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var unit_model_6, fire_model_1, LegModel;
    return {
        setters: [
            function (unit_model_6_1) {
                unit_model_6 = unit_model_6_1;
            },
            function (fire_model_1_1) {
                fire_model_1 = fire_model_1_1;
            }
        ],
        execute: function () {
            LegModel = /** @class */ (function (_super) {
                __extends(LegModel, _super);
                function LegModel() {
                    var _this = _super.call(this) || this;
                    _this.view = {
                        'background-image': 'url(i/18.png)'
                    };
                    var fire = new fire_model_1.FireModel();
                    _this.addChild(fire, {
                        top: 53,
                        left: -57,
                        width: 83,
                        height: 173,
                        transform: 'rotate(-156deg)',
                        'z-index': -1
                    });
                    return _this;
                }
                return LegModel;
            }(unit_model_6.UnitModel));
            exports_14("LegModel", LegModel);
        }
    };
});
System.register("components/raw.model", ["shared/unit.model"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var unit_model_7, RaqModel;
    return {
        setters: [
            function (unit_model_7_1) {
                unit_model_7 = unit_model_7_1;
            }
        ],
        execute: function () {
            RaqModel = /** @class */ (function (_super) {
                __extends(RaqModel, _super);
                function RaqModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RaqModel;
            }(unit_model_7.UnitModel));
            exports_15("RaqModel", RaqModel);
        }
    };
});
System.register("components/torso.model", ["shared/unit.model", "components/raw.model"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var unit_model_8, raw_model_1, TorsoModel;
    return {
        setters: [
            function (unit_model_8_1) {
                unit_model_8 = unit_model_8_1;
            },
            function (raw_model_1_1) {
                raw_model_1 = raw_model_1_1;
            }
        ],
        execute: function () {
            TorsoModel = /** @class */ (function (_super) {
                __extends(TorsoModel, _super);
                function TorsoModel() {
                    var _this = _super.call(this) || this;
                    _this.addChild(new raw_model_1.RaqModel(), {
                        'background-image': 'url(i/11.png)',
                        top: 1,
                        left: 8,
                        width: 91,
                        height: 149
                    });
                    _this.addChild(new raw_model_1.RaqModel(), {
                        'background-image': 'url(i/14.png)',
                        top: 11,
                        left: 15,
                        width: 81,
                        height: 147,
                        'z-index': -1
                    });
                    _this.addChild(new raw_model_1.RaqModel(), {
                        'background-image': 'url(i/15.png)',
                        width: 68,
                        height: 90,
                        top: 47,
                        left: 21
                    });
                    _this.addChild(new raw_model_1.RaqModel(), {
                        'background-image': 'url(i/15.png)',
                        width: 48,
                        height: 83,
                        top: 49,
                        left: 50,
                        transform: 'rotateY(-113deg)'
                    });
                    return _this;
                }
                return TorsoModel;
            }(unit_model_8.UnitModel));
            exports_16("TorsoModel", TorsoModel);
        }
    };
});
System.register("units/robot.model", ["shared/unit.model", "components/shoulder.model", "components/head.model", "components/leg.model", "components/torso.model"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var unit_model_9, shoulder_model_1, head_model_1, leg_model_1, torso_model_1, RobotModel;
    return {
        setters: [
            function (unit_model_9_1) {
                unit_model_9 = unit_model_9_1;
            },
            function (shoulder_model_1_1) {
                shoulder_model_1 = shoulder_model_1_1;
            },
            function (head_model_1_1) {
                head_model_1 = head_model_1_1;
            },
            function (leg_model_1_1) {
                leg_model_1 = leg_model_1_1;
            },
            function (torso_model_1_1) {
                torso_model_1 = torso_model_1_1;
            }
        ],
        execute: function () {
            RobotModel = /** @class */ (function (_super) {
                __extends(RobotModel, _super);
                function RobotModel() {
                    var _this = _super.call(this) || this;
                    _this.view = {
                        width: 100,
                        height: 100,
                        left: 300,
                        bottom: 300
                    };
                    _this.moveStep = 10;
                    _this.moveDelay = 100;
                    _this.shoulderLeft = new shoulder_model_1.ShoulderModel();
                    var head = new head_model_1.HeadModel();
                    _this.children.push({
                        view: {
                            width: 85,
                            height: 85,
                            left: 32,
                            top: -68,
                            'z-index': 2
                        },
                        unit: head
                    });
                    _this.shoulderLeft.addWeapon();
                    _this.children.push({
                        view: {
                            width: 68,
                            height: 68,
                            'z-index': 30
                        },
                        unit: _this.shoulderLeft
                    });
                    var shoulderRight = new shoulder_model_1.ShoulderModel();
                    _this.children.push({
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
                    var legLeft = new leg_model_1.LegModel();
                    _this.children.push({
                        view: {
                            top: 115,
                            left: 8,
                            width: 64,
                            height: 98,
                            'z-index': 2
                        },
                        unit: legLeft
                    });
                    var legRight = new leg_model_1.LegModel();
                    _this.children.push({
                        view: {
                            top: 114,
                            left: 44,
                            width: 51,
                            height: 83
                        },
                        unit: legRight
                    });
                    var torso = new torso_model_1.TorsoModel();
                    _this.children.push({
                        view: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0
                        },
                        unit: torso
                    });
                    return _this;
                }
                RobotModel.prototype.shot = function () {
                    this.shoulderLeft.shot();
                };
                RobotModel.prototype.forward = function () {
                    var _this = this;
                    this.view.transform = 'rotateZ(10deg)';
                    clearInterval(this.interval);
                    var left = +this.view.left;
                    var leftTo = left + this.moveDelay;
                    this.interval = setInterval(function () {
                        if (left === leftTo) {
                            clearInterval(_this.interval);
                            _this.view.transform = 'rotateZ(0deg)';
                            return;
                        }
                        ++left;
                        _this.view.left = left;
                    }, this.moveDelay / this.moveStep);
                };
                RobotModel.prototype.back = function () {
                    var _this = this;
                    this.view.transform = 'rotateY(180deg) rotateZ(10deg)';
                    clearInterval(this.interval);
                    var left = +this.view.left;
                    var leftTo = left - this.moveDelay;
                    this.interval = setInterval(function () {
                        if (left === leftTo) {
                            clearInterval(_this.interval);
                            _this.view.transform = 'rotateY(180deg)';
                            return;
                        }
                        --left;
                        _this.view.left = left;
                    }, this.moveDelay / this.moveDelay);
                };
                RobotModel.prototype.up = function () {
                    var _this = this;
                    clearInterval(this.interval);
                    var bottom = +this.view.bottom;
                    var bottomTo = bottom + this.moveStep;
                    this.interval = setInterval(function () {
                        if (bottom === bottomTo) {
                            clearInterval(_this.interval);
                        }
                        ++bottom;
                        _this.view.bottom = bottom;
                    }, this.moveDelay / this.moveStep);
                };
                RobotModel.prototype.down = function () {
                    var _this = this;
                    clearInterval(this.interval);
                    var bottom = +this.view.bottom;
                    var bottomTo = bottom - this.moveStep;
                    this.interval = setInterval(function () {
                        if (bottom === bottomTo) {
                            clearInterval(_this.interval);
                        }
                        --bottom;
                        _this.view.bottom = bottom;
                    }, this.moveDelay / this.moveStep);
                };
                return RobotModel;
            }(unit_model_9.UnitModel));
            exports_17("RobotModel", RobotModel);
        }
    };
});
System.register("main", ["modules/stage.service", "units/robot.model"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function handle(e) {
        var map = {
            13: 'enter',
            39: 'arrow-right',
            37: 'arrow-left',
            38: 'arrow-top',
            40: 'arrow-bottom',
            32: 'space'
        };
        var key = map[e.keyCode];
        if (key === 'enter') {
            robot.shot();
        }
        if (key === 'arrow-right') {
            robot.forward();
        }
        if (key === 'arrow-left') {
            robot.back();
        }
        if (key === 'arrow-top') {
            robot.up();
        }
        if (key === 'arrow-bottom') {
            robot.down();
        }
        console.log(key);
    }
    var stage_service_1, robot_model_1, $stageElem, stageService, robot;
    return {
        setters: [
            function (stage_service_1_1) {
                stage_service_1 = stage_service_1_1;
            },
            function (robot_model_1_1) {
                robot_model_1 = robot_model_1_1;
            }
        ],
        execute: function () {
            $stageElem = document.getElementById('stage');
            stageService = new stage_service_1.StageService($stageElem);
            robot = new robot_model_1.RobotModel();
            stageService.setUnit(robot);
            stageService.run();
            window.onkeydown = handle;
        }
    };
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 14-8-31.
*/
var flappybirdx;
(function (flappybirdx) {
    var Bird = (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            _super.call(this);
            this.moveDirDown = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        Bird.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            var texture = RES.getRes("bird");
            var data = RES.getRes("bird_json");
            this.birdMC = new egret.MovieClip(data, texture);
            this.birdMC.frameRate = flappybirdx.Con.fig.bird.frameRate;
            this.addChild(this.birdMC);

            flappybirdx.Con.fig.bird.location.x = Math.ceil(this.stage.stageWidth / 3);
            flappybirdx.Con.fig.bird.location.y = Math.ceil(this.stage.stageHeight / 2);
            this.x = flappybirdx.Con.fig.bird.location.x;
            this.y = flappybirdx.Con.fig.bird.location.y;
        };

        /**
        * 鸟的准备动作，不会坠地
        */
        Bird.prototype.ready = function () {
            this.birdMC.gotoAndPlay("fly");
            this.removeEventListener(egret.Event.ENTER_FRAME, this.readyHander, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.readyHander, this);
        };

        Bird.prototype.readyHander = function () {
            //上下摆动
            if (this.y > flappybirdx.Con.fig.bird.location.y + flappybirdx.Con.fig.bird.vibFreq) {
                this.moveDirDown = false;
            } else if (this.y < flappybirdx.Con.fig.bird.location.y - flappybirdx.Con.fig.bird.vibFreq) {
                this.moveDirDown = true;
            }

            this.moveDirDown ? this.y += flappybirdx.Con.fig.bird.speed : this.y -= flappybirdx.Con.fig.bird.speed;
        };

        /**
        * 飞，接受点击给一个向上的力，该力满足重力加速度的原理
        */
        Bird.prototype.fly = function () {
        };

        /**
        * 小鸟坠毁
        */
        Bird.prototype.crash = function () {
        };
        return Bird;
    })(egret.DisplayObjectContainer);
    flappybirdx.Bird = Bird;
    Bird.prototype.__class__ = "flappybirdx.Bird";
})(flappybirdx || (flappybirdx = {}));

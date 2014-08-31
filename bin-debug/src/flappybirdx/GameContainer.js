var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 14-8-28.
*/
var flappybirdx;
(function (flappybirdx) {
    var Con = (function () {
        function Con() {
        }
        return Con;
    })();
    flappybirdx.Con = Con;
    Con.prototype.__class__ = "flappybirdx.Con";

    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer(config) {
            _super.call(this);
            flappybirdx.Con.fig = config;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };

        GameContainer.prototype.createGameScene = function () {
            //背景
            this.map = new flappybirdx.Map(); //创建可滚动的背景
            this.addChild(this.map);
            this.map.load();

            //bird
            this.bird = new flappybirdx.Bird();
            this.addChild(this.bird);
            this.bird.ready();
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    flappybirdx.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "flappybirdx.GameContainer";
})(flappybirdx || (flappybirdx = {}));

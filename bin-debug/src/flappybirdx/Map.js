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
    /**
    * Map
    */
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            _super.call(this);
            this.grasses = [];
            this.buildings = [];
            this.clouds = [];
            this.pipelines = [];
            this.speed = flappybirdx.Con.fig.speed;

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        Map.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.stageH = this.stage.stageHeight;
            this.stageW = this.stage.stageWidth;
            this.floorHeight = this.stageH * flappybirdx.Con.fig.floor.HeightPercent;

            //shy
            var sky = new egret.Shape();
            sky.graphics.beginFill(0x4ac3ce, 1);
            sky.graphics.drawRect(0, 0, this.stageW, this.stageH);
            sky.graphics.endFill();
            this.addChild(sky);

            //create building #4ac3ce
            this.grassHeight = RES.getRes("grass").textureHeight;
            var buildingHeight = RES.getRes("building").textureHeight;
            var cloudHeight = RES.getRes("cloud").textureHeight;

            this.buildings = flappybirdx.createInXRepeatBitMaps("building", 0, this.stageH - this.floorHeight - this.grassHeight, true, this);
            this.clouds = flappybirdx.createInXRepeatBitMaps("cloud", 0, this.stageH - this.floorHeight - this.grassHeight - buildingHeight, true, this);

            //create pipelines
            this.createPipelines();

            //create floor background color #dedb94 url('images/floor.jpg') 0px 0px repeat-x
            var floor = new egret.Shape();
            floor.graphics.beginFill(0xdedb94, 1);
            floor.graphics.drawRect(0, this.stageH - this.floorHeight - this.grassHeight, this.stageW, this.floorHeight + this.grassHeight);
            floor.graphics.endFill();
            this.addChild(floor);

            this.grasses = flappybirdx.createInXRepeatBitMaps("grass", 0, this.stageH - this.floorHeight, true, this);
        };

        Map.prototype.createPipelines = function () {
            var pi = flappybirdx.createBitmapBySpriteName("sprites", "pipeline_up");
            var piWidth = pi.texture.textureWidth + flappybirdx.Con.fig.pipeline.reserve.width;
            this.piHeight = pi.texture.textureHeight;
            var piCount = Math.ceil(this.stageW / piWidth) + 1;

            for (var i = 0; i < piCount; i++) {
                var pipe = new flappybirdx.Pipeline();
                pipe.xx = i * piWidth + flappybirdx.Con.fig.pipeline.offset.x;

                //pipe.yy = i * 100;
                pipe.yy = flappybirdx.Con.fig.pipeline.reserve.height + (this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space) * ((Math.round(Math.random() * 100)) / 100) - this.piHeight;
                this.pipelines.push(pipe);
                this.addChild(pipe);
                //console.log("pipeline"  + (i + 1) + " x: " + pipe.x + ", y: " + pipe.y + "xx: " + pipe.xx + "yy: " + pipe._yy);
                //console.log(this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space);
            }
        };

        /**
        * 加载地图
        */
        Map.prototype.load = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };

        Map.prototype.enterFrameHandler = function (event) {
            for (var i = 0; i < this.grasses.length; i++) {
                var _bg = this.grasses[i];
                _bg.x -= this.speed;
                if (-_bg.x > _bg.texture.textureWidth) {
                    _bg.x = _bg.texture.textureWidth * (this.grasses.length - 1) - this.speed;
                }
            }

            //pipeline move
            if (this.pipelines != null) {
                for (var i = 0; i < this.pipelines.length; i++) {
                    var _pi = this.pipelines[i];
                    _pi.xx -= this.speed;
                    if (-_pi.xx > _pi.width) {
                        _pi.xx = (_pi.width + flappybirdx.Con.fig.pipeline.reserve.width) * (this.pipelines.length - 1) + flappybirdx.Con.fig.pipeline.reserve.width - this.speed;
                        _pi.yy = flappybirdx.Con.fig.pipeline.reserve.height + (this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space) * ((Math.round(Math.random() * 100)) / 100) - this.piHeight;
                        console.log("Pipeline " + i + "转换" + "xx: " + _pi.xx + "yy: " + _pi._yy);
                    }
                }
            }
        };
        return Map;
    })(egret.DisplayObjectContainer);
    flappybirdx.Map = Map;
    Map.prototype.__class__ = "flappybirdx.Map";
})(flappybirdx || (flappybirdx = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 14-8-29.
*/
var flappybirdx;
(function (flappybirdx) {
    var Pipeline = (function (_super) {
        __extends(Pipeline, _super);
        function Pipeline() {
            _super.call(this);
            this.pipelineUpName = "pipeline_up";
            this.pipelineDownName = "pipeline_down";
            this._xx = 0;
            this._yy = 0;
            this._width = 1;
            this.pipelineSpace = flappybirdx.Con.fig.pipeline.space;
            this.pipelineSpriteSheet = RES.getRes("sprites");
            this.topPipeBm = flappybirdx.createBitmapBySprite(this.pipelineSpriteSheet, this.pipelineDownName);
            this.addChild(this.topPipeBm);
            this.bottomPipeBm = flappybirdx.createBitmapBySprite(this.pipelineSpriteSheet, this.pipelineUpName);
            this.addChild(this.bottomPipeBm);
        }

        Object.defineProperty(Pipeline.prototype, "xx", {
            get: function () {
                return this._xx;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._xx = value;
                    this.topPipeBm.x = this._xx;
                    this.bottomPipeBm.x = this._xx;
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Pipeline.prototype, "yy", {
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._yy = value;
                    this.topPipeBm.y = this._yy;
                    this.bottomPipeBm.y = this.topPipeBm.y + this.topPipeBm.texture.textureHeight + this.pipelineSpace;
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Pipeline.prototype, "y", {
            get: function () {
                return this._yy;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Pipeline.prototype, "width", {
            get: function () {
                this._width = this.topPipeBm.texture.textureWidth;
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        return Pipeline;
    })(egret.DisplayObjectContainer);
    flappybirdx.Pipeline = Pipeline;
    Pipeline.prototype.__class__ = "flappybirdx.Pipeline";
})(flappybirdx || (flappybirdx = {}));

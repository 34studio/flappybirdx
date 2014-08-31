/**
 * Created by Administrator on 14-8-29.
 */
module flappybirdx{

    export class Pipeline extends egret.DisplayObjectContainer{

        private pipelineSpace:number;

        private pipelineSpriteSheet:egret.SpriteSheet;

        private pipelineUpName:string = "pipeline_up";

        private pipelineDownName:string = "pipeline_down";

        private topPipeBm:egret.Bitmap;

        private bottomPipeBm:egret.Bitmap;

        public constructor(){

            super();
            this.pipelineSpace = flappybirdx.Con.fig.pipeline.space;
            this.pipelineSpriteSheet = RES.getRes("sprites");
            this.topPipeBm = flappybirdx.createBitmapBySprite(this.pipelineSpriteSheet, this.pipelineDownName);
            this.addChild(this.topPipeBm);
            this.bottomPipeBm = flappybirdx.createBitmapBySprite(this.pipelineSpriteSheet, this.pipelineUpName);
            this.addChild(this.bottomPipeBm);
        }

        public _xx:number = 0;

        public set xx(value:number) {
            if (egret.NumberUtils.isNumber(value)) {

                this._xx = value;
                this.topPipeBm.x = this._xx;
                this.bottomPipeBm.x = this._xx;
            }
        }

        public get xx():number {
            return this._xx;
        }

        public _yy:number = 0;

        public set yy(value:number){
            if (egret.NumberUtils.isNumber(value)) {
                this._yy = value;
                this.topPipeBm.y = this._yy;
                this.bottomPipeBm.y = this.topPipeBm.y + this.topPipeBm.texture.textureHeight + this.pipelineSpace;
            }
        }

        public get y(){
            return this._yy;
        }

        public _width:number = 1;

        public get width():number{
            this._width = this.topPipeBm.texture.textureWidth;
            return this._width;
        }
    }
}
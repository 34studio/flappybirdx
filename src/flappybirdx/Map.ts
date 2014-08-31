/**
 * Created by Administrator on 14-8-28.
 */
module flappybirdx{

    /**
     * Map
     */
    export class Map extends egret.DisplayObjectContainer{

        private building:egret.Bitmap[];

        private grass:egret.Bitmap[];

        private stageW:number;

        private stageH:number;

        private grasses = []; private buildings = []; private clouds = [];

        private grassHeight:number;

        private piHeight:number;

        private speed:number;

        private floorHeight:number;

        private pipelines:flappybirdx.Pipeline[] = [];

        public constructor(){
            super();
            this.speed = flappybirdx.Con.fig.speed;

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(){

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.stageH = this.stage.stageHeight;
            this.stageW = this.stage.stageWidth;
            this.floorHeight = this.stageH * flappybirdx.Con.fig.floor.HeightPercent;

            //shy
            var sky:egret.Shape = new egret.Shape();
            sky.graphics.beginFill(0x4ac3ce, 1);
            sky.graphics.drawRect(0, 0, this.stageW, this.stageH);
            sky.graphics.endFill();
            this.addChild(sky);

            //create building #4ac3ce
            this.grassHeight = RES.getRes("grass").textureHeight;
            var buildingHeight:number = RES.getRes("building").textureHeight;
            var cloudHeight:number = RES.getRes("cloud").textureHeight;

            this.buildings = flappybirdx.createInXRepeatBitMaps("building", 0, this.stageH - this.floorHeight - this.grassHeight, true, this);
            this.clouds = flappybirdx.createInXRepeatBitMaps("cloud", 0, this.stageH - this.floorHeight - this.grassHeight - buildingHeight, true, this);

            //create pipelines
            this.createPipelines();

            //create floor background color #dedb94 url('images/floor.jpg') 0px 0px repeat-x
            var floor:egret.Shape = new egret.Shape();
            floor.graphics.beginFill(0xdedb94, 1);
            floor.graphics.drawRect(0, this.stageH - this.floorHeight - this.grassHeight, this.stageW, this.floorHeight + this.grassHeight);
            floor.graphics.endFill();
            this.addChild(floor);

            this.grasses = flappybirdx.createInXRepeatBitMaps("grass", 0, this.stageH - this.floorHeight, true, this);

        }

        private createPipelines(){

            var pi:egret.Bitmap = flappybirdx.createBitmapBySpriteName("sprites", "pipeline_up");
            var piWidth:number = pi.texture.textureWidth + flappybirdx.Con.fig.pipeline.reserve.width;
            this.piHeight = pi.texture.textureHeight;
            var piCount:number = Math.ceil(this.stageW / piWidth) + 1;

            for(var i:number = 0; i < piCount; i ++){

                var pipe = new flappybirdx.Pipeline();
                pipe.xx = i * piWidth + flappybirdx.Con.fig.pipeline.offset.x;
                //pipe.yy = i * 100;
                pipe.yy =  flappybirdx.Con.fig.pipeline.reserve.height + (this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space) * ((Math.round(Math.random() * 100)) / 100) - this.piHeight;
                this.pipelines.push(pipe);
                this.addChild(pipe);
                //console.log("pipeline"  + (i + 1) + " x: " + pipe.x + ", y: " + pipe.y + "xx: " + pipe.xx + "yy: " + pipe._yy);
                //console.log(this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space);
            }
        }

        /**
         * 加载地图
         */
        public load():void{
            this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        }

        private enterFrameHandler(event:egret.Event):void{

            //grass move
            for(var i:number = 0; i < this.grasses.length; i ++){

                var _bg:egret.Bitmap = this.grasses[i];
                _bg.x -= this.speed;
                if(-_bg.x > _bg.texture.textureWidth){
                    _bg.x = _bg.texture.textureWidth  * (this.grasses.length - 1) - this.speed;
                }
            }

            //pipeline move
            if(this.pipelines != null){

                for(var i:number = 0; i < this.pipelines.length; i ++){

                    var _pi:flappybirdx.Pipeline = this.pipelines[i];
                    _pi.xx -= this.speed;
                    if(-_pi.xx > _pi.width){
                        _pi.xx = (_pi.width + flappybirdx.Con.fig.pipeline.reserve.width)  * (this.pipelines.length - 1) + flappybirdx.Con.fig.pipeline.reserve.width - this.speed;
                        _pi.yy =  flappybirdx.Con.fig.pipeline.reserve.height + (this.stageH - this.floorHeight - this.grassHeight - 2 * flappybirdx.Con.fig.pipeline.reserve.height - flappybirdx.Con.fig.pipeline.space) * ((Math.round(Math.random() * 100)) / 100) - this.piHeight;
                        console.log("Pipeline " + i + "转换" + "xx: " + _pi.xx + "yy: " + _pi._yy);
                    }
                }
            }
        }
    }

}
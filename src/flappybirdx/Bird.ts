/**
 * Created by Administrator on 14-8-31.
 */
module flappybirdx{

    export class Bird extends egret.DisplayObjectContainer{


        private birdMC:egret.MovieClip;

        public constructor(){

            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            var texture = RES.getRes("bird")
            var data = RES.getRes("bird_json");
            this.birdMC = new egret.MovieClip(data, texture);
            this.birdMC.frameRate = flappybirdx.Con.fig.bird.frameRate;
            this.addChild(this.birdMC);

            flappybirdx.Con.fig.bird.location.x = Math.ceil(this.stage.stageWidth / 3);
            flappybirdx.Con.fig.bird.location.y = Math.ceil(this.stage.stageHeight / 2);
            this.x = flappybirdx.Con.fig.bird.location.x;
            this.y = flappybirdx.Con.fig.bird.location.y;
        }

        /**
         * 鸟的准备动作，不会坠地
         */
        public ready(){
            this.birdMC.gotoAndPlay("fly");
            this.removeEventListener(egret.Event.ENTER_FRAME,this.readyHander,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.readyHander,this);
        }

        private moveDirDown:boolean = true;

        private readyHander(){

            //上下摆动
            if(this.y > flappybirdx.Con.fig.bird.location.y + flappybirdx.Con.fig.bird.vibFreq){
                this.moveDirDown = false;
            }else if(this.y < flappybirdx.Con.fig.bird.location.y - flappybirdx.Con.fig.bird.vibFreq){
                this.moveDirDown = true;
            }

            this.moveDirDown ? this.y += flappybirdx.Con.fig.bird.speed : this.y -= flappybirdx.Con.fig.bird.speed;

        }

        /**
         * 飞，接受点击给一个向上的力，该力满足重力加速度的原理
         */
        public fly(){

            this.birdMC.gotoAndStop("fly");
            this.removeEventListener(egret.Event.ENTER_FRAME,this.flyHander,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.flyHander,this);
        }

        public flyHander(){


        }

        /**
         * 小鸟坠毁
         */
        public crash(){

        }
    }
}
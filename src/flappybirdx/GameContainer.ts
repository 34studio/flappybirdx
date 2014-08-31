/**
 * Created by Administrator on 14-8-28.
 */
module flappybirdx{

    export class Con{
        public static fig:any;
    }

    export class GameContainer extends egret.DisplayObjectContainer{

        private map:flappybirdx.Map;

        private bird:flappybirdx.Bird;

        public constructor(config:any){
            super();
            flappybirdx.Con.fig = config;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
        }

        private createGameScene():void{

            //背景
            this.map = new flappybirdx.Map();//创建可滚动的背景
            this.addChild(this.map);
            this.map.load();

            //bird
            this.bird = new flappybirdx.Bird();
            this.addChild(this.bird);
            this.bird.ready();
        }
    }
}
/**
 * Created by Administrator on 14-8-28.
 */
module flappybirdx{


    export class GameUtil{

        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function createBitmapBySpriteName(spriteName:string, name:string):egret.Bitmap{

        var imgs:egret.SpriteSheet = RES.getRes(spriteName);
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = imgs.getTexture(name);
        return img;
    }

    export function createBitmapBySprite(sprite:egret.SpriteSheet, name:string):egret.Bitmap{

        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = sprite.getTexture(name);
        return img;
    }

    /**
     * 创建在X轴上的重复图片
     * @param name
     * @param isBottomLayout 是否从bottom 开始布局，如果是则y的定位会减去texture 本身的高度
     * @param x
     * @param y
     */
    export function createInXRepeatBitMaps(name:string, x:number, y:number, isBottomLayout:boolean, target:egret.DisplayObjectContainer):Array<egret.Bitmap>{

        var bg:egret.Texture = RES.getRes(name);
        var bgWidth = bg.textureWidth;
        var bgHeight = bg.textureHeight;

        var bgCount:number = Math.ceil(target.stage.stageWidth / bgWidth) + 1;
        var bgs = [];
        for(var i:number = 0; i < bgCount; i ++){
            var _grassBm:egret.Bitmap = flappybirdx.createBitmapByName(name);
            _grassBm.x = i * bgWidth + x;
            _grassBm.y = isBottomLayout ? (y - bgHeight) : y;

            bgs.push(_grassBm);
            target.addChild(_grassBm);
        }
        return bgs;
    }



}
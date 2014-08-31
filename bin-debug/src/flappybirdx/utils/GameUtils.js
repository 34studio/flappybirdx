/**
* Created by Administrator on 14-8-28.
*/
var flappybirdx;
(function (flappybirdx) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**基于矩形的碰撞检测*/
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return GameUtil;
    })();
    flappybirdx.GameUtil = GameUtil;
    GameUtil.prototype.__class__ = "flappybirdx.GameUtil";

    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    flappybirdx.createBitmapByName = createBitmapByName;

    function createBitmapBySpriteName(spriteName, name) {
        var imgs = RES.getRes(spriteName);
        var img = new egret.Bitmap();
        img.texture = imgs.getTexture(name);
        return img;
    }
    flappybirdx.createBitmapBySpriteName = createBitmapBySpriteName;

    function createBitmapBySprite(sprite, name) {
        var img = new egret.Bitmap();
        img.texture = sprite.getTexture(name);
        return img;
    }
    flappybirdx.createBitmapBySprite = createBitmapBySprite;

    /**
    * 创建在X轴上的重复图片
    * @param name
    * @param isBottomLayout 是否从bottom 开始布局，如果是则y的定位会减去texture 本身的高度
    * @param x
    * @param y
    */
    function createInXRepeatBitMaps(name, x, y, isBottomLayout, target) {
        var bg = RES.getRes(name);
        var bgWidth = bg.textureWidth;
        var bgHeight = bg.textureHeight;

        var bgCount = Math.ceil(target.stage.stageWidth / bgWidth) + 1;
        var bgs = [];
        for (var i = 0; i < bgCount; i++) {
            var _grassBm = flappybirdx.createBitmapByName(name);
            _grassBm.x = i * bgWidth + x;
            _grassBm.y = isBottomLayout ? (y - bgHeight) : y;

            bgs.push(_grassBm);
            target.addChild(_grassBm);
        }
        return bgs;
    }
    flappybirdx.createInXRepeatBitMaps = createInXRepeatBitMaps;
})(flappybirdx || (flappybirdx = {}));

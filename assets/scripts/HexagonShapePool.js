// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Common = require("Common");
var Shapes = require("Shapes");
var Transform = require("Transform");

cc.Class({
    extends: cc.Component,

    properties: {
     
        index: 0, 
        board: {
            default: null,
            type: cc.Node
        },
        
        hexagonPrefab: {
            default: null,
            type: cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:



    onLoad () {
        // cc.log("shape");

        var shape = Shapes.getShareAtIndex();
        cc.log(shape.color);
        for(var pointIndex = 0; pointIndex < shape.points.length; pointIndex += 2){
            var points = shape.points;
            var x = points[pointIndex];
            var y = points[pointIndex + 1];

            var sprite =  cc.instantiate(this.hexagonPrefab);
            var posiiton = Transform.pointToValue(x, y);
            sprite.x = posiiton.x;
            sprite.y = posiiton.y;
            var hexagon = sprite.getComponent("Hexagon");
            hexagon.color = shape.color;
        

            this.node.addChild(sprite);
        }
    },

    start () {
      
    },

    // update (dt) {},
});

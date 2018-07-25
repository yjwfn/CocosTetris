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
        _initX: 0,
        _initY: 0,
        _initScale: 1,
        _shape: null,
        _touchStart: false,
        _touchEnd: false,
        index: 0, 
        board: {
            default: null,
            type: cc.Node
        },

        hexagonPrefab: {
            default: null,
            type: cc.Prefab,
        }, 
        
    },
    recreate: function(){
        var shape = Shapes.getShareAtIndex();
        this.node.removeAllChildren(true);
        for(var pointIndex = 0; pointIndex < shape.points.length; pointIndex += 2){
            var points = shape.points;
            var x = points[pointIndex];
            var y = points[pointIndex + 1];

            var sprite =  cc.instantiate(this.hexagonPrefab);
            var position = Transform.pointToValue(x + shape.offsetX, y + shape.offsetY);
            sprite.x = position.x;
            sprite.y = position.y;
            var hexagon = sprite.getComponent("Hexagon");
            hexagon.color = shape.color;
            this.node.addChild(sprite);
        }

        this._shape = shape;
    },
    // LIFE-CYCLE CALLBACKS:



    onLoad () {
        // cc.log("shape");
        this.recreate();
        
        //TODO 事件冲突解决
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            cc.log("Touch start for shape")
          
            if(this._touchStart){
                return;
            }
             
            this._touchStart = true;
            if(this._initX == 0 && this._initY == 0){
                this._initX = this.node.x;
                this._initY = this.node.y;
                this._initScale = this.node.scaleX;
            }

            var scaleUp = cc.scaleTo(0.1,1.5);
            var moveUp = cc.moveTo(0.1, cc.p(event.getLocationX(), event.getLocationY()));
            
            this.node.runAction(cc.spawn(scaleUp, moveUp));
        
            
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
           
            
        },this);

        var touchEnd = function(event){
            if(this._touchEnd || !this._touchStart){
                return;
            }


            this._touchEnd = true;
            var scaleDown = cc.scaleTo(0.1, this._initScale);
            var moveDown = cc.moveTo(0.1, cc.p(this._initX, this._initY));
            var callback = cc.callFunc(function(){
                this._touchStart = this._touchEnd = false;
            }, this);
            this.node.runAction(cc.sequence(cc.spawn(scaleDown, moveDown), callback));
        };
        this.node.on(cc.Node.EventType.TOUCH_END, touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, touchEnd, this);
    },

    start () {
      
    },

    // update (dt) {},
});

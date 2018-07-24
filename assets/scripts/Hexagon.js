var Common = require("Common");

var COLORS = Common.COLORS;


var Hexagon = cc.Class({
    extends: cc.Component,
    statics:{
     
    },

    properties: {
        width: 61,
        height: 67,
        scale: 1,
        color: "",    
    },

    setSpriteFrameByColor: function(color){
        if(color){
            cc.loader.loadRes(color, cc.SpriteFrame, function(err, spriteFrame){
                var sprite = this.node.getComponent( cc.Sprite );
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        }
    }
    ,
    onLoad: function() {
        this.node.anchorX = 0.5;
        this.node.anchorY = 0.5;
        this.node.scaleX = this.scale;
        this.node.scaleY = this.scale;
        this.node.width = this.width;
        this.node.height = this.height;
        var textureByName = this.color  ?  this.color :  Common.getColorWithOffset(); 
        this.setSpriteFrameByColor(textureByName);
    }
   
 });


var Common = require("Common");
var Transform = require("Transform");


var Board = cc.Class({
    extends: cc.Component,
    statics:{
    
    },
    properties: {
        hexagonPrefab: {
            default: null,
            type: cc.Prefab,
        }
    },
    put: function(shape){


     
        return false;
    },

 
    onLoad:function () {
        this.node.width = this.width;
        this.node.height = this.height;

        for(var i = -Common.BOARD_RADIUS; i <= Common.BOARD_RADIUS; i++){
            for(var j = -Common.BOARD_RADIUS; j <= Common.BOARD_RADIUS; j++){
                //-1 -2 -3 -4 ROW
                //-4 -3 -2 -1 0 1 2 3 4  COL

                //ROW 1 2 3 4 
                //COL -1 -2 -3 -4 0 1 2 3 4    
                if(i != 0 && Math.abs(i + j) > Common.BOARD_RADIUS)
                    continue;
 
               
                var scale = 0.8;    
                var width = Common.DEFAULT_BOARD_HEXAGON_WIDTH  * scale;
                var height = Common.DEFAULT_BOARD_HEXAGON_HEIGHT  * scale;
                   
                var posiiton = Transform.pointToValue(i, j, {scale: scale});
                var sprite =  cc.instantiate(this.hexagonPrefab);
                sprite.x = posiiton.x;
                sprite.y = posiiton.y;
                var hexagon = sprite.getComponent("Hexagon");
                hexagon.scale = scale;
                hexagon.color = Common.COLORS.GRAY;
                this.node.addChild(sprite);

                cc.log("positon: %f, %f, size: %d, %d", posiiton.x, posiiton.y, width, height);
            }
        }

        // this.node.active = false;
        
    }


     
})

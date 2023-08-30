

class Player {
    constructor(x, y, w, options,color) {
        this.w = w;
        //this.body = Bodies.polygon(x, y, 3, 25, options)
        this.body = Bodies.rectangle(x, y, w, w, options);//1
        World.add(world, this.body);

        this.show = function () {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            //translate(-center.x,-center.y)
            rotate(angle);
            
            rectMode(CENTER);
            strokeWeight(5);
            stroke(color);
       
            rect(0, 0, this.w, this.w);//1
            line(0,0,0,-w/2)

            //triangle(0,-20,15,20,-15,20);
            pop();
        };
    }
}
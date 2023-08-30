class Bullet {
    constructor(x, y, w, options,color) {
     
        this.body = Bodies.rectangle(x, y, w, w, options);
        this.w = w;
      
        World.add(world, this.body);

        this.show = function () {
            var pos = this.body.position;
            var angle = this.body.angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            strokeWeight(5);
            stroke(color);
            //fill(97);
            rect(0, 0, this.w, this.w);
            pop();
        };
    }
}
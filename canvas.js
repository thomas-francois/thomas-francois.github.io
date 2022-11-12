const space = document.getElementById('canvas');
const canvasContainer = document.getElementsByClassName("homepageMain")[0];
const spaceCtx = space.getContext('2d');


let screen;
let points;
let pointsNbr = 300;
let mouse = {x: 0 ,y: 0}
const friction = 0.7;
const maxRayon = 100;
const accPower = 1;

onmousemove = function(e){mouse.x = e.clientX; mouse.y = e.clientY;}

setupPoints();
updatePoints();

window.onresize = function() {
    setupPoints();
};


function Point() {
    this.x = Math.random() * screen.w;
    this.y = Math.random() * screen.h;
    this.xSpeed = Math.random();
    this.ySpeed = Math.random();
    this.xBaseSpeed = this.xSpeed;
    this.yBaseSpeed = this.ySpeed;

    this.rad = Math.random() * 15 + 10;


    this.move = function() {
      	this.x += this.xSpeed;
    	this.y += this.ySpeed;
    	
    	if (this.x > screen.w) {this.x = -20;}
    	if (this.x + 20 < 0) {this.x = screen.w}
    	if (this.y > screen.h) {this.y = -20;}
    	if (this.y + 20 < 0) {this.y = screen.h}

    	this.mouseInterfer();
    	
    	if (Math.abs(this.xSpeed) >= this.xBaseSpeed + 0.05) {
    		this.xSpeed = this.xSpeed * 0.97;
    	}
    	if (Math.abs(this.ySpeed) >= this.yBaseSpeed + 0.05) {
    		this.ySpeed = this.ySpeed * 0.97;
    	}
    	console.log(this.xSpeed);

    	

    };

	this.mouseInterfer = function(){
		let dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2)
		if (dist < maxRayon){
			this.xSpeed += ((this.x - mouse.x) / dist ** 1.5) * accPower;
			this.ySpeed += ((this.y - mouse.y) / dist ** 1.5) * accPower;
		}
	}

    this.show = function(){
    	spaceCtx.beginPath();
    	spaceCtx.fillStyle = "rgba(255, 255, 255 ,.03)";
    	spaceCtx.arc(this.x ,this.y ,this.rad ,0 ,Math.PI * 2);
    	spaceCtx.fill();

    };
}




function setupPoints() {
	space.width = canvasContainer.offsetWidth;
	space.height = canvasContainer.offsetHeight;
    screen = {
        w: canvasContainer.offsetWidth + 20,
        h: canvasContainer.offsetHeight + 20,
    };
    window.cancelAnimationFrame(updatePoints);

    points = [];
    for (let i = 0; i < 300; i++) {
        points[i] = new Point();
        points[i].show();
    }
}



function updatePoints() {
    spaceCtx.fillStyle = "#1a1325";
    spaceCtx.fillRect(0, 0, screen.w, screen.h);

    points.forEach(function (p) {
        p.show();
        p.move();
    });

    window.requestAnimationFrame(updatePoints);
}



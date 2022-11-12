var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

var navBarBack = document.getElementsByClassName("navBarBackground")[0];
var navBar = document.getElementsByClassName("navBar")[0];
var scroll = document.getElementsByClassName("scrollArrow")[0];
var logo = document.getElementsByClassName("logo")[0];
const btn = document.getElementById("button");

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


function revealDescription(arrow) {
	const currentPos = Number(arrow.style.top.slice(0, -2));
	var siblings = arrow.parentNode.childNodes;

	if (currentPos == 0 || currentPos == -4){
		arrow.style.top = -16 + 'vw';
		arrow.style.transform = "rotate(-45deg)";
		siblings.forEach(sibling =>{
			if (sibling.className == "cardPreviewCrop"){
				sibling.style.setProperty("--limit" ,"0%");
			}
			if (sibling.className == "cardTitle" || sibling.className == "cardSubtitle"){
				sibling.style.transform = "translate(0 ,-20vw)";
			}
			if (sibling.className == "cardDescription"){
				sibling.style.opacity = "1";
			}
		})
		

	}else{
		arrow.style.top = -4 + 'vw';
		arrow.style.transform = "rotate(-135deg)";
		siblings.forEach(sibling =>{
			if (sibling.className == "cardPreviewCrop"){
				sibling.style.setProperty("--limit" ,"80%");
			}
			if (sibling.className == "cardTitle" || sibling.className == "cardSubtitle"){
				sibling.style.transform = "translate(0 ,0)";
			}
			if (sibling.className == "cardDescription"){
				sibling.style.opacity = "0";
			}
		})
	}
}


function scrollToCv(){
	document.getElementById("CV").scrollIntoView({behavior: 'smooth'});
}


document.querySelectorAll(".cardArrow").forEach(item => {
	item.addEventListener('mouseenter', event => {
		const arrow = document.getElementById(event.srcElement.id);
		const currentPos = Number(arrow.style.top.slice(0, -2));
		if (currentPos == 0 || currentPos == -4){
			arrow.style.transform = "translate(25px, 0) rotate(-135deg)";
	}
  })
})


document.querySelectorAll(".cardArrow").forEach(item => {
	item.addEventListener('mouseleave', event => {
		const arrow = document.getElementById(event.srcElement.id);
		const currentPos = Number(arrow.style.top.slice(0, -2));
		if (currentPos == 0 || currentPos == -4){
			arrow.style.transform = "rotate(-135deg)";
	}
  })
})


window.addEventListener("scroll", function() {
	if(this.pageYOffset > 30) {
		navBarBack.style.opacity = "1";
		navBar.style.transform = "translate(0 ,-15px)";
		navBarBack.style.transform = "translate(0 ,-30px)";
	} else{
		navBarBack.style.opacity = "0";
		navBar.style.transform = "translate(0 ,0)";
		navBarBack.style.transform = "translate(0 ,0)";
	}

	if (vw > 700){
		if(this.pageYOffset > vh - 90) {
			logo.style.display = 'flex';
			logo.style.position = 'relative';
			logo.style.width = 'auto';
			navBarBack.style.borderBottom = "0px"
		} else{
			logo.style.display = 'none';
			logo.style.position = 'absolute';
			navBarBack.style.borderBottom = "0px solid var(--red)"
		}
	}


	if (this.pageYOffset < 300) {
		scroll.style.opacity = '1';
	} else {
		scroll.style.opacity = '0';
	}
})


function copyEmail (element) {
	navigator.clipboard.writeText('thomas.francois@utt.fr');
	element.style.opacity = '0';

	setTimeout(() => {
		element.style.transition = "none";
		element.style.marginRight = '36.3vh';
		element.textContent = "Copied !";
		element.style.textDecoration = "none";
	} ,200);
	setTimeout(() => {
		element.style.transition = "0.2s ease-in-out";
		element.style.opacity = '1';
	} ,450);

	setTimeout(() => {
		element.style.opacity = '0';
	} ,2050);

	setTimeout(() => {
	   element.style.transition = "none";
	   element.textContent = "thomas.francois@utt.fr";
	   element.style.textDecoration = "underline 2px";
	   element.style.marginRight = '0';
    }, 2450);

    setTimeout(() => {
    	element.style.transition = "0.2s ease-in-out";
		element.style.opacity = '1';
    }, 2600);
}


function sendMessage(){
	var inputs = document.getElementsByClassName("feedback-input");
		inputs[0].value="";
		inputs[1].value="";
		inputs[2].value="";
}


btn.addEventListener("click", ()=>{
    if(btn.innerText === "Send"){
        btn.innerText = "Sent !";
        setTimeout(() => {
			btn.innerText = "Send";
		} ,2000);
    }
});


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
	onmousemove = function(e){mouse.x = e.clientX; mouse.y = e.clientY;}
	
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
    updatePoints();
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


setupPoints();


window.onresize = function() {
    setupPoints();
};




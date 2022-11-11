var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

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



// document.addEventListener('DOMContentLoaded', function(){
// 		const title = document.getElementById("Title");
// 		// title.style.font = "8vw";
// 		// title.style.setProperty("font-size" ,"8vw");
// 		title.style.transform = "scale(2)";
// 	}, false);


var navBar = document.getElementsByClassName("navBarBackground")[0];
var scroll = document.getElementsByClassName("scrollArrow")[0];
var logo = document.getElementsByClassName("logo")[0];


window.addEventListener("scroll", function() {
	if(this.pageYOffset > 50) {
		navBar.style.opacity = "1";
	} else{
		navBar.style.opacity = "0";
	}
	
	if(this.pageYOffset > vh - 90) {
		logo.style.display = 'flex';
		logo.style.position = 'relative';
		logo.style.width = 'auto';
	} else{
		logo.style.display = 'none';
		logo.style.position = 'absolute';
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
	var y = document.getElementsByClassName("feedback-input");
		y[0].value="";
		y[1].value="";
		y[2].value="";
	
}




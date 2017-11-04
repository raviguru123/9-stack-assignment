

(function(){

	function init(){
		var canvas = document.getElementsByTagName('canvas')[0];
		var c = canvas.getContext('2d');

		var container = {x:100,y:100,width:1200,height:800};
		var circles = [{x:400,y:400,r:25,color:25,vx:6,vy:10},
		{x:500,y:300,r:25,color:125,vx:2,vy:-8},
		{x:800,y:350,r:25,color:285,vx:20,vy:-20},
		{x:800,y:700,r:25,color:325,vx:13,vy:-8},
		{x:400,y:500,r:25,color:175,vx:-4,vy:-6},
		{x:400,y:600,r:25,color:175,vx:-4,vy:-6}

		];


		function draw(){
			c.fillStyle = 'black';
			c.strokeStyle = 'black';
			c.fillRect(container.x,container.y,container.width,container.height);
         //c.clearRect(container.x,container.y,container.width,container.height);
         //c.strokeRect(container.x,container.y,container.width,container.height);

         for(var i=0; i <circles.length; i++){

         	c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
         	c.beginPath();
         	c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
         	c.fill();

         	c.clearRect((container.width)/2,(container.height)/2,100,100);
         	c.fillStyle =circles[i].color;
         	c.beginPath();
         	c.fillRect((container.width)/2,(container.height)/2,100,100);

         	if((circles[i].x + circles[i].vx + circles[i].r >=(container.width)/2) && (circles[i].y + circles[i].vy + circles[i].r >container.height/2) && (circles[i].y + circles[i].vy + circles[i].r <=(container.height/2)+200)){
         		console.log("first");
         		c.arc(0, 0, canvas.width, canvas.height);
         	}

         	if((circles[i].x + circles[i].vx + circles[i].r <= (container.width)/2)+200 && (circles[i].y + circles[i].vy + circles[i].r >container.height/2) && (circles[i].y + circles[i].vy + circles[i].r <=(container.height/2)+200)){
         		console.log("second");
         	}


         	if((circles[i].y + circles[i].vy + circles[i].r >= (container.height)/2) && (circles[i].x + circles[i].vx + circles[i].r >=container.width/2) && (circles[i].x + circles[i].vx + circles[i].r <=(container.width/2)+200)){
         		console.log("third");
         	}

         	if((circles[i].y + circles[i].vy + circles[i].r <= (container.height)/2)+200 && (circles[i].x + circles[i].vx + circles[i].r >=container.width/2) && (circles[i].x + circles[i].vx + circles[i].r <=(container.width/2)+200)){
         		console.log("fourth");
         	}







         	if((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
         		circles[i].vy = - circles[i].vy;
         	}


         	if((circles[i].x + circles[i].vx + circles[i].r > container.x + container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)){
         		circles[i].vx = - circles[i].vx;
         	}
         	if((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)){
         		circles[i].vy = - circles[i].vy;
         	}

         	for(j=0;j<circles.length;j++){
         		if(j!=i){
         			var dx = circles[i].x - circles[j].x;
         			var dy = circles[i].y - circles[j].y;
         			var distance = Math.sqrt(dx * dx + dy * dy);

         			if (distance < circles[i].r + circles[j].r) {

         				// circles[i].vx = - circles[i].vx;
         				// circles[i].vy = - circles[i].vy;
         				// circles[j].vx = - circles[j].vx;
         				// circles[j].vy = - circles[j].vy;
         				var vel_x1=circles[i].vx ;
         				var vel_y1=circles[i].vy;

         				circles[i].vx = circles[j].vx;
         				circles[i].vy = circles[j].vy;

         				circles[j].vx =vel_x1;
         				circles[j].vy =vel_y1;


         			}
         		}
         	}

         	circles[i].x +=circles[i].vx;
         	circles[i].y +=circles[i].vy;
         }



         requestAnimationFrame(draw);

     }


     requestAnimationFrame(draw);


 }

//invoke function init once document is fully loaded
window.addEventListener('load',init,false);

}());  //self invoking function
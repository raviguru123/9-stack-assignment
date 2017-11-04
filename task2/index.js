(function () {

	


	function init() {

		var canvas = document.getElementsByTagName('canvas')[0];
		var c = canvas.getContext('2d');

		var radius = 25;
        var s = 50; //square edge
        var container = { x: 0, y: 0, width: 900, height: 700 };
        var circles = [
        { x: getRandX(), y: getRandY(), r: radius, color: getRandomInt(30,330), vx: getRandVel(), vy: getRandVel() },
        { x: getRandX(), y: getRandY(), r: radius, color: getRandomInt(30,330), vx: getRandVel(), vy: getRandVel() },
        { x: getRandX(), y: getRandY(), r: radius, color: getRandomInt(30,330), vx: getRandVel(), vy: getRandVel() },
        { x: getRandX(), y: getRandY(), r: radius, color: getRandomInt(30,330), vx: getRandVel(), vy: getRandVel() },
        { x: getRandX(), y: getRandY(), r: radius, color: getRandomInt(30,330), vx: getRandVel(), vy: getRandVel() }

        


        ];
        var count = circles.length;

        function getRandVel (){
        	var min = 11;
        	var max = 19;
        	var vel = getRandomInt(min, max);
        	vel = Math.random() <0.5 ? -vel : vel;

        	return vel;
        }

        function getRandX (){
        	var RandX = getRandomInt(radius+5, container.width - radius - 5);
        	if(RandX + radius >= canvas.width /2 - s/2  &&  RandX - radius <= canvas.width /2 + s/2) 
        		RandX += 100;

        	return RandX;
        }
        function getRandY (){
        	return getRandomInt(radius+5, container.height - radius - 5);
        }
        function getRandomInt(min, max) {
        	min = Math.ceil(min);
        	max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }


        function score() {
            //scoreText = score1 + ":" + score2;
            scoreText = count.toString();
            c.beginPath();
            c.rect(canvas.width / 2 -25, canvas.height / 2 -25, 50, 50);
            c.strokeStyle = '#3c3c3c';
            c.stroke();
            c.font = 'bold 20pt Open Sans';
            c.fillStyle = '#FF4E50';
            c.fillText(scoreText, (canvas.width - scoreText.length * 15) / 2, (canvas.height + 9) / 2);
        }

        function draw() {

        	c.fillStyle = '#bef8cc';
        	c.strokeStyle = 'black';
        	c.fillRect(container.x, container.y, container.width, container.height);
            //c.clearRect(container.x,container.y,container.width,container.height);
            //c.strokeRect(container.x,container.y,container.width,container.height);

            score();

            for (var i = 0; i < circles.length; i++) {
            	c.fillStyle = 'hsl(' + circles[i].color + ',100%,50%)';
            	c.beginPath();
            	c.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI, false);
            	c.fill();

                //check if the ball has hit any of the container's walls

                if ((circles[i].x + circles[i].vx + circles[i].r > container.x + container.width) || (circles[i].x - circles[i].r + circles[i].vx < container.x)) {
                	circles[i].vx = - circles[i].vx;
                }
                if ((circles[i].y + circles[i].vy + circles[i].r > container.y + container.height) || (circles[i].y - circles[i].r + circles[i].vy < container.y)) {
                	circles[i].vy = - circles[i].vy;
                }

                //check if the ball has hit the square

                var s = 50; //score square edge

                if (circles[i].x + circles[i].r >= canvas.width / 2 - s / 2 && circles[i].x - circles[i].r <= canvas.width / 2 + s / 2
                	&& circles[i].y + circles[i].r >= canvas.height / 2 - s / 2 && circles[i].y - circles[i].r <= canvas.height / 2 + s / 2){
                        //delete circles[i];
                    circles[i].r = 0;
                    circles[i].x = -100;
                    circles[i].y = -100;
                    circles[i].vx = 0;
                    circles[i].vy = 0;
                    count -= 1;
                    score();

                }

                for (j = 0; j < circles.length; j++) {
                	if (j != i) {
                		var dx = circles[i].x - circles[j].x;
                		var dy = circles[i].y - circles[j].y;
                		var distance = Math.sqrt(dx * dx + dy * dy);

                		if (distance < circles[i].r + circles[j].r) {

                            // circles[i].vx = - circles[i].vx;
                            // circles[i].vy = - circles[i].vy;
                            // circles[j].vx = - circles[j].vx;
                            // circles[j].vy = - circles[j].vy;
                            var vel_x1 = circles[i].vx;
                            var vel_y1 = circles[i].vy;

                            circles[i].vx = circles[j].vx;
                            circles[i].vy = circles[j].vy;

                            circles[j].vx = vel_x1;
                            circles[j].vy = vel_y1;


                        }
                    }
                }

                circles[i].x += circles[i].vx;
                circles[i].y += circles[i].vy;
            }



            requestAnimationFrame(draw);

        }


        requestAnimationFrame(draw);


    }

    //invoke function init once document is fully loaded
    window.addEventListener('load', init, false);

}());  //self invoking function
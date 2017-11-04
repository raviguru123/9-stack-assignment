class Vec{
	constructor(x=0,y=0){
		this.x=x;
		this.y=y;
	}
}

class Rect{
	constructor(w,h){
		this.pos=new Vec;
		this.size=new Vec(w,h);
	}

	get top(){
		return this.pos.y+this.size.y/2;
	}

	get bottom(){
		return this.pos.y-this.size.y/2;
	}

	get left(){
		return this.pos.x-this.size.x/2;
	}

	get right(){
		return this.pos.x+this.size.x/2;
	}
}


class Ball extends Rect{
	constructor(){
		super(10,10);
		this.vel=new Vec;
	}
}




class Pong{

	constructor(canvas){
		this._canvas=canvas;
		this._context=canvas.getContext('2d');
		this.ball=new Ball;
		this.ball.pos.x=100;
		this.ball.pos.y=100;
		this.ball.vel.x=400;
		this.ball.vel.y=400;

		let lastTime;
		const callback=(millis)=>{
			if(lastTime){
				this.update((millis-lastTime)/1000);
			}

			lastTime=millis;
			requestAnimationFrame(callback);
		}

		callback();
	}

	drawrect(rect){
		this._context.fillStyle='red';
		this._context.fillRect(rect.pos.x,rect.pos.y,rect.size.x,rect.size.y);
	}


	draw(){
		this._context.fillStyle='yellow';
		this._context.fillRect(0,0,this._canvas.width,this._canvas.height);
		this.drawrect(this.ball);
	}

	update(dt){
		this.ball.pos.x+=this.ball.vel.x*dt;
		this.ball.pos.y+=this.ball.vel.y*dt;

		if(this.ball.left<=0 || this.ball.right>=this._canvas.width){
			this.ball.vel.x =-this.ball.vel.x ;
		}

		if(this.ball.bottom<=0 || this.ball.top>=this._canvas.height){
			this.ball.vel.y=-this.ball.vel.y;
		}

		this.draw();

	}
}



const canvas=document.getElementById('pong');
const context=canvas.getContext('2d');

let pong=new Pong(canvas);












var mViewWidth = 0,
	mViewHeight = 0,
	mCenterX = 0,
	mCenterY = 0,
	mCanvas = document.getElementById("canvas"),
	mCtx;

var mCircles = [],
	mImageFull;

var mImage = document.createElement('img');

mImage.crossOrigin = 'Anonymous';
mImage.src = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e5021087088843.5dadbf0b9c564.jpg';
mImage.onload = init;

function init() {
	initCanvas();
	initCircles();

	requestAnimationFrame(loop);
}

function initCanvas() {
	mViewWidth = mCanvas.width = mCanvas.clientWidth;
	mViewHeight = mCanvas.height = mCanvas.clientHeight;
	mCenterX = mViewWidth * 0.5;
	mCenterY = mViewHeight * 0.5;

	mCtx = mCanvas.getContext('2d');
}

function initCircles() {
	mImageFull = mCtx.createPattern(mImage, 'no-repeat');

	var tl = new TimelineMax({repeat:-1, repeatDelay:3}),
	duration = 10;

	var eases = [Power1, Power2, Power3, Back];

	for (var i = 0; i < 111; i++) {
		var circle = new Circle(i * 8),
			tr = (i % 2 ? 1 : -1) * Math.PI * 4,
			ease = eases[randomRange(0, eases.length) | 0];

		tl.to(circle, duration * randomRange(0.7, 1.5), {rotation:tr, ease:ease.easeInOut}, 0);

		mCircles.push(circle);
	}

	tl.progress(0.3);
}

function update() {

}

function draw() {
    mCtx.clearRect(0, 0, mViewWidth, mViewHeight);

    mCircles.forEach(function(c) {
        c.draw();
    })
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

/////////////////////////////
// CLASSES
/////////////////////////////

function Circle(r) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = mViewWidth;
    this.canvas.height = mViewHeight;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.beginPath();
    this.ctx.arc(mCenterX, mCenterY, r, 0, Math.TWO_PI);

    this.ctx.strokeStyle = mImageFull;
    this.ctx.lineWidth = 4;
    this.ctx.stroke();

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 0.25;
    this.ctx.stroke();

    this.rotation = 0;
}
Circle.prototype = {
    draw:function() {
        mCtx.save();
        mCtx.translate(mCenterX, mCenterY);
        mCtx.rotate(this.rotation);

        mCtx.drawImage(this.canvas, -mCenterX, -mCenterY);

        mCtx.restore();
    }
};


/////////////////////////////
// utils
/////////////////////////////

function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

Math.TWO_PI = Math.PI * 2;
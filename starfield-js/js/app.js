window.onload = function() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var stars = {};
  var starIndex = 0;
  var starNum = 2;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //initialise stuff
  function Star() {
    this.posX = Math.random() * canvas.width;
    this.posY = Math.random() * canvas.height;
    this.posZ = Math.random() * canvas.width;
    this.tempZ = this.posZ;

    starIndex++;
    stars[starIndex] = this;
    this.id = starIndex;
    this.life = 0;
    this.maxLife = Math.random() * 10 + 50;
    this.speed = 10;
  }

  // draw function
  Star.prototype.draw = function() {
    this.posX = this.posX + this.speed;

    context.beginPath();
    context.fillStyle = "white";
    context.arc(this.posX, this.posY, 1.5, 0, 2 * Math.PI);
    context.fill();

    this.life++;
    if (this.life >= this.maxLife) {
      delete stars[this.id]; //disintegrates stars
    }
  };

  //update function
  var update = function(time) {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < starNum; i++) {
      new Star();
    }

    for (var star in stars) {
      stars[star].draw();
    }
  };

  setInterval(function() {
    update();
  }, 60);
};

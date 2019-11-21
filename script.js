"use strict";

const anim = (() => {
    const canvasEl = document.getElementById("canvas");
    canvasEl.width = document.documentElement.clientWidth;
    canvasEl.height = document.documentElement.clientHeight;
    const ctx = canvasEl.getContext("2d");

    let mouse = {
        x: null,
        y: null
    };

    const maxRadius = 50;
    const colorArr = [
        "#035AA6",
        "#0477BF",
        "#DCEAF2",
        "#048ABF",
        "#04B2D9"
    ]

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Circle {
        constructor(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.minRadius = radius;
            this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.radius > canvasEl.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
    
            if (this.y + this.radius > canvasEl.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            
            this.x += this.dx;
            this.y += this.dy;

            this.draw();

            // Hover effect
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }
        }
    }

    
    let circleArr = [];
    let totalBalloons = 1000;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        totalBalloons = 150;
    }
    
    for (let i = 0; i < totalBalloons; i++) {
        let radius = (Math.random() * 10) + 1;
        const diameter = radius * 2;
        let x = Math.random() * (canvasEl.width - diameter) + radius;
        let y = Math.random() * (canvasEl.height - diameter) + radius;
        let dy = (Math.random() - 0.5) * 2;
        let dx = (Math.random() - 0.5) * 2;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
    
    (function animate() {
        requestAnimationFrame(animate);
        
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        
        for (let i = 0; i < circleArr.length; i++) {
            circleArr[i].update();
        }
        
    })();
    
    function resize() {
        const displayWidth = document.documentElement.clientWidth;
        const displayHeight = document.documentElement.clientHeight;

        if (canvasEl.width !== displayWidth || canvasEl.height !== displayHeight) {
            canvasEl.width = displayWidth;
            canvasEl.height = displayHeight;
        }
    }

    window.onresize = resize; // Only call func on resize event
})();
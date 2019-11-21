"use strict";

const anim = (() => {
    const canvasEl = document.getElementById("canvas");
    canvasEl.width = document.documentElement.clientWidth;
    canvasEl.height = document.documentElement.clientHeight;
    const ctx = canvasEl.getContext("2d");

    class Circle {
        constructor(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "purple";
            ctx.stroke();
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
        }
    }

    
    let circleArr = [];
    
    for (let i = 0; i < 100; i++) {
        const radius = 30;
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
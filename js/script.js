const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
const gravity = 0.1;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 50;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
        // if (
        //     this.position.x + this.width + this.velocity.x >= canvas.width ||
        //     this.position.x + this.width + this.velocity.x <= 0
        // ) {
        //     // console.log("stop");
        //     this.velocity.x = 0;
        // } else {
        //     this.position.x += this.velocity.x;
        // }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

const enemy = new Sprite({
    position: {
        x: 500,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

let keys = {
    a: { pressed: false },
    d: { pressed: false },
};
let lastKeyPressed;

player.draw();
enemy.draw();

let frame = 0;

const { a, d } = keys;
function animate() {
    // console.log("frame", frame++);
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;
    if (a.pressed && lastKeyPressed === "a") {
        return (player.velocity.x = -2);
    }
    if (d.pressed && lastKeyPressed === "d") {
        return (player.velocity.x = 2);
    }
}

animate();

window.addEventListener("keydown", (event) => {
    let eventKey = event.key;
    switch (eventKey.toLowerCase()) {
        case "a":
            a.pressed = true;
            lastKeyPressed = "a";
            break;
        case "d":
            d.pressed = true;
            lastKeyPressed = "d";
            break;

        default:
            break;
    }
    console.log(
        "🚀 ~ file: script.js:100 ~ window.addEventListener ~ event.key:",
        event.key
    );

    // keys[event.key].pressed = true;
    // lastKeyPressed = event.key;
});

window.addEventListener("keyup", (event) => {
    let eventKey = event.key;
    switch (eventKey.toLowerCase()) {
        case "a":
            a.pressed = false;
            break;
        case "d":
            d.pressed = false;
            break;

        default:
            break;
    }
    // keys[event.key].pressed = false;
});

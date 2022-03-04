window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const toolbar = document.querySelector('#tool-bar');
    const color = document.querySelector('#color');
    const lineWidth = document.querySelector('#line-width');
    const ctx = canvas.getContext('2d');
    const erase = document.querySelector('#erase');
    let isDrawing = true;

    // width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolbar.offsetHeight;

    // variables
    let painting = false;

    const startPosition = (e) => {
        painting = true;
        draw(e)
    }
    const endPosition = () => {
        painting = false;
        ctx.beginPath();
    }
    const draw = (e) => {
        if (!painting) return;
        if (!isDrawing) {
            ctx.clearRect(e.clientX, e.clientY - toolbar.offsetHeight, 50, 50);
        }
        else {
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWidth.value;
            ctx.strokeStyle = color.value;
            ctx.lineTo(e.clientX, e.clientY - toolbar.clientHeight);
            ctx.stroke();
            isDrawing = true;
        }
    }
    erase.addEventListener('click', () => {
        isDrawing = !isDrawing;
        if (!isDrawing) {
            canvas.classList.add('erase');
            erase.classList.add('eraser-active');
        } else {
            canvas.classList.remove('erase');
            erase.classList.remove('eraser-active');
        }
    })


    // event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseleave', endPosition);
    canvas.addEventListener('mousemove', draw);
})


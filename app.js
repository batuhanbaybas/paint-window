window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const toolbar = document.querySelector('#tool-bar');
    const color = document.querySelector('#color');
    const lineWidth = document.querySelector('#line-width');
    const ctx = canvas.getContext('2d');
    const erase = document.querySelector('#erase');
    const clear = document.querySelector('#clear');
    const line = document.querySelector('#line');
    // drawing mod default
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
    const endPosition = (e) => {
        painting = false;
    }
    // draw
    const draw = (e) => {
        if (!painting) return;
        // erase mode
        if (!isDrawing) {
            ctx.clearRect(e.clientX, e.clientY - toolbar.offsetHeight, 50, 50);
        }
        //drawing mode
        else {
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWidth.value;
            ctx.strokeStyle = color.value;
            ctx.lineTo(e.clientX, e.clientY - toolbar.clientHeight);
            ctx.stroke();

        }
    }
    // trigger erase mode
    erase.addEventListener('click', () => {
        isDrawing = !isDrawing;
        if (!isDrawing) {
            canvas.classList.add('erase');
            erase.classList.add('button-active');

        } else {
            canvas.classList.remove('erase');
            erase.classList.remove('button-active');
        }
    })

    
 
    // clear canvas
    clear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

    // event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseleave', endPosition);
    canvas.addEventListener('mousemove', draw);
})


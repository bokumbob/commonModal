export function documentList(documentName, doc = document){
    const list = doc.querySelectorAll(documentName);
    const listArr = Array.from(list);
    return listArr;
}

export function addEvent(elem, fc, type = 'click') {
    if(Array.isArray(elem)){
        elem.forEach(item => {
            item.addEventListener(type, fc)})
    } else {
        elem.addEventListener(type, fc)
    }
}

function modalResize(element) {
    const resizeLeft = element.querySelector('.modal-resize-left');
    const resizeRight = element.querySelector('.modal-resize-right');
    const resizeTop = element.querySelector('.modal-resize-top');
    const resizeBottom = element.querySelector('.modal-resize-bottom');
    const resizeRightBottom = element.querySelector('.modal-resize-right-bottom');
    const boundary = element.getBoundingClientRect();
    if(boundary){
        elementW = DEFAULTW;
        elementH = DEFAULTH;
        function moveUp(e){
            // let w = 0;
            let h = 0;
            function move (me) {
                // w = (me.screenX - e.screenX) + elementW;
                h = (me.screenY - e.screenY) + elementH;
                // element.style.width = `${w}px`
                element.style.height = `${h}px`
            }
            function remove () {
                document.body.removeEventListener('mousemove', move)
                // elementW = w;
                elementH = h;
            }
            addEvent(document.body, move, 'mousemove');
            addEvent(resizeBottom, remove, 'mouseup');
        };
        addEvent(resizeBottom, moveUp, 'mousedown');
    }
}

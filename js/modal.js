// 모달이 개개인으로 따로 만들어져있다
// 하나의 선택지 클릭 시 그에 해당하는 모달이 떠야 한다
// 모달은 크기 조절이 자유롭다
// 모달은 제목 부분을 클릭해야만 움직일 수 있다
// 내용을 입력해야만 컨펌이 활성화된다
import {documentList, addEvent} from './common.js';

let elementX = 0;
let elementY = 0;
const DEFAULTW = 334;
const DEFAULTH = 373;
let elementW = DEFAULTW;
let elementH = DEFAULTH;

function modalOpen(e) {
    const dataTitle = e.target.dataset.title;
    const modalListArr = documentList('.test-modal');
    const currentModal = modalListArr.filter(item => dataTitle === item.dataset.titleModal);
    currentModal[0]?.classList.add('active');

    const resizeLeft = currentModal[0].querySelector('.modal-resize-left');
    const resizeRight = currentModal[0].querySelector('.modal-resize-right');
    const resizeTop = currentModal[0].querySelector('.modal-resize-top');
    const resizeBottom = currentModal[0].querySelector('.modal-resize-bottom');
    const resizeRightBottom = currentModal[0].querySelector('.modal-resize-right-bottom');

    modalMove(currentModal[0]);
    modalResizeWrap(resizeRight, currentModal[0], elementW, 'width');
    modalResizeWrap(resizeBottom, currentModal[0], elementH, 'height');
    modalResizeWrap(resizeRightBottom, currentModal[0], elementH, 'height', elementW, 'width');
    modalClose(currentModal[0]);
}

function modalOpenAdd() {
    const sidebarList = documentList('.nav-link');
    addEvent(sidebarList, modalOpen);
}

function modalClose(element){
    const xBtnList = documentList('[data-close="close"]', element)
    function activeRemove () {
        element.classList.remove('active');
    }
    addEvent(xBtnList, activeRemove);
}

function modalMove(element){
    const modalheader = element.querySelector('.test-modal-header');
    function moveUp(e){
        let x = 0;
        let y = 0;
        function move (me) {
            x = (me.screenX - e.screenX) + elementX;
            y = (me.screenY - e.screenY) + elementY;
            element.style.transform = `translateX(${x}px) translateY(${y}px)`
        }
        function remove () {
            document.body.removeEventListener('mousemove', move)
            elementX = x;
            elementY = y;
        }
        addEvent(document.body, move, 'mousemove');
        addEvent(modalheader, remove, 'mouseup');
    };
    addEvent(modalheader, moveUp, 'mousedown');
}

function modalResizeWrap(elem, element, var1, style, var2 = null, style2 = null){
    let prev = 0;
    let prev2 = 0;
    function modalResize() {
            function moveUp(e){
                function move (me) {
                    if(var2) {
                        prev = (me.screenY - e.screenY) + var1;
                        prev2 = (me.screenX - e.screenX) + var2;
                        element.style[`${style}`] = `${prev}px`
                        element.style[`${style2}`] = `${prev2}px`
                    } else {
                        if(style === 'height'){
                            prev = (me.screenY - e.screenY) + var1;
                        } else {
                            prev = (me.screenX - e.screenX) + var1;
                        }
                        element.style[`${style}`] = `${prev}px`
                    }
                }
                function remove () {
                    document.removeEventListener('mousemove', move)
                    var1 = prev;
                    if(var2) var2 = prev2;
                }
                addEvent(document, move, 'mousemove');
                addEvent(elem, remove, 'mouseup');
            };
            addEvent(elem, moveUp, 'mousedown');
        }
        modalResize()
    }

modalOpenAdd()

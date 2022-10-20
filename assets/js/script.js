'use strict';
let header;
document.addEventListener('DOMContentLoaded', function () {
    header = new Header;
    let headerBtnBurger = document.querySelector('.header__burger');
    let headerBack = document.querySelector('.header__nav-back');
    let headerExit = document.querySelector('.header__nav__exit');
    if (headerBtnBurger) headerBtnBurger.addEventListener('click', header.openMenu)
    if (headerBack) headerBack.addEventListener('click', header.closeMenu)
    if (headerExit) headerExit.addEventListener('click', header.closeMenu);
    const setPaddingToFirstSection = function () {
        let firtsSection = document.querySelector('section');
        let padding = header.getHeight();
        if (!firtsSection || padding === null) return;
        firtsSection.style.paddingTop = Math.max(padding, 64) + 'px';
    }
    setPaddingToFirstSection();
    window.addEventListener('load', setPaddingToFirstSection);
    window.addEventListener('resize', setPaddingToFirstSection);

    new Swiper('.swiper-sertificats', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        loopedSlides: 5,
        slidesPerView: 1,
        spaceBetween: -20,
        breakpoints: {
            576: {
                spaceBetween: -40,
            },
            992: {
                spaceBetween: -210,
            },
            1030: {
                spaceBetween: -230,
            }
        }
    });

    new productPage();

    let mediaSM = window.matchMedia('(min-width: 576px)');
    let mediaMD = window.matchMedia('(min-width: 768px)');
    let productInRow = null;

    function handelOnChangeMedia(e) {
        if (e.matches) {
            productInRow = new Swiper('.products-slider-row__swiper', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                spaceBetween: 30,
                slidesPerView: 2,
                loop: true,
                breakpoints: {
                    1440: {
                        slidesPerView: 3,
                    }
                }
            });
        } else {
            if (productInRow !== null) productInRow.destroy();
        }
    }
    handelOnChangeMedia(mediaMD);
    mediaMD.addEventListener('change', handelOnChangeMedia);
});
window.addEventListener('load', function () {
    actionWithPointerLines();
    window.addEventListener('resize', actionWithPointerLines);

    let linksHeader = document.querySelectorAll('.header a[href^="#"');
    if (linksHeader) {
        for (let index = 0; index < linksHeader.length; index++) {
            const link = linksHeader[index];
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 30;
                if (!scrollTarget) return;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                header.closeMenu();
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        }
    }




    setTimeout(function () {
        let loader = document.querySelector('#preloader'); loader && loader.classList.add('is-loaded');
        setTimeout(function () {
            document.documentElement.classList.add('js-init-animation');
        }, 500)
    }, 100)
});

class productPage {
    currentActiveIndex = 0;
    maxIndex = null;
    prevButton = document.querySelector('.section-product__prev-btn');
    nextButton = document.querySelector('.section-product__next-btn');
    stackMoves = [];
    canRunMove = true;
    textes = new Swiper('.section-product__splider-text', {
        slidesPerView: 1,
        spaceBetween: 60,
        speed: 700,
        // loop: true,
        breakpoints: {
            768: {
                allowTouchMove: false,
            }
        }
    })
    imges = new Swiper('.section-product__splider-img', {
        slidesPerView: 1,
        spaceBetween: -100,
        speed: 700,
        // loop: true,
        breakpoints: {
            420: {
                spaceBetween: -200,
            },
            576: {
                spaceBetween: -300,
            },
            768: {
                allowTouchMove: false,
            }
        }
    })
    brandsProduct = new Swiper('.swiper__brands-product', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        grid: {
            fill: 'row',
            rows: 3,
        },
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                grid: {
                    rows: 2
                }
            },
            992: {
                slidesPerView: 3,
                grid: {
                    rows: 2
                }
            }
        }
    });
    requestForFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

            window.setTimeout(callback, 1000 / 60);

        };
    cancelForFrame = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame;

    constructor() {
        this.maxIndex = (this.imges && this.imges.slides && this.imges.slides.length - 1) || (this.textes && this.textes.slides && this.textes.slides.length - 1) || null;
        if (this.imges.slides) {
            let length = 0;
            for (let index = 0; index < this.imges.slides.length; index++) {
                if (this.imges.slides[index].classList.contains('swiper-slide')) length++;
                if (length > 1) break;
            }
            if (this.prevButton && length > 1) {
                this.prevButton.classList.add('js-ready');
                this.prevButton.addEventListener('click', () => {
                    this.setActiveIndex(this.currentActiveIndex - 1);
                })
            }
            if (this.nextButton && length > 1) {
                this.nextButton.classList.add('js-ready');
                this.nextButton.addEventListener('click', () => {
                    this.setActiveIndex(this.currentActiveIndex + 1);
                })
            }
        }

        this.textes.on('slideChange', (swiper) => {
            this.setActiveIndex(swiper.activeIndex);
        })
        this.imges.on('slideChange', (swiper) => {
            this.setActiveIndex(swiper.activeIndex);
        })
        let thisImg = this.imges;
        let thisText = this.textes;

        let allImagesAllowToSlide = document.querySelectorAll('.swiper__brands-product-allow-click');
        if (allImagesAllowToSlide) {
            for (let index = 0; index < allImagesAllowToSlide.length; index++) {

                allImagesAllowToSlide[index].addEventListener('click', function () {
                    console.log(index + 1);
                    thisImg.slideTo(index + 1);
                    thisText.slideTo(index + 1);
                    window.scrollTo({
                        top: 100,
                        behavior: "smooth"
                    });
                })
            }
        }
        let allFirstSlidesImages = document.querySelectorAll('.swiper__brands-product-first-slide');
        if (allFirstSlidesImages) {
            for (let index = 0; index < allFirstSlidesImages.length; index++) {
                allFirstSlidesImages[index].addEventListener('click', function () {
                    thisImg.slideTo(0);
                    thisText.slideTo(0);
                    window.scrollTo({
                        top: 100,
                        behavior: "smooth"
                    });
                })
            }
        }

        this.runStack();
    }

    setActiveIndex = (index) => {
        this.stackMoves.push(() => new Promise((resolve) => {
            let result = index; let rewind = false;
            if (this.maxIndex && result < 0) { result = this.maxIndex; rewind = true }
            if (this.maxIndex && result > this.maxIndex) { result = 0; rewind = true }
            let modeTransition;
            if (rewind) {
                if (result === 0) modeTransition = 'next';
                if (result === this.maxIndex) modeTransition = 'prev';
            } else {
                let diff = result - this.currentActiveIndex;
                switch (diff) {
                    case 0: modeTransition = 'none'; break;
                    case 1: modeTransition = 'next'; break;
                    case -1: modeTransition = 'prev'; break;
                    default: modeTransition = 'move'; break;
                }
            }
            if (modeTransition === 'none') {
                resolve(true);
            } else {
                if (this.imges.activeIndex !== result) this.moveSlide(this.imges, modeTransition, result);
                if (this.textes.activeIndex !== result) this.moveSlide(this.textes, modeTransition, result);
                this.currentActiveIndex = result;
                resolve(true);
            }
        }))

    }
    moveSlide = (slider, mode, index = null) => {
        if (mode === 'none' || (mode === 'move' && index === null)) return;
        switch (mode) {
            case 'move': slider.slideTo(700, index); return;
            case 'next': slider.slideNext(700); return;
            case 'prev': slider.slidePrev(700); return;
        }
    }
    runStack = () => {
        let loop = () => {
            if (this.canRunMove === true && this.stackMoves[0]) {
                this.canRunMove = false;
                this.stackMoves[0].apply(this).then(res => {
                    this.canRunMove = true;
                })
                this.stackMoves.shift();
            }
            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    }
}

function actionWithPointerLines() {
    let allPointerLines = document.querySelectorAll('.section-3__pointer-line');
    if (!allPointerLines) return;

    for (let index = 0; index < allPointerLines.length; index++) {
        const pointLine = allPointerLines[index];
        pointLine.style.height = '0';
        pointLine.style.display = 'block';
        pointLine.style.top = '0px';

        const parentText = pointLine.parentElement.querySelector('.section-3__text');
        const nextText = pointLine.parentElement.nextElementSibling && pointLine.parentElement.nextElementSibling.querySelector('.section-3__text');
        if (parentText && nextText) {
            const react1 = parentText.getBoundingClientRect(),
                react2 = nextText.getBoundingClientRect(),
                reactLine = pointLine.getBoundingClientRect();
            const height = react2.top - (react1.top + parentText.offsetHeight),
                top = (react1.top + parentText.offsetHeight) - reactLine.top;

            pointLine.style.height = height + 'px';
            pointLine.style.top = top + 'px';
        } else {
            pointLine.style.display = 'none';
        }
    }
}

class Header {
    mainParent = document.querySelector('.header');

    openMenu = function () {
        document.documentElement.classList.add('js-open-menu');
    }
    closeMenu = function () {
        document.documentElement.classList.remove('js-open-menu');
    }
    getHeight = function () {
        if (!this.mainParent) return null;
        return this.mainParent.offsetHeight;
    }
}
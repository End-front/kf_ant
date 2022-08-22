'use strict';
let header;
document.addEventListener('DOMContentLoaded', function() {
    header = new Header;
    let headerBtnBurger = document.querySelector('.header__burger');
    let headerBack = document.querySelector('.header__nav-back');
    let headerExit = document.querySelector('.header__nav__exit');
    if(headerBtnBurger) headerBtnBurger.addEventListener('click', header.openMenu)
    if(headerBack) headerBack.addEventListener('click', header.closeMenu)
    if(headerExit) headerExit.addEventListener('click', header.closeMenu);
    const setPaddingToFirstSection = function() {
        let firtsSection = document.querySelector('section');
        let padding = header.getHeight();
        if(!firtsSection || padding === null) return;
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
    
    productPage();

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
            if(productInRow !== null) productInRow.destroy();
        }
    }
    handelOnChangeMedia(mediaMD);
    mediaMD.addEventListener('change', handelOnChangeMedia);
});
window.addEventListener('load', function() {
    actionWithPointerLines();
    window.addEventListener('resize', actionWithPointerLines);

    let linksHeader = document.querySelectorAll('.header a[href^="#"');
    if (linksHeader) {
        for (let index = 0; index < linksHeader.length; index++) {
            const link = linksHeader[index];
            link.addEventListener('click', function(e) {
                e.preventDefault();
                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 30;
                if(!scrollTarget) return;
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
    

  

    setTimeout(function() {
        let loader = document.querySelector('#preloader'); loader && loader.classList.add('is-loaded');
        setTimeout(function() {
            document.documentElement.classList.add('js-init-animation');
        }, 500)
    }, 100)
});

function productPage() {
    let prevButton = document.querySelector('.section-product__prev-btn');
    let nextButton = document.querySelector('.section-product__next-btn');
    let textes = new Swiper('.section-product__splider-text', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 60,
        allowTouchMove: false,
        speed: 700,
    })
    let imges = new Swiper('.section-product__splider-img', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: -100,
        allowTouchMove: false,
        speed: 700,
        breakpoints: {
            420: {
                spaceBetween: -200,
            },
            576: {
                spaceBetween: -300,
            }
        }
    })
    let brandsProduct = new Swiper('.swiper__brands-product', {
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
                    rows : 2
                }
            },
            992: {
                slidesPerView: 3,
                grid: { 
                    rows : 2
                }
            }
        }
    });

    if(imges.slides) {
        let length = 0;
        for (let index = 0; index < imges.slides.length; index++) {
            if (imges.slides[index].classList.contains('swiper-slide')) length++;
            if(length > 1) break;
        }
        if(prevButton && length > 1) {
            prevButton.classList.add('js-ready');
            prevButton.addEventListener('click', function() {
                imges.slidePrev();
                textes.slidePrev();
            })
        }
        if(nextButton && length > 1) {
            nextButton.classList.add('js-ready');
            nextButton.addEventListener('click', function() {
                imges.slideNext();
                textes.slideNext();
            })
        }
    }

    let allImagesAllowToSlide = document.querySelectorAll('.swiper__brands-product-allow-click');
    if(allImagesAllowToSlide) {
        for (let index = 0; index < allImagesAllowToSlide.length; index++) {
            allImagesAllowToSlide[index].addEventListener('click', function() {
                imges.slideTo(index + 2);
                textes.slideTo(index + 2);
                window.scrollTo({
                    top: 100,
                    behavior: "smooth"
                });
            })
        }
    }
    let allFirstSlidesImages = document.querySelectorAll('.swiper__brands-product-first-slide');
    if(allFirstSlidesImages) {
        for (let index = 0; index < allFirstSlidesImages.length; index++) {
            allFirstSlidesImages[index].addEventListener('click', function() {
                imges.slideTo(1);
                textes.slideTo(1);
                window.scrollTo({
                    top: 100,
                    behavior: "smooth"
                });
            })
        }
    } 
}

function actionWithPointerLines() {
    let allPointerLines = document.querySelectorAll('.section-3__pointer-line');
    if(!allPointerLines) return;

    for (let index = 0; index < allPointerLines.length; index++) {
        const pointLine = allPointerLines[index];
        pointLine.style.height = '0';
        pointLine.style.display = 'block';
        pointLine.style.top = '0px';

        const parentText = pointLine.parentElement.querySelector('.section-3__text');
        const nextText = pointLine.parentElement.nextElementSibling && pointLine.parentElement.nextElementSibling.querySelector('.section-3__text');
        if(parentText && nextText) {
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

    openMenu = function() {
        document.documentElement.classList.add('js-open-menu');
    }
    closeMenu = function() {
        document.documentElement.classList.remove('js-open-menu');
    }
    getHeight = function() {
        if(!this.mainParent) return null;
        return this.mainParent.offsetHeight;
    }
}
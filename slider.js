document.addEventListener("DOMContentLoaded", function(event) {

  var slider = document.querySelector('.slider');

  var leftButton = slider.querySelector('.slider-control.left');
  var rightButton = slider.querySelector('.slider-control.right');

  var indicatorOL = slider.querySelector('.slider-indicators');
  var indicators = slider.querySelectorAll('.slider-indicators li');

  var items = slider.querySelectorAll('.slider-items .item');

  var timeout;


  function nextSlide(active) {
    return active === items.length - 1 ? 0 : active + 1;
  }

  function prevSlide(active) {
    return active === 0 ? items.length - 1 : active - 1;
  }


  function findActiveSlidePos() {

    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains('active')) {
        return i;
      }
    }
  }

  function findNextSlidePos(direction) {

    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains(direction)) {
        return i;
      }
    }
  }

  function startAnimation(slideToShow, type) {

    var activeSlide = findActiveSlidePos();

    if (timeout) {
      clearTimeout(timeout);
    }

    items[slideToShow].classList.add(type);

    setTimeout(function(){
      items[slideToShow].classList.add('move');
      indicators[activeSlide].classList.remove('active');
      indicators[slideToShow].classList.add('active');
    }, 0);


    items[slideToShow].addEventListener("transitionend", function(e){

      e.target.removeEventListener("transitionend", arguments.callee);

      items[activeSlide].classList.remove('active');
      items[slideToShow].classList.add('active');
      items[slideToShow].classList.remove(type);
      items[slideToShow].classList.remove('move');

      timeout = setTimeout(function() {
        startAnimation(nextSlide(slideToShow), 'next');
      }, 2000);

    });

  }


  init();

  function init() {

    rightButton.addEventListener('click', function() {

      var activeSlide = findActiveSlidePos();
      startAnimation(nextSlide(activeSlide), 'next');

    });

    leftButton.addEventListener('click', function() {
      var activeSlide = findActiveSlidePos();
      startAnimation(prevSlide(activeSlide), 'prev');
    });


    indicatorOL.addEventListener('click', function(e) {

      if (!e.target.dataset || !e.target.dataset.slideTo) {
        return;
      }

      var activeSlide = findActiveSlidePos();

      var newSlide = Number(e.target.dataset.slideTo);

      if (newSlide != activeSlide) {
        startAnimation(newSlide, activeSlide < newSlide ? 'next' : 'prev');
      }

    });

    timeout = setTimeout(function() {
      var activeSlide = findActiveSlidePos();
      startAnimation(nextSlide(activeSlide), 'next');
    }, 2000);


  }



});
var StackCards = function (element) {
    this.element = element;
    this.items = this.element.getElementsByClassName("card-stack");
    this.scrollingListener = false;
    this.scrolling = false;
    initStackCardsEffect(this);
};

function initStackCardsEffect(element) {
    // use Intersection Observer to trigger animation
    var observer = new IntersectionObserver(stackCardsCallback.bind(element));
    observer.observe(element.element);
}

function stackCardsCallback(entries) {
    // Intersection Observer callback
    if (entries[0].isIntersecting) {
        // cards inside viewport - add scroll listener
        if (this.scrollingListener) return; // listener for scroll event already added
        stackCardsInitEvent(this);
    } else {
        // cards not inside viewport - remove scroll listener
        if (!this.scrollingListener) return; // listener for scroll event already removed
        window.removeEventListener("scroll", this.scrollingListener);
        this.scrollingListener = false;
    }
}

function stackCardsInitEvent(element) {
    element.scrollingListener = stackCardsScrolling.bind(element);
    window.addEventListener("scroll", element.scrollingListener);
}

function stackCardsScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
}

function animateStackCards() {
    var top = this.element.getBoundingClientRect().top;
    var offsetTop = 100,
        cardHeight = 800,
        marginY = 15;
    for (var i = 0; i < this.items.length; i++) {
        // cardTop/cardHeight/marginY are the css values for the card top position/height/Y offset
        var scrolling = offsetTop - top - i * (cardHeight + marginY);
        // debugger;
        if (scrolling > 0) {
            // card is fixed - we can scale it down
            this.items[i].setAttribute(
                "style",
                "transform: translateY(" +
                marginY * i +
                "px) scale(" +
                (cardHeight - scrolling * 0.01) / cardHeight +
                ");"
            );
        }
    }

    this.scrolling = false;
}

var stackCards = document.getElementsByClassName("card-deck-js");
var intersectionObserverSupported =
    "IntersectionObserver" in window && "IntersectionObserverEntry" in window;

if (stackCards.length > 0 && intersectionObserverSupported) {
    for (var i = 0; i < stackCards.length; i++) {
        new StackCards(stackCards[i]);
    }
}
/*
https://youtu.be/zwl3kZPZ8H8
*/

const text = document.querySelector(".text");
text.innerHTML = text.innerText
    .split("")
    .map(
        (char, i) => `<span style="transform:rotate(${i * 13.0}deg)">${char}</span>`
    )
    .join("");


document.getElementById('circle').addEventListener('click', function () {
    window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });
});

const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;
  
  TweenMax.to($bigBall, .4, {
    x: x - 15,
    y: y - 15
  })
  TweenMax.to($smallBall, .1, {
    x: x - 5,
    y: y - 7
  })
}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .3, {
    scale: 4
  })
}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .3, {
    scale: 1
  })
}
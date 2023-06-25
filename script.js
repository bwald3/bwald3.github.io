
  const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });



  // 3d mouse
  const el = document.getElementById('followContainer')

  function detectaCoordsElem(e){
     var coords = e.getBoundingClientRect()
     return{ x: coords.left + coords.width/2, y: coords.top + coords.height/2}
  }
  function mueveElem(el,x,y){
     el.style.setProperty('transform',`rotateY(${x/20}deg) rotateX(${-y/20}deg)`)
  }

  document.addEventListener('mousemove', function(e){
     var x = e.clientX-detectaCoordsElem(el).x
     var y = e.clientY-detectaCoordsElem(el).y
     mueveElem(el,x,y)
  })

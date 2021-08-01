(function () {
    let element = document.querySelector('.header_nav_background')
    element.style.opacity = '0'
    function onScroll () {
        let top = document.body.getBoundingClientRect().top
        if (top > -50) {
            element.style.opacity = '0'
        } else {
            element.style.opacity = '1'
        }    
    }
    
    window.addEventListener('scroll', onScroll)
})()
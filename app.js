(function () {


    let navBackground = document.querySelector('.header_nav_background')
    navBackground.style.opacity = '0'
    function onScroll () {
        let top = document.body.getBoundingClientRect().top
        if (top > -50) {
            navBackground.style.opacity = '0'
        } else {
            navBackground.style.opacity = '1'
        }    
    }
    window.addEventListener('scroll', onScroll)



    function $createDivWithClass (className) {
        let $div = $('<div class="' + className +'"></div>')
        return $div
    }
    
    function createNavigation (element) {
        this.$nextButton = $createDivWithClass('next_button next_button--active')
        this.$prevButton = $createDivWithClass('prev_button prev_button--active')
        element.append(this.$nextButton)
        element.append(this.$prevButton)
        this.$nextButton.on('click', function () {
            index
            index++
            gotoItem(index)
        })
        this.$prevButton.on('click', function () {
            index--
            gotoItem(index)
        })
    }
    
    function gotoItem (index) {
        let translateX = index * -100 / this.items.length
        translate(translateX)
        if (index >= this.items.length - 1 && this.enableNav) {
            this.$nextButton.removeClass('next_button--active')
            this.$prevButton.addClass('prev_button--active')
        } else if (index <= 0 && this.enableNav) {
            this.$nextButton.addClass('next_button--active')
            this.$prevButton.removeClass('prev_button--active')
        } else {
            if (this.enableNav) {
                this.$nextButton.addClass('next_button--active')
                this.$prevButton.addClass('prev_button--active')
            }
        }
        for (k = 0; k < this.paginationButtons.length; k++) {
            let paginationButton = this.paginationButtons[k]
            if (paginationButton.dataset.index_redirect == index) {
                paginationButton.classList.add('active_button')
            } else {
                paginationButton.classList.remove('active_button')
            }
        }
    }

    function disableNav () {
        if (this.enableNav === false) {
            if (this.$nextButton.hasClass('next_button--active')) {
                this.$nextButton.removeClass('next_button--active')
            }
            if (this.$prevButton.hasClass('prev_button--active')) {
                this.$prevButton.removeClass('prev_button--active')
            }
        }
        if (this.enableNav) {
            this.enableNav = false
        }
    }

    function enableNav () {
        if (this.enableNav === false) {
            this.enableNav = true
        }
    }

    function disableTransition () {
        this.$container.css('transition', 'none')
    }

    function enableTransition () {
        this.$container.css('transition', '')
    }
    
    function translate(percent) {
        this.$container.css('transform', 'translate3d(' + percent + '%, 0, 0)')
    }

    function startDrag (e) {
        if (e.touches) {
            if (e.touches.length > 1) {
                return
            } else {
                e = e.touches[0]
            }
        }
        this.origin = {x: e.screenX, y: e.screenY}
        this.width = this.$container[0].offsetWidth
        disableTransition()
    }

    function drag (e) {
        if (this.origin) {
            function translateX(percent) {
                this.$container.css('transform', 'translate3d(' + percent + '%, 0, 0)')
            }
            let point = e.touches ? e.touches[0] : e
            let translate = {x: point.screenX - this.origin.x, y: point.screenY - this.origin.y}
            if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
                e.preventDefault()
                e.stopPropagation()
            }
            let baseTranslate = this.index * -100 / this.items.length
            this.lastTranslate = translate
            translateX(baseTranslate + 100 * translate.x / this.width)
        }
    }

    function endDrag (e) {
        if (this.origin && this.lastTranslate) {
            enableTransition()
            if (Math.abs(this.lastTranslate.x / this.$element[0].offsetWidth) > 0.2) {
                if (this.lastTranslate.x < 0 && this.index < this.items.length - 1) {
                    index++
                    gotoItem(index)
                } else if (this.lastTranslate.x > 0 && this.index > 0) {
                    index--
                    gotoItem(index)
                } else {
                    gotoItem(this.index)
                }
            } else {
                gotoItem(this.index)
            }
        }
        this.origin = null
    }

    
    this.$element = $('.carousel')
    let $children = $(this.$element.children())
    this.$container = $createDivWithClass('carousel__container').css('width', 100 * $children.length + "%")
    this.$element.prepend(this.$container)
    this.index = 0
    this.items = []
    for (let i = 0; i < $children.length; i++) {
        let item = $createDivWithClass('carousel__item')
        let child = $children[i]
        item.append(child)
        this.$container.append(item)
        items[i] = item
    }
    
    this.paginationButtons = $('.pagination').children()
    this.paginationButtons.on('click', function () {
        let indexRedirect = this.dataset.index_redirect
        $(this).siblings().removeClass('active_button')
        $(this).addClass('active_button')
        gotoItem(indexRedirect)
        index = indexRedirect
    })
    
    this.enableNav = true
    createNavigation(this.$element)
    gotoItem(index)

    setInterval(function () {
            if (index >= this.items.length - 1) {
                index = 0
                gotoItem(index)
            } else {
                index++
                gotoItem(index)
            }
    }, 20000)

    this.$container[0].addEventListener('dragstart', e => e.preventDefault())
    window.addEventListener('mousedown', enableNav)
    window.addEventListener('touchstart', disableNav)
    this.$container[0].addEventListener('touchstart', startDrag.bind(this))
    window.addEventListener('touchmove', drag.bind(this))
    window.addEventListener('touchend', endDrag.bind(this))
    window.addEventListener('touchcancel', endDrag.bind(this))

})()

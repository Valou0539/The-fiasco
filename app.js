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
        $container.css('transform', 'translate3d(' + translateX + '%, 0, 0)')
        if (index >= this.items.length - 1) {
            this.$nextButton.removeClass('next_button--active')
            this.$prevButton.addClass('prev_button--active')
        } else if (index <= 0) {
            this.$nextButton.addClass('next_button--active')
            this.$prevButton.removeClass('prev_button--active')
        } else {
            this.$nextButton.addClass('next_button--active')
            this.$prevButton.addClass('prev_button--active')
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
    
    let $element = $('.carousel')
    let $children = $($element.children())
    let $container = $createDivWithClass('carousel__container').css('width', 100 * $children.length + "%")
    $element.prepend($container)
    this.index = 0
    this.items = []
    for (let i = 0; i < $children.length; i++) {
        let item = $createDivWithClass('carousel__item')
        let child = $children[i]
        item.append(child)
        $container.append(item)
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
    
    createNavigation($element)
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
    
})()

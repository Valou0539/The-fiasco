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
        this.$nextButton = $createDivWithClass('next_button')
        this.$prevButton = $createDivWithClass('prev_button')
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
        if (this.enableNav) {
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
                $('html').css('overflow-y', 'hidden')
            } else {
                $('html').css('overflow-y', '')
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
        $('html').css('overflow-y', '')
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

    window.notMobileOrTablet = function() {
        let check = true;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = false;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    this.enableNav = notMobileOrTablet()
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
    this.$container[0].addEventListener('touchstart', startDrag.bind(this))
    window.addEventListener('touchmove', drag.bind(this))
    window.addEventListener('touchend', endDrag.bind(this))
    window.addEventListener('touchcancel', endDrag.bind(this))

})()

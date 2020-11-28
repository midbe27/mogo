$(function () {
  const header = $('#header'),
    introHeight = $('#intro').innerHeight() - 5
  let scrollOffset = $(window).scrollTop()


  /* Fixed header */
  checkScroll(scrollOffset)

  $(window).on('scroll', function () {
    scrollOffset = $(this).scrollTop()
    checkScroll(scrollOffset)


    /* Toggle active link on nav bar on scroll*/
    let fromTop = scrollOffset + navHeight

    let currentScrollItem = scrollItems.map(function (index, element) {
      if (fromTop > $(element).offset().top) return this
    })

    currentScrollItem = currentScrollItem[currentScrollItem.length - 1]

    let id = currentScrollItem && currentScrollItem.length ? currentScrollItem[0].id : ""

    navItems
      .removeClass("active")
      .filter("[data-scroll='#" + id + "']").addClass("active");

  })

  function checkScroll() {
    if (scrollOffset > introHeight) {
      header.addClass('fixed')
    } else {
      header.removeClass('fixed')
    }
  }


  /* Toggle active link on nav bar */
  let navHeight = $('.nav').innerHeight(),
    navItems = $('[data-scroll]')

  let scrollItems = navItems.map(function () {
    return $($(this).attr('data-scroll'))
  })

  /* Smooth scroll */
  navItems.on('click', function (event) {
    event.preventDefault()

    let $this = $(this),
      blockId = $(this).data('scroll'),
      blockOffset = $(blockId).offset().top

    $('#nav a').removeClass('active')
    $this.addClass('active')

    $('html, body').animate({
      scrollTop: blockOffset
    }, 500)

    if (window.innerWidth <= 770) {
      navToggle()
    }
  })


  /* Nav hamburger btn toggle */
  $('#nav-toggle').on('click', function (event) {
    event.preventDefault()

    navToggle()
  })

  function navToggle() {
    $('#nav-toggle').toggleClass('active')
    $('#nav').toggleClass('active')
  }


  /* Collapse */
  $('[data-collapse]').on('click', function (event) {
    event.preventDefault()

    let $this = $(this),
      blockId = $(this).data('collapse')

    $('[data-collapse]').removeClass('active')
    $this.toggleClass('active')
  })


  /* Slider */
  $('[data-slider]').slick({
    infinite: true,
    fade: false,
    slidesToShow: 1,
    slideToScroll: 1
  })
})
$(function () {
  // Шапка сайта и высота главного блока с текстом
  const header = $('#header'),
    introHeight = $('#intro').innerHeight() - 5
  // Скролл с верху
  let scrollOffset = $(window).scrollTop()


  /* Fixed header */
  checkScroll(scrollOffset)

  // При скролле
  $(window).on('scroll', function () {
    scrollOffset = $(this).scrollTop()
    checkScroll(scrollOffset)


    /* Toggle active link on nav bar on scroll*/
    // Сколько просколлили + высоты меню
    let fromTop = scrollOffset + navHeight

    // Массив с значениями скролла каждого блока
    let currentScrollItem = scrollItems.map(function (index, element) {
      // Записывать только те блоки, которые еще не проскроллили
      if (fromTop > $(element).offset().top) return this
    })

    // Последний элемент массива
    currentScrollItem = currentScrollItem[currentScrollItem.length - 1]

    // Получить id блока
    let id =
      // Если элемент есть
      currentScrollItem && currentScrollItem.length
        // Вернуть его id
        ? currentScrollItem[0].id
        // Если нет элемента, вернуть пустую строку
        : ""

    navItems
      // Удалить класс active у всех ссылок в меню
      .removeClass("active")
      // Вернуть ссылку, с ссылкой на блок
      .filter("[data-scroll='#" + id + "']")
      // Добавить ссылке класс active
      .addClass("active");

  })

  // Функция, проверяющаю, проскролли ли мы первый блок
  function checkScroll() {
    if (scrollOffset > introHeight) {
      // Если да, то закрепить шапку
      header.addClass('fixed')
    } else {
      // Если нет, но открепить ее
      header.removeClass('fixed')
    }
  }


  /* Toggle active link on nav bar */
  // Высота блока меню
  let navHeight = $('.nav').innerHeight(),
    // Ссылки на блоки
    navItems = $('[data-scroll]')

  // Новый массив с id блоков
  let scrollItems = navItems.map(function () {
    return $($(this).attr('data-scroll'))
  })

  /* Smooth scroll */
  // При клике на ссылку, в шапке
  navItems.on('click', function (event) {
    // Отменяет действие по умолчанию
    event.preventDefault()

    // Сама ссылка
    let $this = $(this),
      // Id блока
      blockId = $(this).data('scroll'),
      // Скролл свурху до нужног блока
      blockOffset = $(blockId).offset().top

    // Убрать у ссылок класс active
    navItems.removeClass('active')
    // Добавить класс active ссылке, на которую нажали
    $this.addClass('active')

    // Плавно просколить до нужно блока
    $('html, body').animate({
      scrollTop: blockOffset
    }, 500)

    // Если планшеты и телефоны, то переключать бургер
    if (window.innerWidth <= 770) {
      navToggle()
    }
  })


  /* Nav hamburger btn toggle */
  // При клике на бургер
  $('#nav-toggle').on('click', function (event) {
    // Отменять действие по умолчанию
    event.preventDefault()

    // Переключать бургер
    navToggle()
  })

  function navToggle() {
    // Переключать класс active у бургера
    $('#nav-toggle').toggleClass('active')
    // Переключать класс active у меню
    $('#nav').toggleClass('active')
  }


  /* Collapse */
  // При клике на аккордеон
  $('[data-collapse]').on('click', function (event) {
    // Отменять действие по умолчанию
    event.preventDefault()

    // Закрыть все аккордеоны
    $('[data-collapse]').removeClass('active')
    // Открыть аккордеон, на который нажали
    $(this).addClass('active')
  })


  /* Slider */
  // Слайдер
  $('[data-slider]').slick({
    // Бесконечно
    infinite: true,
    // Появление
    fade: false,
    // Количество слайдов, которые нужно показать
    slidesToShow: 1,
    // Количество слайдов, которые нужно проскроллить
    slideToScroll: 1
  })
})
$(function() {

  $('.has-mega > a').on('click', function(e) {

    if ($(window).width() <= 1024) {

      e.preventDefault();

     

      var slug = $(this).parent().data('mega');

      var $targetMenu = $('#mega-' + slug);



      // 切換開關狀態

      if ($targetMenu.is(':visible')) {

        $targetMenu.slideUp(300);

        $(this).parent().removeClass('is-open');

      } else {

        // 先把其他可能開著的 Mega Menu 關掉

        $('.c-mega-menu').slideUp(300);

        $('.has-mega').removeClass('is-open');

       

        // 展開目前這一個

        $targetMenu.slideDown(300);

        $(this).parent().addClass('is-open');

      }

    }

  });

});

$(function() {

  if ($(window).width() <= 1024) {

    // 把每個 mega menu 搬家到它對應的 li 裡面

    $('.has-mega').each(function() {

      var slug = $(this).data('mega');

      var $menu = $('#mega-' + slug);

      $(this).append($menu); // 直接把 div 塞進 li 裡面

    });

  }

});

$(function() {
    var $window = $(window);

    // --- 第一層：點擊導航展開 Mega Menu ---
    $('.has-mega > a').on('click', function(e) {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            var $li = $(this).parent();
            var $menu = $li.find('.c-mega-menu');

            if ($li.hasClass('is-open')) {
                $menu.slideUp(300);
                $li.removeClass('is-open');
            } else {
                $('.has-mega').removeClass('is-open').find('.c-mega-menu').slideUp(300);
                $menu.slideDown(300);
                $li.addClass('is-open');
            }
        }
    });

    // --- 第二層：點擊大類展開標籤 (MB 專用) ---
    $(document).on('click', '.c-cat-btn', function(e) {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            var $btn = $(this);
            var target = $btn.data('target');
            var $menu = $btn.closest('.c-mega-menu');
            
            // 找到該大類對應的 Panel (原本在右邊，現在要搬到按鈕下面或直接顯示)
            var $targetPanel = $menu.find('#mega-panel-' + target);

            if ($btn.hasClass('is-active')) {
                $targetPanel.slideUp(300);
                $btn.removeClass('is-active');
            } else {
                // 關閉同層級其他已打開的大類
                $menu.find('.c-cat-btn').removeClass('is-active');
                $menu.find('.c-mega-menu__panel').slideUp(300);

                // 展開目前點擊的大類
                $targetPanel.slideDown(300);
                $btn.addClass('is-active');
            }
        }
    });
});




//側選單
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.js-hamburger');
    const sidebar = document.querySelector('.js-mobile-sidebar');
    const overlay = document.querySelector('.js-close-sidebar');

    function toggleMenu() {
        // 切換 active 類別（請根據您的 CSS 命名修改，例如 'is-open' 或 'is-active'）
        sidebar.classList.toggle('is-active');
        hamburger.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
});




/*按鈕*/

$(function () {
  $("#go").click(function () {
    $("html,body").animate({ scrollTop: $("#top").offset().top }, 1000);
  });
});

/*滑到最底部新增class*/
$(window).scroll(function () {
  var documentHeight = $("body").height();
  var windowHeight = $(window).height();
  var twentyPercentHeight = 0.15 * documentHeight;

  // 最後一頁scrollTop=body-window，預留20%
  last = documentHeight - windowHeight - twentyPercentHeight;

  if ($(window).scrollTop() >= last) {
    $(".connection").addClass("NO");
  } else {
    $(".connection").removeClass("NO");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var pic = document.querySelector(".follower");

  document.addEventListener("mousemove", function (e) {
    
    var x = e.pageX;
    var y = e.pageY;
    pic.style.left = x - 5 + "px";
    pic.style.top = y - 5 + "px";
  });


  document.querySelectorAll("a").forEach(function (anchor) {
    if (
      !anchor.classList.contains("btn_arrow") &&
      !anchor.classList.contains("btn_img")
    ) {
      anchor.addEventListener("mouseenter", function () {
        pic.classList.add("is-active");
      });

      anchor.addEventListener("mouseleave", function () {
        pic.classList.remove("is-active");
      });
    }
  });

  // 添加 .menu 元素的事件
  document.querySelectorAll(".menu").forEach(function (menu) {
    menu.addEventListener("mouseenter", function () {
      pic.classList.add("is-active");
    });

    menu.addEventListener("mouseleave", function () {
      pic.classList.remove("is-active");
    });
  });

  // 添加 .mouse2 元素的事件
  document.querySelectorAll(".mouse2").forEach(function (mouse2) {
    mouse2.addEventListener("mouseenter", function () {
      pic.classList.add("is-active2");
    });

    mouse2.addEventListener("mouseleave", function () {
      pic.classList.remove("is-active2");
    });
  });
});

$(document).ready(function () {
  // 生成一個隨機的查詢字串來防止快取
  function generateNoCacheUrl(url) {
    return url + "?_=" + new Date().getTime();
  }

  // 處理 html 底下的所有圖片
  $("html img").each(function () {
    var currentSrc = $(this).attr("src");
    if (currentSrc) {
      var newSrc = generateNoCacheUrl(currentSrc);
      $(this).attr("src", newSrc);
    }
  });

  // 處理 html 底下的所有 JavaScript 檔案
  $("html script").each(function () {
    var currentSrc = $(this).attr("src");
    if (currentSrc) {
      var newSrc = generateNoCacheUrl(currentSrc);
      $(this).attr("src", newSrc);
    }
  });

  // 處理 html 底下的所有 CSS 檔案
  $('html link[rel="stylesheet"]').each(function () {
    var currentHref = $(this).attr("href");
    if (currentHref) {
      var newHref = generateNoCacheUrl(currentHref);
      $(this).attr("href", newHref);
    }
  });

  // 處理 html 底下的所有 rel="image_src" 的 link 標籤
  $('html link[rel="image_src"]').each(function () {
    var currentHref = $(this).attr("href");
    if (currentHref) {
      var newHref = generateNoCacheUrl(currentHref);
      $(this).attr("href", newHref);
    }
  });
});

/*麵包穴*/

$(function() {
  function checkScroll() {
    if ($(window).scrollTop() > 70) {
       $('.crumbs div').stop().fadeOut("fast");
    } else {
      $('.crumbs div').fadeIn("fast");
    }
  }

  // 在页面加载时立即检查滚动位置
  checkScroll();

  // 在滚动时检查滚动位置
  $(window).scroll(function() {
    checkScroll();
  });
});


/*看更多相關*/
var swiper = new Swiper('.list_other', {
  speed: 2000,
  loop: false,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  watchOverflow: true,
  breakpoints: {
    551: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

/*複製網址*/
$(document).ready(function() {

  //複製連結
  $('[data-trigger="copy"]').on('click', function(e) {
    var temp = $('<input>'); // 建立input物件
    $('body').append(temp); // 將input物件增加到body
    var url = $(this).data('url'); // 取得要複製的連結
    temp.val(url).select(); // 將連結加到input物件value
    document.execCommand('copy'); // 複製
    temp.remove(); // 移除input物件
  });


});

$(function () {
            $('figure.bg').addClass('page_bg');

            $('[data-trigger="copy"]').on('click', function (e) {
                var url = $(this).data('url');
                navigator.clipboard.writeText(url).then(function () {
                    alert("連結已複製"); // success 
                }).catch(function () {
                    //alert("err"); // error
                });
            });
        });

/*分享按鈕滾動*/
window.addEventListener('scroll', function() {
    var txtContentMain = document.querySelector('.txt_content_main');
    var menuShare = document.querySelector('.menu_share');
    
    // 檢查滾動位置是否超過了 .txt_content_main 元素的頂部
    if (window.scrollY > txtContentMain.offsetTop) {
        menuShare.classList.add('active');
    } else {
        menuShare.classList.remove('active');
    }
});

const serviceData = {
  "face-sculpt": {
    icon: "assets/images/icon-face.png",
    title: "臉部雕塑 — 填補凹陷、豐唇、消淚溝",
    highlight: "你是否覺得自己明明沒有變胖...",
    desc: "其實影響外觀的不只是皮膚狀態...",
    items: [
      { name: "StarFill玻尿酸", alias: "星星針", img: "item01.jpg" },
      { name: "NeoFilera 妮芙露", alias: "澎澎針", img: "item02.jpg" }
      // ... 更多項目
    ]
  },
  "skin-tighten": {
    // 另一個分類的資料
  }
};
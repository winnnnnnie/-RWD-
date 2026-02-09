
/*選單*/


/*kv*/
var swiper = new Swiper('.recruitment_kv', {
  speed: 2000,
  loop: true,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 3000, // 設定自動播放的延遲時間（毫秒）
    disableOnInteraction: false // 用戶互動後是否停止自動播放
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  watchOverflow: true,
});


/*s1按鈕*/
$(function() {
      $(".s1_2 li a").hover(
        function() {
          $(".s1_2").addClass("active2");
        }, 
        function() {
          $(".s1_2").removeClass("active2");
        }
      );
    });

/*s1 7大按鈕*/

$(function() {
  function activateElements(buttonClass, elementsToActivate) {
    const activeClass = 'active';
    const allElements = '.s1_btn1, .s1_txt1, ' +
                        '.s1_btn2, .s1_txt2, ' +
                        '.s1_btn3, .s1_txt3, ' +
                        '.s1_btn4, .s1_txt4, ' +
                        '.s1_btn5, .s1_txt5, ' +
                        '.s1_btn6, .s1_txt6, ' +
                        '.s1_btn7, .s1_txt7';

    $(buttonClass).on("click touchend", function(e) {
      e.stopPropagation();
      $(allElements).removeClass(activeClass);
      $(elementsToActivate).addClass(activeClass);
    });
  }

  activateElements('.s1_btn1', '.s1_btn1, .s1_txt1');
  activateElements('.s1_btn2', '.s1_btn2, .s1_txt2');
  activateElements('.s1_btn3', '.s1_btn3, .s1_txt3');
  activateElements('.s1_btn4', '.s1_btn4, .s1_txt4');
  activateElements('.s1_btn5', '.s1_btn5, .s1_txt5');
  activateElements('.s1_btn6', '.s1_btn6, .s1_txt6');
  activateElements('.s1_btn7', '.s1_btn7, .s1_txt7');
});
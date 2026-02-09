//輪播大集合
var swiper = new Swiper(".js-swiper-mega", {
  cssMode: true,
  loop: true,

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".js-mega-pagination",
    clickable: true,
  },

  observer: true,
  observeParents: true,

  mousewheel: true,
  keyboard: true,
});

//首頁-KV
var swiper = new Swiper(".js-swiper-hero", {
  cssMode: true,
  loop: true,

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".js-hero-pagination",
    clickable: true,
  },
  
  keyboard: true,

  breakpoints: {
    1280: {
      // PC 版可以在這裡覆寫設定
      mousewheel: true,
    }
  }
});

// 首頁-美麗知識庫

var swiper = new Swiper(".js-swiper-insights", {
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  slidesPerView: "auto",
   slidesPerView: 1.2,      // 手機版看到一張多一點，提示後面還有
  spaceBetween: 20,       // 手機版的縫隙大小
  slidesOffsetBefore: 20,
  centeredSlides: false,
  loop: true,

  // 2. 響應式斷點
  breakpoints: {
    768: {
      slidesPerView: 1.1,
      spaceBetween: 20,
      centeredSlides: false,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
    },
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 40,
      centeredSlides: false,
    },
    

    1920: {
      slidesPerView: 3.2,
      spaceBetween: 40,
      centeredSlides: false,
      slidesOffsetBefore: 40,
      slidesOffsetAfter: 40,
    },
  },

  // 3. 導航與分頁
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".js-insights-pagination",
    clickable: true,
  },
});

// 2. 分院介紹輪播 (獨立設定)
var branchSwiper = new Swiper(".js-swiper-branch", {
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  slidesPerView: 1.5,      // 手機版看到一張多一點，提示後面還有
  spaceBetween: 40,       // 手機版的縫隙大小

  slidesOffsetBefore: 40, // 第一張 ( px)
  slidesOffsetAfter: 40, // 最後一張 ( px)

 
  loop: true,
  loopedSlides: 5,
  breakpoints: {
    768: {
      slidesPerView: 1.5,
      spaceBetween: 40,
      centeredSlides: false, // 桌機版若想靠左排可設為 false
    },
    1024: {
      slidesPerView: 3.5, // 桌機版看到 3 張半
      spaceBetween: 40,
      centeredSlides: false, // 桌機版若想靠左排可設為 false
    },
    1920: {
      slidesPerView: 4.5,
      spaceBetween: 40,
      centeredSlides: false, // 桌機版若想靠左排可設為 false
    },
  },

  // 指定分院專用的導航與分頁 Class
  navigation: {
    nextEl: ".js-branch-next",
    prevEl: ".js-branch-prev",
  },
});

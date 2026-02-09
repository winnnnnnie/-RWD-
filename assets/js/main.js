//pc 展開選單
$(function () {
  var $window = $(window);

  function isPC() {
    return $window.width() >= 1280;
  }

  function initPCMegaMenu() {
    // 1. 處理導覽項目 (Top Level)
    $(".has-mega").on("mouseenter", function () {
      if (!isPC()) return;

      var $this = $(this);
      var megaId = $this.data("mega"); // 取得 service
      var $targetMega = $("#mega-" + megaId);

      // 鎖定當前導覽項狀態
      $this.addClass("is-active");
      $targetMega.stop(true, true).fadeIn(200);
    });

    // 處理導覽項目離開 (注意：要包含選單本體，防止閃爍)
    $(".has-mega, .c-mega-menu").on("mouseleave", function (e) {
      if (!isPC()) return;

      // 檢查滑鼠是否移向了對應的選單或導覽項，如果是則不關閉
      var $navItem = $(".has-mega");
      var $megaMenu = $(".c-mega-menu");

      if (!$navItem.is(e.relatedTarget) && $navItem.has(e.relatedTarget).length === 0 &&
          !$megaMenu.is(e.relatedTarget) && $megaMenu.has(e.relatedTarget).length === 0) {
        
        $navItem.removeClass("is-active");
        $megaMenu.stop(true, true).fadeOut(200);
      }
    });

    // 2. 處理內部分類切換 (Category Level)
    $(".c-cat-btn").on("mouseenter", function () {
      if (!isPC()) return;

      var $btn = $(this);
      var target = $btn.data("target"); // face, features 等
      var $container = $btn.closest(".c-mega-menu");

      // 【關鍵】僅限於分類按鈕區域移除 active，不影響外層 li
      $btn.addClass("is-active").siblings(".c-cat-btn").removeClass("is-active");

      // 切換內容面板
      $container.find(".c-mega-menu__panel").removeClass("is-active").hide();
      $container.find("#mega-panel-" + target).addClass("is-active").show();
    });

    // 3. 處理第三層標籤切換 (Tags Level)
    $(".c-tag").on("mouseenter", function () {
      var $tag = $(this);
      var tagTarget = $tag.data("tag");
      var $panel = $tag.closest(".c-mega-menu__panel");

      $tag.addClass("is-active").siblings(".c-tag").removeClass("is-active");
      
      $panel.find(".c-mega-menu__tag-content").hide();
      $panel.find("[data-tag-target='" + tagTarget + "']").show();
    });
  }

  initPCMegaMenu();
});

//MB 展開選單
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".js-hamburger");
  const sidebar = document.querySelector(".js-mobile-sidebar");
  const overlay = document.querySelector(".js-close-sidebar");
  const dropControls = document.querySelectorAll(".js-mobile-drop");
  const tabButtons = document.querySelectorAll(".c-mobile-tabs__btn");

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.toggle("is-open");
    hamburger.classList.toggle("is-active");
    if (overlay) overlay.classList.toggle("is-active");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  hamburger.addEventListener("click", toggleSidebar);
  if (overlay) overlay.addEventListener("click", toggleSidebar);

  // 通用的高度更新函式：從目前的元素一路往上更新所有父層 ul 的高度
  function updateParentHeight(element) {
    let parentSubmenu = element.closest(".js-mobile-submenu");
    while (parentSubmenu) {
      // 關鍵：重新抓取最新的內容高度
      parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + "px";
      parentSubmenu = parentSubmenu.parentElement.closest(".js-mobile-submenu");
    }
  }

  // 下拉選單摺疊控制
  dropControls.forEach((control) => {
    control.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const submenu = this.nextElementSibling;

      if (!submenu) return;

      // 1. 取得同層級的其他所有項目 (Siblings)
      const container = parent.parentElement; // 通常是 <ul>
      const otherItems = container.querySelectorAll(
        ":scope > .c-mobile-nav__item, :scope > .c-mobile-nav__subitem",
      );
      // 2. 檢查目前點擊的是否已經是開啟狀態
      const isActive = parent.classList.contains("is-active");
      // 3. 關鍵步：先收起同層「其他」所有已開啟的選單
      otherItems.forEach((item) => {
        if (item !== parent) {
          item.classList.remove("is-active");
          const otherSub = item.querySelector(".js-mobile-submenu");
          if (otherSub) {
            otherSub.style.maxHeight = "0px";
          }
        }
      });

      // 4. 切換當前點擊項目的狀態
      if (!isActive) {
        parent.classList.add("is-active");
        // 確保內部 Tab 預設選中 (解決之前提到的截斷問題)
        const firstPanel = submenu.querySelector(".c-mobile-tab-panel");
        const firstBtn = submenu.querySelector(".c-mobile-tabs__btn");
        if (
          firstPanel &&
          !submenu.querySelector(".c-mobile-tab-panel.is-active")
        ) {
          firstPanel.classList.add("is-active");
          if (firstBtn) firstBtn.classList.add("is-active");
        }

        submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        parent.classList.remove("is-active");
        submenu.style.maxHeight = "0px";
      }

      // 5. 更新所有祖先層高度 (避免父層高度縮死)
      updateParentHeight(this);
    });
  });

  // Tab 切換控制
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const container = btn.closest(".js-mobile-submenu"); // 當前的 ul
      const targetId = btn.getAttribute("data-tab");

      // 1. 切換按鈕狀態
      container
        .querySelectorAll(".c-mobile-tabs__btn")
        .forEach((b) => b.classList.remove("is-active"));
      this.classList.add("is-active");

      // 2. 切換面板顯示
      container
        .querySelectorAll(".c-mobile-tab-panel")
        .forEach((panel) => panel.classList.remove("is-active"));
      const activePanel = container.querySelector(`#${targetId}`);
      if (activePanel) activePanel.classList.add("is-active");

      // 3. 【核心】Tab 切換後內容高度變了，必須立即通知所有父層更新高度
      updateParentHeight(this);
    });
  });
});



////////////////

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
  document.addEventListener("DOMContentLoaded", function () {
    var pic = document.querySelector(".your-cursor-class-name"); // 請確認你的游標 class 名稱
    if (!pic || window.innerWidth <= 1024) return;
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

// 取得按鈕元素
const btnTop = document.querySelector(".c-btn-top");

if (btnTop) {
  // 監聽網頁捲動事件
  window.addEventListener("scroll", function () {
    // 當捲動超過 300px 時顯示按鈕，否則隱藏
    if (window.scrollY > 300) {
      btnTop.classList.add("is-show");
    } else {
      btnTop.classList.remove("is-show");
    }
  });

  // 點擊事件：平滑捲動回頂部
  btnTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 關鍵：平滑滾動
    });
  });
}

//浮動於右邊
document.addEventListener("DOMContentLoaded", () => {
  const serviceBtn = document.querySelector(".js-service-btn");

  if (serviceBtn) {
    serviceBtn.addEventListener("click", () => {
      console.log("觸發線上客服 API");
      
      // 範例 A：如果是開啟 LINE
      // window.open('https://line.me/R/ti/p/@yourid', '_blank');
      
      // 範例 B：如果是串接第三方客服插件 (如 Tawk.to)
      // Tawk_API.toggle();
      
      // 範例 C：如果是跳出你自製的諮詢表單
      // document.querySelector('#js-contact-popup').style.display = 'flex';
    });
  }
});


$(function () {
  const $header = $('.l-header');
  
  function updateHeaderHeight() {
    // outerHeight(true) 會包含 margin，如果你有寫的話
    const height = $header.outerHeight();
    document.documentElement.style.setProperty('--header-height', height + 'px');
  }

  // 1. 初始化
  updateHeaderHeight();

  // 2. 視窗縮放時更新
  $(window).on('resize', updateHeaderHeight);

  // 3. 如果你有做「捲動時 Header 變小」的效果，請在捲動時也呼叫更新
  $(window).on('scroll', function() {
    // 這裡可以使用 requestAnimationFrame 優化效能
    updateHeaderHeight();
  });
});
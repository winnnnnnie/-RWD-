/**
 * 搜尋列互動整合
 * 包含：部位選擇、關鍵字面板、點擊外部關閉
 */
function initSearchBar() {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  if (dropdowns.length === 0) return;

  dropdowns.forEach((dropdown) => {
    // 抓取觸發區域與輸入框
    const trigger = dropdown.querySelector('[class*="__trigger"]');
    const input = dropdown.querySelector("input");

    // 1. 點擊觸發開關
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isActive = dropdown.classList.contains("is-active");

      // 關閉全站其他的下拉選單 (避免重疊)
      dropdowns.forEach((d) => d.classList.remove("is-active"));

      // 切換自己的狀態
      if (!isActive) {
        dropdown.classList.add("is-active");
        // 如果內含輸入框 (搜尋面板)，則自動聚焦
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      }
    });

    // 2. 選擇選項邏輯 (針對 li 點擊)
    dropdown.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li) {
        // 如果不是輸入框，則更新顯示文字 (部位選擇適用)
        if (!e.target.closest(".c-search-keyword__input-wrapper")) {
          const text = li.textContent;
          const span = trigger.querySelector("span");
          if (span) span.textContent = text;
          dropdown.classList.remove("is-active");
        }
      }
    });
  });

  // 3. 點擊頁面其他地方就關閉所有下拉
  document.addEventListener("click", (e) => {
    dropdowns.forEach((d) => {
      // 如果點擊的地方不在 dropdown 裡面，就關閉
      if (!d.contains(e.target)) {
        d.classList.remove("is-active");
      }
    });
  });
}

// 執行初始化
document.addEventListener("DOMContentLoaded", initSearchBar);

/**
 * 導覽列 Mega Menu 完整整合邏輯
 * 包含：選單開關、部位 Tab 切換、標籤 Content 切換
 */
function initMegaMenu() {
  // 1. 基礎選擇器
  const megaTrigger = document.querySelector('[data-mega="service"]');
  const megaMenu = document.getElementById("mega-service");

  if (!megaTrigger || !megaMenu) return;

  const catButtons = megaMenu.querySelectorAll(".c-cat-btn");

  // 2. 選單顯示/隱藏控制 (Toggle Logic)
  const toggleMega = (state) => {
    const isOpen =
      state !== undefined ? state : !megaMenu.classList.contains("is-active");

    megaMenu.classList.toggle("is-active", isOpen);
    megaTrigger.classList.toggle("is-active", isOpen);

    // --- 新增：鎖定/開啟背景滾動 ---
    document.body.classList.toggle("is-active", isOpen); // 你的 CSS 可能需要這個來連動
    document.body.classList.toggle("is-locked", isOpen);
    
    if (isOpen) {
      // 加入延遲避免當下點擊直接觸發 document 的關閉事件
      setTimeout(
        () => document.addEventListener("click", handleOutsideClick),
        10,
      );
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  const handleOutsideClick = (e) => {
    // 如果點擊的地方不在選單內，也不在觸發按鈕上，就關閉
    if (!megaMenu.contains(e.target) && !megaTrigger.contains(e.target)) {
      toggleMega(false);
    }
  };

  // 3. 綁定選單觸發按鈕 (第一層：點擊開啟)
  megaTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMega();
  });

  // 4. 綁定部位切換 (第一層 Tab：滑過切換)
  catButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      const targetId = `mega-panel-${this.dataset.target}`;
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      megaMenu
        .querySelector(".c-cat-btn.is-active")
        ?.classList.remove("is-active");
      megaMenu
        .querySelector(".c-mega-menu__panel.is-active")
        ?.classList.remove("is-active");

      // 啟動當前項目
      this.classList.add("is-active");
      targetPanel.classList.add("is-active");
    });
  });

  // 5. 綁定標籤切換 (第二層內容：點擊切換)
  // 採用事件委託：監聽整個 megaMenu，但只處理 .c-tag 的點擊
  megaMenu.addEventListener("click", function (e) {
    const tagBtn = e.target.closest(".c-tag");
    if (!tagBtn) return;

    const currentPanel = tagBtn.closest(".c-mega-menu__panel");
    const tagName = tagBtn.dataset.tag;

    // A. 更新標籤按鈕狀態
    currentPanel
      .querySelectorAll(".c-tag")
      .forEach((b) => b.classList.remove("is-active"));
    tagBtn.classList.add("is-active");

    // B. 更新對應的療程清單內容
    currentPanel
      .querySelectorAll(".c-mega-menu__tag-content")
      .forEach((content) => {
        const shouldShow = content.dataset.tagTarget === tagName;
        content.classList.toggle("is-active", shouldShow);
      });
  });
}

// 頁面載入完成後啟動
document.addEventListener("DOMContentLoaded", initMegaMenu);

//好評的數字跑動
function countUp(element) {
  const target = +element.getAttribute("data-target"); // 目標值 (14000)
  const countFrom = target * 0.8; // 從 90% 開始跑，例如 12600 (比較有動感)
  const duration = 1500; // 動畫執行 2 秒
  const startTime = performance.now();

  function updateCount(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // 確保不超過 1

    // 使用 Ease Out 效果，越接近目標跑越慢，比較高級
    const easeOutQuad = (t) => t * (2 - t);
    const currentValue = Math.floor(
      countFrom + (target - countFrom) * easeOutQuad(progress),
    );

    // 格式化數字加上千分位逗號 (14,000)
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target.toLocaleString(); // 確保最後停在精準數字
    }
  }

  requestAnimationFrame(updateCount);
}
// 建立觀察器
const observerOptions = {
  threshold: 0.5, // 當區塊出現 50% 時觸發
};

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      observer.unobserve(entry.target); // 跑過一次後就停止觀察
    }
  });
}, observerOptions);

// 綁定所有需要跑數字的元素
document
  .querySelectorAll(".js-count-up")
  .forEach((el) => countObserver.observe(el));
/////////////////////////

$(function () {
  function checkScroll() {
    if ($(window).scrollTop() > 70) {
      $(".index_tit,.index_bg2").addClass("active");
    } else {
      $(".index_tit,.index_bg2").removeClass("active");
    }
  }

  // 在页面加载时立即检查滚动位置
  checkScroll();

  // 在滚动时检查滚动位置
  $(window).scroll(function () {
    checkScroll();
  });
});

/*文字跑馬燈*/
$(document).ready(function () {
  let SwiperBottom = new Swiper(".swiper--bottom", {
    spaceBetween: 30,
    centeredSlides: true,
    speed: 50000, // 设置速度为较大的值，使滚动更加平滑
    autoplay: {
      delay: 0, // 设置延迟为0
      reverseDirection: false, // 关闭反向播放
      disableOnInteraction: false, // 用户交互后继续播放
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
  });

  console.log("Swiper initialized:", SwiperBottom);
});
/*成果案例*/
var swiper = new Swiper(".list_collections", {
  speed: 2000,
  loop: true,
  spaceBetween: 70,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // 缓存选择器
  var txtContentMain2 = document.querySelector(".s3BOX");
  var indexBG2 = document.querySelector(".index_bg2");
  var indexContact = document.querySelector(".index_contact");

  // 滚动事件处理函数
  function handleScroll() {
    // 检查滚动位置是否超过了 .s3BOX 元素的顶部
    if (window.scrollY > txtContentMain2.offsetTop) {
      indexBG2.classList.add("active2");
    } else {
      indexBG2.classList.remove("active2");
    }

    // 检查是否触碰到 .index_contact 元素，如果是，则移除 .index_bg2 的 active2 类
    var rect = indexContact.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      indexBG2.classList.remove("active2");
    }
  }

  // 防抖函数，用于限制事件处理函数的调用频率
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // 添加滚动事件监听器，并使用防抖处理函数
  window.addEventListener("scroll", debounce(handleScroll, 100));

  // 页面加载时立即检查滚动位置
  handleScroll();
});

/*滑到最底部新增class*/
$(window).scroll(function () {
  var documentHeight = $("body").height();
  var windowHeight = $(window).height();
  var twentyPercentHeight = 0.08 * documentHeight;

  // 最後一頁scrollTop=body-window，預留20%
  last = documentHeight - windowHeight - twentyPercentHeight;

  if ($(window).scrollTop() >= last) {
    $(".index_bg1").addClass("active2");
  } else {
    $(".index_bg1").removeClass("active2");
  }
});

/**
 * Header 滾動縮放邏輯
 */
function handleHeaderScroll() {
  const header = document.getElementById("header-include");
  if (!header) return;

  const scrollThreshold = 50; // 下滑多少 px 後觸發微縮

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("is-small");
      } else {
        header.classList.remove("is-small");
      }
    },
    { passive: true },
  ); // 使用 passive 提升捲動效能
}

// 執行
document.addEventListener("DOMContentLoaded", handleHeaderScroll);

document.querySelectorAll(".js-copy-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // 取得 HTML 中 data-account 的值
    const account = this.getAttribute("data-account");

    // 執行複製
    navigator.clipboard
      .writeText(account)
      .then(() => {
        // 複製成功後的反饋 (例如改顏色或跳出 alert)
        alert("帳號已複製: " + account);

        // 或者你可以低調地在 console 記錄
        console.log("Copied:", account);
      })
      .catch((err) => {
        console.error("無法複製", err);
      });
  });
});

//廣告談窗控制點

window.addEventListener("load", () => {
  const adPopup = document.getElementById("js-ad-popup");
  const closeBtn = document.getElementById("js-ad-close");

  // 1. 檢查 sessionStorage（這在分頁關閉前會一直存在，刷新頁面也不會消失）
  const hasSeenAdThisSession = sessionStorage.getItem("hasSeenAd");

  if (!hasSeenAdThisSession) {
    // 2. 延遲 1.8 秒，確保 Loading 動畫已經結束或淡出
    setTimeout(() => {
      adPopup.style.display = "flex";

      // 3. 一旦彈出，立刻寫入 sessionStorage
      // 這樣即便使用者「沒點關閉」就重新整理頁面，廣告也不會因為 Loading 衝突而亂跳
      sessionStorage.setItem("hasSeenAd", "true");
    }, 1800);
  }

  // 關閉按鈕功能
  closeBtn.addEventListener("click", () => {
    adPopup.style.display = "none";
  });

  // 點擊遮罩關閉
  adPopup.addEventListener("click", (e) => {
    if (e.target === adPopup) {
      adPopup.style.display = "none";
    }
  });
});

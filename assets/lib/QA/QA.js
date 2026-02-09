
$(function() {
    $(".qa_title").click(function() {
        $("div.qa_content").slideUp();
        $(".qa_title").removeClass("active");
        $("ul.accordionPart li").removeClass("active"); // 移除所有 li 的 active 類別
        
        if ($("+div", this).css("display") == "none") {
            $("+div", this).slideDown();
            $(this).addClass("active");
            $(this).closest("li").addClass("active"); // 為當前點擊的 li 增加 active 類別
        }
    })
    .mouseover(function() {
        $(this).addClass("qa_title_on");
    })
    .mouseout(function() {
        $(this).removeClass("qa_title_on");
    });
});
$(function(){

    // 圖片微微動
    $(".sisa-el").length && (
        sisa_el = [],
        $(".sisa-el").each(function(t) {
            sisa_el[t] = {
                brand_data_img: $(this),
                brand_data_type: $(this).data("type"),
                brand_data_sisa: $(this).data("sisa"),
                brand_data_img_in: $(this).find(".sisa-el_in")
            }
        }),
        $(window).on("scroll load", function() {
            var r = window.innerHeight || $(window).height(), l = $(this).scrollTop();
            $(".sisa-el").each(function(t) {
                var a, e = sisa_el[t].brand_data_img.outerHeight(), o = sisa_el[t].brand_data_img.offset(), i = sisa_el[t].brand_data_img_in.outerHeight(), n = (sisa_el[t].brand_data_img_in.offset(),
                0), s = l - (o.top + e - r), n = 80 < e / (r / 100) ? (a = 0,
                l + r > o.top && l < o.top + e ? a = l + r - o.top : l >= o.top + e && (a = r + e),
                a / sisa_el[t].brand_data_sisa) : (px1 = (i - e) / (r - e) * -1) * s * -1;
                "center" == sisa_el[t].brand_data_type ? sisa_el[t].brand_data_img_in.css({
                    transform: "translate3d(-50%, " + n + "px, 0px)"
                }) : sisa_el[t].brand_data_img_in.css({
                    transform: "translate3d(0px, " + n + "px, 0px)"
                })
            })
        })
    );
})
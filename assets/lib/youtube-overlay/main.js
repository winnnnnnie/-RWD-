(function($mainRoot, w, d) {
  // 通用初始化函数
  function jumbotronInit(videoItemId) {
    var thisitem = $mainRoot.find(videoItemId);
    var thisitemBuild = new YoutubeOverlayModule({
      sourceUrl: thisitem.attr("data-video"),
      triggerElement: "#" + thisitem.attr("id"),
      progressCallback: function() {
        console.log(videoItemId + " activated");
      }
    });
    thisitemBuild.activateDeployment();
  }

  // 執行初始化函數，遍歷所有匹配的視頻元素
  function centralController() {
    // 查找所有具有特定 ID 模式的元素
    $mainRoot.find("[id^='video-itme']").each(function() {
      var videoItemId = "#" + $(this).attr("id");
      jumbotronInit(videoItemId);
    });
  }

  // 在文档加载完成后执行
  $(d).ready(centralController);
})
($("#video-js"), window, document);
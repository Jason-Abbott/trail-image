function loadPhotoTag(link){link.length>0&&($("#wait").show(),$("#thumbs").load(link.attr("href"),function(){$("#wait").hide()}))}$(function(){var $view=$("#photo-tag"),id="item-"+selectedTag.substr(0,1).toLowerCase(),$list=$view.find("#"+id),$link=$list.find("#link-"+selectedTag),$li=$view.find("li[data-for="+id+"]");$list.show(),$link.addClass("selected"),$li.addClass("selected"),loadPhotoTag($link),$view.find("li").click(function(e){$li.removeClass("selected"),$li=$(this),$li.addClass("selected"),$list.hide(),$list=$("#"+$li.data("for")),$list.show()}),$view.find("#tag-index a").click(function(e){e.stopPropagation(),e.preventDefault(),$link.removeClass("selected"),$link=$(this),$link.addClass("selected"),loadPhotoTag($link),History.pushState(null,'Trail Image photos tagged with "'+$link.html()+'"',$link.attr("href").replace("/search",""))})});
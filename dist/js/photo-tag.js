"use strict";$(function(){function t(t){t.length>0&&($("#wait").show(),$("#thumbs").load(t.attr("href"),function(a,s){"error"===s&&($(this).empty(),t.removeClass(o),util.log.event(e,"Load Photos Error","Error"),alert('Sorry about that. Looking for "'+t.html()+'" photos caused an error.')),$("#wait").hide(),window.scrollTo(0,0)}))}var e="Photo Tag",o="selected",a=$("#photo-tag"),s="item-"+selectedTag.substr(0,1).toLowerCase(),i=a.find("#"+s),r=i.find("#link-"+selectedTag),l=a.find("li[data-for="+s+"]");i.show(),r.addClass(o),l.addClass(o),t(r),a.find("li").click(function(){l.removeClass(o),l=$(this),l.addClass(o),i.hide(),i=$("#"+l.data("for")),i.show(),util.log.event(e,"Click Index Letter")}),a.find("#tag-index a").click(function(a){a.stopPropagation(),a.preventDefault(),r.removeClass(o),r=$(this),r.addClass(o),t(r),util.log.event(e,"Click Name"),window.history.pushState(null,siteName+' photos tagged with "'+r.html()+'"',r.attr("href").replace("/search",""))})});
//# sourceMappingURL=/js/maps/photo-tag.js.map

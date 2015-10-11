"use strict";$(function(){function toggleMenu(event,forceHide){var $up=$button.find(".glyphicon-chevron-up"),$down=$button.find(".glyphicon-chevron-down"),show=function(){$button.addClass(css),$menu.show(),$up.show(),$down.hide()},hide=function(){$button.removeClass(css),$menu.hide(),$up.hide(),$down.show()};event.stopPropagation(),void 0===forceHide&&(forceHide=$button.hasClass(css)),forceHide?hide():show()}function showSelection(){var slug=$(this).data("slug");"undefined"!=typeof loadPostTrack?loadPostTrack(slug):window.location.href="/"+slug,toggleMenu()}function menuSelect($list,$clicked,loader,selected){$list.find("li").removeClass(css),loader(selected),$clicked.addClass(css),saveMenuSelection(selected)}function loadTags(selected){var tags=TrailImage.menu[selected[0]];$tagList.empty(),null==selected[1]&&(selected[1]=tags[0].title);for(var i=0;i<tags.length;i++){var $li=$("<li>").text(tags[i].title);$tagList.append($li),tags[i].title==selected[1]&&($li.addClass(css),loadPosts(selected))}}function loadPosts(selected){var tags=TrailImage.menu[selected[0]];$postList.empty();for(var i=0;i<tags.length;i++)if(tags[i].title==selected[1])for(var ids=tags[i].posts,j=0;j<ids.length;j++){var post=TrailImage.post[ids[j]],title=post.title;if(post.part&&j<ids.length-1&&title==TrailImage.post[ids[j+1]].title){for(var $ol=$("<ol>");j<ids.length&&TrailImage.post[ids[j]].title==title;)post=TrailImage.post[ids[j]],$ol.prepend($("<li>").addClass("post").attr("value",post.part).html(post.subTitle).data("description",post.description).data("slug",post.slug)),j++;j--,post=TrailImage.post[ids[j]],$postList.append($("<li>").addClass("series").html('<span class="mode-icon '+post.icon+'"></span>'+post.title).append($ol))}else post.part&&(title+=": "+post.subTitle),$postList.append($("<li>").addClass("post").html('<span class="mode-icon '+post.icon+'"></span>'+title).data("description",post.description).data("slug",post.slug))}}function loadMenuSelection(ifNone){var re=new RegExp("\\bmenu=([^;\\b]+)","gi"),match=re.exec(document.cookie);return null===match?ifNone:match[1].split(",")}function saveMenuSelection(selected){"string"==typeof selected&&(selected=[selected,null]),document.cookie="menu="+selected.join()}var css="selected",$button=$("#post-menu-button"),$menu=$("#post-menu"),$rootList=$("#menu-roots"),$tagList=$("#menu-tags"),$postList=$("#menu-posts"),$description=$("#post-description"),selection=loadMenuSelection(["When",null]);$button.one("click",function(){for(var root in TrailImage.menu){var $li=$("<li>").text(root);$rootList.append($li),root==selection[0]&&($li.addClass(css),loadTags(selection))}}).click(toggleMenu),$rootList.on("click","li",function(event){event.stopPropagation();var $li=$(this);selection=[$li.text(),null],menuSelect($rootList,$li,loadTags,selection)}),$tagList.on("click","li",function(event){event.stopPropagation();var $li=$(this);selection[1]=$li.text(),menuSelect($tagList,$li,loadPosts,selection)}),$postList.on("click","li.post",showSelection).on("mouseover","li.post",function(){$description.html($(this).data("description"))}).on("mouseout",function(){$description.empty()}),$("html").click(function(event){toggleMenu(event,!0)})});
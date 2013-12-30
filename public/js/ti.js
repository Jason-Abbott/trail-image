$(function(){function updateSets(){"use strict";var root=$collectionList.val(),sub=null,$group=null;if(menu[root]){saveSelection(root),$setList.empty().css({borderColor:"#f40",color:"#f40"}).animate({borderColor:"#747e73",color:"#000"},600).appendOption(0,"— View Another Adventure —");for(var i=0;menu[root].length>i;i++){sub=menu[root][i],$group=$("<optgroup>").attr("label",sub.title);for(var j=0;sub.items.length>j;j++)$group.appendOption(sub.items[j].slug,sub.items[j].title);$setList.append($group)}}}function saveSelection(root){document.cookie=key+"="+root}function loadSelection(){var re=RegExp("\\b"+key+"=([^;\\b]+)","gi"),match=re.exec(document.cookie);return null==match?null:match[1]}$.fn.appendOption=function(value,name){return this.each(function(){$(this).append($("<option>").attr("value",value).html(name))})};var $setList=$("#sets"),$collectionList=$("#collections"),key="root",root=loadSelection();for(var c in menu)$collectionList.appendOption(c,c+":");root&&$collectionList.val(root),updateSets(),$setList.change(function(e){location.href="/"+$(e.target).val()}),$collectionList.change(updateSets),$(".photo").find("img").lazyload()}),function($){function isRGBACapable(){var $script=$("script:first"),color=$script.css("color"),result=!1;if(/^rgba/.test(color))result=!0;else try{result=color!=$script.css("color","rgba(0, 0, 0, 0.5)").css("color"),$script.css("color",color)}catch(e){}return result}function calculateColor(begin,end,pos){var color="rgb"+($.support.rgba?"a":"")+"("+parseInt(begin[0]+pos*(end[0]-begin[0]),10)+","+parseInt(begin[1]+pos*(end[1]-begin[1]),10)+","+parseInt(begin[2]+pos*(end[2]-begin[2]),10);return $.support.rgba&&(color+=","+(begin&&end?parseFloat(begin[3]+pos*(end[3]-begin[3])):1)),color+=")"}function parseColor(color){var match,triplet;return(match=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color))?triplet=[parseInt(match[1],16),parseInt(match[2],16),parseInt(match[3],16),1]:(match=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color))?triplet=[17*parseInt(match[1],16),17*parseInt(match[2],16),17*parseInt(match[3],16),1]:(match=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))?triplet=[parseInt(match[1]),parseInt(match[2]),parseInt(match[3]),1]:(match=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color))&&(triplet=[parseInt(match[1],10),parseInt(match[2],10),parseInt(match[3],10),parseFloat(match[4])]),triplet}$.extend(!0,$,{support:{rgba:isRGBACapable()}});var properties=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];$.each(properties,function(i,property){$.Tween.propHooks[property]={get:function(tween){return $(tween.elem).css(property)},set:function(tween){var style=tween.elem.style,p_begin=parseColor($(tween.elem).css(property)),p_end=parseColor(tween.end);tween.run=function(progress){style[property]=calculateColor(p_begin,p_end,progress)}}}}),$.Tween.propHooks.borderColor={set:function(tween){var style=tween.elem.style,p_begin=[],borders=properties.slice(2,6);$.each(borders,function(i,property){p_begin[property]=parseColor($(tween.elem).css(property))});var p_end=parseColor(tween.end);tween.run=function(progress){$.each(borders,function(i,property){style[property]=calculateColor(p_begin[property],p_end,progress)})}}}}(jQuery),function($,window,document,undefined){var $window=$(window);$.fn.lazyload=function(options){function update(){var counter=0;elements.each(function(){var $this=$(this);if(!settings.skip_invisible||$this.is(":visible"))if($.abovethetop(this,settings)||$.leftofbegin(this,settings));else if($.belowthefold(this,settings)||$.rightoffold(this,settings)){if(++counter>settings.failure_limit)return!1}else $this.trigger("appear"),counter=0})}var $container,elements=this,settings={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return options&&(undefined!==options.failurelimit&&(options.failure_limit=options.failurelimit,delete options.failurelimit),undefined!==options.effectspeed&&(options.effect_speed=options.effectspeed,delete options.effectspeed),$.extend(settings,options)),$container=settings.container===undefined||settings.container===window?$window:$(settings.container),0===settings.event.indexOf("scroll")&&$container.bind(settings.event,function(){return update()}),this.each(function(){var self=this,$self=$(self);self.loaded=!1,$self.one("appear",function(){if(!this.loaded){if(settings.appear){var elements_left=elements.length;settings.appear.call(self,elements_left,settings)}$("<img />").bind("load",function(){$self.hide().attr("src",$self.data(settings.data_attribute))[settings.effect](settings.effect_speed),self.loaded=!0;var temp=$.grep(elements,function(element){return!element.loaded});if(elements=$(temp),settings.load){var elements_left=elements.length;settings.load.call(self,elements_left,settings)}}).attr("src",$self.data(settings.data_attribute))}}),0!==settings.event.indexOf("scroll")&&$self.bind(settings.event,function(){self.loaded||$self.trigger("appear")})}),$window.bind("resize",function(){update()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&$window.bind("pageshow",function(event){event.originalEvent.persisted&&elements.each(function(){$(this).trigger("appear")})}),$(window).load(function(){update()}),this},$.belowthefold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){var height="innerHeight"in window?window.innerHeight:$window.height();fold=height+$window.scrollTop()}else fold=$(settings.container).offset().top+$(settings.container).height();return $(element).offset().top-settings.threshold>=fold},$.rightoffold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){var width="innerWidth"in window?window.innerWidth:$window.width();fold=width+$window.scrollLeft()}else fold=$(settings.container).offset().left+$(settings.container).width();return $(element).offset().left-settings.threshold>=fold},$.abovethetop=function(element,settings){var fold;return fold=settings.container===undefined||settings.container===window?$window.scrollTop():$(settings.container).offset().top,fold>=$(element).offset().top+settings.threshold+$(element).height()},$.leftofbegin=function(element,settings){var fold;return fold=settings.container===undefined||settings.container===window?$window.scrollLeft():$(settings.container).offset().left,fold>=$(element).offset().left+settings.threshold+$(element).width()},$.inviewport=function(element,settings){return!($.rightoffold(element,settings)||$.leftofbegin(element,settings)||$.belowthefold(element,settings)||$.abovethetop(element,settings))},$.extend($.expr[":"],{"below-the-fold":function(a){return $.belowthefold(a,{threshold:0})},"above-the-top":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-screen":function(a){return $.rightoffold(a,{threshold:0})},"left-of-screen":function(a){return!$.rightoffold(a,{threshold:0})},"in-viewport":function(a){return $.inviewport(a,{threshold:0})},"above-the-fold":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-fold":function(a){return $.rightoffold(a,{threshold:0})},"left-of-fold":function(a){return!$.rightoffold(a,{threshold:0})}})}(jQuery,window,document);
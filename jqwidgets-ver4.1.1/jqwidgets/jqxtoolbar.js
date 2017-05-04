/*
jQWidgets v4.1.1 (2016-Mar)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.jqx.jqxWidget("jqxToolBar","",{});a.extend(a.jqx._jqxToolBar.prototype,{defineInstance:function(){var b={width:"100%",minWidth:null,maxWidth:null,height:35,tools:"",initTools:null,minimizeWidth:200,disabled:false,rtl:false,events:["open","close"]};a.extend(true,this,b)},createInstance:function(){var b=this;b._toolToWidgetMapping={button:"jqxButton",toggleButton:"jqxToggleButton",dropdownlist:"jqxDropDownList",combobox:"jqxComboBox",input:"jqxInput"};b._toolChanges=new Array();b.render()},render:function(){var c=this,b=true;c.host.html("");c.host.removeClass(c.toThemeProperty("jqx-widget jqx-fill-state-normal jqx-rc-all jqx-toolbar jqx-fill-state-disabled"));c._setSize();c._destroyTools(false);if(c._toolWidgets){b=false;c._minimizeButton.add(c._minimizePopup).remove()}c._appendMinimizeButton();c._addClasses();c._createTools();if(c.disabled===true){c.host.addClass(c.toThemeProperty("jqx-fill-state-disabled"));c._disableTools(true)}c._minimize();c._removeHandlers();c._addHandlers();if(b===false&&c._toolChanges.length>0){c._restoreChanges()}},refresh:function(b){if(b!==true){this.render()}},getTools:function(){return this._toolWidgets},destroy:function(){var b=this;b._removeHandlers();b._destroyTools();b.host.remove()},_destroyTools:function(d){var c=this;if(d!==false){d=true}if(c._toolWidgets){for(var b=c._toolWidgets.length-1;b>=0;b--){c._destroyTool(b,d)}}},_destroyTool:function(c,g){var e=this;c=parseInt(c,10);var b=e._toolWidgets[c];if(b){var d=b.type;var f=e._getBothTools(b);if(d!=="custom"){f[e._toolToWidgetMapping[d]]("destroy")}else{f.remove()}if(b.menuSeparator){b.menuSeparator.remove()}e._toolWidgets.splice(c,1);if(e._checkType(d)){e._refreshButtonGroups()}e._minimize();if(g!==false){e._toolChanges.push({action:"destroyTool",index:c})}}},destroyTool:function(b){this._destroyTool(b,true)},addTool:function(j,g,f,b){var h=this,i,d,c,e;if(g==="first"){i=0}else{i=h._toolWidgets.length}if(h._toolWidgets[i-1]){d=h._toolWidgets[i-1].tool;if(h._toolWidgets[i-1].separatorAfterWidget){c="|"}else{c=h._toolWidgets[i-1].type}}if(f===true){e="|"}else{if(h._toolWidgets[i+1]){e=h._toolWidgets[i+1].type}}var k=h._initializeTool(i,j,d,c,e,b,false);if(g==="first"){h._toolWidgets.splice(0,0,k)}else{h._toolWidgets.push(k)}h._removeHandlers();h._addHandlers();if(h._checkType(j)){h._refreshButtonGroups()}if(g!=="first"&&h._minimizedTools>0){h._minimizeTool(true)}else{h._minimize()}h._toolChanges.push({action:"addTool",type:j,position:g,separator:f,initCallback:b})},_disableTools:function(b){var d=this;for(var c=0;c<d._toolWidgets.length;c++){d.disableTool(c,b)}},disableTool:function(d,c){var f=this;d=parseInt(d,10);var b=f._toolWidgets[d];if(b){var e=b.type;var g=f._getBothTools(b);if(e!=="custom"){g[f._toolToWidgetMapping[e]]({disabled:c})}f._toolChanges.push({action:"disableTool",index:d,disable:c})}},propertyChangedHandler:function(c,n,b,m){if(n!=="initTools"){if(m!==b){switch(n){case"theme":if(b!==""){c.host.removeClass("jqx-widget-"+b+" jqx-fill-state-normal-"+b+" jqx-rc-all-"+b+" jqx-toolbar-"+b);c._minimizePopup.removeClass("jqx-popup-"+b+" jqx-fill-state-normal-"+b+" jqx-rc-b-"+b+" jqx-toolbar-minimized-popup-"+b)}c._addClasses();c._minimizePopup.addClass(c.toThemeProperty("jqx-popup jqx-fill-state-normal jqx-rc-b jqx-toolbar-minimized-popup"));for(var e=0;e<c._toolWidgets.length;e++){var f=c._toolWidgets[e];if(f.type!=="custom"){var k=c._getBothTools(f);if(f.menuTool){if(f.menuSeparator){f.menuSeparator.removeClass("jqx-fill-state-pressed-"+b+" jqx-toolbar-minimized-popup-separator-"+b);f.menuSeparator.addClass(c.toThemeProperty("jqx-fill-state-pressed jqx-toolbar-minimized-popup-separator"))}}k[c._toolToWidgetMapping[c._toolWidgets[e].type]]({theme:m})}}a.jqx.utilities.setTheme(b,m,c.host);break;case"width":c.host.width(m);c._minimize();break;case"minWidth":c.host.css("min-width",m);c._minimize();break;case"maxWidth":c.host.css("max-width",m);c._minimize();break;case"height":c.host.height(m);for(var d=0;d<c._toolWidgets.length;d++){var o=c._toolWidgets[d];var h=o.type;var g=c._getBothTools(o);if(h==="button"||h==="toggleButton"||h==="repeatButton"||h==="linkButton"){g.css("height",m)}else{if(h==="dropdownlist"||h==="combobox"||h==="input"){g[c._toolToWidgetMapping[h]]({height:m-2})}}}break;case"tools":c._removeHandlers();c._destroyTools();c._createTools();c._addHandlers();c._minimize();break;case"minimizeWidth":if(c._isOpen===true){var l=parseInt(c._minimizePopup.css("left"),10)-(m-b);c._minimizePopup.css({width:m+"px",left:l+"px"})}else{c._minimizePopup.width(m)}break;case"rtl":c.render();break;case"disabled":if(m===true){c.host.addClass(c.toThemeProperty("jqx-fill-state-disabled"));c._disableTools(true)}else{c.host.removeClass(c.toThemeProperty("jqx-fill-state-disabled"));c._disableTools(false)}break}}}},_raiseEvent:function(f,c){if(c===undefined){c={owner:null}}var d=this.events[f];c.owner=this;var e=new a.Event(d);e.owner=this;e.args=c;if(e.preventDefault){e.preventDefault()}var b=this.host.trigger(e);return b},_addClasses:function(){var b=this;b.host.addClass(b.toThemeProperty("jqx-widget jqx-fill-state-normal jqx-rc-all jqx-toolbar"));if(b.rtl===true){b.host.addClass(b.toThemeProperty("jqx-toolbar-rtl"))}},_checkType:function(b){if(b==="button"||b==="toggleButton"||b==="repeatButton"||b==="linkButton"){return true}return false},_refreshButtonGroups:function(){var c=this;function b(g,f,h,e,i,d){g[f+"Class"](c.toThemeProperty("jqx-toolbar-tool-inner-button"));g[h+"Class"](c.toThemeProperty("jqx-rc-all"));g[e+"Class"](c.toThemeProperty("jqx-rc-l"));g[i+"Class"](c.toThemeProperty("jqx-rc-r"));g.css("border-left-width",d+"px")}a.each(c._toolWidgets,function(e,i){if(c._checkType(i.type)){var g,f;var k=c._getBothTools(i);if(e>0){if(c._toolWidgets[e-1].separatorAfterWidget){g="|"}else{g=c._toolWidgets[e-1]}}if(i.separatorAfterWidget){f="|"}else{if(e<c._toolWidgets.length-1){f=c._toolWidgets[e+1]}}var d=g&&c._checkType(g.type);var j=i.separatorAfterWidget===false&&f&&c._checkType(f.type);if(!d&&!j){b(k,"remove","add","remove","remove",1)}else{if(!d&&j){b(k,"remove","remove","add","remove",1)}else{if(d&&j){b(k,"add","remove","remove","remove",0)}else{if(d&&!j){b(k,"remove","remove","remove","add",0)}}}}var h=c.rtl?"rtl":"ltr";if(!j){if(i.separatorAfterWidget){k.removeClass(c.toThemeProperty("jqx-toolbar-tool-no-separator-"+h));k.addClass(c.toThemeProperty("jqx-toolbar-tool-separator-"+h))}else{k.removeClass(c.toThemeProperty("jqx-toolbar-tool-separator-"+h));k.addClass(c.toThemeProperty("jqx-toolbar-tool-no-separator-"+h))}}else{k.removeClass(c.toThemeProperty("jqx-toolbar-tool-separator-"+h));k.removeClass(c.toThemeProperty("jqx-toolbar-tool-no-separator-"+h))}}})},_addHandlers:function(){var b=this;var c=b.element.id;a.jqx.utilities.resize(b.host,function(){if(a.jqx.browser.msie&&a.jqx.browser.version<8&&typeof b.width==="string"&&b.width.charAt(b.width.length-1)==="%"){var e=b.host.parent().width();var f=e*parseFloat(b.width.replace("%",""))/100;var d=parseInt(b.host.css("border-left-width"),10)+parseInt(b.host.css("border-right-width"),10)+parseInt(b.host.css("padding-left"),10)+parseInt(b.host.css("padding-right"),10);b.host.css("width",f-d-1)}if(b._isOpen===true){b._minimizePopup.hide();b._isOpen=false;b._raiseEvent("1")}b._minimize()});b.addHandler(a(document),"click.jqxToolbar"+c,function(){if(b._isOpen===true){b._openMinimizePopup()}});b.addHandler(b._minimizeButton,"click.jqxToolbar"+c,function(d){d.stopPropagation();b._openMinimizePopup()});b.addHandler(a(".jqx-popup"),"click.jqxToolbar"+c,function(d){if(!a(d.target).hasClass("jqx-window-content")){d.stopPropagation()}})},_removeHandlers:function(){var b=this;var c=b.element.id;b.removeHandler(a(document),"click.jqxToolbar"+c);b.removeHandler(b._minimizeButton,"click.jqxToolbar"+c);b.removeHandler(a(".jqx-popup"),"click.jqxToolbar"+c)},_setSize:function(){var b=this;b.host.width(b.width);b.host.height(b.height);if(b.minWidth){b.host.css("min-width",b.minWidth)}if(b.maxWidth){b.host.css("max-width",b.maxWidth)}},_createTools:function(){var c=this;var d=c.tools.split(" ");var e=a.trim(c.tools.replace(/\|/g,""));e=e.replace(/\s+/g," ");e=e.split(" ");c._toolWidgets=new Array();var b=0;a.each(e,function(j,m){if(e[j]!==d[j+b]){b++}var l=j+b;var h;if(c._toolWidgets[j-1]){h=c._toolWidgets[j-1].tool}var k=d[l];var g=d[l-1];var i=d[l+1];var f=c.initTools;if(k===""){return true}var n=c._initializeTool(j,k,h,g,i,f,true);c._toolWidgets.push(n)});c._minimizePopup.css({display:"none",visibility:"visible"})},_initializeTool:function(k,h,d,p,q,f,n){var m=this,e,o;var g=m._initializeWidget(h,e,o,d);e=g.tool;o=g.menuTool;var c=true;e.addClass(m.toThemeProperty("jqx-toolbar-tool"));if(m.rtl===true){e.addClass(m.toThemeProperty("jqx-toolbar-tool-rtl"))}if(m.initTools){var t;if(n===true){t=m.initTools(h,k,e,false)}else{t=f(h,e,false)}if(!t||(t.minimizable!==false&&t.menuTool!==false)){if(n===true){m.initTools(h,k,o,true)}else{f(h,o,true)}o.addClass(m.toThemeProperty("jqx-toolbar-tool-minimized"))}else{if(h!=="custom"){o[m._toolToWidgetMapping[h]]("destroy")}else{o.remove()}if(t.minimizable===false){c=false}o=false}}var b=false;var u=e;if(o){u=u.add(o);o.css("display","none")}var l;var j=m.rtl?"rtl":"ltr";var s=["button","toggleButton","repeatButton","linkButton"];var r={button:"jqxButton",toggleButton:"jqxToggleButton",repeatButton:"jqxRepeatButton",linkButton:"jqxRepeatButton"};if(q==="|"){b=true;u.addClass(m.toThemeProperty("jqx-toolbar-tool-separator-"+j));if(o){l=a('<div class="'+m.toThemeProperty("jqx-fill-state-pressed jqx-toolbar-minimized-popup-separator")+'"></div>');m._minimizePopup.append(l)}}else{if(s.indexOf(h)===-1||(s.indexOf(h)!==-1&&s.indexOf(q)===-1)){u.addClass(m.toThemeProperty("jqx-toolbar-tool-no-separator-"+j))}}if(s.indexOf(p)===-1&&s.indexOf(h)!==-1&&s.indexOf(q)!==-1){if(m.rtl===false){u[r[h]]({roundedCorners:"left"})}else{u[r[h]]({roundedCorners:"right"});u.css("border-left-width",0)}}else{if(s.indexOf(p)!==-1&&s.indexOf(h)!==-1&&s.indexOf(q)!==-1){u.addClass(m.toThemeProperty("jqx-toolbar-tool-inner-button"));u.css("border-left-width",0)}else{if(s.indexOf(p)!==-1&&s.indexOf(h)!==-1&&s.indexOf(q)===-1){if(m.rtl===false){u[r[h]]({roundedCorners:"right"});u.css("border-left-width",0)}else{u[r[h]]({roundedCorners:"left"})}}}}if(a.jqx.browser.msie&&a.jqx.browser.version<8&&h==="combobox"){u.find(".jqx-combobox-arrow-normal").width(18)}var i={type:h,tool:e,separatorAfterWidget:b,minimizable:c,minimized:false,menuTool:o,menuSeparator:l};return i},_initializeWidget:function(f,e,d,h){var g=this;function c(){d=e.clone();if(h){h.after(e);g._minimizePopup.append(d)}else{g.host.prepend(e);g._minimizePopup.prepend(d)}}if(f!=="custom"&&g.host[g._toolToWidgetMapping[f]]===undefined){var b=g._toolToWidgetMapping[f].toLowerCase();throw new Error("jqxToolBar: Missing reference to "+b+".js")}switch(f){case"button":case"toggleButton":e=a("<button></button>");c();e.add(d)[g._toolToWidgetMapping[f]]({theme:g.theme,height:g.host.height(),disabled:g.disabled,rtl:g.rtl});break;case"dropdownlist":case"combobox":e=a("<div></div>");c();e.add(d)[g._toolToWidgetMapping[f]]({theme:g.theme,autoDropDownHeight:true,height:g.host.height()-2,disabled:g.disabled,rtl:g.rtl});break;case"input":e=a('<input type="text" />');c();e.add(d).jqxInput({theme:g.theme,height:g.host.height()-2,disabled:g.disabled,rtl:g.rtl});break;case"custom":e=a("<div></div>");c();break}return{tool:e,menuTool:d}},_appendMinimizeButton:function(){var b=this;b._minimizedTools=0;b._minimizeButton=a('<div class="'+b.toThemeProperty("jqx-menu-minimized-button jqx-toolbar-minimized-button")+'"></div>');b._minimizePopup=a('<div id="'+b.element.id+'Popup" class="'+b.toThemeProperty("jqx-popup jqx-fill-state-normal jqx-rc-b jqx-toolbar-minimized-popup")+'"></div>');if(b.rtl===true){b._minimizeButton.addClass(b.toThemeProperty("jqx-toolbar-minimized-button-rtl"));b._minimizePopup.addClass(b.toThemeProperty("jqx-toolbar-minimized-popup-rtl"))}b.host.append(b._minimizeButton);a("body").append(b._minimizePopup);b._isOpen=false;b._minimizePopup.width(b.minimizeWidth)},_openMinimizePopup:function(){var c=this;if(c._isOpen===false){var b=c.host.offset();var e=b.left;if(c.rtl===false){e+=c.host.outerWidth()-c._minimizePopup.outerWidth()}var d=b.top+c.host.outerHeight()-1;c._minimizePopup.css({left:e,top:d});c._minimizePopup.slideDown("fast",function(){c._isOpen=true;c._raiseEvent("0")})}else{c._minimizePopup.slideUp("fast");c._isOpen=false;c._raiseEvent("1")}},_minimize:function(){var g=this,e=0;if(g._minimizedTools>0){e=g._minimizeButton.outerWidth()+parseInt(g._minimizeButton.css("margin-left"),10)}var c=g.host.width()-parseInt(g.host.css("padding-left"),10)-parseInt(g.host.css("padding-right"),10)-e;if(c<0){return}var b=0;var d;for(var f=0;f<g._toolWidgets.length;f++){if(g._toolWidgets[f].minimized===false){var h=g._toolWidgets[f].tool.outerWidth(true);b+=h}else{if(d===undefined){d=g._toolWidgets[f].tool.outerWidth(true)}}}if(b>c){g._minimizeTool(true);g._minimize()}else{if(d!==undefined&&(b+d)<c){g._minimizeTool(false);g._minimize()}}},_minimizeTool:function(g){var e=this,b,f;if(g===true){for(var d=e._toolWidgets.length-1;d>=0;d--){b=e._toolWidgets[d];if(b.minimizable===false){continue}if(b.minimized===false){f=e._getToolValue(b.tool,b.type);b.tool[0].style.display="none";if(b.menuTool){b.menuTool.show();e._setToolValue(f,b.menuTool,b.type)}if(b.menuSeparator){b.menuSeparator.show()}e._toolWidgets[d].minimized=true;e._minimizedTools++;if(e._minimizedTools===1){e._minimizeButton.show()}break}}}else{for(var c=0;c<e._toolWidgets.length;c++){b=e._toolWidgets[c];if(b.minimized===true){if(b.menuTool){f=e._getToolValue(b.menuTool,b.type);b.menuTool.hide()}if(b.menuSeparator){b.menuSeparator.hide()}b.tool.show();if(b.menuTool){e._setToolValue(f,b.tool,b.type)}e._toolWidgets[c].minimized=false;e._minimizedTools--;if(e._minimizedTools===0){e._minimizeButton.hide()}break}}}},_getToolValue:function(b,c){var d;switch(c){case"button":case"custom":d=undefined;break;case"toggleButton":var e=b.hasClass("jqx-fill-state-pressed");d={text:b.text(),toggled:e};break;case"dropdownlist":case"combobox":d=b[this._toolToWidgetMapping[c]]("getSelectedIndex");break;case"input":d=b.val();break}return d},_setToolValue:function(d,b,c){if(d!==undefined){switch(c){case"button":case"custom":break;case"toggleButton":b.text(d.text);var e=b.hasClass("jqx-fill-state-pressed");if(e!==d.toggled){b.jqxToggleButton("toggle")}break;case"dropdownlist":case"combobox":d=b[this._toolToWidgetMapping[c]]("selectIndex",d);break;case"input":b.val(d);break}}},_restoreChanges:function(){var b=this;a.each(b._toolChanges,function(c,d){if(d.action==="addTool"){b.addTool(d.type,d.position,d.separator,d.initCallback)}else{if(d.action==="destroyTool"){b._destroyTool(d.index)}else{if(d.action==="disableTool"){b.disableTool(d.index,d.disable)}}}})},_getBothTools:function(b){var c=b.tool;if(b.menuTool){c=c.add(b.menuTool)}return c}})})(jqxBaseFramework);
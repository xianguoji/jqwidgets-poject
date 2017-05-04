var buildAppsTreeInteractive = function(json, idPrefix, idParent) {
	var prefix = typeof idPrefix == "undefined"?"":idPrefix;
	var parent = typeof idParent == "undefined"?"-1":idParent;
	var neoAppsTree = [];/*
	if (typeof json["applications"] != "undefined") {
		$.each(json["applications"], function( l, applevel ) {
			var validAppID = applevel["applicationId"];
			var id = prefix;
			if (typeof idParent != "undefined"){
				id+="/";
			}
			id+=String(applevel["applicationName"]);
			neoAppsTree.push({
				"id":id, "parentid":String(parent), "html":'<span nodeType="application">'+applevel["applicationName"]+'</span>', "value":validAppID
			});
		});
	}*/
	if (typeof json["subCategorys"] != "undefined") {
		$.each(json["subCategorys"], function( l, catelevel ) {
			var validCateID = catelevel["categoryId"];
			var id = prefix;
			if (typeof idParent != "undefined"){
				id+="/";
			}
			id+=String(catelevel["categoryName"]);
			neoAppsTree.push({
				"id":id, "parentid":String(parent), "html":'<span nodeType="category">'+catelevel["categoryName"]+'</span>', "value":validCateID
			});
			neoAppsTree.push({
				"id":prefix+"sloading-"+catelevel["categoryId"], "parentid":id, "html":$.i18n("loading"), "value":validCateID
			});
		});
	}
	return neoAppsTree;
}

var buildAppsTreeNeo = function(id, json, theme, subCateTreeURL,uniquePrefix) {
	var uniqueId = typeof uniquePrefix == "undefined"?"":uniquePrefix;
	var neoAppsTree = buildAppsTreeInteractive(json, uniquePrefix+"-ctree-");
	var source = {
		datatype: "json",
		datafields: [
			{ name: "id" },
			{ name: "parentid" },
			{ name: "html" },
			{ name: "value" }
		],
		id: "id",
		localdata: neoAppsTree
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	dataAdapter.dataBind();
	var records = dataAdapter.getRecordsHierarchy("id", "parentid", "items", [{ name: "html", map: "label"}]);
	$(id).jqxTree({ source: records, width: "100%", theme: theme, allowDrop: false });
		$(id).on('expand', function(event) {
		var label = $(id).jqxTree('getItem', event.args.element).label;
		var $element = $(event.args.element);
		var loader = false;
		var loaderItem = null;
		var children = $element.find('ul:first').children();
		$.each(children, function () {
			var item = $(id).jqxTree('getItem', this);
			if (item && item.label == $.i18n("loading")) {
				loaderItem = item;
				loader = true;
				return false
			};
		});
		if (loader) {
			$.ajax({
				url: subCateTreeURL+loaderItem.value,
				success: function (data, status, xhr) {
					var items = data;
					if (typeof items["category"]['subCategorys'] != 'undefined' && items["category"]['subCategorys'].length > 0) {
						var neoSubCateTree = buildCateTreeInteractive(items["category"], loaderItem.parentId, loaderItem.id);
						var neoSubCateTreeSource = {
							datatype: "json",
							datafields: [
								{ name: "id" },
								{ name: "parentid" },
								{ name: "html" },
								{ name: "value" }
							],
							id: "id",
							localdata: neoSubCateTree
						};
						var neoSubDataAdapter = new $.jqx.dataAdapter(neoSubCateTreeSource);
						neoSubDataAdapter.dataBind();
						var neoSubRecords = neoSubDataAdapter.getRecordsHierarchy("id", "parentid", "items", [{	name: "html", map: "label"}]);
						$(id).jqxTree('addTo', neoSubRecords, $element[0]);
						$(id).jqxTree('removeItem', loaderItem.element);
					} else {
						$(id).jqxTree('removeItem', loaderItem.element);
					}
				}
			});
		}
	});
}
	
var buildCTreeGridInteractive = function(json/*, idPrefix, idParent*/){
	//var prefix = typeof idPrefix == "undefined"?"":idPrefix;
	//var parent = typeof idParent == "undefined"?"-1":idParent;
	var grid = [];
	if (typeof json["applications"] != "undefined") {
		$.each(json["applications"],function(index,data){
			grid.push({
				"type":		$.i18n("APP"),
				"name":		data.applicationName,
				"value":	data.applicationId,		// APP ID is set here
			});
		});
	}
	if (typeof json["subCategorys"] != "undefined") {
		$.each(json["subCategorys"],function(index,data){
			grid.push({
				"type":		$.i18n("category"),
				"name":		data.categoryName,
				"value":	data.categoryId,		// CAT ID is set here
			});
		});
	}
	// Sorting...
	grid.sort(function(a,b){
		if (a.type == $.i18n("APP") && b.type == $.i18n("category")){
			return -1;
		} else if (b.type == $.i18n("APP") && a.type == $.i18n("category")){
			return 1;
		} else return cmp (a.name,b.name);
	});
	$.each(grid,function(index,element){
		element.id = index;							// This "ID" is for $.jqx.dataAdapter()
	});
	return grid;
}

var buildCTreeGrid = function(id, json, theme){
	var grid = buildCTreeGridInteractive(json);
	var source = {
		datatype: "json",
		datafields: [
			{ name: "id" },
			{ name: "name" },
			{ name: "type" },
			{ name: "value" }
		],
		id: "id",
		localdata: grid
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	var initrowdetails = function(index, parentElement, gridElement, datarecord){
		var applicationId = datarecord.value;
		var url = contextPath + '/applib/appLibAction!viewAppDetail';
		var parameter = {"applicationId":applicationId};
		
		var detailContainer = $($(parentElement).children()[0]);
		$.get(url,parameter,function(data){
			try{
				if (data.metadata.length == 0) throw ("404 NotFound");
			} catch (error){
				errorCodeHandler(error);
			}
			
			var transferredData = $.formDataTransfer(data);
			
			detailContainer.append(
				'<table class="table">'+
					'<tr class="item">'+
						'<td width="20%" class="align-left">'+$.i18n("APPDetail-applicationName")+'</td>'+
						'<td width="30%" class="align-left">'+ transferredData["application.applicationName"] +'</td>'+
						'<td width="20%" class="align-left">'+$.i18n("APPDetail-version")+'</td>'+
						'<td width="30%" class="align-left">'+ transferredData["application.version"] +'</td>'+
					'</tr>'+
					'<tr class="item">'+
						'<td class="align-left">'+$.i18n("APPDetail-path")+'</td>'+
						'<td class="align-left" colspan="3">'+ textContentReplace(transferredData["application.path"],"/parastor/users/liuyj39/Projects/HPCDesktop","") +'</td>'+
					'</tr>'+
					'<tr class="item">'+
						'<td class="align-left" colspan="4">'+$.i18n("APPDetail-description")+'</td>'+
					'</tr>'+
					'<tr class="item">'+
						'<td class="align-left" colspan="4">'+ transferredData["application.description"] +'</td>'+
					'</tr>'+
					'<tr class="item">'+
						'<td class="align-left">'+$.i18n("APPDetail-isMPI")+'</td>'+
						'<td class="align-left"><input type="checkbox" id="isMPI" name="isMPI" value="true" disabled="disabled" ' + (transferredData["isMPI"]=="true"?'checked="checked"':'') + '/></td>'+
						'<td colspan="2">&nbsp;</td>'+
					'</tr>'+
					'<tr class="item">'+
						'<td class="align-left">'+$.i18n("APPDetail-icon")+'</td>'+
						'<td colspan="3">'+ (transferredData["defaultIcon"].length > 20? '<img class="APPDetail-icon" src="'+ contextPath+'/showIconAction?img='+transferredData["defaultIcon"]  +'" />' : '<img class="APPDetail-icon" src="'+ contextPath+'/images/defaultIcon.png'  +'" />') +'</td>'+
					'</tr>'+
				'</table>'
			);
		});
	}
	
	$(id).jqxGrid({
		width:				"98%",
		source:				dataAdapter,
		columns:			[{text: $.i18n("categoryList-name"), datafield:	'name', width:250},{text: $.i18n("categoryList-type"), datafield: 'type'}],
		
		rowdetails:			 false,
		rowdetailstemplate:	{
			rowdetails:	'<div class="cTree-rowdetails"></div>'
		},
		initrowdetails:		initrowdetails
	});
}

function cmp(item1, item2) { 
	return item1 > item2 ? 1 : (item1 < item2 ? -1: 0) ;
}
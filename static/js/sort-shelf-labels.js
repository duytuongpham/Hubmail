var othersList = [10, 27];
var moveToBottom = [14];
var moveToTop = [1];
var bulkSalesCreated = false;

var filterLabelToBottom = function(labelArray) {
  var $currentLabelGroup;
  labelArray.forEach(function(labelId, idx) {
    $currentLabelGroup = [];
    $currentLabelGroup = $('#shelf-label-container-' + labelId);
    if ($currentLabelGroup.length > 0) {
      $currentLabelGroup.appendTo($currentLabelGroup.closest('ul'));
    }
  });
}

var filterLabelToTop = function(labelArray) {
	  var $currentLabelGroup;
	  labelArray.forEach(function(labelId, idx) {
	    $currentLabelGroup = [];
	    $currentLabelGroup = $('#shelf-label-container-' + labelId);
	    if ($currentLabelGroup.length > 0) {
	      $currentLabelGroup.prependTo($currentLabelGroup.closest('ul'));
	    }
	  });
	}

var filterUnique = function(xs) {
  var seen = {}
  return xs.filter(function(x) {
    if (seen[x])
      return
    seen[x] = true
    return x
  })
}
var setUnlabeledItem = function(itemHtml, $subcategoryContainer) {
	var $otherLabel = $subcategoryContainer.find(".shelf-label-other");
	// console.log($subcategoryContainer, $otherLabel);
	if ($otherLabel.length > 0) {
		$otherLabel.append(itemHtml);
	}
	else {
		var otherHtml = '';
		otherHtml +=	'<li class="shelf-label-container shelf-label-container-other" style="display: none;">'+
										'<h4 class="shelf-label-header">Recently Added</h4>'+
										'<ul class="shelf-label-other shelf-label-card-container">'+
										'</ul>'+
									'</li>';
		$subcategoryContainer.append(otherHtml);
		$subcategoryContainer.find(".shelf-label-other").append(itemHtml);
		activeLabels.push(".shelf-label-container-other");
	}
}
var attachCards = function(itemHtml, itemData, $subcategoryContainer, doesContainLabels) {
	// console.log("LABELS: ", doesContainLabels, activeLabels, itemData);
	if (doesContainLabels) {
		if (itemData.shelfLabelId) {
			$('#shelf-label-'+itemData.shelfLabelId).append(itemHtml);
			activeLabels.push("#shelf-label-container-"+itemData.shelfLabelId);
		}
		else {
			// console.log("SEND TO OTHER");
			setUnlabeledItem(itemHtml, $subcategoryContainer)
		}
	}
	else {
		$subcategoryContainer.append(itemHtml)
	}
}
var attachShelfLabels = function(shelfLabelArray, $shelfDomNode) {
	if (shelfLabelArray.length > 0) {
		$shelfDomNode.append(shelfLabelArray);
	}
}
var buildShelfLabels = function(shelfLabels) {
	var labelHtml = '';
	var labelArray = [];
	$.each(shelfLabels, function(idx, label) {
		labelHtml = '';
		labelHtml +=  '<li class="shelf-label-container" id="shelf-label-container-'+label.shelfLabelId+'" style="display: none;">'+
										'<h4 class="shelf-label-header">'+label.displayName+'</h4>'+
										'<ul id="shelf-label-'+label.shelfLabelId+'" class="shelf-label-card-container">'+
										'</ul>'+
									'</li>';
		labelArray.push(labelHtml);
	});

	return labelArray;
}
var sortSubCategoriesAndLabels = function(itemData) {
  var subCategoriesAndLabels = {};
  var subCategoryOrder = 0;
  itemData.forEach(function(singleItem, idx) {
    if (typeof singleItem === "object" && singleItem.subCategoryId) {
      if (!subCategoriesAndLabels[singleItem.subCategoryId]) {
        subCategoriesAndLabels[singleItem.subCategoryId] = {};
        subCategoriesAndLabels[singleItem.subCategoryId].shelfLabelIds = [];
        subCategoriesAndLabels[singleItem.subCategoryId].shelfLabels = {};
        subCategoriesAndLabels[singleItem.subCategoryId].order = subCategoryOrder;
        subCategoryOrder++;
      }
      subCategoriesAndLabels[singleItem.subCategoryId].subCategoryName = singleItem.subCategoryName;
      subCategoriesAndLabels[singleItem.subCategoryId].categoryName = singleItem.categoryName;
      if (singleItem.categoryName === "Wholesale") {
        subCategoriesAndLabels[singleItem.subCategoryId].subCategoryName = "Bulk Sales";
      }

      if (singleItem.shelfLabelId) {
        if (!subCategoriesAndLabels[singleItem.subCategoryId].shelfLabels[singleItem.shelfLabelId]) {
        	subCategoriesAndLabels[singleItem.subCategoryId].shelfLabelIds.push(singleItem.shelfLabelId);
          subCategoriesAndLabels[singleItem.subCategoryId].shelfLabels[singleItem.shelfLabelId] = {}
        }
        subCategoriesAndLabels[singleItem.subCategoryId].shelfLabels[singleItem.shelfLabelId] = singleItem.shelfLabelName;
      }
    }
  });

  return subCategoriesAndLabels;
}
var convertOthersToCategory = function(subCategoriesAndLabels) {
  for (var subCatId in subCategoriesAndLabels) {
    if (subCategoriesAndLabels[subCatId].subCategoryName === "Other" || subCategoriesAndLabels[subCatId].subCategoryName === "Others") {
      subCategoriesAndLabels[subCatId].subCategoryName = subCategoriesAndLabels[subCatId].categoryName;
    }
  }
  return subCategoriesAndLabels
}
var buildShelfLabelStrings = function(shelfLabelIds, shelfLabels) {
  // console.log(shelfLabels);
  var shelfLabelHtml = '';
  if (typeof shelfLabels === 'undefined' || Object.keys(shelfLabels).length === 0) {
    return shelfLabelHtml;
  }

  //for (var singleLabel in shelfLabels) {
  for (var i = 0; i < shelfLabelIds.length; i++) {
	  var singleLabel = shelfLabelIds[i];
    shelfLabelHtml +=  '<li class="shelf-label-container" id="shelf-label-container-'+singleLabel+'" style="display: none;">'+
                         '<h4 class="shelf-label-header">'+shelfLabels[singleLabel]+'</h4>'+
                         '<ul id="shelf-label-'+singleLabel+'" class="shelf-label-card-container">'+
                         '</ul>'+
                       '</li>';
  }

	return shelfLabelHtml;
}
var createSubcategoryLabelsForDom = function(subCategories) {
  var subCategoryHeaders = [];
  var singleSubHtml = '';
  // console.log(subCategories);
  for (var singleCategory in subCategories) {
    if (subCategories[singleCategory].categoryName !== "Wholesale" || !bulkSalesCreated) {
      // console.log(singleCategory);
      var subCategoryContainer, subCategoryName;
      if (subCategories[singleCategory].categoryName === "Wholesale") {
        subCategoryContainer = "<ul id='subcat-bulk-sales' class='item-card-container'>"
        subCategoryName = "Bulk Sales";
        bulkSalesCreated = true;
      }
      else {
        subCategoryContainer = "<ul id='subcat-"+singleCategory+"' class='item-card-container'>"
        subCategoryName = subCategories[singleCategory].subCategoryName;
      }
      singleSubHtml = '';
      singleSubHtml +=
      "<div style='display: none;' class='center -expand subcateogry-container__unique sub-"+singleCategory+"' ><a class='home__category-header' href='#'>"+
          "<h3>"+subCategoryName+"</h3>"+
      //				    "<span>"+
      //				      "View More"+
      //				    "</span>"+
        "</a>"+
      "<div class='subcategory__section -element-query-active -elementquery-active sub-"+singleCategory+"' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600'>"+
        subCategoryContainer+
          buildShelfLabelStrings(subCategories[singleCategory].shelfLabelIds, subCategories[singleCategory].shelfLabels)+
        "</ul>" +
      "</div></div>";
      subCategoryHeaders[subCategories[singleCategory].order] = singleSubHtml;
    }
  }

  return subCategoryHeaders;
}
var generateGrubBoxHeader = function() {
  var grubBoxHeader =
  "<div style='display: none;' class='center -expand subcateogry-container__unique sub-grubboxes' ><a class='home__category-header' href='#'>"+
      "<h3>GrubBoxes</h3>"+
  //				    "<span>"+
  //				      "View More"+
  //				    "</span>"+
    "</a>"+
    "<div class='subcategory__section -element-query-active -elementquery-active sub-grubboxes' data-module='elementquery' data-minwidth='400 600 800 1000 1200 1400 1600'>"+
      "<ul id='subcat-grubboxes' class='item-card-container'>"+
      "</ul>" +
    "</div></div>";

  return grubBoxHeader;
}
var setTopLabelPadding = function() {
  $('.item-card-container').find('.shelf-label-container:visible:first').find('.shelf-label-header:first').css({'padding-top': '2px'});
}
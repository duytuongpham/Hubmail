var jobItem = 'career-open-jobs__item';
var triangleClass = 'triangle-right';
var triangleActiveClass = 'triangle-right--active';
var listClass = 'career-open-jobs__list-wrapper';
var listActiveClass = 'career-open-jobs__list-wrapper--active';

$('.js-career-dropdown').on('click', function() {
	var $this = $(this);
	var $item = $this.closest('.' + jobItem);
	var $triangle = $item.find('.' + triangleClass);
	var $list = $item.find('.' + listClass);

	if (!$triangle.hasClass(triangleActiveClass)) {
		$triangle.addClass(triangleActiveClass);
		$list.addClass(listActiveClass);
	} else {
		console.log('removing class');
		$triangle.removeClass(triangleActiveClass);
		$list.removeClass(listActiveClass);
	}
});

function apply() {
	if (!$("#name").val()) {
		alert('Name is required');
		return false;
	}
	if (!$("#email").val()) {
		alert('Email is required');
		return false;
	}
	if (!$("#phone").val()) {
		alert('Phone is required');
		return false;
	}
	if (!$("#resume").val()) {
		alert('Resume is required');
		return false;
	}
	$(".screen-loading").show();
	var form = document.forms.namedItem("apply-job");
	var formData = new FormData(form);
	$.ajax({
		type : "POST",
		url : contextPath + "/jobs/apply",
		data : formData,
		contentType : false,
		processData : false,
		dataType : "text",
		mimeType : "multipart/form-data",
		success : function(data) {
			if (data)
				alert('Apply successful');
			document.getElementById("apply-job").reset();
			$(".screen-loading").hide();
		},
		error : function(err) {
			console.log(err);
			$(".screen-loading").hide();

		}
	});
	return false;
}
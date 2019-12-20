$(function() {

	a();

	function a () {
		var pathSvg = $("#path").get(0),
			pathMain = pathSvg.getTotalLength();

		var confirm = $("#confirm").get(0),
			pathConfirm = confirm.getTotalLength();

		var contour = $("#contour").get(0),
			pathContour = contour.getTotalLength();

		var circle = $("#circle").get(0),
			pathCircle = circle.getTotalLength();	

		var line = $("#line").get(0),
			pathLine = line.getTotalLength();

		var time = 300;

		$("path").each(function() {
			var path = $(this).get(0),
				pathTotal = path.getTotalLength();

			$(this).css({
				'stroke-dasharray': pathTotal,
				'stroke-dashoffset': pathTotal
			});
		});

		$(".email, .password").on('focusin', function() {
			$(this).parent(".cd-block").addClass('in-focus');
		});

		$(".email, .password").on('focusout', function() {
			$(this).parent(".cd-block").removeClass('in-focus');
		});

		$(".email, .password").on('change keyup', function() {
			($(this).val() !== '') ? $(this).parent(".cd-block").addClass('typing') : $(this).parent(".cd-block").removeClass('typing');
		});

		$(".email").on('focusin keyup', function() {

			$("#path").animate({
				'stroke-dashoffset': pathMain - $(".email").innerWidth()
			}, time);

			//Validation Email - http://stackoverflow.com/questions/3663968/how-to-validate-email-in-jquery
			var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

		    (testEmail.test(this.value)) ? $("#confirm").animate({'stroke-dashoffset': 0}, time) : $("#confirm").animate({'stroke-dashoffset': pathConfirm}, time);

		});

		$(".password").on('focusin keyup', function() {

			$("#path").animate({
				'stroke-dashoffset': - (pathMain - $(".email").innerWidth())
			}, time);

			if ($(this).val() == '') {
				$("#contour").animate({'stroke-dashoffset': pathContour}, time);
				$("#circle").animate({'stroke-dashoffset': pathCircle}, time);
				$("#line").animate({'stroke-dashoffset': pathLine}, time);
				$(".password").attr('type', 'password');
			} else {
				$("#contour, #circle").animate({'stroke-dashoffset': 0}, time);
			}

		});

		$("#show_password").on('click', function() {
			$(".password").attr('type') === 'password' ? 
			($(".password").attr('type', 'text'), $("#line").animate({'stroke-dashoffset': 0}, time)) : 
			($(".password").attr('type', 'password'), $("#line").animate({'stroke-dashoffset': pathLine}, time));
				
		});
	}

});
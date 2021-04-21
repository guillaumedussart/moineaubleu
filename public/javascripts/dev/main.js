function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
			$('#imagePreview').hide();
			$('#imagePreview').fadeIn(650);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

$("#imageUpload").change(function () {
	readURL(this);
});
$(document).ready(function () {

	$("#follow-button").click(function () {
		if ($("#follow-button").text() == "+ Follow") {

			var iduser = $(this).data('id');
			var idfollower = $(this).data('id_session');


			var form = new FormData();
			form.append('iduser',iduser);
			form.append('idfollower',idfollower);


			$.ajax({
				url:'/users/follow',
				type:'post',
				data: form,
				processData: false,
				dataType: 'json',
				contentType: false,
				success:function (data) {
					alert(data)
				}
			})
			$("#follow-button").animate({width: '-=10px'}, 100, 'easeInCubic', function () {
			});

			$("#follow-button").animate({width: '+=45px', left: '-=15px'}, 600, 'easeInOutBack', function () {
				$("#follow-button").css("color", "#fff");
				$("#follow-button").text("Following");

				$("#follow-button").animate({
					backgroundColor: "#2EB82E",
					borderColor: "#2EB82E"
				}, 1000);
			});
		} else {

			$("#follow-button").animate({width: '-=25px', left: '+=15px'}, 600, 'easeInOutBack', function () {
				$("#follow-button").text("+ Follow");
				$("#follow-button").css("color", "#3399FF");
				$("#follow-button").css("background-color", "#ffffff");
				$("#follow-button").css("border-color", "#3399FF");
			});
		}
	});
});


function likeThis(button) {
	if ($(button).hasClass('touch')) {
		$(button).removeClass('touch');

	} else {
		console.log($(button).contents('span').addClass('bubble-motion'));
		$(button).addClass('touch');
	}
}

/* $(document).ready(function() {

    $("#follow-button").click(function() {
        if ($("#follow-button").text() == "+ Follow") {
            // *** State Change: To Following ***      
            // We want the button to squish (or shrink) by 10px as a reaction to the click and for it to last 100ms    
            $("#follow-button").animate({ width: '-=10px' }, 100, 'easeInCubic', function() {});

            // then now we want the button to expand out to it's full state
            // The left translation is to keep the button centred with it's longer width
            $("#follow-button").animate({ width: '+=45px', left: '-=15px' }, 600, 'easeInOutBack', function() {
                $("#follow-button").css("color", "#fff");
                $("#follow-button").text("Following");

                // Animate the background transition from white to green. Using JQuery Color
                $("#follow-button").animate({
                    backgroundColor: "#2EB82E",
                    borderColor: "#2EB82E"
                }, 1000);
            });
        } else {

            // *** State Change: Unfollow ***     
            // Change the button back to it's original state
            $("#follow-button").animate({ width: '-=25px', left: '+=15px' }, 600, 'easeInOutBack', function() {
                $("#follow-button").text("+ Follow");
                $("#follow-button").css("color", "#3399FF");
                $("#follow-button").css("background-color", "#ffffff");
                $("#follow-button").css("border-color", "#3399FF");
            });
        }
    });
}); */

var result = $('#search-result');

var searchUser = (valueSearch)=>{
	var inputSearch = $(valueSearch).val();

	$.ajax({
		url:'/users/search',
		type:'post',
		data: {search:inputSearch},
		dataType: 'json',
		success:function (data) {
			console.log(data);
		}

	})
}
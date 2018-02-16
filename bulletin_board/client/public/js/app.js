$(document).ready(function(){

	$('#bulletinBoard-form').on('submit', function(e){
		e.preventDefault();

		var bulletinBoardObj = {
			title: $('#title-input').val(),
			body: $('#body-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/message',
			dataType: 'json',
			data: JSON.stringify(bulletinBoardObj),
			contentType: 'application/json'
		}).then(function(res){
			if(res === "null_message"){
				alert("Please Enter Message")
			}
			appendbulletinBoard();
		});

		$('#title-input').val("");
		$('#body-input').val("");
	});

	function appendbulletinBoard(){
		$('#all-div').remove();
		$.ajax({
			method: 'GET',
			url: '/api/messages'
		}).then(function(messages){
			var allDiv = $('<div id="all-div">');
			var guestDiv, titleP, messageP;
			
			});
			for(var i = 0 ; i < messages.rows.length; i++){
				guestDiv = $('<div class="well guest-div">');
				
				titleP = $('<p>');
				bodyP = $('<p class="body" data-id=' + messages.rows[i].id + '>');

				titleP.text("Title: " + messages.rows[i].title);
				titleP.css({fontWeight: 'bold'})
				bodyP.text("body: " + messages.rows[i].message);
				guestDiv.append(titleP).append(bodyP);
				allDiv.append(guestDiv);
			}
			$('#everything-div').append(allDiv)
	};
	appendbulletinBoard();

		$.ajax({
			method: 'GET',
			url: '/api/messages'
		}).then(function(messages){
			for(var i = 0; i < messages.rows.length; i++){
				if(messages.rows[i].id == messageId){
					var textInput = $("<textarea id='message-update-input'>");
					textInput.val(messages.rows[i].message);
					inputDiv.append(textInput);
				}
			}
			var submitButton = $('<button>');
			submitButton.addClass('btn btn-info enter-button');
			submitButton.attr('data-id', messageId);
			submitButton.text("Enter");
			inputDiv.append("<br>").append(submitButton);

			$('.modal-body').append(inputDiv);
		});



});
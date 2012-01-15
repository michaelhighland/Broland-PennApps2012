<?php
include_once("functions.php");
$cookie = getCookie();
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<script src="javascripts/jquery-1.7.1.min.js" type="text/javascript"></script>
		<title>AJAX Examples</title>


		<script type="text/javascript">
		
			var isLoggedIn = 0;
			var uid = 0;
			
			$(document).ready(function() {
				$("#add-task").click(function(e){
					$.ajax({
				  		url: 'functions.php?ajaxCall=insertUserTask',
				  		data: {
							uid : 12345 , 
							taskName : 'Contact Space Aliens', 
							dateTime : 0, 
							targetTime: 15, 
							actualTime : 34, 
							complete : 0
						},
						success: function(data){ 
							$('#result').html(data);
							$('#result').fadeIn();
						},
						error: function(xhr,err) {
							alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
							alert("responseText: "+xhr.responseText);
						},
						type: 'POST'
					});
				});
				
				$("#get-history").click(function(e){
					$.ajax({
				  		url: 'functions.php?ajaxCall=getUserHistory',
						success: function(data){ 
							$('#result').html(data);
							$('#result').fadeIn();
						},
						error: function(xhr,err) {
							alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
							alert("responseText: "+xhr.responseText);
						},
					});
				});
				
				$('#register-form').submit(function() {
					$.ajax({
				  		url: 'functions.php?ajaxCall=ajaxRegisterUser',
						data: $('#register-form').serialize(),
						success: function(data){ 
							$('#result').html(data);
							$('#result').fadeIn();
						},
						error: function(xhr,err) {
							alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
							alert("responseText: "+xhr.responseText);
						},
						type: 'POST'
					});
					return false;
				});
				
				$('#signin-form').submit(function() {
					$.ajax({
				  		url: 'functions.php?ajaxCall=loginUser',
						data: $('#signin-form').serialize(),
						success: function(data){ 
							alert(data);
							/*
							if (data != 0) {
								$('#signin-box').html("<h1>Welcome " + data + "!</h1>");
								$('#signin-box').css("background-color", "lightBlue");
							}
							else {
								$('#signin-form').append("<h6>Account not found, please try again.</h6>");
							}
							*/
						},
						error: function(xhr,err) {
							alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
							alert("responseText: "+xhr.responseText);
						},
						type: 'POST'
					});
					return false;
				});
			
			});
		</script>

	 
	</head>
	<body>
	

		<div style="width: 300px; margin: 0 auto; background-color: #ddd; height: 300px; margin-top: 200px; padding: 40px; ">
			<input type="button" id="add-task" value="Add Task to DB"/>
			<input type="button" id="get-history" value="Retrieve Task History from DB"/>
			<div id="result" style="display:none; height: 100px; background-color: #ff8f40; color: white; font-family: Helvetica, sans-serif; font-size: 10px; padding: 20px; margin-top: 40px;"></div>
		</div>
		
		<div id="signin-box" style="position: absolute; padding: 20px; width: 200px; height: 200px; background: #ddd; left: 20px; top: 20px;">	
			<form id="signin-form">
				<input type="text" name="email" id="user_login" onclick="if(value=='email') value='';" value="email" /> 
				<input type="password" name="password" id="user_pass" class="input" value="password" onclick="if(value=='password') value='';" />
				<input type="submit" name="submit" id="submit" value="Sign In" /> 
			</form>
		</div>
		
		<div style="position: absolute; padding: 20px; width: 200px; height: 200px; background: #ddd; right: 20px; top: 20px;">	
			<form id="register-form">
				<input type="text" name="email" id="email" onclick="if(value=='email') value='';" value="email" /> 
				<input type="text" name="name" id="name" onclick="if(value=='name') value='';" value="name" /> 
				<input type="password" name="password" id="password" class="input" value="password" onclick="if(value=='password') value='';" />
				<input type="submit" name="register" id="register" value="Register" /> 
			</form>
		</div>
			
			
		</div>
	</body>
</html>
<?php
include_once("functions.php");
$cookie = getCookie();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<title>AJAX Examples</title>


		<script type="text/javascript">
			$(document).ready(function() {
				

		
				$("add-task").click(function(e){
					$.ajax({
				  		url: 'functions.php',
				  		data: ({ajaxCall:insertUserTask, uid : 12345 , taskName : 'Contact Space Aliens', dateTime : 0, targetTime: 15, actualTime : 34, complete = 0}),
						success: function(data){ 
							$('#result').html('Great Success!  You have just added a task to the database. Now try to retrieve it.');
							$('#result').fadeIn();
						},
						error:function(xhr,err) {
							alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
							alert("responseText: "+xhr.responseText);
						}
					});
				});
			
			});
		</script>

	 
	</head>
	<body>
	

		<div style="width: 300px; margin: 0 auto; background-color: #ddd; height: 300px; margin-top: 200px; padding: 40px;">
			<input type="button" id="add-task" value="Add Task to DB"/>
			<input type="button" id="get-history" value="Retrieve Task History from DB"/>
			<div id="result" style="display:none; height: 100px; background-color: #ff8f40; color: white;"></div>
		</div>
		
		<div style="position: absolute; width: 200px; height: 100px;">	
			<input type="text" name="log" id="user_login" onclick="if(value=='email') value='';" value="email" /> 
			<input type="password" name="pwd" id="user_pass" class="input" value="password" onclick="if(value=='password') value='';" />
			<input type="submit" name="submit" id="submit" value="Sign In" /> 
		</div>
			
			
		</div>
	</body>
</html>
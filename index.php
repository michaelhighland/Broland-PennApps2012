<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		<script src="jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="jquery.ui.core.js" type="text/javascript"></script>
		<script src="site.js" type="text/javascript"></script>
		<title>Intention</title>
		<link href="style.css" media="screen" rel="stylesheet" type="text/css" /> 
		<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	</head>
	<body>
		<div id="header">Intention 1.0</div>
		<div id="above-the-fold">
			<div id="fold-hold">
				<div id="prompt">What will you do now?</div>
				<div id="control-surface">
					<div id="slide-holder">
						<div class="slide">
							<input id="thedoing" type="text"/><br/>
							<button class="set-time-button" type="button">NEXT</button>
						</div>
						<div class="slide">
							<div id="time-comment">How long should that take?</div>
							<div id="time-muncher"></div>
							<button class="time-minus-button" type="button">-</button>
							<button class="time-plus-button" type="button">+</button>
							<br/>
							<button id="create-task-button" type="button">GO</button>
							<br/>
							<br/>
							<button class="set-name-button" type="button">On second thought (go back)</button>
						</div>
						<div class="slide">
							<div id="status"></div>
							<button class="complete-task-button" type="button">FINISHED</button>
							<button class="minute-plus-button" type="button">MINUTE PLUS</button>
							<button class="replace-task-button" type="button">SAVE THIS FOR LATER, I'M DOING SOMETHING ELSE!</button>
						</div>
						<div class="slide">
							<center>Are you done yet?</center>
							<button class="replace-task-button" type="button">I'M DOING SOMETHING ELSE!</button>
							<button class="add-time-button" type="button">I NEED MORE TIME</button>
							<button class="complete-task-button" type="button">I FINISHED!</button>
						</div>
					</div>	
				</div>
			</div>	
			<div>Task Queue</div>
			<div id="task-list"> </div>
		</div>
		<div id="below-the-fold">
			footer
		</div>
		
		
		
		
	</body>
</html>

<?php
$dbhost = 'mysql.pennapps.michaelhighland.com';
$dbuser = 'broland';
$dbpass = 'namaste';
$dbname = 'broland';
$connect = mysql_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to mysql: ' . mysql_error());  
mysql_select_db($dbname) or die('Could not select the database: ' . mysql_error());
?>

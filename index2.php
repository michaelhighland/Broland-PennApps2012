<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		<script src="javascripts/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="javascripts/jquery.ui.core.js" type="text/javascript"></script>
		<title>Intention</title>
		<link href="css/style.css" media="screen" rel="stylesheet" type="text/css" /> 
		<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	</head>
	<body>
		<div id="header"><span class="logo">Intention</span></div>
		<div class="wrap">
			<div id="above-the-fold">
				<div id="fold-hold">
					<div id="prompt">What will you do now?</div>
					<div id="control-surface">
						<div id="slide-holder">
							<div class="slide">
								<div id="time-stats">
									<h4>Time Remaining</h4>
									<div id="elapsed-time">26:49</div>
										
									<div id="time-stats-left">
										<h4>Elapsed Time</h4>
										<h5>35:23</h5>
									</div>
									<div id="time-stats-right">
										<h4>Original Target</h4>
										<h5>35:00</h5>
									</div>	
										
										
								</div>
								
								<div id="midtask-options">
									<button class="complete-task-button white midtask">Finished Task</button>
									<button class="minute-plus-button white midtask">Add Minute</button>
									<button class="replace-task-button white midtask">Start New Task</button>
								</div>

								<div class="clear"></div>
							</div>
							
						</div>	
					</div>
				</div>	
				<div>Task Queue</div>
				<div id="task-list"> </div>
			</div>
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

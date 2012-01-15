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
									<div id="time-remaining">26:49</div>
										
									<div id="time-stats-left">
										<h4>Elapsed Time</h4>
										<h5 id="elapsed-time">35:23</h5>
									</div>
									<div id="time-stats-right">
										<h4>Original Target</h4>
										<h5 id="original-target">35:00</h5>
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
				<div id="task-list"> </div>
			</div>
		</div>
		<div id="below-the-fold">
			<div id="history">
				<h6>your history</h6>
				<ul id="history-list">
					<li><span class="history-time">12/24/12 1:32PM</span>take a nice break</li>
					<li><span class="history-time">7/24/12 5:32PM</span>work some more</li>
					<li><span class="history-time">8/25/73 1:32PM</span>so tired</li>
					<li><span class="history-time">12/24/12 1:32PM</span>what is going on</li>
					<li><span class="history-time">12/24/12 1:32PM</span>time to smile</li>
					<li><span class="history-time">6/14/08 2:52PM</span>gadzooooks</li>
					<li><span class="history-time">12/24/12 1:32PM</span>something else of course</li>
					<li><span class="history-time">2/8/17 1:39PM</span>facebooking</li>
					<li><span class="history-time">12/24/12 1:32PM</span>something awesome</li>
				</ul>
			</div>
			<div id="stats">
				<h6>my stats</h6>
				
			</div>
			<div class="clear"></div>
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

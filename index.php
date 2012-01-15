<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		<script src="javascripts/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="javascripts/jquery.ui.core.js" type="text/javascript"></script>
		<script src="javascripts/site.js" type="text/javascript"></script>
		<title>Intention</title>
		<link href="css/style.css" media="screen" rel="stylesheet" type="text/css" /> 
		<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	</head>
	<body>
		<div id="header">
			<div id="logo">Intention</div>
			
			<div id="welcome">Welcome Broland! <!--<button class="white logout">logout</button>--></div>
			<div class="clear"></div>
		</div>
		<div class="wrap">
			<div id="above-the-fold">
				<div id="fold-hold">
					<div id="prompt"></div>
					<div id="control-surface">
						<div id="slide-holder">
							<div class="slide">
								<input id="thedoing" type="text"/>
								<button class="set-time-button white">SET</button>
								<div class="clear"></div>
								<h3>be specific!</h3>
							</div>
							<div class="slide">
								<h2>How long should that take?</h2>
								
								<button id="time-muncher" class="time white"></button>
								<div id="minutes"><h3>minutes</h3></div>
								<button class="time-minus-button white">-</button>
								<button class="time-plus-button white">+</button>
								
								<button class="set-name-button small white">&larr; Change Intention</button>
							</div>
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
							<div class="slide">
								<center>Are you done yet?</center>
								<button class="replace-task-button" type="button">I'M DOING SOMETHING ELSE!</button>
								<button class="add-time-button" type="button">I NEED MORE TIME</button>
								<button class="complete-task-button" type="button">I FINISHED!</button>
							</div>
						</div>	
					</div>
				</div>	
				<h3 id="pending-tasks">pending</h3>
				<ul id="task-list"> </ul>
			</div>
		</div>
		<div id="below-the-fold">
			<div id="history">
				<h6>your history</h6>
				<ul id="history-list">
					
				
				</ul>
			</div>
			<div id="stats">
				<h6>my stats</h6>
				
			</div>
			<div class="clear"></div>
		</div>
		
		
		
		
		
		
	</body>
</html>

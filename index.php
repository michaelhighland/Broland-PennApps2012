<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		<script src="javascripts/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="javascripts/jquery.ui.core.js" type="text/javascript"></script>
		<script src="javascripts/site.js" type="text/javascript"></script>
		<title>Intentionq</title>
		<link href="css/style.css" media="screen" rel="stylesheet" type="text/css" /> 
		<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
		
		<script type='text/javascript'>
			var GLOBAL_UID = -1;
		</script>
		
		<?php
			if(isset($_GET["uid"])){
				echo "<script type='text/javascript'>GLOBAL_UID=".$_GET["uid"].";</script>";	
			}
		?>
	</head>
	<body>
		
		
		
		<div id="overlay">
			<div id="overlay-wrap">
				<h1></h1>
				<h2>are you done?</h2>
				<button class="white overlay-yes replace-task-button complete-task-button">YES</button>
				<button class="white overlay-no-top add-time-button">NO, <span>I need more time</span></button>
				<button class="white overlay-no-bottom replace-task-button">NO, <span>I'm doing something else</span></button>
				<div class="clear"></div>
			</div>
		</div>
		
		<div id="header">
			<div id="logo">Intentionq - BETA</div>
			
			<div id="welcome">Welcome Stranger<!--<button class="white logout">logout</button>--></div>
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
								<button class="set-time-button orange">SET</button>
								<div class="clear"></div>
								<div class="catchphrase"><h3>Set an intention for using the computer, be specific.</h3></div>
							</div>
							<div class="slide">
								<h2>How long should that take?</h2>
								
								<button id="time-muncher" class="time white"></button>
								<div id="minutes"><h3>minutes</h3></div>
								<button class="time-minus-button orange">-</button>
								<button class="time-plus-button orange">+</button>
								<div class="timer-instruction"><h3>Click to set</h3></div>
								
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
									<button class="complete-task-button white midtask">All Done</button>
									<button class="minute-plus-button white midtask">Minute Plus</button>
									<button class="replace-task-button white midtask">New Intention</button>
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
			<div class="logged-out">
				<div id="about">
					<h6>about</h6>
					<p>What would it look like to use the computer in a more intentional way; to only engage in tasks out of a conscious desire to do so? <em>Intentionq</em> aims to answer that question in the simplest way possible, by recording and tracking your intentions as you use the computer. 
					<p>
					We are currently testing and gathering feedback. A fully featured version of the app will be available soon, so please check back!
					</p>
				</div>
				
				<div id="feedback">
					<h6>give feedback</h6>
					<p>
						Intentionq was built by <a href="http://www.michaelhighland.com">Michael Highland</a>  and <a href="http://relativecommotion.com/#3">Justin Broglie</a> during the 2012 PennApps 48 hour Hackathon. We're continuing to develop the app so your feedback is appreciated. Please address your comments to ego@michaelhighland.com!
					</p>
				</div>
			
			</div>
			<div class="logged-in">	
				<div id="history">
					<h6>my history</h6>
					<div class="history-title">date / intention / actual time / target time / efficiency</div>
					<ul id="history-list">
					
				
					</ul>
				</div>
				<div id="stats">
					<h6>my stats</h6>
				
					<div class="stat" id="stat-num-tasks"></div>
					<div class="stat-title">total intentions</div>
					<div class="stat-description">Get Some</div>
				
				
					<div class="stat" id="stat-total-time"></div>
					<div class="stat-title">total time spent</div>
					<div class="stat-description">Hours:Minutes</div>
				
					<div class="stat" id="stat-avg-ratio"></div>
					<div class="stat-title">average efficiency rating</div>
					<div class="stat-description">Target Time / Actual Time</div>
				
					<div class="stat" id="stat-avg-accuracy"></div>
					<div class="stat-title">know thyself</div>
					<div class="stat-description">Accuracy of Your Self Perception</div>
				
				</div>
			</div>
			<div class="clear"></div>
		</div>
		
		
		
		
		
		
	</body>
</html>

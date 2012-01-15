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
		
		<div id="about">
			<h3>What is Intentionq?</h3>

		<p>What would it look like to use the computer in a more intentional way; to only engage in tasks out of a conscious desire to do so? Intentionq aims to answer that question in the simplest way possible, by recording and tracking your intentions as you use the computer.</p>
		
		<p class="quote">“The conviction was growing in me that the besetting problem was our culture’s blindness to the distinction between the 	tool and the automatic machine. Everyone tended to treat them alike, as neutral agents of human intention. But machines clearly were not neutral or inert objects. They were complex fuel consuming entities with certain definite proclivities and needs. Besides often depriving their users of skills and physical exercise, they created new and artificial demands -- for fuel, space, money, and time. These in turn crowded out other important human pursuits, like involvement in family and community, or even the process of thinking itself. The very act of accepting the machine was becoming automatic.”</p>

	<p class="quote-author">From <b><a href="http://www.amazon.com/Better-Off-Flipping-Switch-Technology/dp/0060570040" target="_blank">Better Off</a></b> by Eric Brende</div>

		</div>
		
		<div id="header">
			<div id="logo">Intention</div>
			
			<div id="welcome">Welcome Justin! <!--<button class="white logout">logout</button>--></div>
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
								<div class="catchphrase"><h3>set an intention, be specific.</h3></div>
							</div>
							<div class="slide">
								<h2>How long should that take?</h2>
								
								<button id="time-muncher" class="time white"></button>
								<div id="minutes"><h3>minutes</h3></div>
								<button class="time-minus-button orange">-</button>
								<button class="time-plus-button orange">+</button>
								
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
				<div class="history-title">date / intention / actual time / target time / efficiency</div>
				<ul id="history-list">
					
				
				</ul>
			</div>
			<div id="stats">
				<h6>my stats</h6>
				
				<div class="stat" id="stat-num-tasks">96</div>
				<div class="stat-title">total intentions</div>
				<div class="stat-description">Get Some</div>
				
				
				<div class="stat" id="stat-total-time">31:29</div>
				<div class="stat-title">total time spent</div>
				<div class="stat-description">Hours:Minutes</div>
				
				<div class="stat" id="stat-avg-ratio">122%</div>
				<div class="stat-title">average efficiency rating</div>
				<div class="stat-description">Target Time / Actual Time</div>
				
				<div class="stat" id="stat-avg-accuracy">88%</div>
				<div class="stat-title">know thyself</div>
				<div class="stat-description">Accuracy of Your Self Perception</div>
				
			</div>
			<div class="clear"></div>
		</div>
		
		
		
		
		
		
	</body>
</html>

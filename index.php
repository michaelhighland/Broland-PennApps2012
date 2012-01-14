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
		<div id="above-the-fold">
			<div id="prompt">What will you do now?</div>
			<div id="control-surface">
				<div id="slide-holder">
					<div class="slide">
						<input id="thedoing" type="text"/>
						<button class="time-slide" type="button">NEXT</button>
					</div>
					<div class="slide">
						<button class="task-slide" type="button">On second thought (go back)</button>
						<div id="time-muncher"></div>
						<button class="time-minus" type="button">-</button>
						<button class="time-plus" type="button">+</button>
						<br/>
						<button id="gobutton" type="button">GO</button>
					</div>
					<div class="slide">
						<button class="donebutton" type="button">FINISHED</button>
						<button class="moretimebutton" type="button">MORE TIME</button>
						<button class="task-slide" type="button">I'M DOING SOMETHING ELSE!</button>
					</div>
					<div class="slide">
						Did you finish what you were doing?
						<button class="task-slide" type="button">I'M DOING SOMETHING ELSE!</button>
						<button class="moretimebutton" type="button">I NEED MORE TIME</button>
						<button class="donebutton" type="button">I FINISHED!</button>
					</div>
				</div>	
			</div>
		</div>
		<div id="below-the-fold">
			footer
		</div>
		
		
		<div id="task-list">
		</div>
		
		
		
		
	</body>
</html>
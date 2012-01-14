<?php
include_once("functions.php");
$cookie = getCookie();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:fb="http://www.facebook.com/2008/fbml">
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<title>opennhouse</title>
		<!-- Begin Stylesheets -->
			<link href="css/style.css" rel="stylesheet" type="text/css" />
			<link href="css/easyslider.css" rel="stylesheet" type="text/css" />
			
			<link href="css/jquery-ui-1.8.5.custom.css" rel="stylesheet" type="text/css" />
			<link rel="stylesheet" href="fancybox/jquery.fancybox-1.3.1.css" type="text/css" media="screen" />

		<!-- End Stylesheets -->
		
		<!-- Begin JavaScript -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" ></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js" ></script>
		<script type="text/javascript" src="fancybox/jquery.fancybox-1.3.1.pack.js"></script>		
		<script type="text/javascript" src="js/functions.js"></script>
		<!-- End JavaScript -->
		
			 
	</head>
	<body>
	

    <?php if ($cookie) {
		$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token=' . $cookie['access_token']));
		register_user($user->id,$user->name,$user->email);
	  }
	  else{
		// no cookie 
	  }
	?>
  

    <div style="display: none;">
		<div id="login" style="text-align: center">
		<h1>Login with Your Facebook Account</h1>
			<p><fb:login-button perms="email" autologoutlink="true"></fb:login-button></p>
		</div>
	</div>
    <div id="fb-root"></div>
    <script>
		window.fbAsyncInit = function() {
			FB.init({appId: '328390977182876', status: true, cookie: true, xfbml: true});
		
			// called when user logs in
			FB.Event.subscribe('auth.login',
				function(response){
					window.location.reload();
				}
			);
		
			// called when user logs out
			FB.Event.subscribe('auth.logout', 
				function(response) {
					$('#login-button').text('login');
					$('#login h1').text('Login with Your Facebook Account');
					$('#nav-right').fadeOut();
					$('#dashboard').fadeOut();
					$('#navItemWelcome').fadeOut();
				}
			);

	     FB.getLoginStatus(function(response) {
         	if (response.session) {
				 FB.api('/me', function(object) {
					$('a.welcome').text('Welcome ' + object.name.replace(/ .*$/,'') + '!'); 
					$('#navItemWelcome').fadeIn();
					$('#nav-right').fadeIn();
					$('#dashboard').fadeIn();
				});
			$('#login-button').text('logout');
			$('#login h1').text('Are you sure you want to logout?'); //
	         }
			 
			 else {
				$('#nav-right').fadeOut();
				$('#dashboard').fadeOut();
			 
			 }
	     });
      };
      (function() {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());
    </script>

		<div id="header"> 
			<div id="nav-bar"> 
				<div id="nav-left"> 
					<ul>
						<li id="navItemWelcome" style="display:none"><a class="welcome"></a></li>
						<li class="current"><a href="index.php" class="current">Home</a></li>
						<li id="dashboard-button"><a href="dashboard.php">Dashboard</a></li>
						<li><a href="#login" id="login-button">login</a></li>
					</ul>
				</div>
				
				<a href="index.php" title="Go Back Home!"><div id="logo"></div></a>
				<div id="nav-right" style="display:none"> 
					<ul>
						<li><a href="find-houses.php">Find Houses</a></li>
						<li><a href="browse.php">Browse Houses</a></li>
					</ul>
				</div>
			</div>
			
			
		</div>

		<div id="footer"> 
			<div id="footer-wrapper"> 
		
				<a href="index.php" title="Go Back Home!"><div id="logo-footer"></div></a>
				<h5>oPennHouse &copy; 2010</h5>
				<h6>oPennHouse was developed by Vince Mannino, Alex Marple, and Justin Broglie for PennApps 2010, a 48-hackathon.</h6>
				<div class="clear"></div>
			</div>
		
		
		</div>
	</body>
</html>
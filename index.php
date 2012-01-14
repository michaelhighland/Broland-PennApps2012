<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
		<script src="site.js" type="text/javascript"></script>
		<script src="jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="jquery.ui.core.js" type="text/javascript"></script>
		<title>Intention</title>
		<link href="style.css" media="screen" rel="stylesheet" type="text/css" /> 
	</head>
	<body>
		The Body!
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
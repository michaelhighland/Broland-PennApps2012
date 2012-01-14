<?php

// this if block will be executed if there is an ajaxCall;
// make sure the data parameters are passed using the POST protocol
if (!empty($_GET['ajaxCall'])) { 
        require_once ROOT . '/' . $_GET['load']; 
        call_user_func_array($_GET['ajaxCall'], $_POST); 
        die(); 
}


function connectToDatabase() {
	$dbhost = 'mysql.pennapps.michaelhighland.com';
	$dbuser = 'broland';
	$dbpass = 'namaste';
	$dbname = 'broland';
	mysql_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to mysql: ' . mysql_error());  
	mysql_select_db($dbname) or die('Could not select the database: ' . mysql_error());
}

function sanitize($string) {
	$string = strip_tags($string);
	$string = htmlentities($string);
	$string = stripslashes($string);
	return mysql_real_escape_string($string);
}


function getCookie() {
	// NEED TO GET A NEW FACEBOOK APP ID
	$app_id = '328390977182876';
	$app_secret = '09049fb24d87bd0bb66d7bdd1ff407bf';
	
	$args = array();
	parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
	ksort($args);
	$payload = '';
	foreach ($args as $key => $value) {
		if ($key != 'sig') {
			$payload .= $key . '=' . $value;
		}
	}
	if (md5($payload . $app_secret) != $args['sig']) {
		return null;
	}
	return $args;
}

function getUserId() {
	$uid = json_decode(file_get_contents('https://graph.facebook.com/me?access_token=' . $cookie['access_token']))->id;
	return $uid;
}

function registerUser($uid, $email, $name) {
	$registered = mysql_num_rows(mysql_query("SELECT * FROM users WHERE uid='".$uid."'"));
	if ($registered){
		echo 'registered';
	}
	else{
		if (!mysql_result(mysql_query("INSERT INTO 'users' ('uid','email','name') VALUES('".$uid."','".$email."','".$name."')"))){
			echo 'error: ';
			echo mysql_error();	
		}
	}
	$date = date("Y-m-d"); 
		mysql_query("UPDATE users SET last_login='".$date."' WHERE uid='".$uid."'");
}

// returns name of logged in user, otherwise 0
function loggedInUserName() {
	// get the session cookie
	
	
}

// returns whether login has been successful
function logIn($email, $password) {
	
}



function getUserHistory($uid){
	$tasksArray = mysql_query("SELECT * FROM tasks WHERE uid='".$uid."'");
	
	$htmlString = '';
	while ($tasks = mysql_fetch_object($tasksArray)) {
		
		// floop in here that generates the HTML
		
	}	
	return $htmlString;
}

function insertUserTask($uid, $taskName, $dateTime, $targetTime, $actualTime, $complete = 0){
	$ratio = 0; // ratio defaults to NULL
	if ($complete) $ratio = $targetTime/$actualTime;
	if (!$dateTime) $dateTime = date("Y-m-d"); // IS THIS CORRECT FORMAT FOR SQL???
	
	if (!mysql_result(mysql_query(mysql_query(
		"INSERT INTO users (`uid`, `taskName`, `dateTime`, `targetTime`, `actualTime`, `complete`, 'ratio') VALUES ($uid, $taskName, $dateTime, $targetTime, $actualTime, $complete, $ratio)")))) {
		echo 'error: ';
		echo mysql_error();	
	}
}


?>
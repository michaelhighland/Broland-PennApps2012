<?php

connectToDatabase();

// this if block will be executed if there is an ajaxCall;
// make sure the data parameters are passed using the POST protocol
if (!empty($_GET['ajaxCall'])) { 
        call_user_func_array($_GET['ajaxCall'], $_POST); 
        die(); 
}

function helloWorld() {
	echo '\n\ntest';
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

function ajaxRegisterUser($email, $name, $password) {	
	$email = sanitize($email);
	$name = sanitize($name);
	$password = sanitize($password);
	registerUser(0,0,$email, $name, $password);
}

function isRegistered($uid) {
	$registered = mysql_num_rows(mysql_query("SELECT * FROM users WHERE uid='$uid'"));
	return ($registered > 0);
}

function registerUser($uid = 0, $fbid = 0, $email, $name, $password = 0) {
	
	if (isRegistered($uid)){
		echo 'Sorry this user is already registered.';
	}
	else{
		$lastLogin = date('Y-m-d H:i:s'); 
		if (!mysql_query("INSERT INTO users (email, name, password, lastLogin) VALUES('$email','$name', '$password', '$lastLogin')")){
			echo 'error: ';
			echo mysql_error();	
		}
		else {
			echo "<h1>Registered User!</h1>";
			echo $email . "<br/>";
			echo $name . "<br/>";
			echo $password . "<br/>";
		}
	}
}

// returns name of logged in user, otherwise 0
function loggedInUserName() {
	// get the session cookie
	
	
}

// returns whether login has been successful
function loginUser($email, $password) {
	$email = sanitize($email);
	$password = sanitize($password);
	$user = mysql_fetch_object(mysql_query("SELECT * FROM users WHERE email='$email'"));
	echo $user->password;
	//if ($user->password != $password) return 0;
}



function getUserHistory($uid){
	$tasksArray = mysql_query("SELECT * FROM tasks WHERE uid='$uid'");
	
	$htmlString = '';
	while ($tasks = mysql_fetch_object($tasksArray)) {
		
		// floop in here that generates the HTML
		
	}	
	return $htmlString;
}

function insertUserTask($uid, $taskName, $dateTime, $targetTime, $actualTime, $remainingTime, $complete = 0) {
	$ratio = 0.0; // ratio defaults to NULL
	if ($complete) $ratio = $targetTime/$actualTime;
	if (!$dateTime) $dateTime = date('Y-m-d H:i:s'); // IS THIS CORRECT FORMAT FOR SQL???
	
	if (!mysql_query(
		"INSERT INTO tasks (uid, taskName, dateTime, targetTime, actualTime, remainingTime, complete, ratio) 
		VALUES ('$uid', '$taskName', '$dateTime', '$targetTime', '$actualTime', '$remainingTime', '$complete', '$ratio')"
		)) {
			
		echo 'error: ';
		echo mysql_error();	
	}
	else { 
		echo mysql_insert_id();
	}
}

function updateTaskTime($id, $elapsed, $remaining) {
	if (!mysql_query(
		"UPDATE tasks SET actualTime = '$elapsed', remainingTime = '$remaining' WHERE id = '$id'"
		)) {		
		echo 'error: ';
		echo mysql_error();	
	}
	else { 
		echo "success!";
	}
}

function completeTask($id, $elapsed, $remaining) {
	if (!mysql_query(
		"UPDATE tasks SET remainingTime = '$remaining', actualTime = '$elapsed', ratio = (actualTime/targetTime), complete = '1' WHERE id = '$id'"
		)) {		
		echo 'error: ';
		echo mysql_error();	
	}
	else { 
		echo "success!";
	}
}

function getOpenTasks($id) {
	$result = mysql_query("SELECT * FROM tasks WHERE uid='$id' AND complete = 0");
	$searchResultMap=array();
	while ($rowArray=mysql_fetch_array($result,MYSQL_ASSOC)){
		$searchResultMap[]=$rowArray;
	}
	echo json_encode($searchResultMap);
}

function getHistory($id) {
	$result = mysql_query("SELECT * FROM tasks WHERE uid='$id' AND complete = 1");
	$searchResultMap=array();
	while ($rowArray=mysql_fetch_array($result,MYSQL_ASSOC)){
		$searchResultMap[]=$rowArray;
	}
	echo json_encode($searchResultMap);
}




?>
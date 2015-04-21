<?php
define('ROOT',dirname(__FILE__).'/');
define('SERV',dirname($_SERVER['SCRIPT_NAME']).'/');
define('CALL',preg_replace('/\?.*/','',substr($_SERVER['REQUEST_URI'],strlen(SERV))));
define('NL','
');
define('HG','<script type="text/javascript" src="'.SERV.'pages/global.js"></script><link rel="StyleSheet" href="'.SERV.'pages/global.css" type="text/css"/>');
function prnt($text,$flags=array('nl')){
	$flagfuncs=array(
		"nl"=>function($text){
			return str_replace('\n',NL,$text);
		}
	);
	foreach($flags as $flag){
		if(array_key_exists($flag,$flagfuncs)){
			$func=$flagfuncs[$flag];
			$text=$func($text);
		}
	}
	echo $text;
}
function err($msg){
	prnt('\n<!--\nSYSTEM ERROR.\n'.$msg.'\n-->\n');
	die();
}
function getClass($name){
	if(file_exists(ROOT.'classes/'.$name.'.php')){
		try{
			include(ROOT.'classes/'.$name.'.php');
		}catch(Exception $e){
			err('ATTEMPTED TO IMPORT CLASS "'.$name.'".\nPHP THREW THE FOLLOWING EXCEPTION:\n'.$e);
		}
	}else{
		err('ATTEMPTED TO IMPORT CLASS "'.$name.'".\nCLASS "'.$name.'" DOES NOT EXIST.');
	}
}
?>
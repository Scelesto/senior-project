<?php
define('ROOT','/Users/Abram/Documents/GitHub/senior-project/serv/');
define('SERV','/webopt/');
define('CALL',preg_replace('/\?.*/','',substr($_SERVER['REQUEST_URI'],strlen(SERV))));
define('NL','
');
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
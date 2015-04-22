<?php
function read($name){
	try{$file=fopen($name,"r");}catch(Exception $e){$file=false;}
	if(!$file){return false;}
	$content=fread($file,filesize($name));
	fclose($file);
	return $content;
}
function write($name,$content){
	$file=fopen($name,"w");
	fwrite($file,$content);
	fclose($file);
	return true;
}
$file=".htaccess";
$check="configured.txt";
$correct=dirname($_SERVER['SCRIPT_NAME']).'/';
if(read($check)!=$correct||!defined('globAC')){
	write($file,preg_replace('/\#RewriteBase [^\s]*/','#RewriteBase '.$correct,read($file)));
	write($check,$correct);
}
?>
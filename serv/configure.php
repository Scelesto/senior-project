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
if(read($check)!="yes"){
	write($file,preg_replace('/\#RewriteBase [^\s]*/','#RewriteBase '.dirname($_SERVER['SCRIPT_NAME']).'/',read($file)));
	write($check,"yes");
}
echo "SYSTEM CONFIGURED.";
?>
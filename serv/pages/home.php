<?php
getClass("user");
$u=new user();
if(CALL==""){
	header("Refresh: 0; url=".SERV."home");
	die();
}
?>
WEB OPTIMIZATION PROTOCOL
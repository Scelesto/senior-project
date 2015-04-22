<?php
getClass("user");
$u=new user();
if(CALL==""){
	header("Refresh: 0; url=".SERV."home");
	die();
}
?>
<html>
<head>
<?=HG?>
</head>
<body>

</body>
</html>
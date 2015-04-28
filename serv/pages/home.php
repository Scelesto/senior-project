<?php
getClass("user");
$u=new user();
if(CALL==""){
	header("Refresh: 0; url=".SERV."home");
	die();
}
?>
<!DOCTYPE html>
<html>
<head>
<?=HG?>
<style>

</style>
</head>
<body>
<center style='display:none;'>
<h3 style="font-size:30px;margin-bottom:5px;">WEBSITE OPTIMIZATION ENGINE</h3>
<?php if($u->hasOldProjects()){?>
<div><h3>PAST UPLOADS</h3></div>
<?php }?>
<div><h3>UPLOAD A FILE</h3></div>
<div><h3>ABOUT</h3></div>
</center>
<script>
document.getElementsByTagName('center')[0].style.display='inline';
</script>
<noscript>Sorry, this website does not currently work without JavaScript.</noscript>
</body>
</html>
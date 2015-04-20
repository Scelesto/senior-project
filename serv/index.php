<?php
/*
Web Optimizer
by Abram Foster
Park School of Baltimore Senior Project 2015
Started v0 4/20/2015
*/
include("rootfuncs.php"); //Consts ROOT,SERV,CALL,NL; Funcs prnt,err,getClass
include("pageref.php"); //Reference for URI to file conversion
if(array_key_exists(CALL,$pages)){
	include('pages/'.$pages[CALL]); //Load correct file
}
?>
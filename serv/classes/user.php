<?php
class user {
	function __construct(){
		if(array_key_exists('nosess',$_REQUEST)){
			if(!array_key_exists('id',$_REQUEST)){
				setcookie("id",rand(10000,99999));
				$this->newuser();
			}
			$this->id=$_REQUEST['id'];
		}else{
			if(!session_start()){
				setcookie("nosess","true");
				header("Refresh: 0; url=");
				die();
			}
			if(!array_key_exists('id',$_SESSION)){
				$_SESSION['id']=rand(10000,99999);
				$this->newuser();
			}
			$this->id=$_SESSION['id'];
		}
	}
	function newuser(){
		include(ROOT.'pages/newuser.php');
		getClass("jobs");
		$j=new jobs();
		$j->routine();
		header("Refresh: 1; url=".SERV."home");
		die();
	}
}
?>
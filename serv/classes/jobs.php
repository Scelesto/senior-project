<?php
class jobs {
	function routine(){
		if(globAC){$this->configure();}
	}
	function configure(){
		include(ROOT.'configure.php');
	}
}
?>
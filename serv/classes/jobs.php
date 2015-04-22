<?php
class jobs {
	function routine(){
		$this->configure();
	}
	function configure(){
		include(ROOT.'configure.php');
	}
}
?>
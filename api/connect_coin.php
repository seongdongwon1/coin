<?php
    error_reporting( E_ALL);
	ini_set( "display_errors", 1 );
	ini_set('session.use_trans_sid', 0);
	ini_set("url_rewriter.tags","");

    header('Content-type: text/html; charset=UTF-8');

    $db = @mysqli_connect("localhost", "sdw", "1234", "coin");
	if (!$db) {
	    $error = mysqli_connect_error();
	    $errno = mysqli_connect_errno();
	    print "$errno: $error\n";
	    exit();
	}
?>
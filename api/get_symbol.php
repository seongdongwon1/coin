<?php
    require_once('./connect_coin.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");

    header('Content-type: text/html; charset=UTF-8');

    $code = file_get_contents("https://api.upbit.com/v1/ticker?markets=KRW-BTC");
    var_dump($code);


?>
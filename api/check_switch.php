<?php
    require_once('./connect_coin.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");
    date_default_timezone_set('Asia/Seoul');

    header('Content-type: text/html; charset=UTF-8');

    $check_switch = $_GET['button'];

    $sql = "select * from dataon;";
    $result = $db->query($sql);
    $tmp = $result->fetch_array(MYSQLI_ASSOC);
    $now_date = date("Y-m-d H:i:s");
    $half_date = date("Y-m-d H:i:s", strtotime($now_date. "-12 hours"));
    
    if($check_switch === "0")
    {
        echo "on";
    }
    else
    {
        echo "off";
    }
?>
<?php
    require_once('./connect_coin.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");

    header('Content-type: text/html; charset=UTF-8');

    $symb = $_GET['data'];
    // 모든 use_yn 다 0으로 지우고 다시 client 에서 받아온 list 들 use 변경
    $sql = "UPDATE `krw_master` SET use_yn = 0;";
    $db->query($sql);

    for($i=0; $i<count($symb); $i++)
    {
        $user = $symb[$i];
        print_r($user);
        $sql = "UPDATE `krw_master` SET use_yn = 1 WHERE symb='".$user."'";
        $db->query($sql);
    }
?>
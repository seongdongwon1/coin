<?php
    require_once('./connect_coin.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");
    date_default_timezone_set('Asia/Seoul');

    header('Content-type: text/html; charset=UTF-8');

    $use_symb = $_GET['data'];

    for($i=0; $i<count($use_symb); $i++)
    {
        $code = file_get_contents("https://api.upbit.com/v1/ticker?markets=".$use_symb[$i]['symb']."");
        $code = json_decode($code, true);
        $now_date = date("Y-m-d H:i");
        $sql="INSERT INTO `data_5m` (symb, `date`, price) VALUE 
                ('".$code[0]['market']."', '".$now_date."', '".$code[0]['trade_price']."')";
        $result = $db->query($sql);
    }

    
    mysqli_close($db);

?>
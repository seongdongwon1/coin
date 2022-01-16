<?php
    require_once('./connect_coin.php');
    require_once('./func.php');


    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");
    date_default_timezone_set('Asia/Seoul');

    header('Content-type: text/html; charset=UTF-8');
    
    $use_symb = $_GET['data'];

    $cul = [
        'one_two',
        'two_three',
        'three_four',
        'four_five',
        'five_six',
        'six_seven',
        'seven_eight',
        'eight_nine',
        'nine_ten',
        'ten_eleven',
        'eleven_twelve',
        'twelve_thirteen',
    ];
    for($i=0; $i<count($use_symb); $i++)
    {
        $code = file_get_contents("https://api.upbit.com/v1/ticker?markets=".$use_symb[$i]['symb']."");
        $code = json_decode($code, true);
        $now_date = date("Y-m-d H:i:s");
        // 1. 먼저 최신데이터 무조건 받아옴.
        // 2. 어차피 기준은 하나 이기 때문에 하나의 데이터만 제공해주면 됨.
        $sql = "INSERT INTO `data_5m` (symb, `date`, price) VALUE ('".$code[0]['market']."', '".$now_date."', '".$code[0]['trade_price']."')";
        $db->query($sql);

        $sql2 = "SELECT * FROM `data_5m` WHERE symb='".$use_symb[$i]['symb']."' order by `date` desc limit 13";
        $result = $db->query($sql2);
        $arr = array();
        while($tmp = $result->fetch_array(MYSQLI_ASSOC))
        {
            $arr[] = $tmp;
        }
        $arr = array_reverse($arr);
        $import_symb = $arr[0]['price'];
        $symb_name = $arr[0]['symb'];
        $symb_date = $arr[0]['date'];
        for($j=1; $j<count($arr); $j++)
        {
            $compare_price = $arr[$j]['price'];
            $sum = $compare_price - $import_symb;
            $sql3 = "UPDATE `data_5m` SET `".$cul[$j-1]."` = $sum WHERE symb='".$symb_name."' and `date` = '".$symb_date."'";
            $db->query($sql3);
        }
    }

    $send_arr = array();
    for($i=0; $i<count($use_symb); $i++)
    {
        $sql2 = "SELECT * FROM `data_5m` WHERE symb='".$use_symb[$i]['symb']."' order by `date` desc limit 13";
        $result = $db->query($sql2);
        $arr = array();
        while($tmp = $result->fetch_array(MYSQLI_ASSOC))
        {
            $arr[] = $tmp;
        }
        $arr = array_reverse($arr);
        $send_arr[$arr[0]['symb']] = $arr[0];
    }
    $json = json_encode($send_arr, JSON_UNESCAPED_UNICODE);

    mysqli_close($db);
    echo $json;
?>
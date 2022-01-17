<?php
    require_once('./connect_coin.php');
    require_once('./func.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");
    date_default_timezone_set('Asia/Seoul');

    header('Content-type: text/html; charset=UTF-8');

    $sql = "SELECT * FROM `data_5m`;";
    $result = $db->query($sql);
    $arr = array();
    $now_date = date("Y-m-d H:i:s");
    $half_date = date("Y-m-d H:i:s", strtotime($now_date. "-12 hours"));

    while($tmp = $result->fetch_array(MYSQLI_ASSOC))
    {
        $arr[] = $tmp;
    }

    for($i=0; $i<count($arr); $i++)
    {
        $date = $arr[$i]['date'];
        if($date < $half_date)
        {
            $sql2 = "DELETE FROM `data_5m` where `date` = '".$date."';";
            $db->query($sql2);
        }
    }

    echo "12시간 지난 데이터 삭제 완료";
?>
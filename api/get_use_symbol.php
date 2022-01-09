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

        $sql = "SELECT * FROM `data_5m` WHERE symb='".$use_symb[$i]['symb']."' order by date desc limit 13";
        $result =  $db->query($sql);
        if($result->num_rows > 0)
        {
            $tmp = $result->fetch_array(MYSQLI_ASSOC);
            //$json = json_encode($tmp, JSON_UNESCAPED_UNICODE);
            print_r($code[0]['trade_price']);
            echo "\n";
            $ahead = $tmp['price'];
            $now = $code[0]['trade_price'];
            $sum = $now - $ahead;
            print_r($sum);
            echo "\n";
        }
        else
        {
            $sql="INSERT INTO `data_5m` (symb, `date`, price) VALUE 
                    ('".$code[0]['market']."', '".$now_date."', '".$code[0]['trade_price']."')";
            $result = $db->query($sql);
        }
    }

    // $send_data = array();
    // for($i=0; $i<count($use_symb); $i++)
    // {
    //     $sql = "SELECT * FROM `data_5m` WHERE symb = '".$use_symb[$i]['symb']."' order by date asc;";
    //     $result = $db->query($sql);
    //     $arr = array();
    //     while($tmp = $result->fetch_array(MYSQLI_ASSOC))
    //     {
	//     	$arr[] = $tmp;
	//     }
    //     //$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
    //     array_push($send_data, $arr);
    //     $result->free();
    // }
    
    // for($i=0; $i<count($send_data[0]); $i++)
    // {
    //     $symb = $send_data[0][$i];
    //     for($j=0; $j<count($symb); $j++)
    //     {
    //         $price = $symb[$j]['price'];
    //         for($z=0; $z<count($symb);)
    //     }
    // }
    
    
    
    
    
    
    
    
    
    // $json = json_encode($send_data, JSON_UNESCAPED_UNICODE);
    // echo $json;
    mysqli_close($db);

?>
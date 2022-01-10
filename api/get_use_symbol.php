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
        $now_date = date("Y-m-d H:i");

        $sql = "SELECT * FROM `data_5m` WHERE symb='".$use_symb[$i]['symb']."' order by last_updt desc limit 12";
        $result =  $db->query($sql);
        if($result->num_rows > 0)
        {
            $arr = array();
            while($tmp = $result->fetch_array(MYSQLI_ASSOC))
            {
                $arr[] = $tmp;
            }
            for($j=0; $j<count($arr); $j++)
            {
                $compare = $arr[$j]['price'];
                $now = $code[0]['trade_price'];
                $sum = $now - $compare;
                if($j === 0)
                {
                    $sql = "INSERT INTO `data_5m` (symb, `date`, price, one_two) VALUE ('".$code[0]['market']."', '".$now_date."', '".$now."', '".$sum."')";
                    $db->query($sql);
                }
                else
                {
                    $sql = "UPDATE `data_5m` SET `".$cul[$j]."` = '".$sum."' WHERE symb = '".$use_symb[$i]['symb']."' order by last_updt desc limit 1";
                    $db->query($sql);
                    
                }
            }
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
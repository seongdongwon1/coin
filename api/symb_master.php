<?php
    require_once('./connect_coin.php');

    error_reporting( E_ALL);
    ini_set( "display_errors", 1 );
    ini_set('session.use_trans_sid', 0);
    ini_set("url_rewriter.tags","");

    header('Content-type: text/html; charset=UTF-8');

    $symb = file_get_contents("https://api.upbit.com/v1/market/all");
    // $symb = $_POST['symb'];
    $symb = json_decode($symb, true);
    for($i=0; $i<count($symb); $i++)
    {
        $name = explode("-", $symb[$i]['market']);
        if($name[0] === "KRW")
        {
            $sql2 = "select * from `krw_master` where english_name ='".$symb[$i]['english_name']."';";
            $result = $db->query($sql2);
            $tmp = $result->fetch_array(MYSQLI_ASSOC);
            if(!$tmp)
            {
                $sql = "INSERT INTO `krw_master`(symb, use_yn, korean_name, english_name) VALUES
                ('".$symb[$i]['market']."', '0', '".$symb[$i]['korean_name']."', '".$symb[$i]['english_name']."')";
                $db->query($sql);
            }
        }
    }

    $sql = "select * from `krw_master` where use_yn = '1';";
    $result = $db->query($sql);
    $arr = array();
    $return_arr = array();
	while($tmp = $result->fetch_array(MYSQLI_ASSOC))
    {
		$arr[] = $tmp;
	}
    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
    $return_arr['use'] = $arr;
    $sql = "select * from `krw_master`;";
    $result = $db->query($sql);
    $arr = array();
	while($tmp = $result->fetch_array(MYSQLI_ASSOC))
    {
		$arr[] = $tmp;
	}
    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
    $return_arr['all'] = $arr;
    $json = json_encode($return_arr, JSON_UNESCAPED_UNICODE);

    $result->free();
    mysqli_close($db);

    echo $json;


?>
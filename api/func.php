<?php
    function echo_r($var, $ishtml=1){
        if($ishtml){
            echo"<pre>\n";
            print_r($var);
            echo"</pre>\n";
        }
        else{
            return print_r($var, true);
        }
    }
?>
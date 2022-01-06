
var switch_button = 0;


function start_get_data ()
{
    if(switch_button === 0)
    {
        switch_button = 1;
        
        $.ajax({
            url : "./../api/get_symbol.php",
            type : "post"
        })
    }
    else
    {
        switch_button = 0;
    }
};
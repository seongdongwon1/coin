var check_list = [

];

var compare_list = [
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
    'twelve_thirteen'
];
var switch_man = 0;

$(document).ready(function ()
{
    var data_on_button = $('.data-get');
    data_on_button.on('click', function()
    {
        if(switch_man === 0)
        {
            //데이터 체크 (12시간 전 데이터 삭제)
            data_clean();
            //데이터 받기
            make_symb_master();
            data_on_button.html('데이터 받는 중');
            switch_man = 1;
        }
        else
        {
            //데이터 끄기
            data_on_button.html('데이터 받기');
            switch_man = 0;
        }
    })
    
});

function data_clean()
{
    $.ajax({
        url : "./../api/data_clean.php",
        type : "get",
        success : function (data)
        {
            console.log(data);
        }
    })
}

function make_symb_master()
{
    $.ajax({
        url : "./../api/symb_master.php",
        type : "GET",
        success : function (data)
        {
            data = JSON.parse(data);
            make_select_symb_area(data);
            make_use_symb_area(data);
        }
    })
}

function make_select_symb_area(data)
{
    var select_area = $('.select-symbol');
    var all_data = data['all'];
    var check_data = data['use'];
    for(var i=0; i<all_data.length; i++)
    {
        var str = 
            '<div class="items '+all_data[i]['english_name'].replace(/(\s*)/g, "")+'" data-symb="'+all_data[i]['symb']+'" data-check="'+all_data[i]['english_name'].replace(/(\s*)/g, "")+'">\
                '+all_data[i]['korean_name']+'\
            </div>\
            ';
        select_area.append(str);
    }

    for(var i=0; i<check_data.length; i++)
    {
        var symb = check_data[i]['english_name'].replace(/(\s*)/g, "");
        var key_symb = check_data[i]['symb'];
        $('.'+symb+'').addClass('check-active');
        //check_list.push([symb, key_symb]);
        check_list.push(key_symb);

    }
    $('.select-symbol .items').click(function ()
    {
        var check_bol = check_list.includes($(this).data('symb'));
        if(check_bol === true)
        {   
            if(check_list.length === 1)
            {
                alert('최소 한개는 해야함');
            }
            else
            {
                for(var j=0; j<check_list.length; j++) 
                {
                    if(check_list[j] === $(this).data('symb'))  
                    {
                        check_list.splice(j, 1);
                        j--;
                    }
                }
                $(this).removeClass('check-active');
                user_add_symbol();

                //data restart
            }
        }
        else
        {
            if(check_list.length === 8)
            {
                alert('시간 특성상 최대 8개까지만');
            }
            else
            {
                $(this).addClass('check-active');
                //check_list.push([$(this).data('check'), $(this).data('symb')]);
                check_list.push($(this).data('symb'));
                user_add_symbol();
                //data restart
            }
        }
    })
}

function make_use_symb_area(data)
{   
    var use_symb_area = $('.use-border');
    use_symb_area.empty();
    for(var i=0; i<data['use'].length; i++)
    {
        var str = 
            '<div class="items '+data['use'][i]['symb']+'">\
                <div class="top">\
                    <div class="name">\
                        '+data['use'][i]['korean_name']+'\
                    </div>\
                    <div class="exit">X</div>\
                </div>\
                <h4 class="line"></h4>\
                <div class="bottom">\
                    <table>\
                        <thead>\
                            <tr>\
                                <th>시간</th>\
                                <th>가격</th>\
                                <th>등락률</th>\
                            </tr>\
                        </thead>\
                    </table>\
                </div>\
            </div>';
        use_symb_area.append(str);
    }
    get_use_symb(data['use']);
    //make_use_symb_bottom_area();
}

function make_use_symb_bottom_area(data)
{
    //2022.01.16 여기서부터 이제 데이터 영역 꾸리면 됨.
    
    for(value in data)
    {
        for(var i=0; i<compare_list.length; i++)
        {
            console.log('count', data[value][i]);
        }
    }
}
function get_use_symb(use)
{
    $.ajax({
        url : './../api/get_use_symbol.php',
        type : 'get',
        data : {
            data : use
        },success : function (data)
        {
            data = JSON.parse(data);
            make_use_symb_bottom_area(data);
        }
    })
}

function user_add_symbol()
{
    var click_symb = check_list;
    $.ajax({
        url : './../api/user_add_symbol.php',
        type : "get",
        data : {
            data : click_symb
        },success : function (respon)
        {
            //console.log('respon', respon);
        }
    })
}













function makearea222()
{
    var midarea = $('.mid-area');
    for(var i=0; i<g_symb.length; i++)
    {
        var str = '<div class="items item-'+g_symb[i]['english_name']+'"></div>';
        midarea.append(str);
        var itemarea = $('.item-'+g_symb[i]['english_name']+'');
        var str = 
                '<div class="symb-info-area">\
                    <div class="name-area">\
                    '+g_symb[i]['korean_name']+'&nbsp<p>('+g_symb[i]['english_name']+')</p>\
                    </div>\
                    <div class="deletebtn">\
                        <div class="delete-icon"></div>\
                    </div>\
                </div>\
                    <div class="symb-value-area">\
                        <div class="period-area">\
                            <button type="button" value="1m" class="btn-action">1M</button> &nbsp \
                            <button type="button" value="3m">3M</button> &nbsp \
                            <button type="button" value="5m">5M</button> &nbsp \
                            <button type="button" value="10m">10M</button> &nbsp \
                            <button type="button" value="15m">15M</button> &nbsp \
                            <button type="button" value="30m">30M</button> &nbsp \
                            <button type="button" value="1h" >1H</button>\
                        </div>\
                        <div class="price-area">\
                            <table class="'+g_symb[i]['english_name']+'">\
                                <thead>\
                                    <tr>\
                                        <th>Date</th>\
                                        <th>price</th>\
                                        <th>~5</th>\
                                        <th>~10</th>\
                                        <th>~15</th>\
                                        <th>~20</th>\
                                        <th>~25</th>\
                                        <th>~30</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr>\
                                        <th>22 : 15</th>\
                                        <th class="content-bg">5452154</th>\
                                        <th>3%</th>\
                                        <th class="content-bg">-5%</th>\
                                        <th>7%</th>\
                                        <th class="content-bg">11%</th>\
                                        <th>-15%</th>\
                                        <th class="content-bg">30%</th>\
                                    </tr>\
                                    <tr>\
                                        <th>22 : 15</th>\
                                        <th class="content-bg">5452154</th>\
                                        <th>3%</th>\
                                        <th class="content-bg">-5%</th>\
                                        <th>7%</th>\
                                        <th class="content-bg">11%</th>\
                                        <th>-15%</th>\
                                        <th class="content-bg">30%</th>\
                                    </tr>\
                                    <tr>\
                                        <th>22 : 15</th>\
                                        <th class="content-bg">5452154</th>\
                                        <th>3%</th>\
                                        <th class="content-bg">-5%</th>\
                                        <th>7%</th>\
                                        <th class="content-bg">11%</th>\
                                        <th>-15%</th>\
                                        <th class="content-bg">30%</th>\
                                    </tr>\
                                    <tr>\
                                        <th>22 : 15</th>\
                                        <th class="content-bg">5452154</th>\
                                        <th>3%</th>\
                                        <th class="content-bg">-5%</th>\
                                        <th>7%</th>\
                                        <th class="content-bg">11%</th>\
                                        <th>-15%</th>\
                                        <th class="content-bg">30%</th>\
                                    </tr>\
                                    <tr>\
                                        <th>22 : 15</th>\
                                        <th class="content-bg">5452154</th>\
                                        <th>3%</th>\
                                        <th class="content-bg">-5%</th>\
                                        <th>7%</th>\
                                        <th class="content-bg">11%</th>\
                                        <th>-15%</th>\
                                        <th class="content-bg">30%</th>\
                                    </tr>\
                                </tbody>\
                            </table>\
                        </div>\
                    </div>';
        itemarea.append(str);
    }
    get_data_coin();
}

function call()
{
    const request = new XMLHttpRequest();
    const url = 'https://api.upbit.com/v1/market/all';    
    request.open("GET", url, false);
    request.send();
    $.ajax({
        url : "./../api/symb_master.php",
        type : "post",
        data : {
            symb : request.responseText,
        }
    }).done(function (data)
    {
        data = JSON.parse(data);
        g_symb = data;
        makearea();
    });
}

function get_data_coin()
{
    // const request = new XMLHttpRequest();
    // const url = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC';;
    
    // request.open("GET", url, false);
    // request.send();
    // $.ajax({
    //     url : "./../api/data_insert.php",
    //     type : "post",
    //     data : {
    //         symb_data : request.responseText,
    //     }
    // }).done(function (data)
    // {

    // });
    // var obj = JSON.parse(request.responseText);
    // console.log(obj);
    for(var i=0; i<g_symb.length; i++)
    {
        for(var j=0; j<g_time.length; j++)
        {
            const request = new XMLHttpRequest();
            const url = 'https://api.upbit.com/v1/candles/minutes/'+g_time[j]+'?market='+g_symb[i]['symb']+'&count=5';

            request.open("GET", url, false);
            request.send();
            var dd = JSON.parse(request.responseText);
            $.ajax({
                url : "./../api/data_insert.php",
                type : "post",
                data : {
                    symb_data : request.responseText,
                }
            })
        }
    }
}
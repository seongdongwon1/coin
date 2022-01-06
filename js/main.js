var check_list = [

]

$(document).ready(function ()
{
    make_symb_master();

});


function make_symb_master()
{
    $.ajax({
        url : "./../api/symb_master.php",
        type : "GET",
        success : function (data)
        {
            data = JSON.parse(data);
            make_select_symb_area(data);
        }
    })
}

function make_select_symb_area(data)
{
    console.log('dataa', data);
    var select_area = $('.select-symbol');
    var all_data = data['all'];
    var check_data = data['use'];
    for(var i=0; i<all_data.length; i++)
    {
        var str = 
            '<div class="items '+all_data[i]['english_name'].replace(/(\s*)/g, "")+'" data-check="'+all_data[i]['english_name'].replace(/(\s*)/g, "")+'">\
                '+all_data[i]['korean_name']+'\
            </div>\
            ';
        select_area.append(str);
    }

    for(var i=0; i<check_data.length; i++)
    {
        var symb = check_data[i]['english_name'].replace(/(\s*)/g, "");
        $('.'+symb+'').addClass('check-active');
        check_list.push(symb);
    }
    $('.select-symbol .items').click(function ()
    {
        var check_bol = check_list.includes($(this).data('check'));
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
                    if(check_list[j] === $(this).data('check'))  
                    {
                        check_list.splice(j, 1);
                        j--;
                    }
                }
                $(this).removeClass('check-active');
                //data restart
            }
        }
        else
        {
            if(check_list.length === 9)
            {
                alert('시간 특성상 최대 9개까지만');
            }
            else
            {
                $(this).addClass('check-active');
                check_list.push($(this).data('check'));
                //data restart
            }
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
    console.log('g_symb', g_symb);
    for(var i=0; i<g_symb.length; i++)
    {
        for(var j=0; j<g_time.length; j++)
        {
            const request = new XMLHttpRequest();
            const url = 'https://api.upbit.com/v1/candles/minutes/'+g_time[j]+'?market='+g_symb[i]['symb']+'&count=5';

            request.open("GET", url, false);
            request.send();
            var dd = JSON.parse(request.responseText);
            console.log('dd', dd);
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
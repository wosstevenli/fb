charset='UTF-8';
$.ajax({
    'url':'../login.php',
    'data':{"username":$('#userName').val(),"password":$('#password').val(),},
    'success':function(data){//success表示，当服务器返回数据成功后，该做什么，返回的数据储存在data中，我们直接把data传入函数中。
        switch(data.type){
            case 0:alert('账户不存在');break;
            case 1:{
                $('#userMsg').children('li').eq(2).find('span').html(' '+data.gouwuchenum+' ');
                $('#loginMsg li').eq(1).empty().html('<span>'+data.name+'</span>');
                $('#loginMsg li').eq(2).empty().html('<a href="javascript:tuichu()">退出</a>');
                $('.login').animate({right:-180,opacity:0},400,function(){
                    $(this).css('display','none');
                });
                break;
            }
            case 2:alert('密码错误');break;
        }
    },
    'type':'post',//ajax的方法，可以用post可以用get
    'dataType':'json',//传递的数据类型，这里用json。也可以是html/xml等
});

//success函数，表示前端收到数据成功后，要做什么
success=function(data){//这里的data储存有后端php返回的json数据
        switch(data.type){//以data.type为switch-case关键字，分类处理
            case 0:alert('账户不存在');break;//如果type=0，说明帐号密码都不匹配
            case 1:{//type=1，说明匹配成功，登录成功
                $('#userMsg').children('li').eq(2).find('span').html(' '+data.gouwuchenum+' ');//更新购物车数量
                $('#loginMsg li').eq(1).empty().html('<span>'+data.name+'</span>');//登录按钮更换为用户昵称；
                $('#loginMsg li').eq(2).empty().html('<a href="javascript:tuichu()">退出</a>');//注册按钮更换为退出按钮；
                $('.login').animate({right:-180,opacity:0},400,function(){//登录框隐藏
                    $(this).css('display','none');
                });
                break;
            }
            case 2:alert('密码错误');break;//type=2，表示用户存在但是密码不匹配
        }
    }
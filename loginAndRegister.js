/*======================================
    作者：王焱琛 
    时间：2023/12/05
    版本：0.1
    
————————————————————————————————————————    
    使用方法：
    本js需绑定jQuery使用

    ———+———+———+———+———+———+———+————
    flogin(账号，密码，url);
        后端返回登录数据；

        无返回值，其中账号、密码为所在
        name的名称，账号，密码，url均
        需要单引号；
    ————————————————————————————————
    fregister(账号，密码，url);
        后端返回注册数据；

        无返回值，其中账号、密码、url
        的使用方式均同上；
    ————————————————————————————————
    fcheck();
        获取返回值；

        返回值为{0,1,2,3,4,5,6}，须在
        flogin()和fregister()之后使用;

        return值意义:
            0:特殊异常
            1:登陆成功
            2:密码错误
            3:账号未注册
            4:账号已注册
            5:后端数据库异常
            6:注册成功
    ———+———+———+———+———+———+———+————
=======================================*/






const menu = [...document.querySelectorAll('nav')];
const aside = [...document.querySelectorAll('aside')];
menu.forEach((nav, n) => {
    nav.onclick = () => {
        aside.forEach((ele, a) => {
            ele.style.display = 'none';
            menu[a].classList.remove('active');
        });
        menu[n].classList.add('active');
        aside[n].style.display = 'block';
    }
});

var bcode;
function flogin(lu,lp,urll) {
    let userID = generateWebStorageID()
    let password = document.getElementById(lp).value;
    let username = document.getElementById(lu).value;
    $.ajax({
        type: "POST",
        url: "http://" + urll,
        data: { "code": 100, "userID": userID, "username": username, "password": password},
        dataType: "json",
        async:false, 
        success: function (data) {
            console.log(data);
            bcode = data;
        }
    });
}
function fregister(ru,rp,urll) {
    let userID = generateWebStorageID()
    let password = document.getElementById(rp).value;
    let username = document.getElementById(ru).value;
    $.ajax({
        type: "POST",
        url: "http://" + urll,
        data: { "code": 100, "userID": userID, "username": username, "password": password},
        dataType: "json",
        async:false,
        success: function (data) {
            console.log(data);
            bcode=data;
        }
    });
}

function fcheck(){
    if(bcode.code==700){
        return 1;
    }else if(bcode.code==609){
        return 2;
    }else if(bcode.code==605){
        return 3;
    }else if(bcode.code==606){
        return 4;
    }else if(bcode.code==607){
        return 5;
    }else if(bcode.code==608){
        return 6;
    }else{
        return 0;
    }
}

function generateWebStorageID() {
    let storageID = localStorage.getItem('WebStorageID');

    if (!storageID) {
        storageID = generateUUID();
        localStorage.setItem('WebStorageID', storageID);
    }

    return storageID;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
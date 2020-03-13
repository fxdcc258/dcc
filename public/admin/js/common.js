$(function () {

    //修复页面一刷新出现在padding动画 因为给body设置的过渡到是body出现padding的时候出现了动画效果
    //解决办法等到页面加载完成执行js的时候在加上过渡动画

    $('body').attr('transition', 'padding .6s')

    //ajax进度条
    //监听第一个ajax请求
    $(document).ajaxStart(function () {
        //进度条开始移动
        NProgress.start();
    })

    //监听最后一个ajax请求发送完成
    $(document).ajaxStop(function () {
        //进度条直接结束
        NProgress.done();

    })
    // 配置禁用小圆环
    NProgress.configure({ showSpinner: false });

    //点击显示隐藏二级菜单

    $('.flei').click(function () {
        $('.in').stop().slideToggle();
    })

    //点击显示隐藏侧边栏
    $('.move').click(function (e) {
        //阻止a标签的默认行为
        e.preventDefault();
        // console.log(1);

        $('.aside').toggleClass('t_left');
        $('.lt-header,.lt-main').toggleClass('pl_180');
    })

    //点击退出按钮返回登录界面
    $('.btn-ok').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (res) {
                res.success && (location.href = 'http://localhost:3000/admin/login.html')
            }
        })
    })
})
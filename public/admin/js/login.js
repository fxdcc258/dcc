//入口函数
$(function () {
    //调用bootstrap-validator插件 表单校验插件 依赖于bootstrap使用的都市bs风格的样式
    //使用表单校检插件
    $('.form-login').bootstrapValidator({
        //默认值 不设置默认就是指定这个属性的表单元素不进行校验
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        // feedbackIcons这个属性指定校检的图标显示默认是bt风格
        feedbackIcons: {
            //成功时显示的图片
            valid: 'glyphicon glyphicon-ok-circle',
            //失败时显示的图片
            invalid: 'glyphicon glyphicon-remove-circle',
            //确认是显示的图片 都是bootstrap的字体图标 鼠标点击确认时候显示
            validating: 'glyphicon glyphicon-refresh'
        },

        //指定校检的字段(数据)
        fields: {
            //校检用户名
            username: {
                //指定校检的方式
                validators: {
                    //非空校检
                    notEmpty: {
                        //如果用户名为空提示的数据
                        message: '用户名不能为空'
                    },

                    //长度检验
                    stringLength: {
                        //最小长度
                        min: 3,
                        max: 6,
                        //校检不通过提示的数据
                        message: '用户名长度必须在3--6之间'
                    },
                    //添加提示信息 每个校检只能添加一次
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            //校检密码
            password: {
                //指定校检的方式
                validators: {
                    //非空校检
                    notEmpty: {
                        //如果用户名为空提示的数据
                        message: '密码不能为空'
                    },

                    //长度检验
                    stringLength: {
                        //最小长度
                        min: 6,
                        max: 12,
                        //校检不通过提示的数据
                        message: '密码长度必须在6--12之间'
                    },
                    //添加提示信息 每个校检只能添加一次
                    callback: {
                        message: '密码错误!'
                    }
                }
            }
        }
    })



    //重置功能
    //点击重置按钮恢复默认样式
    $('.btn-reset').click(function () {
        //bootstrapValidator提供了重置表单的功能但使用之前需要先获取表单校检实例
        //固定语法 $(表单).data('bootstrapValidator')返回的结果就是表单校检实例
        // $(表单).data('bootstrapValidator').resetFrom()可以重置表单的样式隐藏所有的提示和图标
        $('.form-login').data('bootstrapValidator').resetForm()
    })




    //登录跳转功能
    //bootstrapValidator提供了一个事件当表单校检成功执行的时间success.form.bv
    //语法$(表单).on('success.form.bv',fun)
    $('.form-login').on('success.form.bv', function (e) {
        //提交按钮有默认行为需要进行阻止
        e.preventDefault();

        //使用ajax提交数据和后台进行交互
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            dataType: 'json',
            data: $('.form-login').serialize(),
            success: function (res) {
                console.log(res);

                // if (res.success) {
                //     location.href = '../index.html'
                // }
                //后台响应结果为成功
                res.success && (location.href = 'http://localhost:3000/admin/index.html');

                //后台响应结果失败
                // 插件提供了 updateStatus(), 可以用于改变表单状态 
                //使用updateStatus(field, status, validatorName)方法更新字段的状态
                //获取实例
                //  updateStatus(数据name属性, 状态，提示信息)
                //第一个参数
                //第二个参数状态
                // - INVALID ：校验失败的
                // - VALID：校验成功的
                // 第三个参数 validatorName 提示的数据  但是必须从已有的提示信息中选取  $('.form-login').bootstrapValidator()从这个 fields:中选取数据
                res.error == 1000 && $('.form-login').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                res.error == 1001 && $('.form-login').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
            }
        })
    })


})
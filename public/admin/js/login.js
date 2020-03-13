//入口函数
$(function () {
    //使用表单校验插件
    $('.form-login').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            //c成功时
            valid: 'glyphicon glyphicon-ok',
            // 失败时
            invalid: 'glyphicon glyphicon-remove',
            //确认时
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    callback: {
                        message: '用户名不存在!'
                    }
                }
            },



            //校验密码，对应passwrod表单的name属性
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码错误!'
                    }
                }

            }

        }


    })




    //表单重置
    $('.btn-reset').click(function (e) {
        // 当我们初始化好表单校验插件时，我们可以通过以下方法来获取表单校验的validator实例，通过validator实例调用一些方法来完成某些功能。
        // var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
        //恢复表单默认样式 去掉提示信息与图标
        $(".form-login").data('bootstrapValidator').resetForm();
    })


    //登录按钮
    // 注册表单验证成功事件 插件提供的一个方法表单验证成功时触发该事件
    // 语法 $("#form").on('success.form.bv',fun)
    $(".form-login").on('success.form.bv', function (e) {
        // console.log(1);
        //会刷新页面

        //阻止提交按钮的默认行为 
        e.preventDefault();
        //调用ajax与后台交互
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('.form-login').serialize(),
            dataType: 'json',
            success: function (res) {
                console.log(res);
                res.success && (location.href = 'http://localhost:3000/admin/index.html')
            }
        })
    })
})
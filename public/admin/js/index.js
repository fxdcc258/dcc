$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option1 = {
        //标题
        title: {
            text: '注册人数'
        },
        //提示框
        tooltip: {},
        //图例
        legend: {
            //图例的data要和下面的name属性对应  名字必须一样
            data: ['人数', '购买者']
        },
        //x轴显示数据
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        //y轴根据下面的数据自动生成
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar', //图表类型 bar柱状图 line线形图 pie饼图
            data: [1010, 2220, 3100, 790, 1230, 600]
        },
        {
            name: '购买者',
            type: 'bar', //图表类型 bar柱状图 line线形图 pie饼图
            data: [110, 220, 300, 79, 130, 60]
        }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    //第二个图表
    var myChart2 = echarts.init(document.getElementById('main1'));

    var option2 = {
        title: {
            text: '总销售份额',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '匡威', 'Air', '李宁', '阿迪达斯']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '匡威' },
                    { value: 234, name: 'Air' },
                    { value: 135, name: '李宁' },
                    { value: 1548, name: '阿迪达斯' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);





})
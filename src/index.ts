let echarts = require('echarts');
import data from "./data/data"
import ReconfigurateDataForChart from "./scripts/dataProcessing/reconfigurateDataClass"
import { InputData } from "./types/dataTypes"
import './styles/style.scss'
import tooltipFormatterString from "./scripts/chartConfig/tooltipFormatterStringFunction";
import { categories } from "./data/additionalData";
import { LabelFormatterParam, LegendSelectChangedParam } from "./types/paramTypes";

const dataForChart = new ReconfigurateDataForChart(data as InputData);

const myChart = echarts.init(document.getElementById('main'));

const bottomInChart = Symbol('show bottom in program chart');
const bottomOutChart = Symbol('show bottom out program chart');

const option = {
    legend: {
        show: true,
        orient: 'horizontal',
        bottom: 0,
        data: categories,
        icon: 'circle',
    },
    tooltip: {
        trigger: "axis",
        position: "inside",
        axisPointer: {
            shadowStyle: {
                color: "#000",
                shadowBlur: 0,
                opacity: 0.07
            },
            type: "shadow"
        },
        textStyle: {
            fontFamily: "Inter"
        },
        extraCssText: "padding: 8px 15px; font-size: 13px; color: #002033; font-size: 12px;",
        formatter: tooltipFormatterString,
    },
    xAxis: {
        data: dataForChart.periodsList,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true
        },


    },
    series: [
        {
            type: 'bar',
            data: dataForChart.data["В программе ИТ"],
            stack: 'В программе',
            color: '#56B9F2',
            name: "В программе ИТ",
            label: {
                normal: {
                    show: false,
                    position: 'top',
                }
            },
            [bottomInChart]: true
        },
        {
            type: 'bar',
            data: dataForChart.data["В программе ЦП"],
            stack: 'В программе',
            color: "#0078D2",
            name: "В программе ЦП",
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: (params: LabelFormatterParam) => {
                        if (option.series[0][bottomInChart]) {
                            return params.data + dataForChart.data['В программе ИТ'][params.dataIndex];
                        }
                        return params.data;
                    }
                }
            }
        },
        {
            type: 'bar',
            data: dataForChart.data["Вне программ ИТ"],
            stack: 'Вне программ',
            color: '#22C18C',
            name: "Вне программ ИТ",
            label: {
                normal: {
                    show: false,
                    position: 'top',
                }
            },
            [bottomOutChart]: true
        },
        {
            type: 'bar',
            data: dataForChart.data["Вне программ ЦП"],
            stack: 'Вне программ',
            color: '#00724C',
            name: "Вне программ ЦП",
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: (params: LabelFormatterParam) => {
                        if (option.series[2][bottomOutChart]) {
                            return params.data + dataForChart.data['Вне программ ИТ'][params.dataIndex];
                        }
                        return params.data;
                    }
                }
            }
        },
    ]
};


myChart.setOption(option);

myChart.on('legendselectchanged', function (params: LegendSelectChangedParam) {
    if (params.name === "В программе ЦП") {
        if (params.selected['В программе ЦП']) {
            option.series[0].label.normal.show = false;
            option.series[1].label.normal.show = true;
        } else {
            option.series[0].label.normal.show = true;
        }
    } else if (params.name === "В программе ИТ") {
        if (params.selected['В программе ЦП']) {
            option.series[1].label.normal.show = true;
            option.series[0].label.normal.show = false;
        } else {
            option.series[0].label.normal.show = true;
        }

        option.series[0][bottomInChart] = params.selected['В программе ИТ'];


    } else if (params.name === "Вне программ ЦП") {
        if (params.selected['Вне программ ЦП']) {
            option.series[2].label.normal.show = false;
            option.series[3].label.normal.show = true;
        } else {
            option.series[2].label.normal.show = true;
        }
    } else {
        if (params.selected['Вне программ ЦП']) {
            option.series[3].label.normal.show = true;
            option.series[2].label.normal.show = false;
        } else {
            option.series[2].label.normal.show = true;
        }

        option.series[2][bottomOutChart] = params.selected['Вне программ ИТ'];
    }

    myChart.setOption(option);
})
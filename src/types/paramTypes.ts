export interface FormatterParam {
    value: number;
    axisValue: string;
    marker: string;
    seriesName: string;
}

export interface LabelFormatterParam {
    data: number;
    componentIndex: number;
    dataIndex: number;
}

export interface LegendSelectChangedParam {
    name: "В программе ИТ" | "В программе ЦП" | "Вне программ ИТ" | "Вне программ ЦП";
    selected: {
        "В программе ИТ": boolean;
        "В программе ЦП": boolean;
        "Вне программ ИТ": boolean;
        "Вне программ ЦП": boolean;
    };
}
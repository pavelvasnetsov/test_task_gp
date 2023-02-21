export type Period =
    "Январь" |
    "Февраль" |
    "Март" |
    "Апрель" |
    "Май" |
    "Июнь" |
    "Июль" |
    "Август" |
    "Сентябрь" |
    "Октябрь" |
    "Ноябрь" |
    "Декабрь";

export type Categories =
    "В программе ЦП" |
    "В программе ИТ" |
    "Вне программ ЦП" |
    "Вне программ ИТ";

export interface InputDataObject {
    period: Period;
    name: Categories;
    value: number;
}

export type InputData = InputDataObject[];

export interface ValueDict {
    [category: string]: number;
}

export interface DataByCategoryForChart {
    [category: string]: number[];
}





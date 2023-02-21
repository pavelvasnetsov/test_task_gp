import { categories, monthsByNumbers, numbersByMonths } from "../../data/additionalData";
import { Categories, DataByCategoryForChart, InputData, InputDataObject, Period, ValueDict } from "../../types/dataTypes";
// В итоге получаем объект с массивом месяцев (periods) и массивы данных по категориям
// Если будут пропущенные данные, то они будут добавлены с value = 0 (в примере пропущенных данных нет, но можно убрать любой объект из data.js и проект не сломается)
// Работает с любым порядком входных данных

export default class ReconfigurateDataForChart {
    private categories: Set<Categories>;
    private sortedByMonthData: Map<Period, ValueDict>;
    public periodsList: Period[];
    public data: DataByCategoryForChart;

    constructor(inputData: InputData) {
        this.sortedByMonthData = this.returnsSortedDataByMonthFromInputData(inputData);
        this.categories = new Set(categories); // Возможные категории задаются отдельно
        this.fillGapsInData();
        this.periodsList = this.returnsСorrectlySortedListOfPeriods(numbersByMonths, monthsByNumbers); // Возможные периоды и их порядок также задаются отдельно
        this.data = this.fillDataForChart();
    }

    private returnsSortedDataByMonthFromInputData(data: InputData): Map<Period, ValueDict> {
        const outputMap: Map<Period, ValueDict> = new Map();
        data.forEach(({ period, name, value }: InputDataObject) => {
            if (outputMap.has(period)) {
                outputMap.set(period, {
                    ...outputMap.get(period),
                    [name]: value
                })
            } else {
                outputMap.set(period, {
                    [name]: value
                })
            }
        })

        return outputMap;
    }

    private returnsСorrectlySortedListOfPeriods(numbersByPeriods: Map<Period, number>, periodsByNumbers: Map<number, Period>): Period[] {
        const periodList: Period[] = Array.from(this.sortedByMonthData.keys());

        return periodList.map((period: Period): number => numbersByPeriods.get(period))
            .sort((n1: number, n2: number): number => n1 - n2)
            .map((num: number): Period => periodsByNumbers.get(num));
    }

    private fillGapsInData(): void {
        for (let values of this.sortedByMonthData.values()) {
            for (let category of this.categories.values()) {
                if (!(values.hasOwnProperty(category))) {
                    values[category] = 0;
                }
            }
        }
    }

    private fillDataForChart(): DataByCategoryForChart {
        const output: DataByCategoryForChart = {};
        for (let category of categories) {
            output[category] = [];
        }

        this.periodsList.forEach((period: Period) => {
            const values = this.sortedByMonthData.get(period);
            for (let key in values) {
                output[key].push(values[key]);
            }
        })

        return output;
    }

}
import { FormatterParam } from "../../types/paramTypes";

export default function tooltipFormatterString(params: FormatterParam[]): string {
    let allThings: number = 0;
    let inProgramThings: number = 0;
    let outProgramThings: number = 0;
    let inProgram: FormatterParam[] = [];
    let outProgram: FormatterParam[] = [];


    params.forEach((param: FormatterParam) => {
        allThings += param.value;
        if (param.seriesName.includes('В программе')) {
            inProgramThings += param.value;
            inProgram.push(param);
        } else {
            outProgramThings += param.value;
            outProgram.push(param);
        }
    });

    if (!params.length) {
        return ``;
    }

    let outputString = `
        <div class="bold">
            ${params[0].axisValue} 
        </div>
    `;

    if (inProgram.length) {
        outputString =
            outputString +
            `<div class="bold flex">
                <div style="padding-right: 15px;">
                    В программе
                </div> 
                <div>
                    ${Math.round(inProgramThings / allThings * 100)}% | ${inProgramThings} шт.
                </div>
            </div>`;
        for (let param of inProgram) {
            outputString =
                outputString +
                `<div class="flex">
                    <div>
                        ${param.marker} ${param.seriesName}
                    </div> 
                    <div class="bold">
                        ${param.value} шт.
                    </div>
                </div>`;
        }
    }

    if (outProgram.length) {
        outputString =
            outputString +
            `<div class="bold flex">
                <div style="padding-right: 15px;">
                    Вне программы
                </div> 
                <div>
                    ${Math.round(outProgramThings / allThings * 100)}% | ${outProgramThings} шт.
                </div>
            </div>`
        for (let param of outProgram) {
            outputString =
                outputString +
                `<div class="flex">
                    <div>
                        ${param.marker} ${param.seriesName}
                    </div> 
                    <div class="bold">
                        ${param.value} шт.
                    </div>
                </div>`
        }
    }

    return outputString;
}
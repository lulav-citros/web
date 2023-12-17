import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import { useState, useEffect, useRef } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type RealTimeChartData = {
    milliseconds?: number;
    type?:
        | 'area'
        | 'line'
        | 'donut'
        | 'pie'
        | 'bar'
        // | 'histogram'
        | 'radialBar'
        | 'scatter'
        | 'bubble'
        | 'heatmap'
        | 'polarArea';

    options?: ApexOptions;
    chart: {
        colors?: string[];
        series?: {
            name?: string;
            data: number[];
        }[];
        initialData?: {
            name?: string;
            data: number[];
        }[];
    };
};

export default function RealTimeChart({ chart, type, options, milliseconds = 1000 }: RealTimeChartData) {
    const { series, initialData } = chart;

    const [chartData, setChartData] = useState({
        series: initialData
            ? initialData.map((serie, index) => ({
                  name: initialData[index].name,
                  data: initialData[index].data,
              }))
            : [],
    });

    useEffect(() => {
        const generateData = async () => {
            if (series) {
                const newSeries = series.map((serie, index) => {
                    const newData = [...chartData.series[index].data.slice(1), serie.data[0]];
                    serie.data.shift();
                    return {
                        ...chartData.series[index],
                        data: newData,
                    };
                });

                setChartData((prevChartData) => ({
                    ...prevChartData,
                    series: newSeries,
                }));
            }
        };
        const generateDataPieDonut = async () => {
            if (series) {
                const newData = series && series[0] && series[0].data;

                series.shift();

                setChartData({
                    series: [{ name: '', data: newData }],
                });
            }
        };

        // Запускаем таймер, который будет обновлять данные каждую секунду
        const timer = setInterval(() => {
            if (type === 'area' || type === 'line' || type === 'bar') {
                generateData();
            } else {
                generateDataPieDonut();
            }
        }, milliseconds);

        return () => clearInterval(timer);
    }, [chartData, series, type, milliseconds]);

    return (
        <div>
            {type === 'area' || type === 'line' || type === 'bar' ? (
                <Chart type={type} series={chartData.series} options={options} height={364} />
            ) : (
                <Chart type={type} series={chartData.series[0].data} options={options} height={364} />
            )}
        </div>
    );
}

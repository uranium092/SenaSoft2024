import React, { useEffect, useRef, useState } from 'react';
import NavAd from './NavAdmin';
import { CChartPie } from '@coreui/react-chartjs';

interface DataChart {
  data: number[];
  months: string[];
  colors: string[];
}

type DicItem = {
  month: string;
  color: string;
};

type BodyItem = {
  _id: string;
  total: number;
};

const ChartBikes: React.FC = () => {
  const [dataChart, setDataChart] = useState<DataChart>({
    data: [],
    months: [],
    colors: [],
  });
  const dic = useRef<Record<number, DicItem>>({
    1: { month: 'Enero', color: '#FF6666' },
    2: { month: 'Febrero', color: '#FFB266' },
    3: { month: 'Marzo', color: '#FFFF66' },
    4: { month: 'Abril', color: '#B2FF66' },
    5: { month: 'Mayo', color: '#66FF66' },
    6: { month: 'Junio', color: '#66FFB2' },
    7: { month: 'Julio', color: '#66FFFF' },
    8: { month: 'Agosto', color: '#66B2FF' },
    9: { month: 'Septiembre', color: '#6666FF' },
    10: { month: 'Octubre', color: '#B266FF' },
    11: { month: 'Noviembre', color: '#FF66FF' },
    12: { month: 'Diciembre', color: '#C0C0C0' },
  });
  useEffect(() => {
    const getDataChart = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/admin/dataChart');
        const body: BodyItem[] = await response.json();
        const parsedData = body.reduce((accumulator, currentValue) => {
          const item = dic.current[currentValue._id];
          return {
            data: [...accumulator.data, currentValue.total],
            months: [...accumulator.months, item.month],
            colors: [...accumulator.colors, item.color],
          };
        }, dataChart);
        setDataChart(parsedData);
      } catch (e) {
        setDataChart({ data: [], months: [], colors: [] });
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    getDataChart();
  }, []);
  return (
    <>
      <NavAd initialValue="reportes"></NavAd>
      <div style={{ display: 'flex', justifyContent: 'center' }} className="my-4">
        <CChartPie
          style={{ height: '60vh' }}
          data={{
            labels: dataChart.months,
            datasets: [
              {
                data: dataChart.data,
                backgroundColor: dataChart.colors,
                hoverBackgroundColor: dataChart.colors,
              },
            ],
          }}
        ></CChartPie>
      </div>
    </>
  );
};

export default ChartBikes;

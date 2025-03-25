import React from 'react';
import DataServiceFree from './DataServiceFree';
import DataServiceCiclo from './DataServiceCiclo';

interface propsData {
  data: string;
}

const DataService: React.FC<propsData> = ({ data }) => {
  return (
    data != '---' &&
    (JSON.parse(data).dataReserved.type == 'free' ? (
      <DataServiceFree data={data} />
    ) : (
      <DataServiceCiclo data={data}></DataServiceCiclo>
    ))
  );
};

export default DataService;

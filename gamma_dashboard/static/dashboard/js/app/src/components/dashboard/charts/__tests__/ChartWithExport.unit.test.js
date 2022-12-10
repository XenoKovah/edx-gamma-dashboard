import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import ChartWithExport from '../ChartWithExport';
import _Highcharts from 'highcharts';
import applyDebugger from 'highcharts/modules/debugger';


afterEach(cleanup);


describe('<ChartWithExport>', () => {
    it('renders', () => {
        const { getByText } = render(<ChartWithExport options={{}} />);

        expect(getByText(/chart title/i)).toBeInTheDocument();
    });
    
    it('calls applyDebugger if debug is true', () => {
        // const debug = true;
        // const returns = jest.fn(applyDebugger(_Highcharts));
        // const fn = axios.get.mockResolvedValue({ data: {_Highcharts} });
        
        
        // const spy = jest.spyOn(ChartWithExport, 'applyDebugger');
        // render(<ChartWithExport debug={debug} />);
        // const isPlaying = video.play();
      
        // expect(spy).toHaveBeenCalled();

        // expect(returns).toHaveBeenCalled();
    });
});

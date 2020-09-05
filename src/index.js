'use babel';

import ChartComponent from './chart';
import { markdownRenderer } from 'inkdrop';

module.exports = {
  activate() {
    markdownRenderer.remarkCodeComponents['chart'] = ChartComponent;
  },
};

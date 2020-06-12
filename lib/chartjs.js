'use babel';

import ChartjsMessageDialog from './chartjs-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(ChartjsMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'ChartjsMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'ChartjsMessageDialog'
    )
    inkdrop.components.deleteClass(ChartjsMessageDialog);
  }

};

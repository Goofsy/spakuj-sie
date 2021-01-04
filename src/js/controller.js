import 'core-js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './View.js';

const controlInitForm = async function () {
  const formData = View.getInitFormData();
  model.createBackpackData(formData.title, formData.cap);
  View.renderBackpack(model.state.backpackData);
};

const init = function () {
  View.addHandlerInitForm(controlInitForm);
};
init();

import 'core-js';
// import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './View.js';

const controlDeleteItem = async function (id) {
  model.deleteItemFromBackpack(id);
  model.updateBackpackData();
  View.renderBackpack(model.state.backpackData);
};

const controlAddItem = async function (data) {
  model.addItemToBackpack(data);
  View.renderBackpackList(model.state.backpackList);
  model.updateBackpackData();
  View.renderBackpack(model.state.backpackData);
};

const controlInitForm = async function ({ title, cap }) {
  model.createBackpackData(title, cap);
  View.renderBackpack(model.state.backpackData);
};

const init = function () {
  View.addHandlerInitForm(controlInitForm);
  View.addHandlerBackpackForm(controlAddItem);
  View.addHandlerDeleteItem(controlDeleteItem);
};
init();

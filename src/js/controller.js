import 'core-js';
// import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './View.js';

const controlCalc = function ([a, b, c]) {
  return model.calcCap(a, b, c);
};

const controlEditItem = function (itemName, itemCap, itemId) {
  model.editItem(itemName, itemCap, itemId);
  renderandUpdate();
};

const controlDeleteItem = function (id) {
  model.deleteItem(id);
  renderandUpdate();
};

const controlAddItem = function (data) {
  model.addItem(data);
  renderandUpdate();
};

const controlInitForm = function ({ title, cap }) {
  model.createBackpack(title, cap);
  View.renderBackpack(model.state.backpackData);
};

const renderandUpdate = function () {
  model.updateBackpack();
  View.renderBackpackList(model.state.backpackList);
  View.renderBackpack(model.state.backpackData);
};

const init = function () {
  View.addHandlerInitForm(controlInitForm);
  View.addHandlerBackpackForm(controlAddItem);
  View.addHandlerDeleteItem(controlDeleteItem);
  View.addHandlerEditItem(controlEditItem);
  View.addHandlerCalc(controlCalc);
};
init();

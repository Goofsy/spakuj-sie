import 'core-js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './View.js';

const controlCalc = function (data) {
  return model.calcCap(data);
};

const controlEditItem = function (itemName, itemCap, itemId) {
  model.editItem(itemName, itemCap, itemId);
  renderAndUpdate();
};

const controlDeleteItem = function (id) {
  model.deleteItem(id);
  renderAndUpdate();
};

const controlAddItem = function (data) {
  model.addItem(data);
  renderAndUpdate();
};

const controlInitForm = function ({ title, cap }) {
  try {
    model.createBackpack(title, cap);
    View.hideInitFormAndShowContent();
    View.renderBackpack(model.state.backpackData);
  } catch (err) {
    View.renderError(err);
  }
};

const renderAndUpdate = function () {
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

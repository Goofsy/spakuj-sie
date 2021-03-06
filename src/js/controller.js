import 'core-js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import View from './View.js';

const controlCalc = function (data) {
  try {
    const calcResult = model.calcCap(data);
    View.clearCalcform();
    View.closeCalc();
    View.renderCalcResult(calcResult);
  } catch (err) {
    View.renderError(err);
  }
};

const controlEditItem = function (itemName, itemCap, itemId) {
  try {
    model.editItem(itemName, itemCap, itemId);
    renderAndUpdate();
    View.closeEditForm();
  } catch (err) {
    View.renderError(err);
  }
};

const controlDeleteItem = function (id) {
  model.deleteItem(id);
  renderAndUpdate();
};

const controlAddItem = function ({ itemName, itemCap }) {
  try {
    model.addItem(itemName, itemCap);
    renderAndUpdate();
    View.clearBackpackForm();
  } catch (err) {
    View.renderError(err);
  }
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

// Init
(function () {
  View.addHandlerInitForm(controlInitForm);
  View.addHandlerBackpackForm(controlAddItem);
  View.addHandlerDeleteItem(controlDeleteItem);
  View.addHandlerEditItem(controlEditItem);
  View.addHandlerCalc(controlCalc);
})();

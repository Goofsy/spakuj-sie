import { fill } from 'core-js/fn/array';

class View {
  _initialForm = document.querySelector('.initial-form');
  _btnInitForm = document.querySelector('.btn--init');
  _inputWhereInitForm = document.querySelector('.input--where');
  _inputSizeInitForm = document.querySelector('.input--size');

  _backpackContent = document.querySelector('.content');
  _backpackTitle = document.querySelector('.backpack__title');
  _backpackCap = document.querySelector('.backpack__capacity');
  _backpackImgOverlay = document.querySelector('.backpack__img--overlay');
  constructor() {}

  // Init Form
  _hideInitFormShowContent() {
    this._initialForm.classList.toggle('hidden');
    this._backpackContent.classList.toggle('hidden');
  }

  renderBackpack({ title, cap, filledL, filledPercentage }) {
    this._backpackTitle.innerHTML = title;
    this._backpackCap.innerHTML = `${filledL}/${cap}L`;
    this._backpackImgOverlay.style.background = `linear-gradient(
      360deg,
      #3498db 0%,
      #3498db ${filledPercentage}%,
      white ${filledPercentage}%,
      white 100%
    )`;
  }

  getInitFormData() {
    return {
      title: this._inputWhereInitForm.value,
      cap: this._inputSizeInitForm.value,
    };
  }

  addHandlerInitForm(handler) {
    this._btnInitForm.addEventListener('click', e => {
      e.preventDefault();
      this._hideInitFormShowContent();
      handler();
    });
  }
}

export default new View();

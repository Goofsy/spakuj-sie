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
  _backpackInputItem = document.querySelector('.input--item');
  _backpackInputItemCap = document.querySelector('.input--item-cap');
  _backpackFormBtn = document.querySelector('.btn--confirm');
  _backpackList = document.querySelector('.list');
  constructor() {}

  // Backpack List
  addHandlerDeleteItem(handler) {
    this._backpackList.addEventListener('click', e => {
      if (!e.target.closest('.btn--list--delete')) return;
      const listItem = e.target.closest('.list__item');
      const id = listItem.dataset.id;
      listItem.remove();
      handler(id);
    });
  }

  _clearBackpackList() {
    this._backpackList.innerHTML = '';
  }

  _createMarkup({ itemName, itemCap, id }) {
    return `
      <li class="list__item" data-id="${id}">
        <p>${itemName}</p>
        <div class="buttons">
          <button class="btn--list btn--list--edit" title="Edytuj">
            <i class="far fa-edit fa-lg"></i>
          </button>
          <button class="btn--list btn--list--delete" title="Usuń">
            <i class="far fa-trash-alt fa-lg"></i>
          </button>
        </div>
        <p>${itemCap}L</p>
      </li>
    `;
  }

  renderBackpackList(list) {
    this._clearBackpackList();
    list.forEach(item => {
      this._backpackList.insertAdjacentHTML(
        'beforeend',
        this._createMarkup(item)
      );
    });
  }

  _clearBackpackForm() {
    this._backpackInputItem.value = '';
    this._backpackInputItemCap.value = '';
  }

  _getBackpackFormData() {
    return {
      itemName: this._backpackInputItem.value,
      itemCap: this._backpackInputItemCap.value,
    };
  }

  addHandlerBackpackForm(handler) {
    this._backpackFormBtn.addEventListener('click', e => {
      e.preventDefault();
      handler(this._getBackpackFormData());
      this._clearBackpackForm();
      this._backpackInputItem.focus();
    });
  }

  renderBackpack({ title, cap, filledCap, filledPercentage }) {
    this._backpackTitle.innerHTML = title;
    this._backpackCap.innerHTML = `${filledCap}/${cap}L`;
    this._backpackImgOverlay.style.background = `linear-gradient(
      360deg,
      #3498db 0%,
      #3498db ${filledPercentage}%,
      white ${filledPercentage}%,
      white 100%
    )`;
  }

  // Init Form
  _hideInitFormAndShowContent() {
    this._initialForm.classList.toggle('hidden');
    this._backpackContent.classList.toggle('hidden');
  }

  _getInitFormData() {
    return {
      title: this._inputWhereInitForm.value,
      cap: this._inputSizeInitForm.value,
    };
  }

  addHandlerInitForm(handler) {
    this._btnInitForm.addEventListener('click', e => {
      e.preventDefault();
      handler(this._getInitFormData());
      this._hideInitFormAndShowContent();
    });
  }
}

export default new View();

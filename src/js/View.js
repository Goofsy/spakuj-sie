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

  constructor() {
    this._handlerOpenEditForm();
    this._handlerCloseEditForm();
  }

  addHandlerEditItem(handler) {
    this._backpackList.addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.closest('.btn--edit--confirm')) return;
      const form = e.target.closest('.form--edit-item');
      const itemName = form.querySelector('.input--edit--item').value;
      const itemCap = form.querySelector('.input--edit--cap').value;
      const itemId = form.dataset.id;
      handler(itemName, itemCap, itemId);
      this._closeEditForm();
    });
  }

  _closeEditForm() {
    document.querySelectorAll('.item').forEach(e => {
      e.style.display = 'flex';
    });
    if (document.querySelector('.form--edit-item')) {
      document.querySelector('.form--edit-item').remove();
    }
  }

  _handlerCloseEditForm() {
    this._backpackList.addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.closest('.btn--edit--cancel')) return;
      this._closeEditForm();
    });
  }

  _createEditForm(itemName, itemCap, itemId) {
    return `
      <form class="form form--edit-item" autocomplete="off" novalidate data-id=${itemId}>
        <div class="form__group">
          <input
            type="text"
            class="input input--edit input--edit--item"
            value="${itemName}"
          />
        </div>
        <div class="form__group">
          <input
            type="number"
            class="input input--edit input--edit--cap"
            value="${itemCap}"
          />
        </div>
        <div class="buttons">
          <button class="btn--edit btn--edit--confirm"><i class="arrow arrow--right"></i></p></button>
         <button class="btn--edit btn--edit--cancel">x</button>
        </div>
      </form>
    `;
  }

  _handlerOpenEditForm() {
    this._backpackList.addEventListener('click', e => {
      if (!e.target.closest('.btn--list--edit')) return;
      this._closeEditForm();
      const listItem = e.target.closest('.list__item');
      const itemName = listItem.querySelector('.item-name').innerHTML;
      const itemId = listItem.dataset.id;
      const itemCap = listItem
        .querySelector('.item-cap')
        .innerHTML.slice(0, -1);
      listItem.insertAdjacentHTML(
        'beforeend',
        this._createEditForm(itemName, itemCap, itemId)
      );
      listItem.querySelector('.item').style.display = 'none';
    });
  }

  addHandlerDeleteItem(handler) {
    this._backpackList.addEventListener('click', e => {
      if (!e.target.closest('.btn--list--delete')) return;
      const listItem = e.target.closest('.list__item');
      const id = listItem.dataset.id;
      handler(id);
    });
  }

  _clearBackpackList() {
    this._backpackList.innerHTML = '';
  }

  _createItem({ itemName, itemCap, id }) {
    return `
      <li class="list__item" data-id="${id}">
        <div class="item">
          <p class="item-name">${itemName}</p>
          <div class="buttons">
            <button class="btn--list btn--list--edit" title="Edytuj">
              <i class="far fa-edit fa-lg"></i>
            </button>
            <button class="btn--list btn--list--delete" title="Usuń">
              <i class="far fa-trash-alt fa-lg"></i>
            </button>
          </div>
          <p class="item-cap">${itemCap}L</p>
        </div>
      </li>
    `;
  }

  renderBackpackList(list) {
    this._clearBackpackList();
    list.forEach(item => {
      this._backpackList.insertAdjacentHTML(
        'beforeend',
        this._createItem(item)
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

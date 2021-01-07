class View {
  _initForm = document.querySelector('.initial-form');
  _initFormInputWhere = document.querySelector('.input--where');
  _initFormInputSize = document.querySelector('.input--size');

  _backpackContent = document.querySelector('.content');
  _backpackForm = document.querySelector('.form--add-item');
  _backpackTitle = document.querySelector('.backpack__title');
  _backpackCap = document.querySelector('.backpack__capacity');
  _backpackImgOverlay = document.querySelector('.backpack__img--overlay');
  _backpackInputItem = document.querySelector('.input--item');
  _backpackInputItemCap = document.querySelector('.input--item-cap');
  _backpackList = document.querySelector('.list');

  _calc = document.querySelector('.calc');
  _calcForm = document.querySelector('.form--calc');
  _calcOpenBtn = document.querySelector('.btn--calc--open');
  _calcCloseBtn = document.querySelector('.btn--calc--close');
  _calcConfirmBtn = document.querySelector('.btn--calc--confirm');
  _calcInputs = document.querySelectorAll('.input--calc');
  _calcInputA = document.querySelector('.input--calc-a');
  _calcInputB = document.querySelector('.input--calc-b');
  _calcInputC = document.querySelector('.input--calc-c');
  _calcResult = document.querySelector('.calc__result');
  _calcTooltip = document.querySelector('.tooltip');

  constructor() {
    this._handlerOpenEditForm();
    this._handlerCloseEditForm();
    this._handlerOpenCalc();
    this._handlerCloseCalc();
    this._handlerCloseCalcByBody();
    this._handlerCloseCalcByEsc();
    this._hideCalcTooltip();
  }

  // Render Error
  _hideError() {
    document
      .querySelectorAll('.form__error-msg')
      .forEach(msg => (msg.innerHTML = ''));
    document.querySelectorAll('.input').forEach(input => {
      input.classList.remove('error');
    });
  }

  renderError({ input, error }) {
    console.log(input, error);
    this._hideError();
    const formInput = document.querySelector(`.input--${input}`);
    const formGroup = formInput.parentElement;
    formInput.classList.add('error');
    formGroup.querySelector('.form__error-msg').innerText = error;
    console.log(formGroup);
  }

  // Calculator
  _hideCalcTooltip() {
    setInterval(() => {
      this._calcTooltip.style.display = 'none';
    }, 4000);
  }

  _clearCalcform() {
    this._calcInputs.forEach(input => (input.value = ''));
  }

  _getCalcFormData() {
    const formData = [...this._calcInputs].map(input => input.value);
    return formData;
  }

  addHandlerCalc(handler) {
    this._calcForm.addEventListener('submit', e => {
      e.preventDefault();
      const cap = handler(this._getCalcFormData());
      const inputTarget = this._calc.dataset.input;
      document.querySelector(`.input--${inputTarget}`).value = cap;
      this._calcResult.innerHTML = `${cap}L`;
      this._calcInputA.focus();
      this._clearCalcform();
    });
  }

  _closeCalc() {
    this._calc.style.clipPath = 'circle(13% at 82% 86.6%)';
    this._calcOpenBtn.classList.remove('hidden');
    this._calcConfirmBtn.style.display = 'none';
    this._calcResult.innerHTML = '';
    this._clearCalcform();
  }

  _handlerCloseCalcByEsc() {
    document.body.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      this._closeCalc();
    });
  }

  _handlerCloseCalcByBody() {
    document.body.addEventListener('click', e => {
      if (e.target.closest('.calc')) return;
      this._closeCalc();
    });
  }

  _handlerCloseCalc() {
    this._calcCloseBtn.addEventListener('click', e => {
      e.preventDefault();
      this._closeCalc();
    });
  }

  _handlerOpenCalc() {
    this._calcOpenBtn.addEventListener('click', e => {
      e.preventDefault();
      this._calc.style.clipPath = 'circle(100%)';
      this._calcOpenBtn.classList.add('hidden');
      this._calcConfirmBtn.style.display = 'block';
      this._calcTooltip.style.display = 'none';
    });
  }

  // Backpack
  getEditItemFormData() {}

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
          <button class="btn--edit btn--edit--confirm"><i class="arrow arrow--right"></i></button>
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

  clearBackpackForm() {
    this._backpackInputItem.value = '';
    this._backpackInputItemCap.value = '';
    this._backpackInputItem.focus();
    this._hideError();
  }

  _getBackpackFormData() {
    return {
      itemName: this._backpackInputItem.value,
      itemCap: this._backpackInputItemCap.value,
    };
  }

  addHandlerBackpackForm(handler) {
    this._backpackForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this._getBackpackFormData());
    });
  }

  _setBackpackColor(filledPercentage) {
    if (filledPercentage >= 100) return '#C0392B';
    return `linear-gradient(
      360deg,
      #3498db 0%,
      #3498db ${filledPercentage < 70 ? filledPercentage : '70'}%,
      #F39C12 ${filledPercentage < 70 ? filledPercentage : '70'}%,
      #F39C12 ${filledPercentage < 90 ? filledPercentage : '90'}%,
      #C0392B ${filledPercentage < 90 ? filledPercentage : '90'}%,
      #C0392B ${filledPercentage < 100 ? filledPercentage : '100'}%,
      #FFFFFF ${filledPercentage}%
    )`;
  }

  renderBackpack({ title, cap, filledCap, filledPercentage }) {
    this._backpackTitle.innerHTML = title;
    this._backpackCap.innerHTML = `${filledCap}/${cap}L`;
    this._backpackImgOverlay.style.background = this._setBackpackColor(
      filledPercentage
    );
  }

  // Init Form
  hideInitFormAndShowContent() {
    this._initForm.classList.toggle('hidden');
    this._backpackContent.classList.toggle('hidden');
    this._calc.dataset.input = 'item-cap';
  }

  _getInitFormData() {
    return {
      title: this._initFormInputWhere.value,
      cap: this._initFormInputSize.value,
    };
  }

  addHandlerInitForm(handler) {
    this._initForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this._getInitFormData());
    });
  }
}

export default new View();

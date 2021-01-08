export const state = {
  backpackData: {},
  backpackList: [],
};

export const calcCap = function ([a, b, c]) {
  try {
    if (a < 2) throw { input: 'calc-a', error: `Minimum 2cm` };
    if (b < 2) throw { input: 'calc-b', error: `Minimum 2cm` };
    if (c < 2) throw { input: 'calc-c', error: `Minimum 2cm` };

    return ((a * b * c) / 1000).toFixed(2);
  } catch (err) {
    throw err;
  }
};

export const editItem = function (itemName, itemCap, itemId) {
  try {
    const item = itemName.trim();
    const cap = +itemCap;
    let prevItemCap;
    state.backpackList.forEach(item => {
      if (item.id !== itemId) return;
      prevItemCap = item.itemCap;
    });
    errorItemInput(item, 'edit--item');
    if (cap < 0.1) throw { input: 'edit--item-cap', error: `Min. 0.1l` };

    if (
      cap - prevItemCap + state.backpackData.filledCap >
      state.backpackData.cap
    )
      throw { input: 'edit--item-cap', error: 'Brak miejsca' };

    state.backpackList.forEach((item, i) => {
      if (item.id !== itemId) return;
      item.itemName = itemName;
      item.itemCap = itemCap;
    });
  } catch (err) {
    throw err;
  }
};

export const deleteItem = function (id) {
  state.backpackList.forEach((item, i) => {
    if (item.id !== id) return;
    state.backpackList.splice(i, 1);
  });
};

const createItemObject = function (itemName, itemCap) {
  return {
    itemName: itemName,
    itemCap: +itemCap.toFixed(1),
    id: '_' + Math.random().toString(36).substr(2, 9),
  };
};

export const addItem = function (itemName, itemCap) {
  try {
    const item = itemName.trim();
    const cap = +itemCap;
    errorItemInput(item, 'item');
    errorItemCapInput(cap, 'item-cap');

    state.backpackList.push(createItemObject(item, cap));
  } catch (err) {
    throw err;
  }
};

export const updateBackpack = function () {
  const filledCap = state.backpackList
    .map(item => +Object.values(item)[1])
    .reduce((prev, cur) => prev + cur, 0);
  state.backpackData.filledCap = +filledCap.toFixed(1);
  state.backpackData.filledPercentage = (
    (filledCap / state.backpackData.cap) *
    100
  ).toFixed(1);
};

export const createBackpack = function (t, c) {
  try {
    const title = t.trim();
    errorItemInput(title, 'where');
    if (c < 1) throw { input: 'size', error: `Minimum 1l` };
    if (c > 1000) throw { input: 'size', error: `Nie uniesiesz tyle :)` };

    state.backpackData = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      cap: +Number.parseFloat(c).toFixed(1),
      filledCap: 0,
      filledPercentage: 0,
    };
  } catch (err) {
    throw err;
  }
};

const errorItemCapInput = function (cap, input) {
  if (cap < 0.1) throw { input: `${input}`, error: `Minimum 0.1l` };

  if (cap + state.backpackData.filledCap > state.backpackData.cap)
    throw { input: `${input}`, error: 'Brak miejsca' };
};

const errorItemInput = function (item, input) {
  if (`${item}`.length < 1)
    throw { input: `${input}`, error: 'Pole nie może byc puste' };
  if (`${item}`.length > 20)
    throw { input: `${input}`, error: 'Maksymalna ilość znaków: 20' };
  if (!/^[A-Za-z]+$/.test(`${item.charAt(0)}`))
    throw { input: `${input}`, error: 'Musi zaczynać się literą' };
};

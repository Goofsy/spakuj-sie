export const state = {
  backpackData: {
    cap: 50,
  },
  backpackList: [],
};

export const calcCap = function ([a, b, c]) {
  return ((a * b * c) / 1000).toFixed(2);
};

export const editItem = function (itemName, itemCap, itemId) {
  state.backpackList.forEach((item, i) => {
    if (item.id !== itemId) return;
    item.itemName = itemName;
    item.itemCap = itemCap;
  });
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
    itemCap: itemCap.toFixed(1),
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
  state.backpackData.filledCap = filledCap.toFixed(1);
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
      cap: Number.parseFloat(c).toFixed(1),
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
    throw { input: `${input}`, error: 'Nie zmieści się' };
};

const errorItemInput = function (item, input) {
  if (`${item}`.length < 1)
    throw { input: `${input}`, error: 'Pole nie może byc puste' };
  if (`${item}`.length > 20)
    throw { input: `${input}`, error: 'Maksymalna ilość znaków: 20' };
  if (/[0-9]+$/.test(`${item}`))
    throw { input: `${input}`, error: 'Nie może być liczbą' };
};

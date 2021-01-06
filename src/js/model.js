export const state = {
  backpackData: {},
  backpackList: [],
};

export const calcCap = function (a, b, c) {
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

const createItemObject = function ({ itemName, itemCap }) {
  return {
    itemName: itemName,
    itemCap: itemCap,
    id: '_' + Math.random().toString(36).substr(2, 9),
  };
};

export const addItem = function (item) {
  state.backpackList.push(createItemObject(item));
};

export const updateBackpack = function () {
  const filledCap = state.backpackList
    .map(item => +Object.values(item)[1])
    .reduce((prev, cur) => prev + cur, 0);
  state.backpackData.filledCap = filledCap;
  state.backpackData.filledPercentage = (
    (filledCap / state.backpackData.cap) *
    100
  ).toFixed(1);
};

export const createBackpack = function (title, cap, filledCap = 0) {
  state.backpackData = {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    cap: +cap,
    filledCap: filledCap,
    filledPercentage: 0,
  };
};

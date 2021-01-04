export const state = {
  backpackData: {},
  backpackItems: [],
};

export const createBackpackData = async function (title, cap, filledL = 0) {
  state.backpackData = {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    cap: +cap,
    filledL: filledL,
    filledPercentage: ((filledL / cap) * 100).toFixed(1),
  };
};

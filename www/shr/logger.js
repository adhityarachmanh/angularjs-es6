export const group = (label,data) => {
  console.groupCollapsed(label);
  data.map((x) => console.log(x));
  console.groupEnd();
};

import {
  Constant
} from "../shr/module-builder";

export const config = {
  _R: "",
  v: "?v=1",
  name: "app",
  app: 'app/',
  res: 'res/',
  lOpt: [{
    i: 'en',
    d: 'English'
  }, {
    i: 'id',
    d: 'Indonesia'
  }],
  lDef: 'en',
  lDir: "app/l/",
  Copyright: {
    Creator: "Adhitya Rachman Hidayatullah",
    ProductId: "",
    Product: "Angular JS ES6",
    Description: "",
    Copyright: "",
    Version: ""
  }
};
export default Constant("C", config);
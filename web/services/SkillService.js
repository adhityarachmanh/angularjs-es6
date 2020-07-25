import { BuildService } from "../module-builder";

export default BuildService("SkillService", [
  "API",
  function (API) {
    return {
      getAllData: async function () {
        return await API.post("skill");
      },
    };
  },
]);

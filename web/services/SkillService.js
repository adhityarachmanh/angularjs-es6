import { BuildService } from "../module-builder";

export default BuildService("SkillService", (API) => {
  return {
    getData: async () => {
      return await API.externalGET(
        "https://jsonplaceholder.typicode.com/posts"
      );
    },
    getAllData: async () => {
      return await API.post(
        "skill"
      );
    },
  };
});

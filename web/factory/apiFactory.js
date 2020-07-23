import { BuildFactory } from "../module-builder";
import CONFIG from "../config";

export default BuildFactory("API", () => {
  let _CT = "Content-Type",
    _APPJSON = "application/json",
    SERVICEBASE = CONFIG.SERVICEBASE,
    SET_HEADERS = function (HEADERS) {
      return new Headers({
        [_CT]: _APPJSON,
        ...HEADERS,
      });
    };
  return {
    post: async function (URL, DATA, HEADERS = {}) {
      return await fetch(SERVICEBASE + "/" + URL, {
        method: "POST",
        body: JSON.stringify(DATA),
        headers: SET_HEADERS(HEADERS),
      }).then((response) => response.json());
    },
    get: async function (URL, HEADERS = {}) {
      return await fetch(SERVICEBASE + "/" + URL, {
        method: "GET",
        headers: SET_HEADERS(HEADERS),
      }).then((response) => response.json());
    },
    externalPOST: async function (URL, DATA, HEADERS = {}) {
      return await fetch(URL, {
        method: "POST",
        body: JSON.stringify(DATA),
        headers: SET_HEADERS(HEADERS),
      }).then((response) => response.json());
    },
    externalGET: async function (URL, HEADERS = {}) {
      return await fetch(URL, {
        method: "GET",
        headers: SET_HEADERS(HEADERS),
      }).then((response) => response.json());
    },
  };
});

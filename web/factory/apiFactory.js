import { BuildFactory } from "../module-builder";
import CONFIG from "../config";

export default BuildFactory("API", (GLOBAL) => {
  let _CT = "Content-Type",
    _APPJSON = "application/json",
    API_VERSION = "v1.0",
    API_ROOT = "api",
    SERVICEBASE = CONFIG.SERVICEBASE,
    SET_HEADERS = (HEADERS) => {
      return new Headers({
        [_CT]: _APPJSON,
        ...HEADERS,
      });
    },
    API_ROUTE = (URL) => {
      let noEncURL = `${API_VERSION}/${API_ROOT}/${URL}`;
      let encURL = GLOBAL.enc(noEncURL, 1, 6)
      if (CONFIG.MODE === "production") {
        return `${SERVICEBASE}/${encURL}/`;
      }
      return `${SERVICEBASE}/${noEncURL}/`;
    };
  console.log(API_ROUTE);
  return {
    post: async function (URL, DATA, HEADERS = {}) {
      return await fetch(API_ROUTE(URL), {
        method: "POST",
        body: JSON.stringify(DATA),
        headers: SET_HEADERS(HEADERS),
      }).then((response) => response.json());
    },
    get: async function (URL, HEADERS = {}) {
      return await fetch(API_ROUTE(URL), {
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

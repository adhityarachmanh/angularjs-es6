/*
mod : Module Builder
cre : lwx
upd : arh 
ver : 0
*/

import { Factory } from "./module-builder";

export default Factory("A", [
  "C",
  "G",
  "$http",
  (CONFIG,Global, $http) => {
    var _CT = "Content-Type",
      _APPJSON = "application/json",
      //_APPJSON = 'application/json;charset=utf-8',
      _XTOKEN = "XA", //used to be X-Token
      //_TOKEN = 'token';
      serviceBase = CONFIG.res,
      _tokenValue = null,
      _add2Object =
        /**
         * add additional key value to object
         * @param {string} key
         * @param {*} value
         * @param {object} obj
         */
        function (key, value, obj) {
          if (angular.isUndefined(obj)) obj = {};
          obj[key] = value;
          return obj;
        },
      _headerAsConfig =
        /**
         * create config or header object
         * @param {object} hdrs header object
         * @param {boolean} onlyHeader
         */
        function (hdrs, onlyHeader) {
          if (angular.isUndefined(hdrs)) hdrs = {};
          //if (_tokenValue = Global.a(_XTOKEN)) hdrs[_XTOKEN] = _tokenValue;
          if (_tokenValue) {
            hdrs[_XTOKEN] = _tokenValue;
          } else if ((_tokenValue = Global.value(_XTOKEN))) {
            hdrs[_XTOKEN] = _tokenValue;
          }
          if (onlyHeader) {
            return hdrs;
          } else {
            return { headers: hdrs }; //return as config
          }
        };

    return {
      /**
       * xhr get
       * @param {string} q requested resources
       * @param {object} hdrs header object
       */
      get: function (q, hdrs) {
        //hdrs = _checkHeader(hdrs);
        //console.log(serviceBase + q,hdrs);
        //console.log(_headerAsConfig(hdrs));
        return $http.get(serviceBase + q, _headerAsConfig(hdrs, true));
      },

      /**
       * xhr post
       * @param {string} q requested resources
       * @param {any} object request body
       * @param {object} hdrs header object
       */
      put: function (q, object, hdrs) {
        //hdrs = _checkHeader(hdrs);
        //hdrs[_CT] = _APPJSON;
        //hdrs = _add2Object(_CT, _APPJSON, hdrs);
        /* return $http({
                method: 'POST',
                url: serviceBase + q,
                headers: hdrs,
                data: object
            }); */
        return $http.post(
          serviceBase + q,
          object,
          _headerAsConfig(_add2Object(_CT, _APPJSON, hdrs))
        );
      },

      /**
       * load language file
       * @param {string} q requested resources
       * @param {string} langId language file to load
       */
      lang: function (q, langId) {
        //console.log(CONFIG.lDir + langId + '/' + q + '.json');
        return $http.get(
          CONFIG.lDir + langId + "/" + q + ".json",
          _headerAsConfig()
        );
      },

      /**
       * get binary data
       * @param {string} q requested resources
       */
      bin: function (q) {
        /* return $http.get(serviceBase + q, {
                responseType: 'arraybuffer',
                headers: _headerAsConfig(CONST_NULL, CONST_TRUE)
            }); */
        return $http.get(
          serviceBase + q,
          _add2Object("responseType", "arraybuffer", _headerAsConfig())
        );
      },
      /**
       * xhr put
       * @param {string} q requested resources
       * @param {any} object request body
       * @param {object} hdrs header object
       */
      /**put: function(q, object, hdrs) {

            return $http.put(serviceBase + q, object, _headerAsConfig(_add2Object(_CT, _APPJSON, hdrs)));
        },**/

      /**
       * xhr delete
       * @param {string} q requested resources
       * @param {object} hdrs header object
       */
      del: function (q, hdrs) {
        //hdrs = _checkHeader(hdrs);
        return $http.delete(serviceBase + q, _headerAsConfig(hdrs));
      },

      /**
       * upload file using xhr post
       * @param {string} q requested resources
       * @param {string} file file path
       */
      upload: function (q, file) {
        var fd = new FormData();
        fd.append("file", file);

        /* return $http.post(serviceBase + q, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }); */
        return $http.post(
          serviceBase + q,
          fd,
          _add2Object("transformRequest", angular.identity, _headerAsConfig())
        );
      },
      fUpload: function (q, file, data) {
        var fd = new FormData();
        fd.append("file", file);
        fd.append("data", angular.toJson(data));
        //var hhttp = { 'Content-Type': "multipart/form-data" }
        return $http.post(serviceBase + q, fd, {
          transformRequest: angular.identity,
          headers: {
            "Content-Type": undefined,
          },
        });
        //return $http.post(serviceBase + q, fd, _add2Object("transformRequest", angular.identity, _headerAsConfig(hhttp,true)));
      },
      /**
       * load file
       * @param {string} url requested resources
       */
      file: function (url) {
        //console.log(CONFIG.lDir + langId + '/' + q + '.json');
        return $http.get(url, _headerAsConfig());
      },

      enume: function (q, c, v) {
        var hhttps = {
          "Content-Type": c,
          params: v,
        };
        return $http.get(serviceBase + q, _headerAsConfig(hhttps, true));
      },
      /**
       * handle error and log to console
       * @param {any} err error
       * @param {any} status status
       * @param {string} mName module name
       * @returns {string} error string
       */
      err: function (error, status, mName) {
        obje.err = {
          message: error,
        };
        if (status) {
          obje.err.status = status;
        }
        if (mName && typeof mName != typeof obje.log) {
          obje.err.module = mName;
        }
        console.log("error:", obje.err);
        return error.toString();
      },
    };
  },
]);

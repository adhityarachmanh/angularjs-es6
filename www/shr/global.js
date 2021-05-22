import { BuildFactory } from "./module-builder";

const $global = () => {
  function getLength(obj) {
    return obj.length;
  }
  var _Value = {
    //"username": "",
    //"token": "",
    //"edxToken": "",
    //"email": "",
    //"profilePic": "",
    //"firstName": "",
    //"lastName": ""
  };

  var uriex = "data:application/vnd.ms-excel;base64,",
    templateex =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64ex = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    formatex = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };

  //var _b64Key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  //!#$%&()*+,-.0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{|}~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæ
  var _asciiBitAmt = 8,
    _defaultBaseNBitLen = 7,
    StringFromCharCode = String.fromCharCode,
    _mathPow = Math.pow,
    arrPush = function (arr, newItem) {
      arr.push(newItem);
    },
    charCodeAt = function (src, idx) {
      return src.charCodeAt(idx);
    },
    charAt = function (src, idx) {
      return src.charAt(idx);
    },
    ObjectPrototypeHasOwnPropertyCall = function (context, prop) {
      return Object.prototype.hasOwnProperty.call(context, prop);
    },
    //CONST_UNDEFINED = undefined,
    //CONST_KEYB64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //CONST_KEYB64URISAFE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
    _getSvrKey = function () {
      var tmp = _Value[_LWX];
      //key should be encrypted too, so when hacker try to search from memory, it get something else
      return _nBitDec(tmp); //better save encrypted key in array not string
    },
    _genKey = function (keyType) {
      var _As = 65,
        _Ze = 91,
        _as = 97,
        _ze = 123,
        _0s = 48,
        _9e = 58,
        _QuestionMark_s = 63, //?
        _Colon_e = 59, //:
        _Number_Sign_s = 35, //#
        _Ampersand_e = 39, //Terminate before 39 (& actually 38)
        _Left_Parenthis_s = 40, //(
        _FullStop_e = 47, //Terminate before 47, FullStop actually 46
        _LeftSquareBracket_e = 92, //Terminate before 92, [ actually 91
        _RightSquareBracket_s = 93, //]
        _Low_Line_e = 96, //Terminate before 96, _ actually 95
        _Tilde_e = 127, //Terminate before 127, ~ actually 126
        _LatinAwGrave_s = 192,
        _LatinSmall_ae_e = 231, //Terminate before 231, ae actually 230
        _key = "",
        suffix = "",
        arrRange = [_As, _Ze, _as, _ze, _0s, _9e], //[[_As,_Ze],[_as,_ze],[_0s,_9e]],
        i = 0,
        j,
        k,
        l;
      if (keyType == 0) {
        // standard base 64
        suffix = "+/=";
      } else if (keyType == 1) {
        // non standard uri safe base 64
        suffix = "-_."; // standard uri safe using "+-$"
      } else if (keyType == 2) {
        // non standard base 64
        arrRange = [_as, _ze, _QuestionMark_s, _Ze, _0s, _Colon_e];
      } else if (keyType == 9) {
        // key was from server and session specific after successfull login
        arrRange = [];
        _key = _getSvrKey();
      } else {
        //own base 2 to base 128
        _key = "!";
        arrRange = [
          _Number_Sign_s,
          _Ampersand_e,
          _Left_Parenthis_s,
          _FullStop_e,
          _0s,
          _LeftSquareBracket_e,
          _RightSquareBracket_s,
          _Low_Line_e,
          _as,
          _Tilde_e,
          _LatinAwGrave_s,
          _LatinSmall_ae_e,
        ];
      }
      /* // not passed uglifyjs 
          for (i of arrRange) {
              for (j = i[0], k=i[1];j<k;j++){
                  _key += StringFromCharCode(j);
              }
          } */
      /*         for (l=getLength(arrRange);i<l;i++) { //for (l=arrRange.length;i<l;i++) {
                      for (j = arrRange[i][0], k=arrRange[i][1];j<k;j++){
                          _key += StringFromCharCode(j);
                      }
                  }
           */
      for (l = getLength(arrRange); i < l; i += 2) {
        for (j = arrRange[i], k = arrRange[i + 1]; j < k; j++) {
          _key += StringFromCharCode(j);
        }
      }
      return _key + suffix;
    },
    _nBitEnc = function (source, baseNBitLen, key) {
      //return _bNE(baseNBitLen || 6, source, key);
      baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
      key = key || _genKey();
      var binData = 0,
        bitLen = 0,
        baseNBit = _mathPow(2, baseNBitLen) - 1,
        encResult = source.replace(/./g, function (v) {
          var encResultTmp = "";
          binData = (binData << _asciiBitAmt) + charCodeAt(v, 0); //v.charCodeAt(0);
          bitLen += _asciiBitAmt;
          while (bitLen >= baseNBitLen) {
            bitLen -= baseNBitLen;
            encResultTmp += key[(binData >>> bitLen) & baseNBit];
            //binData = binData & (_mathPow(2,bitLen)-1);
          }
          return encResultTmp;
        });
      return bitLen > 0
        ? encResult + key[(binData << (baseNBitLen - bitLen)) & baseNBit]
        : encResult;
    },
    _nBitDec = function (source, baseNBitLen, key) {
      //return _bND(baseNBitLen || 6, source, key);
      baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
      var binData = 0,
        bitLen = 0;
      key = key || _genKey();
      return source.replace(/./g, function (v) {
        binData = (binData << baseNBitLen) + key.indexOf(v);
        bitLen += baseNBitLen;
        return bitLen < _asciiBitAmt
          ? ""
          : StringFromCharCode((binData >>> (bitLen -= _asciiBitAmt)) & 0xff);
      });
    },
    _LZString = function (sKey) {
      // private property
      var //f = String.fromCharCode,
        baseReverseDic = {},
        //_mathPow = Math.pow,
        _key = angular.isUndefined(sKey)
          ? _genKey()
          : angular.isNumber(sKey)
          ? _genKey(sKey)
          : sKey,
        _getBaseValue = function (alphabet, character) {
          if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0, l = getLength(alphabet); i < l; i++) {
              //for (var i = 0; i < alphabet.length; i++) {
              baseReverseDic[alphabet][charAt(alphabet, i)] = i; //baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
          }
          return baseReverseDic[alphabet][character];
        },
        _compress = function (uncompressed, bitsPerChar, getCharFromInt) {
          if (isNull(uncompressed)) return "";
          var i,
            value,
            context_dictionary = {},
            context_dictionaryToCreate = {},
            context_c = "",
            context_wc = "",
            context_w = "",
            context_enlargeIn = 2, // Compensate for the first entry which should not count
            context_dictSize = 3,
            context_numBits = 2,
            context_data = [],
            context_data_val = 0,
            context_data_position = 0,
            ii,
            uncompressedLength = getLength(uncompressed); //uncompressed.length;

          for (ii = 0; ii < uncompressedLength; ii += 1) {
            context_c = charAt(uncompressed, ii); //uncompressed.charAt(ii);
            //if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            if (
              !ObjectPrototypeHasOwnPropertyCall(context_dictionary, context_c)
            ) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = CONST_TRUE;
            }

            context_wc = context_w + context_c;
            //if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
            if (
              ObjectPrototypeHasOwnPropertyCall(context_dictionary, context_wc)
            ) {
              context_w = context_wc;
            } else {
              //if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (
                ObjectPrototypeHasOwnPropertyCall(
                  context_dictionaryToCreate,
                  context_w
                )
              ) {
                if (charCodeAt(context_w, 0) < 256) {
                  //if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      //context_data.push(getCharFromInt(context_data_val));
                      arrPush(context_data, getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = charCodeAt(context_w, 0); //context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      //context_data.push(getCharFromInt(context_data_val));
                      arrPush(context_data, getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      //context_data.push(getCharFromInt(context_data_val));
                      arrPush(context_data, getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = charCodeAt(context_w, 0); //context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      //context_data.push(getCharFromInt(context_data_val));
                      arrPush(context_data, getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = _mathPow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = (context_data_val << 1) | (value & 1);
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    //context_data.push(getCharFromInt(context_data_val));
                    arrPush(context_data, getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = _mathPow(2, context_numBits);
                context_numBits++;
              }
              // Add wc to the dictionary.
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }

          // Output the code for w.
          if (context_w !== "") {
            //if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (
              ObjectPrototypeHasOwnPropertyCall(
                context_dictionaryToCreate,
                context_w
              )
            ) {
              if (charCodeAt(context_w, 0) < 256) {
                //if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    //context_data.push(getCharFromInt(context_data_val));
                    arrPush(context_data, getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = charCodeAt(context_w, 0); //context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = (context_data_val << 1) | (value & 1);
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    //context_data.push(getCharFromInt(context_data_val));
                    arrPush(context_data, getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = (context_data_val << 1) | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    //context_data.push(getCharFromInt(context_data_val));
                    arrPush(context_data, getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = charCodeAt(context_w, 0); //context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = (context_data_val << 1) | (value & 1);
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    //context_data.push(getCharFromInt(context_data_val));
                    arrPush(context_data, getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = _mathPow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  //context_data.push(getCharFromInt(context_data_val));
                  arrPush(context_data, getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = _mathPow(2, context_numBits);
              context_numBits++;
            }
          }

          // Mark the end of the stream
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              //context_data.push(getCharFromInt(context_data_val));
              arrPush(context_data, getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }

          // Flush the last char
          while (CONST_TRUE) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              //context_data.push(getCharFromInt(context_data_val));
              arrPush(context_data, getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        _decompress = function (length, resetValue, getNextValue) {
          var dictionary = [],
            next,
            enlargeIn = 4,
            dictSize = 4,
            numBits = 3,
            entry = "",
            result = [],
            i,
            w,
            bits,
            resb,
            maxpower,
            power,
            c,
            //data = { val: getNextValue(0), position: resetValue, index: 1 }
            data_val = getNextValue(0),
            data_position = resetValue,
            data_index = 1;

          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }

          bits = 0;
          maxpower = _mathPow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data_val & data_position;
            data_position >>= 1;
            if (data_position == 0) {
              data_position = resetValue;
              data_val = getNextValue(data_index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          switch ((next = bits)) {
            case 0:
              bits = 0;
              maxpower = _mathPow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data_val & data_position;
                data_position >>= 1;
                if (data_position == 0) {
                  data_position = resetValue;
                  data_val = getNextValue(data_index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = StringFromCharCode(bits); //f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = _mathPow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data_val & data_position;
                data_position >>= 1;
                if (data_position == 0) {
                  data_position = resetValue;
                  data_val = getNextValue(data_index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = StringFromCharCode(bits); //f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          //result.push(c);
          arrPush(result, c);
          while (CONST_TRUE) {
            if (data_index > length) {
              return "";
            }

            bits = 0;
            maxpower = _mathPow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data_val & data_position;
              data_position >>= 1;
              if (data_position == 0) {
                data_position = resetValue;
                data_val = getNextValue(data_index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            switch ((c = bits)) {
              case 0:
                bits = 0;
                maxpower = _mathPow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data_val & data_position;
                  data_position >>= 1;
                  if (data_position == 0) {
                    data_position = resetValue;
                    data_val = getNextValue(data_index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }

                dictionary[dictSize++] = StringFromCharCode(bits); //f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = _mathPow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data_val & data_position;
                  data_position >>= 1;
                  if (data_position == 0) {
                    data_position = resetValue;
                    data_val = getNextValue(data_index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = StringFromCharCode(bits); //f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }

            if (enlargeIn == 0) {
              enlargeIn = _mathPow(2, numBits);
              numBits++;
            }

            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + charAt(w, 0); //w.charAt(0);
              } else {
                return null;
              }
            }
            //result.push(entry);
            arrPush(result, entry);

            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + charAt(entry, 0); //entry.charAt(0);
            enlargeIn--;

            w = entry;

            if (enlargeIn == 0) {
              enlargeIn = _mathPow(2, numBits);
              numBits++;
            }
          }
        },
        _checkPad = function (src, padLength) {
          var needPad = getLength(src) % padLength; //var needPad = src.length % padLength;
          if (needPad > 0) {
            //src.padEnd(src.length + padLength - needPad, _key.charAt(_key.length - 1));
            //src.padEnd(src.length + padLength - needPad, charAt(_key,_key.length - 1));
            src.padEnd(
              getLength(src) + padLength - needPad,
              charAt(_key, getLength(_key) - 1)
            );
          }
          return src;
        };

      return {
        toBase64: function (uncompressed) {
          //toBase64
          if (isNull(uncompressed)) return "";
          //return _checkPad(_compress(uncompressed, 6, function(a) { return _key.charAt(a); }), 4);
          return _checkPad(
            _compress(uncompressed, 6, function (a) {
              return charAt(_key, a);
            }),
            4
          );
          // switch (res.length % 4) { // To produce valid Base64
          //     default: // When could this happen ?
          //         case 0:
          //         return res;
          //     case 1:
          //             return res + "===";
          //     case 2:
          //             return res + "==";
          //     case 3:
          //             return res + "=";
          // }
        },

        fromBase64: function (compressed) {
          //fromBase64
          if (isNull(compressed)) return "";
          if (compressed == "") return null;
          //return _decompress(compressed.length, 32, function(index) { return _getBaseValue(_key, compressed.charAt(index)); });
          //return _decompress(compressed.length, 32, function(index) { return _getBaseValue(_key, charAt(compressed,index)); });
          return _decompress(getLength(compressed), 32, function (index) {
            return _getBaseValue(_key, charAt(compressed, index));
          });
        },

        toB128: function (uncompressed) {
          //toB128
          if (isNull(uncompressed)) return "";
          //return _checkPad(_compress(uncompressed, 7, function(a) { return _key.charAt(a); }), 8);
          return _checkPad(
            _compress(uncompressed, 7, function (a) {
              return charAt(_key, a);
            }),
            8
          );
        },

        fromB128: function (compressed) {
          //fromB128
          if (isNull(compressed)) return "";
          if (compressed == "") return null;
          //return _decompress(compressed.length, 64, function(index) { return _getBaseValue(_key, compressed.charAt(index)); });
          //return _decompress(compressed.length, 64, function(index) { return _getBaseValue(_key, charAt(compressed,index)); });
          return _decompress(getLength(compressed), 64, function (index) {
            return _getBaseValue(_key, charAt(compressed, index));
          });
        },

        toUTF16: function (uncompressed) {
          //toUTF16
          if (isNull(uncompressed)) return "";
          return (
            _compress(uncompressed, 15, function (a) {
              return StringFromCharCode(a + 32);
            }) + " "
          ); //f(a + 32); }) + " ";
        },

        fromUTF16: function (compressed) {
          //fromUTF16
          if (isNull(compressed)) return "";
          if (compressed == "") return null;
          //return _decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
          //return _decompress(compressed.length, 16384, function(index) { return charCodeAt(compressed, index) - 32; });
          return _decompress(getLength(compressed), 16384, function (index) {
            return charCodeAt(compressed, index) - 32;
          });
        },

        /* //compress into uint8array (UCS-2 big endian format)
              toUint8Array: function(uncompressed) {
                  var compressed = LZString.compress(uncompressed);
                  var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
                  for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
                      var current_value = compressed.charCodeAt(i);
                      buf[i * 2] = current_value >>> 8;
                      buf[i * 2 + 1] = current_value % 256;
                  }
                  return buf;
              }, */

        /* //decompress from uint8array (UCS-2 big endian format)
              fromUint8Array: function(compressed) {
                  if (compressed === null || compressed === CONST_UNDEFINED) {
                      return LZString.decompress(compressed);
                  } else {
                      var buf = new Array(compressed.length / 2); // 2 bytes per character
                      for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                          buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                      }
                      var result = [];
                      buf.forEach(function(c) {
                          result.push(StringFromCharCode(c)); //f(c));
                      });
                      return LZString.decompress(result.join(''));
                  }
              }, */

        /* //compress into a string that is already URI encoded
              toEncodedURIComponent: function(input) {
                  if (input == null) return "";
                  return _compress(input, 6, function(a) { return CONST_KEYB64URISAFE.charAt(a); });
              }, */

        /* //decompress from an output of compressToEncodedURIComponent
              fromEncodedURIComponent: function(input) {
                  if (input == null) return "";
                  if (input == "") return null;
                  input = input.replace(/ /g, "+");
                  return _decompress(input.length, 32, function(index) { return _getBaseValue(CONST_KEYB64URISAFE, input.charAt(index)); });
              }, */

        compress: function (uncompressed) {
          //compress
          return _compress(uncompressed, 16, function (a) {
            return StringFromCharCode(a);
          }); //f(a); });
        },

        decompress: function (compressed) {
          //decompress
          if (isNull(compressed)) {
            return null;
          } else if (compressed == "") {
            return "";
          } else {
            //return _decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
            //return _decompress(compressed.length, 32768, function(index) { return charCodeAt(compressed, index); });
            return _decompress(getLength(compressed), 32768, function (index) {
              return charCodeAt(compressed, index);
            });
          }
        },
      };
      //return LZString;
    };

  return {
    /**
     * set and get Global value. When value param provided means set value otherwise get value
     * @param {string} key key
     * @param {any} value value
     * @returns {any} returns stored value when value param ommited
     * @example
     *      Global.value(keyString, value);
     *      var myVal = Global.value(keyString);
     */
    value: function (key, value) {
      if (angular.isDefined(value)) {
        //setValue
        _Value[key] = value;
      } else {
        return _Value[key]; //getValue
      }
    },
    /**
     * isValueExist check whether a key value saved to Global
     * @param {string} key key
     * @returns true if key value exist otherwise return false
     */
    isValExist: function (key) {
      //isValueExist
      if (_Value[key]) {
        return CONST_TRUE;
      } else {
        return CONST_FALSE;
      }
    },

    /**
     * base N bit per byte decrypt (base 64 bit decrypt)
     * @param {string} source encrypted source string
     * @param {number|string} edType decrypt type: -1, 0, 1, 2, 9 or key string
     * @param {number} nBitLen 6 for base 64, 7 for base 128, 5 for base 32, 4 for hexa decimal if passed key is "0123456789ABCDEF"
     * @example
     *  var myDecryptedString = Global.d(myEncryptedBase128String, 9) //using session dependend base64 key
     *  var myDecryptedString = Global.d(myEncryptedOwnBase64String) //using own base64 encrtption
     *  var myDecryptedString = Global.d(myEncryptedDefaultBase64String, 0) //using default base64 encrtption
     *  var myDecryptedString = Global.d(myEncryptedBase128String, -1, 7) //using default base128 encrtption
     */
    dec: function (source, edType, nBitLen) {
      if (angular.isUndefined(edType)) {
        //default base 128 decrypt
        return _nBitDec(source);
      } else {
        //base 64 uri safe decrypt
        return _nBitDec(
          source,
          nBitLen || 6,
          angular.isNumber(edType) ? _genKey(edType) : edType
        );
      }
    },

    /**
     * base N bit per byte encrypt (base 64 bit encrypt)
     * @param {string} source encrypted source string
     * @param {number|string} edType decrypt type: -1, 0, 1, 2, 9 or key string
     * @param {number} nBitLen 6 for base 64, 7 for base 128, 5 for base 32, 4 for hexa decimal if passed key is "0123456789ABCDEF"
     * @example
     *  var myEncryptedString = Global.enc(mySourceString, 9) //using session dependend base64 key
     *  var myEncryptedString = Global.enc(mySourceString) //using own base64 encrtption
     *  var myEncryptedString = Global.enc(mySourceString, 0) //using default base64 encrtption
     *  var myEncryptedString = Global.enc(mySourceString, -1, 7) //using default base128 encrtption
     */
    enc: function (source, edType, nBitLen) {
      if (angular.isUndefined(edType)) {
        //default base 128 encrypt
        return _nBitEnc(source);
      } else {
        //base 64 uri safe encrypt
        return _nBitEnc(
          source,
          nBitLen || 6,
          angular.isNumber(edType) ? _genKey(edType) : edType
        );
      }
    },

    /**
     * compress and decompress data
     * @param {number|string} skey -1, 0, 1, 2, 9 or key string
     *  -1 : using a 128 byte length key.
     *  0  : default base 64 key.
     *  1  : non standard uri safe key.
     *  2  : non standard base 64 key.
     *  9  : session dependend base64 key.
     *  a_key_string : custom key string.
     * @example
     *  var myCompressionObject = Global.zip(skey),
     *      myCompressedString = myCompressionObject.toBase64(mySourceString),
     *      myDecompressedString = myCompressionObject.fromB128(myCompressedBase128String);
     * Method available:
     *  toBase64   : compress data to base 64
     *  fromBase64 : decompress data from base 64 string
     *  toB128     : compress data to base 128 string
     *  fromB128   : decompress data from base 128 string
     *  toUTF16    : if want to save data to browser storage use this one
     *  fromUTF16  : pair of toUTF16
     *  compress   : generic compress method for binary result
     *  decompress : generic decompress method from binary source
     */
    zip: _LZString,

    /**
     * generate new UUID
     * @param {boolean} formated whether to format result
     * @returns {string} UUID in hexadecimal form
     */
    getUUID: function (formated) {
      var format = formated
        ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        : "xxxxxxxxyxxx4xxxyxxxyxxxxxxxxxxx";
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      return format.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 17 + (d = Math.floor((d * 9) / 7))) % 16 | 0;
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },

    /**
     * generate random string
     * @param {number} resultLength
     * @param {number} keyType
     * @param {number} additionalVarLen
     * @returns {string} random string with length between resultLength and resultLength+additionalVarLen
     */
    rndStr: function (resultLength, keyType, additionalVarLen) {
      //var i=0, random = Math.random, round = Math.floor, result = '', key = _genKey(keyType || 1), keyLength=key.length;
      var i = 0,
        random = Math.random,
        round = Math.floor,
        result = "",
        key = _genKey(keyType || 1),
        keyLength = getLength(key);
      for (
        resultLength += additionalVarLen
          ? round(random() * additionalVarLen)
          : 0;
        i < resultLength;
        result += key[round(random() * keyLength)], i += 1
      );
      return result;
    },
    /**
     * trim string and add ...
     * @param {string} text source string
     * @param {number} maxLength maximum length
     * @returns {string} trimmed string with addition ...
     */
    cutText: function (text, maxLength) {
      if (isNull(text)) return "";

      if (getLength(text) > maxLength) {
        //if (text.length > maxLength) {
        return text.substring(0, maxLength).concat("...");
      } else {
        return text;
      }
    },
    tableToExcel: function (tableId, worksheetName) {
      var table = $(tableId),
        ctx = { worksheet: worksheetName, table: table.html() },
        href = uriex + base64ex(formatex(templateex, ctx));
      return href;
    },
    getDateInd: function (dat) {
      var hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      var bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      var basetanggal = new Date(dat);
      var tanggal = basetanggal.getDate();
      var _hari = basetanggal.getDay();
      var _bulan = basetanggal.getMonth();
      var _tahun = basetanggal.getYear();

      var hari = hari[_hari];
      var bulan = bulan[_bulan];
      var tahun = _tahun < 1000 ? _tahun + 1900 : _tahun;

      return hari + ", " + tanggal + " " + bulan + " " + tahun;
    },
    /* epochToJsDate : function(ts) {
          // ts = epoch timestamp
          // returns date obj
          return new Date(ts * 1000);
      },
  
      jsDateToEpoch : function(d) {
          // d = javascript date obj
          // returns epoch timestamp
          return (d.getTime() - d.getMilliseconds()) / 1000;
      } */
  };
};
export default BuildFactory("G", $global);

(function () {
  'use strict';

  /* proxy-compat-disable */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  function detect() {
    // Don't apply polyfill when ProxyCompat is enabled.
    if ('getKey' in Proxy) {
      return false;
    }

    const proxy = new Proxy([3, 4], {});
    const res = [1, 2].concat(proxy);
    return res.length !== 4;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    isConcatSpreadable
  } = Symbol;
  const {
    isArray
  } = Array;
  const {
    slice: ArraySlice,
    unshift: ArrayUnshift,
    shift: ArrayShift
  } = Array.prototype;

  function isObject(O) {
    return typeof O === 'object' ? O !== null : typeof O === 'function';
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


  function isSpreadable(O) {
    if (!isObject(O)) {
      return false;
    }

    const spreadable = O[isConcatSpreadable];
    return spreadable !== undefined ? Boolean(spreadable) : isArray(O);
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


  function ArrayConcatPolyfill(..._args) {
    const O = Object(this);
    const A = [];
    let N = 0;
    const items = ArraySlice.call(arguments);
    ArrayUnshift.call(items, O);

    while (items.length) {
      const E = ArrayShift.call(items);

      if (isSpreadable(E)) {
        let k = 0;
        const length = E.length;

        for (k; k < length; k += 1, N += 1) {
          if (k in E) {
            const subElement = E[k];
            A[N] = subElement;
          }
        }
      } else {
        A[N] = E;
        N += 1;
      }
    }

    return A;
  }

  function apply() {
    // eslint-disable-next-line no-extend-native
    Array.prototype.concat = ArrayConcatPolyfill;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  if (detect()) {
    apply();
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail(msg) {
    throw new Error(msg);
  }

  var assert = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant,
    isTrue: isTrue,
    isFalse: isFalse,
    fail: fail
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign,
    create,
    defineProperties,
    defineProperty,
    freeze,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getPrototypeOf,
    hasOwnProperty,
    isFrozen,
    keys,
    seal,
    setPrototypeOf
  } = Object;
  const {
    filter: ArrayFilter,
    find: ArrayFind,
    indexOf: ArrayIndexOf,
    join: ArrayJoin,
    map: ArrayMap,
    push: ArrayPush,
    reduce: ArrayReduce,
    reverse: ArrayReverse,
    slice: ArraySlice$1,
    splice: ArraySplice,
    unshift: ArrayUnshift$1,
    forEach
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt,
    replace: StringReplace,
    slice: StringSlice,
    toLowerCase: StringToLowerCase
  } = String.prototype;

  function isUndefined(obj) {
    return obj === undefined;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
   * ariaGrabbed) are deprecated:
   * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
   *
   * The above list of 46 aria attributes is consistent with the following resources:
   * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
   * https://wicg.github.io/aom/spec/aria-reflection.html
   */

  const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
  const AttrNameToPropNameMap = create(null);
  const PropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach.call(AriaPropertyNames, propName => {
    // Typescript infers the wrong function type for this particular overloaded method:
    // https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap[attrName] = propName;
    PropNameToAttrNameMap[propName] = attrName;
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Inspired from: https://mathiasbynens.be/notes/globalthis

  const _globalThis = function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
      return globalThis;
    }

    let _globalThis;

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // __magic__ is undefined in Safari 10 and IE10 and older.
      // @ts-ignore
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a legacy browser.
      // Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        // @ts-ignore
        _globalThis = window;
      }
    }

    return _globalThis;
  }();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */


  const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

  function createHiddenField(key, namespace) {
    return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap = new WeakMap();

  function getHiddenField(o, field) {
    const valuesByField = hiddenFieldsMap.get(o);

    if (!isUndefined(valuesByField)) {
      return valuesByField[field];
    }
  }

  const HTML_ATTRIBUTES_TO_PROPERTY = {
    accesskey: 'accessKey',
    readonly: 'readOnly',
    tabindex: 'tabIndex',
    bgcolor: 'bgColor',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    contenteditable: 'contentEditable',
    crossorigin: 'crossOrigin',
    datetime: 'dateTime',
    formaction: 'formAction',
    ismap: 'isMap',
    maxlength: 'maxLength',
    minlength: 'minLength',
    novalidate: 'noValidate',
    usemap: 'useMap',
    for: 'htmlFor'
  };
  keys(HTML_ATTRIBUTES_TO_PROPERTY).forEach(attrName => {});
  /** version: 1.7.7 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function detect$1(propName) {
    return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const nodeToAriaPropertyValuesMap = new WeakMap();

  function getAriaPropertyMap(elm) {
    let map = nodeToAriaPropertyValuesMap.get(elm);

    if (map === undefined) {
      map = {};
      nodeToAriaPropertyValuesMap.set(elm, map);
    }

    return map;
  }

  function getNormalizedAriaPropertyValue(value) {
    return value == null ? null : String(value);
  }

  function createAriaPropertyPropertyDescriptor(propName, attrName) {
    return {
      get() {
        const map = getAriaPropertyMap(this);

        if (hasOwnProperty.call(map, propName)) {
          return map[propName];
        } // otherwise just reflect what's in the attribute


        return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
      },

      set(newValue) {
        const normalizedValue = getNormalizedAriaPropertyValue(newValue);
        const map = getAriaPropertyMap(this);
        map[propName] = normalizedValue; // reflect into the corresponding attribute

        if (newValue === null) {
          this.removeAttribute(attrName);
        } else {
          this.setAttribute(attrName, newValue);
        }
      },

      configurable: true,
      enumerable: true
    };
  }

  function patch(propName) {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = PropNameToAttrNameMap[propName];
    const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
    Object.defineProperty(Element.prototype, propName, descriptor);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ElementPrototypeAriaPropertyNames = keys(PropNameToAttrNameMap);

  for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];

    if (detect$1(propName)) {
      patch(propName);
    }
  }
  /* proxy-compat-disable */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant$1(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue$1(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse$2(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail$1(msg) {
    throw new Error(msg);
  }

  var assert$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant$1,
    isTrue: isTrue$1,
    isFalse: isFalse$2,
    fail: fail$1
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign: assign$1,
    create: create$1,
    defineProperties: defineProperties$1,
    defineProperty: defineProperty$1,
    freeze: freeze$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
    getOwnPropertyNames: getOwnPropertyNames$1,
    getPrototypeOf: getPrototypeOf$1,
    hasOwnProperty: hasOwnProperty$1,
    isFrozen: isFrozen$1,
    keys: keys$1,
    seal: seal$1,
    setPrototypeOf: setPrototypeOf$1
  } = Object;
  const {
    isArray: isArray$2
  } = Array;
  const {
    filter: ArrayFilter$1,
    find: ArrayFind$1,
    indexOf: ArrayIndexOf$1,
    join: ArrayJoin$1,
    map: ArrayMap$1,
    push: ArrayPush$1,
    reduce: ArrayReduce$1,
    reverse: ArrayReverse$1,
    slice: ArraySlice$2,
    splice: ArraySplice$1,
    unshift: ArrayUnshift$2,
    forEach: forEach$1
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt$1,
    replace: StringReplace$1,
    slice: StringSlice$1,
    toLowerCase: StringToLowerCase$1
  } = String.prototype;

  function isUndefined$1(obj) {
    return obj === undefined;
  }

  function isNull$1(obj) {
    return obj === null;
  }

  function isTrue$1$1(obj) {
    return obj === true;
  }

  function isFalse$1$1(obj) {
    return obj === false;
  }

  function isFunction$1(obj) {
    return typeof obj === 'function';
  }

  function isString(obj) {
    return typeof obj === 'string';
  }

  const OtS$1 = {}.toString;

  function toString$1(obj) {
    if (obj && obj.toString) {
      // Arrays might hold objects with "null" prototype So using
      // Array.prototype.toString directly will cause an error Iterate through
      // all the items and handle individually.
      if (isArray$2(obj)) {
        return ArrayJoin$1.call(ArrayMap$1.call(obj, toString$1), ',');
      }

      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS$1.call(obj);
    } else {
      return obj + emptyString$1;
    }
  }

  function getPropertyDescriptor(o, p) {
    do {
      const d = getOwnPropertyDescriptor$1(o, p);

      if (!isUndefined$1(d)) {
        return d;
      }

      o = getPrototypeOf$1(o);
    } while (o !== null);
  }

  const emptyString$1 = '';
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
   * ariaGrabbed) are deprecated:
   * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
   *
   * The above list of 46 aria attributes is consistent with the following resources:
   * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
   * https://wicg.github.io/aom/spec/aria-reflection.html
   */

  const AriaPropertyNames$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
  const AttrNameToPropNameMap$1 = create$1(null);
  const PropNameToAttrNameMap$1 = create$1(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach$1.call(AriaPropertyNames$1, propName => {
    // Typescript infers the wrong function type for this particular overloaded method:
    // https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap$1[attrName] = propName;
    PropNameToAttrNameMap$1[propName] = attrName;
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Inspired from: https://mathiasbynens.be/notes/globalthis

  const _globalThis$1 = function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
      return globalThis;
    }

    let _globalThis;

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // __magic__ is undefined in Safari 10 and IE10 and older.
      // @ts-ignore
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a legacy browser.
      // Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        // @ts-ignore
        _globalThis = window;
      }
    }

    return _globalThis;
  }();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */


  const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';

  function createHiddenField$1(key, namespace) {
    return hasNativeSymbolsSupport$1 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap$1 = new WeakMap();

  function setHiddenField$1(o, field, value) {
    let valuesByField = hiddenFieldsMap$1.get(o);

    if (isUndefined$1(valuesByField)) {
      valuesByField = create$1(null);
      hiddenFieldsMap$1.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField$1(o, field) {
    const valuesByField = hiddenFieldsMap$1.get(o);

    if (!isUndefined$1(valuesByField)) {
      return valuesByField[field];
    }
  }

  const HTML_ATTRIBUTES_TO_PROPERTY$1 = {
    accesskey: 'accessKey',
    readonly: 'readOnly',
    tabindex: 'tabIndex',
    bgcolor: 'bgColor',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    contenteditable: 'contentEditable',
    crossorigin: 'crossOrigin',
    datetime: 'dateTime',
    formaction: 'formAction',
    ismap: 'isMap',
    maxlength: 'maxLength',
    minlength: 'minLength',
    novalidate: 'noValidate',
    usemap: 'useMap',
    for: 'htmlFor'
  };
  keys$1(HTML_ATTRIBUTES_TO_PROPERTY$1).forEach(attrName => {});
  /** version: 1.7.7 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  let nextTickCallbackQueue = [];
  const SPACE_CHAR = 32;
  const EmptyObject = seal$1(create$1(null));
  const EmptyArray = seal$1([]);

  function flushCallbackQueue() {

    const callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = []; // reset to a new queue

    for (let i = 0, len = callbacks.length; i < len; i += 1) {
      callbacks[i]();
    }
  }

  function addCallbackToNextTick(callback) {

    if (nextTickCallbackQueue.length === 0) {
      Promise.resolve().then(flushCallbackQueue);
    }

    ArrayPush$1.call(nextTickCallbackQueue, callback);
  }
  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    create: create$1$1
  } = Object;
  const {
    splice: ArraySplice$1$1,
    indexOf: ArrayIndexOf$1$1,
    push: ArrayPush$1$1
  } = Array.prototype;
  const TargetToReactiveRecordMap = new WeakMap();

  function isUndefined$1$1(obj) {
    return obj === undefined;
  }

  function getReactiveRecord(target) {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (isUndefined$1$1(reactiveRecord)) {
      const newRecord = create$1$1(null);
      reactiveRecord = newRecord;
      TargetToReactiveRecordMap.set(target, newRecord);
    }

    return reactiveRecord;
  }

  let currentReactiveObserver = null;

  function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (!isUndefined$1$1(reactiveRecord)) {
      const reactiveObservers = reactiveRecord[key];

      if (!isUndefined$1$1(reactiveObservers)) {
        for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
          const ro = reactiveObservers[i];
          ro.notify();
        }
      }
    }
  }

  function valueObserved(target, key) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
      return;
    }

    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key];

    if (isUndefined$1$1(reactiveObservers)) {
      reactiveObservers = [];
      reactiveRecord[key] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
      return; // perf optimization considering that most subscriptions will come from the same record
    }

    if (ArrayIndexOf$1$1.call(reactiveObservers, ro) === -1) {
      ro.link(reactiveObservers);
    }
  }

  class ReactiveObserver {
    constructor(callback) {
      this.listeners = [];
      this.callback = callback;
    }

    observe(job) {
      const inceptionReactiveRecord = currentReactiveObserver;
      currentReactiveObserver = this;
      let error;

      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        currentReactiveObserver = inceptionReactiveRecord;

        if (error !== undefined) {
          throw error; // eslint-disable-line no-unsafe-finally
        }
      }
    }
    /**
     * This method is responsible for disconnecting the Reactive Observer
     * from any Reactive Record that has a reference to it, to prevent future
     * notifications about previously recorded access.
     */


    reset() {
      const {
        listeners
      } = this;
      const len = listeners.length;

      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const set = listeners[i];
          const pos = ArrayIndexOf$1$1.call(listeners[i], this);
          ArraySplice$1$1.call(set, pos, 1);
        }

        listeners.length = 0;
      }
    } // friend methods


    notify() {
      this.callback.call(undefined, this);
    }

    link(reactiveObservers) {
      ArrayPush$1$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

      ArrayPush$1$1.call(this.listeners, reactiveObservers);
    }

  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function componentValueMutated(vm, key) {
    valueMutated(vm.component, key);
  }

  function componentValueObserved(vm, key) {
    valueObserved(vm.component, key);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function getComponentTag(vm) {
    return `<${StringToLowerCase$1.call(vm.tagName)}>`;
  } // TODO [#1695]: Unify getComponentStack and getErrorComponentStack

  function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;

    while (!isNull$1(currentVm)) {
      ArrayPush$1.call(wcStack, getComponentTag(currentVm));
      currentVm = currentVm.owner;
    }

    return wcStack.reverse().join('\n\t');
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function handleEvent(event, vnode) {
    const {
      type
    } = event;
    const {
      data: {
        on
      }
    } = vnode;
    const handler = on && on[type]; // call event handler if exists

    if (handler) {
      handler.call(undefined, event);
    }
  }

  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }

  function updateAllEventListeners(oldVnode, vnode) {
    if (isUndefined$1(oldVnode.listener)) {
      createAllEventListeners(vnode);
    } else {
      vnode.listener = oldVnode.listener;
      vnode.listener.vnode = vnode;
    }
  }

  function createAllEventListeners(vnode) {
    const {
      elm,
      data: {
        on
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$1(on)) {
      return;
    }

    const listener = vnode.listener = createListener();
    listener.vnode = vnode;
    let name;

    for (name in on) {
      renderer.addEventListener(elm, name, listener);
    }
  }

  var modEvents = {
    update: updateAllEventListeners,
    create: createAllEventListeners
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title']; // Few more exceptions that are using the attribute name to match the property in lowercase.
  // this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
  // and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  // Note: this list most be in sync with the compiler as well.

  const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];

  function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
  } // Global HTML Attributes & Properties
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


  const globalHTMLProperties = assign$1(create$1(null), {
    accessKey: {
      attribute: 'accesskey'
    },
    accessKeyLabel: {
      readOnly: true
    },
    className: {
      attribute: 'class',
      error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
    },
    contentEditable: {
      attribute: 'contenteditable'
    },
    dataset: {
      readOnly: true,
      error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
    },
    dir: {
      attribute: 'dir'
    },
    draggable: {
      attribute: 'draggable'
    },
    dropzone: {
      attribute: 'dropzone',
      readOnly: true
    },
    hidden: {
      attribute: 'hidden'
    },
    id: {
      attribute: 'id'
    },
    inputMode: {
      attribute: 'inputmode'
    },
    lang: {
      attribute: 'lang'
    },
    slot: {
      attribute: 'slot',
      error: 'Using the `slot` property is an anti-pattern.'
    },
    spellcheck: {
      attribute: 'spellcheck'
    },
    style: {
      attribute: 'style'
    },
    tabIndex: {
      attribute: 'tabindex'
    },
    title: {
      attribute: 'title'
    },
    translate: {
      attribute: 'translate'
    },
    // additional "global attributes" that are not present in the link above.
    isContentEditable: {
      readOnly: true
    },
    offsetHeight: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetHeight')
    },
    offsetLeft: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetLeft')
    },
    offsetParent: {
      readOnly: true
    },
    offsetTop: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetTop')
    },
    offsetWidth: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetWidth')
    },
    role: {
      attribute: 'role'
    }
  });
  const AttrNameToPropNameMap$1$1 = assign$1(create$1(null), AttrNameToPropNameMap$1);
  const PropNameToAttrNameMap$1$1 = assign$1(create$1(null), PropNameToAttrNameMap$1);
  forEach$1.call(defaultDefHTMLPropertyNames, propName => {
    const attrName = StringToLowerCase$1.call(propName);
    AttrNameToPropNameMap$1$1[attrName] = propName;
    PropNameToAttrNameMap$1$1[propName] = attrName;
  });
  forEach$1.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
    const attrName = StringToLowerCase$1.call(propName);
    AttrNameToPropNameMap$1$1[attrName] = propName;
    PropNameToAttrNameMap$1$1[propName] = attrName;
  });
  const CAPS_REGEX = /[A-Z]/g;
  /**
   * This method maps between property names
   * and the corresponding attribute name.
   */

  function getAttrNameFromPropName(propName) {
    if (isUndefined$1(PropNameToAttrNameMap$1$1[propName])) {
      PropNameToAttrNameMap$1$1[propName] = StringReplace$1.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
    }

    return PropNameToAttrNameMap$1$1[propName];
  }

  let controlledElement = null;
  let controlledAttributeName;

  function isAttributeLocked(elm, attrName) {
    return elm !== controlledElement || attrName !== controlledAttributeName;
  }

  function lockAttribute(_elm, _key) {
    controlledElement = null;
    controlledAttributeName = undefined;
  }

  function unlockAttribute(elm, key) {
    controlledElement = elm;
    controlledAttributeName = key;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const xlinkNS = 'http://www.w3.org/1999/xlink';
  const xmlNS = 'http://www.w3.org/XML/1998/namespace';
  const ColonCharCode = 58;

  function updateAttrs(oldVnode, vnode) {
    const {
      data: {
        attrs
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$1(attrs)) {
      return;
    }

    let {
      data: {
        attrs: oldAttrs
      }
    } = oldVnode;

    if (oldAttrs === attrs) {
      return;
    }

    const elm = vnode.elm;
    const {
      setAttribute,
      removeAttribute
    } = renderer;
    let key;
    oldAttrs = isUndefined$1(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
    // this routine is only useful for data-* attributes in all kind of elements
    // and aria-* in standard elements (custom elements will use props for these)

    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];

      if (old !== cur) {
        unlockAttribute(elm, key);

        if (StringCharCodeAt$1.call(key, 3) === ColonCharCode) {
          // Assume xml namespace
          setAttribute(elm, key, cur, xmlNS);
        } else if (StringCharCodeAt$1.call(key, 5) === ColonCharCode) {
          // Assume xlink namespace
          setAttribute(elm, key, cur, xlinkNS);
        } else if (isNull$1(cur)) {
          removeAttribute(elm, key);
        } else {
          setAttribute(elm, key, cur);
        }

        lockAttribute();
      }
    }
  }

  const emptyVNode = {
    data: {}
  };
  var modAttrs = {
    create: vnode => updateAttrs(emptyVNode, vnode),
    update: updateAttrs
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function isLiveBindingProp(sel, key) {
    // For properties with live bindings, we read values from the DOM element
    // instead of relying on internally tracked values.
    return sel === 'input' && (key === 'value' || key === 'checked');
  }

  function update(oldVnode, vnode) {
    const props = vnode.data.props;

    if (isUndefined$1(props)) {
      return;
    }

    const oldProps = oldVnode.data.props;

    if (oldProps === props) {
      return;
    }

    const isFirstPatch = isUndefined$1(oldProps);
    const {
      elm,
      sel,
      owner: {
        renderer
      }
    } = vnode;

    for (const key in props) {
      const cur = props[key]; // if it is the first time this element is patched, or the current value is different to the previous value...

      if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? renderer.getProperty(elm, key) : oldProps[key])) {
        renderer.setProperty(elm, key, cur);
      }
    }
  }

  const emptyVNode$1 = {
    data: {}
  };
  var modProps = {
    create: vnode => update(emptyVNode$1, vnode),
    update
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const classNameToClassMap = create$1(null);

  function getMapFromClassName(className) {
    // Intentionally using == to match undefined and null values from computed style attribute
    if (className == null) {
      return EmptyObject;
    } // computed class names must be string


    className = isString(className) ? className : className + '';
    let map = classNameToClassMap[className];

    if (map) {
      return map;
    }

    map = create$1(null);
    let start = 0;
    let o;
    const len = className.length;

    for (o = 0; o < len; o++) {
      if (StringCharCodeAt$1.call(className, o) === SPACE_CHAR) {
        if (o > start) {
          map[StringSlice$1.call(className, start, o)] = true;
        }

        start = o + 1;
      }
    }

    if (o > start) {
      map[StringSlice$1.call(className, start, o)] = true;
    }

    classNameToClassMap[className] = map;

    return map;
  }

  function updateClassAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        className: newClass
      },
      owner: {
        renderer
      }
    } = vnode;
    const {
      data: {
        className: oldClass
      }
    } = oldVnode;

    if (oldClass === newClass) {
      return;
    }

    const classList = renderer.getClassList(elm);
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    let name;

    for (name in oldClassMap) {
      // remove only if it is not in the new class collection and it is not set from within the instance
      if (isUndefined$1(newClassMap[name])) {
        classList.remove(name);
      }
    }

    for (name in newClassMap) {
      if (isUndefined$1(oldClassMap[name])) {
        classList.add(name);
      }
    }
  }

  const emptyVNode$2 = {
    data: {}
  };
  var modComputedClassName = {
    create: vnode => updateClassAttribute(emptyVNode$2, vnode),
    update: updateClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function updateStyleAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        style: newStyle
      },
      owner: {
        renderer
      }
    } = vnode;
    const {
      getStyleDeclaration,
      removeAttribute
    } = renderer;

    if (oldVnode.data.style === newStyle) {
      return;
    }

    const style = getStyleDeclaration(elm);

    if (!isString(newStyle) || newStyle === '') {
      removeAttribute(elm, 'style');
    } else {
      style.cssText = newStyle;
    }
  }

  const emptyVNode$3 = {
    data: {}
  };
  var modComputedStyle = {
    create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
    update: updateStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
  // different classnames properties individually instead of via a string.

  function createClassAttribute(vnode) {
    const {
      elm,
      data: {
        classMap
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$1(classMap)) {
      return;
    }

    const classList = renderer.getClassList(elm);

    for (const name in classMap) {
      classList.add(name);
    }
  }

  var modStaticClassName = {
    create: createClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline style into an object. It's faster to set the
  // different style properties individually instead of via a string.

  function createStyleAttribute(vnode) {
    const {
      elm,
      data: {
        styleMap
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$1(styleMap)) {
      return;
    }

    const style = renderer.getStyleDeclaration(elm);

    for (const name in styleMap) {
      style[name] = styleMap[name];
    }
  }

  var modStaticStyle = {
    create: createStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
  @license
  Copyright (c) 2015 Simon Friis Vindum.
  This code may only be used under the MIT License found at
  https://github.com/snabbdom/snabbdom/blob/master/LICENSE
  Code distributed by Snabbdom as part of the Snabbdom project at
  https://github.com/snabbdom/snabbdom/
  */

  function isUndef(s) {
    return s === undefined;
  }

  function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }

  function isVNode(vnode) {
    return vnode != null;
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

    for (j = beginIdx; j <= endIdx; ++j) {
      ch = children[j];

      if (isVNode(ch)) {
        key = ch.key;

        if (key !== undefined) {
          map[key] = j;
        }
      }
    }

    return map;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];

      if (isVNode(ch)) {
        ch.hook.create(ch);
        ch.hook.insert(ch, parentElm, before);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

      if (isVNode(ch)) {
        ch.hook.remove(ch, parentElm);
      }
    }
  }

  function updateDynamicChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!isVNode(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (!isVNode(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (!isVNode(newStartVnode)) {
        newStartVnode = newCh[++newStartIdx];
      } else if (!isVNode(newEndVnode)) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode);
        newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.owner.renderer.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode);
        newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = oldKeyToIdx[newStartVnode.key];

        if (isUndef(idxInOld)) {
          // New element
          newStartVnode.hook.create(newStartVnode);
          newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];

          if (isVNode(elmToMove)) {
            if (elmToMove.sel !== newStartVnode.sel) {
              // New element
              newStartVnode.hook.create(newStartVnode);
              newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode);
              oldCh[idxInOld] = undefined;
              newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
            }
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        const n = newCh[newEndIdx + 1];
        before = isVNode(n) ? n.elm : null;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function updateStaticChildren(parentElm, oldCh, newCh) {
    const {
      length
    } = newCh;

    if (oldCh.length === 0) {
      // the old list is empty, we can directly insert anything new
      addVnodes(parentElm, null, newCh, 0, length);
      return;
    } // if the old list is not empty, the new list MUST have the same
    // amount of nodes, that's why we call this static children


    let referenceElm = null;

    for (let i = length - 1; i >= 0; i -= 1) {
      const vnode = newCh[i];
      const oldVNode = oldCh[i];

      if (vnode !== oldVNode) {
        if (isVNode(oldVNode)) {
          if (isVNode(vnode)) {
            // both vnodes must be equivalent, and se just need to patch them
            patchVnode(oldVNode, vnode);
            referenceElm = vnode.elm;
          } else {
            // removing the old vnode since the new one is null
            oldVNode.hook.remove(oldVNode, parentElm);
          }
        } else if (isVNode(vnode)) {
          // this condition is unnecessary
          vnode.hook.create(vnode); // insert the new node one since the old one is null

          vnode.hook.insert(vnode, parentElm, referenceElm);
          referenceElm = vnode.elm;
        }
      }
    }
  }

  function patchVnode(oldVnode, vnode) {
    if (oldVnode !== vnode) {
      vnode.elm = oldVnode.elm;
      vnode.hook.update(oldVnode, vnode);
    }
  }
  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
  // to inject at runtime.


  const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
  const HTMLElementPrototype = HTMLElementConstructor.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This is a descriptor map that contains
   * all standard properties that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base HTML Element and
   * Base Lightning Element should support.
   */

  const HTMLElementOriginalDescriptors = create$1(null);
  forEach$1.call(keys$1(PropNameToAttrNameMap$1), propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  forEach$1.call(defaultDefHTMLPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
    // this category, so, better to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This operation is called with a descriptor of an standard html property
   * that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
   * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
   */

  function createBridgeToElementDescriptor(propName, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;

    if (!isFunction$1(get)) {

      throw new TypeError();
    }

    if (!isFunction$1(set)) {

      throw new TypeError();
    }

    return {
      enumerable,
      configurable,

      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {

          return;
        }

        componentValueObserved(vm, propName);
        return get.call(vm.elm);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (newValue !== vm.cmpProps[propName]) {
          vm.cmpProps[propName] = newValue;
          componentValueMutated(vm, propName);
        }

        return set.call(vm.elm, newValue);
      }

    };
  }
  /**
   * This class is the base class for any LWC element.
   * Some elements directly extends this class, others implement it via inheritance.
   **/


  function BaseLightningElementConstructor() {


    if (isNull$1(vmBeingConstructed)) {
      throw new ReferenceError('Illegal constructor');
    }

    const vm = vmBeingConstructed;
    const {
      elm,
      mode,
      renderer,
      def: {
        ctor
      }
    } = vm;

    const component = this;
    const cmpRoot = renderer.attachShadow(elm, {
      mode,
      delegatesFocus: !!ctor.delegatesFocus,
      '$$lwc-synthetic-mode$$': true
    });
    vm.component = this;
    vm.cmpRoot = cmpRoot; // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
    // component creation and passes hooks to instrument all the component interactions with the
    // engine. We are intentionally hiding this argument from the formal API of LightningElement
    // because we don't want folks to know about it just yet.

    if (arguments.length === 1) {
      const {
        callHook,
        setHook,
        getHook
      } = arguments[0];
      vm.callHook = callHook;
      vm.setHook = setHook;
      vm.getHook = getHook;
    } // Linking elm, shadow root and component with the VM.


    associateVM(component, vm);
    associateVM(cmpRoot, vm);
    associateVM(elm, vm); // Adding extra guard rails in DEV mode.

    return this;
  }

  BaseLightningElementConstructor.prototype = {
    constructor: BaseLightningElementConstructor,

    dispatchEvent(event) {
      const {
        elm,
        renderer: {
          dispatchEvent
        }
      } = getAssociatedVM(this);
      return dispatchEvent(elm, event);
    },

    addEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          addEventListener
        }
      } = vm;

      const wrappedListener = getWrappedComponentsListener(vm, listener);
      addEventListener(elm, type, wrappedListener, options);
    },

    removeEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          removeEventListener
        }
      } = vm;
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      removeEventListener(elm, type, wrappedListener, options);
    },

    hasAttribute(name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return !isNull$1(getAttribute(elm, name));
    },

    hasAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return !isNull$1(getAttribute(elm, name, namespace));
    },

    removeAttribute(name) {
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = getAssociatedVM(this);
      unlockAttribute(elm, name);
      removeAttribute(elm, name);
      lockAttribute();
    },

    removeAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = getAssociatedVM(this);
      unlockAttribute(elm, name);
      removeAttribute(elm, name, namespace);
      lockAttribute();
    },

    getAttribute(name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return getAttribute(elm, name);
    },

    getAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return getAttribute(elm, name, namespace);
    },

    setAttribute(name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;

      unlockAttribute(elm, name);
      setAttribute(elm, name, value);
      lockAttribute();
    },

    setAttributeNS(namespace, name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;

      unlockAttribute(elm, name);
      setAttribute(elm, name, value, namespace);
      lockAttribute();
    },

    getBoundingClientRect() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getBoundingClientRect
        }
      } = vm;

      return getBoundingClientRect(elm);
    },

    querySelector(selectors) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          querySelector
        }
      } = vm;

      return querySelector(elm, selectors);
    },

    querySelectorAll(selectors) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          querySelectorAll
        }
      } = vm;

      return querySelectorAll(elm, selectors);
    },

    getElementsByTagName(tagNameOrWildCard) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getElementsByTagName
        }
      } = vm;

      return getElementsByTagName(elm, tagNameOrWildCard);
    },

    getElementsByClassName(names) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getElementsByClassName
        }
      } = vm;

      return getElementsByClassName(elm, names);
    },

    get isConnected() {
      const {
        elm,
        renderer: {
          isConnected
        }
      } = getAssociatedVM(this);
      return isConnected(elm);
    },

    get classList() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getClassList
        }
      } = vm;

      return getClassList(elm);
    },

    get template() {
      const vm = getAssociatedVM(this);
      return vm.cmpRoot;
    },

    get shadowRoot() {
      // From within the component instance, the shadowRoot is always reported as "closed".
      // Authors should rely on this.template instead.
      return null;
    },

    render() {
      const vm = getAssociatedVM(this);
      return vm.def.template;
    },

    toString() {
      const vm = getAssociatedVM(this);
      return `[object ${vm.def.name}]`;
    }

  };
  const lightningBasedDescriptors = create$1(null);

  for (const propName in HTMLElementOriginalDescriptors) {
    lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
  }

  defineProperties$1(BaseLightningElementConstructor.prototype, lightningBasedDescriptors);
  defineProperty$1(BaseLightningElementConstructor, 'CustomElementConstructor', {
    get() {
      // If required, a runtime-specific implementation must be defined.
      throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
    },

    configurable: true
  });


  const BaseLightningElement = BaseLightningElementConstructor;

  function internalWireFieldDecorator(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        componentValueObserved(vm, key);
        return vm.cmpFields[key];
      },

      set(value) {
        const vm = getAssociatedVM(this);
        /**
         * Reactivity for wired fields is provided in wiring.
         * We intentionally add reactivity here since this is just
         * letting the author to do the wrong thing, but it will keep our
         * system to be backward compatible.
         */

        if (value !== vm.cmpFields[key]) {
          vm.cmpFields[key] = value;
          componentValueMutated(vm, key);
        }
      },

      enumerable: true,
      configurable: true
    };
  }
  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */


  const {
    isArray: isArray$1$1
  } = Array;
  const {
    getPrototypeOf: getPrototypeOf$1$1,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    defineProperties: ObjectDefineProperties,
    isExtensible,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$1,
    getOwnPropertyNames: getOwnPropertyNames$1$1,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty: hasOwnProperty$1$1
  } = Object;
  const {
    push: ArrayPush$2,
    concat: ArrayConcat,
    map: ArrayMap$1$1
  } = Array.prototype;

  function isUndefined$2(obj) {
    return obj === undefined;
  }

  function isFunction$1$1(obj) {
    return typeof obj === 'function';
  }

  function isObject$1$1(obj) {
    return typeof obj === 'object';
  }

  const proxyToValueMap = new WeakMap();

  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }

  const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  function wrapValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
  }
  /**
   * Unwrap property descriptors will set value on original descriptor
   * We only need to unwrap if value is specified
   * @param descriptor external descrpitor provided to define new property on original value
   */


  function unwrapDescriptor(descriptor) {
    if (hasOwnProperty$1$1.call(descriptor, 'value')) {
      descriptor.value = unwrap(descriptor.value);
    }

    return descriptor;
  }

  function lockShadowTarget(membrane, shadowTarget, originalTarget) {
    const targetKeys = ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      let descriptor = getOwnPropertyDescriptor$1$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
      // Because we can deal with wrapping it when user goes through
      // Get own property descriptor. There is also a chance that this descriptor
      // could change sometime in the future, so we can defer wrapping
      // until we need to

      if (!descriptor.configurable) {
        descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
      }

      ObjectDefineProperty(shadowTarget, key, descriptor);
    });
    preventExtensions(shadowTarget);
  }

  class ReactiveProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getProxy(value);
    }

    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      const oldValue = originalTarget[key];

      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated(originalTarget, key);
      } else if (key === 'length' && isArray$1$1(originalTarget)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        valueMutated(originalTarget, key);
      }

      return true;
    }

    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      delete originalTarget[key];
      valueMutated(originalTarget, key);
      return true;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    isExtensible(shadowTarget) {
      const shadowIsExtensible = isExtensible(shadowTarget);

      if (!shadowIsExtensible) {
        return shadowIsExtensible;
      }

      const {
        originalTarget,
        membrane
      } = this;
      const targetIsExtensible = isExtensible(originalTarget);

      if (!targetIsExtensible) {
        lockShadowTarget(membrane, shadowTarget, originalTarget);
      }

      return targetIsExtensible;
    }

    setPrototypeOf(shadowTarget, prototype) {
    }

    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf$1$1(originalTarget);
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value, setter or getter (if available) cannot observe
      // mutations, just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapValue);

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      const {
        originalTarget,
        membrane
      } = this;
      lockShadowTarget(membrane, shadowTarget, originalTarget);
      preventExtensions(originalTarget);
      return true;
    }

    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueMutated
      } = membrane;
      const {
        configurable
      } = descriptor; // We have to check for value in descriptor
      // because Object.freeze(proxy) calls this method
      // with only { configurable: false, writeable: false }
      // Additionally, method will only be called with writeable:false
      // if the descriptor has a value, as opposed to getter/setter
      // So we can just check if writable is present and then see if
      // value is present. This eliminates getter and setter descriptors

      if (hasOwnProperty$1$1.call(descriptor, 'writable') && !hasOwnProperty$1$1.call(descriptor, 'value')) {
        const originalDescriptor = getOwnPropertyDescriptor$1$1(originalTarget, key);
        descriptor.value = originalDescriptor.value;
      }

      ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

      if (configurable === false) {
        ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
      }

      valueMutated(originalTarget, key);
      return true;
    }

  }

  function wrapReadOnlyValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
  }

  class ReadOnlyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        membrane,
        originalTarget
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getReadOnlyProxy(value);
    }

    set(shadowTarget, key, value) {

      return false;
    }

    deleteProperty(shadowTarget, key) {

      return false;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    setPrototypeOf(shadowTarget, prototype) {
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

      if (isUndefined$2(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

      if (!isUndefined$2(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value or getter (if available) cannot be observed,
      // just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

      if (hasOwnProperty$1$1.call(desc, 'set')) {
        desc.set = undefined; // readOnly membrane does not allow setters
      }

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {

      return false;
    }

    defineProperty(shadowTarget, key, descriptor) {

      return false;
    }

  }

  function createShadowTarget(value) {
    let shadowTarget = undefined;

    if (isArray$1$1(value)) {
      shadowTarget = [];
    } else if (isObject$1$1(value)) {
      shadowTarget = {};
    }

    return shadowTarget;
  }

  const ObjectDotPrototype = Object.prototype;

  function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
      return false;
    } // treat all non-object types, including undefined, as non-observable values


    if (typeof value !== 'object') {
      return false;
    }

    if (isArray$1$1(value)) {
      return true;
    }

    const proto = getPrototypeOf$1$1(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1$1(proto) === null;
  }

  const defaultValueObserved = (obj, key) => {
    /* do nothing */
  };

  const defaultValueMutated = (obj, key) => {
    /* do nothing */
  };

  const defaultValueDistortion = value => value;

  function wrapDescriptor(membrane, descriptor, getValue) {
    const {
      set,
      get
    } = descriptor;

    if (hasOwnProperty$1$1.call(descriptor, 'value')) {
      descriptor.value = getValue(membrane, descriptor.value);
    } else {
      if (!isUndefined$2(get)) {
        descriptor.get = function () {
          // invoking the original getter with the original target
          return getValue(membrane, get.call(unwrap(this)));
        };
      }

      if (!isUndefined$2(set)) {
        descriptor.set = function (value) {
          // At this point we don't have a clear indication of whether
          // or not a valid mutation will occur, we don't have the key,
          // and we are not sure why and how they are invoking this setter.
          // Nevertheless we preserve the original semantics by invoking the
          // original setter with the original target and the unwrapped value
          set.call(unwrap(this), membrane.unwrapProxy(value));
        };
      }
    }

    return descriptor;
  }

  class ReactiveMembrane {
    constructor(options) {
      this.valueDistortion = defaultValueDistortion;
      this.valueMutated = defaultValueMutated;
      this.valueObserved = defaultValueObserved;
      this.valueIsObservable = defaultValueIsObservable;
      this.objectGraph = new WeakMap();

      if (!isUndefined$2(options)) {
        const {
          valueDistortion,
          valueMutated,
          valueObserved,
          valueIsObservable
        } = options;
        this.valueDistortion = isFunction$1$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
        this.valueMutated = isFunction$1$1(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction$1$1(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction$1$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
      }
    }

    getProxy(value) {
      const unwrappedValue = unwrap(value);
      const distorted = this.valueDistortion(unwrappedValue);

      if (this.valueIsObservable(distorted)) {
        const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
        // we return the readonly.

        return o.readOnly === value ? value : o.reactive;
      }

      return distorted;
    }

    getReadOnlyProxy(value) {
      value = unwrap(value);
      const distorted = this.valueDistortion(value);

      if (this.valueIsObservable(distorted)) {
        return this.getReactiveState(value, distorted).readOnly;
      }

      return distorted;
    }

    unwrapProxy(p) {
      return unwrap(p);
    }

    getReactiveState(value, distortedValue) {
      const {
        objectGraph
      } = this;
      let reactiveState = objectGraph.get(distortedValue);

      if (reactiveState) {
        return reactiveState;
      }

      const membrane = this;
      reactiveState = {
        get reactive() {
          const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'reactive', {
            value: proxy
          });
          return proxy;
        },

        get readOnly() {
          const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'readOnly', {
            value: proxy
          });
          return proxy;
        }

      };
      objectGraph.set(distortedValue, reactiveState);
      return reactiveState;
    }

  }
  /** version: 0.26.0 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function valueDistortion(value) {
    return value;
  }

  const reactiveMembrane = new ReactiveMembrane({
    valueObserved,
    valueMutated,
    valueDistortion
  });

  function internalTrackDecorator(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        componentValueObserved(vm, key);
        return vm.cmpFields[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

        if (reactiveOrAnyValue !== vm.cmpFields[key]) {
          vm.cmpFields[key] = reactiveOrAnyValue;
          componentValueMutated(vm, key);
        }
      },

      enumerable: true,
      configurable: true
    };
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    assign: assign$1$1,
    create: create$2,
    defineProperties: defineProperties$1$1,
    defineProperty: defineProperty$1$1,
    freeze: freeze$1$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
    getOwnPropertyNames: getOwnPropertyNames$2,
    getPrototypeOf: getPrototypeOf$2,
    hasOwnProperty: hasOwnProperty$2,
    isFrozen: isFrozen$1$1,
    keys: keys$1$1,
    seal: seal$1$1,
    setPrototypeOf: setPrototypeOf$1$1
  } = Object;
  const {
    filter: ArrayFilter$1$1,
    find: ArrayFind$1$1,
    indexOf: ArrayIndexOf$2,
    join: ArrayJoin$1$1,
    map: ArrayMap$2,
    push: ArrayPush$3,
    reduce: ArrayReduce$1$1,
    reverse: ArrayReverse$1$1,
    slice: ArraySlice$1$1,
    splice: ArraySplice$2,
    unshift: ArrayUnshift$1$1,
    forEach: forEach$1$1
  } = Array.prototype;
  const {
    charCodeAt: StringCharCodeAt$1$1,
    replace: StringReplace$1$1,
    slice: StringSlice$1$1,
    toLowerCase: StringToLowerCase$1$1
  } = String.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
   * ariaGrabbed) are deprecated:
   * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
   *
   * The above list of 46 aria attributes is consistent with the following resources:
   * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
   * https://wicg.github.io/aom/spec/aria-reflection.html
   */


  const AriaPropertyNames$1$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
  const AttrNameToPropNameMap$2 = create$2(null);
  const PropNameToAttrNameMap$2 = create$2(null); // Synthetic creation of all AOM property descriptors for Custom Elements

  forEach$1$1.call(AriaPropertyNames$1$1, propName => {
    // Typescript infers the wrong function type for this particular overloaded method:
    // https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = StringToLowerCase$1$1.call(StringReplace$1$1.call(propName, /^aria/, 'aria-'));
    AttrNameToPropNameMap$2[attrName] = propName;
    PropNameToAttrNameMap$2[propName] = attrName;
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Inspired from: https://mathiasbynens.be/notes/globalthis

  const _globalThis$1$1 = function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
      return globalThis;
    }

    let _globalThis;

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // __magic__ is undefined in Safari 10 and IE10 and older.
      // @ts-ignore
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a legacy browser.
      // Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        // @ts-ignore
        _globalThis = window;
      }
    }

    return _globalThis;
  }();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /*
   * In IE11, symbols are expensive.
   * Due to the nature of the symbol polyfill. This method abstract the
   * creation of symbols, so we can fallback to string when native symbols
   * are not supported. Note that we can't use typeof since it will fail when transpiling.
   */


  const hasNativeSymbolsSupport$1$1 = Symbol('x').toString() === 'Symbol(x)';
  const HTML_ATTRIBUTES_TO_PROPERTY$1$1 = {
    accesskey: 'accessKey',
    readonly: 'readOnly',
    tabindex: 'tabIndex',
    bgcolor: 'bgColor',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    contenteditable: 'contentEditable',
    crossorigin: 'crossOrigin',
    datetime: 'dateTime',
    formaction: 'formAction',
    ismap: 'isMap',
    maxlength: 'maxLength',
    minlength: 'minLength',
    novalidate: 'noValidate',
    usemap: 'useMap',
    for: 'htmlFor'
  };
  keys$1$1(HTML_ATTRIBUTES_TO_PROPERTY$1$1).forEach(attrName => {});
  /** version: 1.7.7 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  if (!_globalThis$1$1.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis$1$1, 'lwcRuntimeFlags', {
      value: create$2(null)
    });
  }

  const runtimeFlags = _globalThis$1$1.lwcRuntimeFlags; // This function is not supported for use within components and is meant for

  function createPublicPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {

          return;
        }

        componentValueObserved(vm, key);
        return vm.cmpProps[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        vm.cmpProps[key] = newValue;
        componentValueMutated(vm, key);
      },

      enumerable: true,
      configurable: true
    };
  }

  class AccessorReactiveObserver extends ReactiveObserver {
    constructor(vm, set) {
      super(() => {
        if (isFalse$1$1(this.debouncing)) {
          this.debouncing = true;
          addCallbackToNextTick(() => {
            if (isTrue$1$1(this.debouncing)) {
              const {
                value
              } = this;
              const {
                isDirty: dirtyStateBeforeSetterCall,
                component,
                idx
              } = vm;
              set.call(component, value); // de-bouncing after the call to the original setter to prevent
              // infinity loop if the setter itself is mutating things that
              // were accessed during the previous invocation.

              this.debouncing = false;

              if (isTrue$1$1(vm.isDirty) && isFalse$1$1(dirtyStateBeforeSetterCall) && idx > 0) {
                // immediate rehydration due to a setter driven mutation, otherwise
                // the component will get rendered on the second tick, which it is not
                // desirable.
                rerenderVM(vm);
              }
            }
          });
        }
      });
      this.debouncing = false;
    }

    reset(value) {
      super.reset();
      this.debouncing = false;

      if (arguments.length > 0) {
        this.value = value;
      }
    }

  }

  function createPublicAccessorDescriptor(key, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;

    if (!isFunction$1(get)) {

      throw new Error();
    }

    return {
      get() {

        return get.call(this);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (set) {
          if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
            let ro = vm.oar[key];

            if (isUndefined$1(ro)) {
              ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
            } // every time we invoke this setter from outside (through this wrapper setter)
            // we should reset the value and then debounce just in case there is a pending
            // invocation the next tick that is not longer relevant since the value is changing
            // from outside.


            ro.reset(newValue);
            ro.observe(() => {
              set.call(this, newValue);
            });
          } else {
            set.call(this, newValue);
          }
        }
      },

      enumerable,
      configurable
    };
  }

  function createObservedFieldPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        componentValueObserved(vm, key);
        return vm.cmpFields[key];
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        if (newValue !== vm.cmpFields[key]) {
          vm.cmpFields[key] = newValue;
          componentValueMutated(vm, key);
        }
      },

      enumerable: true,
      configurable: true
    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var PropType;

  (function (PropType) {
    PropType[PropType["Field"] = 0] = "Field";
    PropType[PropType["Set"] = 1] = "Set";
    PropType[PropType["Get"] = 2] = "Get";
    PropType[PropType["GetSet"] = 3] = "GetSet";
  })(PropType || (PropType = {}));
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by user-land code.
   */


  function registerDecorators(Ctor, meta) {
    const proto = Ctor.prototype;
    const {
      publicProps,
      publicMethods,
      wire,
      track,
      fields
    } = meta;
    const apiMethods = create$1(null);
    const apiFields = create$1(null);
    const wiredMethods = create$1(null);
    const wiredFields = create$1(null);
    const observedFields = create$1(null);
    const apiFieldsConfig = create$1(null);
    let descriptor;

    if (!isUndefined$1(publicProps)) {
      for (const fieldName in publicProps) {
        const propConfig = publicProps[fieldName];
        apiFieldsConfig[fieldName] = propConfig.config;
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

        if (propConfig.config > 0) {

          if (isUndefined$1(descriptor)) {
            throw new Error();
          }

          descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
        } else {

          descriptor = createPublicPropertyDescriptor(fieldName);
        }

        apiFields[fieldName] = descriptor;
        defineProperty$1(proto, fieldName, descriptor);
      }
    }

    if (!isUndefined$1(publicMethods)) {
      forEach$1.call(publicMethods, methodName => {
        descriptor = getOwnPropertyDescriptor$1(proto, methodName);

        if (isUndefined$1(descriptor)) {
          throw new Error();
        }

        apiMethods[methodName] = descriptor;
      });
    }

    if (!isUndefined$1(wire)) {
      for (const fieldOrMethodName in wire) {
        const {
          adapter,
          method,
          config: configCallback,
          dynamic = []
        } = wire[fieldOrMethodName];
        descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);

        if (method === 1) {

          if (isUndefined$1(descriptor)) {
            throw new Error();
          }

          wiredMethods[fieldOrMethodName] = descriptor;
          storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
        } else {

          descriptor = internalWireFieldDecorator(fieldOrMethodName);
          wiredFields[fieldOrMethodName] = descriptor;
          storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
          defineProperty$1(proto, fieldOrMethodName, descriptor);
        }
      }
    }

    if (!isUndefined$1(track)) {
      for (const fieldName in track) {
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

        descriptor = internalTrackDecorator(fieldName);
        defineProperty$1(proto, fieldName, descriptor);
      }
    }

    if (!isUndefined$1(fields)) {
      for (let i = 0, n = fields.length; i < n; i++) {
        const fieldName = fields[i];
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

        observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
      }
    }

    setDecoratorsMeta(Ctor, {
      apiMethods,
      apiFields,
      apiFieldsConfig,
      wiredMethods,
      wiredFields,
      observedFields
    });
    return Ctor;
  }

  const signedDecoratorToMetaMap = new Map();

  function setDecoratorsMeta(Ctor, meta) {
    signedDecoratorToMetaMap.set(Ctor, meta);
  }

  const defaultMeta = {
    apiMethods: EmptyObject,
    apiFields: EmptyObject,
    apiFieldsConfig: EmptyObject,
    wiredMethods: EmptyObject,
    wiredFields: EmptyObject,
    observedFields: EmptyObject
  };

  function getDecoratorsMeta(Ctor) {
    const meta = signedDecoratorToMetaMap.get(Ctor);
    return isUndefined$1(meta) ? defaultMeta : meta;
  }

  const signedTemplateSet = new Set();

  function defaultEmptyTemplate() {
    return [];
  }

  signedTemplateSet.add(defaultEmptyTemplate);

  function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
  }
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */


  function registerTemplate(tpl) {
    signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation

    return tpl;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // from the element instance, and get the value or set a new value on the component.
  // This means that across different elements, similar names can get the exact same
  // descriptor, so we can cache them:


  const cachedGetterByKey = create$1(null);
  const cachedSetterByKey = create$1(null);

  function createGetter(key) {
    let fn = cachedGetterByKey[key];

    if (isUndefined$1(fn)) {
      fn = cachedGetterByKey[key] = function () {
        const vm = getAssociatedVM(this);
        const {
          getHook
        } = vm;
        return getHook(vm.component, key);
      };
    }

    return fn;
  }

  function createSetter(key) {
    let fn = cachedSetterByKey[key];

    if (isUndefined$1(fn)) {
      fn = cachedSetterByKey[key] = function (newValue) {
        const vm = getAssociatedVM(this);
        const {
          setHook
        } = vm;
        newValue = reactiveMembrane.getReadOnlyProxy(newValue);
        setHook(vm.component, key, newValue);
      };
    }

    return fn;
  }

  function createMethodCaller(methodName) {
    return function () {
      const vm = getAssociatedVM(this);
      const {
        callHook,
        component
      } = vm;
      const fn = component[methodName];
      return callHook(vm.component, fn, ArraySlice$2.call(arguments));
    };
  }

  function HTMLBridgeElementFactory(SuperClass, props, methods) {
    let HTMLBridgeElement;
    /**
     * Modern browsers will have all Native Constructors as regular Classes
     * and must be instantiated with the new keyword. In older browsers,
     * specifically IE11, those are objects with a prototype property defined,
     * since they are not supposed to be extended or instantiated with the
     * new keyword. This forking logic supports both cases, specifically because
     * wc.ts relies on the construction path of the bridges to create new
     * fully qualifying web components.
     */

    if (isFunction$1(SuperClass)) {
      HTMLBridgeElement = class extends SuperClass {};
    } else {
      HTMLBridgeElement = function () {
        // Bridge classes are not supposed to be instantiated directly in
        // browsers that do not support web components.
        throw new TypeError('Illegal constructor');
      }; // prototype inheritance dance


      setPrototypeOf$1(HTMLBridgeElement, SuperClass);
      setPrototypeOf$1(HTMLBridgeElement.prototype, SuperClass.prototype);
      defineProperty$1(HTMLBridgeElement.prototype, 'constructor', {
        writable: true,
        configurable: true,
        value: HTMLBridgeElement
      });
    }

    const descriptors = create$1(null); // expose getters and setters for each public props on the new Element Bridge

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      descriptors[propName] = {
        get: createGetter(propName),
        set: createSetter(propName),
        enumerable: true,
        configurable: true
      };
    } // expose public methods as props on the new Element Bridge


    for (let i = 0, len = methods.length; i < len; i += 1) {
      const methodName = methods[i];
      descriptors[methodName] = {
        value: createMethodCaller(methodName),
        writable: true,
        configurable: true
      };
    }

    defineProperties$1(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
  }

  const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
  freeze$1(BaseBridgeElement);
  seal$1(BaseBridgeElement.prototype);
  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function resolveCircularModuleDependency(fn) {
    return fn();
  }

  function isCircularModuleDependency(obj) {
    return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CtorToDefMap = new WeakMap();

  function getCtorProto(Ctor) {
    let proto = getPrototypeOf$1(Ctor);

    if (isNull$1(proto)) {
      throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
    } // covering the cases where the ref is circular in AMD


    if (isCircularModuleDependency(proto)) {
      const p = resolveCircularModuleDependency(proto);
      // of our Base class without having to leak it to user-land. If the circular function returns
      // itself, that's the signal that we have hit the end of the proto chain, which must always
      // be base.


      proto = p === proto ? BaseLightningElement : p;
    }

    return proto;
  }

  function createComponentDef(Ctor) {

    const decoratorsMeta = getDecoratorsMeta(Ctor);
    const {
      apiFields,
      apiFieldsConfig,
      apiMethods,
      wiredFields,
      wiredMethods,
      observedFields
    } = decoratorsMeta;
    const proto = Ctor.prototype;
    let {
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    } = proto;
    const superProto = getCtorProto(Ctor);
    const superDef = superProto !== BaseLightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
    const bridge = HTMLBridgeElementFactory(superDef.bridge, keys$1(apiFields), keys$1(apiMethods));
    const props = assign$1(create$1(null), superDef.props, apiFields);
    const propsConfig = assign$1(create$1(null), superDef.propsConfig, apiFieldsConfig);
    const methods = assign$1(create$1(null), superDef.methods, apiMethods);
    const wire = assign$1(create$1(null), superDef.wire, wiredFields, wiredMethods);
    connectedCallback = connectedCallback || superDef.connectedCallback;
    disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
    renderedCallback = renderedCallback || superDef.renderedCallback;
    errorCallback = errorCallback || superDef.errorCallback;
    render = render || superDef.render;
    const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
    const name = Ctor.name || superDef.name; // installing observed fields into the prototype.

    defineProperties$1(proto, observedFields);
    const def = {
      ctor: Ctor,
      name,
      wire,
      props,
      propsConfig,
      methods,
      bridge,
      template,
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    };

    return def;
  }
  /**
   * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
   * subject to change or being removed.
   */


  function isComponentConstructor(ctor) {
    if (!isFunction$1(ctor)) {
      return false;
    } // Fast path: LightningElement is part of the prototype chain of the constructor.


    if (ctor.prototype instanceof BaseLightningElement) {
      return true;
    } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
    // climb up the constructor prototype chain to check in case there are circular dependencies
    // to resolve.


    let current = ctor;

    do {
      if (isCircularModuleDependency(current)) {
        const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end
        // of the proto chain, which must always be a valid base constructor.

        if (circularResolved === current) {
          return true;
        }

        current = circularResolved;
      }

      if (current === BaseLightningElement) {
        return true;
      }
    } while (!isNull$1(current) && (current = getPrototypeOf$1(current))); // Finally return false if the LightningElement is not part of the prototype chain.


    return false;
  }

  function getComponentInternalDef(Ctor) {
    let def = CtorToDefMap.get(Ctor);

    if (isUndefined$1(def)) {
      if (isCircularModuleDependency(Ctor)) {
        const resolvedCtor = resolveCircularModuleDependency(Ctor);
        def = getComponentInternalDef(resolvedCtor); // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
        // look up the definition in cache instead of re-resolving and recreating the def.

        CtorToDefMap.set(Ctor, def);
        return def;
      }

      if (!isComponentConstructor(Ctor)) {
        throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
      }

      def = createComponentDef(Ctor);
      CtorToDefMap.set(Ctor, def);
    }

    return def;
  }
  /** Set prototype for public methods and properties on the element. No DOM Patching occurs here. */


  function setElementProto(elm, def) {
    setPrototypeOf$1(elm, def.bridge.prototype);
  }

  const lightingElementDef = {
    ctor: BaseLightningElement,
    name: BaseLightningElement.name,
    props: lightningBasedDescriptors,
    propsConfig: EmptyObject,
    methods: EmptyObject,
    wire: EmptyObject,
    bridge: BaseBridgeElement,
    template: defaultEmptyTemplate,
    render: BaseLightningElement.prototype.render
  };
  var PropDefType;

  (function (PropDefType) {
    PropDefType["any"] = "any";
  })(PropDefType || (PropDefType = {}));
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const noop = () => void 0;

  function observeElementChildNodes(elm) {
    elm.$domManual$ = true;
  }

  function setElementShadowToken(elm, token) {
    elm.$shadowToken$ = token;
  }

  function updateNodeHook(oldVnode, vnode) {
    const {
      elm,
      text,
      owner: {
        renderer
      }
    } = vnode;

    if (oldVnode.text !== text) {

      renderer.setText(elm, text);
    }
  }

  function insertNodeHook(vnode, parentNode, referenceNode) {
    const {
      renderer
    } = vnode.owner;

    renderer.insert(vnode.elm, parentNode, referenceNode);
  }

  function removeNodeHook(vnode, parentNode) {
    const {
      renderer
    } = vnode.owner;

    renderer.remove(vnode.elm, parentNode);
  }

  function createElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
  }

  var LWCDOMMode;

  (function (LWCDOMMode) {
    LWCDOMMode["manual"] = "manual";
  })(LWCDOMMode || (LWCDOMMode = {}));

  function fallbackElmHook(elm, vnode) {
    const {
      owner
    } = vnode;

    if (isTrue$1$1(owner.renderer.syntheticShadow)) {
      const {
        data: {
          context
        }
      } = vnode;
      const {
        shadowAttribute
      } = owner.context;

      if (!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
        // this element will now accept any manual content inserted into it
        observeElementChildNodes(elm);
      } // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.


      setElementShadowToken(elm, shadowAttribute);
    }
  }

  function updateElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function insertCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);
    appendVM(vm);
  }

  function updateChildrenHook(oldVnode, vnode) {
    const {
      children,
      owner
    } = vnode;
    const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
    runWithBoundaryProtection(owner, owner.owner, noop, () => {
      fn(vnode.elm, oldVnode.children, children);
    }, noop);
  }

  function allocateChildrenHook(vnode) {
    const vm = getAssociatedVM(vnode.elm); // A component with slots will re-render because:
    // 1- There is a change of the internal state.
    // 2- There is a change on the external api (ex: slots)
    //
    // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
    // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
    // in a reused VCustomElement, there won't be any slotted children.
    // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
    //
    // In case #2, we will always get a fresh VCustomElement.

    const children = vnode.aChildren || vnode.children;
    vm.aChildren = children;

    if (isTrue$1$1(vm.renderer.syntheticShadow)) {
      // slow path
      allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

      vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

      vnode.children = EmptyArray;
    }
  }

  function createViewModelHook(elm, vnode) {
    if (!isUndefined$1(getAssociatedVMIfPresent(elm))) {
      // There is a possibility that a custom element is registered under tagName,
      // in which case, the initialization is already carry on, and there is nothing else
      // to do here since this hook is called right after invoking `document.createElement`.
      return;
    }

    const {
      sel,
      mode,
      ctor,
      owner
    } = vnode;
    const def = getComponentInternalDef(ctor);
    setElementProto(elm, def);

    if (isTrue$1$1(owner.renderer.syntheticShadow)) {
      const {
        shadowAttribute
      } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.

      setElementShadowToken(elm, shadowAttribute);
    }

    createVM(elm, def, {
      mode,
      owner,
      tagName: sel,
      renderer: owner.renderer
    });
  }

  function createCustomElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
  }

  function createChildrenHook(vnode) {
    const {
      elm,
      children
    } = vnode;

    for (let j = 0; j < children.length; ++j) {
      const ch = children[j];

      if (ch != null) {
        ch.hook.create(ch);
        ch.hook.insert(ch, elm, null);
      }
    }
  }

  function rerenderCustomElmHook(vnode) {
    const vm = getAssociatedVM(vnode.elm);

    rerenderVM(vm);
  }

  function updateCustomElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function removeElmHook(vnode) {
    // this method only needs to search on child vnodes from template
    // to trigger the remove hook just in case some of those children
    // are custom elements.
    const {
      children,
      elm
    } = vnode;

    for (let j = 0, len = children.length; j < len; ++j) {
      const ch = children[j];

      if (!isNull$1(ch)) {
        ch.hook.remove(ch, elm);
      }
    }
  }

  function removeCustomElmHook(vnode) {
    // for custom elements we don't have to go recursively because the removeVM routine
    // will take care of disconnecting any child VM attached to its shadow as well.
    removeVM(getAssociatedVM(vnode.elm));
  } // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


  const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
  // in a template, and will require a more complex diffing algo.

  function markAsDynamicChildren(children) {
    FromIteration.set(children, 1);
  }

  function hasDynamicChildren(children) {
    return FromIteration.has(children);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CHAR_S = 115;
  const CHAR_V = 118;
  const CHAR_G = 103;
  const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
  const SymbolIterator = Symbol.iterator;
  const TextHook = {
    create: vnode => {
      const {
        renderer
      } = vnode.owner;
      const elm = renderer.createText(vnode.text);
      linkNodeToShadow(elm, vnode);
      vnode.elm = elm;
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  }; // insert is called after update, which is used somewhere else (via a module)
  // to mark the vm as inserted, that means we cannot use update as the main channel
  // to rehydrate when dirty, because sometimes the element is not inserted just yet,
  // which breaks some invariants. For that reason, we have the following for any
  // Custom Element that is inserted via a template.

  const ElementHook = {
    create: vnode => {
      const {
        sel,
        data: {
          ns
        },
        owner: {
          renderer
        }
      } = vnode;
      const elm = renderer.createElement(sel, ns);
      linkNodeToShadow(elm, vnode);
      fallbackElmHook(elm, vnode);
      vnode.elm = elm;
      createElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateElmHook(oldVnode, vnode);
      updateChildrenHook(oldVnode, vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      createChildrenHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeElmHook(vnode);
    }
  };
  const CustomElementHook = {
    create: vnode => {
      const {
        sel,
        owner: {
          renderer
        }
      } = vnode;
      const elm = renderer.createElement(sel);
      linkNodeToShadow(elm, vnode);
      createViewModelHook(elm, vnode);
      vnode.elm = elm;
      allocateChildrenHook(vnode);
      createCustomElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateCustomElmHook(oldVnode, vnode); // in fallback mode, the allocation will always set children to
      // empty and delegate the real allocation to the slot elements

      allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
      // will happen, but in native, it does allocate the light dom

      updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

      rerenderCustomElmHook(vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      const vm = getAssociatedVM(vnode.elm);

      runConnectedCallback(vm);
      createChildrenHook(vnode);
      insertCustomElmHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeCustomElmHook(vnode);
    }
  };

  function linkNodeToShadow(elm, vnode) {
    // TODO [#1164]: this should eventually be done by the polyfill directly
    elm.$shadowResolver$ = vnode.owner.cmpRoot.$shadowResolver$;
  } // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element


  function addNS(vnode) {
    const {
      data,
      children,
      sel
    } = vnode;
    data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

    if (isArray$2(children) && sel !== 'foreignObject') {
      for (let j = 0, n = children.length; j < n; ++j) {
        const childNode = children[j];

        if (childNode != null && childNode.hook === ElementHook) {
          addNS(childNode);
        }
      }
    }
  }

  function addVNodeToChildLWC(vnode) {
    ArrayPush$1.call(getVMBeingRendered().velements, vnode);
  } // [h]tml node


  function h(sel, data, children) {
    const vmBeingRendered = getVMBeingRendered();

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: ElementHook,
      owner: vmBeingRendered
    };

    if (sel.length === 3 && StringCharCodeAt$1.call(sel, 0) === CHAR_S && StringCharCodeAt$1.call(sel, 1) === CHAR_V && StringCharCodeAt$1.call(sel, 2) === CHAR_G) {
      addNS(vnode);
    }

    return vnode;
  } // [t]ab[i]ndex function


  function ti(value) {
    // if value is greater than 0, we normalize to 0
    // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
    // If value is less than -1, we don't care
    const shouldNormalize = value > 0 && !(isTrue$1$1(value) || isFalse$1$1(value));

    return shouldNormalize ? 0 : value;
  } // [s]lot element node


  function s(slotName, data, children, slotset) {

    if (!isUndefined$1(slotset) && !isUndefined$1(slotset[slotName]) && slotset[slotName].length !== 0) {
      children = slotset[slotName];
    }

    const vnode = h('slot', data, children);

    if (vnode.owner.renderer.syntheticShadow) {
      // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
      sc(children);
    }

    return vnode;
  } // [c]ustom element node


  function c(sel, Ctor, data, children = EmptyArray) {
    const vmBeingRendered = getVMBeingRendered();

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CustomElementHook,
      ctor: Ctor,
      owner: vmBeingRendered,
      mode: 'open'
    };
    addVNodeToChildLWC(vnode);
    return vnode;
  } // [i]terable node


  function i(iterable, factory) {
    const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(list);

    if (isUndefined$1(iterable) || iterable === null) {

      return list;
    }

    const iterator = iterable[SymbolIterator]();

    let next = iterator.next();
    let j = 0;
    let {
      value,
      done: last
    } = next;

    while (last === false) {
      // implementing a look-back-approach because we need to know if the element is the last
      next = iterator.next();
      last = next.done; // template factory logic based on the previous collected value

      const vnode = factory(value, j, j === 0, last);

      if (isArray$2(vnode)) {
        ArrayPush$1.apply(list, vnode);
      } else {
        ArrayPush$1.call(list, vnode);
      }


      j += 1;
      value = next.value;
    }

    return list;
  }
  /**
   * [f]lattening
   */


  function f(items) {

    const len = items.length;
    const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(flattened);

    for (let j = 0; j < len; j += 1) {
      const item = items[j];

      if (isArray$2(item)) {
        ArrayPush$1.apply(flattened, item);
      } else {
        ArrayPush$1.call(flattened, item);
      }
    }

    return flattened;
  } // [t]ext node


  function t(text) {
    const data = EmptyObject;
    let sel, children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: TextHook,
      owner: getVMBeingRendered()
    };
  } // [d]ynamic value to produce a text vnode


  function d(value) {
    if (value == null) {
      return null;
    }

    return t(value);
  } // [b]ind function


  function b(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull$1(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function (event) {
      invokeEventListener(vm, fn, vm.component, event);
    };
  } // [k]ey function


  function k(compilerKey, obj) {
    switch (typeof obj) {
      case 'number':
      case 'string':
        return compilerKey + ':' + obj;

    }
  } // [g]lobal [id] function


  function gid(id) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$1(id) || id === '') {

      return id;
    } // We remove attributes when they are assigned a value of null


    if (isNull$1(id)) {
      return null;
    }

    return `${id}-${vmBeingRendered.idx}`;
  } // [f]ragment [id] function


  function fid(url) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$1(url) || url === '') {

      return url;
    } // We remove attributes when they are assigned a value of null


    if (isNull$1(url)) {
      return null;
    } // Apply transformation only for fragment-only-urls


    if (/^#/.test(url)) {
      return `${url}-${vmBeingRendered.idx}`;
    }

    return url;
  }
  /**
   * Map to store an index value assigned to any dynamic component reference ingested
   * by dc() api. This allows us to generate a unique unique per template per dynamic
   * component reference to avoid diffing algo mismatches.
   */


  const DynamicImportedComponentMap = new Map();
  let dynamicImportedComponentCounter = 0;
  /**
   * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
   */

  function dc(sel, Ctor, data, children) {


    if (Ctor == null) {
      return null;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
    }

    let idx = DynamicImportedComponentMap.get(Ctor);

    if (isUndefined$1(idx)) {
      idx = dynamicImportedComponentCounter++;
      DynamicImportedComponentMap.set(Ctor, idx);
    } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
    // to identify different constructors as vnodes with different keys to avoid reusing the
    // element used for previous constructors.


    data.key = `dc:${idx}:${data.key}`;
    return c(sel, Ctor, data, children);
  }
  /**
   * slow children collection marking mechanism. this API allows the compiler to signal
   * to the engine that a particular collection of children must be diffed using the slow
   * algo based on keys due to the nature of the list. E.g.:
   *
   *   - slot element's children: the content of the slot has to be dynamic when in synthetic
   *                              shadow mode because the `vnode.children` might be the slotted
   *                              content vs default content, in which case the size and the
   *                              keys are not matching.
   *   - children that contain dynamic components
   *   - children that are produced by iteration
   *
   */


  function sc(vnodes) {
    // choose to use the snabbdom virtual dom diffing algo instead of our
    // static dummy algo.


    markAsDynamicChildren(vnodes);
    return vnodes;
  }

  var api$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    h: h,
    ti: ti,
    s: s,
    c: c,
    i: i,
    f: f,
    t: t,
    d: d,
    b: b,
    k: k,
    gid: gid,
    fid: fid,
    dc: dc,
    sc: sc
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function createShadowStyleVNode(content) {
    return h('style', {
      key: 'style',
      attrs: {
        type: 'text/css'
      }
    }, [t(content)]);
  }

  function updateSyntheticShadowAttributes(vm, template) {
    const {
      elm,
      context,
      renderer
    } = vm;
    const {
      stylesheets: newStylesheets,
      stylesheetTokens: newStylesheetTokens
    } = template;
    let newHostAttribute;
    let newShadowAttribute; // Reset the styling token applied to the host element.

    const oldHostAttribute = context.hostAttribute;

    if (!isUndefined$1(oldHostAttribute)) {
      renderer.removeAttribute(elm, oldHostAttribute);
    } // Apply the new template styling token to the host element, if the new template has any
    // associated stylesheets.


    if (!isUndefined$1(newStylesheetTokens) && !isUndefined$1(newStylesheets) && newStylesheets.length !== 0) {
      newHostAttribute = newStylesheetTokens.hostAttribute;
      newShadowAttribute = newStylesheetTokens.shadowAttribute;
      renderer.setAttribute(elm, newHostAttribute, '');
    } // Update the styling tokens present on the context object.


    context.hostAttribute = newHostAttribute;
    context.shadowAttribute = newShadowAttribute;
  }

  function evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, nativeShadow) {
    const content = [];

    for (let i = 0; i < stylesheets.length; i++) {
      const stylesheet = stylesheets[i];

      if (isArray$2(stylesheet)) {
        ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, hostSelector, shadowSelector, nativeShadow));
      } else {
        ArrayPush$1.call(content, stylesheet(hostSelector, shadowSelector, nativeShadow));
      }
    }

    return content;
  }

  function getStylesheetsContent(vm, template) {
    const {
      stylesheets,
      stylesheetTokens: tokens
    } = template;
    const {
      syntheticShadow
    } = vm.renderer;
    let content = [];

    if (!isUndefined$1(stylesheets) && !isUndefined$1(tokens)) {
      const hostSelector = syntheticShadow ? `[${tokens.hostAttribute}]` : '';
      const shadowSelector = syntheticShadow ? `[${tokens.shadowAttribute}]` : '';
      content = evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, !syntheticShadow);
    }

    return content;
  }

  function createStylesheet(vm, stylesheets) {
    const {
      renderer
    } = vm;

    if (renderer.syntheticShadow) {
      for (let i = 0; i < stylesheets.length; i++) {
        renderer.insertGlobalStylesheet(stylesheets[i]);
      }

      return null;
    } else {
      const shadowStyleSheetContent = ArrayJoin$1.call(stylesheets, '\n');
      return createShadowStyleVNode(shadowStyleSheetContent);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var GlobalMeasurementPhase;

  (function (GlobalMeasurementPhase) {
    GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
    GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
  })(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
  // JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


  const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  function getMarkName(phase, vm) {
    // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
    // the right measures for components that are recursive.
    return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
  }

  function start(markName) {
    performance.mark(markName);
  }

  function end(measureName, markName) {
    performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
    // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

    performance.clearMarks(markName);
    performance.clearMarks(measureName);
  }

  function noop$1() {
    /* do nothing */
  }
  const startGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
    start(markName);
  };
  const endGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
    const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
    end(phase, markName);
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  let isUpdatingTemplate = false;
  let vmBeingRendered = null;

  function getVMBeingRendered() {
    return vmBeingRendered;
  }

  function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
  }

  function validateSlots(vm, html) {
    {
      // this method should never leak to prod
      throw new ReferenceError();
    }
  }

  function evaluateTemplate(vm, html) {

    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
      // pre
      vmBeingRendered = vm;
    }, () => {
      // job
      const {
        component,
        context,
        cmpSlots,
        cmpTemplate,
        tro,
        renderer
      } = vm;
      tro.observe(() => {
        // Reset the cache memoizer for template when needed.
        if (html !== cmpTemplate) {
          // Perf opt: do not reset the shadow root during the first rendering (there is
          // nothing to reset).
          if (!isNull$1(cmpTemplate)) {
            // It is important to reset the content to avoid reusing similar elements
            // generated from a different template, because they could have similar IDs,
            // and snabbdom just rely on the IDs.
            resetShadowRoot(vm);
          } // Check that the template was built by the compiler.


          if (!isTemplateRegistered(html)) {
            throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
          }

          vm.cmpTemplate = html; // Create a brand new template cache for the swapped templated.

          context.tplCache = create$1(null); // Update the synthetic shadow attributes on the host element if necessary.

          if (renderer.syntheticShadow) {
            updateSyntheticShadowAttributes(vm, html);
          } // Evaluate, create stylesheet and cache the produced VNode for future
          // re-rendering.


          const stylesheetsContent = getStylesheetsContent(vm, html);
          context.styleVNode = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
        }

        if ("production" !== 'production') {
          // validating slots in every rendering since the allocated content might change over time
          validateSlots(vm, html);
        } // right before producing the vnodes, we clear up all internal references
        // to custom elements from the template.


        vm.velements = []; // Set the global flag that template is being updated

        isUpdatingTemplate = true;
        vnodes = html.call(undefined, api$1, component, cmpSlots, context.tplCache);
        const {
          styleVNode
        } = context;

        if (!isNull$1(styleVNode)) {
          ArrayUnshift$2.call(vnodes, styleVNode);
        }
      });
    }, () => {
      // post
      isUpdatingTemplate = isUpdatingTemplateInception;
      vmBeingRendered = vmOfTemplateBeingUpdatedInception;
    });

    return vnodes;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function addErrorComponentStack(vm, error) {
    if (!isFrozen$1(error) && isUndefined$1(error.wcStack)) {
      const wcStack = getErrorComponentStack(vm);
      defineProperty$1(error, 'wcStack', {
        get() {
          return wcStack;
        }

      });
    }
  }
  let vmBeingConstructed = null;

  function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
  }

  const noop$2 = () => void 0;

  function invokeComponentCallback(vm, fn, args) {
    const {
      component,
      callHook,
      owner
    } = vm;
    let result;
    runWithBoundaryProtection(vm, owner, noop$2, () => {
      // job
      result = callHook(component, fn, args);
    }, noop$2);
    return result;
  }

  function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;

    vmBeingConstructed = vm;
    /**
     * Constructors don't need to be wrapped with a boundary because for root elements
     * it should throw, while elements from template are already wrapped by a boundary
     * associated to the diffing algo.
     */

    try {
      // job
      const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
      // the "instanceof" operator would not work here since Locker Service provides its own
      // implementation of LightningElement, so we indirectly check if the base constructor is
      // invoked by accessing the component on the vm.

      if (vmBeingConstructed.component !== result) {
        throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
      }
    } catch (e) {
      error = Object(e);
    } finally {

      vmBeingConstructed = vmBeingConstructedInception;

      if (!isUndefined$1(error)) {
        addErrorComponentStack(vm, error); // re-throwing the original error annotated after restoring the context

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }

  function invokeComponentRenderMethod(vm) {
    const {
      def: {
        render
      },
      callHook,
      component,
      owner
    } = vm;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
      setVMBeingRendered(vm);
    }, () => {
      // job
      vm.tro.observe(() => {
        html = callHook(component, render);
        renderInvocationSuccessful = true;
      });
    }, () => {
      setVMBeingRendered(vmBeingRenderedInception);
    }); // If render() invocation failed, process errorCallback in boundary and return an empty template

    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
  }

  function invokeComponentRenderedCallback(vm) {
    const {
      def: {
        renderedCallback
      },
      component,
      callHook,
      owner
    } = vm;

    if (!isUndefined$1(renderedCallback)) {
      runWithBoundaryProtection(vm, owner, () => {
      }, () => {
        // job
        callHook(component, renderedCallback);
      }, () => {
      });
    }
  }

  function invokeEventListener(vm, fn, thisValue, event) {
    const {
      callHook,
      owner
    } = vm;
    runWithBoundaryProtection(vm, owner, noop$2, () => {
      // job
      if ("production" !== 'production') {
        assert$1.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
      }

      callHook(thisValue, fn, [event]);
    }, noop$2);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedTemplateMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerComponent(Ctor, {
    tmpl
  }) {
    signedTemplateMap.set(Ctor, tmpl); // chaining this method as a way to wrap existing assignment of component constructor easily,
    // without too much transformation

    return Ctor;
  }

  function getComponentRegisteredTemplate(Ctor) {
    return signedTemplateMap.get(Ctor);
  }

  function createComponent(vm, Ctor) {
    // create the component instance
    invokeComponentConstructor(vm, Ctor);

    if (isUndefined$1(vm.component)) {
      throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
    }
  }

  function getTemplateReactiveObserver(vm) {
    return new ReactiveObserver(() => {
      const {
        isDirty
      } = vm;

      if (isFalse$1$1(isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    });
  }

  function renderComponent(vm) {

    vm.tro.reset();
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;

    return vnodes;
  }

  function markComponentAsDirty(vm) {

    vm.isDirty = true;
  }

  const cmpEventListenerMap = new WeakMap();

  function getWrappedComponentsListener(vm, listener) {
    if (!isFunction$1(listener)) {
      throw new TypeError(); // avoiding problems with non-valid listeners
    }

    let wrappedListener = cmpEventListenerMap.get(listener);

    if (isUndefined$1(wrappedListener)) {
      wrappedListener = function (event) {
        invokeEventListener(vm, listener, undefined, event);
      };

      cmpEventListenerMap.set(listener, wrappedListener);
    }

    return wrappedListener;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const Services = create$1(null);

  function invokeServiceHook(vm, cbs) {

    const {
      component,
      def,
      context
    } = vm;

    for (let i = 0, len = cbs.length; i < len; ++i) {
      cbs[i].call(undefined, component, {}, def, context);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var VMState;

  (function (VMState) {
    VMState[VMState["created"] = 0] = "created";
    VMState[VMState["connected"] = 1] = "connected";
    VMState[VMState["disconnected"] = 2] = "disconnected";
  })(VMState || (VMState = {}));

  let idx = 0;
  /** The internal slot used to associate different objects the engine manipulates with the VM */

  const ViewModelReflection = createHiddenField$1('ViewModel', 'engine');

  function callHook(cmp, fn, args = []) {
    return fn.apply(cmp, args);
  }

  function setHook(cmp, prop, newValue) {
    cmp[prop] = newValue;
  }

  function getHook(cmp, prop) {
    return cmp[prop];
  }

  function rerenderVM(vm) {
    rehydrate(vm);
  }

  function connectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm); // Usually means moving the element from one place to another, which is observable via
    // life-cycle hooks.

    if (vm.state === VMState.connected) {
      disconnectRootElement(elm);
    }

    runConnectedCallback(vm);
    rehydrate(vm);
    endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
  }

  function disconnectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    resetComponentStateWhenRemoved(vm);
  }

  function appendVM(vm) {
    rehydrate(vm);
  } // just in case the component comes back, with this we guarantee re-rendering it
  // while preventing any attempt to rehydration until after reinsertion.


  function resetComponentStateWhenRemoved(vm) {
    const {
      state
    } = vm;

    if (state !== VMState.disconnected) {
      const {
        oar,
        tro
      } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

      tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

      for (const key in oar) {
        oar[key].reset();
      }

      runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

      runShadowChildNodesDisconnectedCallback(vm);
      runLightChildNodesDisconnectedCallback(vm);
    }
  } // this method is triggered by the diffing algo only when a vnode from the
  // old vnode.children is removed from the DOM.


  function removeVM(vm) {

    resetComponentStateWhenRemoved(vm);
  }

  function createVM(elm, def, options) {
    const {
      mode,
      owner,
      renderer,
      tagName
    } = options;
    const vm = {
      elm,
      def,
      idx: idx++,
      state: VMState.created,
      isScheduled: false,
      isDirty: true,
      tagName,
      mode,
      owner,
      renderer,
      children: EmptyArray,
      aChildren: EmptyArray,
      velements: EmptyArray,
      cmpProps: create$1(null),
      cmpFields: create$1(null),
      cmpSlots: create$1(null),
      oar: create$1(null),
      cmpTemplate: null,
      context: {
        hostAttribute: undefined,
        shadowAttribute: undefined,
        styleVNode: null,
        tplCache: EmptyObject,
        wiredConnecting: EmptyArray,
        wiredDisconnecting: EmptyArray
      },
      tro: null,
      component: null,
      cmpRoot: null,
      callHook,
      setHook,
      getHook
    };
    vm.tro = getTemplateReactiveObserver(vm);


    createComponent(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

    if (isFalse$1$1(renderer.ssr) && hasWireAdapters(vm)) {
      installWireAdapters(vm);
    }

    return vm;
  }

  function associateVM(obj, vm) {
    setHiddenField$1(obj, ViewModelReflection, vm);
  }

  function getAssociatedVM(obj) {
    const vm = getHiddenField$1(obj, ViewModelReflection);

    return vm;
  }

  function getAssociatedVMIfPresent(obj) {
    const maybeVm = getHiddenField$1(obj, ViewModelReflection);

    return maybeVm;
  }

  function rehydrate(vm) {
    if (isTrue$1$1(vm.isDirty)) {
      const children = renderComponent(vm);
      patchShadowRoot(vm, children);
    }
  }

  function patchShadowRoot(vm, newCh) {
    const {
      cmpRoot,
      children: oldCh
    } = vm; // caching the new children collection

    vm.children = newCh;

    if (newCh.length > 0 || oldCh.length > 0) {
      // patch function mutates vnodes by adding the element reference,
      // however, if patching fails it contains partial changes.
      if (oldCh !== newCh) {
        const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
        runWithBoundaryProtection(vm, vm, () => {
        }, () => {
          // job
          fn(cmpRoot, oldCh, newCh);
        }, () => {
        });
      }
    }

    if (vm.state === VMState.connected) {
      // If the element is connected, that means connectedCallback was already issued, and
      // any successive rendering should finish with the call to renderedCallback, otherwise
      // the connectedCallback will take care of calling it in the right order at the end of
      // the current rehydration process.
      runRenderedCallback(vm);
    }
  }

  function runRenderedCallback(vm) {
    if (isTrue$1$1(vm.renderer.ssr)) {
      return;
    }

    const {
      rendered
    } = Services;

    if (rendered) {
      invokeServiceHook(vm, rendered);
    }

    invokeComponentRenderedCallback(vm);
  }

  let rehydrateQueue = [];

  function flushRehydrationQueue() {
    startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

    const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
    rehydrateQueue = []; // reset to a new queue

    for (let i = 0, len = vms.length; i < len; i += 1) {
      const vm = vms[i];

      try {
        rehydrate(vm);
      } catch (error) {
        if (i + 1 < len) {
          // pieces of the queue are still pending to be rehydrated, those should have priority
          if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
          }

          ArrayUnshift$2.apply(rehydrateQueue, ArraySlice$2.call(vms, i + 1));
        } // we need to end the measure before throwing.


        endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
        // already scheduled, it should continue patching the rest.

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }

    endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
  }

  function runConnectedCallback(vm) {
    const {
      state
    } = vm;

    if (state === VMState.connected) {
      return; // nothing to do since it was already connected
    }

    vm.state = VMState.connected; // reporting connection

    const {
      connected
    } = Services;

    if (connected) {
      invokeServiceHook(vm, connected);
    }

    if (hasWireAdapters(vm)) {
      connectWireAdapters(vm);
    }

    const {
      connectedCallback
    } = vm.def;

    if (!isUndefined$1(connectedCallback)) {

      invokeComponentCallback(vm, connectedCallback);
    }
  }

  function hasWireAdapters(vm) {
    return getOwnPropertyNames$1(vm.def.wire).length > 0;
  }

  function runDisconnectedCallback(vm) {

    if (isFalse$1$1(vm.isDirty)) {
      // this guarantees that if the component is reused/reinserted,
      // it will be re-rendered because we are disconnecting the reactivity
      // linking, so mutations are not automatically reflected on the state
      // of disconnected components.
      vm.isDirty = true;
    }

    vm.state = VMState.disconnected; // reporting disconnection

    const {
      disconnected
    } = Services;

    if (disconnected) {
      invokeServiceHook(vm, disconnected);
    }

    if (hasWireAdapters(vm)) {
      disconnectWireAdapters(vm);
    }

    const {
      disconnectedCallback
    } = vm.def;

    if (!isUndefined$1(disconnectedCallback)) {

      invokeComponentCallback(vm, disconnectedCallback);
    }
  }

  function runShadowChildNodesDisconnectedCallback(vm) {
    const {
      velements: vCustomElementCollection
    } = vm; // Reporting disconnection for every child in inverse order since they are
    // inserted in reserved order.

    for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
      const {
        elm
      } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
      // * when there is an error during the construction phase, and an error
      //   boundary picks it, there is a possibility that the VCustomElement
      //   is not properly initialized, and therefore is should be ignored.
      // * when slotted custom element is not used by the element where it is
      //   slotted into it, as  a result, the custom element was never
      //   initialized.

      if (!isUndefined$1(elm)) {
        const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
        // in the case where the VM failed in the middle of its creation,
        // eg: constructor throwing before invoking super().

        if (!isUndefined$1(childVM)) {
          resetComponentStateWhenRemoved(childVM);
        }
      }
    }
  }

  function runLightChildNodesDisconnectedCallback(vm) {
    const {
      aChildren: adoptedChildren
    } = vm;
    recursivelyDisconnectChildren(adoptedChildren);
  }
  /**
   * The recursion doesn't need to be a complete traversal of the vnode graph,
   * instead it can be partial, when a custom element vnode is found, we don't
   * need to continue into its children because by attempting to disconnect the
   * custom element itself will trigger the removal of anything slotted or anything
   * defined on its shadow.
   */


  function recursivelyDisconnectChildren(vnodes) {
    for (let i = 0, len = vnodes.length; i < len; i += 1) {
      const vnode = vnodes[i];

      if (!isNull$1(vnode) && isArray$2(vnode.children) && !isUndefined$1(vnode.elm)) {
        // vnode is a VElement with children
        if (isUndefined$1(vnode.ctor)) {
          // it is a VElement, just keep looking (recursively)
          recursivelyDisconnectChildren(vnode.children);
        } else {
          // it is a VCustomElement, disconnect it and ignore its children
          resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
        }
      }
    }
  } // This is a super optimized mechanism to remove the content of the shadowRoot without having to go
  // into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
  // children VNodes might not be representing the current state of the DOM.


  function resetShadowRoot(vm) {
    const {
      children,
      cmpRoot,
      renderer
    } = vm;

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];

      if (!isNull$1(child) && !isUndefined$1(child.elm)) {
        renderer.remove(child.elm, cmpRoot);
      }
    }

    vm.children = EmptyArray;
    runShadowChildNodesDisconnectedCallback(vm);
    vm.velements = EmptyArray;
  }

  function scheduleRehydration(vm) {
    if (isTrue$1$1(vm.renderer.ssr) || isTrue$1$1(vm.isScheduled)) {
      return;
    }

    vm.isScheduled = true;

    if (rehydrateQueue.length === 0) {
      addCallbackToNextTick(flushRehydrationQueue);
    }

    ArrayPush$1.call(rehydrateQueue, vm);
  }

  function getErrorBoundaryVM(vm) {
    let currentVm = vm;

    while (!isNull$1(currentVm)) {
      if (!isUndefined$1(currentVm.def.errorCallback)) {
        return currentVm;
      }

      currentVm = currentVm.owner;
    }
  } // slow path routine
  // NOTE: we should probably more this routine to the synthetic shadow folder
  // and get the allocation to be cached by in the elm instead of in the VM


  function allocateInSlot(vm, children) {

    const {
      cmpSlots: oldSlots
    } = vm;
    const cmpSlots = vm.cmpSlots = create$1(null);

    for (let i = 0, len = children.length; i < len; i += 1) {
      const vnode = children[i];

      if (isNull$1(vnode)) {
        continue;
      }

      const {
        data
      } = vnode;
      const slotName = data.attrs && data.attrs.slot || '';
      const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
      // which might have similar keys. Each vnode will always have a key that
      // starts with a numeric character from compiler. In this case, we add a unique
      // notation for slotted vnodes keys, e.g.: `@foo:1:1`

      if (!isUndefined$1(vnode.key)) {
        vnode.key = `@${slotName}:${vnode.key}`;
      }

      ArrayPush$1.call(vnodes, vnode);
    }

    if (isFalse$1$1(vm.isDirty)) {
      // We need to determine if the old allocation is really different from the new one
      // and mark the vm as dirty
      const oldKeys = keys$1(oldSlots);

      if (oldKeys.length !== keys$1(cmpSlots).length) {
        markComponentAsDirty(vm);
        return;
      }

      for (let i = 0, len = oldKeys.length; i < len; i += 1) {
        const key = oldKeys[i];

        if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
          markComponentAsDirty(vm);
          return;
        }

        const oldVNodes = oldSlots[key];
        const vnodes = cmpSlots[key];

        for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
          if (oldVNodes[j] !== vnodes[j]) {
            markComponentAsDirty(vm);
            return;
          }
        }
      }
    }
  }

  function runWithBoundaryProtection(vm, owner, pre, job, post) {
    let error;
    pre();

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      post();

      if (!isUndefined$1(error)) {
        addErrorComponentStack(vm, error);
        const errorBoundaryVm = isNull$1(owner) ? undefined : getErrorBoundaryVM(owner);

        if (isUndefined$1(errorBoundaryVm)) {
          throw error; // eslint-disable-line no-unsafe-finally
        }

        resetShadowRoot(vm); // remove offenders


        const errorCallback = errorBoundaryVm.def.errorCallback;
        invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      }
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
  const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
  const WireMetaMap = new Map();

  function noop$3() {}

  class WireContextRegistrationEvent extends CustomEvent {
    constructor(adapterToken, {
      setNewContext,
      setDisconnectedCallback
    }) {
      super(adapterToken, {
        bubbles: true,
        composed: true
      });
      defineProperties$1(this, {
        setNewContext: {
          value: setNewContext
        },
        setDisconnectedCallback: {
          value: setDisconnectedCallback
        }
      });
    }

  }

  function createFieldDataCallback(vm, name) {
    const {
      cmpFields
    } = vm;
    return value => {
      if (value !== vm.cmpFields[name]) {
        // storing the value in the underlying storage
        cmpFields[name] = value;
        componentValueMutated(vm, name);
      }
    };
  }

  function createMethodDataCallback(vm, method) {
    return value => {
      // dispatching new value into the wired method
      invokeComponentCallback(vm, method, [value]);
    };
  }

  function createConfigWatcher(vm, wireDef, callbackWhenConfigIsReady) {
    const {
      component
    } = vm;
    const {
      configCallback
    } = wireDef;
    let hasPendingConfig = false; // creating the reactive observer for reactive params when needed

    const ro = new ReactiveObserver(() => {
      if (hasPendingConfig === false) {
        hasPendingConfig = true; // collect new config in the micro-task

        Promise.resolve().then(() => {
          hasPendingConfig = false; // resetting current reactive params

          ro.reset(); // dispatching a new config due to a change in the configuration

          callback();
        });
      }
    });

    const callback = () => {
      let config;
      ro.observe(() => config = configCallback(component)); // eslint-disable-next-line lwc-internal/no-invalid-todo
      // TODO: dev-mode validation of config based on the adapter.configSchema
      // @ts-ignore it is assigned in the observe() callback

      callbackWhenConfigIsReady(config);
    };

    return callback;
  }

  function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
    const {
      adapter
    } = wireDef;
    const adapterContextToken = getAdapterToken(adapter);

    if (isUndefined$1(adapterContextToken)) {
      return; // no provider found, nothing to be done
    }

    const {
      elm,
      renderer,
      context: {
        wiredConnecting,
        wiredDisconnecting
      }
    } = vm; // waiting for the component to be connected to formally request the context via the token

    ArrayPush$1.call(wiredConnecting, () => {
      // This event is responsible for connecting the host element with another
      // element in the composed path that is providing contextual data. The provider
      // must be listening for a special dom event with the name corresponding to the value of
      // `adapterContextToken`, which will remain secret and internal to this file only to
      // guarantee that the linkage can be forged.
      const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
        setNewContext(newContext) {
          // eslint-disable-next-line lwc-internal/no-invalid-todo
          // TODO: dev-mode validation of config based on the adapter.contextSchema
          callbackWhenContextIsReady(newContext);
        },

        setDisconnectedCallback(disconnectCallback) {
          // adds this callback into the disconnect bucket so it gets disconnected from parent
          // the the element hosting the wire is disconnected
          ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
        }

      });
      renderer.dispatchEvent(elm, contextRegistrationEvent);
    });
  }

  function createConnector(vm, name, wireDef) {
    const {
      method,
      adapter,
      configCallback,
      dynamic
    } = wireDef;
    const hasDynamicParams = dynamic.length > 0;
    const {
      component
    } = vm;
    const dataCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
    let context;
    let connector; // Workaround to pass the component element associated to this wire adapter instance.

    defineProperty$1(dataCallback, DeprecatedWiredElementHost, {
      value: vm.elm
    });
    defineProperty$1(dataCallback, DeprecatedWiredParamsMeta, {
      value: dynamic
    });
    runWithBoundaryProtection(vm, vm, noop$3, () => {
      // job
      connector = new adapter(dataCallback);
    }, noop$3);

    const updateConnectorConfig = config => {
      // every time the config is recomputed due to tracking,
      // this callback will be invoked with the new computed config
      runWithBoundaryProtection(vm, vm, noop$3, () => {
        // job
        connector.update(config, context);
      }, noop$3);
    }; // Computes the current wire config and calls the update method on the wire adapter.
    // This initial implementation may change depending on the specific wire instance, if it has params, we will need
    // to observe changes in the next tick.


    let computeConfigAndUpdate = () => {
      updateConnectorConfig(configCallback(component));
    };

    if (hasDynamicParams) {
      // This wire has dynamic parameters: we wait for the component instance is created and its values set
      // in order to call the update(config) method.
      Promise.resolve().then(() => {
        computeConfigAndUpdate = createConfigWatcher(vm, wireDef, updateConnectorConfig);
        computeConfigAndUpdate();
      });
    } else {
      computeConfigAndUpdate();
    } // if the adapter needs contextualization, we need to watch for new context and push it alongside the config


    if (!isUndefined$1(adapter.contextSchema)) {
      createContextWatcher(vm, wireDef, newContext => {
        // every time the context is pushed into this component,
        // this callback will be invoked with the new computed context
        if (context !== newContext) {
          context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
          // context, this is to preserve the identity characteristics, config should not have identity
          // (ever), while context can have identity

          computeConfigAndUpdate();
        }
      });
    } // @ts-ignore the boundary protection executes sync, connector is always defined


    return connector;
  }

  const AdapterToTokenMap = new Map();

  function getAdapterToken(adapter) {
    return AdapterToTokenMap.get(adapter);
  }

  function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
    // support for callable adapters
    if (adapter.adapter) {
      adapter = adapter.adapter;
    }

    const method = descriptor.value;
    const def = {
      adapter,
      method,
      configCallback,
      dynamic
    };
    WireMetaMap.set(descriptor, def);
  }

  function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
    // support for callable adapters
    if (adapter.adapter) {
      adapter = adapter.adapter;
    }

    const def = {
      adapter,
      configCallback,
      dynamic
    };
    WireMetaMap.set(descriptor, def);
  }

  function installWireAdapters(vm) {
    const {
      context,
      def: {
        wire
      }
    } = vm;
    const wiredConnecting = context.wiredConnecting = [];
    const wiredDisconnecting = context.wiredDisconnecting = [];

    for (const fieldNameOrMethod in wire) {
      const descriptor = wire[fieldNameOrMethod];
      const wireDef = WireMetaMap.get(descriptor);

      if (!isUndefined$1(wireDef)) {
        const adapterInstance = createConnector(vm, fieldNameOrMethod, wireDef);
        ArrayPush$1.call(wiredConnecting, () => adapterInstance.connect());
        ArrayPush$1.call(wiredDisconnecting, () => adapterInstance.disconnect());
      }
    }
  }

  function connectWireAdapters(vm) {
    const {
      wiredConnecting
    } = vm.context;

    for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
      wiredConnecting[i]();
    }
  }

  function disconnectWireAdapters(vm) {
    const {
      wiredDisconnecting
    } = vm.context;
    runWithBoundaryProtection(vm, vm, noop$3, () => {
      // job
      for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
        wiredDisconnecting[i]();
      }
    }, noop$3);
  }
  /* version: 1.7.7 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const globalStylesheets = create(null);
  const globalStylesheetsParentElement = document.head || document.body || document; // TODO [#0]: Evaluate how we can extract the `$shadowToken$` property name in a shared package
  // to avoid having to synchronize it between the different modules.

  const useSyntheticShadow = hasOwnProperty.call(Element.prototype, '$shadowToken$');
  const renderer = {
    ssr: false,
    syntheticShadow: useSyntheticShadow,

    createElement(tagName, namespace) {
      return isUndefined(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
    },

    createText(content) {
      return document.createTextNode(content);
    },

    insert(node, parent, anchor) {
      parent.insertBefore(node, anchor);
    },

    remove(node, parent) {
      parent.removeChild(node);
    },

    nextSibling(node) {
      return node.nextSibling;
    },

    attachShadow(element, options) {
      return element.attachShadow(options);
    },

    setText(node, content) {
      node.nodeValue = content;
    },

    getProperty(node, key) {
      return node[key];
    },

    setProperty(node, key, value) {

      node[key] = value;
    },

    getAttribute(element, name, namespace) {
      return isUndefined(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
    },

    setAttribute(element, name, value, namespace) {
      return isUndefined(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
    },

    removeAttribute(element, name, namespace) {
      if (isUndefined(namespace)) {
        element.removeAttribute(name);
      } else {
        element.removeAttributeNS(namespace, name);
      }
    },

    addEventListener(target, type, callback, options) {
      target.addEventListener(type, callback, options);
    },

    removeEventListener(target, type, callback, options) {
      target.removeEventListener(type, callback, options);
    },

    dispatchEvent(target, event) {
      return target.dispatchEvent(event);
    },

    getClassList(element) {
      return element.classList;
    },

    getStyleDeclaration(element) {
      // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
      // represent elements in the engine?
      return element.style;
    },

    getBoundingClientRect(element) {
      return element.getBoundingClientRect();
    },

    querySelector(element, selectors) {
      return element.querySelector(selectors);
    },

    querySelectorAll(element, selectors) {
      return element.querySelectorAll(selectors);
    },

    getElementsByTagName(element, tagNameOrWildCard) {
      return element.getElementsByTagName(tagNameOrWildCard);
    },

    getElementsByClassName(element, names) {
      return element.getElementsByClassName(names);
    },

    isConnected(node) {
      return node.isConnected;
    },

    insertGlobalStylesheet(content) {
      if (!isUndefined(globalStylesheets[content])) {
        return;
      }

      globalStylesheets[content] = true;
      const elm = document.createElement('style');
      elm.type = 'text/css';
      elm.textContent = content;
      globalStylesheetsParentElement.appendChild(elm);
    },

    assertInstanceOfHTMLElement(elm, msg) {
      assert.invariant(elm instanceof HTMLElement, msg);
    }

  };

  function buildCustomElementConstructor(Ctor) {
    var _a;

    const def = getComponentInternalDef(Ctor); // generating the hash table for attributes to avoid duplicate fields and facilitate validation
    // and false positives in case of inheritance.

    const attributeToPropMap = create(null);

    for (const propName in def.props) {
      attributeToPropMap[getAttrNameFromPropName(propName)] = propName;
    }

    return _a = class extends def.bridge {
      constructor() {
        super();
        createVM(this, def, {
          mode: 'open',
          owner: null,
          tagName: this.tagName,
          renderer
        });
      }

      connectedCallback() {
        connectRootElement(this);
      }

      disconnectedCallback() {
        disconnectRootElement(this);
      }

      attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
          // Ignore same values.
          return;
        }

        const propName = attributeToPropMap[attrName];

        if (isUndefined(propName)) {
          // Ignore unknown attributes.
          return;
        }

        if (!isAttributeLocked(this, attrName)) {
          // Ignore changes triggered by the engine itself during:
          // * diffing when public props are attempting to reflect to the DOM
          // * component via `this.setAttribute()`, should never update the prop
          // Both cases, the setAttribute call is always wrapped by the unlocking of the
          // attribute to be changed
          return;
        } // Reflect attribute change to the corresponding property when changed from outside.


        this[propName] = newValue;
      }

    }, // Specify attributes for which we want to reflect changes back to their corresponding
    // properties via attributeChangedCallback.
    _a.observedAttributes = keys(attributeToPropMap), _a;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ConnectingSlot = createHiddenField('connecting', 'engine');
  const DisconnectingSlot = createHiddenField('disconnecting', 'engine');

  function callNodeSlot(node, slot) {

    const fn = getHiddenField(node, slot);

    if (!isUndefined(fn)) {
      fn(node);
    }

    return node; // for convenience
  } // Monkey patching Node methods to be able to detect the insertions and removal of root elements
  // created via createElement.


  const {
    appendChild,
    insertBefore,
    removeChild,
    replaceChild
  } = Node.prototype;
  assign(Node.prototype, {
    appendChild(newChild) {
      const appendedNode = appendChild.call(this, newChild);
      return callNodeSlot(appendedNode, ConnectingSlot);
    },

    insertBefore(newChild, referenceNode) {
      const insertedNode = insertBefore.call(this, newChild, referenceNode);
      return callNodeSlot(insertedNode, ConnectingSlot);
    },

    removeChild(oldChild) {
      const removedNode = removeChild.call(this, oldChild);
      return callNodeSlot(removedNode, DisconnectingSlot);
    },

    replaceChild(newChild, oldChild) {
      const replacedNode = replaceChild.call(this, newChild, oldChild);
      callNodeSlot(replacedNode, DisconnectingSlot);
      callNodeSlot(newChild, ConnectingSlot);
      return replacedNode;
    }

  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ComponentConstructorToCustomElementConstructorMap = new Map();

  function getCustomElementConstructor(Ctor) {
    if (Ctor === BaseLightningElement) {
      throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
    }

    let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);

    if (isUndefined(ce)) {
      ce = buildCustomElementConstructor(Ctor);
      ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
    }

    return ce;
  }
  /**
   * This static getter builds a Web Component class from a LWC constructor so it can be registered
   * as a new element via customElements.define() at any given time. E.g.:
   *
   *      import Foo from 'ns/foo';
   *      customElements.define('x-foo', Foo.CustomElementConstructor);
   *      const elm = document.createElement('x-foo');
   *
   */


  defineProperty(BaseLightningElement, 'CustomElementConstructor', {
    get() {
      return getCustomElementConstructor(this);
    }

  });
  freeze(BaseLightningElement);
  seal(BaseLightningElement.prototype);
  /* version: 1.7.7 */

  function stylesheet(hostSelector, shadowSelector, nativeShadow) {
    return [".greet", shadowSelector, " {font-size: xx-large;}\n.fade-fast", shadowSelector, " {opacity: 0;animation: fade-in 1s;}\n.fade-slow", shadowSelector, " {opacity: 0;animation: fade-in 5s;}\n.fade-medium", shadowSelector, " {opacity: 0;animation: fade-in 2s;}\n@keyframes fade-in {0% {opacity: 0;}\n35% {opacity: 1;}\n65% {opacity: 1;}\n100% {opacity: 0;}\n}.hide", shadowSelector, " {opacity: 0;}\n"].join('');
  }
  var _implicitStylesheets = [stylesheet];

  function tmpl($api, $cmp, $slotset, $ctx) {
    const {
      d: api_dynamic,
      h: api_element,
      b: api_bind
    } = $api;
    const {
      _m0
    } = $ctx;
    return [api_element("div", {
      className: $cmp.animationClass,
      key: 1,
      on: {
        "animationend": _m0 || ($ctx._m0 = api_bind($cmp.handleAnimationEnd))
      }
    }, [api_element("span", {
      classMap: {
        "greet": true
      },
      key: 0
    }, [api_dynamic($cmp.greeting)])])];
  }

  var _tmpl = registerTemplate(tmpl);
  tmpl.stylesheets = [];

  if (_implicitStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
  }
  tmpl.stylesheetTokens = {
    hostAttribute: "my-greeting_greeting-host",
    shadowAttribute: "my-greeting_greeting"
  };

  const greetings = ['Hello', 'Bonjour', '你好', 'Hola', 'Привет', 'こんにちは', 'Guten Tag', 'ጤና ይስጥልኝ', 'Ciao', 'नमस्ते', '안녕하세요'];
  const SPEED_CLASS_MAP = {
    slow: 'fade-slow',
    fast: 'fade-fast',
    medium: 'fade-medium'
  };
  const DEFAULT_SPEED = 'medium';

  class Greeting extends BaseLightningElement {
    constructor(...args) {
      super(...args);
      this.animationSpeed = DEFAULT_SPEED;
      this.index = 0;
      this.isAnimating = true;
    }

    set speed(value) {
      if (SPEED_CLASS_MAP[value]) {
        this.animationSpeed = value;
      } else {
        this.animationSpeed = DEFAULT_SPEED;
      }

      this.isAnimating = true;
    } // Return the internal speed property


    get speed() {
      return this.animationSpeed;
    } // Get the current greeting


    get greeting() {
      return greetings[this.index];
    } // Map slow, medium, fast to CSS Animations


    get animationClass() {
      if (this.isAnimating) {
        return SPEED_CLASS_MAP[this.speed];
      }

      return 'hide';
    } //Handle the animation ending, update to next hello


    handleAnimationEnd() {
      this.isAnimating = false;
      this.index = (this.index + 1) % greetings.length;
      setTimeout(() => this.updateGreeting(), 500);
    } // Update to the next greeting and start animating


    updateGreeting() {
      this.isAnimating = true;
    }

  }

  registerDecorators(Greeting, {
    publicProps: {
      speed: {
        config: 3
      }
    },
    fields: ["animationSpeed", "index", "isAnimating"]
  });

  var Greeting$1 = registerComponent(Greeting, {
    tmpl: _tmpl
  });

  customElements.define('my-greeting', Greeting$1.CustomElementConstructor);

}());

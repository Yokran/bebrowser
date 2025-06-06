// @ts-nocheck
//https://browser.sentry-cdn.com/8.18.0/bundle.js
/*! @sentry/browser 8.18.0 (c9ea6b8) | https://github.com/getsentry/sentry-javascript */
/**
 * @typedef { Object } SentryAPI
 * @property { Function } captureException 
 * @property { Function } captureMessage
 * @property { Function } addBreadcrumb
 * @property { Function } init
 * @property { Function } close
 * @property { Function } getDefaultIntegrations
 * @property { Function } breadcrumbsIntegration
 * @property { Function } createTransport
 * 
 */


!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8a635afe-71b1-5716-a16c-aa9b9d588818")}catch(e){}}();
export var sentry = (


  /**
  * @returns {SentryAPI}
  */


  function (exports) {

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const objectToString = Object.prototype.toString;

    /**
     * Checks whether given value's type is one of a few Error or Error-like
     * {@link isError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isError(wat) {
      switch (objectToString.call(wat)) {
        case '[object Error]':
        case '[object Exception]':
        case '[object DOMException]':
          return true;
        default:
          return isInstanceOf(wat, Error);
      }
    }
    /**
     * Checks whether given value is an instance of the given built-in class.
     *
     * @param wat The value to be checked
     * @param className
     * @returns A boolean representing the result.
     */
    function isBuiltin(wat, className) {
      return objectToString.call(wat) === `[object ${className}]`;
    }

    /**
     * Checks whether given value's type is ErrorEvent
     * {@link isErrorEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isErrorEvent$1(wat) {
      return isBuiltin(wat, 'ErrorEvent');
    }

    /**
     * Checks whether given value's type is DOMError
     * {@link isDOMError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMError(wat) {
      return isBuiltin(wat, 'DOMError');
    }

    /**
     * Checks whether given value's type is DOMException
     * {@link isDOMException}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMException(wat) {
      return isBuiltin(wat, 'DOMException');
    }

    /**
     * Checks whether given value's type is a string
     * {@link isString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isString(wat) {
      return isBuiltin(wat, 'String');
    }

    /**
     * Checks whether given string is parameterized
     * {@link isParameterizedString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isParameterizedString(wat) {
      return (
        typeof wat === 'object' &&
        wat !== null &&
        '__sentry_template_string__' in wat &&
        '__sentry_template_values__' in wat
      );
    }

    /**
     * Checks whether given value is a primitive (undefined, null, number, boolean, string, bigint, symbol)
     * {@link isPrimitive}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPrimitive(wat) {
      return wat === null || isParameterizedString(wat) || (typeof wat !== 'object' && typeof wat !== 'function');
    }

    /**
     * Checks whether given value's type is an object literal, or a class instance.
     * {@link isPlainObject}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPlainObject(wat) {
      return isBuiltin(wat, 'Object');
    }

    /**
     * Checks whether given value's type is an Event instance
     * {@link isEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isEvent(wat) {
      return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
    }

    /**
     * Checks whether given value's type is an Element instance
     * {@link isElement}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isElement(wat) {
      return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
    }

    /**
     * Checks whether given value's type is an regexp
     * {@link isRegExp}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isRegExp(wat) {
      return isBuiltin(wat, 'RegExp');
    }

    /**
     * Checks whether given value has a then function.
     * @param wat A value to be checked.
     */
    function isThenable(wat) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return Boolean(wat && wat.then && typeof wat.then === 'function');
    }

    /**
     * Checks whether given value's type is a SyntheticEvent
     * {@link isSyntheticEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isSyntheticEvent(wat) {
      return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
    }

    /**
     * Checks whether given value's type is an instance of provided constructor.
     * {@link isInstanceOf}.
     *
     * @param wat A value to be checked.
     * @param base A constructor to be used in a check.
     * @returns A boolean representing the result.
     */
    function isInstanceOf(wat, base) {
      try {
        return wat instanceof base;
      } catch (_e) {
        return false;
      }
    }

    /**
     * Checks whether given value's type is a Vue ViewModel.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isVueViewModel(wat) {
      // Not using Object.prototype.toString because in Vue 3 it would read the instance's Symbol(Symbol.toStringTag) property.
      return !!(typeof wat === 'object' && wat !== null && ((wat).__isVue || (wat)._isVue));
    }

    /**
     * Truncates given string to the maximum characters count
     *
     * @param str An object that contains serializable values
     * @param max Maximum number of characters in truncated string (0 = unlimited)
     * @returns string Encoded
     */
    function truncate(str, max = 0) {
      if (typeof str !== 'string' || max === 0) {
        return str;
      }
      return str.length <= max ? str : `${str.slice(0, max)}...`;
    }

    /**
     * Join values in array
     * @param input array of values to be joined together
     * @param delimiter string to be placed in-between values
     * @returns Joined values
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function safeJoin(input, delimiter) {
      if (!Array.isArray(input)) {
        return '';
      }

      const output = [];
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < input.length; i++) {
        const value = input[i];
        try {
          // This is a hack to fix a Vue3-specific bug that causes an infinite loop of
          // console warnings. This happens when a Vue template is rendered with
          // an undeclared variable, which we try to stringify, ultimately causing
          // Vue to issue another warning which repeats indefinitely.
          // see: https://github.com/getsentry/sentry-javascript/pull/8981
          if (isVueViewModel(value)) {
            output.push('[VueViewModel]');
          } else {
            output.push(String(value));
          }
        } catch (e) {
          output.push('[value cannot be serialized]');
        }
      }

      return output.join(delimiter);
    }

    /**
     * Checks if the given value matches a regex or string
     *
     * @param value The string to test
     * @param pattern Either a regex or a string against which `value` will be matched
     * @param requireExactStringMatch If true, `value` must match `pattern` exactly. If false, `value` will match
     * `pattern` if it contains `pattern`. Only applies to string-type patterns.
     */
    function isMatchingPattern(
      value,
      pattern,
      requireExactStringMatch = false,
    ) {
      if (!isString(value)) {
        return false;
      }

      if (isRegExp(pattern)) {
        return pattern.test(value);
      }
      if (isString(pattern)) {
        return requireExactStringMatch ? value === pattern : value.includes(pattern);
      }

      return false;
    }

    /**
     * Test the given string against an array of strings and regexes. By default, string matching is done on a
     * substring-inclusion basis rather than a strict equality basis
     *
     * @param testString The string to test
     * @param patterns The patterns against which to test the string
     * @param requireExactStringMatch If true, `testString` must match one of the given string patterns exactly in order to
     * count. If false, `testString` will match a string pattern if it contains that pattern.
     * @returns
     */
    function stringMatchesSomePattern(
      testString,
      patterns = [],
      requireExactStringMatch = false,
    ) {
      return patterns.some(pattern => isMatchingPattern(testString, pattern, requireExactStringMatch));
    }

    /**
     * Creates exceptions inside `event.exception.values` for errors that are nested on properties based on the `key` parameter.
     */
    function applyAggregateErrorsToEvent(
      exceptionFromErrorImplementation,
      parser,
      maxValueLimit = 250,
      key,
      limit,
      event,
      hint,
    ) {
      if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
        return;
      }

      // Generally speaking the last item in `event.exception.values` is the exception originating from the original Error
      const originalException =
        event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : undefined;

      // We only create exception grouping if there is an exception in the event.
      if (originalException) {
        event.exception.values = truncateAggregateExceptions(
          aggregateExceptionsFromError(
            exceptionFromErrorImplementation,
            parser,
            limit,
            hint.originalException,
            key,
            event.exception.values,
            originalException,
            0,
          ),
          maxValueLimit,
        );
      }
    }

    function aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error,
      key,
      prevExceptions,
      exception,
      exceptionId,
    ) {
      if (prevExceptions.length >= limit + 1) {
        return prevExceptions;
      }

      let newExceptions = [...prevExceptions];

      // Recursively call this function in order to walk down a chain of errors
      if (isInstanceOf(error[key], Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, error[key]);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          error[key],
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId,
        );
      }

      // This will create exception grouping for AggregateErrors
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
      if (Array.isArray(error.errors)) {
        error.errors.forEach((childError, i) => {
          if (isInstanceOf(childError, Error)) {
            applyExceptionGroupFieldsForParentException(exception, exceptionId);
            const newException = exceptionFromErrorImplementation(parser, childError);
            const newExceptionId = newExceptions.length;
            applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
            newExceptions = aggregateExceptionsFromError(
              exceptionFromErrorImplementation,
              parser,
              limit,
              childError,
              key,
              [newException, ...newExceptions],
              newException,
              newExceptionId,
            );
          }
        });
      }

      return newExceptions;
    }

    function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
      // Don't know if this default makes sense. The protocol requires us to set these values so we pick *some* default.
      exception.mechanism = exception.mechanism || { type: 'generic', handled: true };

      exception.mechanism = {
        ...exception.mechanism,
        ...(exception.type === 'AggregateError' && { is_exception_group: true }),
        exception_id: exceptionId,
      };
    }

    function applyExceptionGroupFieldsForChildException(
      exception,
      source,
      exceptionId,
      parentId,
    ) {
      // Don't know if this default makes sense. The protocol requires us to set these values so we pick *some* default.
      exception.mechanism = exception.mechanism || { type: 'generic', handled: true };

      exception.mechanism = {
        ...exception.mechanism,
        type: 'chained',
        source,
        exception_id: exceptionId,
        parent_id: parentId,
      };
    }

    /**
     * Truncate the message (exception.value) of all exceptions in the event.
     * Because this event processor is ran after `applyClientOptions`,
     * we need to truncate the message of the added exceptions here.
     */
    function truncateAggregateExceptions(exceptions, maxValueLength) {
      return exceptions.map(exception => {
        if (exception.value) {
          exception.value = truncate(exception.value, maxValueLength);
        }
        return exception;
      });
    }

    const SDK_VERSION = '8.18.0';

    /** Get's the global object for the current JavaScript runtime */
    const GLOBAL_OBJ = globalThis;

    /**
     * Returns a global singleton contained in the global `__SENTRY__[]` object.
     *
     * If the singleton doesn't already exist in `__SENTRY__`, it will be created using the given factory
     * function and added to the `__SENTRY__` object.
     *
     * @param name name of the global singleton on __SENTRY__
     * @param creator creator Factory function to create the singleton if it doesn't already exist on `__SENTRY__`
     * @param obj (Optional) The global object on which to look for `__SENTRY__`, if not `GLOBAL_OBJ`'s return value
     * @returns the singleton
     */
    function getGlobalSingleton(name, creator, obj) {
      const gbl = (obj || GLOBAL_OBJ);
      const __SENTRY__ = (gbl.__SENTRY__ = gbl.__SENTRY__ || {});
      const versionedCarrier = (__SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {});
      return versionedCarrier[name] || (versionedCarrier[name] = creator());
    }

    const WINDOW$4 = GLOBAL_OBJ;

    const DEFAULT_MAX_STRING_LENGTH = 80;

    /**
     * Given a child DOM element, returns a query-selector statement describing that
     * and its ancestors
     * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function htmlTreeAsString(
      elem,
      options = {},
    ) {
      if (!elem) {
        return '<unknown>';
      }

      // try/catch both:
      // - accessing event.target (see getsentry/raven-js#838, #768)
      // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
      // - can throw an exception in some circumstances.
      try {
        let currentElem = elem;
        const MAX_TRAVERSE_HEIGHT = 5;
        const out = [];
        let height = 0;
        let len = 0;
        const separator = ' > ';
        const sepLength = separator.length;
        let nextStr;
        const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
        const maxStringLength = (!Array.isArray(options) && options.maxStringLength) || DEFAULT_MAX_STRING_LENGTH;

        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
          nextStr = _htmlElementAsString(currentElem, keyAttrs);
          // bail out if
          // - nextStr is the 'html' element
          // - the length of the string that would be created exceeds maxStringLength
          //   (ignore this limit if we are on the first iteration)
          if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength)) {
            break;
          }

          out.push(nextStr);

          len += nextStr.length;
          currentElem = currentElem.parentNode;
        }

        return out.reverse().join(separator);
      } catch (_oO) {
        return '<unknown>';
      }
    }

    /**
     * Returns a simple, query-selector representation of a DOM element
     * e.g. [HTMLElement] => input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function _htmlElementAsString(el, keyAttrs) {
      const elem = el

        ;

      const out = [];

      if (!elem || !elem.tagName) {
        return '';
      }

      // @ts-expect-error WINDOW has HTMLElement
      if (WINDOW$4.HTMLElement) {
        // If using the component name annotation plugin, this value may be available on the DOM node
        if (elem instanceof HTMLElement && elem.dataset) {
          if (elem.dataset['sentryComponent']) {
            return elem.dataset['sentryComponent'];
          }
          if (elem.dataset['sentryElement']) {
            return elem.dataset['sentryElement'];
          }
        }
      }

      out.push(elem.tagName.toLowerCase());

      // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
      const keyAttrPairs =
        keyAttrs && keyAttrs.length
          ? keyAttrs.filter(keyAttr => elem.getAttribute(keyAttr)).map(keyAttr => [keyAttr, elem.getAttribute(keyAttr)])
          : null;

      if (keyAttrPairs && keyAttrPairs.length) {
        keyAttrPairs.forEach(keyAttrPair => {
          out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
        });
      } else {
        if (elem.id) {
          out.push(`#${elem.id}`);
        }

        const className = elem.className;
        if (className && isString(className)) {
          const classes = className.split(/\s+/);
          for (const c of classes) {
            out.push(`.${c}`);
          }
        }
      }
      const allowedAttrs = ['aria-label', 'type', 'name', 'title', 'alt'];
      for (const k of allowedAttrs) {
        const attr = elem.getAttribute(k);
        if (attr) {
          out.push(`[${k}="${attr}"]`);
        }
      }

      return out.join('');
    }

    /**
     * A safe form of location.href
     */
    function getLocationHref() {
      try {
        return WINDOW$4.document.location.href;
      } catch (oO) {
        return '';
      }
    }

    /**
     * Given a DOM element, traverses up the tree until it finds the first ancestor node
     * that has the `data-sentry-component` or `data-sentry-element` attribute with `data-sentry-component` taking
     * precendence. This attribute is added at build-time by projects that have the component name annotation plugin installed.
     *
     * @returns a string representation of the component for the provided DOM element, or `null` if not found
     */
    function getComponentName(elem) {
      // @ts-expect-error WINDOW has HTMLElement
      if (!WINDOW$4.HTMLElement) {
        return null;
      }

      let currentElem = elem;
      const MAX_TRAVERSE_HEIGHT = 5;
      for (let i = 0; i < MAX_TRAVERSE_HEIGHT; i++) {
        if (!currentElem) {
          return null;
        }

        if (currentElem instanceof HTMLElement) {
          if (currentElem.dataset['sentryComponent']) {
            return currentElem.dataset['sentryComponent'];
          }
          if (currentElem.dataset['sentryElement']) {
            return currentElem.dataset['sentryElement'];
          }
        }

        currentElem = currentElem.parentNode;
      }

      return null;
    }

    /** Prefix for logging strings */
    const PREFIX = 'Sentry Logger ';

    const CONSOLE_LEVELS = [
      'debug',
      'info',
      'warn',
      'error',
      'log',
      'assert',
      'trace',
    ];

    /** This may be mutated by the console instrumentation. */
    const originalConsoleMethods

      = {};

    /** JSDoc */

    /**
     * Temporarily disable sentry console instrumentations.
     *
     * @param callback The function to run against the original `console` messages
     * @returns The results of the callback
     */
    function consoleSandbox(callback) {
      if (!('console' in GLOBAL_OBJ)) {
        return callback();
      }

      const console = GLOBAL_OBJ.console;
      const wrappedFuncs = {};

      const wrappedLevels = Object.keys(originalConsoleMethods);

      // Restore all wrapped console methods
      wrappedLevels.forEach(level => {
        const originalConsoleMethod = originalConsoleMethods[level];
        wrappedFuncs[level] = console[level];
        console[level] = originalConsoleMethod;
      });

      try {
        return callback();
      } finally {
        // Revert restoration to wrapped state
        wrappedLevels.forEach(level => {
          console[level] = wrappedFuncs[level];
        });
      }
    }

    function makeLogger() {
      let enabled = false;
      const logger = {
        enable: () => {
          enabled = true;
        },
        disable: () => {
          enabled = false;
        },
        isEnabled: () => enabled,
      };

      {
        CONSOLE_LEVELS.forEach(name => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          logger[name] = (...args) => {
            if (enabled) {
              consoleSandbox(() => {
                GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
              });
            }
          };
        });
      }

      return logger;
    }

    const logger = makeLogger();

    /** Regular expression used to parse a Dsn. */
    const DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

    function isValidProtocol(protocol) {
      return protocol === 'http' || protocol === 'https';
    }

    /**
     * Renders the string representation of this Dsn.
     *
     * By default, this will render the public representation without the password
     * component. To get the deprecated private representation, set `withPassword`
     * to true.
     *
     * @param withPassword When set to true, the password will be included.
     */
    function dsnToString(dsn, withPassword = false) {
      const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
      return (
        `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ''}` +
        `@${host}${port ? `:${port}` : ''}/${path ? `${path}/` : path}${projectId}`
      );
    }

    /**
     * Parses a Dsn from a given string.
     *
     * @param str A Dsn as string
     * @returns Dsn as DsnComponents or undefined if @param str is not a valid DSN string
     */
    function dsnFromString(str) {
      const match = DSN_REGEX.exec(str);

      if (!match) {
        // This should be logged to the console
        consoleSandbox(() => {
          // eslint-disable-next-line no-console
          console.error(`Invalid Sentry Dsn: ${str}`);
        });
        return undefined;
      }

      const [protocol, publicKey, pass = '', host = '', port = '', lastPath = ''] = match.slice(1);
      let path = '';
      let projectId = lastPath;

      const split = projectId.split('/');
      if (split.length > 1) {
        path = split.slice(0, -1).join('/');
        projectId = split.pop();
      }

      if (projectId) {
        const projectMatch = projectId.match(/^\d+/);
        if (projectMatch) {
          projectId = projectMatch[0];
        }
      }

      return dsnFromComponents({ host, pass, path, projectId, port, protocol: protocol, publicKey });
    }

    function dsnFromComponents(components) {
      return {
        protocol: components.protocol,
        publicKey: components.publicKey || '',
        pass: components.pass || '',
        host: components.host,
        port: components.port || '',
        path: components.path || '',
        projectId: components.projectId,
      };
    }

    function validateDsn(dsn) {

      const { port, projectId, protocol } = dsn;

      const requiredComponents = ['protocol', 'publicKey', 'host', 'projectId'];
      const hasMissingRequiredComponent = requiredComponents.find(component => {
        if (!dsn[component]) {
          logger.error(`Invalid Sentry Dsn: ${component} missing`);
          return true;
        }
        return false;
      });

      if (hasMissingRequiredComponent) {
        return false;
      }

      if (!projectId.match(/^\d+$/)) {
        logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
        return false;
      }

      if (!isValidProtocol(protocol)) {
        logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
        return false;
      }

      if (port && isNaN(parseInt(port, 10))) {
        logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
        return false;
      }

      return true;
    }

    /**
     * Creates a valid Sentry Dsn object, identifying a Sentry instance and project.
     * @returns a valid DsnComponents object or `undefined` if @param from is an invalid DSN source
     */
    function makeDsn(from) {
      const components = typeof from === 'string' ? dsnFromString(from) : dsnFromComponents(from);
      if (!components || !validateDsn(components)) {
        return undefined;
      }
      return components;
    }

    /** An error emitted by Sentry SDKs and related utilities. */
    class SentryError extends Error {
      /** Display name of this error instance. */

      constructor(message, logLevel = 'warn') {
        super(message); this.message = message;
        this.name = new.target.prototype.constructor.name;
        // This sets the prototype to be `Error`, not `SentryError`. It's unclear why we do this, but commenting this line
        // out causes various (seemingly totally unrelated) playwright tests consistently time out. FYI, this makes
        // instances of `SentryError` fail `obj instanceof SentryError` checks.
        Object.setPrototypeOf(this, new.target.prototype);
        this.logLevel = logLevel;
      }
    }

    /**
     * Replace a method in an object with a wrapped version of itself.
     *
     * @param source An object that contains a method to be wrapped.
     * @param name The name of the method to be wrapped.
     * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
     * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
     * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
     * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
     * @returns void
     */
    function fill(source, name, replacementFactory) {
      if (!(name in source)) {
        return;
      }

      const original = source[name];
      const wrapped = replacementFactory(original);

      // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
      // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
      if (typeof wrapped === 'function') {
        markFunctionWrapped(wrapped, original);
      }

      source[name] = wrapped;
    }

    /**
     * Defines a non-enumerable property on the given object.
     *
     * @param obj The object on which to set the property
     * @param name The name of the property to be set
     * @param value The value to which to set the property
     */
    function addNonEnumerableProperty(obj, name, value) {
      try {
        Object.defineProperty(obj, name, {
          // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
          value: value,
          writable: true,
          configurable: true,
        });
      } catch (o_O) {
        logger.log(`Failed to add non-enumerable property "${name}" to object`, obj);
      }
    }

    /**
     * Remembers the original function on the wrapped function and
     * patches up the prototype.
     *
     * @param wrapped the wrapper function
     * @param original the original function that gets wrapped
     */
    function markFunctionWrapped(wrapped, original) {
      try {
        const proto = original.prototype || {};
        wrapped.prototype = original.prototype = proto;
        addNonEnumerableProperty(wrapped, '__sentry_original__', original);
      } catch (o_O) { } // eslint-disable-line no-empty
    }

    /**
     * This extracts the original function if available.  See
     * `markFunctionWrapped` for more information.
     *
     * @param func the function to unwrap
     * @returns the unwrapped version of the function if available.
     */
    function getOriginalFunction(func) {
      return func.__sentry_original__;
    }

    /**
     * Encodes given object into url-friendly format
     *
     * @param object An object that contains serializable values
     * @returns string Encoded
     */
    function urlEncode(object) {
      return Object.keys(object)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
        .join('&');
    }

    /**
     * Transforms any `Error` or `Event` into a plain object with all of their enumerable properties, and some of their
     * non-enumerable properties attached.
     *
     * @param value Initial source that we have to transform in order for it to be usable by the serializer
     * @returns An Event or Error turned into an object - or the value argurment itself, when value is neither an Event nor
     *  an Error.
     */
    function convertToPlainObject(
      value,
    ) {
      if (isError(value)) {
        return {
          message: value.message,
          name: value.name,
          stack: value.stack,
          ...getOwnProperties(value),
        };
      } else if (isEvent(value)) {
        const newObj

          = {
          type: value.type,
          target: serializeEventTarget(value.target),
          currentTarget: serializeEventTarget(value.currentTarget),
          ...getOwnProperties(value),
        };

        if (typeof CustomEvent !== 'undefined' && isInstanceOf(value, CustomEvent)) {
          newObj.detail = value.detail;
        }

        return newObj;
      } else {
        return value;
      }
    }

    /** Creates a string representation of the target of an `Event` object */
    function serializeEventTarget(target) {
      try {
        return isElement(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
      } catch (_oO) {
        return '<unknown>';
      }
    }

    /** Filters out all but an object's own properties */
    function getOwnProperties(obj) {
      if (typeof obj === 'object' && obj !== null) {
        const extractedProps = {};
        for (const property in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, property)) {
            extractedProps[property] = (obj)[property];
          }
        }
        return extractedProps;
      } else {
        return {};
      }
    }

    /**
     * Given any captured exception, extract its keys and create a sorted
     * and truncated list that will be used inside the event message.
     * eg. `Non-error exception captured with keys: foo, bar, baz`
     */
    function extractExceptionKeysForMessage(exception, maxLength = 40) {
      const keys = Object.keys(convertToPlainObject(exception));
      keys.sort();

      const firstKey = keys[0];

      if (!firstKey) {
        return '[object has no keys]';
      }

      if (firstKey.length >= maxLength) {
        return truncate(firstKey, maxLength);
      }

      for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        const serialized = keys.slice(0, includedKeys).join(', ');
        if (serialized.length > maxLength) {
          continue;
        }
        if (includedKeys === keys.length) {
          return serialized;
        }
        return truncate(serialized, maxLength);
      }

      return '';
    }

    /**
     * Given any object, return a new object having removed all fields whose value was `undefined`.
     * Works recursively on objects and arrays.
     *
     * Attention: This function keeps circular references in the returned object.
     */
    function dropUndefinedKeys(inputValue) {
      // This map keeps track of what already visited nodes map to.
      // Our Set - based memoBuilder doesn't work here because we want to the output object to have the same circular
      // references as the input object.
      const memoizationMap = new Map();

      // This function just proxies `_dropUndefinedKeys` to keep the `memoBuilder` out of this function's API
      return _dropUndefinedKeys(inputValue, memoizationMap);
    }

    function _dropUndefinedKeys(inputValue, memoizationMap) {
      if (isPojo(inputValue)) {
        // If this node has already been visited due to a circular reference, return the object it was mapped to in the new object
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== undefined) {
          return memoVal;
        }

        const returnValue = {};
        // Store the mapping of this value in case we visit it again, in case of circular data
        memoizationMap.set(inputValue, returnValue);

        for (const key of Object.keys(inputValue)) {
          if (typeof inputValue[key] !== 'undefined') {
            returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap);
          }
        }

        return returnValue;
      }

      if (Array.isArray(inputValue)) {
        // If this node has already been visited due to a circular reference, return the array it was mapped to in the new object
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== undefined) {
          return memoVal;
        }

        const returnValue = [];
        // Store the mapping of this value in case we visit it again, in case of circular data
        memoizationMap.set(inputValue, returnValue);

        inputValue.forEach((item) => {
          returnValue.push(_dropUndefinedKeys(item, memoizationMap));
        });

        return returnValue;
      }

      return inputValue;
    }

    function isPojo(input) {
      if (!isPlainObject(input)) {
        return false;
      }

      try {
        const name = (Object.getPrototypeOf(input)).constructor.name;
        return !name || name === 'Object';
      } catch (e) {
        return true;
      }
    }

    const STACKTRACE_FRAME_LIMIT = 50;
    const UNKNOWN_FUNCTION = '?';
    // Used to sanitize webpack (error: *) wrapped stack errors
    const WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
    const STRIP_FRAME_REGEXP = /captureMessage|captureException/;

    /**
     * Creates a stack parser with the supplied line parsers
     *
     * StackFrames are returned in the correct order for Sentry Exception
     * frames and with Sentry SDK internal frames removed from the top and bottom
     *
     */
    function createStackParser(...parsers) {
      const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map(p => p[1]);

      return (stack, skipFirstLines = 0, framesToPop = 0) => {
        const frames = [];
        const lines = stack.split('\n');

        for (let i = skipFirstLines; i < lines.length; i++) {
          const line = lines[i];
          // Ignore lines over 1kb as they are unlikely to be stack frames.
          // Many of the regular expressions use backtracking which results in run time that increases exponentially with
          // input size. Huge strings can result in hangs/Denial of Service:
          // https://github.com/getsentry/sentry-javascript/issues/2286
          if (line.length > 1024) {
            continue;
          }

          // https://github.com/getsentry/sentry-javascript/issues/5459
          // Remove webpack (error: *) wrappers
          const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, '$1') : line;

          // https://github.com/getsentry/sentry-javascript/issues/7813
          // Skip Error: lines
          if (cleanedLine.match(/\S*Error: /)) {
            continue;
          }

          for (const parser of sortedParsers) {
            const frame = parser(cleanedLine);

            if (frame) {
              frames.push(frame);
              break;
            }
          }

          if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) {
            break;
          }
        }

        return stripSentryFramesAndReverse(frames.slice(framesToPop));
      };
    }

    /**
     * Gets a stack parser implementation from Options.stackParser
     * @see Options
     *
     * If options contains an array of line parsers, it is converted into a parser
     */
    function stackParserFromStackParserOptions(stackParser) {
      if (Array.isArray(stackParser)) {
        return createStackParser(...stackParser);
      }
      return stackParser;
    }

    /**
     * Removes Sentry frames from the top and bottom of the stack if present and enforces a limit of max number of frames.
     * Assumes stack input is ordered from top to bottom and returns the reverse representation so call site of the
     * function that caused the crash is the last frame in the array.
     * @hidden
     */
    function stripSentryFramesAndReverse(stack) {
      if (!stack.length) {
        return [];
      }

      const localStack = Array.from(stack);

      // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
      if (/sentryWrapped/.test(getLastStackFrame(localStack).function || '')) {
        localStack.pop();
      }

      // Reversing in the middle of the procedure allows us to just pop the values off the stack
      localStack.reverse();

      // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
      if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || '')) {
        localStack.pop();

        // When using synthetic events, we will have a 2 levels deep stack, as `new Error('Sentry syntheticException')`
        // is produced within the hub itself, making it:
        //
        //   Sentry.captureException()
        //   getCurrentHub().captureException()
        //
        // instead of just the top `Sentry` call itself.
        // This forces us to possibly strip an additional frame in the exact same was as above.
        if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || '')) {
          localStack.pop();
        }
      }

      return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map(frame => ({
        ...frame,
        filename: frame.filename || getLastStackFrame(localStack).filename,
        function: frame.function || UNKNOWN_FUNCTION,
      }));
    }

    function getLastStackFrame(arr) {
      return arr[arr.length - 1] || {};
    }

    const defaultFunctionName = '<anonymous>';

    /**
     * Safely extract function name from itself
     */
    function getFunctionName(fn) {
      try {
        if (!fn || typeof fn !== 'function') {
          return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
      } catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        return defaultFunctionName;
      }
    }

    /**
     * Get's stack frames from an event without needing to check for undefined properties.
     */
    function getFramesFromEvent(event) {
      const exception = event.exception;

      if (exception) {
        const frames = [];
        try {
          // @ts-expect-error Object could be undefined
          exception.values.forEach(value => {
            // @ts-expect-error Value could be undefined
            if (value.stacktrace.frames) {
              // @ts-expect-error Value could be undefined
              frames.push(...value.stacktrace.frames);
            }
          });
          return frames;
        } catch (_oO) {
          return undefined;
        }
      }
      return undefined;
    }

    // We keep the handlers globally
    const handlers = {};
    const instrumented = {};

    /** Add a handler function. */
    function addHandler(type, handler) {
      handlers[type] = handlers[type] || [];
      (handlers[type]).push(handler);
    }

    /** Maybe run an instrumentation function, unless it was already called. */
    function maybeInstrument(type, instrumentFn) {
      if (!instrumented[type]) {
        instrumentFn();
        instrumented[type] = true;
      }
    }

    /** Trigger handlers for a given instrumentation type. */
    function triggerHandlers(type, data) {
      const typeHandlers = type && handlers[type];
      if (!typeHandlers) {
        return;
      }

      for (const handler of typeHandlers) {
        try {
          handler(data);
        } catch (e) {
          logger.error(
            `Error while triggering instrumentation handler.\nType: ${type}\nName: ${getFunctionName(handler)}\nError:`,
            e,
          );
        }
      }
    }

    /**
     * Add an instrumentation handler for when a console.xxx method is called.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addConsoleInstrumentationHandler(handler) {
      const type = 'console';
      addHandler(type, handler);
      maybeInstrument(type, instrumentConsole);
    }

    function instrumentConsole() {
      if (!('console' in GLOBAL_OBJ)) {
        return;
      }

      CONSOLE_LEVELS.forEach(function (level) {
        if (!(level in GLOBAL_OBJ.console)) {
          return;
        }

        fill(GLOBAL_OBJ.console, level, function (originalConsoleMethod) {
          originalConsoleMethods[level] = originalConsoleMethod;

          return function (...args) {
            const handlerData = { args, level };
            triggerHandlers('console', handlerData);

            const log = originalConsoleMethods[level];
            log && log.apply(GLOBAL_OBJ.console, args);
          };
        });
      });
    }

    const WINDOW$3 = GLOBAL_OBJ;

    /**
     * Tells whether current environment supports Fetch API
     * {@link supportsFetch}.
     *
     * @returns Answer to the given question.
     */
    function supportsFetch() {
      if (!('fetch' in WINDOW$3)) {
        return false;
      }

      try {
        new Headers();
        new Request('http://www.example.com');
        new Response();
        return true;
      } catch (e) {
        return false;
      }
    }

    /**
     * isNative checks if the given function is a native implementation
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    function isNativeFunction(func) {
      return func && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
    }

    /**
     * Tells whether current environment supports Fetch API natively
     * {@link supportsNativeFetch}.
     *
     * @returns true if `window.fetch` is natively implemented, false otherwise
     */
    function supportsNativeFetch() {
      if (typeof EdgeRuntime === 'string') {
        return true;
      }

      if (!supportsFetch()) {
        return false;
      }

      // Fast path to avoid DOM I/O
      // eslint-disable-next-line @typescript-eslint/unbound-method
      if (isNativeFunction(WINDOW$3.fetch)) {
        return true;
      }

      // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
      // so create a "pure" iframe to see if that has native fetch
      let result = false;
      const doc = WINDOW$3.document;
      // eslint-disable-next-line deprecation/deprecation
      if (doc && typeof (doc.createElement) === 'function') {
        try {
          const sandbox = doc.createElement('iframe');
          sandbox.hidden = true;
          doc.head.appendChild(sandbox);
          if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            result = isNativeFunction(sandbox.contentWindow.fetch);
          }
          doc.head.removeChild(sandbox);
        } catch (err) {
          logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
        }
      }

      return result;
    }

    const ONE_SECOND_IN_MS = 1000;

    /**
     * A partial definition of the [Performance Web API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance}
     * for accessing a high-resolution monotonic clock.
     */

    /**
     * Returns a timestamp in seconds since the UNIX epoch using the Date API.
     *
     * TODO(v8): Return type should be rounded.
     */
    function dateTimestampInSeconds() {
      return Date.now() / ONE_SECOND_IN_MS;
    }

    /**
     * Returns a wrapper around the native Performance API browser implementation, or undefined for browsers that do not
     * support the API.
     *
     * Wrapping the native API works around differences in behavior from different browsers.
     */
    function createUnixTimestampInSecondsFunc() {
      const { performance } = GLOBAL_OBJ;
      if (!performance || !performance.now) {
        return dateTimestampInSeconds;
      }

      // Some browser and environments don't have a timeOrigin, so we fallback to
      // using Date.now() to compute the starting time.
      const approxStartingTimeOrigin = Date.now() - performance.now();
      const timeOrigin = performance.timeOrigin == undefined ? approxStartingTimeOrigin : performance.timeOrigin;

      // performance.now() is a monotonic clock, which means it starts at 0 when the process begins. To get the current
      // wall clock time (actual UNIX timestamp), we need to add the starting time origin and the current time elapsed.
      //
      // TODO: This does not account for the case where the monotonic clock that powers performance.now() drifts from the
      // wall clock time, which causes the returned timestamp to be inaccurate. We should investigate how to detect and
      // correct for this.
      // See: https://github.com/getsentry/sentry-javascript/issues/2590
      // See: https://github.com/mdn/content/issues/4713
      // See: https://dev.to/noamr/when-a-millisecond-is-not-a-millisecond-3h6
      return () => {
        return (timeOrigin + performance.now()) / ONE_SECOND_IN_MS;
      };
    }

    /**
     * Returns a timestamp in seconds since the UNIX epoch using either the Performance or Date APIs, depending on the
     * availability of the Performance API.
     *
     * BUG: Note that because of how browsers implement the Performance API, the clock might stop when the computer is
     * asleep. This creates a skew between `dateTimestampInSeconds` and `timestampInSeconds`. The
     * skew can grow to arbitrary amounts like days, weeks or months.
     * See https://github.com/getsentry/sentry-javascript/issues/2590.
     */
    const timestampInSeconds = createUnixTimestampInSecondsFunc();

    /**
     * The number of milliseconds since the UNIX epoch. This value is only usable in a browser, and only when the
     * performance API is available.
     */
    (() => {
      // Unfortunately browsers may report an inaccurate time origin data, through either performance.timeOrigin or
      // performance.timing.navigationStart, which results in poor results in performance data. We only treat time origin
      // data as reliable if they are within a reasonable threshold of the current time.

      const { performance } = GLOBAL_OBJ;
      if (!performance || !performance.now) {
        return undefined;
      }

      const threshold = 3600 * 1000;
      const performanceNow = performance.now();
      const dateNow = Date.now();

      // if timeOrigin isn't available set delta to threshold so it isn't used
      const timeOriginDelta = performance.timeOrigin
        ? Math.abs(performance.timeOrigin + performanceNow - dateNow)
        : threshold;
      const timeOriginIsReliable = timeOriginDelta < threshold;

      // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
      // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
      // Also as of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always
      // a valid fallback. In the absence of an initial time provided by the browser, fallback to the current time from the
      // Date API.
      // eslint-disable-next-line deprecation/deprecation
      const navigationStart = performance.timing && performance.timing.navigationStart;
      const hasNavigationStart = typeof navigationStart === 'number';
      // if navigationStart isn't available set delta to threshold so it isn't used
      const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
      const navigationStartIsReliable = navigationStartDelta < threshold;

      if (timeOriginIsReliable || navigationStartIsReliable) {
        // Use the more reliable time origin
        if (timeOriginDelta <= navigationStartDelta) {
          return performance.timeOrigin;
        } else {
          return navigationStart;
        }
      }
      return dateNow;
    })();

    /**
     * Add an instrumentation handler for when a fetch request happens.
     * The handler function is called once when the request starts and once when it ends,
     * which can be identified by checking if it has an `endTimestamp`.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addFetchInstrumentationHandler(handler) {
      const type = 'fetch';
      addHandler(type, handler);
      maybeInstrument(type, instrumentFetch);
    }

    function instrumentFetch() {
      if (!supportsNativeFetch()) {
        return;
      }

      fill(GLOBAL_OBJ, 'fetch', function (originalFetch) {
        return function (...args) {
          const { method, url } = parseFetchArgs(args);

          const handlerData = {
            args,
            fetchData: {
              method,
              url,
            },
            startTimestamp: timestampInSeconds() * 1000,
          };

          triggerHandlers('fetch', {
            ...handlerData,
          });

          // We capture the stack right here and not in the Promise error callback because Safari (and probably other
          // browsers too) will wipe the stack trace up to this point, only leaving us with this file which is useless.

          // NOTE: If you are a Sentry user, and you are seeing this stack frame,
          //       it means the error, that was caused by your fetch call did not
          //       have a stack trace, so the SDK backfilled the stack trace so
          //       you can see which fetch call failed.
          const virtualStackTrace = new Error().stack;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return originalFetch.apply(GLOBAL_OBJ, args).then(
            (response) => {
              const finishedHandlerData = {
                ...handlerData,
                endTimestamp: timestampInSeconds() * 1000,
                response,
              };

              triggerHandlers('fetch', finishedHandlerData);
              return response;
            },
            (error) => {
              const erroredHandlerData = {
                ...handlerData,
                endTimestamp: timestampInSeconds() * 1000,
                error,
              };

              triggerHandlers('fetch', erroredHandlerData);

              if (isError(error) && error.stack === undefined) {
                // NOTE: If you are a Sentry user, and you are seeing this stack frame,
                //       it means the error, that was caused by your fetch call did not
                //       have a stack trace, so the SDK backfilled the stack trace so
                //       you can see which fetch call failed.
                error.stack = virtualStackTrace;
                addNonEnumerableProperty(error, 'framesToPop', 1);
              }

              // NOTE: If you are a Sentry user, and you are seeing this stack frame,
              //       it means the sentry.javascript SDK caught an error invoking your application code.
              //       This is expected behavior and NOT indicative of a bug with sentry.javascript.
              throw error;
            },
          );
        };
      });
    }

    function hasProp(obj, prop) {
      return !!obj && typeof obj === 'object' && !!(obj)[prop];
    }

    function getUrlFromResource(resource) {
      if (typeof resource === 'string') {
        return resource;
      }

      if (!resource) {
        return '';
      }

      if (hasProp(resource, 'url')) {
        return resource.url;
      }

      if (resource.toString) {
        return resource.toString();
      }

      return '';
    }

    /**
     * Parses the fetch arguments to find the used Http method and the url of the request.
     * Exported for tests only.
     */
    function parseFetchArgs(fetchArgs) {
      if (fetchArgs.length === 0) {
        return { method: 'GET', url: '' };
      }

      if (fetchArgs.length === 2) {
        const [url, options] = fetchArgs;

        return {
          url: getUrlFromResource(url),
          method: hasProp(options, 'method') ? String(options.method).toUpperCase() : 'GET',
        };
      }

      const arg = fetchArgs[0];
      return {
        url: getUrlFromResource(arg),
        method: hasProp(arg, 'method') ? String(arg.method).toUpperCase() : 'GET',
      };
    }

    let _oldOnErrorHandler = null;

    /**
     * Add an instrumentation handler for when an error is captured by the global error handler.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addGlobalErrorInstrumentationHandler(handler) {
      const type = 'error';
      addHandler(type, handler);
      maybeInstrument(type, instrumentError);
    }

    function instrumentError() {
      _oldOnErrorHandler = GLOBAL_OBJ.onerror;

      GLOBAL_OBJ.onerror = function (
        msg,
        url,
        line,
        column,
        error,
      ) {
        const handlerData = {
          column,
          error,
          line,
          msg,
          url,
        };
        triggerHandlers('error', handlerData);

        if (_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__) {
          // eslint-disable-next-line prefer-rest-params
          return _oldOnErrorHandler.apply(this, arguments);
        }

        return false;
      };

      GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
    }

    let _oldOnUnhandledRejectionHandler = null;

    /**
     * Add an instrumentation handler for when an unhandled promise rejection is captured.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addGlobalUnhandledRejectionInstrumentationHandler(
      handler,
    ) {
      const type = 'unhandledrejection';
      addHandler(type, handler);
      maybeInstrument(type, instrumentUnhandledRejection);
    }

    function instrumentUnhandledRejection() {
      _oldOnUnhandledRejectionHandler = GLOBAL_OBJ.onunhandledrejection;

      GLOBAL_OBJ.onunhandledrejection = function (e) {
        const handlerData = e;
        triggerHandlers('unhandledrejection', handlerData);

        if (_oldOnUnhandledRejectionHandler && !_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__) {
          // eslint-disable-next-line prefer-rest-params
          return _oldOnUnhandledRejectionHandler.apply(this, arguments);
        }

        return true;
      };

      GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
    }

    /*
     * This module exists for optimizations in the build process through rollup and terser.  We define some global
     * constants, which can be overridden during build. By guarding certain pieces of code with functions that return these
     * constants, we can control whether or not they appear in the final bundle. (Any code guarded by a false condition will
     * never run, and will hence be dropped during treeshaking.) The two primary uses for this are stripping out calls to
     * `logger` and preventing node-related code from appearing in browser bundles.
     *
     * Attention:
     * This file should not be used to define constants/flags that are intended to be used for tree-shaking conducted by
     * users. These flags should live in their respective packages, as we identified user tooling (specifically webpack)
     * having issues tree-shaking these constants across package boundaries.
     * An example for this is the true constant. It is declared in each package individually because we want
     * users to be able to shake away expressions that it guards.
     */


    /**
     * Get source of SDK.
     */
    function getSDKSource() {
      // @ts-expect-error "npm" is injected by rollup during build process
      return "npm";
    }

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-explicit-any */

    /**
     * Helper to decycle json objects
     */
    function memoBuilder() {
      const hasWeakSet = typeof WeakSet === 'function';
      const inner = hasWeakSet ? new WeakSet() : [];
      function memoize(obj) {
        if (hasWeakSet) {
          if (inner.has(obj)) {
            return true;
          }
          inner.add(obj);
          return false;
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < inner.length; i++) {
          const value = inner[i];
          if (value === obj) {
            return true;
          }
        }
        inner.push(obj);
        return false;
      }

      function unmemoize(obj) {
        if (hasWeakSet) {
          inner.delete(obj);
        } else {
          for (let i = 0; i < inner.length; i++) {
            if (inner[i] === obj) {
              inner.splice(i, 1);
              break;
            }
          }
        }
      }
      return [memoize, unmemoize];
    }

    /**
     * UUID4 generator
     *
     * @returns string Generated UUID4.
     */
    function uuid4() {
      const gbl = GLOBAL_OBJ;
      const crypto = gbl.crypto || gbl.msCrypto;

      let getRandomByte = () => Math.random() * 16;
      try {
        if (crypto && crypto.randomUUID) {
          return crypto.randomUUID().replace(/-/g, '');
        }
        if (crypto && crypto.getRandomValues) {
          getRandomByte = () => {
            // crypto.getRandomValues might return undefined instead of the typed array
            // in old Chromium versions (e.g. 23.0.1235.0 (151422))
            // However, `typedArray` is still filled in-place.
            // @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#typedarray
            const typedArray = new Uint8Array(1);
            crypto.getRandomValues(typedArray);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return typedArray[0];
          };
        }
      } catch (_) {
        // some runtimes can crash invoking crypto
        // https://github.com/getsentry/sentry-javascript/issues/8935
      }

      // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
      // Concatenating the following numbers as strings results in '10000000100040008000100000000000'
      return (([1e7]) + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line no-bitwise
        ((c) ^ ((getRandomByte() & 15) >> ((c) / 4))).toString(16),
      );
    }

    function getFirstException(event) {
      return event.exception && event.exception.values ? event.exception.values[0] : undefined;
    }

    /**
     * Extracts either message or type+value from an event that can be used for user-facing logs
     * @returns event's description
     */
    function getEventDescription(event) {
      const { message, event_id: eventId } = event;
      if (message) {
        return message;
      }

      const firstException = getFirstException(event);
      if (firstException) {
        if (firstException.type && firstException.value) {
          return `${firstException.type}: ${firstException.value}`;
        }
        return firstException.type || firstException.value || eventId || '<unknown>';
      }
      return eventId || '<unknown>';
    }

    /**
     * Adds exception values, type and value to an synthetic Exception.
     * @param event The event to modify.
     * @param value Value of the exception.
     * @param type Type of the exception.
     * @hidden
     */
    function addExceptionTypeValue(event, value, type) {
      const exception = (event.exception = event.exception || {});
      const values = (exception.values = exception.values || []);
      const firstException = (values[0] = values[0] || {});
      if (!firstException.value) {
        firstException.value = value || '';
      }
      if (!firstException.type) {
        firstException.type = type || 'Error';
      }
    }

    /**
     * Adds exception mechanism data to a given event. Uses defaults if the second parameter is not passed.
     *
     * @param event The event to modify.
     * @param newMechanism Mechanism data to add to the event.
     * @hidden
     */
    function addExceptionMechanism(event, newMechanism) {
      const firstException = getFirstException(event);
      if (!firstException) {
        return;
      }

      const defaultMechanism = { type: 'generic', handled: true };
      const currentMechanism = firstException.mechanism;
      firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };

      if (newMechanism && 'data' in newMechanism) {
        const mergedData = { ...(currentMechanism && currentMechanism.data), ...newMechanism.data };
        firstException.mechanism.data = mergedData;
      }
    }

    /**
     * Checks whether or not we've already captured the given exception (note: not an identical exception - the very object
     * in question), and marks it captured if not.
     *
     * This is useful because it's possible for an error to get captured by more than one mechanism. After we intercept and
     * record an error, we rethrow it (assuming we've intercepted it before it's reached the top-level global handlers), so
     * that we don't interfere with whatever effects the error might have had were the SDK not there. At that point, because
     * the error has been rethrown, it's possible for it to bubble up to some other code we've instrumented. If it's not
     * caught after that, it will bubble all the way up to the global handlers (which of course we also instrument). This
     * function helps us ensure that even if we encounter the same error more than once, we only record it the first time we
     * see it.
     *
     * Note: It will ignore primitives (always return `false` and not mark them as seen), as properties can't be set on
     * them. {@link: Object.objectify} can be used on exceptions to convert any that are primitives into their equivalent
     * object wrapper forms so that this check will always work. However, because we need to flag the exact object which
     * will get rethrown, and because that rethrowing happens outside of the event processing pipeline, the objectification
     * must be done before the exception captured.
     *
     * @param A thrown exception to check or flag as having been seen
     * @returns `true` if the exception has already been captured, `false` if not (with the side effect of marking it seen)
     */
    function checkOrSetAlreadyCaught(exception) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (exception && (exception).__sentry_captured__) {
        return true;
      }

      try {
        // set it this way rather than by assignment so that it's not ennumerable and therefore isn't recorded by the
        // `ExtraErrorData` integration
        addNonEnumerableProperty(exception, '__sentry_captured__', true);
      } catch (err) {
        // `exception` is a primitive, so we can't mark it seen
      }

      return false;
    }

    /**
     * Checks whether the given input is already an array, and if it isn't, wraps it in one.
     *
     * @param maybeArray Input to turn into an array, if necessary
     * @returns The input, if already an array, or an array with the input as the only element, if not
     */
    function arrayify(maybeArray) {
      return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
    }

    /**
     * Recursively normalizes the given object.
     *
     * - Creates a copy to prevent original input mutation
     * - Skips non-enumerable properties
     * - When stringifying, calls `toJSON` if implemented
     * - Removes circular references
     * - Translates non-serializable values (`undefined`/`NaN`/functions) to serializable format
     * - Translates known global objects/classes to a string representations
     * - Takes care of `Error` object serialization
     * - Optionally limits depth of final output
     * - Optionally limits number of properties/elements included in any single object/array
     *
     * @param input The object to be normalized.
     * @param depth The max depth to which to normalize the object. (Anything deeper stringified whole.)
     * @param maxProperties The max number of elements or properties to be included in any single array or
     * object in the normallized output.
     * @returns A normalized version of the object, or `"**non-serializable**"` if any errors are thrown during normalization.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function normalize(input, depth = 100, maxProperties = +Infinity) {
      try {
        // since we're at the outermost level, we don't provide a key
        return visit('', input, depth, maxProperties);
      } catch (err) {
        return { ERROR: `**non-serializable** (${err})` };
      }
    }

    /** JSDoc */
    function normalizeToSize(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      object,
      // Default Node.js REPL depth
      depth = 3,
      // 100kB, as 200kB is max payload size, so half sounds reasonable
      maxSize = 100 * 1024,
    ) {
      const normalized = normalize(object, depth);

      if (jsonSize(normalized) > maxSize) {
        return normalizeToSize(object, depth - 1, maxSize);
      }

      return normalized;
    }

    /**
     * Visits a node to perform normalization on it
     *
     * @param key The key corresponding to the given node
     * @param value The node to be visited
     * @param depth Optional number indicating the maximum recursion depth
     * @param maxProperties Optional maximum number of properties/elements included in any single object/array
     * @param memo Optional Memo class handling decycling
     */
    function visit(
      key,
      value,
      depth = +Infinity,
      maxProperties = +Infinity,
      memo = memoBuilder(),
    ) {
      const [memoize, unmemoize] = memo;

      // Get the simple cases out of the way first
      if (
        value == null || // this matches null and undefined -> eqeq not eqeqeq
        (['number', 'boolean', 'string'].includes(typeof value) && !Number.isNaN(value))
      ) {
        return value;
      }

      const stringified = stringifyValue(key, value);

      // Anything we could potentially dig into more (objects or arrays) will have come back as `"[object XXXX]"`.
      // Everything else will have already been serialized, so if we don't see that pattern, we're done.
      if (!stringified.startsWith('[object ')) {
        return stringified;
      }

      // From here on, we can assert that `value` is either an object or an array.

      // Do not normalize objects that we know have already been normalized. As a general rule, the
      // "__sentry_skip_normalization__" property should only be used sparingly and only should only be set on objects that
      // have already been normalized.
      if ((value)['__sentry_skip_normalization__']) {
        return value;
      }

      // We can set `__sentry_override_normalization_depth__` on an object to ensure that from there
      // We keep a certain amount of depth.
      // This should be used sparingly, e.g. we use it for the redux integration to ensure we get a certain amount of state.
      const remainingDepth =
        typeof (value)['__sentry_override_normalization_depth__'] === 'number'
          ? ((value)['__sentry_override_normalization_depth__'])
          : depth;

      // We're also done if we've reached the max depth
      if (remainingDepth === 0) {
        // At this point we know `serialized` is a string of the form `"[object XXXX]"`. Clean it up so it's just `"[XXXX]"`.
        return stringified.replace('object ', '');
      }

      // If we've already visited this branch, bail out, as it's circular reference. If not, note that we're seeing it now.
      if (memoize(value)) {
        return '[Circular ~]';
      }

      // If the value has a `toJSON` method, we call it to extract more information
      const valueWithToJSON = value;
      if (valueWithToJSON && typeof valueWithToJSON.toJSON === 'function') {
        try {
          const jsonValue = valueWithToJSON.toJSON();
          // We need to normalize the return value of `.toJSON()` in case it has circular references
          return visit('', jsonValue, remainingDepth - 1, maxProperties, memo);
        } catch (err) {
          // pass (The built-in `toJSON` failed, but we can still try to do it ourselves)
        }
      }

      // At this point we know we either have an object or an array, we haven't seen it before, and we're going to recurse
      // because we haven't yet reached the max depth. Create an accumulator to hold the results of visiting each
      // property/entry, and keep track of the number of items we add to it.
      const normalized = (Array.isArray(value) ? [] : {});
      let numAdded = 0;

      // Before we begin, convert`Error` and`Event` instances into plain objects, since some of each of their relevant
      // properties are non-enumerable and otherwise would get missed.
      const visitable = convertToPlainObject(value);

      for (const visitKey in visitable) {
        // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
        if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
          continue;
        }

        if (numAdded >= maxProperties) {
          normalized[visitKey] = '[MaxProperties ~]';
          break;
        }

        // Recursively visit all the child nodes
        const visitValue = visitable[visitKey];
        normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);

        numAdded++;
      }

      // Once we've visited all the branches, remove the parent from memo storage
      unmemoize(value);

      // Return accumulated values
      return normalized;
    }

    /* eslint-disable complexity */
    /**
     * Stringify the given value. Handles various known special values and types.
     *
     * Not meant to be used on simple primitives which already have a string representation, as it will, for example, turn
     * the number 1231 into "[Object Number]", nor on `null`, as it will throw.
     *
     * @param value The value to stringify
     * @returns A stringified representation of the given value
     */
    function stringifyValue(
      key,
      // this type is a tiny bit of a cheat, since this function does handle NaN (which is technically a number), but for
      // our internal use, it'll do
      value,
    ) {
      try {
        if (key === 'domain' && value && typeof value === 'object' && (value)._events) {
          return '[Domain]';
        }

        if (key === 'domainEmitter') {
          return '[DomainEmitter]';
        }

        // It's safe to use `global`, `window`, and `document` here in this manner, as we are asserting using `typeof` first
        // which won't throw if they are not present.

        if (typeof global !== 'undefined' && value === global) {
          return '[Global]';
        }

        // eslint-disable-next-line no-restricted-globals
        if (typeof window !== 'undefined' && value === window) {
          return '[Window]';
        }

        // eslint-disable-next-line no-restricted-globals
        if (typeof document !== 'undefined' && value === document) {
          return '[Document]';
        }

        if (isVueViewModel(value)) {
          return '[VueViewModel]';
        }

        // React's SyntheticEvent thingy
        if (isSyntheticEvent(value)) {
          return '[SyntheticEvent]';
        }

        if (typeof value === 'number' && value !== value) {
          return '[NaN]';
        }

        if (typeof value === 'function') {
          return `[Function: ${getFunctionName(value)}]`;
        }

        if (typeof value === 'symbol') {
          return `[${String(value)}]`;
        }

        // stringified BigInts are indistinguishable from regular numbers, so we need to label them to avoid confusion
        if (typeof value === 'bigint') {
          return `[BigInt: ${String(value)}]`;
        }

        // Now that we've knocked out all the special cases and the primitives, all we have left are objects. Simply casting
        // them to strings means that instances of classes which haven't defined their `toStringTag` will just come out as
        // `"[object Object]"`. If we instead look at the constructor's name (which is the same as the name of the class),
        // we can make sure that only plain objects come out that way.
        const objName = getConstructorName(value);

        // Handle HTML Elements
        if (/^HTML(\w*)Element$/.test(objName)) {
          return `[HTMLElement: ${objName}]`;
        }

        return `[object ${objName}]`;
      } catch (err) {
        return `**non-serializable** (${err})`;
      }
    }
    /* eslint-enable complexity */

    function getConstructorName(value) {
      const prototype = Object.getPrototypeOf(value);

      return prototype ? prototype.constructor.name : 'null prototype';
    }

    /** Calculates bytes size of input string */
    function utf8Length(value) {
      // eslint-disable-next-line no-bitwise
      return ~-encodeURI(value).split(/%..|./).length;
    }

    /** Calculates bytes size of input object */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function jsonSize(value) {
      return utf8Length(JSON.stringify(value));
    }

    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    /* eslint-disable @typescript-eslint/no-explicit-any */

    /** SyncPromise internal states */
    var States; (function (States) {
      /** Pending */
      const PENDING = 0; States[States["PENDING"] = PENDING] = "PENDING";
      /** Resolved / OK */
      const RESOLVED = 1; States[States["RESOLVED"] = RESOLVED] = "RESOLVED";
      /** Rejected / Error */
      const REJECTED = 2; States[States["REJECTED"] = REJECTED] = "REJECTED";
    })(States || (States = {}));

    // Overloads so we can call resolvedSyncPromise without arguments and generic argument

    /**
     * Creates a resolved sync promise.
     *
     * @param value the value to resolve the promise with
     * @returns the resolved sync promise
     */
    function resolvedSyncPromise(value) {
      return new SyncPromise(resolve => {
        resolve(value);
      });
    }

    /**
     * Creates a rejected sync promise.
     *
     * @param value the value to reject the promise with
     * @returns the rejected sync promise
     */
    function rejectedSyncPromise(reason) {
      return new SyncPromise((_, reject) => {
        reject(reason);
      });
    }

    /**
     * Thenable class that behaves like a Promise and follows it's interface
     * but is not async internally
     */
    class SyncPromise {

      constructor(
        executor,
      ) {
        SyncPromise.prototype.__init.call(this); SyncPromise.prototype.__init2.call(this); SyncPromise.prototype.__init3.call(this); SyncPromise.prototype.__init4.call(this);
        this._state = States.PENDING;
        this._handlers = [];

        try {
          executor(this._resolve, this._reject);
        } catch (e) {
          this._reject(e);
        }
      }

      /** JSDoc */
      then(
        onfulfilled,
        onrejected,
      ) {
        return new SyncPromise((resolve, reject) => {
          this._handlers.push([
            false,
            result => {
              if (!onfulfilled) {
                // TODO: ¯\_(ツ)_/¯
                // TODO: FIXME
                resolve(result);
              } else {
                try {
                  resolve(onfulfilled(result));
                } catch (e) {
                  reject(e);
                }
              }
            },
            reason => {
              if (!onrejected) {
                reject(reason);
              } else {
                try {
                  resolve(onrejected(reason));
                } catch (e) {
                  reject(e);
                }
              }
            },
          ]);
          this._executeHandlers();
        });
      }

      /** JSDoc */
      catch(
        onrejected,
      ) {
        return this.then(val => val, onrejected);
      }

      /** JSDoc */
      finally(onfinally) {
        return new SyncPromise((resolve, reject) => {
          let val;
          let isRejected;

          return this.then(
            value => {
              isRejected = false;
              val = value;
              if (onfinally) {
                onfinally();
              }
            },
            reason => {
              isRejected = true;
              val = reason;
              if (onfinally) {
                onfinally();
              }
            },
          ).then(() => {
            if (isRejected) {
              reject(val);
              return;
            }

            resolve(val);
          });
        });
      }

      /** JSDoc */
      __init() {
        this._resolve = (value) => {
          this._setResult(States.RESOLVED, value);
        };
      }

      /** JSDoc */
      __init2() {
        this._reject = (reason) => {
          this._setResult(States.REJECTED, reason);
        };
      }

      /** JSDoc */
      __init3() {
        this._setResult = (state, value) => {
          if (this._state !== States.PENDING) {
            return;
          }

          if (isThenable(value)) {
            void (value).then(this._resolve, this._reject);
            return;
          }

          this._state = state;
          this._value = value;

          this._executeHandlers();
        };
      }

      /** JSDoc */
      __init4() {
        this._executeHandlers = () => {
          if (this._state === States.PENDING) {
            return;
          }

          const cachedHandlers = this._handlers.slice();
          this._handlers = [];

          cachedHandlers.forEach(handler => {
            if (handler[0]) {
              return;
            }

            if (this._state === States.RESOLVED) {
              handler[1](this._value);
            }

            if (this._state === States.REJECTED) {
              handler[2](this._value);
            }

            handler[0] = true;
          });
        };
      }
    }

    /**
     * Creates an new PromiseBuffer object with the specified limit
     * @param limit max number of promises that can be stored in the buffer
     */
    function makePromiseBuffer(limit) {
      const buffer = [];

      function isReady() {
        return limit === undefined || buffer.length < limit;
      }

      /**
       * Remove a promise from the queue.
       *
       * @param task Can be any PromiseLike<T>
       * @returns Removed promise.
       */
      function remove(task) {
        return buffer.splice(buffer.indexOf(task), 1)[0] || Promise.resolve(undefined);
      }

      /**
       * Add a promise (representing an in-flight action) to the queue, and set it to remove itself on fulfillment.
       *
       * @param taskProducer A function producing any PromiseLike<T>; In previous versions this used to be `task:
       *        PromiseLike<T>`, but under that model, Promises were instantly created on the call-site and their executor
       *        functions therefore ran immediately. Thus, even if the buffer was full, the action still happened. By
       *        requiring the promise to be wrapped in a function, we can defer promise creation until after the buffer
       *        limit check.
       * @returns The original promise.
       */
      function add(taskProducer) {
        if (!isReady()) {
          return rejectedSyncPromise(new SentryError('Not adding Promise because buffer limit was reached.'));
        }

        // start the task and add its promise to the queue
        const task = taskProducer();
        if (buffer.indexOf(task) === -1) {
          buffer.push(task);
        }
        void task
          .then(() => remove(task))
          // Use `then(null, rejectionHandler)` rather than `catch(rejectionHandler)` so that we can use `PromiseLike`
          // rather than `Promise`. `PromiseLike` doesn't have a `.catch` method, making its polyfill smaller. (ES5 didn't
          // have promises, so TS has to polyfill when down-compiling.)
          .then(null, () =>
            remove(task).then(null, () => {
              // We have to add another catch here because `remove()` starts a new promise chain.
            }),
          );
        return task;
      }

      /**
       * Wait for all promises in the queue to resolve or for timeout to expire, whichever comes first.
       *
       * @param timeout The time, in ms, after which to resolve to `false` if the queue is still non-empty. Passing `0` (or
       * not passing anything) will make the promise wait as long as it takes for the queue to drain before resolving to
       * `true`.
       * @returns A promise which will resolve to `true` if the queue is already empty or drains before the timeout, and
       * `false` otherwise
       */
      function drain(timeout) {
        return new SyncPromise((resolve, reject) => {
          let counter = buffer.length;

          if (!counter) {
            return resolve(true);
          }

          // wait for `timeout` ms and then resolve to `false` (if not cancelled first)
          const capturedSetTimeout = setTimeout(() => {
            if (timeout && timeout > 0) {
              resolve(false);
            }
          }, timeout);

          // if all promises resolve in time, cancel the timer and resolve to `true`
          buffer.forEach(item => {
            void resolvedSyncPromise(item).then(() => {
              if (!--counter) {
                clearTimeout(capturedSetTimeout);
                resolve(true);
              }
            }, reject);
          });
        });
      }

      return {
        $: buffer,
        add,
        drain,
      };
    }

    /**
     * Parses string form of URL into an object
     * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
     * // intentionally using regex and not <a/> href parsing trick because React Native and other
     * // environments where DOM might not be available
     * @returns parsed URL object
     */
    function parseUrl$1(url) {
      if (!url) {
        return {};
      }

      const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

      if (!match) {
        return {};
      }

      // coerce to undefined values to empty string so we don't get 'undefined'
      const query = match[6] || '';
      const fragment = match[8] || '';
      return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        search: query,
        hash: fragment,
        relative: match[5] + query + fragment, // everything minus origin
      };
    }

    // Note: Ideally the `SeverityLevel` type would be derived from `validSeverityLevels`, but that would mean either
    //
    // a) moving `validSeverityLevels` to `@sentry/types`,
    // b) moving the`SeverityLevel` type here, or
    // c) importing `validSeverityLevels` from here into `@sentry/types`.
    //
    // Option A would make `@sentry/types` a runtime dependency of `@sentry/utils` (not good), and options B and C would
    // create a circular dependency between `@sentry/types` and `@sentry/utils` (also not good). So a TODO accompanying the
    // type, reminding anyone who changes it to change this list also, will have to do.

    const validSeverityLevels = ['fatal', 'error', 'warning', 'log', 'info', 'debug'];

    /**
     * Converts a string-based level into a `SeverityLevel`, normalizing it along the way.
     *
     * @param level String representation of desired `SeverityLevel`.
     * @returns The `SeverityLevel` corresponding to the given string, or 'log' if the string isn't a valid level.
     */
    function severityLevelFromString(level) {
      return (level === 'warn' ? 'warning' : validSeverityLevels.includes(level) ? level : 'log');
    }

    const SENTRY_BAGGAGE_KEY_PREFIX = 'sentry-';

    const SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;

    /**
     * Max length of a serialized baggage string
     *
     * https://www.w3.org/TR/baggage/#limits
     */
    const MAX_BAGGAGE_STRING_LENGTH = 8192;

    /**
     * Takes a baggage header and turns it into Dynamic Sampling Context, by extracting all the "sentry-" prefixed values
     * from it.
     *
     * @param baggageHeader A very bread definition of a baggage header as it might appear in various frameworks.
     * @returns The Dynamic Sampling Context that was found on `baggageHeader`, if there was any, `undefined` otherwise.
     */
    function baggageHeaderToDynamicSamplingContext(
      // Very liberal definition of what any incoming header might look like
      baggageHeader,
    ) {
      const baggageObject = parseBaggageHeader(baggageHeader);

      if (!baggageObject) {
        return undefined;
      }

      // Read all "sentry-" prefixed values out of the baggage object and put it onto a dynamic sampling context object.
      const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
        if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
          const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
          acc[nonPrefixedKey] = value;
        }
        return acc;
      }, {});

      // Only return a dynamic sampling context object if there are keys in it.
      // A keyless object means there were no sentry values on the header, which means that there is no DSC.
      if (Object.keys(dynamicSamplingContext).length > 0) {
        return dynamicSamplingContext;
      } else {
        return undefined;
      }
    }

    /**
     * Turns a Dynamic Sampling Object into a baggage header by prefixing all the keys on the object with "sentry-".
     *
     * @param dynamicSamplingContext The Dynamic Sampling Context to turn into a header. For convenience and compatibility
     * with the `getDynamicSamplingContext` method on the Transaction class ,this argument can also be `undefined`. If it is
     * `undefined` the function will return `undefined`.
     * @returns a baggage header, created from `dynamicSamplingContext`, or `undefined` either if `dynamicSamplingContext`
     * was `undefined`, or if `dynamicSamplingContext` didn't contain any values.
     */
    function dynamicSamplingContextToSentryBaggageHeader(
      // this also takes undefined for convenience and bundle size in other places
      dynamicSamplingContext,
    ) {
      if (!dynamicSamplingContext) {
        return undefined;
      }

      // Prefix all DSC keys with "sentry-" and put them into a new object
      const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
        (acc, [dscKey, dscValue]) => {
          if (dscValue) {
            acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
          }
          return acc;
        },
        {},
      );

      return objectToBaggageHeader(sentryPrefixedDSC);
    }

    /**
     * Take a baggage header and parse it into an object.
     */
    function parseBaggageHeader(
      baggageHeader,
    ) {
      if (!baggageHeader || (!isString(baggageHeader) && !Array.isArray(baggageHeader))) {
        return undefined;
      }

      if (Array.isArray(baggageHeader)) {
        // Combine all baggage headers into one object containing the baggage values so we can later read the Sentry-DSC-values from it
        return baggageHeader.reduce((acc, curr) => {
          const currBaggageObject = baggageHeaderToObject(curr);
          Object.entries(currBaggageObject).forEach(([key, value]) => {
            acc[key] = value;
          });
          return acc;
        }, {});
      }

      return baggageHeaderToObject(baggageHeader);
    }

    /**
     * Will parse a baggage header, which is a simple key-value map, into a flat object.
     *
     * @param baggageHeader The baggage header to parse.
     * @returns a flat object containing all the key-value pairs from `baggageHeader`.
     */
    function baggageHeaderToObject(baggageHeader) {
      return baggageHeader
        .split(',')
        .map(baggageEntry => baggageEntry.split('=').map(keyOrValue => decodeURIComponent(keyOrValue.trim())))
        .reduce((acc, [key, value]) => {
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});
    }

    /**
     * Turns a flat object (key-value pairs) into a baggage header, which is also just key-value pairs.
     *
     * @param object The object to turn into a baggage header.
     * @returns a baggage header string, or `undefined` if the object didn't have any values, since an empty baggage header
     * is not spec compliant.
     */
    function objectToBaggageHeader(object) {
      if (Object.keys(object).length === 0) {
        // An empty baggage header is not spec compliant: We return undefined.
        return undefined;
      }

      return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
        const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
        const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
        if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
          logger.warn(
            `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`,
          );
          return baggageHeader;
        } else {
          return newBaggageHeader;
        }
      }, '');
    }

    // eslint-disable-next-line @sentry-internal/sdk/no-regexp-constructor -- RegExp is used for readability here
    const TRACEPARENT_REGEXP = new RegExp(
      '^[ \\t]*' + // whitespace
      '([0-9a-f]{32})?' + // trace_id
      '-?([0-9a-f]{16})?' + // span_id
      '-?([01])?' + // sampled
      '[ \\t]*$', // whitespace
    );

    /**
     * Extract transaction context data from a `sentry-trace` header.
     *
     * @param traceparent Traceparent string
     *
     * @returns Object containing data from the header, or undefined if traceparent string is malformed
     */
    function extractTraceparentData(traceparent) {
      if (!traceparent) {
        return undefined;
      }

      const matches = traceparent.match(TRACEPARENT_REGEXP);
      if (!matches) {
        return undefined;
      }

      let parentSampled;
      if (matches[3] === '1') {
        parentSampled = true;
      } else if (matches[3] === '0') {
        parentSampled = false;
      }

      return {
        traceId: matches[1],
        parentSampled,
        parentSpanId: matches[2],
      };
    }

    /**
     * Create a propagation context from incoming headers or
     * creates a minimal new one if the headers are undefined.
     */
    function propagationContextFromHeaders(
      sentryTrace,
      baggage,
    ) {
      const traceparentData = extractTraceparentData(sentryTrace);
      const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);

      const { traceId, parentSpanId, parentSampled } = traceparentData || {};

      if (!traceparentData) {
        return {
          traceId: traceId || uuid4(),
          spanId: uuid4().substring(16),
        };
      } else {
        return {
          traceId: traceId || uuid4(),
          parentSpanId: parentSpanId || uuid4().substring(16),
          spanId: uuid4().substring(16),
          sampled: parentSampled,
          dsc: dynamicSamplingContext || {}, // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
        };
      }
    }

    /**
     * Create sentry-trace header from span context values.
     */
    function generateSentryTraceHeader(
      traceId = uuid4(),
      spanId = uuid4().substring(16),
      sampled,
    ) {
      let sampledString = '';
      if (sampled !== undefined) {
        sampledString = sampled ? '-1' : '-0';
      }
      return `${traceId}-${spanId}${sampledString}`;
    }

    /**
     * Creates an envelope.
     * Make sure to always explicitly provide the generic to this function
     * so that the envelope types resolve correctly.
     */
    function createEnvelope(headers, items = []) {
      return [headers, items];
    }

    /**
     * Add an item to an envelope.
     * Make sure to always explicitly provide the generic to this function
     * so that the envelope types resolve correctly.
     */
    function addItemToEnvelope(envelope, newItem) {
      const [headers, items] = envelope;
      return [headers, [...items, newItem]];
    }

    /**
     * Convenience function to loop through the items and item types of an envelope.
     * (This function was mostly created because working with envelope types is painful at the moment)
     *
     * If the callback returns true, the rest of the items will be skipped.
     */
    function forEachEnvelopeItem(
      envelope,
      callback,
    ) {
      const envelopeItems = envelope[1];

      for (const envelopeItem of envelopeItems) {
        const envelopeItemType = envelopeItem[0].type;
        const result = callback(envelopeItem, envelopeItemType);

        if (result) {
          return true;
        }
      }

      return false;
    }

    /**
     * Encode a string to UTF8 array.
     */
    function encodeUTF8(input) {
      return GLOBAL_OBJ.__SENTRY__ && GLOBAL_OBJ.__SENTRY__.encodePolyfill
        ? GLOBAL_OBJ.__SENTRY__.encodePolyfill(input)
        : new TextEncoder().encode(input);
    }

    /**
     * Serializes an envelope.
     */
    function serializeEnvelope(envelope) {
      const [envHeaders, items] = envelope;

      // Initially we construct our envelope as a string and only convert to binary chunks if we encounter binary data
      let parts = JSON.stringify(envHeaders);

      function append(next) {
        if (typeof parts === 'string') {
          parts = typeof next === 'string' ? parts + next : [encodeUTF8(parts), next];
        } else {
          parts.push(typeof next === 'string' ? encodeUTF8(next) : next);
        }
      }

      for (const item of items) {
        const [itemHeaders, payload] = item;

        append(`\n${JSON.stringify(itemHeaders)}\n`);

        if (typeof payload === 'string' || payload instanceof Uint8Array) {
          append(payload);
        } else {
          let stringifiedPayload;
          try {
            stringifiedPayload = JSON.stringify(payload);
          } catch (e) {
            // In case, despite all our efforts to keep `payload` circular-dependency-free, `JSON.strinify()` still
            // fails, we try again after normalizing it again with infinite normalization depth. This of course has a
            // performance impact but in this case a performance hit is better than throwing.
            stringifiedPayload = JSON.stringify(normalize(payload));
          }
          append(stringifiedPayload);
        }
      }

      return typeof parts === 'string' ? parts : concatBuffers(parts);
    }

    function concatBuffers(buffers) {
      const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);

      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const buffer of buffers) {
        merged.set(buffer, offset);
        offset += buffer.length;
      }

      return merged;
    }

    /**
     * Creates attachment envelope items
     */
    function createAttachmentEnvelopeItem(attachment) {
      const buffer = typeof attachment.data === 'string' ? encodeUTF8(attachment.data) : attachment.data;

      return [
        dropUndefinedKeys({
          type: 'attachment',
          length: buffer.length,
          filename: attachment.filename,
          content_type: attachment.contentType,
          attachment_type: attachment.attachmentType,
        }),
        buffer,
      ];
    }

    const ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
      session: 'session',
      sessions: 'session',
      attachment: 'attachment',
      transaction: 'transaction',
      event: 'error',
      client_report: 'internal',
      user_report: 'default',
      profile: 'profile',
      profile_chunk: 'profile',
      replay_event: 'replay',
      replay_recording: 'replay',
      check_in: 'monitor',
      feedback: 'feedback',
      span: 'span',
      statsd: 'metric_bucket',
    };

    /**
     * Maps the type of an envelope item to a data category.
     */
    function envelopeItemTypeToDataCategory(type) {
      return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
    }

    /** Extracts the minimal SDK info from the metadata or an events */
    function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
      if (!metadataOrEvent || !metadataOrEvent.sdk) {
        return;
      }
      const { name, version } = metadataOrEvent.sdk;
      return { name, version };
    }

    /**
     * Creates event envelope headers, based on event, sdk info and tunnel
     * Note: This function was extracted from the core package to make it available in Replay
     */
    function createEventEnvelopeHeaders(
      event,
      sdkInfo,
      tunnel,
      dsn,
    ) {
      const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;
      return {
        event_id: event.event_id,
        sent_at: new Date().toISOString(),
        ...(sdkInfo && { sdk: sdkInfo }),
        ...(!!tunnel && dsn && { dsn: dsnToString(dsn) }),
        ...(dynamicSamplingContext && {
          trace: dropUndefinedKeys({ ...dynamicSamplingContext }),
        }),
      };
    }

    /**
     * Creates client report envelope
     * @param discarded_events An array of discard events
     * @param dsn A DSN that can be set on the header. Optional.
     */
    function createClientReportEnvelope(
      discarded_events,
      dsn,
      timestamp,
    ) {
      const clientReportItem = [
        { type: 'client_report' },
        {
          timestamp: timestamp || dateTimestampInSeconds(),
          discarded_events,
        },
      ];
      return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
    }

    // Intentionally keeping the key broad, as we don't know for sure what rate limit headers get returned from backend

    const DEFAULT_RETRY_AFTER = 60 * 1000; // 60 seconds

    /**
     * Extracts Retry-After value from the request header or returns default value
     * @param header string representation of 'Retry-After' header
     * @param now current unix timestamp
     *
     */
    function parseRetryAfterHeader(header, now = Date.now()) {
      const headerDelay = parseInt(`${header}`, 10);
      if (!isNaN(headerDelay)) {
        return headerDelay * 1000;
      }

      const headerDate = Date.parse(`${header}`);
      if (!isNaN(headerDate)) {
        return headerDate - now;
      }

      return DEFAULT_RETRY_AFTER;
    }

    /**
     * Gets the time that the given category is disabled until for rate limiting.
     * In case no category-specific limit is set but a general rate limit across all categories is active,
     * that time is returned.
     *
     * @return the time in ms that the category is disabled until or 0 if there's no active rate limit.
     */
    function disabledUntil(limits, dataCategory) {
      return limits[dataCategory] || limits.all || 0;
    }

    /**
     * Checks if a category is rate limited
     */
    function isRateLimited(limits, dataCategory, now = Date.now()) {
      return disabledUntil(limits, dataCategory) > now;
    }

    /**
     * Update ratelimits from incoming headers.
     *
     * @return the updated RateLimits object.
     */
    function updateRateLimits(
      limits,
      { statusCode, headers },
      now = Date.now(),
    ) {
      const updatedRateLimits = {
        ...limits,
      };

      // "The name is case-insensitive."
      // https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
      const rateLimitHeader = headers && headers['x-sentry-rate-limits'];
      const retryAfterHeader = headers && headers['retry-after'];

      if (rateLimitHeader) {
        /**
         * rate limit headers are of the form
         *     <header>,<header>,..
         * where each <header> is of the form
         *     <retry_after>: <categories>: <scope>: <reason_code>: <namespaces>
         * where
         *     <retry_after> is a delay in seconds
         *     <categories> is the event type(s) (error, transaction, etc) being rate limited and is of the form
         *         <category>;<category>;...
         *     <scope> is what's being limited (org, project, or key) - ignored by SDK
         *     <reason_code> is an arbitrary string like "org_quota" - ignored by SDK
         *     <namespaces> Semicolon-separated list of metric namespace identifiers. Defines which namespace(s) will be affected.
         *         Only present if rate limit applies to the metric_bucket data category.
         */
        for (const limit of rateLimitHeader.trim().split(',')) {
          const [retryAfter, categories, , , namespaces] = limit.split(':', 5);
          const headerDelay = parseInt(retryAfter, 10);
          const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1000; // 60sec default
          if (!categories) {
            updatedRateLimits.all = now + delay;
          } else {
            for (const category of categories.split(';')) {
              if (category === 'metric_bucket') {
                // namespaces will be present when category === 'metric_bucket'
                if (!namespaces || namespaces.split(';').includes('custom')) {
                  updatedRateLimits[category] = now + delay;
                }
              } else {
                updatedRateLimits[category] = now + delay;
              }
            }
          }
        }
      } else if (retryAfterHeader) {
        updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
      } else if (statusCode === 429) {
        updatedRateLimits.all = now + 60 * 1000;
      }

      return updatedRateLimits;
    }

    /**
     * Returns a new minimal propagation context
     */
    function generatePropagationContext() {
      return {
        traceId: uuid4(),
        spanId: uuid4().substring(16),
      };
    }

    // Based on https://github.com/angular/angular.js/pull/13945/files
    // The MIT License

    const WINDOW$2 = GLOBAL_OBJ;

    /**
     * Tells whether current environment supports History API
     * {@link supportsHistory}.
     *
     * @returns Answer to the given question.
     */
    function supportsHistory() {
      // NOTE: in Chrome App environment, touching history.pushState, *even inside
      //       a try/catch block*, will cause Chrome to output an error to console.error
      // borrowed from: https://github.com/angular/angular.js/pull/13945/files
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chromeVar = (WINDOW$2).chrome;
      const isChromePackagedApp = chromeVar && chromeVar.app && chromeVar.app.runtime;
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      const hasHistoryApi = 'history' in WINDOW$2 && !!WINDOW$2.history.pushState && !!WINDOW$2.history.replaceState;

      return !isChromePackagedApp && hasHistoryApi;
    }

    const FAKE_FUNCTION = () => undefined;

    const FEEDBACK_INTEGRATION_METHODS = ['attachTo', 'createWidget', 'remove'];

    /**
     * This is a shim for the Feedback integration.
     * It is needed in order for the CDN bundles to continue working when users add/remove feedback
     * from it, without changing their config. This is necessary for the loader mechanism.
     */
    function feedbackIntegrationShim(_options) {
      consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn('You are using feedbackIntegration() even though this bundle does not include feedback.');
      });

      return {
        name: 'Feedback',
        ...(FEEDBACK_INTEGRATION_METHODS.reduce((acc, method) => {
          acc[method] = FAKE_FUNCTION;
          return acc;
        }, {})),
      };
    }

    const REPLAY_INTEGRATION_METHODS = ['start', 'stop', 'flush'];

    /**
     * This is a shim for the Replay integration.
     * It is needed in order for the CDN bundles to continue working when users add/remove replay
     * from it, without changing their config. This is necessary for the loader mechanism.
     */
    function replayIntegrationShim(_options) {
      consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn('You are using replayIntegration() even though this bundle does not include replay.');
      });

      return {
        name: 'Replay',
        ...(REPLAY_INTEGRATION_METHODS.reduce((acc, method) => {
          acc[method] = FAKE_FUNCTION;
          return acc;
        }, {})),
      };
    }

    /**
     * An object that contains globally accessible properties and maintains a scope stack.
     * @hidden
     */

    /**
     * Returns the global shim registry.
     *
     * FIXME: This function is problematic, because despite always returning a valid Carrier,
     * it has an optional `__SENTRY__` property, which then in turn requires us to always perform an unnecessary check
     * at the call-site. We always access the carrier through this function, so we can guarantee that `__SENTRY__` is there.
     **/
    function getMainCarrier() {
      // This ensures a Sentry carrier exists
      getSentryCarrier(GLOBAL_OBJ);
      return GLOBAL_OBJ;
    }

    /** Will either get the existing sentry carrier, or create a new one. */
    function getSentryCarrier(carrier) {
      const __SENTRY__ = (carrier.__SENTRY__ = carrier.__SENTRY__ || {});

      // For now: First SDK that sets the .version property wins
      __SENTRY__.version = __SENTRY__.version || SDK_VERSION;

      // Intentionally populating and returning the version of "this" SDK instance
      // rather than what's set in .version so that "this" SDK always gets its carrier
      return (__SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {});
    }

    /**
     * Creates a new `Session` object by setting certain default parameters. If optional @param context
     * is passed, the passed properties are applied to the session object.
     *
     * @param context (optional) additional properties to be applied to the returned session object
     *
     * @returns a new `Session` object
     */
    function makeSession(context) {
      // Both timestamp and started are in seconds since the UNIX epoch.
      const startingTime = timestampInSeconds();

      const session = {
        sid: uuid4(),
        init: true,
        timestamp: startingTime,
        started: startingTime,
        duration: 0,
        status: 'ok',
        errors: 0,
        ignoreDuration: false,
        toJSON: () => sessionToJSON(session),
      };

      if (context) {
        updateSession(session, context);
      }

      return session;
    }

    /**
     * Updates a session object with the properties passed in the context.
     *
     * Note that this function mutates the passed object and returns void.
     * (Had to do this instead of returning a new and updated session because closing and sending a session
     * makes an update to the session after it was passed to the sending logic.
     * @see BaseClient.captureSession )
     *
     * @param session the `Session` to update
     * @param context the `SessionContext` holding the properties that should be updated in @param session
     */
    // eslint-disable-next-line complexity
    function updateSession(session, context = {}) {
      if (context.user) {
        if (!session.ipAddress && context.user.ip_address) {
          session.ipAddress = context.user.ip_address;
        }

        if (!session.did && !context.did) {
          session.did = context.user.id || context.user.email || context.user.username;
        }
      }

      session.timestamp = context.timestamp || timestampInSeconds();

      if (context.abnormal_mechanism) {
        session.abnormal_mechanism = context.abnormal_mechanism;
      }

      if (context.ignoreDuration) {
        session.ignoreDuration = context.ignoreDuration;
      }
      if (context.sid) {
        // Good enough uuid validation. — Kamil
        session.sid = context.sid.length === 32 ? context.sid : uuid4();
      }
      if (context.init !== undefined) {
        session.init = context.init;
      }
      if (!session.did && context.did) {
        session.did = `${context.did}`;
      }
      if (typeof context.started === 'number') {
        session.started = context.started;
      }
      if (session.ignoreDuration) {
        session.duration = undefined;
      } else if (typeof context.duration === 'number') {
        session.duration = context.duration;
      } else {
        const duration = session.timestamp - session.started;
        session.duration = duration >= 0 ? duration : 0;
      }
      if (context.release) {
        session.release = context.release;
      }
      if (context.environment) {
        session.environment = context.environment;
      }
      if (!session.ipAddress && context.ipAddress) {
        session.ipAddress = context.ipAddress;
      }
      if (!session.userAgent && context.userAgent) {
        session.userAgent = context.userAgent;
      }
      if (typeof context.errors === 'number') {
        session.errors = context.errors;
      }
      if (context.status) {
        session.status = context.status;
      }
    }

    /**
     * Closes a session by setting its status and updating the session object with it.
     * Internally calls `updateSession` to update the passed session object.
     *
     * Note that this function mutates the passed session (@see updateSession for explanation).
     *
     * @param session the `Session` object to be closed
     * @param status the `SessionStatus` with which the session was closed. If you don't pass a status,
     *               this function will keep the previously set status, unless it was `'ok'` in which case
     *               it is changed to `'exited'`.
     */
    function closeSession(session, status) {
      let context = {};
      if (status) {
        context = { status };
      } else if (session.status === 'ok') {
        context = { status: 'exited' };
      }

      updateSession(session, context);
    }

    /**
     * Serializes a passed session object to a JSON object with a slightly different structure.
     * This is necessary because the Sentry backend requires a slightly different schema of a session
     * than the one the JS SDKs use internally.
     *
     * @param session the session to be converted
     *
     * @returns a JSON object of the passed session
     */
    function sessionToJSON(session) {
      return dropUndefinedKeys({
        sid: `${session.sid}`,
        init: session.init,
        // Make sure that sec is converted to ms for date constructor
        started: new Date(session.started * 1000).toISOString(),
        timestamp: new Date(session.timestamp * 1000).toISOString(),
        status: session.status,
        errors: session.errors,
        did: typeof session.did === 'number' || typeof session.did === 'string' ? `${session.did}` : undefined,
        duration: session.duration,
        abnormal_mechanism: session.abnormal_mechanism,
        attrs: {
          release: session.release,
          environment: session.environment,
          ip_address: session.ipAddress,
          user_agent: session.userAgent,
        },
      });
    }

    const SCOPE_SPAN_FIELD = '_sentrySpan';

    /**
     * Set the active span for a given scope.
     * NOTE: This should NOT be used directly, but is only used internally by the trace methods.
     */
    function _setSpanForScope(scope, span) {
      if (span) {
        addNonEnumerableProperty(scope, SCOPE_SPAN_FIELD, span);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete (scope)[SCOPE_SPAN_FIELD];
      }
    }

    /**
     * Get the active span for a given scope.
     * NOTE: This should NOT be used directly, but is only used internally by the trace methods.
     */
    function _getSpanForScope(scope) {
      return scope[SCOPE_SPAN_FIELD];
    }

    /**
     * Default value for maximum number of breadcrumbs added to an event.
     */
    const DEFAULT_MAX_BREADCRUMBS = 100;

    /**
     * Holds additional event information.
     */
    class ScopeClass {
      /** Flag if notifying is happening. */

      /** Callback for client to receive scope changes. */

      /** Callback list that will be called during event processing. */

      /** Array of breadcrumbs. */

      /** User */

      /** Tags */

      /** Extra */

      /** Contexts */

      /** Attachments */

      /** Propagation Context for distributed tracing */

      /**
       * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
       * sent to Sentry
       */

      /** Fingerprint */

      /** Severity */

      /**
       * Transaction Name
       *
       * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
       * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
       */

      /** Session */

      /** Request Mode Session Status */

      /** The client on this scope */

      /** Contains the last event id of a captured event.  */

      // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.

      constructor() {
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._attachments = [];
        this._user = {};
        this._tags = {};
        this._extra = {};
        this._contexts = {};
        this._sdkProcessingMetadata = {};
        this._propagationContext = generatePropagationContext();
      }

      /**
       * @inheritDoc
       */
      clone() {
        const newScope = new ScopeClass();
        newScope._breadcrumbs = [...this._breadcrumbs];
        newScope._tags = { ...this._tags };
        newScope._extra = { ...this._extra };
        newScope._contexts = { ...this._contexts };
        newScope._user = this._user;
        newScope._level = this._level;
        newScope._session = this._session;
        newScope._transactionName = this._transactionName;
        newScope._fingerprint = this._fingerprint;
        newScope._eventProcessors = [...this._eventProcessors];
        newScope._requestSession = this._requestSession;
        newScope._attachments = [...this._attachments];
        newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
        newScope._propagationContext = { ...this._propagationContext };
        newScope._client = this._client;
        newScope._lastEventId = this._lastEventId;

        _setSpanForScope(newScope, _getSpanForScope(this));

        return newScope;
      }

      /**
       * @inheritDoc
       */
      setClient(client) {
        this._client = client;
      }

      /**
       * @inheritDoc
       */
      setLastEventId(lastEventId) {
        this._lastEventId = lastEventId;
      }

      /**
       * @inheritDoc
       */
      getClient() {
        return this._client;
      }

      /**
       * @inheritDoc
       */
      lastEventId() {
        return this._lastEventId;
      }

      /**
       * @inheritDoc
       */
      addScopeListener(callback) {
        this._scopeListeners.push(callback);
      }

      /**
       * @inheritDoc
       */
      addEventProcessor(callback) {
        this._eventProcessors.push(callback);
        return this;
      }

      /**
       * @inheritDoc
       */
      setUser(user) {
        // If null is passed we want to unset everything, but still define keys,
        // so that later down in the pipeline any existing values are cleared.
        this._user = user || {
          email: undefined,
          id: undefined,
          ip_address: undefined,
          username: undefined,
        };

        if (this._session) {
          updateSession(this._session, { user });
        }

        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      getUser() {
        return this._user;
      }

      /**
       * @inheritDoc
       */
      getRequestSession() {
        return this._requestSession;
      }

      /**
       * @inheritDoc
       */
      setRequestSession(requestSession) {
        this._requestSession = requestSession;
        return this;
      }

      /**
       * @inheritDoc
       */
      setTags(tags) {
        this._tags = {
          ...this._tags,
          ...tags,
        };
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setTag(key, value) {
        this._tags = { ...this._tags, [key]: value };
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setExtras(extras) {
        this._extra = {
          ...this._extra,
          ...extras,
        };
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setExtra(key, extra) {
        this._extra = { ...this._extra, [key]: extra };
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setFingerprint(fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setLevel(level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setTransactionName(name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setContext(key, context) {
        if (context === null) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }

        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      setSession(session) {
        if (!session) {
          delete this._session;
        } else {
          this._session = session;
        }
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      getSession() {
        return this._session;
      }

      /**
       * @inheritDoc
       */
      update(captureContext) {
        if (!captureContext) {
          return this;
        }

        const scopeToMerge = typeof captureContext === 'function' ? captureContext(this) : captureContext;

        const [scopeInstance, requestSession] =
          scopeToMerge instanceof Scope
            ? [scopeToMerge.getScopeData(), scopeToMerge.getRequestSession()]
            : isPlainObject(scopeToMerge)
              ? [captureContext, (captureContext).requestSession]
              : [];

        const { tags, extra, user, contexts, level, fingerprint = [], propagationContext } = scopeInstance || {};

        this._tags = { ...this._tags, ...tags };
        this._extra = { ...this._extra, ...extra };
        this._contexts = { ...this._contexts, ...contexts };

        if (user && Object.keys(user).length) {
          this._user = user;
        }

        if (level) {
          this._level = level;
        }

        if (fingerprint.length) {
          this._fingerprint = fingerprint;
        }

        if (propagationContext) {
          this._propagationContext = propagationContext;
        }

        if (requestSession) {
          this._requestSession = requestSession;
        }

        return this;
      }

      /**
       * @inheritDoc
       */
      clear() {
        // client is not cleared here on purpose!
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = undefined;
        this._transactionName = undefined;
        this._fingerprint = undefined;
        this._requestSession = undefined;
        this._session = undefined;
        _setSpanForScope(this, undefined);
        this._attachments = [];
        this._propagationContext = generatePropagationContext();

        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      addBreadcrumb(breadcrumb, maxBreadcrumbs) {
        const maxCrumbs = typeof maxBreadcrumbs === 'number' ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;

        // No data has been changed, so don't notify scope listeners
        if (maxCrumbs <= 0) {
          return this;
        }

        const mergedBreadcrumb = {
          timestamp: dateTimestampInSeconds(),
          ...breadcrumb,
        };

        const breadcrumbs = this._breadcrumbs;
        breadcrumbs.push(mergedBreadcrumb);
        this._breadcrumbs = breadcrumbs.length > maxCrumbs ? breadcrumbs.slice(-maxCrumbs) : breadcrumbs;

        this._notifyScopeListeners();

        return this;
      }

      /**
       * @inheritDoc
       */
      getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
      }

      /**
       * @inheritDoc
       */
      clearBreadcrumbs() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
      }

      /**
       * @inheritDoc
       */
      addAttachment(attachment) {
        this._attachments.push(attachment);
        return this;
      }

      /**
       * @inheritDoc
       */
      clearAttachments() {
        this._attachments = [];
        return this;
      }

      /** @inheritDoc */
      getScopeData() {
        return {
          breadcrumbs: this._breadcrumbs,
          attachments: this._attachments,
          contexts: this._contexts,
          tags: this._tags,
          extra: this._extra,
          user: this._user,
          level: this._level,
          fingerprint: this._fingerprint || [],
          eventProcessors: this._eventProcessors,
          propagationContext: this._propagationContext,
          sdkProcessingMetadata: this._sdkProcessingMetadata,
          transactionName: this._transactionName,
          span: _getSpanForScope(this),
        };
      }

      /**
       * @inheritDoc
       */
      setSDKProcessingMetadata(newData) {
        this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...newData };

        return this;
      }

      /**
       * @inheritDoc
       */
      setPropagationContext(context) {
        this._propagationContext = context;
        return this;
      }

      /**
       * @inheritDoc
       */
      getPropagationContext() {
        return this._propagationContext;
      }

      /**
       * @inheritDoc
       */
      captureException(exception, hint) {
        const eventId = hint && hint.event_id ? hint.event_id : uuid4();

        if (!this._client) {
          logger.warn('No client configured on scope - will not capture exception!');
          return eventId;
        }

        const syntheticException = new Error('Sentry syntheticException');

        this._client.captureException(
          exception,
          {
            originalException: exception,
            syntheticException,
            ...hint,
            event_id: eventId,
          },
          this,
        );

        return eventId;
      }

      /**
       * @inheritDoc
       */
      captureMessage(message, level, hint) {
        const eventId = hint && hint.event_id ? hint.event_id : uuid4();

        if (!this._client) {
          logger.warn('No client configured on scope - will not capture message!');
          return eventId;
        }

        const syntheticException = new Error(message);

        this._client.captureMessage(
          message,
          level,
          {
            originalException: message,
            syntheticException,
            ...hint,
            event_id: eventId,
          },
          this,
        );

        return eventId;
      }

      /**
       * @inheritDoc
       */
      captureEvent(event, hint) {
        const eventId = hint && hint.event_id ? hint.event_id : uuid4();

        if (!this._client) {
          logger.warn('No client configured on scope - will not capture event!');
          return eventId;
        }

        this._client.captureEvent(event, { ...hint, event_id: eventId }, this);

        return eventId;
      }

      /**
       * This will be called on every set call.
       */
      _notifyScopeListeners() {
        // We need this check for this._notifyingListeners to be able to work on scope during updates
        // If this check is not here we'll produce endless recursion when something is done with the scope
        // during the callback.
        if (!this._notifyingListeners) {
          this._notifyingListeners = true;
          this._scopeListeners.forEach(callback => {
            callback(this);
          });
          this._notifyingListeners = false;
        }
      }
    }

    // NOTE: By exporting this here as const & type, instead of doing `export class`,
    // We can get the correct class when importing from `@sentry/core`, but the original type (from `@sentry/types`)
    // This is helpful for interop, e.g. when doing `import type { Scope } from '@sentry/node';` (which re-exports this)

    /**
     * Holds additional event information.
     */
    const Scope = ScopeClass;

    /** Get the default current scope. */
    function getDefaultCurrentScope() {
      return getGlobalSingleton('defaultCurrentScope', () => new Scope());
    }

    /** Get the default isolation scope. */
    function getDefaultIsolationScope() {
      return getGlobalSingleton('defaultIsolationScope', () => new Scope());
    }

    /**
     * This is an object that holds a stack of scopes.
     */
    class AsyncContextStack {

      constructor(scope, isolationScope) {
        let assignedScope;
        if (!scope) {
          assignedScope = new Scope();
        } else {
          assignedScope = scope;
        }

        let assignedIsolationScope;
        if (!isolationScope) {
          assignedIsolationScope = new Scope();
        } else {
          assignedIsolationScope = isolationScope;
        }

        // scope stack for domains or the process
        this._stack = [{ scope: assignedScope }];
        this._isolationScope = assignedIsolationScope;
      }

      /**
       * Fork a scope for the stack.
       */
      withScope(callback) {
        const scope = this._pushScope();

        let maybePromiseResult;
        try {
          maybePromiseResult = callback(scope);
        } catch (e) {
          this._popScope();
          throw e;
        }

        if (isThenable(maybePromiseResult)) {
          // @ts-expect-error - isThenable returns the wrong type
          return maybePromiseResult.then(
            res => {
              this._popScope();
              return res;
            },
            e => {
              this._popScope();
              throw e;
            },
          );
        }

        this._popScope();
        return maybePromiseResult;
      }

      /**
       * Get the client of the stack.
       */
      getClient() {
        return this.getStackTop().client;
      }

      /**
       * Returns the scope of the top stack.
       */
      getScope() {
        return this.getStackTop().scope;
      }

      /**
       * Get the isolation scope for the stack.
       */
      getIsolationScope() {
        return this._isolationScope;
      }

      /**
       * Returns the topmost scope layer in the order domain > local > process.
       */
      getStackTop() {
        return this._stack[this._stack.length - 1];
      }

      /**
       * Push a scope to the stack.
       */
      _pushScope() {
        // We want to clone the content of prev scope
        const scope = this.getScope().clone();
        this._stack.push({
          client: this.getClient(),
          scope,
        });
        return scope;
      }

      /**
       * Pop a scope from the stack.
       */
      _popScope() {
        if (this._stack.length <= 1) return false;
        return !!this._stack.pop();
      }
    }

    /**
     * Get the global async context stack.
     * This will be removed during the v8 cycle and is only here to make migration easier.
     */
    function getAsyncContextStack() {
      const registry = getMainCarrier();
      const sentry = getSentryCarrier(registry);

      return (sentry.stack = sentry.stack || new AsyncContextStack(getDefaultCurrentScope(), getDefaultIsolationScope()));
    }

    function withScope$1(callback) {
      return getAsyncContextStack().withScope(callback);
    }

    function withSetScope(scope, callback) {
      const stack = getAsyncContextStack();
      return stack.withScope(() => {
        stack.getStackTop().scope = scope;
        return callback(scope);
      });
    }

    function withIsolationScope$1(callback) {
      return getAsyncContextStack().withScope(() => {
        return callback(getAsyncContextStack().getIsolationScope());
      });
    }

    /**
     * Get the stack-based async context strategy.
     */
    function getStackAsyncContextStrategy() {
      return {
        withIsolationScope: withIsolationScope$1,
        withScope: withScope$1,
        withSetScope,
        withSetIsolationScope: (_isolationScope, callback) => {
          return withIsolationScope$1(callback);
        },
        getCurrentScope: () => getAsyncContextStack().getScope(),
        getIsolationScope: () => getAsyncContextStack().getIsolationScope(),
      };
    }

    /**
     * Get the current async context strategy.
     * If none has been setup, the default will be used.
     */
    function getAsyncContextStrategy(carrier) {
      const sentry = getSentryCarrier(carrier);

      if (sentry.acs) {
        return sentry.acs;
      }

      // Otherwise, use the default one (stack)
      return getStackAsyncContextStrategy();
    }

    /**
     * Get the currently active scope.
     */
    function getCurrentScope() {
      const carrier = getMainCarrier();
      const acs = getAsyncContextStrategy(carrier);
      return acs.getCurrentScope();
    }

    /**
     * Get the currently active isolation scope.
     * The isolation scope is active for the current exection context.
     */
    function getIsolationScope() {
      const carrier = getMainCarrier();
      const acs = getAsyncContextStrategy(carrier);
      return acs.getIsolationScope();
    }

    /**
     * Get the global scope.
     * This scope is applied to _all_ events.
     */
    function getGlobalScope() {
      return getGlobalSingleton('globalScope', () => new Scope());
    }

    /**
     * Creates a new scope with and executes the given operation within.
     * The scope is automatically removed once the operation
     * finishes or throws.
     */

    /**
     * Either creates a new active scope, or sets the given scope as active scope in the given callback.
     */
    function withScope(
      ...rest
    ) {
      const carrier = getMainCarrier();
      const acs = getAsyncContextStrategy(carrier);

      // If a scope is defined, we want to make this the active scope instead of the default one
      if (rest.length === 2) {
        const [scope, callback] = rest;

        if (!scope) {
          return acs.withScope(callback);
        }

        return acs.withSetScope(scope, callback);
      }

      return acs.withScope(rest[0]);
    }

    /**
     * Attempts to fork the current isolation scope and the current scope based on the current async context strategy. If no
     * async context strategy is set, the isolation scope and the current scope will not be forked (this is currently the
     * case, for example, in the browser).
     *
     * Usage of this function in environments without async context strategy is discouraged and may lead to unexpected behaviour.
     *
     * This function is intended for Sentry SDK and SDK integration development. It is not recommended to be used in "normal"
     * applications directly because it comes with pitfalls. Use at your own risk!
     */

    /**
     * Either creates a new active isolation scope, or sets the given isolation scope as active scope in the given callback.
     */
    function withIsolationScope(
      ...rest

    ) {
      const carrier = getMainCarrier();
      const acs = getAsyncContextStrategy(carrier);

      // If a scope is defined, we want to make this the active scope instead of the default one
      if (rest.length === 2) {
        const [isolationScope, callback] = rest;

        if (!isolationScope) {
          return acs.withIsolationScope(callback);
        }

        return acs.withSetIsolationScope(isolationScope, callback);
      }

      return acs.withIsolationScope(rest[0]);
    }

    /**
     * Get the currently active client.
     */
    function getClient() {
      return getCurrentScope().getClient();
    }

    /**
     * key: bucketKey
     * value: [exportKey, MetricSummary]
     */

    const METRICS_SPAN_FIELD = '_sentryMetrics';

    /**
     * Fetches the metric summary if it exists for the passed span
     */
    function getMetricSummaryJsonForSpan(span) {
      const storage = (span)[METRICS_SPAN_FIELD];

      if (!storage) {
        return undefined;
      }
      const output = {};

      for (const [, [exportKey, summary]] of storage) {
        const arr = output[exportKey] || (output[exportKey] = []);
        arr.push(dropUndefinedKeys(summary));
      }

      return output;
    }

    /**
     * Use this attribute to represent the source of a span.
     * Should be one of: custom, url, route, view, component, task, unknown
     *
     */
    const SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = 'sentry.source';

    /**
     * Use this attribute to represent the sample rate used for a span.
     */
    const SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = 'sentry.sample_rate';

    /**
     * Use this attribute to represent the operation of a span.
     */
    const SEMANTIC_ATTRIBUTE_SENTRY_OP = 'sentry.op';

    /**
     * Use this attribute to represent the origin of a span.
     */
    const SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = 'sentry.origin';

    const SPAN_STATUS_UNSET = 0;
    const SPAN_STATUS_OK = 1;

    const TRACE_FLAG_SAMPLED = 0x1;

    /**
     * Convert a span to a trace context, which can be sent as the `trace` context in a non-transaction event.
     */
    function spanToTraceContext(span) {
      const { spanId: span_id, traceId: trace_id } = span.spanContext();
      const { parent_span_id } = spanToJSON(span);

      return dropUndefinedKeys({ parent_span_id, span_id, trace_id });
    }

    /**
     * Convert a Span to a Sentry trace header.
     */
    function spanToTraceHeader(span) {
      const { traceId, spanId } = span.spanContext();
      const sampled = spanIsSampled(span);
      return generateSentryTraceHeader(traceId, spanId, sampled);
    }

    /**
     * Convert a span time input into a timestamp in seconds.
     */
    function spanTimeInputToSeconds(input) {
      if (typeof input === 'number') {
        return ensureTimestampInSeconds(input);
      }

      if (Array.isArray(input)) {
        // See {@link HrTime} for the array-based time format
        return input[0] + input[1] / 1e9;
      }

      if (input instanceof Date) {
        return ensureTimestampInSeconds(input.getTime());
      }

      return timestampInSeconds();
    }

    /**
     * Converts a timestamp to second, if it was in milliseconds, or keeps it as second.
     */
    function ensureTimestampInSeconds(timestamp) {
      const isMs = timestamp > 9999999999;
      return isMs ? timestamp / 1000 : timestamp;
    }

    /**
     * Convert a span to a JSON representation.
     */
    // Note: Because of this, we currently have a circular type dependency (which we opted out of in package.json).
    // This is not avoidable as we need `spanToJSON` in `spanUtils.ts`, which in turn is needed by `span.ts` for backwards compatibility.
    // And `spanToJSON` needs the Span class from `span.ts` to check here.
    function spanToJSON(span) {
      if (spanIsSentrySpan(span)) {
        return span.getSpanJSON();
      }

      try {
        const { spanId: span_id, traceId: trace_id } = span.spanContext();

        // Handle a span from @opentelemetry/sdk-base-trace's `Span` class
        if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
          const { attributes, startTime, name, endTime, parentSpanId, status } = span;

          return dropUndefinedKeys({
            span_id,
            trace_id,
            data: attributes,
            description: name,
            parent_span_id: parentSpanId,
            start_timestamp: spanTimeInputToSeconds(startTime),
            // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
            timestamp: spanTimeInputToSeconds(endTime) || undefined,
            status: getStatusMessage(status),
            op: attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
            origin: attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
            _metrics_summary: getMetricSummaryJsonForSpan(span),
          });
        }

        // Finally, at least we have `spanContext()`....
        return {
          span_id,
          trace_id,
        };
      } catch (e) {
        return {};
      }
    }

    function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
      const castSpan = span;
      return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
    }

    /** Exported only for tests. */

    /**
     * Sadly, due to circular dependency checks we cannot actually import the Span class here and check for instanceof.
     * :( So instead we approximate this by checking if it has the `getSpanJSON` method.
     */
    function spanIsSentrySpan(span) {
      return typeof (span).getSpanJSON === 'function';
    }

    /**
     * Returns true if a span is sampled.
     * In most cases, you should just use `span.isRecording()` instead.
     * However, this has a slightly different semantic, as it also returns false if the span is finished.
     * So in the case where this distinction is important, use this method.
     */
    function spanIsSampled(span) {
      // We align our trace flags with the ones OpenTelemetry use
      // So we also check for sampled the same way they do.
      const { traceFlags } = span.spanContext();
      return traceFlags === TRACE_FLAG_SAMPLED;
    }

    /** Get the status message to use for a JSON representation of a span. */
    function getStatusMessage(status) {
      if (!status || status.code === SPAN_STATUS_UNSET) {
        return undefined;
      }

      if (status.code === SPAN_STATUS_OK) {
        return 'ok';
      }

      return status.message || 'unknown_error';
    }
    const ROOT_SPAN_FIELD = '_sentryRootSpan';

    /**
     * Returns the root span of a given span.
     */
    function getRootSpan(span) {
      return span[ROOT_SPAN_FIELD] || span;
    }

    const DEFAULT_ENVIRONMENT = 'production';

    /**
     * If you change this value, also update the terser plugin config to
     * avoid minification of the object property!
     */
    const FROZEN_DSC_FIELD = '_frozenDsc';

    /**
     * Creates a dynamic sampling context from a client.
     *
     * Dispatches the `createDsc` lifecycle hook as a side effect.
     */
    function getDynamicSamplingContextFromClient(trace_id, client) {
      const options = client.getOptions();

      const { publicKey: public_key } = client.getDsn() || {};

      const dsc = dropUndefinedKeys({
        environment: options.environment || DEFAULT_ENVIRONMENT,
        release: options.release,
        public_key,
        trace_id,
      });

      client.emit('createDsc', dsc);

      return dsc;
    }

    /**
     * Creates a dynamic sampling context from a span (and client and scope)
     *
     * @param span the span from which a few values like the root span name and sample rate are extracted.
     *
     * @returns a dynamic sampling context
     */
    function getDynamicSamplingContextFromSpan(span) {
      const client = getClient();
      if (!client) {
        return {};
      }

      const dsc = getDynamicSamplingContextFromClient(spanToJSON(span).trace_id || '', client);

      const rootSpan = getRootSpan(span);

      // For core implementation, we freeze the DSC onto the span as a non-enumerable property
      const frozenDsc = (rootSpan)[FROZEN_DSC_FIELD];
      if (frozenDsc) {
        return frozenDsc;
      }

      // For OpenTelemetry, we freeze the DSC on the trace state
      const traceState = rootSpan.spanContext().traceState;
      const traceStateDsc = traceState && traceState.get('sentry.dsc');

      // If the span has a DSC, we want it to take precedence
      const dscOnTraceState = traceStateDsc && baggageHeaderToDynamicSamplingContext(traceStateDsc);

      if (dscOnTraceState) {
        return dscOnTraceState;
      }

      // Else, we generate it from the span
      const jsonSpan = spanToJSON(rootSpan);
      const attributes = jsonSpan.data || {};
      const maybeSampleRate = attributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];

      if (maybeSampleRate != null) {
        dsc.sample_rate = `${maybeSampleRate}`;
      }

      // We don't want to have a transaction name in the DSC if the source is "url" because URLs might contain PII
      const source = attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];

      // after JSON conversion, txn.name becomes jsonSpan.description
      const name = jsonSpan.description;
      if (source !== 'url' && name) {
        dsc.transaction = name;
      }

      dsc.sampled = String(spanIsSampled(rootSpan));

      client.emit('createDsc', dsc, rootSpan);

      return dsc;
    }

    /**
     * Convert a Span to a baggage header.
     */
    function spanToBaggageHeader(span) {
      const dsc = getDynamicSamplingContextFromSpan(span);
      return dynamicSamplingContextToSentryBaggageHeader(dsc);
    }

    /**
     * Parse a sample rate from a given value.
     * This will either return a boolean or number sample rate, if the sample rate is valid (between 0 and 1).
     * If a string is passed, we try to convert it to a number.
     *
     * Any invalid sample rate will return `undefined`.
     */
    function parseSampleRate(sampleRate) {
      if (typeof sampleRate === 'boolean') {
        return Number(sampleRate);
      }

      const rate = typeof sampleRate === 'string' ? parseFloat(sampleRate) : sampleRate;
      if (typeof rate !== 'number' || isNaN(rate) || rate < 0 || rate > 1) {
        logger.warn(
          `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
            sampleRate,
          )} of type ${JSON.stringify(typeof sampleRate)}.`,
        );
        return undefined;
      }

      return rate;
    }

    /**
     * Apply SdkInfo (name, version, packages, integrations) to the corresponding event key.
     * Merge with existing data if any.
     **/
    function enhanceEventWithSdkInfo(event, sdkInfo) {
      if (!sdkInfo) {
        return event;
      }
      event.sdk = event.sdk || {};
      event.sdk.name = event.sdk.name || sdkInfo.name;
      event.sdk.version = event.sdk.version || sdkInfo.version;
      event.sdk.integrations = [...(event.sdk.integrations || []), ...(sdkInfo.integrations || [])];
      event.sdk.packages = [...(event.sdk.packages || []), ...(sdkInfo.packages || [])];
      return event;
    }

    /** Creates an envelope from a Session */
    function createSessionEnvelope(
      session,
      dsn,
      metadata,
      tunnel,
    ) {
      const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
      const envelopeHeaders = {
        sent_at: new Date().toISOString(),
        ...(sdkInfo && { sdk: sdkInfo }),
        ...(!!tunnel && dsn && { dsn: dsnToString(dsn) }),
      };

      const envelopeItem =
        'aggregates' in session ? [{ type: 'sessions' }, session] : [{ type: 'session' }, session.toJSON()];

      return createEnvelope(envelopeHeaders, [envelopeItem]);
    }

    /**
     * Create an Envelope from an event.
     */
    function createEventEnvelope(
      event,
      dsn,
      metadata,
      tunnel,
    ) {
      const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);

      /*
        Note: Due to TS, event.type may be `replay_event`, theoretically.
        In practice, we never call `createEventEnvelope` with `replay_event` type,
        and we'd have to adjut a looot of types to make this work properly.
        We want to avoid casting this around, as that could lead to bugs (e.g. when we add another type)
        So the safe choice is to really guard against the replay_event type here.
      */
      const eventType = event.type && event.type !== 'replay_event' ? event.type : 'event';

      enhanceEventWithSdkInfo(event, metadata && metadata.sdk);

      const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);

      // Prevent this data (which, if it exists, was used in earlier steps in the processing pipeline) from being sent to
      // sentry. (Note: Our use of this property comes and goes with whatever we might be debugging, whatever hacks we may
      // have temporarily added, etc. Even if we don't happen to be using it at some point in the future, let's not get rid
      // of this `delete`, lest we miss putting it back in the next time the property is in use.)
      delete event.sdkProcessingMetadata;

      const eventItem = [{ type: eventType }, event];
      return createEnvelope(envelopeHeaders, [eventItem]);
    }

    /**
     * Continue a trace from `sentry-trace` and `baggage` values.
     * These values can be obtained from incoming request headers, or in the browser from `<meta name="sentry-trace">`
     * and `<meta name="baggage">` HTML tags.
     *
     * Spans started with `startSpan`, `startSpanManual` and `startInactiveSpan`, within the callback will automatically
     * be attached to the incoming trace.
     */
    const continueTrace = (
      {
        sentryTrace,
        baggage,
      }

      ,
      callback,
    ) => {
      return withScope(scope => {
        const propagationContext = propagationContextFromHeaders(sentryTrace, baggage);
        scope.setPropagationContext(propagationContext);
        return callback();
      });
    };

    /**
     * Process an array of event processors, returning the processed event (or `null` if the event was dropped).
     */
    function notifyEventProcessors(
      processors,
      event,
      hint,
      index = 0,
    ) {
      return new SyncPromise((resolve, reject) => {
        const processor = processors[index];
        if (event === null || typeof processor !== 'function') {
          resolve(event);
        } else {
          const result = processor({ ...event }, hint);

          processor.id && result === null && logger.log(`Event processor "${processor.id}" dropped event`);

          if (isThenable(result)) {
            void result
              .then(final => notifyEventProcessors(processors, final, hint, index + 1).then(resolve))
              .then(null, reject);
          } else {
            void notifyEventProcessors(processors, result, hint, index + 1)
              .then(resolve)
              .then(null, reject);
          }
        }
      });
    }

    /**
     * Applies data from the scope to the event and runs all event processors on it.
     */
    function applyScopeDataToEvent(event, data) {
      const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;

      // Apply general data
      applyDataToEvent(event, data);

      // We want to set the trace context for normal events only if there isn't already
      // a trace context on the event. There is a product feature in place where we link
      // errors with transaction and it relies on that.
      if (span) {
        applySpanToEvent(event, span);
      }

      applyFingerprintToEvent(event, fingerprint);
      applyBreadcrumbsToEvent(event, breadcrumbs);
      applySdkMetadataToEvent(event, sdkProcessingMetadata);
    }

    /** Merge data of two scopes together. */
    function mergeScopeData(data, mergeData) {
      const {
        extra,
        tags,
        user,
        contexts,
        level,
        sdkProcessingMetadata,
        breadcrumbs,
        fingerprint,
        eventProcessors,
        attachments,
        propagationContext,
        transactionName,
        span,
      } = mergeData;

      mergeAndOverwriteScopeData(data, 'extra', extra);
      mergeAndOverwriteScopeData(data, 'tags', tags);
      mergeAndOverwriteScopeData(data, 'user', user);
      mergeAndOverwriteScopeData(data, 'contexts', contexts);
      mergeAndOverwriteScopeData(data, 'sdkProcessingMetadata', sdkProcessingMetadata);

      if (level) {
        data.level = level;
      }

      if (transactionName) {
        data.transactionName = transactionName;
      }

      if (span) {
        data.span = span;
      }

      if (breadcrumbs.length) {
        data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
      }

      if (fingerprint.length) {
        data.fingerprint = [...data.fingerprint, ...fingerprint];
      }

      if (eventProcessors.length) {
        data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
      }

      if (attachments.length) {
        data.attachments = [...data.attachments, ...attachments];
      }

      data.propagationContext = { ...data.propagationContext, ...propagationContext };
    }

    /**
     * Merges certain scope data. Undefined values will overwrite any existing values.
     * Exported only for tests.
     */
    function mergeAndOverwriteScopeData

      (data, prop, mergeVal) {
      if (mergeVal && Object.keys(mergeVal).length) {
        // Clone object
        data[prop] = { ...data[prop] };
        for (const key in mergeVal) {
          if (Object.prototype.hasOwnProperty.call(mergeVal, key)) {
            data[prop][key] = mergeVal[key];
          }
        }
      }
    }

    function applyDataToEvent(event, data) {
      const { extra, tags, user, contexts, level, transactionName } = data;

      const cleanedExtra = dropUndefinedKeys(extra);
      if (cleanedExtra && Object.keys(cleanedExtra).length) {
        event.extra = { ...cleanedExtra, ...event.extra };
      }

      const cleanedTags = dropUndefinedKeys(tags);
      if (cleanedTags && Object.keys(cleanedTags).length) {
        event.tags = { ...cleanedTags, ...event.tags };
      }

      const cleanedUser = dropUndefinedKeys(user);
      if (cleanedUser && Object.keys(cleanedUser).length) {
        event.user = { ...cleanedUser, ...event.user };
      }

      const cleanedContexts = dropUndefinedKeys(contexts);
      if (cleanedContexts && Object.keys(cleanedContexts).length) {
        event.contexts = { ...cleanedContexts, ...event.contexts };
      }

      if (level) {
        event.level = level;
      }

      // transaction events get their `transaction` from the root span name
      if (transactionName && event.type !== 'transaction') {
        event.transaction = transactionName;
      }
    }

    function applyBreadcrumbsToEvent(event, breadcrumbs) {
      const mergedBreadcrumbs = [...(event.breadcrumbs || []), ...breadcrumbs];
      event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : undefined;
    }

    function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
      event.sdkProcessingMetadata = {
        ...event.sdkProcessingMetadata,
        ...sdkProcessingMetadata,
      };
    }

    function applySpanToEvent(event, span) {
      event.contexts = {
        trace: spanToTraceContext(span),
        ...event.contexts,
      };

      event.sdkProcessingMetadata = {
        dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
        ...event.sdkProcessingMetadata,
      };

      const rootSpan = getRootSpan(span);
      const transactionName = spanToJSON(rootSpan).description;
      if (transactionName && !event.transaction && event.type === 'transaction') {
        event.transaction = transactionName;
      }
    }

    /**
     * Applies fingerprint from the scope to the event if there's one,
     * uses message if there's one instead or get rid of empty fingerprint
     */
    function applyFingerprintToEvent(event, fingerprint) {
      // Make sure it's an array first and we actually have something in place
      event.fingerprint = event.fingerprint ? arrayify(event.fingerprint) : [];

      // If we have something on the scope, then merge it with event
      if (fingerprint) {
        event.fingerprint = event.fingerprint.concat(fingerprint);
      }

      // If we have no data at all, remove empty array default
      if (event.fingerprint && !event.fingerprint.length) {
        delete event.fingerprint;
      }
    }

    /**
     * This type makes sure that we get either a CaptureContext, OR an EventHint.
     * It does not allow mixing them, which could lead to unexpected outcomes, e.g. this is disallowed:
     * { user: { id: '123' }, mechanism: { handled: false } }
     */

    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`,
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param hint May contain additional information about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     * @hidden
     */
    function prepareEvent(
      options,
      event,
      hint,
      scope,
      client,
      isolationScope,
    ) {
      const { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = options;
      const prepared = {
        ...event,
        event_id: event.event_id || hint.event_id || uuid4(),
        timestamp: event.timestamp || dateTimestampInSeconds(),
      };
      const integrations = hint.integrations || options.integrations.map(i => i.name);

      applyClientOptions(prepared, options);
      applyIntegrationsMetadata(prepared, integrations);

      if (client) {
        client.emit('applyFrameMetadata', event);
      }

      // Only put debug IDs onto frames for error events.
      if (event.type === undefined) {
        applyDebugIds(prepared, options.stackParser);
      }

      // If we have scope given to us, use it as the base for further modifications.
      // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
      const finalScope = getFinalScope(scope, hint.captureContext);

      if (hint.mechanism) {
        addExceptionMechanism(prepared, hint.mechanism);
      }

      const clientEventProcessors = client ? client.getEventProcessors() : [];

      // This should be the last thing called, since we want that
      // {@link Scope.addEventProcessor} gets the finished prepared event.
      // Merge scope data together
      const data = getGlobalScope().getScopeData();

      if (isolationScope) {
        const isolationData = isolationScope.getScopeData();
        mergeScopeData(data, isolationData);
      }

      if (finalScope) {
        const finalScopeData = finalScope.getScopeData();
        mergeScopeData(data, finalScopeData);
      }

      const attachments = [...(hint.attachments || []), ...data.attachments];
      if (attachments.length) {
        hint.attachments = attachments;
      }

      applyScopeDataToEvent(prepared, data);

      const eventProcessors = [
        ...clientEventProcessors,
        // Run scope event processors _after_ all other processors
        ...data.eventProcessors,
      ];

      const result = notifyEventProcessors(eventProcessors, prepared, hint);

      return result.then(evt => {
        if (evt) {
          // We apply the debug_meta field only after all event processors have ran, so that if any event processors modified
          // file names (e.g.the RewriteFrames integration) the filename -> debug ID relationship isn't destroyed.
          // This should not cause any PII issues, since we're only moving data that is already on the event and not adding
          // any new data
          applyDebugMeta(evt);
        }

        if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
          return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
        }
        return evt;
      });
    }

    /**
     *  Enhances event using the client configuration.
     *  It takes care of all "static" values like environment, release and `dist`,
     *  as well as truncating overly long values.
     * @param event event instance to be enhanced
     */
    function applyClientOptions(event, options) {
      const { environment, release, dist, maxValueLength = 250 } = options;

      if (!('environment' in event)) {
        event.environment = 'environment' in options ? environment : DEFAULT_ENVIRONMENT;
      }

      if (event.release === undefined && release !== undefined) {
        event.release = release;
      }

      if (event.dist === undefined && dist !== undefined) {
        event.dist = dist;
      }

      if (event.message) {
        event.message = truncate(event.message, maxValueLength);
      }

      const exception = event.exception && event.exception.values && event.exception.values[0];
      if (exception && exception.value) {
        exception.value = truncate(exception.value, maxValueLength);
      }

      const request = event.request;
      if (request && request.url) {
        request.url = truncate(request.url, maxValueLength);
      }
    }

    const debugIdStackParserCache = new WeakMap();

    /**
     * Puts debug IDs into the stack frames of an error event.
     */
    function applyDebugIds(event, stackParser) {
      const debugIdMap = GLOBAL_OBJ._sentryDebugIds;

      if (!debugIdMap) {
        return;
      }

      let debugIdStackFramesCache;
      const cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
      if (cachedDebugIdStackFrameCache) {
        debugIdStackFramesCache = cachedDebugIdStackFrameCache;
      } else {
        debugIdStackFramesCache = new Map();
        debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
      }

      // Build a map of filename -> debug_id
      const filenameDebugIdMap = Object.entries(debugIdMap).reduce(
        (acc, [debugIdStackTrace, debugIdValue]) => {
          let parsedStack;
          const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
          if (cachedParsedStack) {
            parsedStack = cachedParsedStack;
          } else {
            parsedStack = stackParser(debugIdStackTrace);
            debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
          }

          for (let i = parsedStack.length - 1; i >= 0; i--) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const stackFrame = parsedStack[i];
            if (stackFrame.filename) {
              acc[stackFrame.filename] = debugIdValue;
              break;
            }
          }
          return acc;
        },
        {},
      );

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.exception.values.forEach(exception => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          exception.stacktrace.frames.forEach(frame => {
            if (frame.filename) {
              frame.debug_id = filenameDebugIdMap[frame.filename];
            }
          });
        });
      } catch (e) {
        // To save bundle size we're just try catching here instead of checking for the existence of all the different objects.
      }
    }

    /**
     * Moves debug IDs from the stack frames of an error event into the debug_meta field.
     */
    function applyDebugMeta(event) {
      // Extract debug IDs and filenames from the stack frames on the event.
      const filenameDebugIdMap = {};
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.exception.values.forEach(exception => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          exception.stacktrace.frames.forEach(frame => {
            if (frame.debug_id) {
              if (frame.abs_path) {
                filenameDebugIdMap[frame.abs_path] = frame.debug_id;
              } else if (frame.filename) {
                filenameDebugIdMap[frame.filename] = frame.debug_id;
              }
              delete frame.debug_id;
            }
          });
        });
      } catch (e) {
        // To save bundle size we're just try catching here instead of checking for the existence of all the different objects.
      }

      if (Object.keys(filenameDebugIdMap).length === 0) {
        return;
      }

      // Fill debug_meta information
      event.debug_meta = event.debug_meta || {};
      event.debug_meta.images = event.debug_meta.images || [];
      const images = event.debug_meta.images;
      Object.entries(filenameDebugIdMap).forEach(([filename, debug_id]) => {
        images.push({
          type: 'sourcemap',
          code_file: filename,
          debug_id,
        });
      });
    }

    /**
     * This function adds all used integrations to the SDK info in the event.
     * @param event The event that will be filled with all integrations.
     */
    function applyIntegrationsMetadata(event, integrationNames) {
      if (integrationNames.length > 0) {
        event.sdk = event.sdk || {};
        event.sdk.integrations = [...(event.sdk.integrations || []), ...integrationNames];
      }
    }

    /**
     * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
     * Normalized keys:
     * - `breadcrumbs.data`
     * - `user`
     * - `contexts`
     * - `extra`
     * @param event Event
     * @returns Normalized event
     */
    function normalizeEvent(event, depth, maxBreadth) {
      if (!event) {
        return null;
      }

      const normalized = {
        ...event,
        ...(event.breadcrumbs && {
          breadcrumbs: event.breadcrumbs.map(b => ({
            ...b,
            ...(b.data && {
              data: normalize(b.data, depth, maxBreadth),
            }),
          })),
        }),
        ...(event.user && {
          user: normalize(event.user, depth, maxBreadth),
        }),
        ...(event.contexts && {
          contexts: normalize(event.contexts, depth, maxBreadth),
        }),
        ...(event.extra && {
          extra: normalize(event.extra, depth, maxBreadth),
        }),
      };

      // event.contexts.trace stores information about a Transaction. Similarly,
      // event.spans[] stores information about child Spans. Given that a
      // Transaction is conceptually a Span, normalization should apply to both
      // Transactions and Spans consistently.
      // For now the decision is to skip normalization of Transactions and Spans,
      // so this block overwrites the normalized event to add back the original
      // Transaction information prior to normalization.
      if (event.contexts && event.contexts.trace && normalized.contexts) {
        normalized.contexts.trace = event.contexts.trace;

        // event.contexts.trace.data may contain circular/dangerous data so we need to normalize it
        if (event.contexts.trace.data) {
          normalized.contexts.trace.data = normalize(event.contexts.trace.data, depth, maxBreadth);
        }
      }

      // event.spans[].data may contain circular/dangerous data so we need to normalize it
      if (event.spans) {
        normalized.spans = event.spans.map(span => {
          return {
            ...span,
            ...(span.data && {
              data: normalize(span.data, depth, maxBreadth),
            }),
          };
        });
      }

      return normalized;
    }

    function getFinalScope(
      scope,
      captureContext,
    ) {
      if (!captureContext) {
        return scope;
      }

      const finalScope = scope ? scope.clone() : new Scope();
      finalScope.update(captureContext);
      return finalScope;
    }

    /**
     * Parse either an `EventHint` directly, or convert a `CaptureContext` to an `EventHint`.
     * This is used to allow to update method signatures that used to accept a `CaptureContext` but should now accept an `EventHint`.
     */
    function parseEventHintOrCaptureContext(
      hint,
    ) {
      if (!hint) {
        return undefined;
      }

      // If you pass a Scope or `() => Scope` as CaptureContext, we just return this as captureContext
      if (hintIsScopeOrFunction(hint)) {
        return { captureContext: hint };
      }

      if (hintIsScopeContext(hint)) {
        return {
          captureContext: hint,
        };
      }

      return hint;
    }

    function hintIsScopeOrFunction(
      hint,
    ) {
      return hint instanceof Scope || typeof hint === 'function';
    }

    const captureContextKeys = [
      'user',
      'level',
      'extra',
      'contexts',
      'tags',
      'fingerprint',
      'requestSession',
      'propagationContext',
    ];

    function hintIsScopeContext(hint) {
      return Object.keys(hint).some(key => captureContextKeys.includes(key));
    }

    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception The exception to capture.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured Sentry event.
     */
    function captureException(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exception,
      hint,
    ) {
      return getCurrentScope().captureException(exception, parseEventHintOrCaptureContext(hint));
    }

    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param captureContext Define the level of the message or pass in additional data to attach to the message.
     * @returns the id of the captured message.
     */
    function captureMessage(message, captureContext) {
      // This is necessary to provide explicit scopes upgrade, without changing the original
      // arity of the `captureMessage(message, level)` method.
      const level = typeof captureContext === 'string' ? captureContext : undefined;
      const context = typeof captureContext !== 'string' ? { captureContext } : undefined;
      return getCurrentScope().captureMessage(message, level, context);
    }

    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured event.
     */
    function captureEvent(event, hint) {
      return getCurrentScope().captureEvent(event, hint);
    }

    /**
     * Sets context data with the given name.
     * @param name of the context
     * @param context Any kind of data. This data will be normalized.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setContext(name, context) {
      getIsolationScope().setContext(name, context);
    }

    /**
     * Set an object that will be merged sent as extra data with the event.
     * @param extras Extras object to merge into current context.
     */
    function setExtras(extras) {
      getIsolationScope().setExtras(extras);
    }

    /**
     * Set key:value that will be sent as extra data with the event.
     * @param key String of extra
     * @param extra Any kind of data. This data will be normalized.
     */
    function setExtra(key, extra) {
      getIsolationScope().setExtra(key, extra);
    }

    /**
     * Set an object that will be merged sent as tags data with the event.
     * @param tags Tags context object to merge into current context.
     */
    function setTags(tags) {
      getIsolationScope().setTags(tags);
    }

    /**
     * Set key:value that will be sent as tags data with the event.
     *
     * Can also be used to unset a tag, by passing `undefined`.
     *
     * @param key String key of tag
     * @param value Value of tag
     */
    function setTag(key, value) {
      getIsolationScope().setTag(key, value);
    }

    /**
     * Updates user context information for future events.
     *
     * @param user User context object to be set in the current context. Pass `null` to unset the user.
     */
    function setUser(user) {
      getIsolationScope().setUser(user);
    }

    /**
     * The last error event id of the isolation scope.
     *
     * Warning: This function really returns the last recorded error event id on the current
     * isolation scope. If you call this function after handling a certain error and another error
     * is captured in between, the last one is returned instead of the one you might expect.
     * Also, ids of events that were never sent to Sentry (for example because
     * they were dropped in `beforeSend`) could be returned.
     *
     * @returns The last event id of the isolation scope.
     */
    function lastEventId() {
      return getIsolationScope().lastEventId();
    }

    /**
     * Call `flush()` on the current client, if there is one. See {@link Client.flush}.
     *
     * @param timeout Maximum time in ms the client should wait to flush its event queue. Omitting this parameter will cause
     * the client to wait until all events are sent before resolving the promise.
     * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
     * doesn't (or if there's no client defined).
     */
    async function flush(timeout) {
      const client = getClient();
      if (client) {
        return client.flush(timeout);
      }
      logger.warn('Cannot flush events. No client defined.');
      return Promise.resolve(false);
    }

    /**
     * Call `close()` on the current client, if there is one. See {@link Client.close}.
     *
     * @param timeout Maximum time in ms the client should wait to flush its event queue before shutting down. Omitting this
     * parameter will cause the client to wait until all events are sent before disabling itself.
     * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
     * doesn't (or if there's no client defined).
     */
    async function close(timeout) {
      const client = getClient();
      if (client) {
        return client.close(timeout);
      }
      logger.warn('Cannot flush events and disable SDK. No client defined.');
      return Promise.resolve(false);
    }

    /**
     * Returns true if Sentry has been properly initialized.
     */
    function isInitialized() {
      return !!getClient();
    }

    /**
     * Add an event processor.
     * This will be added to the current isolation scope, ensuring any event that is processed in the current execution
     * context will have the processor applied.
     */
    function addEventProcessor(callback) {
      getIsolationScope().addEventProcessor(callback);
    }

    /**
     * Start a session on the current isolation scope.
     *
     * @param context (optional) additional properties to be applied to the returned session object
     *
     * @returns the new active session
     */
    function startSession(context) {
      const client = getClient();
      const isolationScope = getIsolationScope();
      const currentScope = getCurrentScope();

      const { release, environment = DEFAULT_ENVIRONMENT } = (client && client.getOptions()) || {};

      // Will fetch userAgent if called from browser sdk
      const { userAgent } = GLOBAL_OBJ.navigator || {};

      const session = makeSession({
        release,
        environment,
        user: currentScope.getUser() || isolationScope.getUser(),
        ...(userAgent && { userAgent }),
        ...context,
      });

      // End existing session if there's one
      const currentSession = isolationScope.getSession();
      if (currentSession && currentSession.status === 'ok') {
        updateSession(currentSession, { status: 'exited' });
      }

      endSession();

      // Afterwards we set the new session on the scope
      isolationScope.setSession(session);

      // TODO (v8): Remove this and only use the isolation scope(?).
      // For v7 though, we can't "soft-break" people using getCurrentHub().getScope().setSession()
      currentScope.setSession(session);

      return session;
    }

    /**
     * End the session on the current isolation scope.
     */
    function endSession() {
      const isolationScope = getIsolationScope();
      const currentScope = getCurrentScope();

      const session = currentScope.getSession() || isolationScope.getSession();
      if (session) {
        closeSession(session);
      }
      _sendSessionUpdate$1();

      // the session is over; take it off of the scope
      isolationScope.setSession();

      // TODO (v8): Remove this and only use the isolation scope(?).
      // For v7 though, we can't "soft-break" people using getCurrentHub().getScope().setSession()
      currentScope.setSession();
    }

    /**
     * Sends the current Session on the scope
     */
    function _sendSessionUpdate$1() {
      const isolationScope = getIsolationScope();
      const currentScope = getCurrentScope();
      const client = getClient();
      // TODO (v8): Remove currentScope and only use the isolation scope(?).
      // For v7 though, we can't "soft-break" people using getCurrentHub().getScope().setSession()
      const session = currentScope.getSession() || isolationScope.getSession();
      if (session && client) {
        client.captureSession(session);
      }
    }

    /**
     * Sends the current session on the scope to Sentry
     *
     * @param end If set the session will be marked as exited and removed from the scope.
     *            Defaults to `false`.
     */
    function captureSession(end = false) {
      // both send the update and pull the session from the scope
      if (end) {
        endSession();
        return;
      }

      // only send the update
      _sendSessionUpdate$1();
    }

    const SENTRY_API_VERSION = '7';

    /** Returns the prefix to construct Sentry ingestion API endpoints. */
    function getBaseApiEndpoint(dsn) {
      const protocol = dsn.protocol ? `${dsn.protocol}:` : '';
      const port = dsn.port ? `:${dsn.port}` : '';
      return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ''}/api/`;
    }

    /** Returns the ingest API endpoint for target. */
    function _getIngestEndpoint(dsn) {
      return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
    }

    /** Returns a URL-encoded string with auth config suitable for a query string. */
    function _encodedAuth(dsn, sdkInfo) {
      return urlEncode({
        // We send only the minimum set of required information. See
        // https://github.com/getsentry/sentry-javascript/issues/2572.
        sentry_key: dsn.publicKey,
        sentry_version: SENTRY_API_VERSION,
        ...(sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }),
      });
    }

    /**
     * Returns the envelope endpoint URL with auth in the query string.
     *
     * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
     */
    function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel, sdkInfo) {
      return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
    }

    /** Returns the url to the report dialog endpoint. */
    function getReportDialogEndpoint(
      dsnLike,
      dialogOptions

      ,
    ) {
      const dsn = makeDsn(dsnLike);
      if (!dsn) {
        return '';
      }

      const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;

      let encodedOptions = `dsn=${dsnToString(dsn)}`;
      for (const key in dialogOptions) {
        if (key === 'dsn') {
          continue;
        }

        if (key === 'onClose') {
          continue;
        }

        if (key === 'user') {
          const user = dialogOptions.user;
          if (!user) {
            continue;
          }
          if (user.name) {
            encodedOptions += `&name=${encodeURIComponent(user.name)}`;
          }
          if (user.email) {
            encodedOptions += `&email=${encodeURIComponent(user.email)}`;
          }
        } else {
          encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key])}`;
        }
      }

      return `${endpoint}?${encodedOptions}`;
    }

    const installedIntegrations = [];

    /** Map of integrations assigned to a client */

    /**
     * Remove duplicates from the given array, preferring the last instance of any duplicate. Not guaranteed to
     * preseve the order of integrations in the array.
     *
     * @private
     */
    function filterDuplicates(integrations) {
      const integrationsByName = {};

      integrations.forEach(currentInstance => {
        const { name } = currentInstance;

        const existingInstance = integrationsByName[name];

        // We want integrations later in the array to overwrite earlier ones of the same type, except that we never want a
        // default instance to overwrite an existing user instance
        if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
          return;
        }

        integrationsByName[name] = currentInstance;
      });

      return Object.values(integrationsByName);
    }

    /** Gets integrations to install */
    function getIntegrationsToSetup(options) {
      const defaultIntegrations = options.defaultIntegrations || [];
      const userIntegrations = options.integrations;

      // We flag default instances, so that later we can tell them apart from any user-created instances of the same class
      defaultIntegrations.forEach(integration => {
        integration.isDefaultInstance = true;
      });

      let integrations;

      if (Array.isArray(userIntegrations)) {
        integrations = [...defaultIntegrations, ...userIntegrations];
      } else if (typeof userIntegrations === 'function') {
        integrations = arrayify(userIntegrations(defaultIntegrations));
      } else {
        integrations = defaultIntegrations;
      }

      const finalIntegrations = filterDuplicates(integrations);

      // The `Debug` integration prints copies of the `event` and `hint` which will be passed to `beforeSend` or
      // `beforeSendTransaction`. It therefore has to run after all other integrations, so that the changes of all event
      // processors will be reflected in the printed values. For lack of a more elegant way to guarantee that, we therefore
      // locate it and, assuming it exists, pop it out of its current spot and shove it onto the end of the array.
      const debugIndex = finalIntegrations.findIndex(integration => integration.name === 'Debug');
      if (debugIndex > -1) {
        const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
        finalIntegrations.push(debugInstance);
      }

      return finalIntegrations;
    }

    /**
     * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
     * integrations are added unless they were already provided before.
     * @param integrations array of integration instances
     * @param withDefault should enable default integrations
     */
    function setupIntegrations(client, integrations) {
      const integrationIndex = {};

      integrations.forEach(integration => {
        // guard against empty provided integrations
        if (integration) {
          setupIntegration(client, integration, integrationIndex);
        }
      });

      return integrationIndex;
    }

    /**
     * Execute the `afterAllSetup` hooks of the given integrations.
     */
    function afterSetupIntegrations(client, integrations) {
      for (const integration of integrations) {
        // guard against empty provided integrations
        if (integration && integration.afterAllSetup) {
          integration.afterAllSetup(client);
        }
      }
    }

    /** Setup a single integration.  */
    function setupIntegration(client, integration, integrationIndex) {
      if (integrationIndex[integration.name]) {
        logger.log(`Integration skipped because it was already installed: ${integration.name}`);
        return;
      }
      integrationIndex[integration.name] = integration;

      // `setupOnce` is only called the first time
      if (installedIntegrations.indexOf(integration.name) === -1 && typeof integration.setupOnce === 'function') {
        integration.setupOnce();
        installedIntegrations.push(integration.name);
      }

      // `setup` is run for each client
      if (integration.setup && typeof integration.setup === 'function') {
        integration.setup(client);
      }

      if (typeof integration.preprocessEvent === 'function') {
        const callback = integration.preprocessEvent.bind(integration);
        client.on('preprocessEvent', (event, hint) => callback(event, hint, client));
      }

      if (typeof integration.processEvent === 'function') {
        const callback = integration.processEvent.bind(integration);

        const processor = Object.assign((event, hint) => callback(event, hint, client), {
          id: integration.name,
        });

        client.addEventProcessor(processor);
      }

      logger.log(`Integration installed: ${integration.name}`);
    }

    /** Add an integration to the current scope's client. */
    function addIntegration(integration) {
      const client = getClient();

      if (!client) {
        logger.warn(`Cannot add integration "${integration.name}" because no SDK Client is available.`);
        return;
      }

      client.addIntegration(integration);
    }

    /**
     * Define an integration function that can be used to create an integration instance.
     * Note that this by design hides the implementation details of the integration, as they are considered internal.
     */
    function defineIntegration(fn) {
      return fn;
    }

    const ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";

    /**
     * Base implementation for all JavaScript SDK clients.
     *
     * Call the constructor with the corresponding options
     * specific to the client subclass. To access these options later, use
     * {@link Client.getOptions}.
     *
     * If a Dsn is specified in the options, it will be parsed and stored. Use
     * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
     * invalid, the constructor will throw a {@link SentryException}. Note that
     * without a valid Dsn, the SDK will not send any events to Sentry.
     *
     * Before sending an event, it is passed through
     * {@link BaseClient._prepareEvent} to add SDK information and scope data
     * (breadcrumbs and context). To add more custom information, override this
     * method and extend the resulting prepared event.
     *
     * To issue automatically created events (e.g. via instrumentation), use
     * {@link Client.captureEvent}. It will prepare the event and pass it through
     * the callback lifecycle. To issue auto-breadcrumbs, use
     * {@link Client.addBreadcrumb}.
     *
     * @example
     * class NodeClient extends BaseClient<NodeOptions> {
     *   public constructor(options: NodeOptions) {
     *     super(options);
     *   }
     *
     *   // ...
     * }
     */
    class BaseClient {
      /** Options passed to the SDK. */

      /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */

      /** Array of set up integrations. */

      /** Number of calls being processed */

      /** Holds flushable  */

      // eslint-disable-next-line @typescript-eslint/ban-types

      /**
       * Initializes this client instance.
       *
       * @param options Options for the client.
       */
      constructor(options) {
        this._options = options;
        this._integrations = {};
        this._numProcessing = 0;
        this._outcomes = {};
        this._hooks = {};
        this._eventProcessors = [];

        if (options.dsn) {
          this._dsn = makeDsn(options.dsn);
        } else {
          logger.warn('No DSN provided, client will not send events.');
        }

        if (this._dsn) {
          const url = getEnvelopeEndpointWithUrlEncodedAuth(
            this._dsn,
            options.tunnel,
            options._metadata ? options._metadata.sdk : undefined,
          );
          this._transport = options.transport({
            tunnel: this._options.tunnel,
            recordDroppedEvent: this.recordDroppedEvent.bind(this),
            ...options.transportOptions,
            url,
          });
        }
      }

      /**
       * @inheritDoc
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      captureException(exception, hint, scope) {
        const eventId = uuid4();

        // ensure we haven't captured this very object before
        if (checkOrSetAlreadyCaught(exception)) {
          logger.log(ALREADY_SEEN_ERROR);
          return eventId;
        }

        const hintWithEventId = {
          event_id: eventId,
          ...hint,
        };

        this._process(
          this.eventFromException(exception, hintWithEventId).then(event =>
            this._captureEvent(event, hintWithEventId, scope),
          ),
        );

        return hintWithEventId.event_id;
      }

      /**
       * @inheritDoc
       */
      captureMessage(
        message,
        level,
        hint,
        currentScope,
      ) {
        const hintWithEventId = {
          event_id: uuid4(),
          ...hint,
        };

        const eventMessage = isParameterizedString(message) ? message : String(message);

        const promisedEvent = isPrimitive(message)
          ? this.eventFromMessage(eventMessage, level, hintWithEventId)
          : this.eventFromException(message, hintWithEventId);

        this._process(promisedEvent.then(event => this._captureEvent(event, hintWithEventId, currentScope)));

        return hintWithEventId.event_id;
      }

      /**
       * @inheritDoc
       */
      captureEvent(event, hint, currentScope) {
        const eventId = uuid4();

        // ensure we haven't captured this very object before
        if (hint && hint.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
          logger.log(ALREADY_SEEN_ERROR);
          return eventId;
        }

        const hintWithEventId = {
          event_id: eventId,
          ...hint,
        };

        const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
        const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;

        this._process(this._captureEvent(event, hintWithEventId, capturedSpanScope || currentScope));

        return hintWithEventId.event_id;
      }

      /**
       * @inheritDoc
       */
      captureSession(session) {
        if (!(typeof session.release === 'string')) {
          logger.warn('Discarded session because of missing or non-string release');
        } else {
          this.sendSession(session);
          // After sending, we set init false to indicate it's not the first occurrence
          updateSession(session, { init: false });
        }
      }

      /**
       * @inheritDoc
       */
      getDsn() {
        return this._dsn;
      }

      /**
       * @inheritDoc
       */
      getOptions() {
        return this._options;
      }

      /**
       * @see SdkMetadata in @sentry/types
       *
       * @return The metadata of the SDK
       */
      getSdkMetadata() {
        return this._options._metadata;
      }

      /**
       * @inheritDoc
       */
      getTransport() {
        return this._transport;
      }

      /**
       * @inheritDoc
       */
      flush(timeout) {
        const transport = this._transport;
        if (transport) {
          this.emit('flush');
          return this._isClientDoneProcessing(timeout).then(clientFinished => {
            return transport.flush(timeout).then(transportFlushed => clientFinished && transportFlushed);
          });
        } else {
          return resolvedSyncPromise(true);
        }
      }

      /**
       * @inheritDoc
       */
      close(timeout) {
        return this.flush(timeout).then(result => {
          this.getOptions().enabled = false;
          this.emit('close');
          return result;
        });
      }

      /** Get all installed event processors. */
      getEventProcessors() {
        return this._eventProcessors;
      }

      /** @inheritDoc */
      addEventProcessor(eventProcessor) {
        this._eventProcessors.push(eventProcessor);
      }

      /** @inheritdoc */
      init() {
        if (this._isEnabled()) {
          this._setupIntegrations();
        }
      }

      /**
       * Gets an installed integration by its name.
       *
       * @returns The installed integration or `undefined` if no integration with that `name` was installed.
       */
      getIntegrationByName(integrationName) {
        return this._integrations[integrationName];
      }

      /**
       * @inheritDoc
       */
      addIntegration(integration) {
        const isAlreadyInstalled = this._integrations[integration.name];

        // This hook takes care of only installing if not already installed
        setupIntegration(this, integration, this._integrations);
        // Here we need to check manually to make sure to not run this multiple times
        if (!isAlreadyInstalled) {
          afterSetupIntegrations(this, [integration]);
        }
      }

      /**
       * @inheritDoc
       */
      sendEvent(event, hint = {}) {
        this.emit('beforeSendEvent', event, hint);

        let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);

        for (const attachment of hint.attachments || []) {
          env = addItemToEnvelope(env, createAttachmentEnvelopeItem(attachment));
        }

        const promise = this.sendEnvelope(env);
        if (promise) {
          promise.then(sendResponse => this.emit('afterSendEvent', event, sendResponse), null);
        }
      }

      /**
       * @inheritDoc
       */
      sendSession(session) {
        const env = createSessionEnvelope(session, this._dsn, this._options._metadata, this._options.tunnel);

        // sendEnvelope should not throw
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.sendEnvelope(env);
      }

      /**
       * @inheritDoc
       */
      recordDroppedEvent(reason, category, _event) {
        // Note: we use `event` in replay, where we overwrite this hook.

        if (this._options.sendClientReports) {
          // We want to track each category (error, transaction, session, replay_event) separately
          // but still keep the distinction between different type of outcomes.
          // We could use nested maps, but it's much easier to read and type this way.
          // A correct type for map-based implementation if we want to go that route
          // would be `Partial<Record<SentryRequestType, Partial<Record<Outcome, number>>>>`
          // With typescript 4.1 we could even use template literal types
          const key = `${reason}:${category}`;
          logger.log(`Adding outcome: "${key}"`);

          this._outcomes[key] = (this._outcomes[key] || 0) + 1;
        }
      }

      // Keep on() & emit() signatures in sync with types' client.ts interface
      /* eslint-disable @typescript-eslint/unified-signatures */

      /** @inheritdoc */

      /** @inheritdoc */
      on(hook, callback) {
        const hooks = (this._hooks[hook] = this._hooks[hook] || []);

        // @ts-expect-error We assue the types are correct
        hooks.push(callback);

        // This function returns a callback execution handler that, when invoked,
        // deregisters a callback. This is crucial for managing instances where callbacks
        // need to be unregistered to prevent self-referencing in callback closures,
        // ensuring proper garbage collection.
        return () => {
          // @ts-expect-error We assue the types are correct
          const cbIndex = hooks.indexOf(callback);
          if (cbIndex > -1) {
            hooks.splice(cbIndex, 1);
          }
        };
      }

      /** @inheritdoc */

      /** @inheritdoc */
      emit(hook, ...rest) {
        const callbacks = this._hooks[hook];
        if (callbacks) {
          callbacks.forEach(callback => callback(...rest));
        }
      }

      /**
       * @inheritdoc
       */
      sendEnvelope(envelope) {
        this.emit('beforeEnvelope', envelope);

        if (this._isEnabled() && this._transport) {
          return this._transport.send(envelope).then(null, reason => {
            logger.error('Error while sending event:', reason);
            return reason;
          });
        }

        logger.error('Transport disabled');

        return resolvedSyncPromise({});
      }

      /* eslint-enable @typescript-eslint/unified-signatures */

      /** Setup integrations for this client. */
      _setupIntegrations() {
        const { integrations } = this._options;
        this._integrations = setupIntegrations(this, integrations);
        afterSetupIntegrations(this, integrations);
      }

      /** Updates existing session based on the provided event */
      _updateSessionFromEvent(session, event) {
        let crashed = false;
        let errored = false;
        const exceptions = event.exception && event.exception.values;

        if (exceptions) {
          errored = true;

          for (const ex of exceptions) {
            const mechanism = ex.mechanism;
            if (mechanism && mechanism.handled === false) {
              crashed = true;
              break;
            }
          }
        }

        // A session is updated and that session update is sent in only one of the two following scenarios:
        // 1. Session with non terminal status and 0 errors + an error occurred -> Will set error count to 1 and send update
        // 2. Session with non terminal status and 1 error + a crash occurred -> Will set status crashed and send update
        const sessionNonTerminal = session.status === 'ok';
        const shouldUpdateAndSend = (sessionNonTerminal && session.errors === 0) || (sessionNonTerminal && crashed);

        if (shouldUpdateAndSend) {
          updateSession(session, {
            ...(crashed && { status: 'crashed' }),
            errors: session.errors || Number(errored || crashed),
          });
          this.captureSession(session);
        }
      }

      /**
       * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
       * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
       *
       * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
       * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
       * `true`.
       * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
       * `false` otherwise
       */
      _isClientDoneProcessing(timeout) {
        return new SyncPromise(resolve => {
          let ticked = 0;
          const tick = 1;

          const interval = setInterval(() => {
            if (this._numProcessing == 0) {
              clearInterval(interval);
              resolve(true);
            } else {
              ticked += tick;
              if (timeout && ticked >= timeout) {
                clearInterval(interval);
                resolve(false);
              }
            }
          }, tick);
        });
      }

      /** Determines whether this SDK is enabled and a transport is present. */
      _isEnabled() {
        return this.getOptions().enabled !== false && this._transport !== undefined;
      }

      /**
       * Adds common information to events.
       *
       * The information includes release and environment from `options`,
       * breadcrumbs and context (extra, tags and user) from the scope.
       *
       * Information that is already present in the event is never overwritten. For
       * nested objects, such as the context, keys are merged.
       *
       * @param event The original event.
       * @param hint May contain additional information about the original exception.
       * @param currentScope A scope containing event metadata.
       * @returns A new event with more information.
       */
      _prepareEvent(
        event,
        hint,
        currentScope,
        isolationScope = getIsolationScope(),
      ) {
        const options = this.getOptions();
        const integrations = Object.keys(this._integrations);
        if (!hint.integrations && integrations.length > 0) {
          hint.integrations = integrations;
        }

        this.emit('preprocessEvent', event, hint);

        if (!event.type) {
          isolationScope.setLastEventId(event.event_id || hint.event_id);
        }

        return prepareEvent(options, event, hint, currentScope, this, isolationScope).then(evt => {
          if (evt === null) {
            return evt;
          }

          const propagationContext = {
            ...isolationScope.getPropagationContext(),
            ...(currentScope ? currentScope.getPropagationContext() : undefined),
          };

          const trace = evt.contexts && evt.contexts.trace;
          if (!trace && propagationContext) {
            const { traceId: trace_id, spanId, parentSpanId, dsc } = propagationContext;
            evt.contexts = {
              trace: dropUndefinedKeys({
                trace_id,
                span_id: spanId,
                parent_span_id: parentSpanId,
              }),
              ...evt.contexts,
            };

            const dynamicSamplingContext = dsc ? dsc : getDynamicSamplingContextFromClient(trace_id, this);

            evt.sdkProcessingMetadata = {
              dynamicSamplingContext,
              ...evt.sdkProcessingMetadata,
            };
          }
          return evt;
        });
      }

      /**
       * Processes the event and logs an error in case of rejection
       * @param event
       * @param hint
       * @param scope
       */
      _captureEvent(event, hint = {}, scope) {
        return this._processEvent(event, hint, scope).then(
          finalEvent => {
            return finalEvent.event_id;
          },
          reason => {
            {
              // If something's gone wrong, log the error as a warning. If it's just us having used a `SentryError` for
              // control flow, log just the message (no stack) as a log-level log.
              const sentryError = reason;
              if (sentryError.logLevel === 'log') {
                logger.log(sentryError.message);
              } else {
                logger.warn(sentryError);
              }
            }
            return undefined;
          },
        );
      }

      /**
       * Processes an event (either error or message) and sends it to Sentry.
       *
       * This also adds breadcrumbs and context information to the event. However,
       * platform specific meta data (such as the User's IP address) must be added
       * by the SDK implementor.
       *
       *
       * @param event The event to send to Sentry.
       * @param hint May contain additional information about the original exception.
       * @param currentScope A scope containing event metadata.
       * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
       */
      _processEvent(event, hint, currentScope) {
        const options = this.getOptions();
        const { sampleRate } = options;

        const isTransaction = isTransactionEvent(event);
        const isError = isErrorEvent(event);
        const eventType = event.type || 'error';
        const beforeSendLabel = `before send for type \`${eventType}\``;

        // 1.0 === 100% events are sent
        // 0.0 === 0% events are sent
        // Sampling for transaction happens somewhere else
        const parsedSampleRate = typeof sampleRate === 'undefined' ? undefined : parseSampleRate(sampleRate);
        if (isError && typeof parsedSampleRate === 'number' && Math.random() > parsedSampleRate) {
          this.recordDroppedEvent('sample_rate', 'error', event);
          return rejectedSyncPromise(
            new SentryError(
              `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
              'log',
            ),
          );
        }

        const dataCategory = eventType === 'replay_event' ? 'replay' : eventType;

        const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
        const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;

        return this._prepareEvent(event, hint, currentScope, capturedSpanIsolationScope)
          .then(prepared => {
            if (prepared === null) {
              this.recordDroppedEvent('event_processor', dataCategory, event);
              throw new SentryError('An event processor returned `null`, will not send event.', 'log');
            }

            const isInternalException = hint.data && (hint.data).__sentry__ === true;
            if (isInternalException) {
              return prepared;
            }

            const result = processBeforeSend(this, options, prepared, hint);
            return _validateBeforeSendResult(result, beforeSendLabel);
          })
          .then(processedEvent => {
            if (processedEvent === null) {
              this.recordDroppedEvent('before_send', dataCategory, event);
              if (isTransactionEvent(event)) {
                const spans = event.spans || [];
                // the transaction itself counts as one span, plus all the child spans that are added
                const spanCount = 1 + spans.length;
                this._outcomes['span'] = (this._outcomes['span'] || 0) + spanCount;
              }
              throw new SentryError(`${beforeSendLabel} returned \`null\`, will not send event.`, 'log');
            }

            const session = currentScope && currentScope.getSession();
            if (!isTransaction && session) {
              this._updateSessionFromEvent(session, processedEvent);
            }

            // None of the Sentry built event processor will update transaction name,
            // so if the transaction name has been changed by an event processor, we know
            // it has to come from custom event processor added by a user
            const transactionInfo = processedEvent.transaction_info;
            if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
              const source = 'custom';
              processedEvent.transaction_info = {
                ...transactionInfo,
                source,
              };
            }

            this.sendEvent(processedEvent, hint);
            return processedEvent;
          })
          .then(null, reason => {
            if (reason instanceof SentryError) {
              throw reason;
            }

            this.captureException(reason, {
              data: {
                __sentry__: true,
              },
              originalException: reason,
            });
            throw new SentryError(
              `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${reason}`,
            );
          });
      }

      /**
       * Occupies the client with processing and event
       */
      _process(promise) {
        this._numProcessing++;
        void promise.then(
          value => {
            this._numProcessing--;
            return value;
          },
          reason => {
            this._numProcessing--;
            return reason;
          },
        );
      }

      /**
       * Clears outcomes on this client and returns them.
       */
      _clearOutcomes() {
        const outcomes = this._outcomes;
        this._outcomes = {};
        return Object.entries(outcomes).map(([key, quantity]) => {
          const [reason, category] = key.split(':');
          return {
            reason,
            category,
            quantity,
          };
        });
      }

      /**
       * @inheritDoc
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

    }

    /**
     * Verifies that return value of configured `beforeSend` or `beforeSendTransaction` is of expected type, and returns the value if so.
     */
    function _validateBeforeSendResult(
      beforeSendResult,
      beforeSendLabel,
    ) {
      const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
      if (isThenable(beforeSendResult)) {
        return beforeSendResult.then(
          event => {
            if (!isPlainObject(event) && event !== null) {
              throw new SentryError(invalidValueError);
            }
            return event;
          },
          e => {
            throw new SentryError(`${beforeSendLabel} rejected with ${e}`);
          },
        );
      } else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) {
        throw new SentryError(invalidValueError);
      }
      return beforeSendResult;
    }

    /**
     * Process the matching `beforeSendXXX` callback.
     */
    function processBeforeSend(
      client,
      options,
      event,
      hint,
    ) {
      const { beforeSend, beforeSendTransaction, beforeSendSpan } = options;

      if (isErrorEvent(event) && beforeSend) {
        return beforeSend(event, hint);
      }

      if (isTransactionEvent(event)) {
        if (event.spans && beforeSendSpan) {
          const processedSpans = [];
          for (const span of event.spans) {
            const processedSpan = beforeSendSpan(span);
            if (processedSpan) {
              processedSpans.push(processedSpan);
            } else {
              client.recordDroppedEvent('before_send', 'span');
            }
          }
          event.spans = processedSpans;
        }

        if (beforeSendTransaction) {
          return beforeSendTransaction(event, hint);
        }
      }

      return event;
    }

    function isErrorEvent(event) {
      return event.type === undefined;
    }

    function isTransactionEvent(event) {
      return event.type === 'transaction';
    }

    /** A class object that can instantiate Client objects. */

    /**
     * Internal function to create a new SDK client instance. The client is
     * installed and then bound to the current scope.
     *
     * @param clientClass The client class to instantiate.
     * @param options Options to pass to the client.
     */
    function initAndBind(
      clientClass,
      options,
    ) {
      if (options.debug === true) {
        {
          logger.enable();
        }
      }
      const scope = getCurrentScope();
      scope.update(options.initialScope);

      const client = new clientClass(options);
      setCurrentClient(client);
      client.init();
      return client;
    }

    /**
     * Make the given client the current client.
     */
    function setCurrentClient(client) {
      getCurrentScope().setClient(client);
    }

    const DEFAULT_TRANSPORT_BUFFER_SIZE = 64;

    /**
     * Creates an instance of a Sentry `Transport`
     *
     * @param options
     * @param makeRequest
     */
    function createTransport(
      options,
      makeRequest,
      buffer = makePromiseBuffer(
        options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE,
      ),
    ) {
      let rateLimits = {};
      const flush = (timeout) => buffer.drain(timeout);

      function send(envelope) {
        const filteredEnvelopeItems = [];

        // Drop rate limited items from envelope
        forEachEnvelopeItem(envelope, (item, type) => {
          const dataCategory = envelopeItemTypeToDataCategory(type);
          if (isRateLimited(rateLimits, dataCategory)) {
            const event = getEventForEnvelopeItem(item, type);
            options.recordDroppedEvent('ratelimit_backoff', dataCategory, event);
          } else {
            filteredEnvelopeItems.push(item);
          }
        });

        // Skip sending if envelope is empty after filtering out rate limited events
        if (filteredEnvelopeItems.length === 0) {
          return resolvedSyncPromise({});
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);

        // Creates client report for each item in an envelope
        const recordEnvelopeLoss = (reason) => {
          forEachEnvelopeItem(filteredEnvelope, (item, type) => {
            const event = getEventForEnvelopeItem(item, type);
            options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type), event);
          });
        };

        const requestTask = () =>
          makeRequest({ body: serializeEnvelope(filteredEnvelope) }).then(
            response => {
              // We don't want to throw on NOK responses, but we want to at least log them
              if (response.statusCode !== undefined && (response.statusCode < 200 || response.statusCode >= 300)) {
                logger.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
              }

              rateLimits = updateRateLimits(rateLimits, response);
              return response;
            },
            error => {
              recordEnvelopeLoss('network_error');
              throw error;
            },
          );

        return buffer.add(requestTask).then(
          result => result,
          error => {
            if (error instanceof SentryError) {
              logger.error('Skipped sending event because buffer is full.');
              recordEnvelopeLoss('queue_overflow');
              return resolvedSyncPromise({});
            } else {
              throw error;
            }
          },
        );
      }

      return {
        send,
        flush,
      };
    }

    function getEventForEnvelopeItem(item, type) {
      if (type !== 'event' && type !== 'transaction') {
        return undefined;
      }

      return Array.isArray(item) ? (item)[1] : undefined;
    }

    /**
     * Tagged template function which returns paramaterized representation of the message
     * For example: parameterize`This is a log statement with ${x} and ${y} params`, would return:
     * "__sentry_template_string__": 'This is a log statement with %s and %s params',
     * "__sentry_template_values__": ['first', 'second']
     * @param strings An array of string values splitted between expressions
     * @param values Expressions extracted from template string
     * @returns String with template information in __sentry_template_string__ and __sentry_template_values__ properties
     */
    function parameterize(strings, ...values) {
      const formatted = new String(String.raw(strings, ...values));
      formatted.__sentry_template_string__ = strings.join('\x00').replace(/%/g, '%%').replace(/\0/g, '%s');
      formatted.__sentry_template_values__ = values;
      return formatted;
    }

    /**
     * A builder for the SDK metadata in the options for the SDK initialization.
     *
     * Note: This function is identical to `buildMetadata` in Remix and NextJS and SvelteKit.
     * We don't extract it for bundle size reasons.
     * @see https://github.com/getsentry/sentry-javascript/pull/7404
     * @see https://github.com/getsentry/sentry-javascript/pull/4196
     *
     * If you make changes to this function consider updating the others as well.
     *
     * @param options SDK options object that gets mutated
     * @param names list of package names
     */
    function applySdkMetadata(options, name, names = [name], source = 'npm') {
      const metadata = options._metadata || {};

      if (!metadata.sdk) {
        metadata.sdk = {
          name: `sentry.javascript.${name}`,
          packages: names.map(name => ({
            name: `${source}:@sentry/${name}`,
            version: SDK_VERSION,
          })),
          version: SDK_VERSION,
        };
      }

      options._metadata = metadata;
    }

    /**
     * Default maximum number of breadcrumbs added to an event. Can be overwritten
     * with {@link Options.maxBreadcrumbs}.
     */
    const DEFAULT_BREADCRUMBS = 100;

    /**
     * Records a new breadcrumb which will be attached to future events.
     *
     * Breadcrumbs will be added to subsequent events to provide more context on
     * user's actions prior to an error or crash.
     */
    function addBreadcrumb(breadcrumb, hint) {
      const client = getClient();
      const isolationScope = getIsolationScope();

      if (!client) return;

      const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions();

      if (maxBreadcrumbs <= 0) return;

      const timestamp = dateTimestampInSeconds();
      const mergedBreadcrumb = { timestamp, ...breadcrumb };
      const finalBreadcrumb = beforeBreadcrumb
        ? (consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)))
        : mergedBreadcrumb;

      if (finalBreadcrumb === null) return;

      if (client.emit) {
        client.emit('beforeAddBreadcrumb', finalBreadcrumb, hint);
      }

      isolationScope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
    }

    let originalFunctionToString;

    const INTEGRATION_NAME$6 = 'FunctionToString';

    const SETUP_CLIENTS = new WeakMap();

    const _functionToStringIntegration = (() => {
      return {
        name: INTEGRATION_NAME$6,
        setupOnce() {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          originalFunctionToString = Function.prototype.toString;

          // intrinsics (like Function.prototype) might be immutable in some environments
          // e.g. Node with --frozen-intrinsics, XS (an embedded JavaScript engine) or SES (a JavaScript proposal)
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Function.prototype.toString = function (...args) {
              const originalFunction = getOriginalFunction(this);
              const context =
                SETUP_CLIENTS.has(getClient()) && originalFunction !== undefined ? originalFunction : this;
              return originalFunctionToString.apply(context, args);
            };
          } catch (e) {
            // ignore errors here, just don't patch this
          }
        },
        setup(client) {
          SETUP_CLIENTS.set(client, true);
        },
      };
    });

    /**
     * Patch toString calls to return proper name for wrapped functions.
     *
     * ```js
     * Sentry.init({
     *   integrations: [
     *     functionToStringIntegration(),
     *   ],
     * });
     * ```
     */
    const functionToStringIntegration = defineIntegration(_functionToStringIntegration);

    // "Script error." is hard coded into browsers for errors that it can't read.
    // this is the result of a script being pulled in from an external domain and CORS.
    const DEFAULT_IGNORE_ERRORS = [
      /^Script error\.?$/,
      /^Javascript error: Script error\.? on line 0$/,
      /^ResizeObserver loop completed with undelivered notifications.$/, // The browser logs this when a ResizeObserver handler takes a bit longer. Usually this is not an actual issue though. It indicates slowness.
      /^Cannot redefine property: googletag$/, // This is thrown when google tag manager is used in combination with an ad blocker
      "undefined is not an object (evaluating 'a.L')", // Random error that happens but not actionable or noticeable to end-users.
      'can\'t redefine non-configurable property "solana"', // Probably a browser extension or custom browser (Brave) throwing this error
      "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)", // Error thrown by GTM, seemingly not affecting end-users
      "Can't find variable: _AutofillCallbackHandler", // Unactionable error in instagram webview https://developers.facebook.com/community/threads/320013549791141/
    ];

    /** Options for the InboundFilters integration */

    const INTEGRATION_NAME$5 = 'InboundFilters';
    const _inboundFiltersIntegration = ((options = {}) => {
      return {
        name: INTEGRATION_NAME$5,
        processEvent(event, _hint, client) {
          const clientOptions = client.getOptions();
          const mergedOptions = _mergeOptions(options, clientOptions);
          return _shouldDropEvent$1(event, mergedOptions) ? null : event;
        },
      };
    });

    const inboundFiltersIntegration = defineIntegration(_inboundFiltersIntegration);

    function _mergeOptions(
      internalOptions = {},
      clientOptions = {},
    ) {
      return {
        allowUrls: [...(internalOptions.allowUrls || []), ...(clientOptions.allowUrls || [])],
        denyUrls: [...(internalOptions.denyUrls || []), ...(clientOptions.denyUrls || [])],
        ignoreErrors: [
          ...(internalOptions.ignoreErrors || []),
          ...(clientOptions.ignoreErrors || []),
          ...(internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS),
        ],
        ignoreTransactions: [...(internalOptions.ignoreTransactions || []), ...(clientOptions.ignoreTransactions || [])],
        ignoreInternal: internalOptions.ignoreInternal !== undefined ? internalOptions.ignoreInternal : true,
      };
    }

    function _shouldDropEvent$1(event, options) {
      if (options.ignoreInternal && _isSentryError(event)) {
        logger.warn(`Event dropped due to being internal Sentry Error.\nEvent: ${getEventDescription(event)}`);
        return true;
      }
      if (_isIgnoredError(event, options.ignoreErrors)) {
        logger.warn(
          `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${getEventDescription(event)}`,
        );
        return true;
      }
      if (_isUselessError(event)) {
        logger.warn(
          `Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${getEventDescription(
            event,
          )}`,
        );
        return true;
      }
      if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
        logger.warn(
          `Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${getEventDescription(event)}`,
        );
        return true;
      }
      if (_isDeniedUrl(event, options.denyUrls)) {
        logger.warn(
          `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${getEventDescription(
            event,
          )}.\nUrl: ${_getEventFilterUrl(event)}`,
        );
        return true;
      }
      if (!_isAllowedUrl(event, options.allowUrls)) {
        logger.warn(
          `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${getEventDescription(
            event,
          )}.\nUrl: ${_getEventFilterUrl(event)}`,
        );
        return true;
      }
      return false;
    }

    function _isIgnoredError(event, ignoreErrors) {
      // If event.type, this is not an error
      if (event.type || !ignoreErrors || !ignoreErrors.length) {
        return false;
      }

      return _getPossibleEventMessages(event).some(message => stringMatchesSomePattern(message, ignoreErrors));
    }

    function _isIgnoredTransaction(event, ignoreTransactions) {
      if (event.type !== 'transaction' || !ignoreTransactions || !ignoreTransactions.length) {
        return false;
      }

      const name = event.transaction;
      return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
    }

    function _isDeniedUrl(event, denyUrls) {
      // TODO: Use Glob instead?
      if (!denyUrls || !denyUrls.length) {
        return false;
      }
      const url = _getEventFilterUrl(event);
      return !url ? false : stringMatchesSomePattern(url, denyUrls);
    }

    function _isAllowedUrl(event, allowUrls) {
      // TODO: Use Glob instead?
      if (!allowUrls || !allowUrls.length) {
        return true;
      }
      const url = _getEventFilterUrl(event);
      return !url ? true : stringMatchesSomePattern(url, allowUrls);
    }

    function _getPossibleEventMessages(event) {
      const possibleMessages = [];

      if (event.message) {
        possibleMessages.push(event.message);
      }

      let lastException;
      try {
        // @ts-expect-error Try catching to save bundle size
        lastException = event.exception.values[event.exception.values.length - 1];
      } catch (e) {
        // try catching to save bundle size checking existence of variables
      }

      if (lastException) {
        if (lastException.value) {
          possibleMessages.push(lastException.value);
          if (lastException.type) {
            possibleMessages.push(`${lastException.type}: ${lastException.value}`);
          }
        }
      }

      return possibleMessages;
    }

    function _isSentryError(event) {
      try {
        // @ts-expect-error can't be a sentry error if undefined
        return event.exception.values[0].type === 'SentryError';
      } catch (e) {
        // ignore
      }
      return false;
    }

    function _getLastValidUrl(frames = []) {
      for (let i = frames.length - 1; i >= 0; i--) {
        const frame = frames[i];

        if (frame && frame.filename !== '<anonymous>' && frame.filename !== '[native code]') {
          return frame.filename || null;
        }
      }

      return null;
    }

    function _getEventFilterUrl(event) {
      try {
        let frames;
        try {
          // @ts-expect-error we only care about frames if the whole thing here is defined
          frames = event.exception.values[0].stacktrace.frames;
        } catch (e) {
          // ignore
        }
        return frames ? _getLastValidUrl(frames) : null;
      } catch (oO) {
        logger.error(`Cannot extract url for event ${getEventDescription(event)}`);
        return null;
      }
    }

    function _isUselessError(event) {
      if (event.type) {
        // event is not an error
        return false;
      }

      // We only want to consider events for dropping that actually have recorded exception values.
      if (!event.exception || !event.exception.values || event.exception.values.length === 0) {
        return false;
      }

      return (
        // No top-level message
        !event.message &&
        // There are no exception values that have a stacktrace, a non-generic-Error type or value
        !event.exception.values.some(value => value.stacktrace || (value.type && value.type !== 'Error') || value.value)
      );
    }

    const INTEGRATION_NAME$4 = 'Dedupe';

    const _dedupeIntegration = (() => {
      let previousEvent;

      return {
        name: INTEGRATION_NAME$4,
        processEvent(currentEvent) {
          // We want to ignore any non-error type events, e.g. transactions or replays
          // These should never be deduped, and also not be compared against as _previousEvent.
          if (currentEvent.type) {
            return currentEvent;
          }

          // Juuust in case something goes wrong
          try {
            if (_shouldDropEvent(currentEvent, previousEvent)) {
              logger.warn('Event dropped due to being a duplicate of previously captured event.');
              return null;
            }
          } catch (_oO) { } // eslint-disable-line no-empty

          return (previousEvent = currentEvent);
        },
      };
    });

    /**
     * Deduplication filter.
     */
    const dedupeIntegration = defineIntegration(_dedupeIntegration);

    /** only exported for tests. */
    function _shouldDropEvent(currentEvent, previousEvent) {
      if (!previousEvent) {
        return false;
      }

      if (_isSameMessageEvent(currentEvent, previousEvent)) {
        return true;
      }

      if (_isSameExceptionEvent(currentEvent, previousEvent)) {
        return true;
      }

      return false;
    }

    function _isSameMessageEvent(currentEvent, previousEvent) {
      const currentMessage = currentEvent.message;
      const previousMessage = previousEvent.message;

      // If neither event has a message property, they were both exceptions, so bail out
      if (!currentMessage && !previousMessage) {
        return false;
      }

      // If only one event has a stacktrace, but not the other one, they are not the same
      if ((currentMessage && !previousMessage) || (!currentMessage && previousMessage)) {
        return false;
      }

      if (currentMessage !== previousMessage) {
        return false;
      }

      if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
      }

      if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
      }

      return true;
    }

    function _isSameExceptionEvent(currentEvent, previousEvent) {
      const previousException = _getExceptionFromEvent(previousEvent);
      const currentException = _getExceptionFromEvent(currentEvent);

      if (!previousException || !currentException) {
        return false;
      }

      if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
        return false;
      }

      if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
      }

      if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
      }

      return true;
    }

    function _isSameStacktrace(currentEvent, previousEvent) {
      let currentFrames = getFramesFromEvent(currentEvent);
      let previousFrames = getFramesFromEvent(previousEvent);

      // If neither event has a stacktrace, they are assumed to be the same
      if (!currentFrames && !previousFrames) {
        return true;
      }

      // If only one event has a stacktrace, but not the other one, they are not the same
      if ((currentFrames && !previousFrames) || (!currentFrames && previousFrames)) {
        return false;
      }

      currentFrames = currentFrames;
      previousFrames = previousFrames;

      // If number of frames differ, they are not the same
      if (previousFrames.length !== currentFrames.length) {
        return false;
      }

      // Otherwise, compare the two
      for (let i = 0; i < previousFrames.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const frameA = previousFrames[i];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const frameB = currentFrames[i];

        if (
          frameA.filename !== frameB.filename ||
          frameA.lineno !== frameB.lineno ||
          frameA.colno !== frameB.colno ||
          frameA.function !== frameB.function
        ) {
          return false;
        }
      }

      return true;
    }

    function _isSameFingerprint(currentEvent, previousEvent) {
      let currentFingerprint = currentEvent.fingerprint;
      let previousFingerprint = previousEvent.fingerprint;

      // If neither event has a fingerprint, they are assumed to be the same
      if (!currentFingerprint && !previousFingerprint) {
        return true;
      }

      // If only one event has a fingerprint, but not the other one, they are not the same
      if ((currentFingerprint && !previousFingerprint) || (!currentFingerprint && previousFingerprint)) {
        return false;
      }

      currentFingerprint = currentFingerprint;
      previousFingerprint = previousFingerprint;

      // Otherwise, compare the two
      try {
        return !!(currentFingerprint.join('') === previousFingerprint.join(''));
      } catch (_oO) {
        return false;
      }
    }

    function _getExceptionFromEvent(event) {
      return event.exception && event.exception.values && event.exception.values[0];
    }

    /**
     * This is for legacy reasons, and returns a proxy object instead of a hub to be used.
     *
     * @deprecated Use the methods directly from the top level Sentry API (e.g. `Sentry.withScope`)
     * For more information see our migration guide for
     * [replacing `getCurrentHub` and `Hub`](https://github.com/getsentry/sentry-javascript/blob/develop/MIGRATION.md#deprecate-hub)
     * usage
     */
    // eslint-disable-next-line deprecation/deprecation
    function getCurrentHubShim() {
      return {
        bindClient(client) {
          const scope = getCurrentScope();
          scope.setClient(client);
        },

        withScope,
        getClient: () => getClient(),
        getScope: getCurrentScope,
        getIsolationScope,
        captureException: (exception, hint) => {
          return getCurrentScope().captureException(exception, hint);
        },
        captureMessage: (message, level, hint) => {
          return getCurrentScope().captureMessage(message, level, hint);
        },
        captureEvent,
        addBreadcrumb,
        setUser,
        setTags,
        setTag,
        setExtra,
        setExtras,
        setContext,

        getIntegration(integration) {
          const client = getClient();
          return (client && client.getIntegrationByName(integration.id)) || null;
        },

        startSession,
        endSession,
        captureSession(end) {
          // both send the update and pull the session from the scope
          if (end) {
            return endSession();
          }

          // only send the update
          _sendSessionUpdate();
        },
      };
    }

    /**
     * Returns the default hub instance.
     *
     * If a hub is already registered in the global carrier but this module
     * contains a more recent version, it replaces the registered version.
     * Otherwise, the currently registered hub will be returned.
     *
     * @deprecated Use the respective replacement method directly instead.
     */
    // eslint-disable-next-line deprecation/deprecation
    const getCurrentHub = getCurrentHubShim;

    /**
     * Sends the current Session on the scope
     */
    function _sendSessionUpdate() {
      const scope = getCurrentScope();
      const client = getClient();

      const session = scope.getSession();
      if (client && session) {
        client.captureSession(session);
      }
    }

    /**
     * This is a shim for the BrowserTracing integration.
     * It is needed in order for the CDN bundles to continue working when users add/remove tracing
     * from it, without changing their config. This is necessary for the loader mechanism.
     */
    const browserTracingIntegrationShim = defineIntegration((_options) => {
      consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn('You are using browserTracingIntegration() even though this bundle does not include tracing.');
      });

      return {
        name: 'BrowserTracing',
      };
    });

    function warn() {
      consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn('You are using metrics even though this bundle does not include tracing.');
      });
    }

    const metricsShim = {
      increment: warn,
      distribution: warn,
      set: warn,
      gauge: warn,
      timing: (_name, value) => {
        warn();
        if (typeof value === 'function') {
          return value();
        }
      },
    };

    const WINDOW$1 = GLOBAL_OBJ;

    let ignoreOnError = 0;

    /**
     * @hidden
     */
    function shouldIgnoreOnError() {
      return ignoreOnError > 0;
    }

    /**
     * @hidden
     */
    function ignoreNextOnError() {
      // onerror should trigger before setTimeout
      ignoreOnError++;
      setTimeout(() => {
        ignoreOnError--;
      });
    }

    /**
     * Instruments the given function and sends an event to Sentry every time the
     * function throws an exception.
     *
     * @param fn A function to wrap. It is generally safe to pass an unbound function, because the returned wrapper always
     * has a correct `this` context.
     * @returns The wrapped function.
     * @hidden
     */
    function wrap(
      fn,
      options

        = {},
      before,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
      // for future readers what this does is wrap a function and then create
      // a bi-directional wrapping between them.
      //
      // example: wrapped = wrap(original);
      //  original.__sentry_wrapped__ -> wrapped
      //  wrapped.__sentry_original__ -> original

      if (typeof fn !== 'function') {
        return fn;
      }

      try {
        // if we're dealing with a function that was previously wrapped, return
        // the original wrapper.
        const wrapper = fn.__sentry_wrapped__;
        if (wrapper) {
          return wrapper;
        }

        // We don't wanna wrap it twice
        if (getOriginalFunction(fn)) {
          return fn;
        }
      } catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        // Bail on wrapping and return the function as-is (defers to window.onerror).
        return fn;
      }

      /* eslint-disable prefer-rest-params */
      // It is important that `sentryWrapped` is not an arrow function to preserve the context of `this`
      const sentryWrapped = function () {
        const args = Array.prototype.slice.call(arguments);

        try {
          if (before && typeof before === 'function') {
            before.apply(this, arguments);
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
          const wrappedArguments = args.map((arg) => wrap(arg, options));

          // Attempt to invoke user-land function
          // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
          //       means the sentry.javascript SDK caught an error invoking your application code. This
          //       is expected behavior and NOT indicative of a bug with sentry.javascript.
          return fn.apply(this, wrappedArguments);
        } catch (ex) {
          ignoreNextOnError();

          withScope(scope => {
            scope.addEventProcessor(event => {
              if (options.mechanism) {
                addExceptionTypeValue(event, undefined, undefined);
                addExceptionMechanism(event, options.mechanism);
              }

              event.extra = {
                ...event.extra,
                arguments: args,
              };

              return event;
            });

            captureException(ex);
          });

          throw ex;
        }
      };
      /* eslint-enable prefer-rest-params */

      // Accessing some objects may throw
      // ref: https://github.com/getsentry/sentry-javascript/issues/1168
      try {
        for (const property in fn) {
          if (Object.prototype.hasOwnProperty.call(fn, property)) {
            sentryWrapped[property] = fn[property];
          }
        }
      } catch (_oO) { } // eslint-disable-line no-empty

      // Signal that this function has been wrapped/filled already
      // for both debugging and to prevent it to being wrapped/filled twice
      markFunctionWrapped(sentryWrapped, fn);

      addNonEnumerableProperty(fn, '__sentry_wrapped__', sentryWrapped);

      // Restore original function name (not all browsers allow that)
      try {
        const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
        if (descriptor.configurable) {
          Object.defineProperty(sentryWrapped, 'name', {
            get() {
              return fn.name;
            },
          });
        }
        // eslint-disable-next-line no-empty
      } catch (_oO) { }

      return sentryWrapped;
    }

    /**
     * This function creates an exception from a JavaScript Error
     */
    function exceptionFromError(stackParser, ex) {
      // Get the frames first since Opera can lose the stack if we touch anything else first
      const frames = parseStackFrames(stackParser, ex);

      const exception = {
        type: ex && ex.name,
        value: extractMessage(ex),
      };

      if (frames.length) {
        exception.stacktrace = { frames };
      }

      if (exception.type === undefined && exception.value === '') {
        exception.value = 'Unrecoverable error caught';
      }

      return exception;
    }

    function eventFromPlainObject(
      stackParser,
      exception,
      syntheticException,
      isUnhandledRejection,
    ) {
      const client = getClient();
      const normalizeDepth = client && client.getOptions().normalizeDepth;

      // If we can, we extract an exception from the object properties
      const errorFromProp = getErrorPropertyFromObject(exception);

      const extra = {
        __serialized__: normalizeToSize(exception, normalizeDepth),
      };

      if (errorFromProp) {
        return {
          exception: {
            values: [exceptionFromError(stackParser, errorFromProp)],
          },
          extra,
        };
      }

      const event = {
        exception: {
          values: [
            {
              type: isEvent(exception) ? exception.constructor.name : isUnhandledRejection ? 'UnhandledRejection' : 'Error',
              value: getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }),
            },
          ],
        },
        extra,
      };

      if (syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
          // event.exception.values[0] has been set above
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          event.exception.values[0].stacktrace = { frames };
        }
      }

      return event;
    }

    function eventFromError(stackParser, ex) {
      return {
        exception: {
          values: [exceptionFromError(stackParser, ex)],
        },
      };
    }

    /** Parses stack frames from an error */
    function parseStackFrames(
      stackParser,
      ex,
    ) {
      // Access and store the stacktrace property before doing ANYTHING
      // else to it because Opera is not very good at providing it
      // reliably in other circumstances.
      const stacktrace = ex.stacktrace || ex.stack || '';

      const skipLines = getSkipFirstStackStringLines(ex);
      const framesToPop = getPopFirstTopFrames(ex);

      try {
        return stackParser(stacktrace, skipLines, framesToPop);
      } catch (e) {
        // no-empty
      }

      return [];
    }

    // Based on our own mapping pattern - https://github.com/getsentry/sentry/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/sentry/lang/javascript/errormapping.py#L83-L108
    const reactMinifiedRegexp = /Minified React error #\d+;/i;

    /**
     * Certain known React errors contain links that would be falsely
     * parsed as frames. This function check for these errors and
     * returns number of the stack string lines to skip.
     */
    function getSkipFirstStackStringLines(ex) {
      if (ex && reactMinifiedRegexp.test(ex.message)) {
        return 1;
      }

      return 0;
    }

    /**
     * If error has `framesToPop` property, it means that the
     * creator tells us the first x frames will be useless
     * and should be discarded. Typically error from wrapper function
     * which don't point to the actual location in the developer's code.
     *
     * Example: https://github.com/zertosh/invariant/blob/master/invariant.js#L46
     */
    function getPopFirstTopFrames(ex) {
      if (typeof ex.framesToPop === 'number') {
        return ex.framesToPop;
      }

      return 0;
    }

    /**
     * There are cases where stacktrace.message is an Event object
     * https://github.com/getsentry/sentry-javascript/issues/1949
     * In this specific case we try to extract stacktrace.message.error.message
     */
    function extractMessage(ex) {
      const message = ex && ex.message;
      if (!message) {
        return 'No error message';
      }
      if (message.error && typeof message.error.message === 'string') {
        return message.error.message;
      }
      return message;
    }

    /**
     * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
     * @hidden
     */
    function eventFromException(
      stackParser,
      exception,
      hint,
      attachStacktrace,
    ) {
      const syntheticException = (hint && hint.syntheticException) || undefined;
      const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
      addExceptionMechanism(event); // defaults to { type: 'generic', handled: true }
      event.level = 'error';
      if (hint && hint.event_id) {
        event.event_id = hint.event_id;
      }
      return resolvedSyncPromise(event);
    }

    /**
     * Builds and Event from a Message
     * @hidden
     */
    function eventFromMessage(
      stackParser,
      message,
      level = 'info',
      hint,
      attachStacktrace,
    ) {
      const syntheticException = (hint && hint.syntheticException) || undefined;
      const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
      event.level = level;
      if (hint && hint.event_id) {
        event.event_id = hint.event_id;
      }
      return resolvedSyncPromise(event);
    }

    /**
     * @hidden
     */
    function eventFromUnknownInput(
      stackParser,
      exception,
      syntheticException,
      attachStacktrace,
      isUnhandledRejection,
    ) {
      let event;

      if (isErrorEvent$1(exception) && (exception).error) {
        // If it is an ErrorEvent with `error` property, extract it to get actual Error
        const errorEvent = exception;
        return eventFromError(stackParser, errorEvent.error);
      }

      // If it is a `DOMError` (which is a legacy API, but still supported in some browsers) then we just extract the name
      // and message, as it doesn't provide anything else. According to the spec, all `DOMExceptions` should also be
      // `Error`s, but that's not the case in IE11, so in that case we treat it the same as we do a `DOMError`.
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
      // https://webidl.spec.whatwg.org/#es-DOMException-specialness
      if (isDOMError(exception) || isDOMException(exception)) {
        const domException = exception;

        if ('stack' in (exception)) {
          event = eventFromError(stackParser, exception);
        } else {
          const name = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
          const message = domException.message ? `${name}: ${domException.message}` : name;
          event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
          addExceptionTypeValue(event, message);
        }
        if ('code' in domException) {
          // eslint-disable-next-line deprecation/deprecation
          event.tags = { ...event.tags, 'DOMException.code': `${domException.code}` };
        }

        return event;
      }
      if (isError(exception)) {
        // we have a real Error object, do nothing
        return eventFromError(stackParser, exception);
      }
      if (isPlainObject(exception) || isEvent(exception)) {
        // If it's a plain object or an instance of `Event` (the built-in JS kind, not this SDK's `Event` type), serialize
        // it manually. This will allow us to group events based on top-level keys which is much better than creating a new
        // group on any key/value change.
        const objectException = exception;
        event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
        addExceptionMechanism(event, {
          synthetic: true,
        });
        return event;
      }

      // If none of previous checks were valid, then it means that it's not:
      // - an instance of DOMError
      // - an instance of DOMException
      // - an instance of Event
      // - an instance of Error
      // - a valid ErrorEvent (one with an error property)
      // - a plain Object
      //
      // So bail out and capture it as a simple message:
      event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
      addExceptionTypeValue(event, `${exception}`, undefined);
      addExceptionMechanism(event, {
        synthetic: true,
      });

      return event;
    }

    function eventFromString(
      stackParser,
      message,
      syntheticException,
      attachStacktrace,
    ) {
      const event = {};

      if (attachStacktrace && syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
          event.exception = {
            values: [{ value: message, stacktrace: { frames } }],
          };
        }
      }

      if (isParameterizedString(message)) {
        const { __sentry_template_string__, __sentry_template_values__ } = message;

        event.logentry = {
          message: __sentry_template_string__,
          params: __sentry_template_values__,
        };
        return event;
      }

      event.message = message;
      return event;
    }

    function getNonErrorObjectExceptionValue(
      exception,
      { isUnhandledRejection },
    ) {
      const keys = extractExceptionKeysForMessage(exception);
      const captureType = isUnhandledRejection ? 'promise rejection' : 'exception';

      // Some ErrorEvent instances do not have an `error` property, which is why they are not handled before
      // We still want to try to get a decent message for these cases
      if (isErrorEvent$1(exception)) {
        return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
      }

      if (isEvent(exception)) {
        const className = getObjectClassName(exception);
        return `Event \`${className}\` (type=${exception.type}) captured as ${captureType}`;
      }

      return `Object captured as ${captureType} with keys: ${keys}`;
    }

    function getObjectClassName(obj) {
      try {
        const prototype = Object.getPrototypeOf(obj);
        return prototype ? prototype.constructor.name : undefined;
      } catch (e) {
        // ignore errors here
      }
    }

    /** If a plain object has a property that is an `Error`, return this error. */
    function getErrorPropertyFromObject(obj) {
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          const value = obj[prop];
          if (value instanceof Error) {
            return value;
          }
        }
      }

      return undefined;
    }

    /**
     * Creates an envelope from a user feedback.
     */
    function createUserFeedbackEnvelope(
      feedback,
      {
        metadata,
        tunnel,
        dsn,
      }

      ,
    ) {
      const headers = {
        event_id: feedback.event_id,
        sent_at: new Date().toISOString(),
        ...(metadata &&
          metadata.sdk && {
          sdk: {
            name: metadata.sdk.name,
            version: metadata.sdk.version,
          },
        }),
        ...(!!tunnel && !!dsn && { dsn: dsnToString(dsn) }),
      };
      const item = createUserFeedbackEnvelopeItem(feedback);

      return createEnvelope(headers, [item]);
    }

    function createUserFeedbackEnvelopeItem(feedback) {
      const feedbackHeaders = {
        type: 'user_report',
      };
      return [feedbackHeaders, feedback];
    }

    /**
     * Configuration options for the Sentry Browser SDK.
     * @see @sentry/types Options for more information.
     */

    /**
     * The Sentry Browser SDK Client.
     *
     * @see BrowserOptions for documentation on configuration options.
     * @see SentryClient for usage documentation.
     */
    class BrowserClient extends BaseClient {
      /**
       * Creates a new Browser SDK instance.
       *
       * @param options Configuration options for this SDK.
       */
      constructor(options) {
        const opts = {
          // We default this to true, as it is the safer scenario
          parentSpanIsAlwaysRootSpan: true,
          ...options,
        };
        const sdkSource = WINDOW$1.SENTRY_SDK_SOURCE || getSDKSource();
        applySdkMetadata(opts, 'browser', ['browser'], sdkSource);

        super(opts);

        if (opts.sendClientReports && WINDOW$1.document) {
          WINDOW$1.document.addEventListener('visibilitychange', () => {
            if (WINDOW$1.document.visibilityState === 'hidden') {
              this._flushOutcomes();
            }
          });
        }
      }

      /**
       * @inheritDoc
       */
      eventFromException(exception, hint) {
        return eventFromException(this._options.stackParser, exception, hint, this._options.attachStacktrace);
      }

      /**
       * @inheritDoc
       */
      eventFromMessage(
        message,
        level = 'info',
        hint,
      ) {
        return eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
      }

      /**
       * Sends user feedback to Sentry.
       *
       * @deprecated Use `captureFeedback` instead.
       */
      captureUserFeedback(feedback) {
        if (!this._isEnabled()) {
          logger.warn('SDK not enabled, will not capture user feedback.');
          return;
        }

        const envelope = createUserFeedbackEnvelope(feedback, {
          metadata: this.getSdkMetadata(),
          dsn: this.getDsn(),
          tunnel: this.getOptions().tunnel,
        });

        // sendEnvelope should not throw
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.sendEnvelope(envelope);
      }

      /**
       * @inheritDoc
       */
      _prepareEvent(event, hint, scope) {
        event.platform = event.platform || 'javascript';
        return super._prepareEvent(event, hint, scope);
      }

      /**
       * Sends client reports as an envelope.
       */
      _flushOutcomes() {
        const outcomes = this._clearOutcomes();

        if (outcomes.length === 0) {
          logger.log('No outcomes to send');
          return;
        }

        // This is really the only place where we want to check for a DSN and only send outcomes then
        if (!this._dsn) {
          logger.log('No dsn provided, will not send outcomes');
          return;
        }

        logger.log('Sending outcomes:', outcomes);

        const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));

        // sendEnvelope should not throw
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.sendEnvelope(envelope);
      }
    }

    const WINDOW = GLOBAL_OBJ

      ;

    const DEBOUNCE_DURATION = 1000;

    let debounceTimerID;
    let lastCapturedEventType;
    let lastCapturedEventTargetId;

    /**
     * Add an instrumentation handler for when a click or a keypress happens.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addClickKeypressInstrumentationHandler(handler) {
      const type = 'dom';
      addHandler(type, handler);
      maybeInstrument(type, instrumentDOM);
    }

    /** Exported for tests only. */
    function instrumentDOM() {
      if (!WINDOW.document) {
        return;
      }

      // Make it so that any click or keypress that is unhandled / bubbled up all the way to the document triggers our dom
      // handlers. (Normally we have only one, which captures a breadcrumb for each click or keypress.) Do this before
      // we instrument `addEventListener` so that we don't end up attaching this handler twice.
      const triggerDOMHandler = triggerHandlers.bind(null, 'dom');
      const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
      WINDOW.document.addEventListener('click', globalDOMEventHandler, false);
      WINDOW.document.addEventListener('keypress', globalDOMEventHandler, false);

      // After hooking into click and keypress events bubbled up to `document`, we also hook into user-handled
      // clicks & keypresses, by adding an event listener of our own to any element to which they add a listener. That
      // way, whenever one of their handlers is triggered, ours will be, too. (This is needed because their handler
      // could potentially prevent the event from bubbling up to our global listeners. This way, our handler are still
      // guaranteed to fire at least once.)
      ['EventTarget', 'Node'].forEach((target) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        const proto = (WINDOW)[target] && (WINDOW)[target].prototype;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
          return;
        }

        fill(proto, 'addEventListener', function (originalAddEventListener) {
          return function (

            type,
            listener,
            options,
          ) {
            if (type === 'click' || type == 'keypress') {
              try {
                const el = this;
                const handlers = (el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {});
                const handlerForType = (handlers[type] = handlers[type] || { refCount: 0 });

                if (!handlerForType.handler) {
                  const handler = makeDOMEventHandler(triggerDOMHandler);
                  handlerForType.handler = handler;
                  originalAddEventListener.call(this, type, handler, options);
                }

                handlerForType.refCount++;
              } catch (e) {
                // Accessing dom properties is always fragile.
                // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
              }
            }

            return originalAddEventListener.call(this, type, listener, options);
          };
        });

        fill(
          proto,
          'removeEventListener',
          function (originalRemoveEventListener) {
            return function (

              type,
              listener,
              options,
            ) {
              if (type === 'click' || type == 'keypress') {
                try {
                  const el = this;
                  const handlers = el.__sentry_instrumentation_handlers__ || {};
                  const handlerForType = handlers[type];

                  if (handlerForType) {
                    handlerForType.refCount--;
                    // If there are no longer any custom handlers of the current type on this element, we can remove ours, too.
                    if (handlerForType.refCount <= 0) {
                      originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                      handlerForType.handler = undefined;
                      delete handlers[type]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
                    }

                    // If there are no longer any custom handlers of any type on this element, cleanup everything.
                    if (Object.keys(handlers).length === 0) {
                      delete el.__sentry_instrumentation_handlers__;
                    }
                  }
                } catch (e) {
                  // Accessing dom properties is always fragile.
                  // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
                }
              }

              return originalRemoveEventListener.call(this, type, listener, options);
            };
          },
        );
      });
    }

    /**
     * Check whether the event is similar to the last captured one. For example, two click events on the same button.
     */
    function isSimilarToLastCapturedEvent(event) {
      // If both events have different type, then user definitely performed two separate actions. e.g. click + keypress.
      if (event.type !== lastCapturedEventType) {
        return false;
      }

      try {
        // If both events have the same type, it's still possible that actions were performed on different targets.
        // e.g. 2 clicks on different buttons.
        if (!event.target || (event.target)._sentryId !== lastCapturedEventTargetId) {
          return false;
        }
      } catch (e) {
        // just accessing `target` property can throw an exception in some rare circumstances
        // see: https://github.com/getsentry/sentry-javascript/issues/838
      }

      // If both events have the same type _and_ same `target` (an element which triggered an event, _not necessarily_
      // to which an event listener was attached), we treat them as the same action, as we want to capture
      // only one breadcrumb. e.g. multiple clicks on the same button, or typing inside a user input box.
      return true;
    }

    /**
     * Decide whether an event should be captured.
     * @param event event to be captured
     */
    function shouldSkipDOMEvent(eventType, target) {
      // We are only interested in filtering `keypress` events for now.
      if (eventType !== 'keypress') {
        return false;
      }

      if (!target || !target.tagName) {
        return true;
      }

      // Only consider keypress events on actual input elements. This will disregard keypresses targeting body
      // e.g.tabbing through elements, hotkeys, etc.
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return false;
      }

      return true;
    }

    /**
     * Wraps addEventListener to capture UI breadcrumbs
     */
    function makeDOMEventHandler(
      handler,
      globalListener = false,
    ) {
      return (event) => {
        // It's possible this handler might trigger multiple times for the same
        // event (e.g. event propagation through node ancestors).
        // Ignore if we've already captured that event.
        if (!event || event['_sentryCaptured']) {
          return;
        }

        const target = getEventTarget(event);

        // We always want to skip _some_ events.
        if (shouldSkipDOMEvent(event.type, target)) {
          return;
        }

        // Mark event as "seen"
        addNonEnumerableProperty(event, '_sentryCaptured', true);

        if (target && !target._sentryId) {
          // Add UUID to event target so we can identify if
          addNonEnumerableProperty(target, '_sentryId', uuid4());
        }

        const name = event.type === 'keypress' ? 'input' : event.type;

        // If there is no last captured event, it means that we can safely capture the new event and store it for future comparisons.
        // If there is a last captured event, see if the new event is different enough to treat it as a unique one.
        // If that's the case, emit the previous event and store locally the newly-captured DOM event.
        if (!isSimilarToLastCapturedEvent(event)) {
          const handlerData = { event, name, global: globalListener };
          handler(handlerData);
          lastCapturedEventType = event.type;
          lastCapturedEventTargetId = target ? target._sentryId : undefined;
        }

        // Start a new debounce timer that will prevent us from capturing multiple events that should be grouped together.
        clearTimeout(debounceTimerID);
        debounceTimerID = WINDOW.setTimeout(() => {
          lastCapturedEventTargetId = undefined;
          lastCapturedEventType = undefined;
        }, DEBOUNCE_DURATION);
      };
    }

    function getEventTarget(event) {
      try {
        return event.target;
      } catch (e) {
        // just accessing `target` property can throw an exception in some rare circumstances
        // see: https://github.com/getsentry/sentry-javascript/issues/838
        return null;
      }
    }

    let lastHref;

    /**
     * Add an instrumentation handler for when a fetch request happens.
     * The handler function is called once when the request starts and once when it ends,
     * which can be identified by checking if it has an `endTimestamp`.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addHistoryInstrumentationHandler(handler) {
      const type = 'history';
      addHandler(type, handler);
      maybeInstrument(type, instrumentHistory);
    }

    function instrumentHistory() {
      if (!supportsHistory()) {
        return;
      }

      const oldOnPopState = WINDOW.onpopstate;
      WINDOW.onpopstate = function (...args) {
        const to = WINDOW.location.href;
        // keep track of the current URL state, as we always receive only the updated state
        const from = lastHref;
        lastHref = to;
        const handlerData = { from, to };
        triggerHandlers('history', handlerData);
        if (oldOnPopState) {
          // Apparently this can throw in Firefox when incorrectly implemented plugin is installed.
          // https://github.com/getsentry/sentry-javascript/issues/3344
          // https://github.com/bugsnag/bugsnag-js/issues/469
          try {
            return oldOnPopState.apply(this, args);
          } catch (_oO) {
            // no-empty
          }
        }
      };

      function historyReplacementFunction(originalHistoryFunction) {
        return function (...args) {
          const url = args.length > 2 ? args[2] : undefined;
          if (url) {
            // coerce to string (this is what pushState does)
            const from = lastHref;
            const to = String(url);
            // keep track of the current URL state, as we always receive only the updated state
            lastHref = to;
            const handlerData = { from, to };
            triggerHandlers('history', handlerData);
          }
          return originalHistoryFunction.apply(this, args);
        };
      }

      fill(WINDOW.history, 'pushState', historyReplacementFunction);
      fill(WINDOW.history, 'replaceState', historyReplacementFunction);
    }

    /**
     * We generally want to use window.fetch / window.setTimeout.
     * However, in some cases this may be wrapped (e.g. by Zone.js for Angular),
     * so we try to get an unpatched version of this from a sandboxed iframe.
     */

    const cachedImplementations = {};

    /**
     * Get the native implementation of a browser function.
     *
     * This can be used to ensure we get an unwrapped version of a function, in cases where a wrapped function can lead to problems.
     *
     * The following methods can be retrieved:
     * - `setTimeout`: This can be wrapped by e.g. Angular, causing change detection to be triggered.
     * - `fetch`: This can be wrapped by e.g. ad-blockers, causing an infinite loop when a request is blocked.
     */
    function getNativeImplementation(
      name,
    ) {
      const cached = cachedImplementations[name];
      if (cached) {
        return cached;
      }

      let impl = WINDOW[name];

      // Fast path to avoid DOM I/O
      if (isNativeFunction(impl)) {
        return (cachedImplementations[name] = impl.bind(WINDOW));
      }

      const document = WINDOW.document;
      // eslint-disable-next-line deprecation/deprecation
      if (document && typeof document.createElement === 'function') {
        try {
          const sandbox = document.createElement('iframe');
          sandbox.hidden = true;
          document.head.appendChild(sandbox);
          const contentWindow = sandbox.contentWindow;
          if (contentWindow && contentWindow[name]) {
            impl = contentWindow[name];
          }
          document.head.removeChild(sandbox);
        } catch (e) {
          // Could not create sandbox iframe, just use window.xxx
          logger.warn(`Could not create sandbox iframe for ${name} check, bailing to window.${name}: `, e);
        }
      }

      // Sanity check: This _should_ not happen, but if it does, we just skip caching...
      // This can happen e.g. in tests where fetch may not be available in the env, or similar.
      if (!impl) {
        return impl;
      }

      return (cachedImplementations[name] = impl.bind(WINDOW));
    }

    /** Clear a cached implementation. */
    function clearCachedImplementation(name) {
      cachedImplementations[name] = undefined;
    }

    const SENTRY_XHR_DATA_KEY = '__sentry_xhr_v3__';

    /**
     * Add an instrumentation handler for when an XHR request happens.
     * The handler function is called once when the request starts and once when it ends,
     * which can be identified by checking if it has an `endTimestamp`.
     *
     * Use at your own risk, this might break without changelog notice, only used internally.
     * @hidden
     */
    function addXhrInstrumentationHandler(handler) {
      const type = 'xhr';
      addHandler(type, handler);
      maybeInstrument(type, instrumentXHR);
    }

    /** Exported only for tests. */
    function instrumentXHR() {
      if (!(WINDOW).XMLHttpRequest) {
        return;
      }

      const xhrproto = XMLHttpRequest.prototype;

      fill(xhrproto, 'open', function (originalOpen) {
        return function (...args) {
          const startTimestamp = timestampInSeconds() * 1000;

          // open() should always be called with two or more arguments
          // But to be on the safe side, we actually validate this and bail out if we don't have a method & url
          const method = isString(args[0]) ? args[0].toUpperCase() : undefined;
          const url = parseUrl(args[1]);

          if (!method || !url) {
            return originalOpen.apply(this, args);
          }

          this[SENTRY_XHR_DATA_KEY] = {
            method,
            url,
            request_headers: {},
          };

          // if Sentry key appears in URL, don't capture it as a request
          if (method === 'POST' && url.match(/sentry_key/)) {
            this.__sentry_own_request__ = true;
          }

          const onreadystatechangeHandler = () => {
            // For whatever reason, this is not the same instance here as from the outer method
            const xhrInfo = this[SENTRY_XHR_DATA_KEY];

            if (!xhrInfo) {
              return;
            }

            if (this.readyState === 4) {
              try {
                // touching statusCode in some platforms throws
                // an exception
                xhrInfo.status_code = this.status;
              } catch (e) {
                /* do nothing */
              }

              const handlerData = {
                endTimestamp: timestampInSeconds() * 1000,
                startTimestamp,
                xhr: this,
              };
              triggerHandlers('xhr', handlerData);
            }
          };

          if ('onreadystatechange' in this && typeof this.onreadystatechange === 'function') {
            fill(this, 'onreadystatechange', function (original) {
              return function (...readyStateArgs) {
                onreadystatechangeHandler();
                return original.apply(this, readyStateArgs);
              };
            });
          } else {
            this.addEventListener('readystatechange', onreadystatechangeHandler);
          }

          // Intercepting `setRequestHeader` to access the request headers of XHR instance.
          // This will only work for user/library defined headers, not for the default/browser-assigned headers.
          // Request cookies are also unavailable for XHR, as `Cookie` header can't be defined by `setRequestHeader`.
          fill(this, 'setRequestHeader', function (original) {
            return function (...setRequestHeaderArgs) {
              const [header, value] = setRequestHeaderArgs;

              const xhrInfo = this[SENTRY_XHR_DATA_KEY];

              if (xhrInfo && isString(header) && isString(value)) {
                xhrInfo.request_headers[header.toLowerCase()] = value;
              }

              return original.apply(this, setRequestHeaderArgs);
            };
          });

          return originalOpen.apply(this, args);
        };
      });

      fill(xhrproto, 'send', function (originalSend) {
        return function (...args) {
          const sentryXhrData = this[SENTRY_XHR_DATA_KEY];

          if (!sentryXhrData) {
            return originalSend.apply(this, args);
          }

          if (args[0] !== undefined) {
            sentryXhrData.body = args[0];
          }

          const handlerData = {
            startTimestamp: timestampInSeconds() * 1000,
            xhr: this,
          };
          triggerHandlers('xhr', handlerData);

          return originalSend.apply(this, args);
        };
      });
    }

    function parseUrl(url) {
      if (isString(url)) {
        return url;
      }

      try {
        // url can be a string or URL
        // but since URL is not available in IE11, we do not check for it,
        // but simply assume it is an URL and return `toString()` from it (which returns the full URL)
        // If that fails, we just return undefined
        return (url).toString();
      } catch (e2) { } // eslint-disable-line no-empty

      return undefined;
    }

    /**
     * Creates a Transport that uses the Fetch API to send events to Sentry.
     */
    function makeFetchTransport(
      options,
      nativeFetch = getNativeImplementation('fetch'),
    ) {
      let pendingBodySize = 0;
      let pendingCount = 0;

      function makeRequest(request) {
        const requestSize = request.body.length;
        pendingBodySize += requestSize;
        pendingCount++;

        const requestOptions = {
          body: request.body,
          method: 'POST',
          referrerPolicy: 'origin',
          headers: options.headers,
          // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
          // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
          // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
          // frequently sending events right before the user is switching pages (eg. whenfinishing navigation transactions).
          // Gotchas:
          // - `keepalive` isn't supported by Firefox
          // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
          //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
          //   We will therefore only activate the flag when we're below that limit.
          // There is also a limit of requests that can be open at the same time, so we also limit this to 15
          // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
          keepalive: pendingBodySize <= 60000 && pendingCount < 15,
          ...options.fetchOptions,
        };

        if (!nativeFetch) {
          clearCachedImplementation('fetch');
          return rejectedSyncPromise('No fetch implementation available');
        }

        try {
          return nativeFetch(options.url, requestOptions).then(response => {
            pendingBodySize -= requestSize;
            pendingCount--;
            return {
              statusCode: response.status,
              headers: {
                'x-sentry-rate-limits': response.headers.get('X-Sentry-Rate-Limits'),
                'retry-after': response.headers.get('Retry-After'),
              },
            };
          });
        } catch (e) {
          clearCachedImplementation('fetch');
          pendingBodySize -= requestSize;
          pendingCount--;
          return rejectedSyncPromise(e);
        }
      }

      return createTransport(options, makeRequest);
    }

    const OPERA10_PRIORITY = 10;
    const OPERA11_PRIORITY = 20;
    const CHROME_PRIORITY = 30;
    const WINJS_PRIORITY = 40;
    const GECKO_PRIORITY = 50;

    function createFrame(filename, func, lineno, colno) {
      const frame = {
        filename,
        function: func === '<anonymous>' ? UNKNOWN_FUNCTION : func,
        in_app: true, // All browser frames are considered in_app
      };

      if (lineno !== undefined) {
        frame.lineno = lineno;
      }

      if (colno !== undefined) {
        frame.colno = colno;
      }

      return frame;
    }

    // This regex matches frames that have no function name (ie. are at the top level of a module).
    // For example "at http://localhost:5000//script.js:1:126"
    // Frames _with_ function names usually look as follows: "at commitLayoutEffects (react-dom.development.js:23426:1)"
    const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;

    // This regex matches all the frames that have a function name.
    const chromeRegex =
      /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;

    const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;

    // Chromium based browsers: Chrome, Brave, new Opera, new Edge
    // We cannot call this variable `chrome` because it can conflict with global `chrome` variable in certain environments
    // See: https://github.com/getsentry/sentry-javascript/issues/6880
    const chromeStackParserFn = line => {
      // If the stack line has no function name, we need to parse it differently
      const noFnParts = chromeRegexNoFnName.exec(line);

      if (noFnParts) {
        const [, filename, line, col] = noFnParts;
        return createFrame(filename, UNKNOWN_FUNCTION, +line, +col);
      }

      const parts = chromeRegex.exec(line);

      if (parts) {
        const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

        if (isEval) {
          const subMatch = chromeEvalRegex.exec(parts[2]);

          if (subMatch) {
            // throw out eval line/column and use top-most line/column number
            parts[2] = subMatch[1]; // url
            parts[3] = subMatch[2]; // line
            parts[4] = subMatch[3]; // column
          }
        }

        // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
        // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
        const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);

        return createFrame(filename, func, parts[3] ? +parts[3] : undefined, parts[4] ? +parts[4] : undefined);
      }

      return;
    };

    const chromeStackLineParser = [CHROME_PRIORITY, chromeStackParserFn];

    // gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
    // generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
    // We need this specific case for now because we want no other regex to match.
    const geckoREgex =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
    const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

    const gecko = line => {
      const parts = geckoREgex.exec(line);

      if (parts) {
        const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval) {
          const subMatch = geckoEvalRegex.exec(parts[3]);

          if (subMatch) {
            // throw out eval line/column and use top-most line number
            parts[1] = parts[1] || 'eval';
            parts[3] = subMatch[1];
            parts[4] = subMatch[2];
            parts[5] = ''; // no column when eval
          }
        }

        let filename = parts[3];
        let func = parts[1] || UNKNOWN_FUNCTION;
        [func, filename] = extractSafariExtensionDetails(func, filename);

        return createFrame(filename, func, parts[4] ? +parts[4] : undefined, parts[5] ? +parts[5] : undefined);
      }

      return;
    };

    const geckoStackLineParser = [GECKO_PRIORITY, gecko];

    const winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

    const winjs = line => {
      const parts = winjsRegex.exec(line);

      return parts
        ? createFrame(parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : undefined)
        : undefined;
    };

    const winjsStackLineParser = [WINJS_PRIORITY, winjs];

    const opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;

    const opera10 = line => {
      const parts = opera10Regex.exec(line);
      return parts ? createFrame(parts[2], parts[3] || UNKNOWN_FUNCTION, +parts[1]) : undefined;
    };

    const opera10StackLineParser = [OPERA10_PRIORITY, opera10];

    const opera11Regex =
      / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;

    const opera11 = line => {
      const parts = opera11Regex.exec(line);
      return parts ? createFrame(parts[5], parts[3] || parts[4] || UNKNOWN_FUNCTION, +parts[1], +parts[2]) : undefined;
    };

    const opera11StackLineParser = [OPERA11_PRIORITY, opera11];

    const defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser];

    const defaultStackParser = createStackParser(...defaultStackLineParsers);

    /**
     * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
     * What it means, is that instead of format like:
     *
     * Error: wat
     *   at function@url:row:col
     *   at function@url:row:col
     *   at function@url:row:col
     *
     * it produces something like:
     *
     *   function@url:row:col
     *   function@url:row:col
     *   function@url:row:col
     *
     * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
     * This function is extracted so that we can use it in both places without duplicating the logic.
     * Unfortunately "just" changing RegExp is too complicated now and making it pass all tests
     * and fix this case seems like an impossible, or at least way too time-consuming task.
     */
    const extractSafariExtensionDetails = (func, filename) => {
      const isSafariExtension = func.indexOf('safari-extension') !== -1;
      const isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;

      return isSafariExtension || isSafariWebExtension
        ? [
          func.indexOf('@') !== -1 ? (func.split('@')[0]) : UNKNOWN_FUNCTION,
          isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`,
        ]
        : [func, filename];
    };

    /** maxStringLength gets capped to prevent 100 breadcrumbs exceeding 1MB event payload size */
    const MAX_ALLOWED_STRING_LENGTH = 1024;

    const INTEGRATION_NAME$3 = 'Breadcrumbs';

    const _breadcrumbsIntegration = ((options = {}) => {
      const _options = {
        console: true,
        dom: true,
        fetch: true,
        history: true,
        sentry: true,
        xhr: true,
        ...options,
      };

      return {
        name: INTEGRATION_NAME$3,
        setup(client) {
          if (_options.console) {
            addConsoleInstrumentationHandler(_getConsoleBreadcrumbHandler(client));
          }
          if (_options.dom) {
            addClickKeypressInstrumentationHandler(_getDomBreadcrumbHandler(client, _options.dom));
          }
          if (_options.xhr) {
            addXhrInstrumentationHandler(_getXhrBreadcrumbHandler(client));
          }
          if (_options.fetch) {
            addFetchInstrumentationHandler(_getFetchBreadcrumbHandler(client));
          }
          if (_options.history) {
            addHistoryInstrumentationHandler(_getHistoryBreadcrumbHandler(client));
          }
          if (_options.sentry) {
            client.on('beforeSendEvent', _getSentryBreadcrumbHandler(client));
          }
        },
      };
    });

    const breadcrumbsIntegration = defineIntegration(_breadcrumbsIntegration);

    /**
     * Adds a breadcrumb for Sentry events or transactions if this option is enabled.
     */
    function _getSentryBreadcrumbHandler(client) {
      return function addSentryBreadcrumb(event) {
        if (getClient() !== client) {
          return;
        }

        addBreadcrumb(
          {
            category: `sentry.${event.type === 'transaction' ? 'transaction' : 'event'}`,
            event_id: event.event_id,
            level: event.level,
            message: getEventDescription(event),
          },
          {
            event,
          },
        );
      };
    }

    /**
     * A HOC that creaes a function that creates breadcrumbs from DOM API calls.
     * This is a HOC so that we get access to dom options in the closure.
     */
    function _getDomBreadcrumbHandler(
      client,
      dom,
    ) {
      return function _innerDomBreadcrumb(handlerData) {
        if (getClient() !== client) {
          return;
        }

        let target;
        let componentName;
        let keyAttrs = typeof dom === 'object' ? dom.serializeAttribute : undefined;

        let maxStringLength =
          typeof dom === 'object' && typeof dom.maxStringLength === 'number' ? dom.maxStringLength : undefined;
        if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
          logger.warn(
            `\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`,
          );
          maxStringLength = MAX_ALLOWED_STRING_LENGTH;
        }

        if (typeof keyAttrs === 'string') {
          keyAttrs = [keyAttrs];
        }

        // Accessing event.target can throw (see getsentry/raven-js#838, #768)
        try {
          const event = handlerData.event;
          const element = _isEvent(event) ? event.target : event;

          target = htmlTreeAsString(element, { keyAttrs, maxStringLength });
          componentName = getComponentName(element);
        } catch (e) {
          target = '<unknown>';
        }

        if (target.length === 0) {
          return;
        }

        const breadcrumb = {
          category: `ui.${handlerData.name}`,
          message: target,
        };

        if (componentName) {
          breadcrumb.data = { 'ui.component_name': componentName };
        }

        addBreadcrumb(breadcrumb, {
          event: handlerData.event,
          name: handlerData.name,
          global: handlerData.global,
        });
      };
    }

    /**
     * Creates breadcrumbs from console API calls
     */
    function _getConsoleBreadcrumbHandler(client) {
      return function _consoleBreadcrumb(handlerData) {
        if (getClient() !== client) {
          return;
        }

        const breadcrumb = {
          category: 'console',
          data: {
            arguments: handlerData.args,
            logger: 'console',
          },
          level: severityLevelFromString(handlerData.level),
          message: safeJoin(handlerData.args, ' '),
        };

        if (handlerData.level === 'assert') {
          if (handlerData.args[0] === false) {
            breadcrumb.message = `Assertion failed: ${safeJoin(handlerData.args.slice(1), ' ') || 'console.assert'}`;
            breadcrumb.data.arguments = handlerData.args.slice(1);
          } else {
            // Don't capture a breadcrumb for passed assertions
            return;
          }
        }

        addBreadcrumb(breadcrumb, {
          input: handlerData.args,
          level: handlerData.level,
        });
      };
    }

    /**
     * Creates breadcrumbs from XHR API calls
     */
    function _getXhrBreadcrumbHandler(client) {
      return function _xhrBreadcrumb(handlerData) {
        if (getClient() !== client) {
          return;
        }

        const { startTimestamp, endTimestamp } = handlerData;

        const sentryXhrData = handlerData.xhr[SENTRY_XHR_DATA_KEY];

        // We only capture complete, non-sentry requests
        if (!startTimestamp || !endTimestamp || !sentryXhrData) {
          return;
        }

        const { method, url, status_code, body } = sentryXhrData;

        const data = {
          method,
          url,
          status_code,
        };

        const hint = {
          xhr: handlerData.xhr,
          input: body,
          startTimestamp,
          endTimestamp,
        };

        addBreadcrumb(
          {
            category: 'xhr',
            data,
            type: 'http',
          },
          hint,
        );
      };
    }

    /**
     * Creates breadcrumbs from fetch API calls
     */
    function _getFetchBreadcrumbHandler(client) {
      return function _fetchBreadcrumb(handlerData) {
        if (getClient() !== client) {
          return;
        }

        const { startTimestamp, endTimestamp } = handlerData;

        // We only capture complete fetch requests
        if (!endTimestamp) {
          return;
        }

        if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
          // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
          return;
        }

        if (handlerData.error) {
          const data = handlerData.fetchData;
          const hint = {
            data: handlerData.error,
            input: handlerData.args,
            startTimestamp,
            endTimestamp,
          };

          addBreadcrumb(
            {
              category: 'fetch',
              data,
              level: 'error',
              type: 'http',
            },
            hint,
          );
        } else {
          const response = handlerData.response;
          const data = {
            ...handlerData.fetchData,
            status_code: response && response.status,
          };
          const hint = {
            input: handlerData.args,
            response,
            startTimestamp,
            endTimestamp,
          };
          addBreadcrumb(
            {
              category: 'fetch',
              data,
              type: 'http',
            },
            hint,
          );
        }
      };
    }

    /**
     * Creates breadcrumbs from history API calls
     */
    function _getHistoryBreadcrumbHandler(client) {
      return function _historyBreadcrumb(handlerData) {
        if (getClient() !== client) {
          return;
        }

        let from = handlerData.from;
        let to = handlerData.to;
        const parsedLoc = parseUrl$1(WINDOW$1.location.href);
        let parsedFrom = from ? parseUrl$1(from) : undefined;
        const parsedTo = parseUrl$1(to);

        // Initial pushState doesn't provide `from` information
        if (!parsedFrom || !parsedFrom.path) {
          parsedFrom = parsedLoc;
        }

        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
          to = parsedTo.relative;
        }
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
          from = parsedFrom.relative;
        }

        addBreadcrumb({
          category: 'navigation',
          data: {
            from,
            to,
          },
        });
      };
    }

    function _isEvent(event) {
      return !!event && !!(event).target;
    }

    const DEFAULT_EVENT_TARGET = [
      'EventTarget',
      'Window',
      'Node',
      'ApplicationCache',
      'AudioTrackList',
      'BroadcastChannel',
      'ChannelMergerNode',
      'CryptoOperation',
      'EventSource',
      'FileReader',
      'HTMLUnknownElement',
      'IDBDatabase',
      'IDBRequest',
      'IDBTransaction',
      'KeyOperation',
      'MediaController',
      'MessagePort',
      'ModalWindow',
      'Notification',
      'SVGElementInstance',
      'Screen',
      'SharedWorker',
      'TextTrack',
      'TextTrackCue',
      'TextTrackList',
      'WebSocket',
      'WebSocketWorker',
      'Worker',
      'XMLHttpRequest',
      'XMLHttpRequestEventTarget',
      'XMLHttpRequestUpload',
    ];

    const INTEGRATION_NAME$2 = 'BrowserApiErrors';

    const _browserApiErrorsIntegration = ((options = {}) => {
      const _options = {
        XMLHttpRequest: true,
        eventTarget: true,
        requestAnimationFrame: true,
        setInterval: true,
        setTimeout: true,
        ...options,
      };

      return {
        name: INTEGRATION_NAME$2,
        // TODO: This currently only works for the first client this is setup
        // We may want to adjust this to check for client etc.
        setupOnce() {
          if (_options.setTimeout) {
            fill(WINDOW$1, 'setTimeout', _wrapTimeFunction);
          }

          if (_options.setInterval) {
            fill(WINDOW$1, 'setInterval', _wrapTimeFunction);
          }

          if (_options.requestAnimationFrame) {
            fill(WINDOW$1, 'requestAnimationFrame', _wrapRAF);
          }

          if (_options.XMLHttpRequest && 'XMLHttpRequest' in WINDOW$1) {
            fill(XMLHttpRequest.prototype, 'send', _wrapXHR);
          }

          const eventTargetOption = _options.eventTarget;
          if (eventTargetOption) {
            const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
            eventTarget.forEach(_wrapEventTarget);
          }
        },
      };
    });

    /**
     * Wrap timer functions and event targets to catch errors and provide better meta data.
     */
    const browserApiErrorsIntegration = defineIntegration(_browserApiErrorsIntegration);

    function _wrapTimeFunction(original) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function (...args) {
        const originalCallback = args[0];
        args[0] = wrap(originalCallback, {
          mechanism: {
            data: { function: getFunctionName(original) },
            handled: false,
            type: 'instrument',
          },
        });
        return original.apply(this, args);
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _wrapRAF(original) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function (callback) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return original.apply(this, [
          wrap(callback, {
            mechanism: {
              data: {
                function: 'requestAnimationFrame',
                handler: getFunctionName(original),
              },
              handled: false,
              type: 'instrument',
            },
          }),
        ]);
      };
    }

    function _wrapXHR(originalSend) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function (...args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const xhr = this;
        const xmlHttpRequestProps = ['onload', 'onerror', 'onprogress', 'onreadystatechange'];

        xmlHttpRequestProps.forEach(prop => {
          if (prop in xhr && typeof xhr[prop] === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fill(xhr, prop, function (original) {
              const wrapOptions = {
                mechanism: {
                  data: {
                    function: prop,
                    handler: getFunctionName(original),
                  },
                  handled: false,
                  type: 'instrument',
                },
              };

              // If Instrument integration has been called before BrowserApiErrors, get the name of original function
              const originalFunction = getOriginalFunction(original);
              if (originalFunction) {
                wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
              }

              // Otherwise wrap directly
              return wrap(original, wrapOptions);
            });
          }
        });

        return originalSend.apply(this, args);
      };
    }

    function _wrapEventTarget(target) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const globalObject = WINDOW$1;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const proto = globalObject[target] && globalObject[target].prototype;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
      if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
        return;
      }

      fill(proto, 'addEventListener', function (original,) {
        return function (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any

          eventName,
          fn,
          options,
        ) {
          try {
            if (typeof fn.handleEvent === 'function') {
              // ESlint disable explanation:
              //  First, it is generally safe to call `wrap` with an unbound function. Furthermore, using `.bind()` would
              //  introduce a bug here, because bind returns a new function that doesn't have our
              //  flags(like __sentry_original__) attached. `wrap` checks for those flags to avoid unnecessary wrapping.
              //  Without those flags, every call to addEventListener wraps the function again, causing a memory leak.
              // eslint-disable-next-line @typescript-eslint/unbound-method
              fn.handleEvent = wrap(fn.handleEvent, {
                mechanism: {
                  data: {
                    function: 'handleEvent',
                    handler: getFunctionName(fn),
                    target,
                  },
                  handled: false,
                  type: 'instrument',
                },
              });
            }
          } catch (err) {
            // can sometimes get 'Permission denied to access property "handle Event'
          }

          return original.apply(this, [
            eventName,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            wrap(fn, {
              mechanism: {
                data: {
                  function: 'addEventListener',
                  handler: getFunctionName(fn),
                  target,
                },
                handled: false,
                type: 'instrument',
              },
            }),
            options,
          ]);
        };
      });

      fill(
        proto,
        'removeEventListener',
        function (
          originalRemoveEventListener,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) {
          return function (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any

            eventName,
            fn,
            options,
          ) {
            /**
             * There are 2 possible scenarios here:
             *
             * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
             * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
             * as a pass-through, and call original `removeEventListener` with it.
             *
             * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
             * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
             * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
             * in order for us to make a distinction between wrapped/non-wrapped functions possible.
             * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
             *
             * When someone adds a handler prior to initialization, and then do it again, but after,
             * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
             * to get rid of the initial handler and it'd stick there forever.
             */
            const wrappedEventHandler = fn;
            try {
              const originalEventHandler = wrappedEventHandler && wrappedEventHandler.__sentry_wrapped__;
              if (originalEventHandler) {
                originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
              }
            } catch (e) {
              // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
            }
            return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
          };
        },
      );
    }

    const INTEGRATION_NAME$1 = 'GlobalHandlers';

    const _globalHandlersIntegration = ((options = {}) => {
      const _options = {
        onerror: true,
        onunhandledrejection: true,
        ...options,
      };

      return {
        name: INTEGRATION_NAME$1,
        setupOnce() {
          Error.stackTraceLimit = 50;
        },
        setup(client) {
          if (_options.onerror) {
            _installGlobalOnErrorHandler(client);
            globalHandlerLog('onerror');
          }
          if (_options.onunhandledrejection) {
            _installGlobalOnUnhandledRejectionHandler(client);
            globalHandlerLog('onunhandledrejection');
          }
        },
      };
    });

    const globalHandlersIntegration = defineIntegration(_globalHandlersIntegration);

    function _installGlobalOnErrorHandler(client) {
      addGlobalErrorInstrumentationHandler(data => {
        const { stackParser, attachStacktrace } = getOptions();

        if (getClient() !== client || shouldIgnoreOnError()) {
          return;
        }

        const { msg, url, line, column, error } = data;

        const event = _enhanceEventWithInitialFrame(
          eventFromUnknownInput(stackParser, error || msg, undefined, attachStacktrace, false),
          url,
          line,
          column,
        );

        event.level = 'error';

        captureEvent(event, {
          originalException: error,
          mechanism: {
            handled: false,
            type: 'onerror',
          },
        });
      });
    }

    function _installGlobalOnUnhandledRejectionHandler(client) {
      addGlobalUnhandledRejectionInstrumentationHandler(e => {
        const { stackParser, attachStacktrace } = getOptions();

        if (getClient() !== client || shouldIgnoreOnError()) {
          return;
        }

        const error = _getUnhandledRejectionError(e);

        const event = isPrimitive(error)
          ? _eventFromRejectionWithPrimitive(error)
          : eventFromUnknownInput(stackParser, error, undefined, attachStacktrace, true);

        event.level = 'error';

        captureEvent(event, {
          originalException: error,
          mechanism: {
            handled: false,
            type: 'onunhandledrejection',
          },
        });
      });
    }

    function _getUnhandledRejectionError(error) {
      if (isPrimitive(error)) {
        return error;
      }

      // dig the object of the rejection out of known event types
      try {

        // PromiseRejectionEvents store the object of the rejection under 'reason'
        // see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
        if ('reason' in (error)) {
          return (error).reason;
        }

        // something, somewhere, (likely a browser extension) effectively casts PromiseRejectionEvents
        // to CustomEvents, moving the `promise` and `reason` attributes of the PRE into
        // the CustomEvent's `detail` attribute, since they're not part of CustomEvent's spec
        // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent and
        // https://github.com/getsentry/sentry-javascript/issues/2380
        if ('detail' in (error) && 'reason' in (error).detail) {
          return (error).detail.reason;
        }
      } catch (e2) { } // eslint-disable-line no-empty

      return error;
    }

    /**
     * Create an event from a promise rejection where the `reason` is a primitive.
     *
     * @param reason: The `reason` property of the promise rejection
     * @returns An Event object with an appropriate `exception` value
     */
    function _eventFromRejectionWithPrimitive(reason) {
      return {
        exception: {
          values: [
            {
              type: 'UnhandledRejection',
              // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
              value: `Non-Error promise rejection captured with value: ${String(reason)}`,
            },
          ],
        },
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _enhanceEventWithInitialFrame(event, url, line, column) {
      // event.exception
      const e = (event.exception = event.exception || {});
      // event.exception.values
      const ev = (e.values = e.values || []);
      // event.exception.values[0]
      const ev0 = (ev[0] = ev[0] || {});
      // event.exception.values[0].stacktrace
      const ev0s = (ev0.stacktrace = ev0.stacktrace || {});
      // event.exception.values[0].stacktrace.frames
      const ev0sf = (ev0s.frames = ev0s.frames || []);

      const colno = isNaN(parseInt(column, 10)) ? undefined : column;
      const lineno = isNaN(parseInt(line, 10)) ? undefined : line;
      const filename = isString(url) && url.length > 0 ? url : getLocationHref();

      // event.exception.values[0].stacktrace.frames
      if (ev0sf.length === 0) {
        ev0sf.push({
          colno,
          filename,
          function: UNKNOWN_FUNCTION,
          in_app: true,
          lineno,
        });
      }

      return event;
    }

    function globalHandlerLog(type) {
      logger.log(`Global Handler attached: ${type}`);
    }

    function getOptions() {
      const client = getClient();
      const options = (client && client.getOptions()) || {
        stackParser: () => [],
        attachStacktrace: false,
      };
      return options;
    }

    /**
     * Collects information about HTTP request headers and
     * attaches them to the event.
     */
    const httpContextIntegration = defineIntegration(() => {
      return {
        name: 'HttpContext',
        preprocessEvent(event) {
          // if none of the information we want exists, don't bother
          if (!WINDOW$1.navigator && !WINDOW$1.location && !WINDOW$1.document) {
            return;
          }

          // grab as much info as exists and add it to the event
          const url = (event.request && event.request.url) || (WINDOW$1.location && WINDOW$1.location.href);
          const { referrer } = WINDOW$1.document || {};
          const { userAgent } = WINDOW$1.navigator || {};

          const headers = {
            ...(event.request && event.request.headers),
            ...(referrer && { Referer: referrer }),
            ...(userAgent && { 'User-Agent': userAgent }),
          };
          const request = { ...event.request, ...(url && { url }), headers };

          event.request = request;
        },
      };
    });

    const DEFAULT_KEY = 'cause';
    const DEFAULT_LIMIT = 5;

    const INTEGRATION_NAME = 'LinkedErrors';

    const _linkedErrorsIntegration = ((options = {}) => {
      const limit = options.limit || DEFAULT_LIMIT;
      const key = options.key || DEFAULT_KEY;

      return {
        name: INTEGRATION_NAME,
        preprocessEvent(event, hint, client) {
          const options = client.getOptions();

          applyAggregateErrorsToEvent(
            // This differs from the LinkedErrors integration in core by using a different exceptionFromError function
            exceptionFromError,
            options.stackParser,
            options.maxValueLength,
            key,
            limit,
            event,
            hint,
          );
        },
      };
    });

    /**
     * Aggregrate linked errors in an event.
     */
    const linkedErrorsIntegration = defineIntegration(_linkedErrorsIntegration);

    /** Get the default integrations for the browser SDK. */
    function getDefaultIntegrations(_options) {
      /**
       * Note: Please make sure this stays in sync with Angular SDK, which re-exports
       * `getDefaultIntegrations` but with an adjusted set of integrations.
       */
      return [
        inboundFiltersIntegration(),
        functionToStringIntegration(),
        browserApiErrorsIntegration(),
        breadcrumbsIntegration(),
        globalHandlersIntegration(),
        linkedErrorsIntegration(),
        dedupeIntegration(),
        httpContextIntegration(),
      ];
    }

    function applyDefaultOptions(optionsArg = {}) {
      const defaultOptions = {
        defaultIntegrations: getDefaultIntegrations(),
        release:
          typeof __SENTRY_RELEASE__ === 'string' // This allows build tooling to find-and-replace __SENTRY_RELEASE__ to inject a release value
            ? __SENTRY_RELEASE__
            : WINDOW$1.SENTRY_RELEASE && WINDOW$1.SENTRY_RELEASE.id // This supports the variable that sentry-webpack-plugin injects
              ? WINDOW$1.SENTRY_RELEASE.id
              : undefined,
        autoSessionTracking: true,
        sendClientReports: true,
      };

      return { ...defaultOptions, ...optionsArg };
    }

    function shouldShowBrowserExtensionError() {
      const windowWithMaybeExtension = WINDOW$1;

      const extensionKey = windowWithMaybeExtension.chrome ? 'chrome' : 'browser';
      const extensionObject = windowWithMaybeExtension[extensionKey];

      const runtimeId = extensionObject && extensionObject.runtime && extensionObject.runtime.id;
      const href = (WINDOW$1.location && WINDOW$1.location.href) || '';

      const extensionProtocols = ['chrome-extension:', 'moz-extension:', 'ms-browser-extension:'];

      // Running the SDK in a dedicated extension page and calling Sentry.init is fine; no risk of data leakage
      const isDedicatedExtensionPage =
        !!runtimeId && WINDOW$1 === WINDOW$1.top && extensionProtocols.some(protocol => href.startsWith(`${protocol}//`));

      // Running the SDK in NW.js, which appears like a browser extension but isn't, is also fine
      // see: https://github.com/getsentry/sentry-javascript/issues/12668
      const isNWjs = typeof windowWithMaybeExtension.nw !== 'undefined';

      return !!runtimeId && !isDedicatedExtensionPage && !isNWjs;
    }

    /**
     * A magic string that build tooling can leverage in order to inject a release value into the SDK.
     */

    /**
     * The Sentry Browser SDK Client.
     *
     * To use this SDK, call the {@link init} function as early as possible when
     * loading the web page. To set context information or send manual events, use
     * the provided methods.
     *
     * @example
     *
     * ```
     *
     * import { init } from '@sentry/browser';
     *
     * init({
     *   dsn: '__DSN__',
     *   // ...
     * });
     * ```
     *
     * @example
     * ```
     *
     * import { addBreadcrumb } from '@sentry/browser';
     * addBreadcrumb({
     *   message: 'My Breadcrumb',
     *   // ...
     * });
     * ```
     *
     * @example
     *
     * ```
     *
     * import * as Sentry from '@sentry/browser';
     * Sentry.captureMessage('Hello, world!');
     * Sentry.captureException(new Error('Good bye'));
     * Sentry.captureEvent({
     *   message: 'Manual',
     *   stacktrace: [
     *     // ...
     *   ],
     * });
     * ```
     *
     * @see {@link BrowserOptions} for documentation on configuration options.
     */
    function init(browserOptions = {}) {
      const options = applyDefaultOptions(browserOptions);

      if (shouldShowBrowserExtensionError()) {
        consoleSandbox(() => {
          // eslint-disable-next-line no-console
          console.error(
            '[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/',
          );
        });
        return;
      }

      {
        if (!supportsFetch()) {
          logger.warn(
            'No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill.',
          );
        }
      }
      const clientOptions = {
        ...options,
        stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
        integrations: getIntegrationsToSetup(options),
        transport: options.transport || makeFetchTransport,
      };

      const client = initAndBind(BrowserClient, clientOptions);

      if (options.autoSessionTracking) {
        startSessionTracking();
      }

      return client;
    }

    /**
     * All properties the report dialog supports
     */

    /**
     * Present the user with a report dialog.
     *
     * @param options Everything is optional, we try to fetch all info need from the global scope.
     */
    function showReportDialog(options = {}) {
      // doesn't work without a document (React Native)
      if (!WINDOW$1.document) {
        logger.error('Global document not defined in showReportDialog call');
        return;
      }

      const scope = getCurrentScope();
      const client = scope.getClient();
      const dsn = client && client.getDsn();

      if (!dsn) {
        logger.error('DSN not configured for showReportDialog call');
        return;
      }

      if (scope) {
        options.user = {
          ...scope.getUser(),
          ...options.user,
        };
      }

      if (!options.eventId) {
        const eventId = lastEventId();
        if (eventId) {
          options.eventId = eventId;
        }
      }

      const script = WINDOW$1.document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = getReportDialogEndpoint(dsn, options);

      if (options.onLoad) {
        script.onload = options.onLoad;
      }

      const { onClose } = options;
      if (onClose) {
        const reportDialogClosedMessageHandler = (event) => {
          if (event.data === '__sentry_reportdialog_closed__') {
            try {
              onClose();
            } finally {
              WINDOW$1.removeEventListener('message', reportDialogClosedMessageHandler);
            }
          }
        };
        WINDOW$1.addEventListener('message', reportDialogClosedMessageHandler);
      }

      const injectionPoint = WINDOW$1.document.head || WINDOW$1.document.body;
      if (injectionPoint) {
        injectionPoint.appendChild(script);
      } else {
        logger.error('Not injecting report dialog. No injection point found in HTML');
      }
    }

    /**
     * This function is here to be API compatible with the loader.
     * @hidden
     */
    function forceLoad() {
      // Noop
    }

    /**
     * This function is here to be API compatible with the loader.
     * @hidden
     */
    function onLoad(callback) {
      callback();
    }

    /**
     * Enable automatic Session Tracking for the initial page load.
     */
    function startSessionTracking() {
      if (typeof WINDOW$1.document === 'undefined') {
        logger.warn('Session tracking in non-browser environment with @sentry/browser is not supported.');
        return;
      }

      // The session duration for browser sessions does not track a meaningful
      // concept that can be used as a metric.
      // Automatically captured sessions are akin to page views, and thus we
      // discard their duration.
      startSession({ ignoreDuration: true });
      captureSession();

      // We want to create a session for every navigation as well
      addHistoryInstrumentationHandler(({ from, to }) => {
        // Don't create an additional session for the initial route or if the location did not change
        if (from !== undefined && from !== to) {
          startSession({ ignoreDuration: true });
          captureSession();
        }
      });
    }

    /**
     * Captures user feedback and sends it to Sentry.
     *
     * @deprecated Use `captureFeedback` instead.
     */
    function captureUserFeedback(feedback) {
      const client = getClient();
      if (client) {
        // eslint-disable-next-line deprecation/deprecation
        client.captureUserFeedback(feedback);
      }
    }

    // This is a map of integration function method to bundle file name.
    const LazyLoadableIntegrations = {
      replayIntegration: 'replay',
      replayCanvasIntegration: 'replay-canvas',
      feedbackIntegration: 'feedback',
      feedbackModalIntegration: 'feedback-modal',
      feedbackScreenshotIntegration: 'feedback-screenshot',
      captureConsoleIntegration: 'captureconsole',
      contextLinesIntegration: 'contextlines',
      linkedErrorsIntegration: 'linkederrors',
      debugIntegration: 'debug',
      dedupeIntegration: 'dedupe',
      extraErrorDataIntegration: 'extraerrordata',
      httpClientIntegration: 'httpclient',
      reportingObserverIntegration: 'reportingobserver',
      rewriteFramesIntegration: 'rewriteframes',
      sessionTimingIntegration: 'sessiontiming',
      browserProfilingIntegration: 'browserprofiling',
    };

    const WindowWithMaybeIntegration = WINDOW$1

      ;

    /**
     * Lazy load an integration from the CDN.
     * Rejects if the integration cannot be loaded.
     */
    async function lazyLoadIntegration(name) {
      const bundle = LazyLoadableIntegrations[name];

      // `window.Sentry` is only set when using a CDN bundle, but this method can also be used via the NPM package
      const sentryOnWindow = (WindowWithMaybeIntegration.Sentry = WindowWithMaybeIntegration.Sentry || {});

      if (!bundle) {
        throw new Error(`Cannot lazy load integration: ${name}`);
      }

      // Bail if the integration already exists
      const existing = sentryOnWindow[name];
      if (typeof existing === 'function') {
        return existing;
      }

      const url = getScriptURL(bundle);
      const script = WINDOW$1.document.createElement('script');
      script.src = url;
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'origin';

      const waitForLoad = new Promise((resolve, reject) => {
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', reject);
      });

      WINDOW$1.document.body.appendChild(script);

      try {
        await waitForLoad;
      } catch (e) {
        throw new Error(`Error when loading integration: ${name}`);
      }

      const integrationFn = sentryOnWindow[name];

      if (typeof integrationFn !== 'function') {
        throw new Error(`Could not load integration: ${name}`);
      }

      return integrationFn;
    }

    function getScriptURL(bundle) {
      const client = getClient();
      const options = client && client.getOptions();
      const baseURL = (options && options.cdnBaseUrl) || 'https://browser.sentry-cdn.com';

      return new URL(`/${SDK_VERSION}/${bundle}.min.js`, baseURL).toString();
    }

    exports.BrowserClient = BrowserClient;
    exports.SDK_VERSION = SDK_VERSION;
    exports.SEMANTIC_ATTRIBUTE_SENTRY_OP = SEMANTIC_ATTRIBUTE_SENTRY_OP;
    exports.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
    exports.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
    exports.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
    exports.Scope = Scope;
    exports.WINDOW = WINDOW$1;
    exports.addBreadcrumb = addBreadcrumb;
    exports.addEventProcessor = addEventProcessor;
    exports.addIntegration = addIntegration;
    exports.breadcrumbsIntegration = breadcrumbsIntegration;
    exports.browserApiErrorsIntegration = browserApiErrorsIntegration;
    exports.browserTracingIntegration = browserTracingIntegrationShim;
    exports.captureEvent = captureEvent;
    exports.captureException = captureException;
    exports.captureMessage = captureMessage;
    exports.captureSession = captureSession;
    exports.captureUserFeedback = captureUserFeedback;
    exports.chromeStackLineParser = chromeStackLineParser;
    exports.close = close;
    exports.continueTrace = continueTrace;
    exports.createTransport = createTransport;
    exports.createUserFeedbackEnvelope = createUserFeedbackEnvelope;
    exports.dedupeIntegration = dedupeIntegration;
    exports.defaultStackLineParsers = defaultStackLineParsers;
    exports.defaultStackParser = defaultStackParser;
    exports.endSession = endSession;
    exports.eventFromException = eventFromException;
    exports.eventFromMessage = eventFromMessage;
    exports.exceptionFromError = exceptionFromError;
    exports.feedbackAsyncIntegration = feedbackIntegrationShim;
    exports.feedbackIntegration = feedbackIntegrationShim;
    exports.flush = flush;
    exports.forceLoad = forceLoad;
    exports.functionToStringIntegration = functionToStringIntegration;
    exports.geckoStackLineParser = geckoStackLineParser;
    exports.getClient = getClient;
    exports.getCurrentHub = getCurrentHub;
    exports.getCurrentScope = getCurrentScope;
    exports.getDefaultIntegrations = getDefaultIntegrations;
    exports.getGlobalScope = getGlobalScope;
    exports.getIsolationScope = getIsolationScope;
    exports.globalHandlersIntegration = globalHandlersIntegration;
    exports.httpContextIntegration = httpContextIntegration;
    exports.inboundFiltersIntegration = inboundFiltersIntegration;
    exports.init = init;
    exports.isInitialized = isInitialized;
    exports.lastEventId = lastEventId;
    exports.lazyLoadIntegration = lazyLoadIntegration;
    exports.linkedErrorsIntegration = linkedErrorsIntegration;
    exports.makeFetchTransport = makeFetchTransport;
    exports.metrics = metricsShim;
    exports.onLoad = onLoad;
    exports.opera10StackLineParser = opera10StackLineParser;
    exports.opera11StackLineParser = opera11StackLineParser;
    exports.parameterize = parameterize;
    exports.replayIntegration = replayIntegrationShim;
    exports.setContext = setContext;
    exports.setCurrentClient = setCurrentClient;
    exports.setExtra = setExtra;
    exports.setExtras = setExtras;
    exports.setTag = setTag;
    exports.setTags = setTags;
    exports.setUser = setUser;
    exports.showReportDialog = showReportDialog;
    exports.spanToBaggageHeader = spanToBaggageHeader;
    exports.spanToJSON = spanToJSON;
    exports.spanToTraceHeader = spanToTraceHeader;
    exports.startSession = startSession;
    exports.winjsStackLineParser = winjsStackLineParser;
    exports.withIsolationScope = withIsolationScope;
    exports.withScope = withScope;

    return exports;

  })({});
//# sourceMappingURL=bundle.js.map
//# debugId=8a635afe-71b1-5716-a16c-aa9b9d588818

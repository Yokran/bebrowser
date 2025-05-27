(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.expressionsMacro = factory());
})(this, (function () { 'use strict';

    let EventEmitter$1 = class EventEmitter {
        constructor() {
            this.__ee_listeners = {};
        }
        emit(name, ...args) {
            (this.__ee_listeners[name] || []).forEach(l => l(...args));
        }
        hasListener(name) {
            return (this.__ee_listeners[name] || []).length > 0;
        }
        off(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            let index = listeners.indexOf(listener);
            while (index >= 0) {
                listeners.splice(index, 1);
                index = listeners.indexOf(listener);
            }
            return this;
        }
        on(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            listeners.push(listener);
            return this;
        }
        once(name, listener) {
            const l2 = (...args) => {
                this.off(name, l2);
                listener(...args);
            };
            this.on(name, l2);
            return this;
        }
        reset() {
            this.__ee_listeners = {};
        }
        waitForEvent(name, ...selectors) {
            return new Promise(resolve => {
                const l2 = (...args) => {
                    for (let i = 0, length = selectors.length; i < length; i += 1) {
                        if (selectors[i] !== args[i]) {
                            return;
                        }
                    }
                    resolve(args[0]);
                };
                this.on(name, l2);
            });
        }
    };

    var C = {
        STRING: "string",
        SECRET: "secret",
        INT: "int",
        FLOAT: "float",
        BOOLEAN: "boolean",
        "JSON": "json",
        ARRAY: "array",
        FUNCTION: "function",
        ITERABLE: "iterable",
        VOID: 'void',
        BLOCK: 'BLOCK',
        VARIABLE_DECLARATION: 'VARIABLE_DECLARATION',
        COND: 'COND',
        WHILE: 'WHILE',
        FOR: 'FOR',
        ASSIGNMENT: 'ASSIGNMENT',
        VARIABLE_REFERENCE: 'VARIABLE_REFERENCE',
        ERROR: 'ERROR',
        CLAUSE: 'CLAUSE',
        FUNCTION_CALL: 'FUNCTION_CALL',
        FUNCTION_DEFINITION: 'FUNCTION_DEFINITION',
        FUNCTION_PARAMETER: 'FUNCTION_PARAMETER',
        LITERAL: 'LITERAL',
        STRUCT: 'STRUCT',
        ENUM: 'ENUM',
        MAP_NODE: 'MAP_NODE',
        ARRAY_NODE: 'ARRAY_NODE',
        RETURN: "RETURN",
        OPERATOR: "OPERATOR",
        OP_AND: 'and',
        OP_OR: 'or',
        OP_NOT: 'not',
        DUPLICATE_DECLARATION: 'duplicate_declaration',
        MISSING_ARGUMENT: 'missing_argument',
        INVALID_SYNTAX: 'invalid_syntax',
        TYPE_MISMATCH: 'type_mismatch',
        UNDEFINED_TYPE: 'undefined_type',
        INVALID_VARIABLE_NAME: 'invalid_variable_name',
        INVALID_VARIABLE_REFERENCE: 'invalid_variable_reference',
        INVALID_VARIABLE_TYPE: 'invalid_variable_type',
        INVALID_FIELD_NAME: 'invalid_field_name',
        CHANGE: 'change',
        CONTEXT: '_context_',
        UNTITLED: '_untitled_',
        VALUE: 'VALUE',
        NULL: "null",
        UNDEFINED: "undefined",
        UNKNOWN: "unknown",
    };
    const HOOK_EVENT = {
        BEFORE_RUN: 'beforeRun',
        BEFORE_EVAL: 'beforeEval',
        AFTER_EVAL: 'afterEval',
        AFTER_RUN: 'afterRun'
    };

    function isValidFunctionDefinitionSyntax(expr) {
        if (!Array.isArray(expr))
            return false;
        if (expr.length !== 4)
            return false;
        if (expr[0] !== 'func')
            return false;
        if (typeof expr[1] !== 'string')
            return false;
        if (!Array.isArray(expr[2]))
            return false;
        for (let param of expr[2]) {
            if (!Array.isArray(param))
                return false;
            if (param.length !== 2)
                return false;
            if (typeof param[0] !== 'string')
                return false;
            if (typeof param[1] !== 'string')
                return false;
        }
        return true;
    }
    function isValidLambdaSyntax(expr) {
        if (!Array.isArray(expr))
            return false;
        if (expr.length !== 3)
            return false;
        if (expr[0] !== 'lambda')
            return false;
        if (!Array.isArray(expr[1]))
            return false;
        for (let param of expr[1]) {
            if (!Array.isArray(param))
                return false;
            if (param.length !== 2)
                return false;
            if (typeof param[0] !== 'string')
                return false;
            if (typeof param[1] !== 'string')
                return false;
        }
        return true;
    }
    function isValidVariableDeclarationSyntax(expr) {
        return Array.isArray(expr) && expr.length >= 3 && expr[0] === 'var' && typeof expr[1] === 'string' && typeof expr[2] === 'string';
    }
    function isDeclaration(node) {
        return isVariableDeclaration(node) || isFunctionDefinition(node);
    }
    function isFunctionDefinition(node) {
        return node instanceof FunctionDefinition;
    }
    function isVariableDeclaration(node) {
        return node instanceof VariableDeclaration;
    }
    function getReferences(node) {
        let parent = node.parent;
        let index = parent.nodes.indexOf(node);
        let refs = [];
        for (let i = index + 1; i < parent.nodes.length; i++) {
            refs.push(...getReferencesInExpr(parent.nodes[i], node));
        }
        return refs;
    }
    function getReferencesInExpr(node, ref) {
        var _a;
        let refs = [];
        if (node instanceof VariableReference && node._ref === ref.name && ((_a = node.scope.get(node._ref)) === null || _a === void 0 ? void 0 : _a.ref) === ref) {
            refs.push(node);
        }
        for (let child of node.children) {
            refs.push(...getReferencesInExpr(child, ref));
        }
        return refs;
    }
    function getParamReferences(param, root) {
        return getReferencesInExpr(root.expression, param);
    }
    class ValidationScope extends EventEmitter$1 {
        constructor(parent) {
            super();
            this.basicTypes = [C.STRING, C.SECRET, C.BOOLEAN, C.JSON, C.ARRAY, C.INT, C.FLOAT];
            this.entries = new Map();
            this.parent = parent;
        }
        clearVar() {
            for (let key of this.entries.keys()) {
                if (this.entries.get(key).type === C.VALUE) {
                    this.entries.delete(key);
                }
            }
        }
        has(name) {
            var _a;
            return this.entries.has(name) || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.has(name)) || false;
        }
        hasBasicType(name) {
            return this.basicTypes.includes(name);
        }
        hasEnum(name) {
            return this.has(name) && this.get(name).type === C.ENUM;
        }
        hasFunc(name) {
            return this.has(name) && this.get(name).type === C.FUNCTION;
        }
        hasStruct(name) {
            return this.has(name) && this.get(name).type === C.STRUCT;
        }
        hasType(name) {
            while (isArrayType(name)) {
                name = getArrayElementType(name);
            }
            return this.hasEnum(name) || this.hasStruct(name) || this.hasBasicType(name);
        }
        hasVar(name) {
            return this.has(name) && this.get(name).type === "VALUE";
        }
        get(name) {
            var _a;
            if (this.entries.has(name)) {
                return this.entries.get(name);
            }
            else if ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.has(name)) {
                return this.parent.get(name);
            }
            else {
                throw new Error(`${name} not found`);
            }
        }
        getBasicTypes() {
            return [...this.basicTypes];
        }
        getEnum(name) {
            if (this.hasEnum(name)) {
                return this.get(name).value;
            }
            else {
                throw new Error(`No Enum named: ${name}`);
            }
        }
        getAllEnums() {
            let res = new Map();
            if (this.parent) {
                res = this.parent.getAllEnums();
            }
            for (let [key, value] of this.entries) {
                if (value.type === C.ENUM) {
                    res.set(key, value.value);
                }
            }
            return res;
        }
        getFunc(name) {
            if (this.hasFunc(name)) {
                return this.get(name).value;
            }
            else {
                throw new Error(`No Function named: ${name}`);
            }
        }
        getAllFuncs() {
            let res = new Map();
            if (this.parent) {
                res = this.parent.getAllFuncs();
            }
            for (let [key, value] of this.entries) {
                if (value.type === C.FUNCTION) {
                    res.set(key, value.value);
                }
            }
            return res;
        }
        getStruct(name) {
            if (this.hasStruct(name)) {
                return this.get(name).value;
            }
            else {
                throw new Error(`No Struct named: ${name}`);
            }
        }
        getAllStructs() {
            let res = new Map();
            if (this.parent) {
                res = this.parent.getAllStructs();
            }
            for (let [key, value] of this.entries) {
                if (value.type === C.STRUCT) {
                    res.set(key, value.value);
                }
            }
            return res;
        }
        getVar(name) {
            if (this.hasVar(name)) {
                return this.get(name).value;
            }
            else {
                throw new Error(`No Variable named: ${name}`);
            }
        }
        getAllVars() {
            let res = new Map();
            if (this.parent) {
                res = this.parent.getAllVars();
            }
            for (let [key, value] of this.entries) {
                if (value.type === C.VALUE) {
                    res.set(key, value.value);
                }
            }
            return res;
        }
        setEnum(name, enumDef) {
            this.entries.set(name, { type: C.ENUM, value: enumDef });
        }
        setFunc(name, func, ref) {
            this.entries.set(name, { type: C.FUNCTION, value: func, ref });
        }
        setStruct(name, struct) {
            this.entries.set(name, { type: C.STRUCT, value: struct });
        }
        setVar(name, variable, ref) {
            this.entries.set(name, { type: C.VALUE, value: variable, ref });
        }
    }

    function parseBlock(source, parent, scope) {
        var _a, _b;
        if (!Array.isArray(source)) {
            throw new Error('Invalid statement list');
        }
        const root = parent instanceof Root ? parent : parent.root;
        const allowNamedBlocks = (_a = root.allowNamedBlocks) !== null && _a !== void 0 ? _a : false;
        let name = (!allowNamedBlocks || parent instanceof Root || source[0] !== 'block' || !source[1]) ? C.UNTITLED : source[1];
        if (allowNamedBlocks && !(parent instanceof Root) && source[0] === 'block') {
            source = (_b = source[2]) !== null && _b !== void 0 ? _b : [];
        }
        return new Block(parent, scope, name, source);
    }
    function parseStatement(statement, parent, scope) {
        const root = (parent instanceof Root) ? parent : parent.root;
        if (Array.isArray(statement)) {
            if (statement.length === 0) {
                throw new Error('Invalid statement');
            }
            else if (statement[0] === 'var') {
                return parseVariableDeclaration(statement, parent, scope);
            }
            else if (statement[0] === 'cond') {
                return parseConditional(statement, parent, scope);
            }
            else if (statement[0] === '=') {
                return parseAssignment(statement, parent, scope);
            }
            else if (statement[0] === 'return') {
                return _parseReturn(statement, parent, scope);
            }
            else if (statement[0] === 'for') {
                return parseForStatement(statement, parent, scope);
            }
            else if (statement[0] === 'while') {
                return parseWhileStatement(statement, parent, scope);
            }
            else if (statement[0] === 'func') {
                return parseFunctionDefinition(statement, parent, scope);
            }
            else if (root.allowNamedBlocks && statement[0] === 'block') {
                return parseBlock(statement, parent, scope);
            }
        }
        return parseExpression(statement, parent, scope);
    }
    function parseExpression(expr, parent, scope) {
        if (expr === undefined || expr === null) {
            throw new Error('invalid expression');
        }
        if (typeof expr === 'string' && expr[0] === '$') {
            if (expr.length === 1) {
                throw new Error(`Invalid expression: ${JSON.stringify(expr)}`);
            }
            return parseVariableReference(expr, parent, scope);
        }
        else if (Array.isArray(expr) && expr.length > 0 && typeof expr[0] === 'string') {
            if (expr[0] === 'ERROR') {
                return new ErrorExp(parent, scope, expr[1]);
            }
            else if (expr[0] === C.ARRAY) {
                return parseArray(expr, parent, scope);
            }
            else if (expr[0] === "map") {
                return parseMap(expr, parent, scope);
            }
            else if (['and', 'or', 'not'].includes(expr[0])) {
                return parseLogicalOperator(expr, parent, scope);
            }
            else if (expr[0] === '->') {
                return parseAccessor(expr, parent, scope);
            }
            else if (expr[0] === 'secret') {
                return parseSecret(expr, parent, scope);
            }
            else if (scope.hasFunc(expr[0])) {
                return _parseFunctionCall(expr, parent, scope);
            }
            else if (scope.hasStruct(expr[0])) {
                return parseStruct(expr, parent, scope);
            }
            else if (scope.hasEnum(expr[0])) {
                return parseEnum(expr, parent, scope);
            }
            else {
                throw new Error(`Type ${expr[0]} not found in scope`);
            }
        }
        else if (isPlainObject(expr) || (Array.isArray(expr) && expr[0] === 'array') || isPrimitive(expr)) {
            return parseLiteral(expr, parent, scope);
        }
        else {
            throw new Error(`Invalid expression: ${JSON.stringify(expr)}`);
        }
    }
    function parseSecret(expr, parent, scope) {
        if (!Array.isArray(expr) || expr.length !== 2 || typeof expr[1] !== 'string') {
            throw new Error('Invalid secret expression');
        }
        return new Literal(parent, scope, expr[1], { isSecret: true });
    }
    function parseMap(expr, parent, scope) {
        if (expr.length !== 3 || expr[0] !== "map") {
            throw new Error('Invalid map expression');
        }
        return new MapExp(parent, scope, expr[1], expr[2]);
    }
    function parseFunctionDefinition(statements, parent, scope) {
        if (!isValidFunctionDefinitionSyntax(statements)) {
            throw new Error('Invalid function definition syntax');
        }
        return new FunctionDefinition(parent, scope, statements[1], statements[2], statements.slice(3));
    }
    function parseArray(expr, parent, scope) {
        if (expr.length !== 3 || expr[0] !== C.ARRAY || typeof expr[1] !== 'string' || !Array.isArray(expr[2])) {
            throw new Error('Invalid array expression');
        }
        return new ArrayExp(parent, scope, expr[1], expr[2]);
    }
    function parseStruct(expr, parent, scope) {
        if (!Array.isArray(expr) || typeof expr[0] !== 'string' || (expr[1] && !isPlainObject(expr[1]))) {
            throw new Error('Invalid struct expression');
        }
        if (!scope.hasStruct(expr[0])) {
            throw new Error('Struct not found in registry');
        }
        return new Struct(parent, scope, expr[0], expr[1]);
    }
    function parseEnum(expr, parent, scope) {
        if (!Array.isArray(expr) || typeof expr[0] !== 'string') {
            throw new Error('Invalid enum expression');
        }
        if (!scope.hasEnum(expr[0])) {
            throw new Error('Enum not found in registry');
        }
        return new Enum(parent, scope, expr[0], expr[1]);
    }
    function parseVariableDeclaration(statement, parent, scope) {
        if (!isValidVariableDeclarationSyntax(statement)) {
            throw new Error('Invalid variable declaration syntax');
        }
        else if (!scope.hasType(statement[2])) {
            throw new Error('the variable declaration has an invalid type');
        }
        else {
            return new VariableDeclaration(parent, scope, statement[1], statement[2], statement[3]);
        }
    }
    function parseConditional(statement, parent, scope) {
        if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== 'cond') {
            throw new Error('Invalid conditional statement');
        }
        return new Conditional(parent, scope, statement.slice(1));
    }
    function parseWhileStatement(statement, parent, scope) {
        if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== 'while') {
            throw new Error('Invalid while statement');
        }
        return new While(parent, scope, statement.slice(1));
    }
    function parseForStatement(statement, parent, scope) {
        if (!Array.isArray(statement) || statement.length === 0 || statement[0] !== 'for') {
            throw new Error('Invalid for statement');
        }
        return new For(parent, scope, statement.slice(1));
    }
    function parseAssignment(statement, parent, scope) {
        if (!Array.isArray(statement) || statement.length !== 3 || statement[0] !== '=') {
            throw new Error('Invalid assignment statement');
        }
        return new Assignment(parent, scope, statement[1], statement[2]);
    }
    function _parseReturn(statement, parent, scope) {
        if (!Array.isArray(statement)) {
            throw new Error('Invalid return statement');
        }
        return new Return(parent, scope, statement[1]);
    }
    function parseVariableReference(expr, parent, scope) {
        if (typeof expr !== 'string' || expr.length === 0 || expr[0] !== '$') {
            throw new Error('Invalid variable reference');
        }
        return new VariableReference(parent, scope, expr.slice(1));
    }
    function parseCallback(expr, parent, scope) {
        if (typeof expr === 'string' && expr.length > 1 && expr[0] === '$') {
            return parseVariableReference(expr, parent, scope);
        }
        else {
            return parseLambda(expr, parent, scope);
        }
    }
    function parseLambda(statements, parent, scope) {
        if (!isValidLambdaSyntax(statements)) {
            throw new Error('Invalid Lambda syntax');
        }
        return new Lambda(parent, scope, statements[1], statements.slice(2));
    }
    function parseLiteral(expr, parent, scope) {
        if (!isPrimitive(expr)
            && (!Array.isArray(expr) || expr[0] !== 'array')
            && !isPlainObject(expr)) {
            throw new Error('Invalid literal');
        }
        return new Literal(parent, scope, expr);
    }
    function _parseFunctionCall(expr, parent, scope) {
        if (!Array.isArray(expr) || expr.length === 0 || typeof expr[0] !== 'string') {
            throw new Error('Invalid function call');
        }
        if (!scope.hasFunc(expr[0])) {
            throw new Error('Function not found in scope');
        }
        let args = expr.length > 1 ? expr.slice(1) : undefined;
        return new FunctionCall(parent, scope, expr[0], args);
    }
    function parseLogicalOperator(expr, parent, scope) {
        if (!Array.isArray(expr) || expr.length === 0 || typeof expr[0] !== 'string') {
            throw new Error('Invalid logical operator');
        }
        if (expr[0] === C.OP_NOT && expr.length !== 2) {
            throw new Error('NOT requires exactly one operand');
        }
        const operands = expr.slice(1);
        return new LogicalOperator(parent, scope, expr[0], operands);
    }
    function parseAccessor(expr, parent, scope) {
        if (!Array.isArray(expr) || expr.length == 0) {
            throw new Error('Invalid Accessor');
        }
        if (expr.length !== 3) {
            throw new Error('Accessor requires exactly two operands');
        }
        const operands = expr.slice(1);
        return new Accessor(parent, scope, expr[0], operands);
    }

    class Declarations extends EventEmitter$1 {
        get length() {
            return this._params.length;
        }
        get list() {
            return [...this._params];
        }
        get names() {
            return this._params.map(p => p.name);
        }
        constructor(root, params = []) {
            super();
            this._root = root;
            this._params = [];
            for (let param of params) {
                this.add(param);
            }
        }
        emitChange() {
            this.emit('change');
            this._root.emit('change');
        }
        add(param) {
            if (this.names.some(p => p === param.name)) {
                throw new Error(`Param with name "${param.name}" already exists`);
            }
            if (!isValidName(param.name)) {
                throw new Error(`Invalid param name "${param.name}"`);
            }
            this._params.push({ ...param });
            this.emitChange();
        }
        changeType(name, newType) {
            const param = this.get(name);
            if (param.dataType === newType) {
                return;
            }
            param.dataType = newType;
            this.emitChange();
        }
        get(name) {
            if (!this.has(name)) {
                throw new Error(`Param name "${name}" is not found.`);
            }
            return this._params.find(p => p.name === name);
        }
        has(name) {
            return this._params.findIndex(p => p.name === name) > -1;
        }
        remove(paramName) {
            let index = this._params.findIndex(p => p.name === paramName);
            if (index < 0) {
                throw new Error(`Param name "${paramName}" not found`);
            }
            this._params.splice(index, 1);
            this.emitChange();
        }
        rename(paramName, newName) {
            if (paramName === newName)
                return;
            if (this.has(newName)) {
                throw new Error(`Param name "${newName}" already exists`);
            }
            if (!isValidName(newName))
                throw new Error(`Invalid name "${newName}" for param`);
            let param = this.get(paramName);
            let refs = getParamReferences(param, this._root);
            refs.forEach(ref => {
                ref._ref = newName;
                ref.emitChange();
            });
            param.name = newName;
            this.emitChange();
        }
        toJSON() {
            return structuredClone(this._params);
        }
    }

    const NodeTypes = [
        C.BLOCK,
        C.VARIABLE_DECLARATION,
        C.COND,
        C.ASSIGNMENT,
        C.VARIABLE_REFERENCE,
        C.ERROR,
        C.CLAUSE,
        C.FUNCTION_CALL,
        C.LITERAL,
        C.STRUCT,
        C.ENUM,
        C.MAP_NODE,
        C.ARRAY_NODE,
        C.OPERATOR
    ];
    const ErrorCodes = [
        C.DUPLICATE_DECLARATION,
        C.MISSING_ARGUMENT,
        C.INVALID_SYNTAX,
        C.TYPE_MISMATCH,
        C.UNDEFINED_TYPE,
        C.INVALID_VARIABLE_NAME,
        C.INVALID_VARIABLE_REFERENCE,
        C.INVALID_VARIABLE_TYPE,
        C.INVALID_FIELD_NAME,
    ];
    class Root extends EventEmitter$1 {
        constructor(registry, source, opts) {
            var _a, _b, _c;
            super();
            this.scope = new ValidationScope();
            this.updateScope = () => {
                var _a;
                this.scope.clearVar();
                for (let param of this.declarations.list) {
                    this.scope.setVar(param.name, { name: param.name, dataType: param.dataType }, param);
                }
                (_a = this.expression) === null || _a === void 0 ? void 0 : _a.scopeChange(this.scope);
            };
            this.registry = registry;
            this.allowNamedBlocks = (_a = opts === null || opts === void 0 ? void 0 : opts.allowNamedBlocks) !== null && _a !== void 0 ? _a : false;
            this.declarations = new Declarations(this, (_b = opts === null || opts === void 0 ? void 0 : opts.declarations) !== null && _b !== void 0 ? _b : []);
            const sourceType = (_c = opts === null || opts === void 0 ? void 0 : opts.sourceType) !== null && _c !== void 0 ? _c : C.BLOCK;
            for (let name in registry.enums) {
                this.scope.setEnum(name, registry.enums[name]);
            }
            for (let name in registry.structs) {
                this.scope.setStruct(name, registry.structs[name]);
            }
            for (let name in registry.funcs) {
                this.scope.setFunc(name, registry.funcs[name]);
            }
            this.updateScope();
            this.declarations.on('change', this.updateScope);
            if (!Array.isArray(source)) {
                source = [source];
            }
            if (sourceType === C.BLOCK) {
                this.expression = parseBlock(source, this, this.scope);
            }
            else {
                this.expression = parseStatement(source, this, this.scope);
            }
        }
        emitChange(node) {
            this.emit(C.CHANGE, node);
        }
        async evaluate(vm) {
            if (this.hasErrors()) {
                const errorNodes = this.getErrorNodes();
                let errorNode = errorNodes[0].error;
                if (errorNodes[0] instanceof ErrorExp) {
                    errorNode = errorNodes[0];
                }
                throw handleError({
                    message: errorNode.description,
                    code: errorNode.code,
                }, vm.context.meta, errorNode);
            }
            try {
                let res = await this.expression.evaluate(vm);
                return res;
            }
            catch (err) {
                if (err instanceof ReturnMarker) {
                    return err.data;
                }
                throw err;
            }
        }
        getAll() {
            let expressions = [];
            expressions.push(this.expression);
            for (let expression of expressions) {
                expressions.push(...expression.children);
            }
            return expressions;
        }
        hasErrors() {
            return this.getAll().some(node => node instanceof ErrorExp || node.error instanceof ErrorExp);
        }
        getErrorNodes() {
            return this.getAll().filter(node => node instanceof ErrorExp || node.error instanceof ErrorExp);
        }
        toJSON() {
            if (this.hasErrors()) {
                throw new Error('Cannot serialize tree with errors');
            }
            else {
                return this.expression.toJSON();
            }
        }
        onRenameVar(_varDec) {
            this.updateScope();
        }
        replace(source) {
            this.expression = parseBlock(source, this, this.scope);
            this.emitChange(this.expression);
        }
    }
    class Expression extends EventEmitter$1 {
        get root() {
            let candidateRoot = this.parent;
            while (!(candidateRoot instanceof Root)) {
                candidateRoot = candidateRoot.parent;
            }
            return candidateRoot;
        }
        get returnType() {
            return C.UNKNOWN;
        }
        get title() {
            return this.type;
        }
        constructor(nodeType, parent, scope) {
            super();
            this.type = nodeType;
            this.parent = parent;
            this.scope = scope;
        }
        emitChange(node = this) {
            var _a;
            this.emit(C.CHANGE, node);
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.emitChange(node);
        }
        async evaluate(vm, ...args) {
            return await Promise.race([
                this.safeEvaluate(vm, ...args),
                vm.interruptPromise
            ]);
        }
        async safeEvaluate(vm, ...args) {
            let error;
            await vm.runHooks(HOOK_EVENT.BEFORE_EVAL, { node: this });
            try {
                return await this._evaluate(vm, ...args);
            }
            catch (err) {
                if (err instanceof ReturnMarker) {
                    throw err;
                }
                error = handleError(err, vm.context.meta, this);
                throw error;
            }
            finally {
                await vm.runHooks(HOOK_EVENT.AFTER_EVAL, { node: this, error });
            }
        }
        scopeChange(scope) {
            this.scope = scope;
            for (let child of this.children) {
                child.scopeChange(scope);
            }
        }
        path() {
            const buildPath = (node, accPath) => {
                if (node.parent instanceof Root) {
                    return accPath;
                }
                const idx = node.parent.children.indexOf(node);
                accPath.unshift(idx);
                return buildPath(node.parent, accPath);
            };
            return buildPath(this, []);
        }
    }
    class Operator extends Expression {
        get children() {
            return [...this.operands];
        }
        get title() {
            return this.name;
        }
        constructor(parent, scope, name, operands) {
            super(C.OPERATOR, parent, scope);
            this.operands = [];
            this.name = name;
            this.operands = this.parse(operands);
        }
        parse(operands) {
            return operands.map(operand => parseExpression(operand, this, this.scope));
        }
        insertAt(index, expressionSource) {
            const node = parseExpression(expressionSource, this, this.scope);
            this.operands.splice(index, 0, node);
            this.emitChange();
            this.emit('child_addition', node);
        }
        remove(node) {
            const index = this.operands.indexOf(node);
            if (index === -1)
                throw new Error('Operand not found in the list');
            this.operands.splice(index, 1);
            this.emitChange();
        }
        replace(oldChild, expressionSource) {
            let index = this.children.indexOf(oldChild);
            if (index < 0) {
                throw new Error('No child matching the given node');
            }
            this.operands[index] = parseExpression(expressionSource, this, this.scope);
            this.emitChange();
        }
    }
    class LogicalOperator extends Operator {
        get returnType() {
            return C.BOOLEAN;
        }
        async _evaluate(vm) {
            switch (this.name) {
                case C.OP_AND:
                    return await this.and(vm);
                case C.OP_OR:
                    return await this.or(vm);
                case C.OP_NOT:
                    return await this.not(vm);
            }
        }
        async and(vm) {
            for (const operand of this.operands) {
                const result = await operand.evaluate(vm);
                if (!result) {
                    return false;
                }
            }
            return true;
        }
        async or(vm) {
            for (const operand of this.operands) {
                const result = await operand.evaluate(vm);
                if (result) {
                    return true;
                }
            }
            return false;
        }
        async not(vm) {
            return !(await this.operands[0].evaluate(vm));
        }
        insertAt(index, expressionSource) {
            if (this.name === C.OP_NOT) {
                throw new Error("Error: Cannot perform 'insertAt' operation on a NOT operator");
            }
            super.insertAt(index, expressionSource);
        }
        remove(node) {
            if (this.name === C.OP_NOT) {
                throw new Error("Error: Cannot perform 'replace' operation on a NOT operator");
            }
            super.remove(node);
        }
        parse(operandsSource) {
            const operands = [];
            for (let idx = 0; idx < operandsSource.length; idx++) {
                const operandSource = operandsSource[idx];
                let operand = parseExpression(operandSource, this, this.scope);
                if (!(operand instanceof ErrorExp) && operand.returnType !== C.BOOLEAN) {
                    let content;
                    if (operand instanceof FunctionCall) {
                        content = `${operand.name} returns ${operand.returnType}`;
                    }
                    else if (operand instanceof Literal) {
                        content = `${operand.value} is of type ${operand.returnType}`;
                    }
                    else {
                        content = `Got type ${operand.returnType}`;
                    }
                    const errorMessage = `Error: Type Mismatch - ${content} expected boolean`;
                    throw new Error(errorMessage);
                }
                operands.push(operand);
            }
            return operands;
        }
        toJSON() {
            return [this.name, ...this.operands.map(operand => operand.toJSON())];
        }
    }
    class Accessor extends Operator {
        get returnType() {
            const structDef = this.scope.get(this.operands[0].returnType).value;
            const fieldName = this.operands[1].value;
            const fieldDef = structDef.fields[fieldName];
            if (!fieldDef) {
                return C.UNKNOWN;
            }
            return structDef.fields[fieldName].types[0];
        }
        async _evaluate(vm) {
            const leftOp = await this.operands[0].evaluate(vm);
            const field = await this.operands[1].evaluate(vm);
            return leftOp[field];
        }
        insertAt() {
            throw new Error("Cannot perform 'insertAt' operation on a Accessor operator");
        }
        replace(oldChild, expressionSource) {
            const index = this.children.indexOf(oldChild);
            if (index < 0) {
                throw new Error('No child matching the given node');
            }
            const newExpr = parseExpression(expressionSource, this, this.scope);
            let structName, structDef, fieldName;
            if (index === 0) {
                structName = newExpr.returnType;
                if (!this.scope.hasStruct(structName)) {
                    throw new Error(`${structName} cannot be assigned to a struct`);
                }
                fieldName = this.operands[1].value;
            }
            else {
                if (newExpr.returnType !== C.STRING) {
                    throw new Error(`Field name must be a string got ${newExpr.returnType}`);
                }
                structName = this.operands[0].returnType;
                fieldName = newExpr.value;
            }
            structDef = this.scope.get(structName).value;
            if (!structDef.fields[fieldName]) {
                this.error = new ErrorExp(this, this.scope, C.INVALID_FIELD_NAME, `Field ${fieldName} does not exist on struct ${structName}`);
            }
            else if (this.error) {
                this.error = undefined;
            }
            this.operands[index] = newExpr;
            this.emitChange();
        }
        parse(operandSource) {
            const operands = super.parse(operandSource);
            if (!(this.scope.hasStruct(operands[0].returnType) || operands[0] instanceof Struct)) {
                throw new Error("Left hand side must return a struct");
            }
            if (!(operands[1] instanceof Literal && operands[1].returnType == C.STRING)) {
                throw new Error("Right hand side must be a string");
            }
            const structName = operands[0].returnType;
            const structDef = this.scope.get(structName).value;
            const fieldName = operands[1].value;
            if (!structDef.fields[fieldName]) {
                this.error = new ErrorExp(this, this.scope, C.INVALID_FIELD_NAME, `Field ${fieldName} does not exist on struct ${structName}`);
            }
            return operands;
        }
        toJSON() {
            return ['->', this.operands[0].toJSON(), this.operands[1].toJSON()];
        }
    }
    class Block extends Expression {
        get name() {
            return this._name;
        }
        set name(name) {
            if (!isValidName(name))
                throw new Error('Invalid name for Block');
            this._name = name;
        }
        constructor(parent, scope, name, source) {
            super(C.BLOCK, parent, scope);
            this.nodes = [];
            this.scope = scope;
            this._name = name;
            source === null || source === void 0 ? void 0 : source.forEach(statement => {
                let scope = this.getScope(this.nodes.length);
                let node;
                try {
                    node = parseStatement(statement, this, scope);
                }
                catch (e) {
                    console.error(e);
                    node = new ErrorExp(this, scope, C.INVALID_SYNTAX, e.message);
                }
                this.nodes.push(node);
            });
            this.emitChange();
        }
        get children() {
            return [...this.nodes];
        }
        clear() {
            this.nodes = [];
            this.emitChange();
        }
        async _evaluate(vm) {
            vm.scopeStack.push();
            if (this.name !== C.UNTITLED) {
                vm.scopeStack.set(C.CONTEXT, this.name);
            }
            let result;
            for (let node of this.nodes) {
                result = await node.evaluate(vm);
            }
            vm.scopeStack.pop();
            return result;
        }
        getScope(index) {
            let scope = new ValidationScope(this.scope);
            if (this.parent instanceof _FuncDef) {
                this.parent.parameters.forEach(param => scope.setVar(param.name, { name: param.name, dataType: param.dataType }, param));
            }
            for (let i = 0; i < index; i++) {
                let node = this.nodes[i];
                if (isVariableDeclaration(node)) {
                    scope.setVar(node.name, { name: node.name, dataType: node.dataType }, node);
                }
                else if (isFunctionDefinition(node)) {
                    scope.setFunc(node.name, {
                        name: node.name,
                        args: Object.fromEntries(node.parameters.map(p => [p.name, { types: [p.dataType] }])),
                        returnType: node.returnType,
                        fn: () => () => { }
                    }, node);
                }
            }
            return scope;
        }
        remove(node) {
            let index = this.nodes.indexOf(node);
            if (index === -1)
                throw new Error('Node not found in the list');
            this.nodes.splice(index, 1);
            this.updateScope(index);
            this.emitChange();
        }
        insertAt(index, statement) {
            let scope = this.getScope(index);
            let node = parseStatement(statement, this, scope);
            if (isDeclaration(node)) {
                if (this.nodes.some(child => isDeclaration(child) && child.name === node.name)) {
                    throw new Error('Declaration with same name already exists in current block');
                }
            }
            this.nodes.splice(index, 0, node);
            this.updateScope(index + 1);
            this.emitChange();
            this.emit('child_addition', node);
        }
        replace(oldChild, statement) {
            let index = this.nodes.indexOf(oldChild);
            if (index === -1)
                throw new Error('Node not found in the list');
            let scope = this.getScope(index);
            let node = parseStatement(statement, this, scope);
            if (isDeclaration(node)) {
                if (this.nodes.some(child => isDeclaration(child) && child.name === node.name)) {
                    throw new Error('Declaration with same name already exists in current block');
                }
            }
            this.nodes[index] = node;
            this.updateScope(index + 1);
            this.emitChange();
        }
        scopeChange(scope) {
            this.scope = scope;
            let children = this.children;
            for (let i = 0; i < children.length; i++) {
                children[i].scopeChange(this.getScope(i));
            }
        }
        toJSON() {
            let res = this.nodes.map(node => {
                return node.toJSON();
            });
            if (!this.root.allowNamedBlocks || this.parent instanceof Root) {
                return res;
            }
            else {
                return ['block', this.name, res];
            }
        }
        onRenameVar(varDec) {
            this.updateScope(this.nodes.indexOf(varDec) + 1);
        }
        updateScope(index) {
            for (let i = index; i < this.nodes.length; i++) {
                this.nodes[i].scopeChange(this.getScope(i));
            }
        }
    }
    class Literal extends Expression {
        get children() {
            return [];
        }
        get returnType() {
            return this._returnType;
        }
        get value() {
            return this._value;
        }
        set returnType(type) {
            this._returnType = type;
        }
        set value(value) {
            this._value = value;
            this.emitChange();
        }
        constructor(parent, scope, value, opts) {
            super(C.LITERAL, parent, scope);
            this._returnType = getLiteralType(value);
            if (this._returnType === 'string') {
                value = unEscapeDollar(value);
            }
            if (opts === null || opts === void 0 ? void 0 : opts.isSecret) {
                this._returnType = 'secret';
            }
            this._value = value;
        }
        async _evaluate(_vm) {
            return this.value;
        }
        toJSON() {
            if (this.returnType === 'string') {
                return escapeDollar(this.value);
            }
            else if (this.returnType === 'secret') {
                return ['secret', escapeDollar(this.value)];
            }
            else {
                return this.value;
            }
        }
    }
    class ArrayExp extends Expression {
        get children() {
            return [...this._value];
        }
        get returnType() {
            return "array<" + this._elementType + ">";
        }
        get value() {
            return this._value;
        }
        get elementType() {
            return this._elementType;
        }
        constructor(parent, scope, elementType, value) {
            super(C.ARRAY_NODE, parent, scope);
            this.onChange = (node) => {
                if (!(node instanceof Accessor) || this.children.indexOf(node) === -1) {
                    return;
                }
                if (node.returnType !== this.elementType) {
                    this.error = new ErrorExp(this, this.scope, C.TYPE_MISMATCH, `${this.returnType} cannot have ${node.returnType} as an element`);
                }
                else if (this.error) {
                    this.error = undefined;
                }
            };
            this._elementType = elementType;
            let valueArr = value.map(val => parseExpression(val, this, this.scope));
            if (valueArr.some(v => v.returnType !== this._elementType))
                throw new Error("One or more of the array elements are of different type from the array's declared element type");
            this._value = valueArr;
            this.on(C.CHANGE, this.onChange);
        }
        async _evaluate(vm) {
            let res = [];
            for (let val of this.value) {
                res.push(await val.evaluate(vm));
            }
            return res;
        }
        async replace(oldChild, expression) {
            let index = this.children.indexOf(oldChild);
            if (index < 0) {
                throw new Error('No child matching the given node');
            }
            let exp = this.parse(expression);
            if (exp.returnType !== this.elementType) {
                exp = castToTypeOrError(exp, [this.elementType]);
            }
            this._value[index] = exp;
            this.emitChange();
        }
        parse(value) {
            let node = parseExpression(value, this, this.scope);
            return node;
        }
        toJSON() {
            return ['array', this._elementType, this.value.map(val => val.toJSON())];
        }
    }
    class Struct extends Expression {
        get children() {
            return [...this.fields.values()];
        }
        get returnType() {
            return this.name;
        }
        get(fieldName) {
            return this.fields.get(fieldName);
        }
        has(field) {
            return this.fields.has(field);
        }
        constructor(parent, scope, name, fields) {
            super(C.STRUCT, parent, scope);
            this.onChange = (node) => {
                if (!(node instanceof Accessor)) {
                    return;
                }
                for (let [key, value] of this.fields) {
                    if (value === node) {
                        const structDef = this.scope.getStruct(this.name);
                        const fieldDef = structDef.fields[key];
                        if (!fieldDef.types.includes(node.returnType)) {
                            this.error = new ErrorExp(this, this.scope, C.TYPE_MISMATCH, `Field of type ${fieldDef.types} cannot be assigned a ${node.returnType}`);
                        }
                        else if (this.error) {
                            this.error = undefined;
                        }
                    }
                }
            };
            if (!this.scope.hasStruct(name))
                throw new Error(`Struct ${name} not defined in scope`);
            this.name = name;
            this.fields = fields ? this.prepare(fields) : this.getDefaults(name);
            this.on(C.CHANGE, this.onChange);
        }
        async _evaluate(vm) {
            let struct = {};
            if ([...this.fields.values()].some(value => value instanceof ErrorExp)) {
                throw new Error('StructNode has an error in one of its fields');
            }
            for (let [key, value] of this.fields) {
                struct[key] = await value.evaluate(vm);
            }
            return struct;
        }
        getDefaults(name) {
            let fieldDefs = this.scope.getStruct(name).fields;
            let fields = new Map();
            for (let key in fieldDefs) {
                if (!fieldDefs[key].optional) {
                    fields.set(key, getDefault(this, this.scope, fieldDefs[key]));
                }
            }
            return fields;
        }
        prepare(fields) {
            let preparedFields = new Map();
            let fieldDefs = this.scope.getStruct(this.name).fields;
            for (let key in fieldDefs) {
                if (key in fields) {
                    let node = parseExpression(fields[key], this, this.scope);
                    let types = fieldDefs[key].types;
                    if (!types.includes(node.returnType))
                        node = castToTypeOrError(node, types);
                    preparedFields.set(key, node);
                }
                else if (!fieldDefs[key].optional) {
                    throw new Error(`Missing field ${key}`);
                }
            }
            return preparedFields;
        }
        removeOptional(child) {
            let fieldDefs = this.scope.getStruct(this.name).fields;
            for (let [key, value] of this.fields) {
                if (value === child) {
                    if (fieldDefs[key].optional) {
                        this.fields.delete(key);
                        this.emitChange();
                        return;
                    }
                    else {
                        throw new Error('Cannot remove non-optional field');
                    }
                }
            }
            throw new Error('Child not found in fields');
        }
        replace(oldChild, newExpression) {
            for (let [key, value] of this.fields) {
                if (value === oldChild) {
                    this.set(key, newExpression);
                    return;
                }
            }
            throw new Error('oldChild not found in fields');
        }
        set(name, value) {
            let fieldDefs = this.scope.getStruct(this.name).fields;
            if (!fieldDefs.hasOwnProperty(name))
                throw new Error('No field with that name');
            let node = parseExpression(value, this, this.scope);
            let types = fieldDefs[name].types;
            if (!types.includes(node.returnType)) {
                node = castToTypeOrError(node, types);
            }
            this.fields.set(name, node);
            this.emitChange();
        }
        setAllOptional() {
            let fieldDefs = this.scope.getStruct(this.name).fields;
            for (let key in fieldDefs) {
                if (!this.fields.has(key)) {
                    this.fields.set(key, getDefault(this, this.scope, fieldDefs[key]));
                }
            }
            this.emitChange();
        }
        toJSON() {
            let fieldObj = {};
            for (let [key, value] of this.fields) {
                fieldObj[key] = value.toJSON();
            }
            return fieldObj;
        }
    }
    class Enum extends Expression {
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
            this.emitChange();
        }
        get children() {
            return [];
        }
        get returnType() {
            return this.name;
        }
        constructor(parent, scope, name, value) {
            super(C.ENUM, parent, scope);
            if (!this.scope.hasEnum(name))
                throw new Error(`Enum ${name} not found in registry`);
            this.name = name;
            this._value = this.checkValidity(value) ? value : this.getDefaults(name);
            if (!this.scope.getEnum(name).values.includes(this.value)) {
                throw new Error(`Invalid enum value: ${this.value}`);
            }
        }
        checkValidity(value) {
            let enumDef = this.scope.getEnum(this.name);
            if (typeof value !== enumDef.enumType)
                return false;
            return enumDef.values.includes(value);
        }
        async _evaluate(_vm) {
            return this.value;
        }
        getDefaults(name) {
            return this.scope.getEnum(name).values[0];
        }
        toJSON() {
            return this.value;
        }
    }
    class Return extends Expression {
        constructor(parent, scope, value) {
            super(C.RETURN, parent, scope);
            this._value = this.parse(value);
        }
        get children() {
            if (!this._value) {
                return [];
            }
            else {
                return [this._value];
            }
        }
        get value() {
            return this._value;
        }
        replace(oldChild, expression) {
            if (oldChild !== this._value) {
                throw new Error('No child matching the given node');
            }
            this._value = this.parse(expression);
            this.emitChange();
        }
        parse(value) {
            if (value === undefined)
                return undefined;
            let node = parseExpression(value, this, this.scope);
            return node;
        }
        async _evaluate(vm) {
            let val;
            if (this._value) {
                val = await this._value.evaluate(vm);
            }
            throw new ReturnMarker(val);
        }
        toJSON() {
            var _a;
            return ['return', (_a = this._value) === null || _a === void 0 ? void 0 : _a.toJSON()];
        }
    }
    class FunctionCall extends Expression {
        get children() {
            return [...this.argList];
        }
        get returnType() {
            return this.scope.getFunc(this.name).returnType;
        }
        get title() {
            return this.name;
        }
        constructor(parent, scope, name, argList) {
            super(C.FUNCTION_CALL, parent, scope);
            this.argList = [];
            this.onChange = (node) => {
                if (!(node instanceof Accessor)) {
                    return;
                }
                const index = this.argList.indexOf(node);
                if (index === -1) {
                    return;
                }
                const funcDef = this.scope.getFunc(this.name);
                const argDef = Object.values(funcDef.args)[index];
                if (!argDef.types.includes(node.returnType)) {
                    try {
                        castToTypeOrError(node, argDef.types);
                    }
                    catch (err) {
                        this.error = new ErrorExp(this, this.scope, C.TYPE_MISMATCH, `Field of type ${node.returnType} cannot be assigned to arg of type ${argDef.types}`);
                    }
                }
                else if (this.error) {
                    this.error = undefined;
                }
            };
            if (!this.scope.hasFunc(name))
                throw new Error(`Func ${name} not defined in scope`);
            this.name = name;
            this.argList = argList ? this.prepare(argList) : this.getDefaults(name);
            this.on(C.CHANGE, this.onChange);
        }
        async _evaluate(vm) {
            let argValArr = [];
            for (let arg of this.argList) {
                argValArr.push(await arg.evaluate(vm));
            }
            let func = vm.scopeStack.get(this.name);
            if (vm.scopeStack.isFromRegistry(this.name)) {
                return await func(vm.context, ...argValArr);
            }
            else {
                return await func(vm, ...argValArr);
            }
        }
        getDefaults(name) {
            let funcDef = this.scope.getFunc(name);
            let argDefs = Object.values(funcDef.args).filter(argDef => !argDef.optional);
            return argDefs.map(argDef => getDefault(this, this.scope, argDef));
        }
        prepare(argListSource) {
            let funcDef = this.scope.getFunc(this.name);
            let argList = [];
            let argNames = Object.keys(funcDef.args);
            for (let i = 0; i < argNames.length; i++) {
                let argDef = funcDef.args[argNames[i]];
                if (i < argListSource.length) {
                    let node = parseExpression(argListSource[i], this, this.scope);
                    if (!(node instanceof ErrorExp) && !argDef.types.includes(node.returnType)) {
                        node = castToTypeOrError(node, argDef.types);
                    }
                    argList.push(node);
                }
                else if (!argDef.optional) {
                    throw new Error(`Missing argument at position ${i}`);
                }
            }
            return argList;
        }
        removeOptional(child) {
            let index = this.argList.indexOf(child);
            if (index === -1)
                throw new Error('Child not found in argList');
            let funcDef = this.scope.getFunc(this.name);
            if (!Object.values(funcDef.args)[index].optional) {
                throw new Error('Argument is not optional');
            }
            for (let i = this.argList.length - 1; i >= index; i--) {
                this.argList.pop();
            }
            this.emitChange();
        }
        replace(oldChild, expression) {
            let index = this.argList.indexOf(oldChild);
            if (index === -1) {
                throw new Error("oldChild is not an argument of this function call");
            }
            let funcDef = this.scope.getFunc(this.name);
            let argDef = Object.values(funcDef.args)[index];
            let newChild = parseExpression(expression, this, this.scope);
            if (argDef.types.includes(newChild.returnType)) {
                this.argList[index] = newChild;
            }
            else {
                this.argList[index] = castToTypeOrError(newChild, argDef.types);
            }
            this.emitChange();
        }
        addNextOptional(value) {
            let funcDef = this.scope.getFunc(this.name);
            let argDefs = Object.values(funcDef.args);
            if (argDefs.length > this.argList.length) {
                let argDef = argDefs[this.argList.length];
                let newChild = value ? parseExpression(value, this, this.scope) : getDefault(this, this.scope, argDef);
                if (!argDef.types.includes(newChild.returnType)) {
                    newChild = castToTypeOrError(newChild, argDef.types);
                }
                this.argList.push(newChild);
                this.emitChange();
            }
            else {
                throw new Error('All optional arguments are already set');
            }
        }
        setAllOptional() {
            let funcDef = this.scope.getFunc(this.name);
            let argDefs = Object.values(funcDef.args);
            for (let i = this.argList.length; i < argDefs.length; i++) {
                let argDef = argDefs[i];
                this.argList.push(getDefault(this, this.scope, argDef));
            }
            this.emitChange();
        }
        toJSON() {
            return [this.name, ...this.argList.map(arg => {
                    return arg.toJSON();
                })];
        }
    }
    class Conditional extends Expression {
        get children() {
            return [...this.clauses];
        }
        constructor(parent, scope, source) {
            super(C.COND, parent, scope);
            this.clauses = (source && source.length > 0) ? this.prepare(source) : this.getDefaults();
        }
        async _evaluate(vm) {
            for (let clause of this.clauses) {
                let { status, value } = await clause.evaluate(vm);
                if (status)
                    return value;
            }
            return undefined;
        }
        getDefaults() {
            return [new Clause(this, this.scope)];
        }
        insertAt(index) {
            this.clauses.splice(index, 0, new Clause(this, this.scope, ['or', ['and', true]], []));
            this.emitChange();
        }
        prepare(source) {
            let clauseExps = [];
            for (let clause of source) {
                let condition = clause[0];
                let body;
                if (this.root.allowNamedBlocks && Array.isArray(clause[1]) && clause[1][0] === 'block') {
                    body = clause[1];
                }
                else {
                    body = clause.slice(1);
                }
                clauseExps.push(new Clause(this, this.scope, condition, body));
            }
            return clauseExps;
        }
        remove(child) {
            let index = -1;
            for (let i = 0; i < this.clauses.length; i++) {
                if (this.clauses[i] === child) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.clauses.splice(index, 1);
                this.emitChange();
            }
        }
        replace(oldChild, newSource) {
            let newChild = new Clause(this, this.scope, ...newSource);
            for (let i = 0; i < this.clauses.length; i++) {
                if (this.clauses[i] === oldChild) {
                    this.clauses[i] = newChild;
                    this.emitChange();
                    return;
                }
            }
            throw new Error('Node not found in the list');
        }
        toJSON() {
            return ['cond', ...this.clauses.map(clause => clause.toJSON())];
        }
    }
    class For extends Expression {
        get children() {
            return [this.iterable, this.itemVar, this.body];
        }
        constructor(parent, scope, source) {
            super(C.FOR, parent, scope);
            if (!source)
                throw new Error("expected block for for loop");
            if (!source[0])
                throw new Error("expected var name");
            if (!source[1])
                throw new Error("expected iterable");
            if (!source[2])
                throw new Error("expected body for for loop");
            this.iterable = parseExpression(source[1], this, this.scope);
            this.itemVar = new VariableDeclaration(this, this.scope, source[0], this.getItemType(this.iterable.returnType));
            this.itemVar.setDeclarationOnly();
            let forScope = this.getForScope(this.scope);
            this.body = parseBlock(source[2], this, forScope);
        }
        getItemType(iterableType) {
            if (isIterableType(iterableType)) {
                return getIterableElementType(iterableType);
            }
            else if (isArrayType(iterableType)) {
                return getArrayElementType(iterableType);
            }
            else if (this.scope.hasStruct(iterableType)) {
                const typ = this.scope.getStruct(iterableType);
                if (typ.iterator === undefined) {
                    throw new Error(`Type ${typ.name} is not iterable`);
                }
                return typ.iterator.type;
            }
            else if (this.scope.hasEnum(iterableType)) {
                const typ = this.scope.getEnum(iterableType);
                if (typ.iterator === undefined) {
                    throw new Error(`Type ${typ.name} is not iterable`);
                }
                return typ.iterator.type;
            }
            else {
                throw new Error(`type ${iterableType} is not iterable`);
            }
        }
        getForScope(scope) {
            const forScope = new ValidationScope(scope);
            const itemType = this.getItemType(this.iterable.returnType);
            forScope.setVar(this.itemVar.name, { name: this.itemVar.name, dataType: itemType }, this.itemVar);
            return forScope;
        }
        async _evaluate(vm) {
            const iterableType = this.iterable.returnType;
            let iter;
            if (isArrayType(iterableType)) {
                iter = await this.iterable.evaluate(vm);
            }
            else if (isIterableType(iterableType)) {
                iter = await this.iterable.evaluate(vm);
            }
            else {
                const iterableDef = this.scope.get(this.iterable.returnType).value;
                let iterable = await this.iterable.evaluate(vm);
                iter = await iterableDef.iterator.iter(vm.context, iterable);
            }
            for (let item of iter) {
                vm.scopeStack.push();
                vm.scopeStack.set(this.itemVar.name, item);
                await this.body.evaluate(vm);
                vm.scopeStack.pop();
            }
        }
        onRenameVar(_varDec) {
            this.updateScope(this.scope);
        }
        updateScope(scope) {
            this.iterable.scopeChange(scope);
            const forScope = this.getForScope(scope);
            this.body.scopeChange(forScope);
            this.emitChange();
        }
        scopeChange(scope) {
            this.updateScope(scope);
        }
        replace(_oldChild, expression) {
            this.iterable = parseExpression(expression, this, this.scope);
            this.updateScope(this.scope);
        }
        toJSON() {
            let serializedIterable;
            if (this.iterable instanceof Struct || this.iterable instanceof Enum) {
                serializedIterable = [this.iterable.name, this.iterable.toJSON()];
            }
            else {
                serializedIterable = this.iterable.toJSON();
            }
            return [
                "for",
                this.itemVar.name,
                serializedIterable,
                this.body.toJSON()
            ];
        }
    }
    class While extends Expression {
        get children() {
            return [this.condition, this.body];
        }
        constructor(parent, scope, source) {
            super(C.WHILE, parent, scope);
            if (!source)
                throw new Error('expected block for while loop');
            if (!source[0])
                throw new Error("expected condition");
            if (!source[1])
                throw new Error("expected block");
            this.condition = parseExpression(source[0], this, this.scope);
            this.body = parseBlock(source[1], this, this.scope);
        }
        async _evaluate(vm) {
            while (await this.condition.evaluate(vm)) {
                await this.body.evaluate(vm);
            }
        }
        toJSON() {
            return ['while', this.condition.toJSON(), this.body.toJSON()];
        }
    }
    class Clause extends Expression {
        get children() {
            return [this.condition, this.body];
        }
        constructor(parent, scope, condition, body) {
            super(C.CLAUSE, parent, scope);
            this.condition = parseExpression(condition !== null && condition !== void 0 ? condition : ['or', ['and', true]], this, this.scope);
            if (this.condition.returnType !== 'boolean') {
                throw new Error('Condition must return a boolean value');
            }
            this.body = parseBlock(body !== null && body !== void 0 ? body : [], this, this.scope);
        }
        async _evaluate(vm) {
            if (await this.condition.evaluate(vm)) {
                return {
                    status: true,
                    value: await this.body.evaluate(vm)
                };
            }
            else {
                return { status: false };
            }
        }
        replace(oldChild, expression) {
            if (this.condition !== oldChild) {
                throw new Error('No child matching the given node');
            }
            this.condition = parseExpression(expression, this, this.scope);
            this.emitChange();
        }
        toJSON() {
            let body = this.body.toJSON();
            if (this.root.allowNamedBlocks) {
                return [this.condition.toJSON(), body];
            }
            else {
                return [this.condition.toJSON(), ...body];
            }
        }
    }
    class VariableDeclaration extends Expression {
        get children() {
            return this.declarationOnly ? [] : [this.value];
        }
        constructor(parent, scope, name, type, value) {
            var _a;
            super(C.VARIABLE_DECLARATION, parent, scope);
            this.declarationOnly = false;
            this.validateName(name);
            this.name = name;
            this.dataType = type !== null && type !== void 0 ? type : C.INT;
            this.value = (_a = this.parse(value)) !== null && _a !== void 0 ? _a : getDefault(this, this.scope, { types: [this.dataType] });
        }
        setDeclarationOnly() {
            this.declarationOnly = true;
        }
        changeType(newType) {
            if (newType === this.dataType)
                return;
            this.dataType = newType;
            this.value = getDefault(this, this.scope, { types: [newType] });
            const parent = this.parent;
            parent.updateScope(parent.nodes.indexOf(this) + 1);
            this.emitChange();
        }
        async _evaluate(vm) {
            let value = await this.value.evaluate(vm);
            vm.scopeStack.set(this.name, value);
            return value;
        }
        getDefaults(opts) {
            var _a;
            let type = (_a = opts.type) !== null && _a !== void 0 ? _a : C.STRING;
            return {
                name: '_',
                type: type,
                value: getDefault(this, this.scope, { types: [type] })
            };
        }
        parse(value) {
            if (value === undefined)
                return undefined;
            let node = parseExpression(value, this, this.scope);
            if (node.returnType !== this.dataType) {
                node = castToTypeOrError(node, this.dataType);
            }
            return node;
        }
        validateName(name) {
            if (!isValidName(name, { allowFirstUnderscore: true }))
                throw new Error('Invalid name for VariableDeclaration');
            if (this.scope.hasType(name))
                throw new Error('the variable declaration has the same name as a registered type');
        }
        rename(newName) {
            if (this.parent.children.some(child => (child instanceof VariableDeclaration || child instanceof FunctionDefinition) && child.name === newName)) {
                throw new Error('Variable with same name already exists in current scope');
            }
            this.validateName(newName);
            if (this.parent instanceof Root) {
                throw new Error('Cannot rename variable in root');
            }
            let refs;
            if (this.parent instanceof Block) {
                refs = getReferences(this);
            }
            else {
                refs = getReferencesInExpr(this.parent, this);
            }
            refs.forEach(ref => {
                ref._ref = newName;
                ref.emitChange();
            });
            this.name = newName;
            const parent = this.parent;
            parent.onRenameVar(this);
            this.emitChange();
        }
        replace(oldChild, expression) {
            if (oldChild !== this.value) {
                throw new Error('No child matching the given node');
            }
            let value = parseExpression(expression, this, this.scope);
            if (value.returnType !== this.dataType) {
                value = castToTypeOrError(value, this.dataType);
            }
            this.value = value;
            this.emitChange();
        }
        scopeChange(scope) {
            this.scope = scope;
            let parent = this.parent;
            let prevSiblings = parent.children.slice(0, parent.children.indexOf(this));
            let isDuplicate = prevSiblings.some(child => isDeclaration(child) && child.name === this.name);
            if (!this.error && isDuplicate) {
                this.error = new ErrorExp(this, this.scope, C.DUPLICATE_DECLARATION);
                this.emit('change');
            }
            else if (this.error && !isDuplicate) {
                this.error = undefined;
                this.emit('change');
            }
            super.scopeChange(scope);
        }
        toJSON() {
            let json = ['var', this.name, this.dataType];
            if (this.value) {
                json.push(this.value.toJSON());
            }
            return json;
        }
    }
    class VariableReference extends Expression {
        get children() {
            return [];
        }
        get name() {
            return this._ref;
        }
        get returnType() {
            let scopeDef = this.scope.get(this._ref);
            if (scopeDef.type === C.VALUE) {
                return scopeDef.value.dataType;
            }
            else {
                return scopeDef.type;
            }
        }
        constructor(parent, scope, name) {
            super(C.VARIABLE_REFERENCE, parent, scope);
            if (!this.scope.has(name))
                throw new Error(`"${name}" is not a valid identifier`);
            this._ref = name;
        }
        async _evaluate(vm) {
            if (!vm.scopeStack.has(this._ref)) {
                throw new Error(`"${this._ref}" is not a valid identifier`);
            }
            else {
                return vm.scopeStack.get(this._ref);
            }
        }
        scopeChange(scope) {
            var _a, _b, _c, _d, _e;
            this.scope = scope;
            if (this.scope.hasVar(this.name)) {
                if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === C.INVALID_VARIABLE_REFERENCE) {
                    this.error = undefined;
                    this.emit('change');
                }
            }
            else if (((_b = this.error) === null || _b === void 0 ? void 0 : _b.code) !== C.INVALID_VARIABLE_REFERENCE) {
                this.error = new ErrorExp(this, this.scope, C.INVALID_VARIABLE_REFERENCE);
                this.emit('change');
            }
            if (((_c = this.error) === null || _c === void 0 ? void 0 : _c.code) !== C.INVALID_VARIABLE_REFERENCE) {
                if (isMatchingType(this)) {
                    if (((_d = this.error) === null || _d === void 0 ? void 0 : _d.code) === C.TYPE_MISMATCH) {
                        this.error = undefined;
                        this.emit('change');
                    }
                }
                else if (((_e = this.error) === null || _e === void 0 ? void 0 : _e.code) !== C.TYPE_MISMATCH) {
                    this.error = new ErrorExp(this, this.scope, C.TYPE_MISMATCH);
                    this.emit('change');
                }
            }
            super.scopeChange(scope);
        }
        toJSON() {
            return "$" + this.name;
        }
    }
    class Assignment extends Expression {
        get children() {
            return [this.reference, this.value];
        }
        constructor(parent, scope, reference, value) {
            super(C.ASSIGNMENT, parent, scope);
            this.reference = parseVariableReference(reference, this, scope);
            this.value = this.parseValue(value);
        }
        async _evaluate(vm) {
            let val = await this.value.evaluate(vm);
            let varName = this.reference.name;
            vm.scopeStack.update(varName, val);
            return val;
        }
        parseValue(value) {
            if (value === undefined) {
                return getDefault(this, this.scope, { types: [this.reference.returnType] });
            }
            else {
                let node = parseExpression(value, this, this.scope);
                if (node.returnType !== this.reference.returnType) {
                    node = castToTypeOrError(node, this.reference.returnType);
                }
                return node;
            }
        }
        replace(oldChild, expression) {
            let newChild = parseExpression(expression, this, this.scope);
            if (oldChild === this.reference) {
                if (!(newChild instanceof VariableReference)) {
                    throw new Error('the new value is not of type VariableReference');
                }
                this.reference = newChild;
                if (this.reference.returnType !== this.value.returnType) {
                    this.value = getDefault(this, this.scope, { types: [this.reference.returnType] });
                }
            }
            else if (oldChild === this.value) {
                if (newChild.returnType !== this.reference.returnType) {
                    newChild = castToTypeOrError(newChild, this.reference.returnType);
                }
                this.value = newChild;
            }
            else {
                throw new Error('No child matching the given node');
            }
            this.emitChange();
        }
        toJSON() {
            return ['=', this.reference.toJSON(), this.value.toJSON()];
        }
    }
    class _FuncDef extends Expression {
        get children() {
            return [...this.parameters, ...this.body.nodes];
        }
        get returnType() {
            return this.body.nodes[this.body.nodes.length - 1].returnType;
        }
        constructor(parent, scope, type, argList, statements) {
            super(type, parent, scope);
            this.parameters = [];
            if ((new Set(argList.map(arg => arg[0])).size !== argList.length)) {
                throw new Error('Duplicate argument names in function definition');
            }
            this.parameters = argList.map(([name, type]) => new VariableDeclaration(this, this.scope, name, type));
            this.body = parseBlock(statements, this, this.scope);
            this.evaluate = this.evaluate.bind(this);
        }
        async _evaluate(vm, ...args) {
            vm.scopeStack.push();
            for (let i = 0; i < args.length; i++) {
                vm.scopeStack.set(this.parameters[i].name, args[i]);
            }
            let result = await this.body.evaluate(vm);
            vm.scopeStack.pop();
            return result;
        }
    }
    class Lambda extends _FuncDef {
        constructor(parent, scope, argList, statements) {
            super(parent, scope, "LAMBDA", argList, statements);
        }
        toJSON() {
            return ['lambda', this.parameters.map(p => p.toJSON()), this.returnType, this.body.toJSON()];
        }
    }
    class FunctionDefinition extends _FuncDef {
        constructor(parent, scope, name, argList, statements) {
            super(parent, scope, "FUNCTION_DEFINITION", argList, statements);
            this.call = async (vm, ...args) => {
                return await super._evaluate(vm, ...args);
            };
            this.name = name;
        }
        toJSON() {
            return ['func', this.name, this.parameters.map(p => p.toJSON()), this.returnType, this.body.toJSON()];
        }
        async _evaluate(vm) {
            vm.scopeStack.set(this.name, this.call);
        }
    }
    class MapExp extends Expression {
        constructor(parent, scope, listSource, callbackSource) {
            super(C.MAP_NODE, parent, scope);
            let list = parseExpression(listSource, this, this.scope);
            if (!isArrayType(list.returnType)) {
                throw new Error('First argument must be an array');
            }
            this.list = list;
            let callback = parseCallback(callbackSource, this, this.scope);
            if (!(callback instanceof Lambda) && !(callback.returnType === 'function')) {
                throw new Error('Callback must be a function definition or a variable reference');
            }
            this.verifyListCallbackMatch(callback);
            this.callback = callback;
        }
        get children() {
            return [this.list, this.callback];
        }
        async _evaluate(vm) {
            let list = await this.list.evaluate(vm);
            let func;
            if (this.callback instanceof VariableReference) {
                func = vm.scopeStack.get(this.callback.name);
            }
            else {
                func = this.callback.evaluate;
            }
            let res = [];
            for (let item of list) {
                res.push(await func(vm, item));
            }
            return res;
        }
        get returnType() {
            return 'array:' + this.callback.returnType;
        }
        toJSON() {
            return ['map', this.list.toJSON(), this.callback.toJSON()];
        }
        verifyListCallbackMatch(callback) {
            let argLen;
            if (callback instanceof VariableReference) {
                argLen = Object.keys(this.scope.getFunc(callback.name).args).length;
            }
            else {
                argLen = callback.parameters.length;
            }
            if (argLen !== 1) {
                throw new Error('A Map Callback must have exactly one argument');
            }
            let argTypes;
            if (callback instanceof VariableReference) {
                argTypes = Object.values(this.scope.getFunc(callback.name).args)[0].types;
            }
            else {
                argTypes = [callback.parameters[0].dataType];
            }
            if (!argTypes.includes(this.list.returnType.slice(6, -1))) {
                throw new Error('List and callback must have matching types');
            }
        }
    }
    class ErrorExp extends Expression {
        get children() {
            return [];
        }
        constructor(parent, scope, code, description) {
            super(C.ERROR, parent, scope);
            this.code = code;
            this.description = description;
        }
        async _evaluate(_vm) {
            throw new Error("Error: " + this.code);
        }
        toJSON() {
            return ['ERROR', this.code];
        }
    }

    class ReturnMarker {
        constructor(data) {
            this.data = data;
        }
    }
    class RunTimeError extends Error {
        constructor(error, stackLine) {
            var _a;
            super(error.message);
            this.code = error.code;
            this.stack = error.stack;
            this.stackEx = (_a = error.stackEx) !== null && _a !== void 0 ? _a : [];
            if (stackLine) {
                this.push(stackLine);
            }
        }
        push(stackLine) {
            this.stackEx.push(stackLine);
        }
        clone() {
            const errorClone = new RunTimeError(this);
            errorClone.stackEx = [...this.stackEx];
            return errorClone;
        }
        toJSON() {
            var _a;
            return {
                code: this.code,
                message: this.message,
                stack: this.stack,
                stackEx: this.stackEx.map(({ node, ...exceptNode }) => exceptNode),
                cause: (_a = this.cause) === null || _a === void 0 ? void 0 : _a.toJSON()
            };
        }
    }
    function castToTypeOrError(originalNode, types) {
        types = Array.isArray(types) ? types : [types];
        for (const type of types) {
            try {
                if (originalNode.returnType === C.INT && type === C.FLOAT) {
                    if (originalNode instanceof Literal) {
                        originalNode.returnType = C.FLOAT;
                    }
                    return originalNode;
                }
                if (!(originalNode instanceof Literal)) {
                    continue;
                }
                if (originalNode.scope.hasStruct(type) && originalNode.returnType === C.JSON) {
                    return parseStruct([type, originalNode.value], originalNode.parent, originalNode.scope);
                }
                else if (originalNode.scope.hasEnum(type)
                    && (originalNode.returnType === C.STRING || originalNode.returnType === C.INT || originalNode.returnType === C.FLOAT)) {
                    return parseEnum([type, originalNode.value], originalNode.parent, originalNode.scope);
                }
                else if (originalNode.returnType === C.INT && type === C.FLOAT) {
                    const value = originalNode.value;
                    if (!Number.isInteger(value)) {
                        continue;
                    }
                    const literal = new Literal(originalNode.parent, originalNode.scope, value);
                    literal.returnType = C.FLOAT;
                    return literal;
                }
            }
            catch (err) { }
        }
        throw new Error(`the node: ${JSON.stringify(originalNode.toJSON())}, couldn't be cast to one of the types expected: "${JSON.stringify(types)}"`);
    }
    function escapeDollar(value) {
        return value.replace(/^\$/g, '\\$');
    }
    function getArrayElementType(type) {
        return type.slice(6, -1);
    }
    function getIterableElementType(type) {
        return type.slice(9, -1);
    }
    function getDefault(parent, scope, def) {
        if (def.default !== undefined) {
            let node = parseExpression(def.default, parent, scope);
            if (!def.types.includes(node.returnType)) {
                node = castToTypeOrError(node, def.types);
            }
            return node;
        }
        let type = def.types[0];
        if (type.startsWith(C.ARRAY)) {
            return new ArrayExp(parent, scope, type.slice(6, -1), []);
        }
        if (scope.hasStruct(type)) {
            return new Struct(parent, scope, type);
        }
        else if (scope.hasEnum(type)) {
            return new Enum(parent, scope, type, scope.getEnum(type).values[0]);
        }
        else if (scope.hasFunc(type)) {
            return new FunctionCall(parent, scope, type);
        }
        else if ([C.STRING, C.SECRET, C.BOOLEAN, C.JSON, C.INT, C.FLOAT].includes(type)) {
            const literal = new Literal(parent, scope, getDefaultPrimitive(type));
            literal.returnType = type;
            return literal;
        }
        else {
            throw new Error(`Type ${type} not found in scope`);
        }
    }
    function getDefaultPrimitive(type) {
        switch (type) {
            case C.INT:
                return 0;
            case C.FLOAT:
                return 0.0;
            case C.STRING || C.SECRET:
                return '';
            case C.BOOLEAN:
                return false;
            case C.JSON:
                return {};
            default:
                throw new Error(`Unknown primitive type ${type}`);
        }
    }
    function getLiteralType(literal) {
        if (isPlainObject(literal)) {
            return C.JSON;
        }
        else if (typeof literal === 'string') {
            return C.STRING;
        }
        else if (typeof literal === 'number') {
            return Number.isInteger(literal) ? C.INT : C.FLOAT;
        }
        else if (typeof literal === 'boolean') {
            return C.BOOLEAN;
        }
        else {
            throw new Error(`Unknown literal type ${typeof literal}`);
        }
    }
    function matchesDataType(scope, reqdType, actualType) {
        if (reqdType === actualType) {
            return true;
        }
        else if (isArrayType(reqdType) && isArrayType(actualType)) {
            const baseReqdType = getArrayElementType(reqdType);
            const baseActualType = getArrayElementType(actualType);
            return matchesDataType(scope, baseReqdType, baseActualType);
        }
        else if (actualType === 'json' && scope.hasStruct(reqdType)) {
            return true;
        }
        else if ((['string', 'int'].includes(actualType)) && scope.hasEnum(reqdType)) {
            return true;
        }
        return false;
    }
    function isOfType(scope, value, reqdType) {
        if (reqdType.startsWith("array") && Array.isArray(value)) {
            const reqdBaseType = getArrayElementType(reqdType);
            return value.every(v => isOfType(scope, v, reqdBaseType));
        }
        else if (scope.hasEnum(reqdType)) {
            const enumDef = scope.getEnum(reqdType);
            return enumDef.values.includes(value);
        }
        else if (scope.hasStruct(reqdType) && isPlainObject(value)) {
            const structDef = scope.getStruct(reqdType);
            return Object.entries(structDef.fields)
                .every(([fieldName, fieldDef]) => {
                if (value.hasOwnProperty(fieldName)) {
                    return fieldDef.types.some(type => isOfType(scope, value[fieldName], type));
                }
                else if (fieldDef.optional) {
                    return true;
                }
                return false;
            });
        }
        else if (isPrimitive(value)) {
            if (typeof value === 'number') {
                if (reqdType === 'int') {
                    return Number.isInteger(value);
                }
                else if (reqdType === 'float') {
                    return true;
                }
            }
            return typeof value === reqdType || (typeof value === 'string' && reqdType === 'secret');
        }
        return false;
    }
    function isArrayType(type) {
        return type.startsWith('array');
    }
    function isIterableType(type) {
        return type.startsWith('iterable');
    }
    function isMatchingType(node) {
        if (node.parent instanceof FunctionCall) {
            let parent = node.parent;
            let index = parent.argList.indexOf(node);
            let funcDef = parent.scope.getFunc(parent.name);
            return Object.values(funcDef.args)[index].types.includes(node.returnType);
        }
        else if (node.parent instanceof Struct) {
            let parent = node.parent;
            let index = [...parent.fields.values()].indexOf(node);
            let structDef = parent.scope.getStruct(parent.name);
            return Object.values(structDef.fields)[index].types.includes(node.returnType);
        }
        else {
            return true;
        }
    }
    function isPlainObject(value) {
        if (typeof value !== 'object' || value.toString() !== '[object Object]') {
            return false;
        }
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }
    function isPrimitive(value) {
        return (value !== Object(value));
    }
    function isValidName(name, opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.allowFirstUnderscore) {
            return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
        }
        else {
            return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name);
        }
    }
    function isValidType(value) {
        return isPrimitive(value) || isPlainObject(value) || Array.isArray(value);
    }
    function unEscapeDollar(value) {
        return value.replace(/^\\\$/g, '$');
    }
    function handleError(error, meta, node) {
        let stackLine = { ...meta };
        if (node) {
            stackLine = { ...stackLine, path: node.path(), nodeName: node.title, node };
        }
        if (!(error instanceof RunTimeError)) {
            error = new RunTimeError(error, stackLine);
        }
        else if (node) {
            const recentStackLine = error.stackEx.at(-1);
            if ((recentStackLine === null || recentStackLine === void 0 ? void 0 : recentStackLine.node.root) !== node.root) {
                error.push(stackLine);
            }
        }
        return error;
    }

    const RESERVED = [C.STRING, C.SECRET, C.INT, C.FLOAT, C.BOOLEAN, C.JSON, C.ARRAY, C.FUNCTION, C.VOID, C.BLOCK, C.VARIABLE_DECLARATION, C.COND, C.VARIABLE_REFERENCE, C.ASSIGNMENT, C.ERROR, C.CLAUSE, C.FUNCTION_CALL, C.FUNCTION_DEFINITION, C.FUNCTION_PARAMETER, C.LITERAL, C.STRUCT, C.ENUM, C.MAP_NODE, C.ARRAY_NODE, C.DUPLICATE_DECLARATION, C.MISSING_ARGUMENT, C.INVALID_SYNTAX, C.TYPE_MISMATCH, C.UNDEFINED_TYPE, C.INVALID_VARIABLE_NAME, C.INVALID_VARIABLE_REFERENCE, C.INVALID_VARIABLE_TYPE, C.OP_AND, C.OP_OR, C.OP_NOT];
    class Registry {
        constructor(params = {}) {
            this.basicTypes = [C.STRING, C.SECRET, C.BOOLEAN, C.JSON, C.ARRAY, C.INT, C.FLOAT];
            this.funcs = {};
            this.structs = {};
            this.enums = {};
            if (params.enums) {
                this.addEnums(params.enums);
            }
            if (params.structs) {
                this.addStructs(params.structs);
            }
            if (params.funcs) {
                this.addFuncs(params.funcs);
            }
        }
        addFunc(name, funcDef) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as function name`);
            }
            if (this.hasDef(name)) {
                throw new Error(`name "${name}" already exists in registry`);
            }
            let gotFirstOptionalArg = false;
            for (let argDef of Object.values(funcDef.args)) {
                if (argDef.optional && !gotFirstOptionalArg) {
                    gotFirstOptionalArg = true;
                }
                if (!argDef.optional && gotFirstOptionalArg) {
                    throw new Error(`Required argument after optional argument in function ${name}`);
                }
                for (let type of argDef.types) {
                    if (!this.hasType(type)) {
                        throw new Error(`type "${type}" not found in registry`);
                    }
                }
            }
            if (funcDef.returnType !== 'void' && !this.hasType(funcDef.returnType)) {
                throw new Error(`Type "${funcDef.returnType}" not found in registry`);
            }
            this.funcs[name] = funcDef;
        }
        addFuncs(funcDefs) {
            for (const [key, value] of Object.entries(funcDefs)) {
                this.addFunc(key, value);
            }
        }
        addStruct(name, typeDef) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as type name`);
            }
            if (this.hasDef(name)) {
                throw new Error(`type "${name}" already exists in registry`);
            }
            this.structs[name] = typeDef;
        }
        addEnum(name, enumDef) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as type name`);
            }
            if (this.hasDef(name)) {
                throw new Error(`type "${name}" already exists in registry`);
            }
            this.enums[name] = enumDef;
        }
        addStructs(typeDefs) {
            for (const [key, value] of Object.entries(typeDefs)) {
                this.addStruct(key, value);
            }
        }
        addEnums(typeDefs) {
            for (const [key, value] of Object.entries(typeDefs)) {
                this.addEnum(key, value);
            }
        }
        clone() {
            return new Registry({
                funcs: this.funcs,
                structs: this.structs,
                enums: this.enums,
            });
        }
        getFunc(name) {
            if (this.hasFunc(name)) {
                return this.funcs[name];
            }
            else {
                throw new Error(`Function ${name} not found in registry`);
            }
        }
        hasDef(name) {
            return this.hasFunc(name) || this.hasType(name);
        }
        hasFunc(name) {
            return name in this.funcs;
        }
        hasBasicType(name) {
            return this.basicTypes.includes(name);
        }
        isContainerType(name) {
            return isArrayType(name) || isIterableType(name);
        }
        getInnerType(name) {
            if (isArrayType(name)) {
                return getArrayElementType(name);
            }
            else if (isIterableType(name)) {
                return getIterableElementType(name);
            }
            throw "unreachable";
        }
        hasType(name) {
            while (this.isContainerType(name)) {
                name = this.getInnerType(name);
            }
            return this.hasBasicType(name) || this.hasStruct(name) || this.hasEnum(name);
        }
        hasEnum(name) {
            return name in this.enums;
        }
        hasStruct(name) {
            return name in this.structs;
        }
        getStruct(name) {
            if (this.hasStruct(name)) {
                return this.structs[name];
            }
            else {
                throw new Error(`Struct ${name} not found in registry`);
            }
        }
        getEnum(name) {
            if (this.hasEnum(name)) {
                return this.enums[name];
            }
            else {
                throw new Error(`Enum ${name} not found in registry`);
            }
        }
    }

    class RuntimeScope {
        get top() {
            return this.stack[this.stack.length - 1];
        }
        constructor() {
            this.stack = [{}];
        }
        set(name, value) {
            if (RESERVED.includes(name)) {
                throw new Error(`Cannot use reserved word ${name} as variable name`);
            }
            if (name in this.top) {
                throw new Error(`Variable ${name} already exists`);
            }
            if (!isValidType(value) && !(typeof value === 'function')) {
                throw new Error(`Error setting variable: "${name}". Value: "${JSON.stringify(value)}" doesn't match any valid type.`);
            }
            this.top[name] = value;
        }
        get(name) {
            for (let i = this.stack.length - 1; i >= 0; i--) {
                if (name in this.stack[i]) {
                    return this.stack[i][name];
                }
            }
            throw new Error(`Variable ${name} does not exist`);
        }
        update(name, value) {
            if (!isValidType(value)) {
                throw new Error(`Error updating variable: "${name}". Value: "${JSON.stringify(value)}" doesn't match any valid type.`);
            }
            for (let i = this.stack.length - 1; i >= 0; i--) {
                if (name in this.stack[i]) {
                    this.stack[i][name] = value;
                    return;
                }
            }
            throw new Error(`Variable ${name} does not exist`);
        }
        has(name) {
            for (let i = this.stack.length - 1; i >= 0; i--) {
                if (name in this.stack[i]) {
                    return true;
                }
            }
            return false;
        }
        push() {
            this.stack.push({});
        }
        pop() {
            this.stack.pop();
        }
        isFromRegistry(name) {
            return name in this.stack[0];
        }
    }
    class VM extends EventEmitter$1 {
        constructor(registry, context, source, opts) {
            var _a;
            super();
            this.observer = { expressionStack: [] };
            this.hooks = [];
            this.getExpression = () => {
                return this.observer.expressionStack[this.observer.expressionStack.length - 1];
            };
            this._hookForObserver = async (step, args) => {
                if (step === HOOK_EVENT.BEFORE_EVAL) {
                    this.observer.expressionStack.push(args.node);
                }
                else if (step === HOOK_EVENT.AFTER_EVAL) {
                    this.observer.expressionStack.pop();
                }
            };
            this._hookToEmit = async (step, args) => {
                switch (step) {
                    case HOOK_EVENT.BEFORE_EVAL:
                    case HOOK_EVENT.AFTER_EVAL:
                        this.emit('replay:change', step, args.node, args.error);
                        break;
                }
            };
            this.runHooks = async (eventName, args) => {
                try {
                    for (const hook of this.hooks) {
                        await hook(eventName, { scope: this.scopeStack, context: this.context, ...args });
                    }
                }
                catch (err) {
                    err = handleError(err, this.context.meta, args === null || args === void 0 ? void 0 : args.node);
                    if ((args === null || args === void 0 ? void 0 : args.error) && [HOOK_EVENT.AFTER_EVAL, HOOK_EVENT.AFTER_RUN].includes(eventName)) {
                        err.cause = args === null || args === void 0 ? void 0 : args.error;
                    }
                    throw err;
                }
            };
            this.registry = registry;
            this.context = context;
            this.context.getExpression = this.getExpression;
            this.scopeStack = new RuntimeScope();
            for (let func in registry.funcs) {
                this.scopeStack.set(func, registry.getFunc(func).fn);
            }
            const vars = (_a = opts === null || opts === void 0 ? void 0 : opts.vars) !== null && _a !== void 0 ? _a : [];
            this.tree = (source instanceof Root) ? source : new Root(this.registry, source, { declarations: opts === null || opts === void 0 ? void 0 : opts.vars });
            const declarations = this.tree.declarations;
            for (let v of vars) {
                if (!declarations.has(v.name)) {
                    throw new Error(`No declaration with name ${v.name} found`);
                }
                if (this.scopeStack.has(v.name)) {
                    throw new Error(`Error setting value. Value already set for name ${v.name}`);
                }
                let declaration = declarations.get(v.name);
                if (!matchesDataType(this.tree.scope, declaration.dataType, v.dataType)) {
                    throw new Error(`Error type ${v.dataType} is not compatible with ${declaration.dataType}`);
                }
                if (!isOfType(this.tree.scope, v.value, declaration.dataType)) {
                    throw new Error(`Error setting value. Provided value is not of type ${v.dataType}`);
                }
                this.scopeStack.set(v.name, v.value);
            }
            this.addHook(this._hookForObserver);
            this.addHook(this._hookToEmit);
        }
        interrupt(err) {
            if (!this.interruptReject) {
                throw new Error("Cannot interrupt: VM is not running");
            }
            if (!err) {
                err = new Error("Interrupted");
            }
            this.interruptReject(err);
        }
        addHook(hook) {
            this.hooks.unshift(hook);
        }
        removeHook(hook) {
            const hookIdx = this.hooks.indexOf(hook);
            this.hooks.splice(hookIdx, 1);
        }
        async run() {
            if (!this.tree) {
                console.error('source not set');
                return;
            }
            for (let declaration of this.tree.declarations.list) {
                if (!this.scopeStack.has(declaration.name)) {
                    throw new Error(`Value not set for declaration: ${declaration.name}`);
                }
            }
            let error;
            this.interruptPromise = new Promise((_, rej) => {
                this.interruptReject = rej;
            });
            try {
                await Promise.race([this.interruptPromise, this.runHooks(HOOK_EVENT.BEFORE_RUN)]);
                return await this.tree.evaluate(this);
            }
            catch (err) {
                if (!(err instanceof RunTimeError)) {
                    err = handleError(err, this.context.meta, this.getExpression());
                }
                error = err;
                throw error;
            }
            finally {
                await this.runHooks(HOOK_EVENT.AFTER_RUN, { error });
            }
        }
    }

    const VERSION = 2;

    var Expressions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Accessor: Accessor,
        ArrayExp: ArrayExp,
        Assignment: Assignment,
        Block: Block,
        C: C,
        Clause: Clause,
        Conditional: Conditional,
        Declarations: Declarations,
        Enum: Enum,
        ErrorCodes: ErrorCodes,
        ErrorExp: ErrorExp,
        EventEmitter: EventEmitter$1,
        Expression: Expression,
        For: For,
        FunctionCall: FunctionCall,
        FunctionDefinition: FunctionDefinition,
        HOOK_EVENT: HOOK_EVENT,
        Lambda: Lambda,
        Literal: Literal,
        LogicalOperator: LogicalOperator,
        MapExp: MapExp,
        NodeTypes: NodeTypes,
        Operator: Operator,
        Registry: Registry,
        Return: Return,
        Root: Root,
        RunTimeError: RunTimeError,
        Struct: Struct,
        VERSION: VERSION,
        VM: VM,
        ValidationScope: ValidationScope,
        VariableDeclaration: VariableDeclaration,
        VariableReference: VariableReference,
        While: While,
        escapeDollar: escapeDollar,
        getParamReferences: getParamReferences,
        getReferences: getReferences,
        isArrayType: isArrayType,
        isIterableType: isIterableType,
        isValidName: isValidName,
        parseBlock: parseBlock,
        parseExpression: parseExpression,
        parseStatement: parseStatement
    });

    class EventEmitter {
        constructor() {
            this.__ee_listeners = {};
        }
        emit(name, ...args) {
            (this.__ee_listeners[name] || []).forEach(l => l(...args));
        }
        hasListener(name) {
            return (this.__ee_listeners[name] || []).length > 0;
        }
        off(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            let index = listeners.indexOf(listener);
            while (index >= 0) {
                listeners.splice(index, 1);
                index = listeners.indexOf(listener);
            }
            return this;
        }
        on(name, listener) {
            let listeners = this.__ee_listeners[name];
            if (listeners == void 0) {
                listeners = this.__ee_listeners[name] = [];
            }
            listeners.push(listener);
            return this;
        }
        once(name, listener) {
            const l2 = (...args) => {
                this.off(name, l2);
                listener(...args);
            };
            this.on(name, l2);
            return this;
        }
        reset() {
            this.__ee_listeners = {};
        }
        waitForEvent(name, ...selectors) {
            return new Promise(resolve => {
                const l2 = (...args) => {
                    for (let i = 0, length = selectors.length; i < length; i += 1) {
                        if (selectors[i] !== args[i]) {
                            return;
                        }
                    }
                    resolve(args[0]);
                };
                this.on(name, l2);
            });
        }
    }

    let Player$1 = class Player extends EventEmitter {
        constructor(source, opts) {
            var _a, _b;
            super();
            this.emitChange = (type, node) => {
                let parent = node.parent;
                if (type === 'beforeEval' && (parent instanceof Block || parent instanceof Clause || parent instanceof Conditional)) {
                    this.emit('statusChange', { step: node });
                }
            };
            let registry;
            if (source instanceof Root) {
                registry = source.registry;
            }
            else {
                registry = (_a = opts === null || opts === void 0 ? void 0 : opts.registry) !== null && _a !== void 0 ? _a : this.getNewRegistry();
            }
            this.context = (_b = opts === null || opts === void 0 ? void 0 : opts.context) !== null && _b !== void 0 ? _b : {};
            this.vm = new VM(registry, this.context, source, { vars: opts === null || opts === void 0 ? void 0 : opts.vars });
        }
        getNewRegistry() {
            return new Registry();
        }
        interrupt(err) {
            this.vm.interrupt(err);
        }
        async play() {
            this.vm.on('replay:change', this.emitChange);
            let res = await this.vm.run();
            this.vm.off('replay:change', this.emitChange);
            return res;
        }
    };

    const MAX_TIMEOUT = 60;
    const isSelector = (sel) => {
        return sel.hasOwnProperty('type') && sel.hasOwnProperty('value');
    };
    class BrowserWrapper {
        constructor(browserImpl) {
            this.browserImpl = browserImpl;
        }
        get status_code() {
            return this.browserImpl.status_code;
        }
        set status_code(code) {
            this.browserImpl.status_code = code;
        }
        get body_text_length() {
            return this.browserImpl.body_text_length;
        }
        set body_text_length(length) {
            this.browserImpl.body_text_length = length;
        }
        capTimeout(opts) {
            if (!opts) {
                return;
            }
            if (opts.timeout && opts.timeout > MAX_TIMEOUT) {
                opts.timeout = MAX_TIMEOUT;
            }
        }
        async click(selector, pos, clickOptions) {
            this.capTimeout(clickOptions);
            return this.browserImpl.click(selector, pos, clickOptions);
        }
        async waitForDoc(opts) {
            this.capTimeout(opts);
            const val = await this._waitForDoc(opts);
            if (!(opts === null || opts === void 0 ? void 0 : opts.frame) || opts.frame === 0) {
                try {
                    const bodyTextContent = await this.getElementText({ type: 'css', value: 'body' });
                    this.body_text_length = bodyTextContent.replace(/\s+/g, ' ').trim().length;
                }
                catch (err) {
                    this.body_text_length = 0;
                    const errorMessage = err.message.toLowerCase();
                    const ignoreErrorMessages = [
                        "execution context was destroyed",
                        "cannot find context with specified id"
                    ];
                    if (!ignoreErrorMessages.some((msg) => errorMessage.includes(msg))) {
                        throw err;
                    }
                }
            }
            return val;
        }
        async _waitForDoc(opts) {
            await this.browserImpl.waitForDoc(opts);
            if (opts === null || opts === void 0 ? void 0 : opts.wait_for_redirects) {
                try {
                    await this.waitForDocumentRequest({ frame: opts === null || opts === void 0 ? void 0 : opts.frame, timeout: opts.wait_for_redirects });
                }
                catch (e) {
                    return;
                }
                await this._waitForDoc(opts);
            }
        }
        async waitForDocumentRequest(waitDocReqOpts) {
            this.capTimeout(waitDocReqOpts);
            return this.browserImpl.waitForDocumentRequest(waitDocReqOpts);
        }
        async select(selector, value, selectOpts) {
            this.capTimeout(selectOpts);
            return this.browserImpl.select(selector, value, selectOpts);
        }
        async keypress(code, count, keypressOpts) {
            this.capTimeout(keypressOpts);
            return this.browserImpl.keypress(code, count, keypressOpts);
        }
        async mousemove(selector, position, mousemoveOpts) {
            this.capTimeout(mousemoveOpts);
            return this.browserImpl.mousemove(selector, position, mousemoveOpts);
        }
        async drag(selector, position, targetSelector, targetPos, dragOpts) {
            this.capTimeout(dragOpts);
            return this.browserImpl.drag(selector, position, targetSelector, targetPos, dragOpts);
        }
        async fill(selector, text, typeOpts) {
            this.capTimeout(typeOpts);
            return this.browserImpl.fill(selector, text, typeOpts);
        }
        async focus(selector, focusOpts) {
            this.capTimeout(focusOpts);
            return this.browserImpl.focus(selector, focusOpts);
        }
        async type(selector, text, typeOpts) {
            this.capTimeout(typeOpts);
            return this.browserImpl.type(selector, text, typeOpts);
        }
        async scroll(selector, left, top, scrollOpts) {
            this.capTimeout(scrollOpts);
            return this.browserImpl.scroll(selector, left, top, scrollOpts);
        }
        async open(url, openOpts) {
            this.capTimeout(openOpts);
            return this.browserImpl.open(url, openOpts);
        }
        async getElementsCount(selector, getElementsCountOpts) {
            this.capTimeout(getElementsCountOpts);
            return this.browserImpl.getElementsCount(selector, getElementsCountOpts);
        }
        async getElementText(selector, getElementTextOpts) {
            this.capTimeout(getElementTextOpts);
            try {
                return await this.browserImpl.getElementText(selector, getElementTextOpts);
            }
            catch (err) {
                if (err.message.toLowerCase().includes('failed to find element matching selector')) {
                    return '';
                }
                throw err;
            }
        }
        async getSelectors(selector, getElementTextOpts) {
            this.capTimeout(getElementTextOpts);
            return this.browserImpl.getSelectors(selector, getElementTextOpts);
        }
        async evalOnSelector(selector, func, arg, evalOpts) {
            this.capTimeout(evalOpts);
            return this.browserImpl.evalOnSelector(selector, func, arg, evalOpts);
        }
        async destroy() {
            var _a, _b;
            (_b = (_a = this.browserImpl).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function containsText(text1, text2) {
        return text1.toLowerCase().includes(text2.toLowerCase());
    }
    function getContextStack(expression) {
        const contextStack = [null];
        let curExpression = expression;
        while (curExpression instanceof Expression) {
            if (curExpression instanceof Block && curExpression.name !== C.UNTITLED) {
                contextStack.push(curExpression.name);
            }
            curExpression = curExpression.parent;
        }
        return contextStack;
    }
    function getLocator(tagName, tagList, expression) {
        const contextStack = getContextStack(expression);
        while (contextStack.length > 0) {
            const context = contextStack.pop();
            const tagsInContext = tagList.filter(tag => tag.context === context);
            for (let tag of tagsInContext) {
                if (tag.name === tagName) {
                    if (tag.selectors.length > 0) {
                        return tag.selectors[0];
                    }
                    else {
                        throw new Error(`Tag "${tagName}" in context "${context}" has not selector`);
                    }
                }
            }
        }
        throw new Error(`Tag "${tagName}" not found in context`);
    }
    class ErrorWithCode extends Error {
        constructor(code, message) {
            super(message);
            this.code = code;
        }
        toJSON() {
            return {
                message: this.message,
                code: this.code,
            };
        }
    }
    function getExpressionVars(spec, inputParams = {}) {
        if (!spec.params) {
            return [];
        }
        let vars = [];
        spec.params.forEach(def => {
            let value = inputParams[def.name];
            if (value !== void 0) {
                vars.push({ name: def.name, dataType: def.dataType, value });
            }
            else {
                if (def.default === void 0 || def.default === "" || def.default === null) {
                    throw new ErrorWithCode('E_MISSING_INPUT', `${def.name}'s value is required but not set`);
                }
                vars.push({ name: def.name, dataType: def.dataType, value: def.default });
            }
        });
        return vars;
    }

    const TIME_LIMIT = 30 * 1000;
    function getStepDefs(defOpts) {
        const getSelector = (tagNameOrLocator, context) => {
            if (isSelector(tagNameOrLocator))
                return tagNameOrLocator;
            return getLocator(tagNameOrLocator, context.tagList, context.getExpression());
        };
        const stepDefs = {};
        stepDefs["click"] = {
            name: "click",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                pos: {
                    types: ["position"],
                    default: { x: 0, y: 0 }
                },
                options: {
                    types: ["click_opts"],
                    default: { button: "left", clickCount: 1, delay: 0, frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, pos, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.click(locator, pos, opts);
            },
            labels: ['action']
        };
        stepDefs["wait_doc"] = {
            name: "wait_doc",
            args: {
                options: {
                    types: ["wait_doc_opts"],
                    default: { wait_for_redirects: 0, frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, opts) => {
                await context.browser.waitForDoc(opts);
            },
            labels: ['action']
        };
        stepDefs["select"] = {
            name: "select",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                value: {
                    types: [C.STRING],
                    default: "Enter Select Option"
                },
                options: {
                    types: ["default_opts"],
                    default: { frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, value, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.select(locator, value, opts);
            },
            labels: ['action']
        };
        stepDefs["keypress"] = {
            name: "keypress",
            args: {
                code: {
                    types: ["kb_key"],
                    default: "Enter"
                },
                count: {
                    types: [C.INT],
                    default: 1
                },
                options: {
                    types: ["keypress_opts"],
                    default: { page: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, code, count, opts) => {
                await wait(1000);
                await context.browser.keypress(code, count, opts);
            },
            labels: ['action']
        };
        stepDefs["mousemove"] = {
            name: "mousemove",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                pos: {
                    types: ["position"],
                    default: { x: 0, y: 0 }
                },
                options: {
                    types: ["default_opts"],
                    default: { frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, pos, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.mousemove(locator, pos, opts);
            },
            labels: ['action']
        };
        stepDefs["drag"] = {
            name: "drag",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                pos: {
                    types: ["position"],
                    default: { x: 0, y: 0 }
                },
                targetSelector: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                targetPos: {
                    types: ["position"],
                    default: { x: 0, y: 0 }
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, pos, targetTagNameOrLocator, targetPos, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                let targetLocator = await getSelector(targetTagNameOrLocator, context);
                await context.browser.drag(locator, pos, targetLocator, targetPos, opts);
            },
            labels: ['action']
        };
        stepDefs["fill"] = {
            name: "fill",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? "tag" : "selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                value: {
                    types: [C.STRING],
                    default: "Value to Fill"
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, value, opts) => {
                await wait(1000);
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                await context.browser.fill(locator, value, opts);
            },
            labels: ['action']
        };
        stepDefs["focus"] = {
            name: "focus",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                options: {
                    types: ["default_opts"],
                    default: { frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.focus(locator, opts);
            },
            labels: ['action']
        };
        stepDefs["type"] = {
            name: "type",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                text: {
                    types: [C.STRING],
                    default: "Enter Text"
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, value, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.type(locator, value, opts);
            },
            labels: ['action']
        };
        stepDefs["type_secret"] = {
            name: "type_secret",
            args: {
                'locator': {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                text: {
                    types: [C.SECRET],
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, value, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.type(locator, value, opts);
            },
            labels: ['action']
        };
        stepDefs["scroll"] = {
            name: "scroll",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                left: {
                    types: [C.INT],
                    default: 0
                },
                top: {
                    types: [C.INT],
                    default: 0
                },
                options: {
                    types: ["default_opts"],
                    default: { frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, left, top, opts) => {
                await wait(1000);
                let locator = await getSelector(tagNameOrLocator, context);
                await context.browser.scroll(locator, left, top, opts);
            },
            labels: ['action']
        };
        stepDefs["wait_for_duration"] = {
            name: "wait_for_duration",
            args: {
                duration: {
                    types: [C.INT],
                    default: 1
                }
            },
            returnType: C.VOID,
            fn: async (_context, duration) => {
                await wait(duration * 1000);
            },
            labels: ['action']
        };
        stepDefs["wait_for_element"] = {
            name: "wait_for_element",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                    default: { value: "html", type: "css", meta: {} }
                },
                options: {
                    types: ["default_opts"],
                    default: { frame: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, tagNameOrLocator, opts) => {
                let locator = await getSelector(tagNameOrLocator, context);
                let elementsCount = await context.browser.getElementsCount(locator, opts);
                let timeOut = Date.now() + TIME_LIMIT;
                while (elementsCount === 0 && timeOut > Date.now()) {
                    await wait(500);
                    elementsCount = await context.browser.getElementsCount(locator, opts);
                }
                if (elementsCount === 0) {
                    throw new Error(`No element found for locator: ${locator.value} not found`);
                }
            },
            labels: ['action']
        };
        stepDefs["open"] = {
            name: "open",
            args: {
                url: {
                    types: [C.STRING],
                    default: "https://www.example.com"
                },
                options: {
                    types: ["open_opts"],
                    default: { page: 0, timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, url, opts) => {
                await context.browser.open(url, opts);
            },
            labels: ['action']
        };
        stepDefs["go_back"] = {
            name: "go_back",
            args: {
                opts: {
                    types: ["go_back_opts"],
                    default: { waitUntil: 'load', timeout: 30 },
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: async (context, opts) => {
                await context.browser.goBack(opts);
            },
            labels: ['action']
        };
        stepDefs["assert"] = {
            name: "assert",
            args: {
                "condition": {
                    types: [C.BOOLEAN],
                    default: ['and', ['element_exists']]
                },
                "error_code": {
                    types: ["error_code"],
                    default: 'E_ASSERTION_FAILED'
                },
                "message": {
                    types: [C.STRING],
                    default: '',
                    optional: true
                }
            },
            returnType: C.VOID,
            fn: (_context, condition, errorCode, message) => {
                if (!message) {
                    message = `Assertion Failed`;
                }
                if (!condition) {
                    throw new ErrorWithCode(errorCode, message);
                }
            },
            labels: ['action', 'utils']
        };
        stepDefs["range"] = {
            name: "range",
            args: {
                to: {
                    types: [C.INT],
                    default: 10
                },
                from: {
                    types: [C.INT],
                    optional: true,
                    default: 0,
                },
                step: {
                    types: [C.INT],
                    optional: true,
                    default: 1,
                },
            },
            returnType: `iterable<${C.INT}>`,
            fn: async (_context, to, from, step) => new RangeIterator({ to, from, step }),
            labels: ['utils']
        };
        stepDefs["panic"] = {
            name: "panic",
            args: {
                "condition": {
                    types: [C.BOOLEAN],
                    default: ['and', ['element_exists']]
                },
                "error_code": {
                    types: ["error_code"],
                    default: 'E_REQUEST_FORBIDDEN',
                },
                "message": {
                    types: [C.STRING],
                    default: '',
                }
            },
            returnType: C.VOID,
            fn: (_context, condition, errorCode, message) => {
                if (condition) {
                    throw new ErrorWithCode(errorCode, message);
                }
            },
            labels: ['action', 'utils']
        };
        stepDefs["get_response"] = {
            name: "get_response",
            returnType: "response",
            args: {},
            fn: (context) => {
                return {
                    status_code: context.browser.status_code,
                    body_text_length: context.browser.body_text_length
                };
            }
        };
        stepDefs["length"] = {
            name: "length",
            args: {
                str: {
                    types: [C.STRING],
                },
            },
            returnType: C.INT,
            fn: async (_context, str) => {
                return str.length;
            },
            labels: ['utils']
        };
        stepDefs["lower"] = {
            name: "lower",
            args: {
                str: {
                    types: [C.STRING],
                },
            },
            returnType: C.STRING,
            fn: async (_context, str) => {
                return str.toLowerCase();
            },
            labels: ['utils']
        };
        stepDefs["upper"] = {
            name: "upper",
            args: {
                str1: {
                    types: [C.STRING],
                },
            },
            returnType: C.STRING,
            fn: async (_context, str) => {
                return str.toUpperCase();
            },
            labels: ['utils']
        };
        stepDefs["trim"] = {
            name: "trim",
            args: {
                str: {
                    types: [C.STRING],
                },
                pos: {
                    types: [C.STRING],
                    optional: true,
                },
            },
            returnType: C.STRING,
            fn: async (_context, str, pos = 'BOTH') => {
                if (pos === 'LEADING') {
                    return str.trimStart();
                }
                else if (pos === 'TRAILING') {
                    return str.trimEnd();
                }
                return str.trim();
            },
            labels: ['utils']
        };
        stepDefs["substring"] = {
            name: "substring",
            args: {
                str: {
                    types: [C.STRING],
                },
                startPos: {
                    types: [C.INT],
                },
                endPos: {
                    types: [C.INT],
                },
            },
            returnType: C.STRING,
            fn: async (_context, str, startPos, endPos) => {
                return str.slice(startPos, endPos);
            },
            labels: ['utils']
        };
        stepDefs["join"] = {
            name: "join",
            args: {
                val: {
                    types: ['array<string>'],
                },
                seperator: {
                    types: [C.STRING],
                    optional: true,
                },
            },
            returnType: C.STRING,
            fn: async (_context, val, seperator = '') => {
                return val.join(seperator);
            },
            labels: ['utils']
        };
        stepDefs["re_match"] = {
            name: "re_match",
            args: {
                str: {
                    types: [C.STRING],
                },
                pattern: {
                    types: [C.STRING],
                },
                flags: {
                    types: [C.STRING],
                    optional: true,
                },
            },
            returnType: "array<string>",
            fn: async (_context, str, pattern, flags = 'g') => {
                const regex = new RegExp(pattern, flags);
                const matches = str.match(regex);
                return matches ? matches : [];
            },
            labels: ['utils']
        };
        stepDefs["re_replace"] = {
            name: "re_replace",
            args: {
                str: {
                    types: [C.STRING],
                },
                pattern: {
                    types: [C.STRING],
                },
                replacement: {
                    types: [C.STRING],
                },
                start: {
                    types: [C.INT],
                    optional: true,
                },
                N: {
                    types: [C.INT],
                    optional: true,
                },
                flags: {
                    types: [C.STRING],
                    optional: true,
                },
            },
            returnType: C.STRING,
            fn: async (_context, str, pattern, replacement, start = 0, N = -1, flags = '') => {
                if (!flags.includes('g')) {
                    flags += 'g';
                }
                const regex = new RegExp(pattern, flags);
                const limitedReplace = (str, limit) => {
                    return str.replace(regex, (match) => {
                        return (limit--) > 0 ? replacement : match;
                    });
                };
                if (start > 0) {
                    const before = str.substring(0, start);
                    let after = str.substring(start);
                    after = (N >= 0) ? limitedReplace(after, N) : after.replace(regex, replacement);
                    return before + after;
                }
                else {
                    return (N >= 0) ? limitedReplace(str, N) : str.replace(regex, replacement);
                }
            },
            labels: ['utils']
        };
        stepDefs["index"] = {
            name: "index",
            args: {
                val: {
                    types: ['array<string>'],
                },
                index: {
                    types: [C.INT],
                },
            },
            returnType: C.STRING,
            fn: async (_context, val, index = -1) => {
                if (index < 0 || index >= val.length) {
                    throw new Error("Invalid argument: index out of bounds");
                }
                return val[index];
            },
            labels: ['utils']
        };
        stepDefs["element_text"] = {
            name: "element_text",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.STRING,
            fn: async (context, tagNameOrLocator, opts) => {
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                return await context.browser.getElementText(locator, opts);
            },
            labels: ['element']
        };
        stepDefs["element_attr"] = {
            name: "element_attr",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                },
                attr: {
                    types: [C.STRING]
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.STRING,
            fn: async (context, tagNameOrLocator, attr, opts) => {
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                return await context.browser.evalOnSelector(locator, (el, arg) => { var _a; return (_a = el.getAttribute(arg.attr)) !== null && _a !== void 0 ? _a : ''; }, { attr }, opts);
            },
            labels: ['element']
        };
        stepDefs["element_prop"] = {
            name: "element_prop",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                },
                prop: {
                    types: [C.STRING]
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.STRING,
            fn: async (context, tagNameOrLocator, prop, opts) => {
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                return await context.browser.evalOnSelector(locator, (el, arg) => { var _a; return (_a = el[arg.prop]) !== null && _a !== void 0 ? _a : ''; }, { prop }, opts);
            },
            labels: ['element']
        };
        return stepDefs;
    }
    function getConditionDefs(defOpts) {
        const conditionDefs = {};
        conditionDefs["element_exists"] = {
            name: "element_exists",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"],
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.BOOLEAN,
            fn: async (context, tagNameOrLocator, opts) => {
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                let elementsCount = await context.browser.getElementsCount(locator, opts);
                return elementsCount > 0;
            },
            labels: ['element']
        };
        conditionDefs["element_has_text"] = {
            name: "element_has_text",
            args: {
                [(defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? 'tag' : 'locator']: {
                    types: (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? ["tag", "selector"] : ["selector"]
                },
                text: {
                    types: [C.STRING],
                    default: "Search Text"
                },
                options: {
                    types: ["default_opts"],
                    optional: true
                }
            },
            returnType: C.BOOLEAN,
            fn: async (context, tagNameOrLocator, text, opts = {}) => {
                let locator = (defOpts === null || defOpts === void 0 ? void 0 : defOpts.tagMode) ? getLocator(tagNameOrLocator, context.tagList, context.getExpression()) : tagNameOrLocator;
                opts.state = 'attached';
                let elementText = await context.browser.getElementText(locator, opts);
                return containsText(elementText, text);
            },
            labels: ['element']
        };
        conditionDefs["lt"] = {
            name: "lt",
            args: {
                num1: {
                    types: [C.FLOAT],
                },
                num2: {
                    types: [C.FLOAT],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, num1, num2) => num1 < num2,
        };
        conditionDefs["lte"] = {
            name: "lte",
            args: {
                num1: {
                    types: [C.FLOAT],
                },
                num2: {
                    types: [C.FLOAT],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, num1, num2) => num1 <= num2,
        };
        conditionDefs["gt"] = {
            name: "gt",
            args: {
                num1: {
                    types: [C.FLOAT],
                },
                num2: {
                    types: [C.FLOAT],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, num1, num2) => num1 > num2,
        };
        conditionDefs["gte"] = {
            name: "gte",
            args: {
                num1: {
                    types: [C.FLOAT],
                },
                num2: {
                    types: [C.FLOAT],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, num1, num2) => num1 >= num2,
        };
        conditionDefs["eq"] = {
            name: "eq",
            args: {
                num1: {
                    types: [C.FLOAT],
                },
                num2: {
                    types: [C.FLOAT],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, num1, num2) => num1 === num2,
        };
        conditionDefs["contains"] = {
            name: "contains",
            args: {
                str1: {
                    types: [C.STRING],
                },
                str2: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, str2) => str1.includes(str2),
        };
        conditionDefs["not_contains"] = {
            name: "not_contains",
            args: {
                str1: {
                    types: [C.STRING],
                },
                str2: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, str2) => !str1.includes(str2),
        };
        conditionDefs["starts_with"] = {
            name: "starts_with",
            args: {
                str1: {
                    types: [C.STRING],
                },
                str2: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, str2) => str1.startsWith(str2),
        };
        conditionDefs["not_starts_with"] = {
            name: "not_starts_with",
            args: {
                str1: {
                    types: [C.STRING],
                },
                str2: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, str2) => !str1.startsWith(str2),
        };
        conditionDefs["ends_with"] = {
            name: "ends_with",
            args: {
                str: {
                    types: [C.STRING],
                },
                target: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str, target) => {
                return str.endsWith(target);
            },
        };
        conditionDefs["not_ends_with"] = {
            name: "not_ends_with",
            args: {
                str: {
                    types: [C.STRING],
                },
                target: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str, target) => {
                return !str.endsWith(target);
            },
        };
        conditionDefs["is_empty"] = {
            name: "is_empty",
            args: {
                str1: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1) => (!str1 || str1.length === 0),
        };
        conditionDefs["not_is_empty"] = {
            name: "not_is_empty",
            args: {
                str1: {
                    types: [C.STRING],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1) => ((str1 === null || str1 === void 0 ? void 0 : str1.length) > 0),
        };
        conditionDefs["match_regex"] = {
            name: "match_regex",
            args: {
                str1: {
                    types: [C.STRING],
                },
                regex: {
                    types: ['regex'],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, regex) => str1.match(new RegExp(regex.expr, regex.flags)),
        };
        conditionDefs["not_match_regex"] = {
            name: "not_match_regex",
            args: {
                str1: {
                    types: [C.STRING],
                },
                regex: {
                    types: ['regex'],
                },
            },
            returnType: C.BOOLEAN,
            fn: async (_context, str1, regex) => !str1.match(new RegExp(regex.expr, regex.flags)),
        };
        return conditionDefs;
    }
    const structDefs = {};
    structDefs["selector"] = {
        name: "selector",
        fields: {
            value: {
                types: [C.STRING],
                default: "html",
            },
            type: {
                types: ["selector_type"],
                default: "css",
            },
            meta: {
                types: [C.JSON],
                default: {},
                optional: true,
            },
        },
        iterator: {
            type: "selector",
            iter: async (context, selector) => {
                return await context.browser.getSelectors(selector);
            }
        }
    };
    structDefs["position"] = {
        name: "position",
        fields: {
            x: {
                types: [C.FLOAT],
                default: 0,
            },
            y: {
                types: [C.FLOAT],
                default: 0,
            }
        },
    };
    structDefs["frame_locator"] = {
        name: "frame_locator",
        fields: {
            index: {
                types: [C.INT],
                default: 0,
                optional: true,
            },
            name: {
                types: [C.STRING],
                default: "",
                optional: true,
            },
            page: {
                types: [C.INT],
                default: 0,
                optional: true,
            }
        },
    };
    structDefs["default_opts"] = {
        name: "options",
        fields: {
            frame: {
                types: [C.INT, "frame_locator"],
                default: 0,
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 30,
                optional: true,
            }
        },
    };
    structDefs["wait_doc_opts"] = {
        name: "options",
        fields: {
            wait_for_redirects: {
                types: [C.INT],
                default: 0,
                optional: true
            },
            frame: {
                types: [C.INT, "frame_locator"],
                default: 0,
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 30,
                optional: true,
            }
        }
    };
    structDefs["click_opts"] = {
        name: "options",
        fields: {
            frame: {
                types: [C.INT, "frame_locator"],
                default: 0,
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 30,
                optional: true,
            },
            button: {
                types: ["mouse_button"],
                default: "left",
                optional: true,
            },
            clickCount: {
                types: [C.INT],
                default: 1,
                optional: true,
            },
            delay: {
                types: [C.INT],
                default: 0,
                optional: true,
            }
        },
    };
    structDefs["keypress_opts"] = {
        name: "options",
        fields: {
            page: {
                types: [C.INT],
                default: 0,
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 30,
                optional: true,
            }
        },
    };
    structDefs["open_opts"] = {
        name: "options",
        fields: {
            page: {
                types: [C.INT],
                default: 0,
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 30,
                optional: true,
            }
        },
    };
    structDefs["response"] = {
        name: "response",
        fields: {
            status_code: {
                types: [C.INT]
            },
            body_text_length: {
                types: [C.INT]
            }
        }
    };
    structDefs["regex"] = {
        name: "regex",
        fields: {
            expr: {
                types: [C.STRING],
            },
            flags: {
                types: [C.STRING],
                optional: true,
            },
        },
    };
    class RangeIterator {
        constructor({ to, from = 0, step = 1 }) {
            this.current = from;
            this.to = to;
            this.step = step;
            if (step === 0) {
                throw new Error("Step cannot be 0");
            }
            this.condition = this.step > 0 ? this.lt : this.gt;
        }
        gt(a, b) {
            return a > b;
        }
        lt(a, b) {
            return a < b;
        }
        next() {
            if (this.condition(this.current, this.to)) {
                const result = { done: false, value: this.current };
                this.current = this.current + this.step;
                return result;
            }
            else {
                return { done: true, value: null };
            }
        }
        [Symbol.iterator]() {
            return this;
        }
    }
    structDefs["go_back_opts"] = {
        name: "options",
        fields: {
            waitUntil: {
                types: [C.STRING],
                default: 'load',
                optional: true,
            },
            timeout: {
                types: [C.INT],
                default: 60,
                optional: true,
            }
        },
    };
    const enumDefs = {};
    enumDefs["selector_type"] = {
        name: "selector_type",
        enumType: 'string',
        values: ['css', 'xpath'],
    };
    enumDefs["kb_key"] = {
        name: "kb_key",
        enumType: 'string',
        values: ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Backspace', 'Delete', 'Enter', 'Escape', 'Tab']
    };
    enumDefs["mouse_button"] = {
        name: "mouse_button",
        enumType: 'string',
        values: ['left', 'right', 'middle', 'forward', 'back'],
    };
    enumDefs["error_code"] = {
        name: "error_code",
        enumType: 'string',
        values: [
            'E_ASSERT',
            'E_CAPTCHA',
            'E_ELEMENT_NOT_FOUND',
            'E_REQUEST',
            'E_REQUEST_BAD_GATEWAY',
            'E_REQUEST_FORBIDDEN',
            'E_REQUEST_INTERNAL_SERVER_ERROR',
            'E_REQUEST_NOT_FOUND',
            'E_REQUEST_SERVICE_UNAVAILABLE',
            'E_REQUEST_TOO_MANY_REQUESTS',
            'E_REQUEST_UNAUTHORIZED',
            'E_TIMED_OUT',
            'E_UNKNOWN'
        ]
    };

    const stepDefs = getStepDefs();
    const conditionDefs = getConditionDefs();
    const builtInDeclarations = [
        { name: 'start_url', dataType: 'string', builtIn: true },
    ];

    function parseSteps(initialSteps, opts) {
        if (!opts) {
            opts = {};
        }
        if (!opts.declarations) {
            opts.declarations = [];
        }
        opts.declarations = [...opts.declarations, ...builtInDeclarations];
        return new Root(createRegistry(), initialSteps, opts);
    }
    function createRegistry() {
        return new Registry({
            funcs: { ...stepDefs, ...conditionDefs },
            structs: { ...structDefs },
            enums: { ...enumDefs },
        });
    }

    class Player extends Player$1 {
        constructor(source, browser, opts) {
            super(source, { ...opts, context: { ...opts === null || opts === void 0 ? void 0 : opts.context, browser: new BrowserWrapper(browser) } });
        }
        getNewRegistry() {
            return createRegistry();
        }
    }

    var ExpressionLibs = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BrowserWrapper: BrowserWrapper,
        MAX_TIMEOUT: MAX_TIMEOUT,
        Player: Player,
        builtInDeclarations: builtInDeclarations,
        conditionDefs: conditionDefs,
        enumDefs: enumDefs,
        isSelector: isSelector,
        parseSteps: parseSteps,
        stepDefs: stepDefs,
        structDefs: structDefs
    });

    var ExpressionLibsCommon = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BrowserWrapper: BrowserWrapper,
        getExpressionVars: getExpressionVars
    });

    var _virtual_index = { ...Expressions, ...ExpressionLibs, ...ExpressionLibsCommon};

    return _virtual_index;

}));

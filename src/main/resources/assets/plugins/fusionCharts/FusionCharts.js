/*!
 * FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * @license License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts
 * @version 3.2.1-release
 *
 * Third-party attributions:
 * SWFObject v2.2 <http://code.google.com/p/swfobject/>
 * JSON v2 <http://www.JSON.org/js.html>
 * Firebug Lite 1.3.0 <http://getfirebug.com/firebuglite>
 * jQuery 1.4.2 <http://jquery.com/>
 */
(function () {
    if (typeof window.FusionCharts !== 'undefined') {
        return
    }
    var f = {}, modules = {},
        argsT = ['swfUrl', 'id', 'width', 'height', 'debugMode', 'registerWithJS', 'bgColor', 'scaleMode', 'lang', 'detectFlashVersion', 'autoInstallRedirect'];
    f.extend = function (a, b) {
        var c = typeof arguments[arguments.length - 1] === 'boolean' ? arguments[arguments.length - 1] : false;
        var d = b, snk = a;
        if (typeof b === 'boolean' || arguments.length === 1) {
            snk = f.core;
            d = a
        }
        if (c === true) {
            snk = snk.prototype
        }
        for (var e in d) {
            snk[e] = d[e]
        }
        return snk
    };
    f.uniqueId = function () {
        return 'chartobject-' + (f.uniqueId.lastId += 1)
    };
    f.uniqueId.lastId = 0;
    f.policies = {
        options: {
            product: ['product', 'v3'],
            insertMode: ['insertMode', 'replace'],
            safeMode: ['safeMode', true],
            overlayButton: ['overlayButton', undefined]
        }, attributes: {
            lang: ['lang', 'EN'], 'class': ['className', 'FusionCharts']
        }, width: ['width', '400'], height: ['height', '300'], src: ['swfUrl', ''], __state: {}
    };
    f.parsePolicies = function (a, b, c) {
        var d, policy, value;
        for (policy in b) {
            if (f.policies[policy] instanceof Array) {
                value = c[b[policy][0]];
                a[policy] = value === undefined ? b[policy][1] : value;
                continue
            }
            if (typeof a[policy] !== 'object') {
                a[policy] = {}
            }
            for (d in b[policy]) {
                value = c[b[policy][d][0]];
                a[policy][d] = value === undefined ? b[policy][d][1] : value
            }
        }
    };
    f.core = function (a) {
        if (!(this instanceof f.core)) {
            if (arguments.length === 1 && a instanceof Array && a[0] === 'private') {
                if (modules[a[1]] === true) {
                    return undefined
                }
                modules[a[1]] = true;
                return f
            }
            if (arguments.length === 1 && typeof a === 'string') {
                return f.core.items[a]
            }
            f
                .raiseError(this, '25081840', 'run', '', new SyntaxError("Use the \"new\" keyword while creating a new FusionCharts object"))
        }
        var b = {}, prop;
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            b = arguments[0]
        } else {
            for (prop in argsT) {
                b[argsT[prop]] = arguments[prop]
            }
        }
        if (typeof arguments[arguments.length - 1] === 'object') {
            delete b[arguments.length - 1];
            f.extend(b, arguments[arguments.length - 1])
        }
        this.id = typeof b.id === 'undefined' ? this.id = f.uniqueId() : b.id;
        this.args = b;
        if (f.core.items[this.id] instanceof f.core) {
            this.id = f.uniqueId();
            f.raiseWarning(this, '06091847', 'param', '', 'A FusionChart oject with the specified id \"' + this.id + '\" already exists. Renaming it to ' + this.id)
        }
        f.parsePolicies(this, f.policies, b);
        this.resizeTo(b.width, b.height, true);
        f.raiseEvent('BeforeInitialize', b, this);
        f.core.items[this.id] = this;
        f.raiseEvent('Initialized', b, this);
        return this
    };
    f.core.prototype = {};
    f.core.prototype.constructor = f.core;
    f.extend({
        id: 'FusionCharts', version: [3, 2, 1, 'release', 1750], items: {}, options: {}, getObjectReference: function (a) {
            return f.core.items[a].ref
        }
    }, false);
    window.FusionCharts = f.core
}());
(function () {
    var f = FusionCharts(['private', 'EventManager']);
    if (f === undefined) {
        return
    }
    window.FusionChartsEvents = {
        BeforeInitialize: 'beforeinitialize',
        Initialized: 'initialized',
        Loaded: 'loaded',
        Rendered: 'rendered',
        DataLoadRequested: 'dataloadrequested',
        DataLoadRequestCancelled: 'dataloadrequestcancelled',
        DataLoadRequestCompleted: 'dataloadrequestcompleted',
        BeforeDataUpdate: 'beforedataupdate',
        DataUpdateCancelled: 'dataupdatecancelled',
        DataUpdated: 'dataupdated',
        DataLoadCancelled: 'dataloadcancelled',
        DataLoaded: 'dataloaded',
        DataLoadError: 'dataloaderror',
        NoDataToDisplay: 'nodatatodisplay',
        DataXMLInvalid: 'dataxmlinvalid',
        InvalidDataError: 'invaliddataerror',
        DrawComplete: 'drawcomplete',
        Resized: 'resized',
        BeforeDispose: 'beforedispose',
        Disposed: 'disposed'
    };
    var g = function (a, b, c, d) {
        try {
            a[0].call(b, c, d || {})
        } catch (e) {
            setTimeout(function () {
                throw e;
            }, 0)
        }
    };
    var h = function (a, b, c) {
        if (!(a instanceof Array)) {
            return
        }
        var i = 0, scope;
        for (; i < a.length; i += 1) {
            if (a[i][1] === b.sender || a[i][1] === undefined) {
                scope = a[i][1] === b.sender ? b.sender : f.core;
                g(a[i], scope, b, c)
            }
            if (b.cancel === true) {
                break
            }
        }
    };
    var j = {
        listeners: {}, lastEventId: 0, addListener: function (a, b, c) {
            if (a instanceof Array) {
                for (var i = 0; i < a.length; i += 1) {
                    j.addListener(a[i], b, c)
                }
                return
            }
            if (typeof a !== 'string') {
                f.raiseError(this, '03091549', 'param', '::EventTarget.addListener', new Error('Unspecified Event Type'));
                return
            }
            if (typeof b !== 'function') {
                f.raiseError(this, '03091550', 'param', '::EventTarget.addListener', new Error('Invalid Event Listener'));
                return
            }
            a = a.toLowerCase();
            if (!(j.listeners[a] instanceof Array)) {
                j.listeners[a] = []
            }
            j.listeners[a].push([b, c])
        }, removeListener: function (a, b, c) {
            var i;
            if (a instanceof Array) {
                for (i = 0; i < a.length; i += 1) {
                    j.removeListener(a[i], b, c)
                }
                return
            }
            if (typeof a !== 'string') {
                f.raiseError(this, '03091559', 'param', '::EventTarget.removeListener', new Error('Unspecified Event Type'));
                return
            }
            if (typeof b !== 'function') {
                f.raiseError(this, '03091560', 'param', '::EventTarget.removeListener', new Error('Invalid Event Listener'));
                return
            }
            a = a.toLowerCase();
            var d = j.listeners[a];
            if (!(d instanceof Array)) {
                return
            }
            for (i = 0; i < d.length; i += 1) {
                if (d[i][0] === b && d[i][1] === c) {
                    d.splice(i, 1);
                    i -= 1
                }
            }
        }, triggerEvent: function (a, b, c) {
            if (typeof a !== 'string') {
                f.raiseError(this, '03091602', 'param', '::EventTarget.dispatchEvent', new Error('Invalid Event Type'));
                return undefined
            }
            a = a.toLowerCase();
            var d = {
                eventType: a,
                eventId: (j.lastEventId += 1),
                sender: (typeof b === 'string' ? f.core.items[b] : b),
                stopPropagation: function () {
                    return (this.cancel = true) === false
                }
            };
            h(j.listeners[a], d, c);
            h(j.listeners['*'], d, c);
            return true
        }
    };
    f.raiseEvent = function (a, b, c) {
        return j.triggerEvent(a, (c === undefined ? f.core : c), b)
    };
    f.addEventListener = function (a, b) {
        return j.addListener(a, b)
    };
    f.removeEventListener = function (a, b) {
        return j.removeListener(a, b)
    };
    f.extend({
        addEventListener: f.addEventListener, removeEventListener: f.removeEventListener
    }, false);
    f.extend({
        addEventListener: function (a, b) {
            return j.addListener(a, b, this)
        }, removeEventListener: function (a, b) {
            return j.removeListener(a, b, this)
        }
    }, true);
    f.addEventListener('BeforeDispose', function (e) {
        var a, i;
        for (a in j.listeners) {
            for (i = 0; i < j.listeners[a].length; i += 1) {
                if (j.listeners[a][i][1] === e.sender) {
                    j.listeners[a].splice(i, 1)
                }
            }
        }
    })
}());
(function () {
    var i = FusionCharts(['private', 'ErrorHandler']);
    if (i === undefined) {
        return
    }
    var j = 'text';
    var k = {
        type: 'TypeException',
        range: 'ValueRangeException',
        impl: 'NotImplementedException',
        param: 'ParameterException',
        run: 'RuntimeException',
        comp: 'DesignTimeError',
        'undefined': 'UnspecifiedException'
    };
    var l = function (a, b, c, d, e, f) {
        var g = '#' + b + ' ' + a.id + d + ' ' + f + ' >> ';
        if (e instanceof Error) {
            e.name = k[c];
            e.module = 'FusionCharts' + d;
            e.level = f;
            e.message = g + e.message;
            g = e.message;
            window.setTimeout(function () {
                throw e;
            }, 0)
        } else {
            g = g + e
        }
        var h = {
            id: b, nature: k[c], source: 'FusionCharts' + d, message: g
        };
        i.raiseEvent(f, h, a);
        if (typeof window['FC_' + f] === 'function') {
            window['FC_' + f](h)
        }
    };
    i.raiseError = function (a, b, c, d, e) {
        l(a, b, c, d, e, 'Error')
    };
    i.raiseWarning = function (a, b, c, d, e) {
        l(a, b, c, d, e, 'Warning')
    };
    var m = {
        outputHelpers: {
            'text': function (e, a) {
                var b = (e.sender.id || e.sender).toString();
                m
                    .outputTo('#' + e.eventId + ' [' + b + '] fired "' + e.eventType + '" event. ' + (e.eventType === 'error' || e.eventType === 'warning' ? a.message : ''))
            }, 'event': function (e, a) {
                this.outputTo(e, a)
            }, 'verbose': function (e, a) {
                m.outputTo(e.eventId, e.sender.id, e.eventType, a)
            }
        }, outputHandler: function (e, a) {
            if (typeof m.outputTo !== 'function') {
                i.core.debugMode.outputFailed = true;
                return
            }
            i.core.debugMode.outputFailed = false;
            m.currentOutputHelper(e, a)
        }, currentOutputHelper: undefined, outputTo: undefined, enabled: false
    };
    m.currentOutputHelper = m.outputHelpers[j];
    i
        .extend({
            debugMode: {
                outputFormat: function (a) {
                    if (a && typeof a.toLowerCase === 'function' && typeof m.outputHelpers[a = a
                        .toLowerCase()] === 'function') {
                        m.currentOutputHelper = m.outputHelpers[a];
                        return true
                    }
                    return false
                }, outputTo: function (a) {
                    if (typeof a === 'function') {
                        m.outputTo = a
                    } else if (a === null) {
                        i.core.debugMode.enabled(false);
                        delete m.outputTo
                    }
                }, enabled: function (a, b, c) {
                    if (typeof a === 'function') {
                        if (typeof b === 'string' && arguments.length === 2) {
                            c = b
                        }
                        b = a;
                        a = true
                    }
                    if (typeof a === 'boolean' && a !== m.enabled) {
                        i.core[(m.enabled = a) ? 'addEventListener' : 'removeEventListener']('*', m.outputHandler)
                    }
                    if (typeof b === 'function') {
                        m.outputTo = b
                    }
                    i.core.debugMode.outputFormat(c);
                    return m.enabled
                }, _enableFirebugLite: function (a) {
                    if (window.console && window.console.firebug) {
                        i.core.debugMode.enabled(console.log, 'verbose');
                        return
                    }
                    var b = document.createElement('script');
                    b.type = 'text/javascript';
                    b.src = typeof a === 'string' ? a : i.core.options.scriptBaseUri + 'firebug-lite.js';
                    b['\v' === 'v' ? 'text' : 'innerHTML'] = '{ startOpened: true }';
                    b.onload = function () {
                        i.core.debugMode.enabled(console.log, 'verbose')
                    };
                    b.onreadystatechange = function () {
                        if (this.readyState === 'complete' || this.readyState === 'loaded') {
                            i.core.debugMode.enabled(console.log, 'verbose')
                        }
                    };
                    document.getElementsByTagName('head')[0]
                        .appendChild(b)
                }
            }
        }, false)
}());
(function () {
    var f = FusionCharts(['private', 'RendererManager']);
    if (f === undefined) {
        return
    }
    f.policies.options.containerElementId = ['renderAt', undefined];
    f.policies.options.renderer = ['renderer', undefined];
    var g = function () {
        f.raiseError(this, '25081845', 'run', '::RendererManager', new Error('No active renderer'));
        return
    };
    var h = {
        'undefined': {
            render: g, update: g, resize: g, config: g, policies: {}
        }
    }, store = {};
    f.renderer = {
        register: function (a, b) {
            if (!a || typeof a.toString !== 'function') {
                throw "#03091436 ~renderer.register() Invalid value for renderer name.";
            }
            a = a.toString().toLowerCase();
            if (h[a] !== undefined) {
                f.raiseError(f.core, '03091438', 'param', '::RendererManager>register', 'Duplicate renderer name specified in "name"');
                return false
            }
            h[a] = b;
            return true
        }, setDefault: function (a) {
            if (!a || typeof a.toString !== 'function') {
                f.raiseError(f.core, '25081731', 'param', '::RendererManager>setDefault', 'Invalid renderer name specified in "name"');
                return false
            }
            if (h[a = a.toString().toLowerCase()] === undefined) {
                f.raiseError(f.core, '25081733', 'range', '::RendererManager>setDefault', 'The specified renderer does not exist.');
                return false
            }
            f.policies.options.renderer = ['renderer', a];
            return true
        }, getRenderer: function (a) {
            return h[a]
        }, getRendererPolicy: function (a) {
            var b = h[a].policies;
            return typeof b === 'object' ? b : {}
        }, currentRendererName: function () {
            return f.policies.options.renderer[1]
        }, update: function (a) {
            store[a.id].update.apply(a, Array.prototype.slice
                .call(arguments, 1))
        }, render: function (a) {
            store[a.id].render.apply(a, Array.prototype.slice
                .call(arguments, 1))
        }, resize: function (a) {
            store[a.id].resize.apply(a, Array.prototype.slice
                .call(arguments, 1))
        }, config: function (a) {
            store[a.id].config.apply(a, Array.prototype.slice
                .call(arguments, 1))
        }
    };
    var j = function (a) {
        return function () {
            if (this.ref === undefined || this.ref === null || typeof this.ref[a] !== 'function') {
                f
                    .raiseError(this, '25081617', 'run', '~' + a + '()', 'ExternalInterface call failed. Check whether chart has been rendered.');
                return undefined
            }
            return this.ref[a].apply(this.ref, arguments)
        }
    };
    f.addEventListener('BeforeInitialize', function (a) {
        var b = a.sender;
        if (typeof b.options.renderer === 'string' && h[b.options.renderer.toLowerCase()] === undefined) {
            b.options.renderer = f.policies.options.renderer[1]
        }
        b.options.renderer = b.options.renderer.toLowerCase();
        store[b.id] = h[b.options.renderer];
        if (store[b.id].initialized !== true && typeof store[b.id].init === 'function') {
            store[b.id].init();
            store[b.id].initialized = true
        }
        f.parsePolicies(b, store[b.id].policies || {}, b.args);
        for (var c in store[b.id].prototype) {
            b[c] = store[b.id].prototype[c]
        }
    });
    f.addEventListener('Loaded', function (e) {
        var a = e.sender, chartObj = e.sender.ref;
        if (a instanceof f.core) {
            delete a.__state.rendering
        }
        if (chartObj === undefined || chartObj === null || typeof chartObj.getExternalInterfaceMethods !== 'function') {
            return
        }
        var b = chartObj.getExternalInterfaceMethods().split(','), i;
        for (i = 0; i < b.length; i += 1) {
            if (a[b[i]] === undefined) {
                a[b[i]] = j(b[i])
            }
        }
    });
    var k = function (a, b) {
        var c = document.getElementById(a), containerId = b.getAttribute('id');
        if (c === null) {
            return false
        }
        if (a === containerId) {
            return true
        }
        var d = b.getElementsByTagName('*');
        for (var i = 0; i < d.length; i += 1) {
            if (d[i] === c) {
                return false
            }
        }
        return true
    };
    var l = function (a) {
        if (a.success === false) {
            f
                .raiseError(f.core.items[a.id], '25081850', 'run', '::RendererManager', new Error('There was an error rendering the chart. ' + 'Enable FusionCharts JS debugMode for more information.'))
        }
        f.core.items[a.id].ref = a.ref;
        if (a.ref) {
            a.ref.FusionCharts = f.core.items[a.id]
        }
        f.raiseEvent('internal.DOMElementCreated', a, f.core.items[a.id])
    };
    f
        .extend({
            render: function (a) {
                if (window[this.id] !== undefined) {
                    f
                        .raiseError(this, '25081843', 'comp', '.render', new Error('#25081843:IECompatibility() Chart ' + 'Id is same as a JavaScript variable name. Variable naming ' + 'error. Please use unique name for chart JS variable, ' + 'chart-id and container id.'))
                }
                var b = document.createElement('span');
                if (a === undefined) {
                    a = this.options.containerElementId
                }
                if (typeof a === 'string') {
                    a = document.getElementById(a)
                }
                if (a === undefined || a === null) {
                    f
                        .raiseError(this, '03091456', 'run', '.render()', new Error("Unable to find the container DOM element."));
                    return this
                }
                if (k(this.id, a)) {
                    f.raiseError(this, '05102109', 'run', '.render()', new Error("A duplicate object already exists with the specific Id: " + this.id));
                    return this
                }
                b.setAttribute('id', this.id);
                if (this.options.insertMode === 'replace') {
                    while (a.hasChildNodes()) {
                        a.removeChild(a.firstChild)
                    }
                }
                a.appendChild(b);
                this.options.containerElement = a;
                this.options.containerElementId = a.id;
                this.__state.rendering = true;
                f.renderer.render(this, a, l);
                return this
            }, configure: function (b, c) {
                f.renderer.config(this, (typeof b === 'object') ? b : (function () {
                    var a = {};
                    a[b] = c;
                    return a
                }()))
            }
        }, true);
    f.extend({
        setCurrentRenderer: f.renderer.setDefault, render: function () {
            var a = ['swfUrl', 'id', 'width', 'height', 'renderAt', 'dataSource', 'dataFormat'], params = {}, i;
            if (arguments[0] instanceof f.core) {
                arguments[0].render();
                return arguments[0]
            }
            for (i = 0; (i < arguments.length && i < a.length); i += 1) {
                params[a[i]] = arguments[i]
            }
            if (typeof arguments[arguments.length - 1] === 'object') {
                delete params[a[i - 1]];
                f.extend(params, arguments[arguments.length - 1])
            }
            if (params.dataFormat === undefined) {
                params.dataFormat = FusionChartsDataFormats.XMLURL
            }
            return new f.core(params).render()
        }
    }, false)
}());
(function () {
    var g = FusionCharts(['private', 'DataHandlerManager']);
    if (g === undefined) {
        return
    }
    window.FusionChartsDataFormats = {};
    g.ajax = (function () {
        var c = function (a, x, e, b) {
            if (typeof a.error === 'function') {
                b[1] = x;
                Array.prototype.push.call(b, e);
                a.error.apply(a, b)
            }
        };
        var d = {
            x: window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ? function () {
                return new window.XMLHttpRequest()
            } : function () {
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    throw "Charts cannot render due to lack of AJAX support. Use setDataURL for fallback";
                }
            }, get: function (u, f) {
                var x = d.x(), args = arguments;
                x.onreadystatechange = function () {
                    try {
                        if (x.readyState === 4) {
                            if (x.status === 200 || x.status === 0) {
                                f(x.responseText, x)
                            } else {
                                c(d, x, new Error('XMLHttpRequest Error'), args)
                            }
                        }
                    } catch (e) {
                        c(d, x, e, args)
                    }
                };
                try {
                    if (x.overrideMimeType) {
                        x.overrideMimeType('text/plain')
                    }
                    x.open('GET', u, true);
                    x.setRequestHeader('If-Modified-Since', 'Sat, 29 Oct 1994 19:43:31 GMT');
                    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    x.setRequestHeader('Accept', 'text/plain, */*');
                    x.send(null)
                } catch (e) {
                    c(d, x, e, args)
                }
                return x
            }
        };
        return d
    }());
    g.ajax.error = function (a, x, b, c, e) {
        var d = {
            source: b, url: a, xmlHttpRequestObject: x, error: e, httpStatus: (x && x.status) ? x.status : -1
        };
        g.raiseEvent('DataLoadError', d, c);
        if (typeof window.FC_DataLoadError === 'function') {
            window.FC_DataLoadError(c.id, d)
        }
    };
    var h = {}, dataStore = {}, xStore = {}, cache = {}, isUrl = /url$/i;
    var i = function (a) {
        if (xStore[a] && typeof xStore[a].abort === 'function' && xStore[a].readyState && xStore[a].readyState !== 0) {
            xStore[a].abort();
            return true
        }
        return false
    };
    g.policies.options.dataSource = ['dataSource', undefined];
    g.policies.options.dataFormat = ['dataFormat', undefined];
    g.addDataHandler = function (b, c) {
        if (typeof b !== 'string' || h[b.toLowerCase()] !== undefined) {
            g.raiseError(g.core, '03091606', 'param', '::DataManager.addDataHandler', new Error('Invalid Data Handler Name'));
            return
        }
        var d = {}, lcaseName = b.toLowerCase();
        h[lcaseName] = c;
        d['set' + b + 'Url'] = function (a) {
            return this.setChartDataUrl(a, b)
        };
        d['set' + b + 'Data'] = function (a) {
            return this.setChartData(a, b)
        };
        d['get' + b + 'Data'] = function () {
            return this.getChartData(b)
        };
        window.FusionChartsDataFormats[b] = lcaseName;
        window.FusionChartsDataFormats[b + 'URL'] = lcaseName + 'URL';
        g.extend(d, true)
    };
    g.addEventListener('BeforeInitialize', function (a) {
        var b = a.sender;
        dataStore[b.id] = '';
        cache[b.id] = {};
        if (b.options.dataSource !== undefined && typeof b.options.dataFormat === 'string') {
            b.setChartData(b.options.dataSource, b.options.dataFormat)
        }
    });
    g.addEventListener('BeforeDispose', function (e) {
        delete dataStore[e.sender.id];
        delete cache[e.sender.id];
        i(e.sender.id)
    });
    g
        .extend({
            setChartDataUrl: function (c, d, e) {
                if (d === undefined || d === null || typeof d.toString !== 'function') {
                    g.raiseError(g.core, '03091609', 'param', '.setChartDataUrl', new Error('Invalid Data Format'));
                    return
                }
                d = d.toString().toLowerCase();
                var f, obj = this, cancelDLRFlag = false;
                if (isUrl.test(d)) {
                    f = d.slice(0, -3)
                } else {
                    f = d;
                    d = d + 'url'
                }
                g.raiseEvent('DataLoadRequested', {
                    source: 'XmlHttpRequest', url: c, dataFormat: f, cancelDataLoadRequest: function () {
                        cancelDLRFlag = true;
                        this.cancelDataLoadRequest = function () {
                            return false
                        };
                        return true
                    }
                }, obj);
                if (cancelDLRFlag === true) {
                    g.raiseEvent('DataLoadRequestCancelled', {
                        source: 'XmlHttpRequest', url: c, dataFormat: f
                    }, obj);
                    return
                }
                this.options.dataSource = c;
                xStore[this.id] = g.ajax
                    .get(decodeURIComponent(c), function (a, x) {
                        var b = false;
                        g
                            .raiseEvent('DataLoadRequestCompleted', {
                                source: 'XmlHttpRequest', url: c, data: a, dataFormat: f, cancelDataLoad: function () {
                                    b = true;
                                    this.cancelDataLoad = function () {
                                        return false
                                    };
                                    return true
                                }, xmlHttpRequestObject: x
                            }, obj);
                        if (b !== true) {
                            obj.setChartData(a, f, e)
                        } else {
                            g
                                .raiseEvent('DataLoadCancelled', {
                                    source: 'XmlHttpRequest', url: c, dataFormat: f, xmlHttpRequestObject: x
                                }, obj)
                        }
                        delete xStore[this.id]
                    }, 'XmlHttpRequest', this)
            }, setChartData: function (a, b, c) {
                if (b === undefined || b === null || typeof b.toString !== 'function') {
                    g.raiseError(g.core, '03091610', 'param', '.setChartData', new Error('Invalid Data Format'))
                }
                b = b.toString().toLowerCase();
                var d;
                if (isUrl.test(b)) {
                    this.setChartDataUrl(a, b, c);
                    return
                } else {
                    this.options.dataSource = a;
                    d = b
                }
                this.options.dataFormat = b;
                var e = h[d], parseResult, eventArgs, cancelDUFlag = false;
                if (typeof e === 'undefined') {
                    g.raiseError(g.core, '03091611', 'param', '.setChartData', new Error('Data Format not recognized'));
                    return
                }
                parseResult = e.encode(a, this);
                parseResult.format = d;
                eventArgs = {
                    dataFormat: d, dataSource: a, dataError: parseResult.error, data: parseResult.data, cancelDataUpdate: function () {
                        cancelDUFlag = true;
                        this.cancelDataUpdate = function () {
                            return false
                        };
                        return true
                    }
                };
                g.raiseEvent('BeforeDataUpdate', eventArgs, this);
                delete eventArgs.cancelDataUpdate;
                if (cancelDUFlag === true) {
                    g.raiseEvent('DataUpdateCancelled', eventArgs, this);
                    return
                }
                dataStore[this.id] = (parseResult.data = eventArgs.data) || '';
                cache[this.id] = {};
                if (c !== true) {
                    if (this.options.safeMode === true && this.__state.rendering === true && !this.isActive()) {
                        this.__state.updatePending = parseResult;
                        g
                            .raiseWarning(this, '23091255', 'run', '::DataHandler~update', 'Renderer update was postponed due to async loading.')
                    } else {
                        delete this.__state.updatePending;
                        g.renderer.update(this, parseResult)
                    }
                }
                g.raiseEvent('DataUpdated', eventArgs, this)
            }, getChartData: function (a, b) {
                var c, parseResult;
                if (a === undefined || typeof a.toString !== 'function' || (c = h[a = a.toString().toLowerCase()]) === undefined) {
                    g
                        .raiseError(this, '25081543', 'param', '~getChartData()', new Error('Unrecognized data-format specified in "format"'));
                    return undefined
                }
                parseResult = (typeof cache[this.id][a] === 'object') ? cache[this.id][a] : cache[this.id][a] = c.decode(dataStore[this.id], this);
                return Boolean(b) === true ? parseResult : parseResult.data
            }
        }, true);
    g
        .extend({
            transcodeData: function (a, b, c, d) {
                if (!b || typeof b.toString !== 'function' || !c || typeof c.toString !== 'function' || h[(c = c.toString().toLowerCase())] === undefined || h[(b = b.toString().toLowerCase())] === undefined) {
                    g
                        .raiseError(this, '14090217', 'param', 'transcodeData()', new Error('Unrecognized data-format specified during transcoding.'));
                    return undefined
                }
                var e = h[b].encode(a, this), l2 = h[c].decode(e.data, this);
                if (!(l2.error instanceof Error)) {
                    l2.error = e.error
                }
                return d ? l2 : l2.data
            }
        }, false);
    g.core.addEventListener('Disposed', function (e) {
        delete cache[e.sender.id]
    });
    g.core.addEventListener('Loaded', function (e) {
        var a = e.sender;
        if (a instanceof g.core && a.__state.updatePending !== undefined) {
            g.renderer.update(a, a.__state.updatePending);
            delete a.__state.updatePending
        }
    })
}());
(function () {
    var f = FusionCharts(['private', 'GenericRuntime']);
    if (f === undefined) {
        return
    }
    var g = /(fusioncharts\.js|fusioncharts\.debug\.js|fusioncharts\.core\.js|fusioncharts\.min\.js|fusioncharts\.packed\.js)(\?.*)?$/i;
    var j = {
        vled: 'realtimeverticalled'
    };
    f.core.options.scriptBaseUri = (function () {
        var a = document.getElementsByTagName('script'), l = a.length, scriptBaseUri = '', i;
        for (i = 0; i < l; i += 1) {
            if (g.test(a[i].getAttribute('src'))) {
                scriptBaseUri = a[i].getAttribute('src').split(g)[0];
                break
            }
        }
        return scriptBaseUri
    }());
    var k = function (a, b, c) {
        for (var d in a) {
            if (a[d] instanceof Array) {
                b[a[d][0]] = c[d];
                continue
            }
            for (var e in a[d]) {
                b[a[d][e][0]] = c[d][e]
            }
        }
    }, lengthCleanupRegex = /[^\%\d]*$/g, signatureMatchRegex = /^FusionCharts/;
    f.extend({
        dispose: function () {
            f.raiseEvent('BeforeDispose', {}, this);
            delete f.core.items[this.id];
            f.raiseEvent('Disposed', {}, this)
        }, clone: function (a, b) {
            var c = f.extend({}, this.args);
            k(f.policies, c, this);
            k(f.renderer.getRendererPolicy(this.options.renderer), c, this);
            delete c.id;
            delete c.animate;
            delete c.stallLoad;
            if (typeof a === 'object') {
                f.extend(c, a)
            }
            return b ? c : new f.core(c)
        }, setDataXML: function (a) {
            if (a === undefined || a === null || typeof a.toString !== 'function') {
                f.raiseError(this, '25081627', 'param', '~setDataXML', 'Invalid data type for parameter "xml"');
                return
            }
            if (this.ref === undefined || this.ref === null || typeof this.ref.setDataXML !== 'function') {
                this.setChartData(a.toString(), FusionChartsDataFormats.XML)
            } else {
                this.ref.setDataXML(a.toString())
            }
        }, setDataURL: function (a) {
            if (a === undefined || a === null || typeof a.toString !== 'function') {
                f.raiseError(this, '25081724', 'param', '~setDataURL', 'Invalid data type for parameter "url"');
                return
            }
            if (this.ref === undefined || this.ref === null || typeof this.ref.setDataURL !== 'function') {
                this.setChartData(a.toString(), FusionChartsDataFormats.XMLURL)
            } else {
                this.ref.setDataURL(a.toString())
            }
        }, isActive: function () {
            if (!this.ref || document.getElementById(this.id) !== this.ref || typeof this.ref.signature !== 'function') {
                return false
            }
            try {
                return signatureMatchRegex.test(this.ref.signature())
            } catch (e) {
                return false
            }
        }, resizeTo: function (w, h, a) {
            var b = {
                width: w, height: h
            };
            if (typeof arguments[0] === 'object') {
                b.width = arguments[0].width;
                b.height = arguments[0].height;
                a = h
            }
            if (b.width && typeof b.width.toString === 'function') {
                this.width = b.width.toString().replace(lengthCleanupRegex, '')
            }
            if (b.height && typeof b.height.toString === 'function') {
                this.height = b.height.toString().replace(lengthCleanupRegex, '')
            }
            if (a !== true) {
                f.renderer.resize(this, b)
            }
        }, chartType: function () {
            var a = this.src.substring(this.src.indexOf('.swf'), 0), file = a
                .substring(a.lastIndexOf('/') + 1).toLowerCase();
            return j[file] === undefined ? file : j[file]
        }
    }, true);
    window.getChartFromId = function (a) {
        return f.core.items[a] instanceof f.core ? f.core.items[a].ref : f.swfobject.getObjectById(a)
    };
    var m = function (a, b) {
        if (typeof a[b] === 'function') {
            return function () {
                return a[b].apply(a, arguments)
            }
        }
        return a[b]
    };
    f.addEventListener('internal.DOMElementCreated', function (a, b) {
        if (b.ref === undefined || b.success !== true) {
            return
        }
        var c = {
            options: true,
            vars: true,
            attributes: true,
            params: true,
            src: true,
            ref: true,
            constructor: true,
            setDataXML: true,
            setDataURL: true,
            hasRendered: true,
            getXML: true,
            getDataAsCSV: true,
            print: true,
            exportChart: true,
            signature: true,
            link: true
        };
        for (var d in a.sender) {
            if (c[d] === true || b.ref[d] !== undefined) {
                continue
            }
            try {
                b.ref[d] = m(a.sender, d)
            } catch (e) {
            }
        }
    })
}());
(function () {
    var d = FusionCharts(['private', 'DynamicChartAttributes']);
    if (d === undefined) {
        return
    }
    d
        .extend({
            setChartAttribute: function (a) {
                if (arguments.length > 1 && typeof a === 'string') {
                    var b = arguments[0];
                    a = {};
                    a[b] = arguments[1]
                } else if (a === null || typeof a !== 'object') {
                    return
                }
                var i = 0, json = this
                    .getChartData(FusionChartsDataFormats.JSON), prop, attList = json.chart || json.graph || {};
                for (prop in a) {
                    i += 1;
                    attList[prop.toLowerCase()] = a[prop]
                }
                if (i > 0) {
                    if (typeof attList.animation === 'undefined') {
                        attList.animation = '0'
                    }
                    this.setChartData(json, FusionChartsDataFormats.JSON)
                }
            }, getChartAttribute: function (a) {
                var b = (b = this
                    .getChartData(FusionChartsDataFormats.JSON)).chart || b.graph;
                if (arguments.length === 0 || a === undefined || b === undefined) {
                    return b
                }
                var c, i;
                if (typeof a === 'string') {
                    c = b[a.toString().toLowerCase()]
                } else if (a instanceof Array) {
                    c = {};
                    for (i = 0; i < a.length; i += 1) {
                        c[a[i]] = b[a[i].toString().toLowerCase()]
                    }
                } else {
                    d.raiseError(this, '25081429', 'param', '~getChartAttribute()', 'Unexpected value of "attribute"')
                }
                return c
            }
        }, true)
}());
(function () {
    var y = FusionCharts(['private', 'Flash_Renderer']);
    if (y === undefined) {
        return
    }
    var z = y.swfobject = function () {
        var w = "undefined", OBJECT = "object", SHOCKWAVE_FLASH = "Shockwave Flash", SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
            FLASH_MIME_TYPE = "application/x-shockwave-flash", EXPRESS_INSTALL_ID = "SWFObjectExprInst",
            ON_READY_STATE_CHANGE = "onreadystatechange", win = window, doc = document, nav = navigator, plugin = false,
            domLoadFnArr = [main], regObjArr = [], objIdArr = [], listenersArr = [], storedAltContent, storedAltContentId, storedCallbackFn,
            storedCallbackObj, isDomLoaded = false, isExpressInstallActive = false, dynamicStylesheet, dynamicStylesheetMedia,
            autoHideShow = true, ua = function () {
                var b = typeof doc.getElementById != w && typeof doc.getElementsByTagName != w && typeof doc.createElement != w,
                    u = nav.userAgent
                        .toLowerCase(), p = nav.platform.toLowerCase(), windows = p ? /win/
                        .test(p) : /win/.test(u), mac = p ? /mac/.test(p) : /mac/.test(u), webkit = /webkit/
                        .test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, ie = !+"\v1", playerVersion = [0, 0, 0],
                    d = null;
                if (typeof nav.plugins != w && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
                    d = nav.plugins[SHOCKWAVE_FLASH].description;
                    if (d && !(typeof nav.mimeTypes != w && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
                        plugin = true;
                        ie = false;
                        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                        playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    }
                } else if (typeof win.ActiveXObject != w) {
                    try {
                        var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                        if (a) {
                            try {
                                d = a.GetVariable("$version")
                            } catch (e) {
                            }
                            if (d) {
                                ie = true;
                                d = d.split(" ")[1].split(",");
                                playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
                            }
                        }
                    } catch (e) {
                    }
                }
                return {
                    w3: b, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac
                }
            }(), onDomLoad = function () {
                if (!ua.w3) {
                    return
                }
                if ((typeof doc.readyState != w && doc.readyState == "complete") || (typeof doc.readyState == w && (doc
                    .getElementsByTagName("body")[0] || doc.body))) {
                    callDomLoadFunctions()
                }
                if (!isDomLoaded) {
                    if (typeof doc.addEventListener != w) {
                        doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false)
                    }
                    if (ua.ie && ua.win) {
                        doc.attachEvent(ON_READY_STATE_CHANGE, function () {
                            if (doc.readyState == "complete") {
                                doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
                                callDomLoadFunctions()
                            }
                        });
                        if (win == top) {
                            (function () {
                                if (isDomLoaded) {
                                    return
                                }
                                try {
                                    doc.documentElement.doScroll("left")
                                } catch (e) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                callDomLoadFunctions()
                            })()
                        }
                    }
                    if (ua.wk) {
                        (function () {
                            if (isDomLoaded) {
                                return
                            }
                            if (!/loaded|complete/.test(doc.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            callDomLoadFunctions()
                        })()
                    }
                    addLoadEvent(callDomLoadFunctions)
                }
            }();

        function callDomLoadFunctions() {
            if (isDomLoaded) {
                return
            }
            try {
                var t = doc.getElementsByTagName("body")[0]
                    .appendChild(createElement("span"));
                t.parentNode.removeChild(t)
            } catch (e) {
                return
            }
            isDomLoaded = true;
            var a = domLoadFnArr.length;
            for (var i = 0; i < a; i++) {
                domLoadFnArr[i]()
            }
        }

        function addDomLoadEvent(a) {
            if (isDomLoaded) {
                a()
            } else {
                domLoadFnArr[domLoadFnArr.length] = a
            }
        }

        function addLoadEvent(a) {
            if (typeof win.addEventListener != w) {
                win.addEventListener("load", a, false)
            } else if (typeof doc.addEventListener != w) {
                doc.addEventListener("load", a, false)
            } else if (typeof win.attachEvent != w) {
                addListener(win, "onload", a)
            } else if (typeof win.onload == "function") {
                var b = win.onload;
                win.onload = function () {
                    b();
                    a()
                }
            } else {
                win.onload = a
            }
        }

        function main() {
            if (plugin) {
                testPlayerVersion()
            } else {
                matchVersions()
            }
        }

        function testPlayerVersion() {
            var b = doc.getElementsByTagName("body")[0];
            var o = createElement(OBJECT);
            o.setAttribute("type", FLASH_MIME_TYPE);
            var t = b.appendChild(o);
            if (t) {
                var a = 0;
                (function () {
                    if (typeof t.GetVariable != w) {
                        var d;
                        try {
                            d = t.GetVariable("$version")
                        } catch (e) {
                        }
                        if (d) {
                            d = d.split(" ")[1].split(",");
                            ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
                        }
                    } else if (a < 10) {
                        a++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                    b.removeChild(o);
                    t = null;
                    matchVersions()
                })()
            } else {
                matchVersions()
            }
        }

        function matchVersions() {
            var a = regObjArr.length;
            if (a > 0) {
                for (var i = 0; i < a; i++) {
                    var b = regObjArr[i].id;
                    var c = regObjArr[i].callbackFn;
                    var d = {
                        success: false, id: b
                    };
                    if (ua.pv[0] > 0) {
                        var e = getElementById(b);
                        if (e) {
                            if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) {
                                setVisibility(b, true);
                                if (c) {
                                    d.success = true;
                                    d.ref = getObjectById(b);
                                    c(d)
                                }
                            } else if (regObjArr[i].expressInstall && canExpressInstall()) {
                                var f = {};
                                f.data = regObjArr[i].expressInstall;
                                f.width = e.getAttribute("width") || "0";
                                f.height = e.getAttribute("height") || "0";
                                if (e.getAttribute("class")) {
                                    f.styleclass = e.getAttribute("class")
                                }
                                if (e.getAttribute("align")) {
                                    f.align = e.getAttribute("align")
                                }
                                var g = {};
                                var p = e.getElementsByTagName("param");
                                var h = p.length;
                                for (var j = 0; j < h; j++) {
                                    if (p[j].getAttribute("name").toLowerCase() != "movie") {
                                        g[p[j].getAttribute("name")] = p[j]
                                            .getAttribute("value")
                                    }
                                }
                                showExpressInstall(f, g, b, c)
                            } else {
                                displayAltContent(e);
                                if (c) {
                                    c(d)
                                }
                            }
                        }
                    } else {
                        setVisibility(b, true);
                        if (c) {
                            var o = getObjectById(b);
                            if (o && typeof o.SetVariable != w) {
                                d.success = true;
                                d.ref = o
                            }
                            c(d)
                        }
                    }
                }
            }
        }

        function getObjectById(a) {
            var r = null;
            var o = getElementById(a);
            if (o && o.nodeName == "OBJECT") {
                if (typeof o.SetVariable != w) {
                    r = o
                } else {
                    var n = o.getElementsByTagName(OBJECT)[0];
                    if (n) {
                        r = n
                    }
                }
            }
            return r
        }

        function canExpressInstall() {
            return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312)
        }

        function showExpressInstall(a, b, c, d) {
            isExpressInstallActive = true;
            storedCallbackFn = d || null;
            storedCallbackObj = {
                success: false, id: c
            };
            var e = getElementById(c);
            if (e) {
                if (e.nodeName == "OBJECT") {
                    storedAltContent = abstractAltContent(e);
                    storedAltContentId = null
                } else {
                    storedAltContent = e;
                    storedAltContentId = c
                }
                a.id = EXPRESS_INSTALL_ID;
                if (typeof a.width == w || (!/%$/.test(a.width) && parseInt(a.width, 10) < 310)) {
                    a.width = "310"
                }
                if (typeof a.height == w || (!/%$/.test(a.height) && parseInt(a.height, 10) < 137)) {
                    a.height = "137"
                }
                doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
                var f = ua.ie && ua.win ? "ActiveX" : "PlugIn",
                    fv = "MMredirectURL=" + win.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + doc.title;
                if (typeof b.flashvars != w) {
                    b.flashvars += "&" + fv
                } else {
                    b.flashvars = fv
                }
                if (ua.ie && ua.win && e.readyState != 4) {
                    var g = createElement("div");
                    c += "SWFObjectNew";
                    g.setAttribute("id", c);
                    e.parentNode.insertBefore(g, e);
                    e.style.display = "none";
                    (function () {
                        if (e.readyState == 4) {
                            e.parentNode.removeChild(e)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                }
                createSWF(a, b, c)
            }
        }

        function displayAltContent(a) {
            if (ua.ie && ua.win && a.readyState != 4) {
                var b = createElement("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(abstractAltContent(a), b);
                a.style.display = "none";
                (function () {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                a.parentNode.replaceChild(abstractAltContent(a), a)
            }
        }

        function abstractAltContent(a) {
            var b = createElement("div");
            if (ua.win && ua.ie) {
                b.innerHTML = a.innerHTML
            } else {
                var d = a.getElementsByTagName(OBJECT)[0];
                if (d) {
                    var c = d.childNodes;
                    if (c) {
                        var e = c.length;
                        for (var i = 0; i < e; i++) {
                            if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
                                b.appendChild(c[i].cloneNode(true))
                            }
                        }
                    }
                }
            }
            return b
        }

        function createSWF(a, b, c) {
            var r, el = getElementById(c);
            if (ua.wk && ua.wk < 312) {
                return r
            }
            if (el) {
                if (typeof a.id == w) {
                    a.id = c
                }
                if (ua.ie && ua.win) {
                    var d = "";
                    for (var i in a) {
                        if (a[i] != Object.prototype[i]) {
                            if (i.toLowerCase() == "data") {
                                b.movie = a[i]
                            } else if (i.toLowerCase() == "styleclass") {
                                d += ' class="' + a[i] + '"'
                            } else if (i.toLowerCase() != "classid") {
                                d += ' ' + i + '="' + a[i] + '"'
                            }
                        }
                    }
                    var e = "";
                    for (var j in b) {
                        if (b[j] != Object.prototype[j]) {
                            e += '<param name="' + j + '" value="' + b[j] + '" />'
                        }
                    }
                    el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + d + '>' + e + '</object>';
                    objIdArr[objIdArr.length] = a.id;
                    r = getElementById(a.id)
                } else {
                    var o = createElement(OBJECT);
                    o.setAttribute("type", FLASH_MIME_TYPE);
                    for (var m in a) {
                        if (a[m] != Object.prototype[m]) {
                            if (m.toLowerCase() == "styleclass") {
                                o.setAttribute("class", a[m])
                            } else if (m.toLowerCase() != "classid") {
                                o.setAttribute(m, a[m])
                            }
                        }
                    }
                    for (var n in b) {
                        if (b[n] != Object.prototype[n] && n.toLowerCase() != "movie") {
                            createObjParam(o, n, b[n])
                        }
                    }
                    el.parentNode.replaceChild(o, el);
                    r = o
                }
            }
            return r
        }

        function createObjParam(a, b, c) {
            var p = createElement("param");
            p.setAttribute("name", b);
            p.setAttribute("value", c);
            a.appendChild(p)
        }

        function removeSWF(a) {
            var b = getElementById(a);
            if (b && b.nodeName == "OBJECT") {
                if (ua.ie && ua.win) {
                    b.style.display = "none";
                    (function () {
                        if (b.readyState == 4) {
                            removeObjectInIE(a)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    b.parentNode.removeChild(b)
                }
            }
        }

        function removeObjectInIE(a) {
            var b = getElementById(a);
            if (b) {
                for (var i in b) {
                    if (typeof b[i] == "function") {
                        b[i] = null
                    }
                }
                b.parentNode.removeChild(b)
            }
        }

        function getElementById(a) {
            var b = null;
            try {
                b = doc.getElementById(a)
            } catch (e) {
            }
            return b
        }

        function createElement(a) {
            return doc.createElement(a)
        }

        function addListener(a, b, c) {
            a.attachEvent(b, c);
            listenersArr[listenersArr.length] = [a, b, c]
        }

        function hasPlayerVersion(a) {
            var b = ua.pv, v = a.split(".");
            v[0] = parseInt(v[0], 10);
            v[1] = parseInt(v[1], 10) || 0;
            v[2] = parseInt(v[2], 10) || 0;
            return (b[0] > v[0] || (b[0] == v[0] && b[1] > v[1]) || (b[0] == v[0] && b[1] == v[1] && b[2] >= v[2])) ? true : false
        }

        function createCSS(a, b, c, d) {
            if (ua.ie && ua.mac) {
                return
            }
            var h = doc.getElementsByTagName("head")[0];
            if (!h) {
                return
            }
            var m = (c && typeof c == "string") ? c : "screen";
            if (d) {
                dynamicStylesheet = null;
                dynamicStylesheetMedia = null
            }
            if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
                var s = createElement("style");
                s.setAttribute("type", "text/css");
                s.setAttribute("media", m);
                dynamicStylesheet = h.appendChild(s);
                if (ua.ie && ua.win && typeof doc.styleSheets != w && doc.styleSheets.length > 0) {
                    dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1]
                }
                dynamicStylesheetMedia = m
            }
            if (ua.ie && ua.win) {
                if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
                    dynamicStylesheet.addRule(a, b)
                }
            } else {
                if (dynamicStylesheet && typeof doc.createTextNode != w) {
                    dynamicStylesheet.appendChild(doc.createTextNode(a + " {" + b + "}"))
                }
            }
        }

        function setVisibility(a, b) {
            if (!autoHideShow) {
                return
            }
            //var v = b ? "visible" : "hidden";
            var v = "inherit";
            if (isDomLoaded && getElementById(a)) {
                getElementById(a).style.visibility = v
            } else {
                createCSS("#" + a, "visibility:" + v)
            }
        }

        function C(s) {
            var a = /[\\\"<>\.;]/;
            var b = a.exec(s) != null;
            return b && typeof encodeURIComponent != w ? encodeURIComponent(s) : s
        }

        var x = function () {
            if (ua.ie && ua.win) {
                window.attachEvent("onunload", function () {
                    var a = listenersArr.length;
                    for (var i = 0; i < a; i++) {
                        listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2])
                    }
                    var b = objIdArr.length;
                    for (var j = 0; j < b; j++) {
                        removeSWF(objIdArr[j])
                    }
                    for (var k in ua) {
                        ua[k] = null
                    }
                    ua = null;
                    for (var l in z) {
                        z[l] = null
                    }
                    z = null
                })
            }
        }();
        return {
            registerObject: function (a, b, c, d) {
                if (ua.w3 && a && b) {
                    var e = {};
                    e.id = a;
                    e.swfVersion = b;
                    e.expressInstall = c;
                    e.callbackFn = d;
                    regObjArr[regObjArr.length] = e;
                    setVisibility(a, false)
                } else if (d) {
                    d({
                        success: false, id: a
                    })
                }
            }, getObjectById: function (a) {
                if (ua.w3) {
                    return getObjectById(a)
                }
            }, embedSWF: function (d, e, f, g, h, l, m, n, o, p) {
                var q = {
                    success: false, id: e
                };
                if (ua.w3 && !(ua.wk && ua.wk < 312) && d && e && f && g && h) {
                    setVisibility(e, false);
                    addDomLoadEvent(function () {
                        f += "";
                        g += "";
                        var a = {};
                        if (o && typeof o === OBJECT) {
                            for (var i in o) {
                                a[i] = o[i]
                            }
                        }
                        a.data = d;
                        a.width = f;
                        a.height = g;
                        var b = {};
                        if (n && typeof n === OBJECT) {
                            for (var j in n) {
                                b[j] = n[j]
                            }
                        }
                        if (m && typeof m === OBJECT) {
                            for (var k in m) {
                                if (typeof b.flashvars != w) {
                                    b.flashvars += "&" + k + "=" + m[k]
                                } else {
                                    b.flashvars = k + "=" + m[k]
                                }
                            }
                        }
                        if (hasPlayerVersion(h)) {
                            var c = createSWF(a, b, e);
                            if (a.id == e) {
                                setVisibility(e, true)
                            }
                            q.success = true;
                            q.ref = c
                        } else if (l && canExpressInstall()) {
                            a.data = l;
                            showExpressInstall(a, b, e, p);
                            return
                        } else {
                            setVisibility(e, true)
                        }
                        if (p) {
                            p(q)
                        }
                    })
                } else if (p) {
                    p(q)
                }
            }, switchOffAutoHideShow: function () {
                autoHideShow = false
            }, ua: ua, getFlashPlayerVersion: function () {
                return {
                    major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2]
                }
            }, hasFlashPlayerVersion: hasPlayerVersion, createSWF: function (a, b, c) {
                if (ua.w3) {
                    return createSWF(a, b, c)
                } else {
                    return undefined
                }
            }, showExpressInstall: function (a, b, c, d) {
                if (ua.w3 && canExpressInstall()) {
                    showExpressInstall(a, b, c, d)
                }
            }, removeSWF: function (a) {
                if (ua.w3) {
                    removeSWF(a)
                }
            }, createCSS: function (a, b, c, d) {
                if (ua.w3) {
                    createCSS(a, b, c, d)
                }
            }, addDomLoadEvent: addDomLoadEvent, addLoadEvent: addLoadEvent, getQueryParamValue: function (a) {
                var q = doc.location.search || doc.location.hash;
                if (q) {
                    if (/\?/.test(q)) {
                        q = q.split("?")[1]
                    }
                    if (a == null) {
                        return C(q)
                    }
                    var b = q.split("&");
                    for (var i = 0; i < b.length; i++) {
                        if (b[i].substring(0, b[i].indexOf("=")) == a) {
                            return C(b[i].substring((b[i].indexOf("=") + 1)))
                        }
                    }
                }
                return ""
            }, expressInstallCallback: function () {
                if (isExpressInstallActive) {
                    var a = getElementById(EXPRESS_INSTALL_ID);
                    if (a && storedAltContent) {
                        a.parentNode.replaceChild(storedAltContent, a);
                        if (storedAltContentId) {
                            setVisibility(storedAltContentId, true);
                            if (ua.ie && ua.win) {
                                storedAltContent.style.display = "block"
                            }
                        }
                        if (storedCallbackFn) {
                            storedCallbackFn(storedCallbackObj)
                        }
                    }
                    isExpressInstallActive = false
                }
            }
        }
    }();
    y.core.options.requiredFlashPlayerVersion = '8';
    y.core.options.installRedirectMessage = 'You need Adobe Flash ' + 'Player 8 (or above) to view the charts on this page. It is a free, ' + 'lightweight and safe installation from Adobe Systems Incorporated.' + '\n\nWould you like to go to Adobe\'s website and install Flash Player?';
    var A = false;
    var B = /[\\\"<>;]/;
    var C = function (s) {
        return (B.exec(s) !== null) && typeof window.encodeURIComponent !== undefined ? window
            .encodeURIComponent(s) : s
    };
    var D = function (e, a) {
        if (a && a.source === 'XmlHttpRequest') {
            return
        }
        var b = e.sender;
        if (b.ref && typeof b.ref.dataInvokedOnSWF === 'function' && b.ref.dataInvokedOnSWF() && typeof b.ref.getXML === 'function') {
            y.raiseWarning(b, '08300116', 'run', '::DataHandler~__fusioncharts_vars', 'Data was set in UTF unsafe manner');
            b.setChartData(window.unescape(e.sender.ref.getXML({
                escaped: true
            })), FusionChartsDataFormats.XML, true);
            b.flashVars.dataXML = b.getChartData(FusionChartsDataFormats.XML);
            delete b.flashVars.dataURL
        }
        e.sender.removeEventListener('DataLoaded', D)
    };
    window.__fusioncharts_dimension = (function () {
        var c = /.*?\%\s*?$/g;
        return function (a) {
            var b, parent;
            return !((b = y.core(a)) instanceof y.core && b.ref && (parent = b.ref.parentNode)) ? {} : {
                width: parent.offsetWidth * (c.test(b.width) ? parseInt(b.width, 10) / 100 : 1),
                height: parent.offsetHeight * (c.test(b.height) ? parseInt(b.height, 10) / 100 : 1)
            }
        }
    }());
    window.__fusioncharts_vars = function (a, b) {
        var c = y.core.items[a];
        if (!(c instanceof y.core)) {
            y
                .raiseError(y.core, '25081621', 'run', '::FlashRenderer', 'FusionCharts Flash object is accessing flashVars of non-existent object.');
            return false
        }
        if (typeof b === 'object') {
            if (c.ref && typeof c.ref.dataInvokedOnSWF === 'function' && c.ref.dataInvokedOnSWF()) {
                if (b.dataURL !== undefined) {
                    c.addEventListener('DataLoaded', D)
                } else if (b.dataXML !== undefined) {
                    b.dataXML = window.unescape(b.dataXML)
                }
            } else {
                delete b.dataURL;
                delete b.dataXML
            }
            y.extend(c.flashVars, b);
            return true
        }
        return c.flashVars
    };
    y
        .addEventListener('BeforeInitialize', function (a) {
            var b = a.sender;
            if (b.options.renderer !== 'flash') {
                return
            }
            if (b.width === undefined) {
                b.width = y.renderer.policies.flashVars.chartWidth[1]
            }
            if (b.height === undefined) {
                b.height = y.renderer.policies.flashVars.chartHeight[1]
            }
            if (b.flashVars.DOMId === undefined) {
                b.flashVars.DOMId = b.id
            }
            y.extend(b.flashVars, {
                registerWithJS: '1', chartWidth: b.width, chartHeight: b.height, InvalidXMLText: 'Invalid data.'
            });
            if (Boolean(b.options.autoInstallRedirect) === true && !y.swfobject
                .hasFlashPlayerVersion(y.core.options.requiredFlashPlayerVersion
                    .toString()) && A === false) {
                A = true;
                if (window
                    .confirm(y.core.options.installRedirectMessage)) {
                    window.location.href = 'http://get.adobe.com/flashplayer/'
                }
            }
            if (b.options.dataFormat === undefined && b.options.dataSource === undefined) {
                b.options.dataFormat = FusionChartsDataFormats.XMLURL;
                b.options.dataSource = 'Data.xml'
            }
        });
    y.addEventListener('Disposed', function (e) {
        if (e.sender.options.renderer !== 'flash') {
            return
        }
        y.swfobject.removeSWF(e.sender.id)
    });
    y.addEventListener('Loaded', function (e) {
        if (e.sender.options.renderer !== 'flash') {
            return
        }
        e.sender.flashVars.animation = '0'
    });
    y.addEventListener('DataLoadRequested', function (a, b) {
        var c = a.sender;
        if (c.options.renderer !== 'flash') {
            return
        }
        if (window.location.protocol === 'file:' && b.dataFormat === FusionChartsDataFormats.XML && Boolean(c.options.safeMode) === true) {
            if (c.ref && c.ref.setDataURL) {
                c.ref.setDataURL(b.url, false)
            } else {
                c.flashVars.dataURL = b.url
            }
            a.stopPropagation();
            b.cancelDataLoadRequest();
            c.addEventListener('DataLoaded', D)
        }
        if (c.ref && typeof c.showChartMessage === 'function') {
            delete c.flashVars.stallLoad;
            c.ref.showChartMessage('XMLLoadingText')
        } else {
            c.flashVars.stallLoad = true
        }
    });
    y.addEventListener('DataLoadRequestCancelled', function (a) {
        var b = a.sender;
        if (b.options.renderer !== 'flash') {
            return
        }
        if (b.ref && typeof b.showChartMessage === 'function') {
            b.ref.showChartMessage()
        }
        delete b.flashVars.stallLoad
    });
    y.addEventListener('DataLoadError', function (a, b) {
        var c = a.sender;
        if (c.options.renderer !== 'flash') {
            return
        }
        if (c.ref && typeof c.ref.showChartMessage === 'function' && b.source === 'XmlHttpRequest') {
            c.ref.showChartMessage('LoadDataErrorText')
        } else {
            delete c.flashVars.dataURL;
            c.flashVars.dataXML = '<JSON parsing error>';
            delete c.flashVars.stallLoad
        }
    });
    y.addEventListener('DataLoadRequestCompleted', function (a, b) {
        var c = a.sender;
        if (c.options.renderer !== 'flash' || b.source !== 'XmlHttpRequest') {
            return
        }
        delete c.flashVars.stallLoad
    });
    window.__fusioncharts_event = function (a, b) {
        setTimeout(function () {
            y.raiseEvent(a.type, b, y.core.items[a.sender])
        }, 0)
    };
    var E = {
        dataFormat: 'xml', init: function () {
        }, policies: {
            params: {
                scaleMode: ['scaleMode', 'noScale'],
                scale: ['scaleMode', 'noScale'],
                wMode: ['wMode', 'opaque'],
                menu: ['menu', undefined],
                bgColor: ['bgColor', undefined],
                allowScriptAccess: ['allowScriptAccess', 'always'],
                quality: ['quality', 'best'],
                swLiveConnect: ['swLiveConnect', undefined],
                base: ['base', undefined],
                align: ['align', undefined],
                salign: ['sAlign', undefined]
            }, flashVars: {
                lang: ['lang', 'EN'], debugMode: ['debugMode', undefined], animation: ['animate', undefined]
            }, options: {
                autoInstallRedirect: ['autoInstallRedirect', false]
            }
        }, render: function (a, b) {
            if (Boolean(this.flashVars.animation) === true) {
                delete this.flashVars.animation
            }
            if (!this.src) {
                y.raiseError(this, '03102348', 'run', '::FlashRenderer.render', 'Could not find a valid "src" attribute. swfUrl or chart ' + 'type missing.')
            }
            var c = {}, dataXML = this.flashVars.dataXML, dataURL = this.flashVars.dataURL;
            y.extend(c, this.flashVars);
            if (this.flashVars.stallLoad === true) {
                if (this.options.dataFormat === FusionChartsDataFormats.XML) {
                    dataXML = this.options.dataSource
                }
                if (this.options.dataFormat === FusionChartsDataFormats.XMLURL) {
                    dataURL = this.options.dataSource
                }
            }
            c.dataXML = window.encodeURIComponent(dataXML || '');
            c.dataURL = C(dataURL || '');
            y.swfobject.embedSWF(this.src, this.id, this.width, this.height, '8.0.0', undefined, c, this.params, this.attributes, b)
        }, update: function (a) {
            var b = this.ref, data = a.data;
            this.flashVars.dataXML = data;
            if (a.error === undefined) {
                if (this.isActive() && typeof b.setDataXML === 'function') {
                    b.setDataXML(data, false)
                } else {
                    delete this.flashVars.dataURL;
                    delete this.flashVars.animation
                }
            } else {
                if (this.isActive() && typeof b.showChartMessage === 'function') {
                    b.showChartMessage('InvalidXMLText')
                } else {
                    this.flashVars.dataXML = '<Invalid' + a.format.toUpperCase() + '>';
                    delete this.flashVars.dataURL;
                    delete this.flashVars.animation
                }
            }
        }, resize: function () {
            this.flashVars.chartWidth = this.width;
            this.flashVars.chartHeight = this.height;
            if (this.ref !== undefined) {
                this.ref.width = this.width;
                this.ref.height = this.height;
                if (typeof this.ref.resize === 'function') {
                    this.ref
                        .resize(this.ref.offsetWidth, this.ref.offsetHeight)
                }
            }
        }, config: function (a) {
            y.extend(this.flashVars, a)
        }
    };
    E.prototype = {
        getSWFHTML: function () {
            var a = document.createElement('span'), inElm = document
                .createElement('span'), tempId = 'RnVzaW9uQ2hhcnRz' + (new Date()).getTime();
            a.appendChild(inElm);
            inElm.setAttribute('id', tempId);
            a.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(a);
            y.swfobject
                .embedSWF(this.src, tempId, this.width, this.height, '8.0.0', undefined, this.flashVars, this.params, this.attrs);
            var b = a.innerHTML.replace(tempId, this.id);
            y.swfobject.removeSWF(tempId);
            a.parentNode.removeChild(a);
            return b
        }, setTransparent: function (a) {
            if (typeof a !== 'boolean' && a !== null) {
                a = true
            }
            this.params.wMode = a === null ? 'window' : (a === true ? 'transparent' : 'opaque')
        }, addVariable: y.core.prototype.configure
    };
    y.renderer.register('flash', E);
    if (!/\(iPhone;|\(iPad;/i.test(navigator.userAgent)) {
        y.renderer.setDefault('flash')
    }
}());
(function () {
    var M, FCC = {}, baseURL = 'JSClass/', covertToFCC, renderArray = [], FCCready = false, i, scriptTags, jsConf = {};
    M = FusionCharts(['private', 'Canvas_Renderer']);
    if (M === undefined) {
        return
    }
    var N = false;

    function noEffect() {
        return undefined
    }

    FCC.init = function () {
        var m = function (c, d, e) {
            return function (a, b) {
                b.style[c] = (e ? e : '') + a + (d ? d : '')
            }
        }, FCFCC = {
            color: ["AFD8F8", "F6BD0F", "8BBA00", "FF8E46", "008E8E", "D64646", "8E468E", "588526", "B3AA00", "008ED6", "9D080D", "A186BE", "CC6600", "FDC689", "ABA000", "F26D7D", "FFF200", "0054A6", "F7941C", "CC3300", "006600", "663300", "6DCFF6"],
            seriesName: {
                'Column2D': 1,
                'Column3D': 1,
                'Line': 1,
                'Area2D': 1,
                'Bar2D': 1,
                'Pie2D': 1,
                'Pie3D': 1,
                'Doughnut2D': 1,
                'Doughnut3D': 1,
                'Pareto2D': 1.5,
                'Pareto3D': 1.5,
                'MSColumn2D': 2,
                'MSColumn3D': 2,
                'MSLine': 2,
                'ZoomLine': 2.5,
                'MSBar2D': 2,
                'MSBar3D': 2,
                'MSArea': 2,
                'InverseMSLine': 2.2,
                'InverseMSColumn2D': 2.2,
                'InverseMSArea': 2.2,
                'StackedColumn3D': 3,
                'Marimekko': 3,
                'StackedColumn2D': 3,
                'StackedColumn2DLine': 3,
                'StackedColumn3DLine': 3,
                'StackedBar2D': 3,
                'StackedBar3D': 3,
                'StackedArea2D': 3,
                'MSCombi3D': 4,
                'MSCombi2D': 4,
                'MSCombiDY2D': 5,
                'MSColumnLine3D': 4,
                'MSColumn3DLineDY': 5,
                'MSStackedColumn2D': 6,
                'MSStackedColumn2DLineDY': 6.5,
                'StackedColumn3DLineDY': 5.5,
                'Scatter': 7,
                'Bubble': 7.5,
                'ScrollColumn2D': 2,
                'ScrollLine2D': 2,
                'ScrollArea2D': 2,
                'ScrollStackedColumn2D': 3,
                'ScrollCombi2D': 4,
                'ScrollCombiDY2D': 5,
                'SSGrid': 9,
                'Spline': 1,
                'SplineArea': 1,
                'MSSpline': 2,
                'MSSplineArea': 2,
                'MultiAxisLine': 8
            },
            highCharts: {
                'Column2D': 'column',
                'Column3D': 'column',
                'Line': 'line',
                'Area2D': 'area',
                'Bar2D': 'bar',
                'Pie2D': 'pie',
                'Pie3D': 'pie',
                'Doughnut2D': 'pie',
                'Doughnut3D': 'pie',
                'Pareto2D': 'column',
                'Pareto3D': 'column',
                'MSColumn2D': 'column',
                'MSColumn3D': 'column',
                'MSLine': 'line',
                'ZoomLine': 'line',
                'MSBar2D': 'bar',
                'MSBar3D': 'bar',
                'MSArea': 'area',
                'InverseMSLine': 'line',
                'InverseMSColumn2D': 'column',
                'InverseMSArea': 'area',
                'StackedColumn3D': 'column',
                'StackedColumn2D': 'column',
                'Marimekko': 'column',
                'StackedColumn2DLine': 'column',
                'StackedColumn3DLine': 'column',
                'StackedBar2D': 'bar',
                'StackedBar3D': 'bar',
                'StackedArea2D': 'area',
                'MSCombi3D': 'column',
                'MSCombi2D': 'column',
                'MSCombiDY2D': 'column',
                'MSColumnLine3D': 'column',
                'MSColumn3DLineDY': 'column',
                'MSStackedColumn2D': '',
                'MSStackedColumn2DLineDY': '',
                'StackedColumn3DLineDY': 'column',
                'Scatter': 'scatter',
                'Bubble': 'scatter',
                'ScrollColumn2D': 'column',
                'ScrollLine2D': 'line',
                'ScrollArea2D': 'area',
                'ScrollStackedColumn2D': 'column',
                'ScrollCombi2D': 'column',
                'ScrollCombiDY2D': 'column',
                'SSGrid': '',
                'Spline': 'spline',
                'SplineArea': 'areaspline',
                'MSSpline': 'spline',
                'MSSplineArea': 'areaspline',
                'MultiAxisLine': ''
            },
            combi: {
                'column2d': 'column', 'column3d': 'column', 'line': 'line', 'area': 'area'
            },
            valueAbs: {
                'Pie2D': true, 'Pie3D': true, 'Doughnut2D': true, 'Doughnut3D': true, 'Marimekko': true
            },
            exportFormat: {
                png: 'image/png', jpg: 'image/jpeg', pdf: 'application/pdf', svg: 'image/svg+xml'
            },
            JSONconf: {
                blankChart: {
                    chart: {
                        events: {}, margin: [0, 0, 0, 0]
                    }, credits: {
                        href: 'http://www.fusioncharts.com?BS=FCHSEvalMark', text: 'FusionCharts - HighCharts', enabled: N
                    }, legend: {
                        enabled: false
                    }, title: {
                        text: 'No data to display', style: {
                            fontFamily: 'Verdana', fontSize: '10px', color: '#666666'
                        }
                    }, plotOptions: {
                        series: {}
                    }, exporting: {
                        enabled: false
                    }
                }
            },
            commonMethodCSV: 'saveAsImage,print,exportChart,getXML,getChartAttribute,getDataAsCSV,hasRendered,signature,cancelExport',
            methodCSV: {
                'pie3d': ',togglePieSlice',
                'pie2d': ',togglePieSlice',
                'doughnut2D': ',togglePieSlice',
                'doughnut3D': ',togglePieSlice',
                'mscombi3d': ',view2D,view3D,resetView,rotateView,getViewAngles,fitToStage',
                'zoomline': ',zoomTo,setZoomMode,zoomOut,resetChart'
            },
            method: {
                getExternalInterfaceMethods: function (a) {
                    return FCFCC.commonMethodCSV + (FCFCC.methodCSV[a || this.FusionCharts.chartType()] || '')
                }, print: function () {
                    var a = this.id;
                    FCC.items[a].FCCObj.FCC.print()
                }, exportChart: function (a) {
                    var b = this.id, HCConf = {}, HCObj = FCC.items[b].FCCObj.FCC;
                    if (HCObj.options.exporting.enabled) {
                        if (typeof a === 'object') {
                            for (var x in a) {
                                if (x.toLowerCase() === 'exportformat' && FCFCC.exportFormat[a[x]
                                    .toLowerCase()]) {
                                    HCConf.type = FCFCC.exportFormat[a[x]
                                        .toLowerCase()]
                                } else if (x.toLowerCase() === 'exportfilename') {
                                    HCConf.filename = a[x]
                                }
                            }
                        }
                        HCObj.exportChart(HCConf)
                    }
                }, getXML: function () {
                    var a = this.id;
                    return M.core.items[a].getXMLData()
                }, signature: function () {
                    return 'FusionCharts/3.2.0/JS'
                }, hasRendered: function () {
                    var a = this.id;
                    if (typeof FCC.items[a] === 'object') {
                        return true
                    } else {
                        return false
                    }
                }, togglePieSlice: function (a) {
                    if (this.ref && this.ref.FCC && this.ref.FCC.series && this.ref.FCC.series[0] && this.ref.FCC.series[0].data && this.ref.FCC.series[0].data[a] && this.ref.FCC.series[0].data[a].slice()) {
                        this.ref.FCC.series[0].data[a].slice()
                    }
                }
            },
            supportedStyle: {
                font: function (c, d, e) {
                    var f, x, map = {
                        font: m('font-family'),
                        size: m('font-size', 'px'),
                        color: m('color', undefined, '#'),
                        align: function (a, b) {
                            b.align = a
                        },
                        bgColor: m('background-color', undefined, '#'),
                        borderColor: m('border-color', undefined, '#'),
                        isHTML: '',
                        leftMargin: m('margin-left', 'px'),
                        letterSpacing: m('letter-spacing', 'px'),
                        bold: function (a, b) {
                            b['font-weight'] = a == '1' ? 'bold' : 'normal'
                        },
                        italic: function (a, b) {
                            b['font-style'] = a == '1' ? 'italic' : 'normal'
                        },
                        underline: function (a, b) {
                            b['text-decoration'] = a == '1' ? 'underline' : 'normal'
                        }
                    };
                    switch (d) {
                        case 'caption':
                            f = c.title;
                            break;
                        case 'datalabels':
                            f = c.xAxis.labels;
                            break;
                        case 'datavalues':
                            f = c.plotOptions.series.dataLabels;
                            break;
                        case 'subcaption':
                            f = c.subtitle;
                            break;
                        case 'tooltip':
                            f = c.tooltip;
                            break;
                        case 'trendvalues':
                            f = undefined;
                            break;
                        case 'xaxisname':
                            f = c.xAxis.title;
                            break;
                        case 'yaxisname':
                            f = c.yAxis[0].title;
                            break;
                        case 'yaxisvalues':
                            f = c.yAxis[0].labels;
                            break;
                        default:
                            break
                    }
                    if (typeof f === 'object') {
                        for (x in e) {
                            if (typeof map[x] === 'function') {
                                map[x](e[x], f)
                            }
                        }
                    }
                }
            }
        };
        var n = {};

        function margeClone(a, b) {
            var c;
            if (typeof a !== 'object' && typeof b !== 'object') {
                return null
            }
            if (typeof a !== 'object') {
                a = {}
            }
            if (typeof b !== 'object') {
                b = a;
                a = {}
            }
            if (b instanceof Array) {
                for (c = 0; c < b.length; c += 1) {
                    if (typeof b[c] !== 'object') {
                        a[c] = b[c]
                    } else {
                        a[c] = margeClone(a[c], b[c])
                    }
                }
            } else {
                for (c in b) {
                    if (typeof b[c] !== 'object') {
                        a[c] = b[c]
                    } else {
                        a[c] = margeClone(a[c], b[c])
                    }
                }
            }
            return a
        }

        FCC.prototype = {
            setTransparent: function (a) {
                if (!this.jsVars) {
                    this.jsVars = {}
                }
                if (typeof a !== 'boolean' && a !== null) {
                    a = true
                }
                this.jsVars.transparent = a;
                if (typeof jQuery === 'function') {
                    jQuery('#' + this.id).css('background-color', (a === true) ? '' : '#FFFFFF')
                }
            }, getSWFHTML: noEffect, _overrideJSChartConfiguration: function (a) {
                jsConf[this.id] = a
            }
        };
        if (M.core.options && M.core.options.scriptBaseUri !== undefined) {
            baseURL = M.core.options.scriptBaseUri
        } else {
            scriptTags = document.getElementsByTagName('script');
            if (scriptTags) {
                for (i = 0; i < scriptTags.length; i += 1) {
                    if (scriptTags[i].src.indexOf('FusionCharts.js') !== -1) {
                        baseURL = scriptTags[i].src.split("FusionCharts.js")[0]
                    }
                }
            }
        }
        FCC.isReady = function () {
            return FCCready
        };
        FCC.items = {};

        function loadScript(a) {
            var b = document.createElement('script');
            b.setAttribute('type', 'text/javascript');
            b.setAttribute('src', a);
            var c = document.getElementsByTagName('head');
            c[0].appendChild(b)
        }

        function checkFCCReady() {
            var a;
            if (typeof window.Highcharts === 'object') {
                FCCready = true;
                if (typeof FCC.render == 'function') {
                    while (renderArray.length > 0) {
                        a = renderArray.splice(0, 1)[0];
                        FCC.render.call(a[0], a[1], a[2])
                    }
                }
            } else {
                setTimeout(checkFCCReady, 300)
            }
        }

        function loadFCC() {
            if (typeof jQuery === 'function') {
                jQuery.noConflict();
                if ($ === undefined) {
                    $ = jQuery
                }
                if (typeof window.Highcharts !== 'object') {
                    loadScript(baseURL + 'highcharts.js');
                    setTimeout(checkFCCReady, 300)
                } else {
                    checkFCCReady()
                }
            } else {
                setTimeout(loadFCC, 300)
            }
        }

        if (typeof jQuery !== 'function') {
            loadScript(baseURL + 'jquery.min.js');
            setTimeout(loadFCC, 300)
        } else {
            loadFCC()
        }
        var o = function (a, b, c, d, e, f) {
            var g, minPowerOfTen, powerOfTen, y_interval, rangePowerOfTen, rangeInterval, y_topBound, y_lowerBound, yMaxGiven, yMinGiven,
                yMax, yMin, range, interval;
            a = (typeof a !== 'number') ? 0.1 : a;
            b = (typeof b !== 'number') ? 0 : b;
            if ((a === b) && (a === 0)) {
                a = 0.1
            }
            if (typeof e === 'undefined' || typeof e === 'null' || e === '') {
                e = false
            }
            if (typeof f === 'undefined' || typeof f === 'null' || f === '') {
                f = true
            }
            g = Math.floor(Math.log(Math.abs(a)) / Math.LN10);
            minPowerOfTen = Math.floor(Math.log(Math.abs(b)) / Math.LN10);
            powerOfTen = Math.max(minPowerOfTen, g);
            y_interval = Math.pow(10, powerOfTen);
            if (Math.abs(a) / y_interval < 2 && Math.abs(b) / y_interval < 2) {
                powerOfTen -= 1;
                y_interval = Math.pow(10, powerOfTen)
            }
            rangePowerOfTen = Math.floor(Math.log(a - b) / Math.LN10);
            rangeInterval = Math.pow(10, rangePowerOfTen);
            if (((a - b) > 0) && ((y_interval / rangeInterval) >= 10)) {
                y_interval = rangeInterval;
                powerOfTen = rangePowerOfTen
            }
            y_topBound = (Math.floor(a / y_interval) + 1) * y_interval;
            if (b < 0) {
                y_lowerBound = -1 * ((Math.floor(Math.abs(b / y_interval)) + 1) * y_interval)
            } else {
                if (f) {
                    y_lowerBound = 0
                } else {
                    y_lowerBound = Math.floor(Math.abs(b / y_interval) - 1) * y_interval;
                    y_lowerBound = (y_lowerBound < 0) ? 0 : y_lowerBound
                }
            }
            if (e && a <= 0) {
                y_topBound = 0
            }
            if (c === null || c === undefined || c === "") {
                yMaxGiven = false
            } else {
                yMaxGiven = true
            }
            if (d === null || d === undefined || d === "" || typeof Number(d) === 'NaN') {
                yMinGiven = false
            } else {
                yMinGiven = true
            }
            if (yMaxGiven === false || (yMaxGiven === true && Number(c) < a)) {
                yMax = y_topBound
            } else {
                yMax = Number(c)
            }
            if (yMinGiven === false || (yMinGiven === true && Number(d) > b)) {
                yMin = y_lowerBound
            } else {
                yMin = Number(d)
            }
            range = Math.abs(yMax - yMin);
            interval = y_interval;
            return {
                Max: yMax, Min: yMin, Range: range, interval: interval
            }
        };

        function createContainer(a, b, c, d, e) {
            var f = document.getElementById(b), __container = document
                .getElementById(a), lengthPercentageRegExp = /\%\s*?$/ig;
            if (e === true) {
                if (f) {
                    __container.removeChild(f)
                }
                f = document.createElement('div');
                f.setAttribute('id', b);
                __container.appendChild(f)
            }
            for (var x in this.attributes) {
                f[x] = this.attributes[x]
            }
            if (this.attributes['class']) {
                f.className = this.attributes['class']
            }
            f.setAttribute('style', 'display: inline-block; zoom: 1; *display: inline;');
            f.style.width = c + (c.match(lengthPercentageRegExp) ? '' : 'px');
            f.style.height = d + (d.match(lengthPercentageRegExp) ? '' : 'px')
        }

        function removeChart(a, b) {
            if (FCC.items[a]) {
                if (FCC.items[a].FCCObj && FCC.items[a].FCCObj.FCC) {
                    FCC.items[a].FCCObj.FCC.destroy()
                }
                clearTimeout(FCC.items[a].timeChach);
                if (b === true) {
                    var c = FCC.items[a].FCCObj;
                    if (c && c.parentNode) {
                        c.parentNode.removeChild(c)
                    }
                }
                delete FCC.items[a]
            }
        }

        function createSeries(a, b, c, d, e, f, g, h, i) {
            return {
                data: [],
                FCtype: a,
                color: b,
                type: c,
                name: d ? d : ' ',
                yAxis: e ? 1 : undefined,
                showvalue: f,
                lineColor: g,
                lineWidth: h,
                marker: i
            }
        }

        function parseStr(a) {
            if (typeof a === 'string') {
                return a.replace(/\{br\}/ig, '<br/>')
            } else {
                return ''
            }
        }

        function createMsg(a, b, c) {
            var d = FCFCC.JSONconf.blankChart;
            d.title.y = parseInt(document.getElementById(a).offsetHeight, 10) / 2;
            d.chart.renderTo = a;
            d.title.text = n[a][b] ? n[a][b] : b;
            if (typeof c === 'string') {
                M.raiseEvent(c, {}, M.core.items[a])
            }
            return d
        }

        function showChartMessage(a) {
            var b = this.id, HCJson, FC = M.core.items[b];
            if (FC.ref) {
                n[b].msgTxt = a;
                FC.ref.FCC.destroy();
                HCJson = createMsg(b, 'msgTxt', undefined);
                FC.ref.FCC = new Highcharts.Chart(HCJson);
                FCC.items[b].baseObj = HCJson
            }
            if (FC.link.root === FC) {
                return
            }
            var c = M.extend({
                show: true
            }, this.FusionCharts.link.parent.options.overlayButton);
            M
                .extend(c, this.FusionCharts.link.parent.link
                    .configuration().overlayButton || {});
            this.drawOverlayButton(c)
        }

        function drawOverlayButton(b) {
            if (b.show) {
                var c = document.createElement('span');
                c.innerHTML = b.message ? b.message : "Back";
                c.style.border = '1px solid #' + (b.borderColor ? b.borderColor : "7f8975");
                c.style.backgroundColor = '#' + (b.bgColor ? b.bgColor : "edefec");
                c.style.fontFamily = b.font ? b.font : "Verdana";
                c.style.color = '#' + b.fontColor ? b.fontColor : "49563a";
                c.style.fontSize = (b.fontSize ? b.fontSize : '10') + 'px';
                c.style.padding = (b.padding ? b.padding : '3') + 'px';
                c.style.fontWeight = parseInt(b.bold, 10) === 0 ? 'normal' : 'bold';
                c.style.position = 'absolute';
                c.style.top = '1px';
                c.style.right = '1px';
                c.style._cursor = 'hand';
                c.style.cursor = 'pointer';
                c.onclick = (function (a) {
                    return function () {
                        M.raiseEvent('OverlayButtonClick', {}, a.FusionCharts)
                    }
                }(this));
                document.getElementById(this.id).childNodes[0].appendChild(c)
            }
        }

        function getSeriesName(a) {
            return FCFCC.seriesName[a]
        }

        function convertColor(a, b, c) {
            var R = 0, G = 0, B = 0, colorStr, tempArr;
            if (c && c.match(/^rgba/ig)) {
                tempArr = c.split(',');
                R = tempArr[0].slice(tempArr[3].indexOf('(') + 1);
                G = tempArr[1];
                B = tempArr[2];
                if (!b) {
                    b = parseInt(tempArr[3].slice(0, tempArr[3].indexOf(')')), 10) * 100
                }
            }
            if (a) {
                colorStr = a.replace(/[#\s]/ig, '').split(',')[0];
                switch (colorStr.length) {
                    case 3:
                        colorStr = colorStr[0] + colorStr[0] + colorStr[1] + colorStr[1] + colorStr[2] + colorStr[2];
                        break;
                    case 6:
                        break;
                    default:
                        colorStr = (colorStr + 'FFFFFF').slice(0, 6);
                        break
                }
                R = parseInt(colorStr.slice(0, 2), 16);
                G = parseInt(colorStr.slice(2, 4), 16);
                B = parseInt(colorStr.slice(4, 6), 16)
            }
            if (!b) {
                b = 100
            }
            if (typeof b === 'string') {
                b = b.split(',')[0]
            }
            b = parseInt(b, 10) / 100;
            return 'rgba(' + R + ',' + G + ',' + B + ',' + b + ')'
        }

        var p = function (x, y, a, b, c) {
            x = x ? x : 0;
            y = y ? y : 0;
            a = (typeof a !== 'undefined') ? a : 400;
            b = (typeof b !== 'undefined') ? b : 400;
            c = (typeof c !== 'undefined') ? c : 0;
            var d, x2, y1, y2, tan, temp;
            tan = Math.tan((c * Math.PI) / 180);
            y1 = Math.round(b / 2 - ((a / 2) * tan));
            d = Math.round(a / 2 - ((b / 2) / tan));
            d = (d < 0) ? 0 : d;
            d = (d > a) ? a : d;
            y1 = (y1 < 0) ? 0 : y1;
            y1 = (y1 > b) ? b : y1;
            x2 = a - d;
            y2 = b - y1;
            if (c > 90 && c <= 270) {
                temp = y1;
                y1 = y2;
                y2 = temp
            }
            if (c > 180 && c <= 360) {
                temp = d;
                d = x2;
                x2 = temp
            }
            return [d + x, y1 + y, x2 + x, y2 + y]
        };
        var q = function (a, b, c) {
            var x, first, count = 0, blendAt, rgb, alpha, colorStop = [];
            b = b ? b.split(",") : undefined;
            c = c ? c.split(",") : undefined;
            a = a.split(",");
            first = (typeof c === 'object') ? c[0] : undefined;
            for (x = 0; x < a.length; x += 1) {
                rgb = a[x];
                blendAt = c ? c[x] : undefined;
                alpha = b ? b[x] : 100;
                alpha = alpha ? alpha : 100;
                if (!blendAt) {
                    first = 1;
                    blendAt = (x !== 0) ? ((100 - count) / (a.length - x)) : 0
                }
                if (first) {
                    count += parseInt(blendAt, 10)
                } else {
                    count = parseInt(blendAt, 10)
                }
                if (count >= 100) {
                    colorStop.push([1, convertColor(rgb, alpha)]);
                    break
                } else {
                    colorStop.push([count / 100, convertColor(rgb, alpha)])
                }
            }
            return colorStop
        };
        var r = function (x, y, a, b, c, d, e, f) {
            var g = {};
            g.linearGradient = p(x, y, a, b, c);
            g.stops = q(d, e, f);
            if ('\v' === 'v') {
                if (2 * g.linearGradient[0] > a) {
                    g.stops.reverse();
                    for (var i = 0; i < g.stops.length; i += 1) {
                        g.stops[i][0] = 1 - g.stops[i][0]
                    }
                }
                if (g.stops[g.stops.length - 1][0] !== 1) {
                    g.stops.push([1, g.stops[g.stops.length - 1][1]])
                }
                if (g.stops[0][0] !== 0) {
                    g.stops.splice(0, 0, [0, g.stops[0][1]])
                }
            }
            return g
        };
        var s = function (a) {
            return FCFCC.highCharts[a]
        };
        var t = function (a) {
            var x, psum = 0, pareto = {
                yAxis: 1, data: [], type: 'line', color: 'rgba(00,00,00,1)', FCtype: 1.5
            }, sum = 0;
            if (a instanceof Array) {
                for (x = 0; x < a.length; x += 1) {
                    sum += a[x].y
                }
                for (x = 0; x < a.length; x += 1) {
                    psum += a[x].y;
                    pareto.data.push({
                        y: Math.round((psum / sum) * 10000) / 100
                    })
                }
            }
            return pareto
        };
        var u = function (a) {
            var b = a.substring(a.indexOf('.swf'), 0);
            return b.substring(b.lastIndexOf('/') + 1)
        };
        var v = function (a, b, d) {
            d = d === undefined ? 1 : d;
            var e = {
                formatnumber: 1,
                formatnumberscale: 1,
                defaultnumberscale: '',
                numberscaleunit: 'K,M',
                numberscalevalue: '1000,1000',
                numberprefix: "",
                numbersuffix: "",
                decimalseparator: ".",
                thousandseparator: ",",
                indecimalseparator: "",
                inthousandseparator: "",
                decimals: "",
                forcedecimals: "0",
                yaxisvaluedecimals: "",
                sformatnumber: "1",
                sformatnumberscale: "0",
                sdefaultnumberscale: "",
                snumberscaleunit: "K,M",
                snumberscalevalue: "1000,1000",
                snumberprefix: "",
                snumbersuffix: "",
                sdecimals: "",
                sforcedecimals: "0",
                syaxisvaluedecimals: "0"
            };
            var f, numberScaleUnit, result, i, res, power, formatedNum = '', c = 0, initialVal, decimalVal, splitVal, decimalLength, last;
            for (i in b) {
                e[i.toLowerCase()] = b[i]
            }
            a = e.indecimalseparator !== '' ? a.toString().replace(e.indecimalseparator, '.') : a;
            a = e.inthousandseparator !== '' ? a.toString().replace(e.inthousandseparator, '') : a;
            if (d !== 1) {
                e.formatnumber = e.sformatnumber;
                e.formatnumberscale = e.sformatnumberscale;
                e.defaultnumberscale = e.sdefaultnumberscale;
                e.numberscaleunit = e.snumberscaleunit;
                e.numberscalevalue = e.snumberscalevalue;
                e.numberprefix = e.snumberprefix;
                e.numbersuffix = e.snumbersuffix;
                e.decimals = e.sdecimals;
                e.forcedecimals = e.sforcedecimals;
                e.yaxisvaluedecimals = e.syaxisvaluedecimals
            }
            f = e.numberscalevalue.split(',');
            numberScaleUnit = e.numberscaleunit.split(',');
            result = res = a.toString();
            if (e.formatnumber == 1) {
                if (res.indexOf('.') !== -1) {
                    splitVal = res.split('.');
                    initialVal = splitVal[0];
                    decimalVal = '.' + splitVal[1]
                } else {
                    initialVal = res;
                    decimalVal = ''
                }
                for (i = initialVal.length; i > 0; i -= 1) {
                    if (c % 3 === 0 && c !== 0) {
                        formatedNum = e.thousandseparator + formatedNum;
                        c = 0
                    }
                    formatedNum = res.charAt(i - 1) + formatedNum;
                    c += 1
                }
                result = (splitVal === undefined) || (decimalVal === 0) ? formatedNum : formatedNum + decimalVal
            }
            if (e.formatnumberscale == 1) {
                res = a;
                for (i = 0; i < f.length && res / f[i] >= 1; i += 1) {
                    res = res / f[i]
                }
                i -= 1;
                if (e.decimals === '') {
                    e.decimals = '2'
                }
                power = Math.pow(10, e.decimals);
                result = (i === -1) ? Math.round(res * power) / power : Math
                    .round(res * power) / power
            }
            if (e.forcedecimals == 1) {
                if (result.toString().indexOf(e.decimalseparator) !== -1) {
                    decimalVal = result.toString().split(e.decimalseparator)[1];
                    decimalLength = decimalVal.length
                } else {
                    decimalLength = 0
                }
                if (decimalLength === 0) {
                    result += e.decimalseparator
                }
                if (decimalLength > e.decimals) {
                    if (e.decimals == 1 && decimalVal[0] >= 5) {
                        last = result[result.substring(0, result.indexOf('.')).length - 1];
                        last += 1;
                        result = result.substring(0, (result.indexOf('.') - 1)) + last;
                        result = result + '.' + '0'
                    } else if (decimalVal[e.decimals - 1] >= 5) {
                        last = decimalVal[e.decimals] >= 5 ? (parseInt(decimalVal[e.decimals - 1], 10) + 1) : decimalVal[e.decimals - 1];
                        decimalVal = decimalVal.substring(0, e.decimals - 1) + last;
                        result = result.substring(0, result.indexOf('.')) + '.' + decimalVal
                    }
                } else {
                    while (decimalLength < e.decimals) {
                        result += '0';
                        decimalLength += 1
                    }
                }
            }
            if (e.formatnumberscale == 1) {
                result += (i === -1) ? e.defaultnumberscale : numberScaleUnit[i]
            }
            result = e.numberprefix + result + e.numbersuffix;
            if (e.decimalseparator !== "." && e.decimalseparator !== "") {
                result = result.toString().replace('.', e.decimalseparator)
            }
            return result
        };
        var w = function (a) {
            var x = 'circle';
            switch (a) {
                case 3:
                    x = 'triangle';
                    break;
                case 4:
                    x = 'diamond';
                    break;
                default:
                    x = 'square';
                    break
            }
            if (isNaN(a)) {
                x = 'circle'
            }
            return x
        };
        var A;
        var C = function (a, b) {
            var c = '', arr, chartId, sender;
            if ((a === 2 && this.link) || (a === 1 && this.options.chart.link)) {
                if (a === 2 && this.link) {
                    c = b == '0' ? this.link : window
                        .decodeURIComponent(this.link);
                    c.replace(/^[\s]*/, '');
                    arr = this.link.split('-');
                    chartId = this.options.id;
                    sender = M.core.items[chartId]
                } else if (a === 1 && this.options.chart.link) {
                    c = b == '0' ? this.options.chart.link : window
                        .decodeURIComponent(this.options.chart.link);
                    c.replace(/^[ ]*/, '');
                    arr = this.options.chart.link.split('-');
                    chartId = this.options.chart.renderTo;
                    sender = M.core.items[chartId]
                }
                switch (arr[0].toLowerCase()) {
                    case 'n':
                        window.open(arr[1]);
                        break;
                    case 'f':
                        if (frames[arr[1]]) {
                            frames[arr[1]].location = arr[2]
                        } else {
                            window.open(arr[2], arr[1])
                        }
                        break;
                    case 'j':
                        try {
                            window[arr[1]](arr[2])
                        } catch (er) {
                        }
                        break;
                    case 'p':
                        A = window.open(arr[2], arr[1].match(/[^,]+/i), arr[1]
                            .replace(/[^,]+,/i, ''));
                        if (window.focus) {
                            A.focus()
                        }
                        break;
                    case 'newchart':
                        var d = arr[1].toLowerCase().search('url') != -1 ? 'URL' : FusionChartsDataFormats.JSON, data, x, chartJson,
                            linkchartId;
                        if (d === 'URL') {
                            data = c.replace(/[^\-]+-[^\-]+-/i, '')
                        } else {
                            chartJson = M.core.items[chartId]
                                .getChartData(FusionChartsDataFormats.JSON);
                            linkchartId = c.replace(/[^\-]+-[^\-]+-/i, '');
                            if (chartJson.linkeddata) {
                                for (x = 0; x < chartJson.linkeddata.length; x += 1) {
                                    if (chartJson.linkeddata[x].id == linkchartId) {
                                        data = chartJson.linkeddata[x].linkedchart
                                    }
                                }
                            }
                        }
                        M.raiseEvent('LinkedChartInvoked', {
                            linkType: d, data: data
                        }, sender);
                        break;
                    default:
                        arr = c.split(':');
                        if (arr[0].toLowerCase() == 'javascript') {
                            try {
                                eval(arr[1])
                            } catch (err) {
                            }
                        } else {
                            window.location.href = c
                        }
                        break
                }
            }
        };
        var D = function (a) {
            var b = 0, x, y, temp;
            if (a instanceof Array) {
                for (x = 0; x < a.length; x += 1) {
                    if (a[x].data instanceof Array) {
                        for (y = 0; y < a[x].data.length; y += 1) {
                            temp = parseInt(a[x].data[y].z, 10);
                            b = (b > temp) ? b : temp
                        }
                    }
                }
            }
            return b
        };
        var E = function (a, b) {
            var c, max = 5;
            c = (a > b) ? b : a;
            if (c > 100) {
                max = c / 8
            }
            return max
        };
        var F = function (a, b) {
            var c = this.width, height = this.height, chart = u(this.src), id = this.id, jsonObj, container, dataComp, HCJson;
            removeChart(id, b);
            createContainer.call(this, a, id, c, height, b);
            dataComp = this.getChartData(FusionChartsDataFormats.JSON, true);
            jsonObj = dataComp.data;
            if (!FCFCC.highCharts[chart]) {
                HCJson = createMsg(id, 'ChartNotSupported', 'featurenotsupported')
            } else if (n[id].msgTxt) {
                HCJson = createMsg(id, 'msgTxt', undefined)
            } else if (this.jsVars && this.jsVars.LoadError) {
                HCJson = createMsg(id, 'LoadDataErrorText', undefined)
            } else if (this.jsVars && this.jsVars.stallLoad) {
                HCJson = createMsg(id, 'XMLLoadingText', undefined)
            } else if (dataComp.error instanceof Error) {
                HCJson = createMsg(id, 'InvalidXMLText', 'nodatatodisplay')
            } else {
                container = document.getElementById(id);
                HCJson = covertToFCC(id, chart, jsonObj, id, container.offsetWidth, container.offsetHeight);
                if (HCJson.series.length === 0) {
                    HCJson = createMsg(id, 'NoDataText', 'nodatatodisplay')
                }
            }
            return HCJson
        };
        var H = function (a, b) {
            if (b.options.renderer !== 'javascript') {
                return
            }
            var c = FCFCC.method.getExternalInterfaceMethods(b.chartType())
                .split(','), i;
            for (i = 0; i < c.length; i += 1) {
                if (typeof a[c[i]] === 'function') {
                    continue
                }
                if (FCFCC.method[c[i]] === undefined) {
                    a[c[i]] = noEffect
                } else {
                    a[c[i]] = FCFCC.method[c[i]]
                }
            }
        };

        function createChart(a, b) {
            var c = u(this.src), id = this.id;
            if (!(this.jsVars && this.jsVars.transparent)) {
                jQuery('#' + this.id).css('background-color', '#FFFFFF')
            }
            var d = document.getElementById(id);
            d.drawOverlayButton = drawOverlayButton;
            d.showChartMessage = showChartMessage;
            d.getExternalInterfaceMethods = FCFCC.method.getExternalInterfaceMethods;
            H(d, this);
            if (typeof a === 'function') {
                try {
                    a({
                        success: true, ref: d, id: id
                    })
                } catch (err) {
                }
            }
            d.FCC = new Highcharts.Chart(b);
            var e = jQuery('.highcharts-grid')[0];
            var f = jQuery('.highcharts-grid')[1];
            if (e && f) {
                e.parentNode.insertBefore(f, e)
            }
            FCC.items[id] = {
                'baseObj': b, 'FCCObj': d, 'chartType': c
            }
        }

        var I = function (c, d) {
            var e;
            clearTimeout(c.timeChach);
            e = M.core.items[d];
            c.timeChach = setTimeout((function (b) {
                return function () {
                    var a = b.id, __containerId = b.options.containerElementId, HCJson;
                    if (typeof __containerId !== 'undefined' && typeof FCC.items[a] !== 'undefined') {
                        HCJson = F.call(b, __containerId);
                        HCJson.chart.events.load = function () {
                            M.raiseEvent('loaded', {}, b);
                            M.raiseEvent('resized', {}, b)
                        };
                        HCJson.plotOptions.series.animation = false;
                        createChart.call(b, undefined, HCJson)
                    }
                }
            }(e)), 500)
        };
        var J = function () {
            var a, FCCContainer, id;
            for (var x in FCC.items) {
                id = x;
                a = FCC.items[x];
                FCCContainer = document.getElementById(x);
                if (FCCContainer && (FCCContainer.offsetWidth != a.FCCObj.FCC.chartWidth || FCCContainer.offsetHeight != a.FCCObj.FCC.chartHeight)) {
                    I(a, id)
                }
            }
        };
        if (window.addEventListener) {
            window.addEventListener("resize", J, false)
        } else if (window.attachEvent) {
            window.attachEvent("onresize", J)
        } else {
            window.onresize = J
        }
        var K = function (a) {
            return {
                FCconf: {
                    negative: false, stackValue: []
                }, chart: {
                    alignTicks: false, renderTo: '', ignoreHiddenSeries: false, events: {
                        click: function () {
                            C.call(this, 1, a.chart.unescapelinks)
                        }
                    }, margin: [15, 15, 50, 60], borderRadius: 0, plotBackgroundColor: '#FFFFFF'
                }, colors: [], credits: {
                    href: 'http://www.fusioncharts.com?BS=FCHSEvalMark', text: 'FusionCharts - HighCharts', enabled: N
                }, global: {}, labels: {
                    items: []
                }, lang: {}, legend: {
                    enabled: true, symbolWidth: 5, borderRadius: 0, itemStyle: {}
                }, loading: {}, plotOptions: {
                    series: {
                        borderColor: '#333333', events: {}, dataLabels: {
                            enabled: true, color: '#555555', style: {}, formatter: function () {
                                var x, y,
                                    showvalue = this.point.options.showvalue || this.series.options.showvalue || this.series.chart.options.chart.showvalue;
                                if (this.series.type == 'pie') {
                                    x = (a.chart.showlabels === '0' || !this.point.FCname ? '' : this.point.FCname);
                                    y = showvalue === '1' ? (Math
                                        .round(this.percentage * 100) / 100) + (a.chart.showpercentagevalues === '1' ? '%' : '') : '';
                                    return parseStr(x + (x !== '' && y !== '' ? a.chart.tooltipsepchar : '') + y)
                                } else if (showvalue === '1') {
                                    if (this.point.options.displayvalue) {
                                        x = this.point.options.displayvalue
                                    } else {
                                        x = v(this.y, a.chart, 1);
                                        if (this.series.options.FCtype == 1.5 && this.series.type == 'line') {
                                            x = this.y + '%'
                                        }
                                        if (this.series.options.FCtype == 7.5) {
                                            x = ''
                                        }
                                    }
                                    return parseStr(x)
                                } else {
                                    return ''
                                }
                            }
                        }, point: {
                            events: {
                                click: function () {
                                    C.call(this, 2, a.chart.unescapelinks)
                                }
                            }
                        }
                    }, area: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }, marker: {
                            lineWidth: 1, radius: 3, states: {
                                hover: {
                                    enabled: false
                                }, select: {
                                    enabled: false
                                }
                            }
                        }
                    }, areaspline: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }, marker: {
                            lineWidth: 1, radius: 3, states: {
                                hover: {
                                    enabled: false
                                }, select: {
                                    enabled: false
                                }
                            }
                        }
                    }, line: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }, marker: {
                            lineWidth: 1, radius: 3, states: {
                                hover: {
                                    enabled: false
                                }, select: {
                                    enabled: false
                                }
                            }
                        }
                    }, spline: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }, marker: {
                            lineWidth: 1, radius: 3, states: {
                                hover: {
                                    enabled: false
                                }, select: {
                                    enabled: false
                                }
                            }
                        }
                    }, pie: {
                        size: '80%', allowPointSelect: true, cursor: 'pointer'
                    }, column: {}
                }, point: {}, series: [{}], subtitle: {
                    text: '', style: {}
                }, symbols: [], title: {
                    text: '', style: {}
                }, toolbar: {}, tooltip: {
                    borderRadius: 0, style: {}, formatter: function () {
                        var x = '', charSep = a.chart.tooltipsepchar;
                        if (this.point.options.tooltext) {
                            x = this.point.options.tooltext
                        } else {
                            if (this.series.options.FCtype >= 2 && this.series.name !== ' ') {
                                x += this.series.name + charSep
                            }
                            x += this.x ? this.x + charSep : '';
                            if (this.series.options.FCtype == 1.5 && this.series.type == 'line') {
                                x = this.x + charSep + this.y + '%'
                            } else if (this.series.type == 'pie') {
                                x = (this.point.FCname ? this.point.FCname + charSep : '') + (Math.round(this.percentage * 100) / 100) + (a.chart.showpercentintooltip === '0' ? '' : '%')
                            } else if (this.series.options.FCtype === 2.5) {
                                x = v(this.y, a.chart, 1)
                            } else {
                                x += v(this.y, a.chart, 1)
                            }
                            if (this.point.z) {
                                x += charSep + this.point.z
                            }
                        }
                        return parseStr(x)
                    }
                }, xAxis: {
                    labels: {
                        rotation: -25, style: {}, formatter: function () {
                            return parseStr(typeof this.value === 'string' ? this.value : '')
                        }, align: 'right'
                    }, categories: [], plotLines: [], plotBands: [], title: {
                        style: {}, text: ''
                    }
                }, yAxis: [{
                    startOnTick: false, endOnTick: false, title: {
                        style: {}, text: ''
                    }, labels: {
                        style: {}, formatter: function () {
                            return parseStr(v(this.value, a.chart, 1))
                        }
                    }, plotBands: [], plotLines: []
                }, {
                    gridLineWidth: 0, startOnTick: false, endOnTick: false, title: {
                        style: {}, text: ''
                    }, labels: {
                        style: {}, enabled: false, formatter: function () {
                            return parseStr(v(this.value, a.chart, 2))
                        }
                    }, opposite: true
                }], exporting: {
                    buttons: {
                        exportButton: {}, printButton: {
                            enabled: false
                        }
                    }
                }
            }
        };

        function addVline(a, b, c, d, e) {
            a.xAxis.plotLines.push({
                color: convertColor(b || '#444444', c || 100), width: d ? d : 1, value: e
            })
        }

        function addPoint(a, b, c, d, e, f, g, h, i) {
            var x, y, isAbs = FCFCC.valueAbs[d], value, seriesType = a.type || f.chart.defaultSeriesType, dataseperator, tempY, dataYmax,
                dataYmin, loopMax;
            if (!a.yAxis) {
                dataYmax = 'dataY0max';
                dataYmin = 'dataY0min'
            } else {
                dataYmax = 'dataY' + a.yAxis + 'max';
                dataYmin = 'dataY' + a.yAxis + 'min'
            }
            if (c < 7 && c >= 2 && c != 2.5) {
                loopMax = f.xAxis.categories.length
            } else {
                loopMax = b.length
            }
            if (b instanceof Array) {
                for (y = 0; y < loopMax; y += 1) {
                    if (typeof b[y] === 'object') {
                        if (!b[y].vline) {
                            if (a.cursor != 'pointer' && b[y].link) {
                                a.cursor = 'pointer'
                            }
                            tempY = (isAbs ? Math.abs(parseFloat(b[y].value || b[y].y)) : parseFloat(b[y].value || b[y].y));
                            if (tempY < 0) {
                                f.FCconf.negative = true
                            }
                            if (typeof f.FCconf[dataYmax] === 'undefined' || tempY > f.FCconf[dataYmax]) {
                                f.FCconf[dataYmax] = tempY
                            }
                            if (typeof f.FCconf[dataYmin] === 'undefined' || tempY < f.FCconf[dataYmin]) {
                                f.FCconf[dataYmin] = tempY
                            }
                            if (typeof f.FCconf.stackValue[y] === 'undefined') {
                                f.FCconf.stackValue[y] = tempY
                            } else {
                                f.FCconf.stackValue[y] += tempY
                            }
                            a.data
                                .push({
                                    y: tempY || 0,
                                    x: (isAbs ? Math
                                        .abs(parseFloat(b[y].x)) : parseFloat(b[y].x)) || undefined,
                                    z: (isAbs ? Math
                                        .abs(parseFloat(b[y].z)) : parseFloat(b[y].z)) || undefined,
                                    color: (c < 2 || b[y].color || b[y].alpha) ? convertColor(b[y].color || (c < 2 && g(y)), b[y].alpha, a.color) : undefined,
                                    FCname: c < 2 ? b[y].label : undefined,
                                    link: b[y].link,
                                    sliced: b[y].issliced == '1',
                                    id: e,
                                    displayvalue: b[y].displayvalue,
                                    showvalue: b[y].showvalue,
                                    tooltext: b[y].tooltext,
                                    marker: (seriesType === 'areaspline' || seriesType === 'spline' || seriesType === 'area' || seriesType === 'line') ? {
                                        enabled: b[y].drawanchors ? (b[y].drawanchors == '1' ? true : false) : undefined,
                                        radius: b[y].anchorradius ? b[y].anchorradius : undefined,
                                        symbol: w(parseInt(b[y].anchorsides, 10)),
                                        fillColor: b[y].anchorbgcolor ? convertColor(b[y].anchorbgcolor || 'FFFFFF', b[y].anchorbgalpha || 100) : undefined,
                                        lineColor: b[y].anchorbordercolor ? convertColor(b[y].anchorbordercolor || '767575', b[y].anchoralpha || 100) : undefined,
                                        lineWidth: b[y].anchorborderthickness ? b[y].anchorborderthickness : undefined
                                    } : (c === 7.5 ? {
                                        radius: b[y].z ? Math
                                            .round((b[y].z / h) * 10) / 10 : undefined
                                    } : null)
                                });
                            if (c < 2) {
                                f.xAxis.categories
                                    .push(b[y].showlabel === '0' ? '' : (b[y].label || ''))
                            }
                        } else if (c < 2) {
                            addVline(f, b[y].color, b[y].alpha, b[y].thickness, y - 0.5)
                        }
                    } else if (typeof b[y] === 'string' && i.chart.compactdatamode == '1') {
                        dataseperator = i.chart.dataseparator || '|';
                        value = b[y].split(dataseperator);
                        for (x = 0; x < value.length; x += 1) {
                            tempY = isAbs ? Math.abs(parseFloat(value[x])) : parseFloat(value[x]);
                            if (tempY < 0) {
                                f.FCconf.negative = true
                            }
                            if (typeof f.FCconf[dataYmax] === 'undefined' || tempY > f.FCconf[dataYmax]) {
                                f.FCconf[dataYmax] = tempY
                            }
                            if (typeof f.FCconf[dataYmin] === 'undefined' || tempY < f.FCconf[dataYmin]) {
                                f.FCconf[dataYmin] = tempY
                            }
                            a.data.push({
                                y: tempY || 0
                            })
                        }
                    } else {
                        a.data.push({
                            y: 0
                        })
                    }
                }
            }
        }

        function addCategory(a, b, c) {
            var x, dataseperator, countCat = 0, zoomCat = [];
            if (a.categories && a.categories[0].category) {
                for (x = 0; x < a.categories[0].category.length; x += 1) {
                    if (typeof a.categories[0].category[x] === 'object') {
                        if (!a.categories[0].category[x].vline) {
                            if (b == 2.5) {
                                zoomCat
                                    .push(a.categories[0].category[x].label ? a.categories[0].category[x].label : '')
                            } else {
                                c.xAxis.categories
                                    .push(a.categories[0].category[x].label ? a.categories[0].category[x].label : '')
                            }
                            countCat += 1
                        } else {
                            addVline(c, a.categories[0].category[x].color, a.categories[0].category[x].alpha, a.categories[0].category[x].thickness, countCat - 0.5)
                        }
                    } else if (typeof a.categories[0].category[x] === 'string' && a.chart.compactdatamode == '1') {
                        dataseperator = a.chart.dataseparator ? a.chart.dataseparator : '|';
                        if (b == 2.5) {
                            zoomCat = zoomCat
                                .concat(a.categories[0].category[x]
                                    .split(dataseperator))
                        } else {
                            c.xAxis.categories = c.xAxis.categories
                                .concat(a.categories[0].category[x]
                                    .split(dataseperator))
                        }
                    }
                }
            }
            if (b === 2.5) {
                c.xAxis.maxZoom = 2;
                c.chart.zoomType = 'x';
                c.chart.showvalue = a.chart.showvalues === '1' ? '1' : '0';
                c.xAxis.categories = undefined;
                c.xAxis.min = 0;
                c.xAxis.max = zoomCat.length - 1;
                c.xAxis.endOnTick = false;
                c.xAxis.labels.formatter = function () {
                    return parseStr(zoomCat[this.value])
                }
            }
        }

        function MSStacked(b, c, d, e, f, g, h, i) {
            var x, y, z, newSeries, count_set = 0, max_cat = 0, a = [], plotWidth = f - (e.chart.margin[1] + e.chart.margin[3]),
                plotHight = g - (e.chart.margin[0] + e.chart.margin[2]), noStack, pointWidth, catWidth, tempheight, maxHight = 0,
                pointValue = 0;
            if (b.categories && b.categories[0] && b.categories[0].category) {
                max_cat = b.categories[0].category.length
            }
            if (b.dataset && b.dataset instanceof Array) {
                noStack = b.dataset.length;
                catWidth = plotWidth / max_cat;
                pointWidth = catWidth / (noStack + 2);
                for (x = 0; x < b.dataset.length; x += 1) {
                    tempheight = [];
                    if (b.dataset[x].dataset && b.dataset[x].dataset instanceof Array) {
                        for (y = 0; y < b.dataset[x].dataset.length; y += 1) {
                            newSeries = {
                                FCtype: c,
                                type: b.dataset[x].dataset[y].renderas ? FCFCC.combi[b.dataset[x].dataset[y].renderas
                                    .toLowerCase()] : undefined,
                                name: b.dataset[x].dataset[y].seriesname ? b.dataset[x].dataset[y].seriesname : ' ',
                                data: [],
                                color: convertColor(b.dataset[x].color || i(count_set), b.dataset[x].dataset[y].alpha || 100),
                                yAxis: b.dataset[x].dataset[y].parentyaxis == 'S' ? 1 : undefined,
                                showvalue: b.dataset[x].dataset[y].showvalues,
                                mColum: x,
                                mStack: y
                            };
                            if (b.dataset[x].dataset[y].data instanceof Array) {
                                for (z = 0; z < max_cat; z += 1) {
                                    tempheight[z] = tempheight[z] ? tempheight[z] : 0;
                                    pointValue = (b.dataset[x].dataset[y].data[z] && b.dataset[x].dataset[y].data[z].value) ? parseFloat(b.dataset[x].dataset[y].data[z].value) : '';
                                    tempheight[z] += pointValue ? pointValue : 0;
                                    newSeries.data
                                        .push({
                                            MWidth: pointWidth,
                                            MX: (z * catWidth) + ((x + 1) * pointWidth),
                                            MY: tempheight[z],
                                            y: pointValue,
                                            link: b.dataset[x].dataset[y].data[z].link,
                                            id: h,
                                            color: b.dataset[x].dataset[y].data[z].color ? convertColor(b.dataset[x].dataset[y].data[z].color || i(count_set), b.dataset[x].dataset[y].data[z].alpha || 100) : undefined
                                        })
                                }
                            }
                            a.push(newSeries);
                            count_set += 1
                        }
                    }
                    for (z = 0; z < max_cat; z += 1) {
                        if (maxHight < tempheight[z]) {
                            maxHight = tempheight[z]
                        }
                    }
                }
            }
            e.yAxis[0].max = maxHight + 5;
            return a
        }

        function addData(c, d, e, f, g, h, i) {
            var a = [], x, y, z, count_set, getScolor, pareto, yCalTemp;
            getScolor = function (a) {
                var b;
                b = (c.chart.palettecolors) ? ((typeof c.chart.palettecolors === 'string') ? c.chart.palettecolors
                    .split(',') : c.chart.palettecolors) : FCFCC.color;
                return b[a % b.length]
            };
            switch (d) {
                case 1:
                case 1.5:
                    if (d == 1.5) {
                        f.yAxis[1].max = 100;
                        f.yAxis[1].labels.formatter = function () {
                            return parseStr(this.value + '%')
                        };
                        if (c.data instanceof Array) {
                            c.data.sort(function (a, b) {
                                return parseFloat(b.value) - parseFloat(a.value)
                            })
                        }
                    }
                    f.legend.enabled = false;
                    if (c.data) {
                        z = createSeries(d);
                        addPoint(z, c.data, d, e, i, f, getScolor);
                        if (s(e) == 'pie') {
                            z.data.reverse();
                            z.color = undefined;
                            f.chart.plotBorderWidth = 0;
                            x = f.chart.borderWidth + 1;
                            f.chart.margin = [f.chart.margin[0], x, x, x]
                        }
                        a.push(z);
                        if ((e == 'Pareto2D' || e == 'Pareto3D') && c.chart.showcumulativeline !== '0') {
                            pareto = t(z.data);
                            a.push(pareto)
                        }
                    }
                    break;
                case 2:
                case 2.2:
                case 2.5:
                case 3:
                case 4:
                case 5:
                case 5.5:
                case 6:
                case 6.5:
                    switch (d) {
                        case 2.2:
                            f.yAxis[0].reversed = true;
                            f.yAxis[0].PCreversed = true;
                            break;
                        case 3:
                            if (c.chart.stack100percent == '1') {
                                f.plotOptions.series.stacking = 'percent';
                                f.yAxis[0].labels.formatter = function () {
                                    return parseStr(this.value + '%')
                                }
                            } else {
                                f.plotOptions.series.stacking = 'normal'
                            }
                            break;
                        case 5.5:
                            f.plotOptions.column.stacking = c.chart.stack100percent == '1' ? 'percent' : 'normal'
                    }
                    addCategory(c, d, f);
                    if (d !== 6) {
                        if (c.dataset) {
                            count_set = 0;
                            for (x = 0; x < c.dataset.length; x += 1) {
                                z = createSeries(d, convertColor(c.dataset[x].color || getScolor(count_set), c.dataset[x].alpha || 100), c.dataset[x].renderas ? FCFCC.combi[c.dataset[x].renderas
                                    .toLowerCase()] : ((c.dataset[x].parentyaxis == 'S' && (d == 5 || d == 5.5)) ? 'line' : undefined), c.dataset[x].seriesname, c.dataset[x].parentyaxis == 'S', c.dataset[x].showvalues, c.dataset[x].plotbordercolor ? convertColor(c.dataset[x].plotbordercolor, c.dataset[x].plotborderalpha || 95) : undefined, parseInt(c.dataset[x].plotborderthickness || c.dataset[x].linethickness, 10) || undefined);
                                var j = z.type || f.chart.defaultSeriesType;
                                z.marker = (j === 'area' || j === 'line' || j === 'spline' || j === 'areaspline') ? {
                                    enabled: c.dataset[x].drawanchors ? (c.dataset[x].drawanchors == '1' ? true : false) : undefined,
                                    radius: c.dataset[x].anchorradius ? c.dataset[x].anchorradius : undefined,
                                    symbol: w(parseInt(c.dataset[x].anchorsides, 10)),
                                    fillColor: c.dataset[x].anchorbgcolor ? convertColor(c.dataset[x].anchorbgcolor || 'FFFFFF', c.dataset[x].anchorbgalpha || 100) : undefined,
                                    lineColor: c.dataset[x].anchorbordercolor ? convertColor(c.dataset[x].anchorbordercolor || '767575', c.dataset[x].anchoralpha || 100) : undefined,
                                    lineWidth: c.dataset[x].anchorborderthickness ? c.dataset[x].anchorborderthickness : undefined
                                } : null;
                                count_set += 1;
                                if (c.dataset[x].data) {
                                    addPoint(z, c.dataset[x].data, d, e, i, f, undefined, undefined, c)
                                }
                                a.push(z)
                            }
                            if (d == 3 || d == 5.5 || s(e) == 'bar') {
                                var k = [];
                                for (x = 0; x < a.length; x += 1) {
                                    if (a[x].type) {
                                        k.push(a[x])
                                    } else {
                                        k.splice(0, 0, a[x])
                                    }
                                }
                                a = k;
                                f.legend.reversed = true
                            }
                        }
                    } else {
                        a = MSStacked(c, d, e, f, g, h, i, getScolor)
                    }
                    break;
                case 7:
                case 7.5:
                    f.chart.showvalue = c.chart.showvalues == '1' ? '1' : '0';
                    if (c.categories && c.categories[0] && c.categories[0].category) {
                        for (x = 0; x < c.categories[0].category.length; x += 1) {
                            if (c.categories[0].category[x].showverticalline && c.categories[0].category[x].showverticalline == '1') {
                                addVline(f, c.categories[0].verticallinecolor, c.categories[0].verticallinealpha, c.categories[0].verticallinethickness, c.categories[0].category[x].x)
                            }
                            f.xAxis.categories[c.categories[0].category[x].x] = c.categories[0].category[x].label ? c.categories[0].category[x].label : ''
                        }
                    }
                    var l = D(c.dataset) / E(g, h);
                    if (c.dataset) {
                        count_set = 0;
                        for (x = 0; x < c.dataset.length; x += 1) {
                            z = createSeries(d, convertColor(c.dataset[x].color || getScolor(count_set), c.dataset[x].alpha || 100), c.dataset[x].renderas ? FCFCC.combi[c.dataset[x].renderas] : ((c.dataset[x].parentyaxis == 'S' && (d == 5 || d == 5.5)) ? 'line' : undefined), c.dataset[x].seriesname, c.dataset[x].parentyaxis == 'S', c.dataset[x].showvalues, undefined, undefined);
                            z.marker = {
                                symbol: (d == 7.5) ? 'circle' : w(parseInt(c.dataset[x].anchorsides, 10)), states: {
                                    hover: {
                                        enabled: false
                                    }
                                }
                            };
                            count_set += 1;
                            if (c.dataset[x].data) {
                                addPoint(z, c.dataset[x].data, d, e, i, f, getScolor, l)
                            }
                            a.push(z)
                        }
                    }
                    f.xAxis.max = c.chart.xaxismaxvalue ? parseInt(c.chart.xaxismaxvalue, 10) : undefined;
                    f.xAxis.min = c.chart.xaxisminvalue ? parseInt(c.chart.xaxisminvalue, 10) : undefined;
                    f.xAxis.showLastLabel = true;
                    break;
                default:
                    break
            }
            if (!((d === 3 || d === 5.5) && c.chart.stack100percent === '1') && e !== 'Marimekko') {
                if (d === 3 || d === 5.5) {
                    f.FCconf.dataY0max = f.FCconf.stackValue[0];
                    f.FCconf.dataY0min = f.FCconf.stackValue[0];
                    for (y = 1; y < f.FCconf.stackValue.length; y += 1) {
                        if (f.FCconf.stackValue[y] > f.FCconf.dataY0max) {
                            f.FCconf.dataY0max = f.FCconf.stackValue[y]
                        }
                        if (f.FCconf.stackValue[y] < f.FCconf.dataY0min) {
                            f.FCconf.dataY0min = f.FCconf.stackValue[y]
                        }
                    }
                }
                if (d === 1.5 || d === 5.5 || d === 5 || d === 6.5) {
                    yCalTemp = o(f.FCconf.dataY0max, f.FCconf.dataY0min, c.chart.pyaxismaxvalue, c.chart.pyaxisminvalue, '', c.chart.setadaptiveymin !== '1');
                    f.yAxis[0].max = yCalTemp.Max;
                    f.yAxis[0].min = yCalTemp.Min;
                    if (d !== 1.5) {
                        yCalTemp = o(f.FCconf.dataY1max, f.FCconf.dataY1min, c.chart.syaxismaxvalue, c.chart.syaxisminvalue, '', c.chart.setadaptivesymin !== '1');
                        f.yAxis[1].max = yCalTemp.Max;
                        f.yAxis[1].min = yCalTemp.Min
                    }
                } else {
                    yCalTemp = o(f.FCconf.dataY0max, f.FCconf.dataY0min, c.chart.yaxismaxvalue, c.chart.yaxisminvalue, '', c.chart.setadaptiveymin !== '1');
                    f.yAxis[0].max = yCalTemp.Max;
                    f.yAxis[0].min = yCalTemp.Min
                }
            }
            f.series = a
        }

        function ModyfyLegend(b, c) {
            var d = b.series.length, legendPos, legendWidth, legendHeight;
            if (c.chart.showlegend == '0') {
                b.legend.enabled = false
            } else {
                b.legend.labelFormatter = function () {
                    return parseStr(this.name)
                };
                if (c.chart.interactivelegend == '0') {
                    b.plotOptions.series.events.legendItemClick = function (a) {
                        return false
                    };
                    b.legend.itemStyle.cursor = 'default'
                }
                b.legend.shadow = c.chart.legendshadow == '0' ? false : true;
                b.legend.backgroundColor = convertColor(c.chart.legendbgcolor || '#ffffff', c.chart.legendbgalpha || 100);
                b.legend.borderColor = convertColor(c.chart.legendbordercolor || '#545454', c.chart.legendborderalpha || 100);
                b.legend.borderWidth = c.chart.legendborderthickness || 1;
                if (c.reverselegend == '1') {
                    b.legend.reversed = !b.legend.reversed
                }
                if (c.chart.legendposition == 'RIGHT') {
                    b.legend.verticalAlign = 'middle';
                    b.legend.align = 'right';
                    b.legend.width = 70;
                    b.legend.x = -15;
                    b.chart.margin[1] += 85
                } else {
                    b.legend.x = 0;
                    b.chart.margin[2] += 46
                }
            }
        }

        function createText(a, b, c) {
            return {
                html: a, style: {
                    left: c + 'px', top: b + 'px'
                }
            }
        }

        function convertMarimeko(a, b, c, d, e) {
            var f = c - (a.chart.margin[1] + a.chart.margin[3]), plotHight = d - (a.chart.margin[0] + a.chart.margin[2]), y, z, arr = [],
                total = 0, temp, setPersent = false, catCountFlag = true, temp2, totalpercent = 0;
            if (a.xAxis.labels.enabled === false && b.chart.showxaxispercentvalues != '0') {
                a.xAxis.title.margin += 15;
                a.chart.margin[2] += 15
            }
            if (a.xAxis.labels.enabled !== false && b.chart.showxaxispercentvalues != '0') {
                plotHight += 15
            }
            if (e && e[0] && e[0].category instanceof Array) {
                temp = 0;
                for (y = 0; y < e[0].category.length; y += 1) {
                    if (e[0].category[y].widthpercent) {
                        temp += parseFloat(e[0].category[y].widthpercent)
                    } else {
                        break
                    }
                }
                if (y === e[0].category.length && Math.round(temp) === 100) {
                    setPersent = true
                }
            }
            for (y = 0; y < a.series.length; y += 1) {
                for (z = 0; z < a.series[y].data.length; z += 1) {
                    if (typeof a.series[y].data[z] == 'object') {
                        temp = parseFloat(a.series[y].data[z].y)
                    } else {
                        temp = parseFloat(a.series[y].data[z])
                    }
                    arr[z] = arr[z] ? arr[z] + temp : temp;
                    total += temp
                }
            }
            for (y = 0; y < a.series.length; y += 1) {
                temp = 0;
                for (z = 0; z < a.series[y].data.length; z += 1) {
                    if (typeof a.series[y].data[z] !== 'object') {
                        a.series[y].data[z] = {
                            y: a.series[y].data[z]
                        }
                    }
                    a.series[y].data[z].MX = temp;
                    if (catCountFlag) {
                        if (a.xAxis.labels.enabled !== false) {
                            a.labels.items.push(createText(a.xAxis.categories[z], plotHight, temp))
                        }
                        if (b.chart.showsum != '0') {
                            a.labels.items.push(createText(v(arr[z], b.chart), '-14', temp))
                        }
                    }
                    temp2 = setPersent ? parseFloat(e[0].category[z].widthpercent) / 100 : (arr[z] / total);
                    totalpercent += temp2;
                    temp += a.series[y].data[z].MWidth = Math.round(f * temp2);
                    if (catCountFlag && b.chart.showxaxispercentvalues != '0' && totalpercent < 0.9) {
                        a.labels.items.push(createText((Math
                            .round(totalpercent * 10000) / 100) + '%', plotHight - 15, temp - 20))
                    }
                }
                catCountFlag = false
            }
            a.xAxis.labels.enabled = false
        }

        function covertToFCC(a, b, c, d, e, f) {
            var g, y = getSeriesName(b), x, z, l, j, styleName, tempstyle = {}, styleArr;
            c.chart = c.chart || c.graph || {};
            delete c.graph;
            c.chart.tooltipsepchar = c.chart.tooltipsepchar || ',';
            g = K(c);
            g.chart.renderTo = a;
            g.chart.defaultSeriesType = s(b);
            if (g.chart.defaultSeriesType === 'line' || g.chart.defaultSeriesType === 'spline' || g.chart.defaultSeriesType === 'area' || g.chart.defaultSeriesType === 'areaspline') {
                g.xAxis.startOnTick = true;
                g.xAxis.endOnTick = true;
                g.xAxis.showLastLabel = true
            }
            g.plotOptions.series.shadow = c.chart.showshadow === '1';
            if (b == 'Doughnut2D' || b == 'Doughnut3D') {
                g.plotOptions.pie.innerSize = '50%'
            }
            if (c.chart.clickurl) {
                g.chart.link = c.chart.clickurl;
                g.chart.id = d
            }
            g.plotOptions.series.animation = c.chart.animation === '0' ? false : true;
            if (c.chart.showlabels == '0') {
                g.xAxis.labels.enabled = false;
                g.chart.margin[2] = 15
            }
            if (c.chart.showyaxisvalues == '0' || c.chart.showdivlinevalues == '0' || c.chart.showdivlinevalue == '0') {
                g.yAxis[0].labels.enabled = false;
                g.chart.margin[3] = 15
            }
            if (((y == 5 || y == 5.5) && c.chart.showyaxisvalues != '0' && c.chart.showdivlinesecondaryvalue != '0') || (y === 1.5 && c.chart.showdivlinesecondaryvalue != '0')) {
                g.yAxis[1].labels.enabled = true;
                g.chart.margin[1] = 50
            }
            g.xAxis.labels.style = {
                fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
            };
            g.yAxis[0].labels.style = {
                fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
            };
            g.yAxis[1].labels.style = {
                fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
            };
            g.legend.itemStyle = {
                fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
            };
            g.plotOptions.series.dataLabels.style = {
                fontFamily: c.chart.basefont || 'Verdana',
                fontSize: (c.chart.basefontsize || '10') + 'px',
                color: c.chart.basefontcolor || '#555555'
            };
            g.tooltip.style = {
                fontFamily: c.chart.basefont || 'Verdana',
                fontSize: (c.chart.basefontsize || '10') + 'px',
                color: c.chart.basefontcolor || '#555555'
            };
            if (c.chart.drawanchors == '0') {
                g.plotOptions.area.marker.enabled = g.plotOptions.line.marker.enabled = g.plotOptions.areaspline.marker.enabled = g.plotOptions.spline.marker.enabled = false;
                g.tooltip.enabled = false
            }
            if (c.chart.anchorradius) {
                g.plotOptions.area.marker.radius = g.plotOptions.line.marker.radius = g.plotOptions.areaspline.marker.radius = g.plotOptions.spline.marker.radius = c.chart.anchorradius
            }
            g.plotOptions.line.marker.lineColor = g.plotOptions.areaspline.marker.lineColor = g.plotOptions.spline.marker.lineColor = convertColor(c.chart.anchorbordercolor || '767575', c.chart.anchoralpha || 100);
            g.plotOptions.area.marker.lineColor = convertColor(c.chart.anchorbordercolor || '767575', c.chart.anchoralpha || 0);
            if (c.chart.anchorborderthickness) {
                g.plotOptions.area.marker.lineWidth = g.plotOptions.line.marker.lineWidth = g.plotOptions.areaspline.marker.lineWidth = g.plotOptions.spline.marker.lineWidth = c.chart.anchorborderthickness
            }
            g.plotOptions.line.marker.fillColor = g.plotOptions.spline.marker.fillColor = convertColor(c.chart.anchorbgcolor || 'FFFFFF', c.chart.anchorbgalpha || 100);
            g.plotOptions.area.marker.fillColor = g.plotOptions.areaspline.marker.fillColor = convertColor(c.chart.anchorbgcolor || 'FFFFFF', c.chart.anchorbgalpha || 0);
            if (c.chart.anchorsides) {
                g.plotOptions.area.marker.symbol = g.plotOptions.line.marker.symbol = g.plotOptions.areaspline.marker.symbol = g.plotOptions.spline.marker.symbol = w(parseInt(c.chart.anchorsides, 10))
            }
            g.plotOptions.line.lineWidth = g.plotOptions.spline.lineWidth = parseInt(c.chart.linethickness, 10) || (y === 1.5 ? 2 : 3);
            g.plotOptions.line.color = g.plotOptions.spline.color = convertColor(c.chart.linecolor || '767575', c.chart.linealpha || 100);
            g.plotOptions.area.color = g.plotOptions.areaspline.color = convertColor(c.chart.plotfillcolor || '767575', c.chart.plotfillalpha || 90);
            g.plotOptions.area.lineColor = g.plotOptions.areaspline.lineColor = convertColor(c.chart.plotbordercolor || "333333", c.chart.plotborderalpha || 95);
            g.plotOptions.area.lineWidth = g.plotOptions.areaspline.lineWidth = parseInt(c.chart.plotborderthickness, 10) || 1;
            g.yAxis[0].alternateGridColor = convertColor(c.chart.alternatehgridcolor || 'EEEEEE', c.chart.alternatehgridalpha || 50);
            g.yAxis[0].gridLineColor = convertColor(c.chart.divlinecolor || '717170', c.chart.divlinealpha || 40);
            g.yAxis[0].gridLineWidth = c.chart.divlinethickness ? c.chart.divlinethickness : 1;
            if (c.chart.caption) {
                g.title.text = parseStr(c.chart.caption);
                g.chart.margin[0] = 35;
                g.title.style = {
                    fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                    fontSize: '13px',
                    'font-weight': 'bold',
                    color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                }
            }
            if (c.chart.subcaption) {
                g.subtitle.text = parseStr(c.chart.subcaption);
                g.chart.margin[0] = 55;
                g.subtitle.style = {
                    fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                    fontSize: '11px',
                    'font-weight': 'bold',
                    color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                }
            }
            if (c.chart.xaxisname) {
                g.xAxis.title.text = parseStr(c.chart.xaxisname);
                g.xAxis.title.margin = g.chart.margin[2];
                g.chart.margin[2] += 20;
                g.xAxis.title.style = {
                    fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                    fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                    'font-weight': 'bold',
                    color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                }
            }
            if (y == 5 || y == 5.5 || y == 1.5) {
                if (c.chart.pyaxisname) {
                    g.yAxis[0].title.text = parseStr(c.chart.pyaxisname);
                    g.yAxis[0].title.margin = g.chart.margin[3];
                    g.chart.margin[3] += 20;
                    g.yAxis[0].title.style = {
                        fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                        fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                        'font-weight': 'bold',
                        color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                    }
                }
                if (c.chart.syaxisname) {
                    g.yAxis[1].title.text = parseStr(c.chart.syaxisname);
                    g.yAxis[1].title.margin = g.chart.margin[1];
                    g.chart.margin[1] += 20;
                    g.yAxis[1].title.style = {
                        fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                        fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                        'font-weight': 'bold',
                        color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                    }
                }
            } else if (c.chart.yaxisname) {
                g.yAxis[0].title.text = parseStr(c.chart.yaxisname);
                g.yAxis[0].title.margin = g.chart.margin[3];
                g.chart.margin[3] += 20;
                g.yAxis[0].title.style = {
                    fontFamily: c.chart.outcnvbasefont || c.chart.basefont || 'Verdana',
                    fontSize: (c.chart.outcnvbasefontsize || c.chart.basefontsize || '10') + 'px',
                    'font-weight': 'bold',
                    color: c.chart.outcnvbasefontcolor || c.chart.basefontcolor || '#555555'
                }
            }
            if (c.chart.showtooltip == '0') {
                g.tooltip.enabled = false
            }
            g.tooltip.backgroundColor = convertColor(c.chart.tooltipbgcolor || 'FFFFFF', c.chart.tooltipbgalpha || 100);
            g.tooltip.borderColor = convertColor(c.chart.tooltipbordercolor || '545454', c.chart.tooltipborderalpha || 100);
            g.tooltip.shadow = c.chart.showtooltipshadow == '1' ? true : false;
            g.chart.showvalue = c.chart.showvalues == '0' ? '0' : '1';
            if (c.trendlines) {
                for (x = 0; x < c.trendlines.length; x += 1) {
                    if (c.trendlines[x].line) {
                        for (z = 0; z < c.trendlines[x].line.length; z += 1) {
                            if (c.trendlines[x].line[z].istrendzone == '1') {
                                g.yAxis[0].plotBands
                                    .push({
                                        color: convertColor(c.trendlines[x].line[z].color || '333333', c.trendlines[x].line[z].alpha || 99),
                                        from: c.trendlines[x].line[z].startvalue ? c.trendlines[x].line[z].startvalue : 0,
                                        to: c.trendlines[x].line[z].endvalue
                                    })
                            }
                            g.yAxis[0].plotLines
                                .push({
                                    color: convertColor(c.trendlines[x].line[z].color || '333333', c.trendlines[x].line[z].alpha || 99),
                                    value: c.trendlines[x].line[z].startvalue ? c.trendlines[x].line[z].startvalue : 0,
                                    width: c.trendlines[x].line[z].thickness ? c.trendlines[x].line[z].thickness : 1
                                })
                        }
                    }
                }
            }
            if (c.vtrendlines) {
                for (x = 0; x < c.vtrendlines.length; x += 1) {
                    if (c.vtrendlines[x].line) {
                        for (z = 0; z < c.vtrendlines[x].line.length; z += 1) {
                            if (c.vtrendlines[x].line[z].istrendzone !== '0') {
                                g.xAxis.plotBands
                                    .push({
                                        color: convertColor(c.vtrendlines[x].line[z].color || '333333', c.vtrendlines[x].line[z].alpha || 99),
                                        from: c.vtrendlines[x].line[z].startvalue ? c.vtrendlines[x].line[z].startvalue : 0,
                                        to: c.vtrendlines[x].line[z].endvalue
                                    })
                            }
                            g.xAxis.plotLines
                                .push({
                                    color: convertColor(c.vtrendlines[x].line[z].color || '333333', c.vtrendlines[x].line[z].alpha || 99),
                                    value: c.vtrendlines[x].line[z].startvalue ? c.vtrendlines[x].line[z].startvalue : 0,
                                    width: c.vtrendlines[x].line[z].thickness ? c.vtrendlines[x].line[z].thickness : 1
                                })
                        }
                    }
                }
            }
            g.exporting.enabled = c.chart.exportenabled == '1' ? true : false;
            g.exporting.buttons.exportButton.enabled = c.chart.exportshowmenuitem == '0' ? false : true;
            g.exporting.filename = c.chart.exportfilename ? c.chart.exportfilename : 'FusionCharts';
            g.exporting.width = e;
            if (c.styles && c.styles.definition instanceof Array && c.styles.application instanceof Array) {
                for (j = 0; j < c.styles.definition.length; j += 1) {
                    if (typeof FCFCC.supportedStyle[c.styles.definition[j].type] === 'function') {
                        tempstyle[c.styles.definition[j].name.toLowerCase()] = c.styles.definition[j]
                    }
                }
                for (j = 0; j < c.styles.application.length; j += 1) {
                    styleArr = c.styles.application[j].styles.split(',');
                    for (l = 0; l < styleArr.length; l += 1) {
                        styleName = styleArr[l].toLowerCase();
                        if (tempstyle[styleName]) {
                            FCFCC.supportedStyle[tempstyle[styleName].type](g, c.styles.application[j].toobject
                                .toLowerCase(), tempstyle[styleName])
                        }
                    }
                }
            }
            g.chart.borderWidth = c.chart.showborder == '0' ? 0 : (c.chart.borderthickness ? c.chart.borderthickness : 1);
            g.chart.borderColor = convertColor(c.chart.bordercolor || '767575', c.chart.borderalpha || 50);
            g.chart.plotBorderColor = convertColor(c.chart.canvasbordercolor || '545454', c.chart.canvasborderalpha || 100);
            g.chart.plotBorderWidth = c.chart.canvasborderthickness ? c.chart.canvasborderthickness : 2;
            g.plotOptions.series.borderColor = convertColor(c.chart.plotbordercolor || '333333', c.chart.plotborderalpha || 95);
            g.plotOptions.series.borderWidth = c.chart.showplotborder == '0' ? 0 : (c.chart.plotborderthickness ? c.chart.plotborderthickness : 1);
            g.plotOptions.series.borderRadius = c.chart.useroundedges == '1' ? 5 : 0;
            g.yAxis[0].plotLines.push({
                color: convertColor(c.chart.zeroplanecolor || '717170', c.chart.zeroplanealpha || 80),
                value: 0,
                width: c.chart.zeroplanethickness || 2
            });
            addData(c, y, b, g, e, f, d);
            if (y >= 2) {
                ModyfyLegend(g, c)
            }
            if (typeof jsConf[d] === 'object') {
                g = margeClone(g, jsConf[d])
            }
            if (b == 'Marimekko') {
                g.plotOptions.series.pointPadding = 0;
                g.plotOptions.series.groupPadding = 0;
                g.plotOptions.series.shadow = false;
                g.plotOptions.series.dataLabels.y = 12;
                g.tooltip.formatter = function () {
                    var x = '', charSep = c.chart.tooltipsepchar;
                    x += this.series.name !== ' ' ? this.series.name + charSep : '';
                    x += this.x ? this.x + charSep : '';
                    if (c.chart.usepercentdistribution != '0') {
                        x += (parseInt(this.percentage * 100, 10) / 100) + '%'
                    } else {
                        x += v(this.y, c.chart, 1)
                    }
                    return parseStr(x)
                };
                if (c.chart.usepercentdistribution == '0') {
                    g.plotOptions.series.stacking = 'normal'
                } else {
                    g.plotOptions.series.stacking = 'percent';
                    g.yAxis[0].labels.formatter = function () {
                        return parseStr(this.value + '%')
                    }
                }
                convertMarimeko(g, c, e, f, c.categories)
            }
            g.chart.backgroundColor = r(0, 0, e, f ? f : 400, c.chart.bgangle !== undefined ? c.chart.bgangle : 270, c.chart.bgcolor ? c.chart.bgcolor : "CBCBCB,E9E9E9", c.chart.bgalpha ? c.chart.bgalpha : "50,50", c.chart.bgratio ? c.chart.bgratio : "0,100");
            var h, plotY;
            if ('\v' === 'v') {
                h = 0;
                plotY = 0
            } else {
                h = g.chart.margin[3];
                plotY = g.chart.margin[0]
            }
            g.chart.plotBackgroundColor = (s(b) == 'pie') ? 'rgba(255,255,255,0)' : (r(h, plotY, e - (g.chart.margin[1] + g.chart.margin[3]), (f ? f : 400) - (g.chart.margin[0] + g.chart.margin[2]), c.chart.canvasbgangle !== undefined ? c.chart.canvasbgangle : 0, c.chart.canvasbgcolor ? c.chart.canvasbgcolor : "FFFFFF", c.chart.canvasbgalpha ? c.chart.canvasbgalpha : "100", c.chart.canvasbgratio ? c.chart.canvasbgratio : ""));
            return g
        }

        FCC.dataFormat = 'json';
        FCC.render = function (b, c) {
            var d, sender = this, events = {
                loaded: 'FC_Loaded', dataloaded: 'FC_DataLoaded', rendered: 'FC_Rendered', drawcomplete: 'FC_DrawComplete'
            };
            if (FCC.isReady()) {
                d = F.call(this, b.id, true);
                d.chart.events.load = function () {
                    setTimeout(function () {
                        for (var a in events) {
                            M.raiseEvent(a, {}, sender);
                            try {
                                if (typeof window[events[a]] === 'function') {
                                    window[events[a]](sender.id)
                                }
                            } catch (err) {
                                setTimeout(function () {
                                    throw err;
                                }, 0)
                            }
                        }
                    }, 0)
                };
                createChart.call(this, c, d)
            } else {
                renderArray.push([this, b, c])
            }
        };
        FCC.update = function (b, c) {
            var d = this.id, __containerId = this.options.containerElementId, sender = this, HCJson, events = {
                dataloaded: 'FC_DataLoaded', drawcomplete: 'FC_DrawComplete'
            };
            if (typeof __containerId !== 'undefined' && typeof FCC.items[d] !== 'undefined') {
                if (!c) {
                    delete n[d].msgTxt;
                    if (this.jsVars) {
                        delete this.jsVars.stallLoad;
                        delete this.jsVars.LoadError
                    }
                }
                HCJson = F.call(this, __containerId);
                if (c) {
                    HCJson.plotOptions.series.animation = false
                }
                HCJson.chart.events.load = function () {
                    setTimeout(function () {
                        for (var a in events) {
                            M.raiseEvent(a, {}, sender);
                            try {
                                if (typeof window[events[a]] === 'function') {
                                    window[events[a]](sender.id)
                                }
                            } catch (err) {
                                setTimeout(function () {
                                    throw err;
                                }, 0)
                            }
                        }
                    }, 0)
                };
                createChart.call(this, undefined, HCJson)
            }
        };
        FCC.resize = function () {
            FCC.update.call(this, undefined, true)
        };
        var L = function () {
        };
        L.prototype = {
            "LoadDataErrorText": 'Error in loading data.',
            "XMLLoadingText": 'Retrieving Data. Please Wait',
            "InvalidXMLText": 'Invalid data.',
            "NoDataText": 'No data to display.',
            "ReadingDataText": 'Reading Data. Please Wait',
            "ChartNotSupported": 'Chart Has No Javascript FallBack'
        };
        L.prototype.constructor = L;
        M.addEventListener('Disposed', function (e) {
            delete n[e.sender.id]
        });
        M.addEventListener('BeforeInitialize', function (e) {
            n[e.sender.id] = new L()
        });
        FCC.config = function (a) {
            M.extend(n[this.id], a)
        };
        M.addEventListener('DataLoadRequested', function (a) {
            var b = a.sender;
            if (b.options.renderer !== 'javascript') {
                return
            }
            if (!b.jsVars) {
                b.jsVars = {}
            }
            if (b.ref && typeof b.ref.showChartMessage === 'function') {
                b.jsVars.stallLoad = true;
                b.ref.showChartMessage(n[b.id].XMLLoadingText)
            } else {
                b.jsVars.stallLoad = true
            }
        });
        M.addEventListener('DataLoadRequestCompleted', function (a, b) {
            var c = a.sender;
            if (c.options.renderer !== 'javascript') {
                return
            }
            if (c.jsVars) {
                delete c.jsVars.stallLoad;
                delete c.jsVars.LoadError
            }
        });
        M.addEventListener('DataLoadError', function (a, b) {
            var c = a.sender;
            if (c.options.renderer !== 'javascript') {
                return
            }
            if (!c.jsVars) {
                c.jsVars = {}
            }
            if (c.ref) {
                c.jsVars.LoadError = true;
                c.ref.showChartMessage(n[c.id].LoadDataErrorText)
            } else {
                c.jsVars.LoadError = true
            }
        });
        M.addEventListener('BeforeDispose', function (e) {
            if (e.sender.options.renderer !== 'javascript') {
                return
            }
            removeChart(e.sender.id, true)
        })
    };
    M.renderer.register('javascript', FCC);
    if (/\(iPhone;|\(iPod;|\(iPad;/i.test(navigator.userAgent)) {
        M.renderer.setDefault('javascript')
    }
    M
        .extend({
            '_fallbackJSChartWhenNoFlash': function () {
                if (!M.swfobject
                    .hasFlashPlayerVersion(M.core.options.requiredFlashPlayerVersion)) {
                    M.renderer.setDefault('javascript')
                }
            }
        })
}());
(function () {
    var b = FusionCharts(['private', 'XMLDataHandler']);
    if (b === undefined) {
        return
    }
    var c = function (a) {
        return {
            data: a, error: undefined
        }
    };
    b.addDataHandler('XML', {
        encode: c, decode: c
    })
}());
if (!this.JSON) {
    this.JSON = {}
}
(function () {
    function f(n) {
        return n < 10 ? '0' + n : n
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (a) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
            return this.valueOf()
        }
    }
    var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'
        }, rep;

    function quote(b) {
        escapable.lastIndex = 0;
        return escapable.test(b) ? '"' + b.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + b + '"'
    }

    function str(a, b) {
        var i, k, v, length, mind = gap, partial, value = b[a];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(a)
        }
        if (typeof rep === 'function') {
            value = rep.call(b, a, value)
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (a, b, c) {
            var i;
            gap = '';
            indent = '';
            if (typeof c === 'number') {
                for (i = 0; i < c; i += 1) {
                    indent += ' '
                }
            } else if (typeof c === 'string') {
                indent = c
            }
            rep = b;
            if (b && typeof b !== 'function' && (typeof b !== 'object' || typeof b.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {
                '': a
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (c, d) {
            var j;

            function walk(a, b) {
                var k, v, value = a[b];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return d.call(a, b, value)
            }

            c = String(c);
            e.lastIndex = 0;
            if (e.test(c)) {
                c = c.replace(e, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/
                .test(c
                    .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + c + ')');
                return typeof d === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse');
        }
    }
}());
var fastTrim = function (a) {
    a = a.replace(/^\s\s*/, '');
    var b = /\s/, i = a.length;
    while (b.test(a.charAt(i -= 1))) {
    }
    return a.slice(0, i + 1)
};
(function () {
    var j = FusionCharts(['private', 'JSON_DataHandler']);
    if (j === undefined) {
        return
    }
    var k = function (s) {
        if (s === null || s === undefined || typeof s.toString !== 'function') {
            return ''
        }
        s = s.toString().replace(/&/g, '&amp;').replace(/\'/g, '&#39;')
            .replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return s
    };
    var l = (function () {
        var e = {
            arr: {
                set: true,
                trendlines: true,
                vtrendlines: true,
                line: true,
                data: true,
                dataset: true,
                categories: true,
                category: true,
                linkeddata: true,
                application: true,
                definition: true,
                axis: true
            }, tag: {
                chart: 'linkedchart', map: 'linkedmap', graph: 'linkedgraph', set: 'data', vline: {
                    chart: 'data', graph: 'data', dataset: 'data', categories: 'category', linkedchart: 'data', linkedgraph: 'data'
                }, apply: {
                    application: 'application'
                }, style: {
                    definition: 'definition'
                }
            }, attr: {
                vline: {
                    vline: 'true'
                }
            }, ins: {
                chart: true, map: true, graph: true
            }, text: {
                dataset: 'data', categories: 'category'
            }, group: {
                styles: {
                    definition: true, application: true
                }
            }
        };
        var f = 1, XML_TEXTNODE = 3;
        var g = {
            append: function (a, b, c) {
                if (e.arr[c] === true) {
                    if (!(b[c] instanceof Array)) {
                        b[c] = []
                    }
                    b[c].push(a)
                } else {
                    b[c] = a
                }
            }, child: function (a, b, c, d) {
                var i, nodeName, childObj, temp;
                for (i = 0; i < b.length; i += 1) {
                    nodeName = b[i].nodeName.toLowerCase();
                    if (b[i].nodeType === f) {
                        childObj = g.attr(b[i].attributes);
                        if (e.ins[nodeName] === true) {
                            temp = childObj;
                            childObj = {};
                            childObj[nodeName] = temp;
                            temp = undefined
                        }
                        if (typeof e.attr[nodeName] === 'object') {
                            j.extend(childObj, e.attr[nodeName])
                        }
                        if (typeof e.tag[nodeName] === 'object' && typeof e.tag[nodeName][c] === 'string') {
                            nodeName = e.tag[nodeName][c]
                        }
                        if (typeof e.tag[nodeName] === 'string') {
                            nodeName = e.tag[nodeName]
                        }
                        if (b[i].childNodes.length) {
                            if (e.group[c] && e.group[c][nodeName]) {
                                g.child(a, b[i].childNodes, nodeName, d)
                            } else {
                                g.child(childObj, b[i].childNodes, nodeName, d)
                            }
                        }
                        if (!(e.group[c] && e.group[c][nodeName])) {
                            g.append(childObj, a, nodeName)
                        }
                    } else if (b[i].nodeType === XML_TEXTNODE && d.chart && parseInt(d.chart.compactdatamode, 10) && typeof e.text[c] === 'string') {
                        nodeName = e.text[c];
                        childObj = b[i].data;
                        g.append(childObj, a, nodeName)
                    }
                }
            }, attr: function (a) {
                var i, obj = {};
                if (!a || !a.length) {
                    return obj
                }
                for (i = 0; i < a.length; i += 1) {
                    obj[a[i].nodeName.toLowerCase()] = a[i].nodeValue
                }
                return obj
            }
        };
        var h = function (a) {
            var b = {}, xmlDoc, root, rootName;
            if (a === undefined || a === null || typeof a.toString !== 'function') {
                h.errorObject = new TypeError('xml2json.parse()');
                return b
            }
            a = a.toString().replace(/<\!--[\s\S]*?-->/g, '').replace(/<\?xml[\s\S]*?\?>/ig, '').replace(/&(?!([^;\n\r]+?;))/g, '&amp;$1');
            a = fastTrim(a);
            if (!a) {
                return b
            }
            if (window.DOMParser) {
                xmlDoc = (new window.DOMParser())
                    .parseFromString(a, "text/xml")
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(a)
            }
            if (!(xmlDoc.childNodes.length === 1 && (root = xmlDoc.childNodes[0]) && root.nodeName && (rootName = root.nodeName.toLowerCase()) && (rootName === 'chart' || rootName === 'map' || rootName === 'graph'))) {
                h.errorObject = new TypeError('xml2json.parse()');
                return b
            }
            b[rootName] = g.attr(root.attributes);
            if (root.childNodes) {
                g.child(b, root.childNodes, rootName, b)
            }
            delete h.errorObject;
            return b
        };
        return function (a) {
            delete h.errorObject;
            var b = h(a);
            return {
                data: b, error: h.errorObject
            }
        }
    }());
    var m = (function () {
        var d = {
            items: {
                explode: {
                    data: 'set'
                }, attr: {
                    chart: {
                        chart: 'chart', graph: 'chart'
                    }, graph: {
                        graph: 'graph', chart: 'graph'
                    }, map: {
                        map: 'map'
                    }, linkedchart: {
                        chart: 'chart', graph: 'graph', map: 'map'
                    }
                }, group: {
                    styles: {
                        definition: 'style', application: 'apply'
                    }
                }
            }, qualify: function (a, b, c) {
                c = c.toLowerCase();
                return typeof this.items[a][c] === 'object' ? this.items[a][c][b
                    .toLowerCase()] : this.items[a][c]
            }
        };
        var f = function (a, b) {
            var c = '', innerXML = '', nodeName = '', outerXML = '', item, qualifier;
            if (a instanceof Array) {
                for (item = 0; item < a.length; item += 1) {
                    if (typeof a[item] === 'string') {
                        outerXML += k(a[item])
                    } else {
                        outerXML += f(a[item], b)
                    }
                }
            } else {
                for (item in a) {
                    if (a[item] instanceof Array && (qualifier = d.qualify('group', item, b))) {
                        innerXML += '<' + item + '>' + f(a[item], qualifier) + '</' + item + '>'
                    } else if (typeof a[item] === 'object') {
                        if ((qualifier = d.qualify('attr', item, b))) {
                            nodeName = f(a[item], qualifier).replace(/\/\>/ig, '');
                            b = item
                        } else {
                            innerXML += f(a[item], item)
                        }
                    } else {
                        if (item.toLowerCase() === 'vline' && Boolean(a[item])) {
                            b = 'vLine'
                        } else {
                            c += ' ' + item + '=\"' + k(a[item]).toString().replace(/\"/ig, '&quot;') + '\"'
                        }
                    }
                }
                if ((qualifier = d.qualify('explode', item, b))) {
                    b = qualifier
                }
                outerXML = (nodeName !== '' ? nodeName : '<' + b) + c + (innerXML !== '' ? '>' + innerXML + '</' + b + '>' : ' />')
            }
            return outerXML
        };
        return function (a) {
            delete f.errorObject;
            if (a && typeof a === 'string') {
                try {
                    a = JSON.parse(a)
                } catch (e) {
                    f.errorObject = e
                }
            }
            var b = f(a, a && a.graph ? 'graph' : 'chart');
            return {
                data: b, error: f.errorObject
            }
        }
    }());
    j.addDataHandler('JSON', {
        encode: function (a) {
            return m(a)
        }, decode: function (a) {
            return l(a)
        }
    })
}());
(function () {
    var f = FusionCharts(['private', 'LinkManager']);
    if (f === undefined) {
        return
    }
    f.policies.link = ['link', undefined];
    var g = {};
    var h = function (a, b) {
        this.items = {};
        this.root = a;
        this.parent = b;
        if (b instanceof f.core) {
            this.level = this.parent.link.level + 1
        } else {
            g[a.id] = [{}];
            this.level = 0
        }
    };
    h.prototype.configuration = function () {
        var a = g[this.root.id][this.level] || (g[this.root.id][this.level] = {});
        if (typeof a.id === 'undefined') {
            a.id = g[this.root.id][this.level].id = f.uniqueId()
        }
        return a
    };
    f
        .extend({
            configureLink: function (a, b) {
                if (a instanceof Array) {
                    for (var i = 0; i < a.length; i += 1) {
                        if (typeof g[this.link.root.id][i] !== 'object') {
                            g[this.link.root.id][i] = {}
                        }
                        f.extend(g[this.link.root.id][i], a[i])
                    }
                    g[this.link.root.id].splice(a.length)
                } else if (typeof a === 'object') {
                    if (typeof b !== 'number') {
                        b = this.link.level
                    }
                    if (g[this.link.root.id][b] === undefined) {
                        g[this.link.root.id][b] = {}
                    }
                    f.extend(g[this.link.root.id][b], a)
                } else {
                    f
                        .raiseError(this, '25081731', 'param', '~configureLink()', 'Unable to update link configuration from set parameters')
                }
            }
        }, true);
    f.addEventListener('BeforeInitialize', function (a) {
        if (!(a.sender.link instanceof h)) {
            a.sender.link = new h(a.sender)
        } else {
            if (a.sender.link.parent instanceof f.core) {
                a.sender.link.parent.link.items[a.sender.id] = a.sender
            }
        }
    });
    f.addEventListener('LinkedChartInvoked', function (a, b) {
        var c = a.sender, param = c.clone({
            dataSource: b.data, dataFormat: b.linkType === 'URL' ? FusionChartsDataFormats.XMLURL : b.linkType, link: new h(c.link.root, c)
        }, true);
        if (c.args && parseInt(c.args.animate, 10) !== 0) {
            delete param.animate
        }
        f.extend(param, c.link.configuration());
        f.raiseEvent('BeforeLinkedItemOpen', {
            level: c.link.level
        }, c.link.root);
        if (f.core.items[param.id] instanceof f.core && param.strictLinkId === true) {
            f.core.items[param.id].dispose()
        }
        var d = new f.core(param).render();
        f.raiseEvent('LinkedItemOpened', {
            level: c.link.level, item: d
        }, c.link.root)
    });
    f
        .addEventListener('OverlayButtonClick', function (a) {
            var b = a.sender, level = b.link.level - 1, parent = b.link.parent;
            f.raiseEvent('BeforeLinkedItemClose', {
                level: level, item: b
            }, b.link.root);
            b.dispose();
            f.raiseEvent('LinkedItemClosed', {
                level: level
            }, b.link.root);
            if (!parent.isActive() && b.options.containerElement === parent.options.containerElement && b.options.insertMode === 'replace') {
                parent.render()
            }
        });
    f.addEventListener('Loaded', function (a) {
        var b = a.sender;
        if (!b || b.link === undefined) {
            return
        }
        if (b.link.root === b || !(b.link.parent instanceof f.core)) {
            return
        }
        if (!(b.ref && typeof b.ref.drawOverlayButton === 'function')) {
            f.raiseWarning(b, '04091602', 'run', '::LinkManager^Loaded', 'Unable to draw overlay button on object. -' + b.id);
            return
        }
        var c = f.extend({
            show: true
        }, b.link.parent.options.overlayButton);
        f.extend(c, b.link.parent.link.configuration().overlayButton || {});
        b.ref.drawOverlayButton(c)
    });
    f.addEventListener('BeforeDispose', function (e) {
        var a = e.sender;
        if (!(a && a.link instanceof h)) {
            return
        }
        if (a.link.parent instanceof f.core) {
            delete a.link.parent.link.items[e.sender.id]
        }
        delete g[a.id]
    });
    FusionChartsEvents.LinkedItemOpened = 'linkeditemopened';
    FusionChartsEvents.BeforeLinkedItemOpen = 'beforelinkeditemopen';
    FusionChartsEvents.LinkedItemClosed = 'linkeditemclosed';
    FusionChartsEvents.BeforeLinkedItemClose = 'beforelinkeditemclose'
}());
(function () {
    var j = FusionCharts(['private', 'PrintManager']);
    if (j === undefined) {
        return
    }
    var k = {
        enabled: false,
        invokeCSS: true,
        processPollInterval: 2000,
        message: 'Chart is being prepared for print.',
        useExCanvas: false,
        bypass: false
    };
    var l = {
        getCanvasElementOf: function (a, b, c) {
            if (a.__fusioncharts__canvascreated !== true) {
                var d = document.createElement('canvas'), identifier = j.core.items[a.id].attributes['class'];
                if (k.useExCanvas && G_vmlCanvasManager) {
                    G_vmlCanvasManager.initElement(d)
                }
                d.setAttribute('class', identifier);
                d.__fusioncharts__reference = a.id;
                a.parentNode.insertBefore(d, a.nextSibling);
                a.__fusioncharts__canvascreated = true
            }
            a.nextSibling.setAttribute('width', b || a.offsetWidth || 2);
            a.nextSibling.setAttribute('height', c || a.offsetHeight || 2);
            return a.nextSibling
        }, removeCanvasElementOf: function (a) {
            if (a.__fusioncharts__canvascreated !== true || !a.parentNode || a.parentNode === null) {
                return
            }
            a.parentNode.removeChild(a.nextSibling);
            a.__fusioncharts__canvascreated = false
        }, rle2rgba: function (a, c, d) {
            if (typeof d !== 'string') {
                d = "FFFFFF"
            }
            var e = a.split(/[;,_]/), run, i, r, g, b, x = 0;
            for (i = 0; i < e.length; i += 2) {
                if (e[i] === '') {
                    e[i] = d
                }
                e[i] = ('000000' + e[i]).substr(-6);
                r = parseInt('0x' + e[i].substring(0, 2), 16);
                g = parseInt('0x' + e[i].substring(2, 4), 16);
                b = parseInt('0x' + e[i].substring(4, 6), 16);
                for (run = 0; run < e[i + 1]; run += 1) {
                    c[x] = r;
                    c[x + 1] = g;
                    c[x + 2] = b;
                    c[x + 3] = 255;
                    x += 4
                }
            }
            return c
        }, rle2array: function (a, b) {
            if (typeof b !== 'string') {
                b = "FFFFFF"
            }
            var c = a.split(';'), run, i;
            for (run in c) {
                c[run] = c[run].split(/[_,]/);
                for (i = 0; i < c[run].length; i += 2) {
                    c[run][i] = c[run][i] === '' ? b : ('000000' + c[run][i])
                        .substr(-6)
                }
            }
            return c
        }, drawRLE: function (a, b, c, d, e) {
            c = c || 2;
            d = d || 2;
            a.setAttribute('width', c);
            a.setAttribute('height', d);
            var f = a.getContext('2d'), imageData;
            if (typeof f.putImageData === 'function' && typeof f.createImageData === 'function') {
                imageData = f.createImageData(c, d);
                l.rle2rgba(b, imageData.data, e);
                f.putImageData(imageData, 0, 0)
            } else {
                imageData = l.rle2array(b, e);
                var x = 0, y = 0, z = 0;
                for (y in imageData) {
                    x = 0;
                    for (z = 0; z < imageData[y].length; z += 2) {
                        f.fillStyle = "#" + imageData[y][z];
                        f.fillRect(x, y, imageData[y][z + 1], 1);
                        x += parseInt(imageData[y][z + 1], 10)
                    }
                }
            }
            return true
        }, drawText: function (a, b, c, d) {
            var e = a.getContext('2d'), w = c || 2, h = d || 2;
            e.clearRect(0, 0, w, h);
            e.textBaseline = 'middle';
            e.textAlign = 'center';
            e.font = '8pt verdana';
            e.fillStyle = '#776666';
            if (typeof e.fillText === 'function') {
                e.fillText(b, w / 2, h / 2)
            } else if (typeof e.mozDrawText === 'function') {
                e.translate(w / 2, h / 2);
                e.mozDrawText(b)
            } else {
                j.raiseWarning(j.core, '25081803', 'run', '::PrintManager>lib.drawText', 'Canvas text drawing is not supported in browser')
            }
            return true
        }, appendCSS: function (a) {
            var b = document.createElement('style');
            b.setAttribute('type', 'text/css');
            if (typeof b.styleSheet === 'undefined') {
                b.appendChild(document.createTextNode(a))
            } else {
                b.styleSheet.cssText = a
            }
            return document.getElementsByTagName('head')[0].appendChild(b)
        }
    };
    var m = {
        styles: {
            print: 'canvas.FusionCharts{display:none;}@media print{object.FusionCharts{display:none;}canvas.FusionCharts{display:block;}}',
            error: 'canvas.FusionCharts{display:none;}',
            normal: ''
        }, cssNode: undefined, invoke: function (a) {
            if (typeof this.styles[a] !== 'undefined') {
                a = this.styles[a]
            }
            if (typeof a !== 'undefined') {
                if (this.cssNode !== undefined && this.cssNode.parentNode !== undefined) {
                    this.cssNode.parentNode.removeChild(this.cssNode)
                }
                m.cssNode = l.appendCSS(a)
            }
        }
    }, activeItems = {}, queuedItems = {}, activeCount = 0, queueTrigger;
    var n = function (a) {
        var b = a.sender.ref, w, h;
        if (b === undefined || typeof b.prepareImageDataStream !== 'function' || b.prepareImageDataStream() === false) {
            queueTrigger(a.sender);
            return
        }
        if (!activeItems[a.sender.id]) {
            activeItems[a.sender.id] = b;
            activeCount += 1;
            if (activeCount === 1) {
                j.raiseEvent('PrintReadyStateChange', {
                    ready: false, bypass: k.bypass
                }, a.sender)
            }
        }
        try {
            w = b.offsetWidth;
            h = b.offsetHeight;
            l.drawText(l.getCanvasElementOf(b, w, h), k.message, w, h)
        } catch (e) {
            m.invoke('error');
            j
                .raiseError(a.sender, '25081807', 'run', '::PrintManager>onDrawComplete', 'There was an error while showing message to user via canvas.')
        }
    }, onImageStreamReady = function (a, b) {
        try {
            if (l.drawRLE(l.getCanvasElementOf(a.sender.ref, b.width, b.height), b.stream, b.width, b.height, b.bgColor) === true) {
                if (activeItems[a.sender.id]) {
                    delete activeItems[a.sender.id];
                    activeCount -= 1;
                    if (activeCount === 0) {
                        j.raiseEvent('PrintReadyStateChange', {
                            ready: true, bypass: k.bypass
                        }, a.sender)
                    }
                }
            }
        } catch (e) {
            m.invoke('error');
            j.raiseError(a.sender, '25081810', 'run', '::PrintManager>onImageStreamReady', 'There was an error while drawing canvas.')
        }
    }, onBeforeDispose = function (a) {
        l.removeCanvasElementOf(a.sender.ref)
    }, subscribeToEvents = function (a) {
        var b = a ? 'addEventListener' : 'removeEventListener';
        j.core[b]('ImageStreamReady', onImageStreamReady);
        j.core[b]('DrawComplete', n);
        j.core[b]('BeforeDispose', onBeforeDispose)
    }, initialize = function () {
        if (k.invokeCSS === true) {
            m.invoke('print')
        }
        for (var a in j.core.items) {
            queueTrigger(j.core.items[a]);
            queueTrigger()
        }
    }, destroy = function () {
        m.invoke('error');
        for (var a in j.core.items) {
            if (j.core.items[a].ref === undefined) {
                continue
            }
            l.removeCanvasElementOf(j.core.items[a].ref)
        }
        m.invoke('normal')
    };
    queueTrigger = function (a) {
        if (a instanceof j.core) {
            queuedItems[a.id] = a;
            return
        }
        for (var b in queuedItems) {
            n({
                sender: queuedItems[b]
            }, {});
            delete queuedItems[b]
        }
    };
    j
        .extend({
            printManager: {
                configure: function (a) {
                    j.extend(k, a || {})
                }, isReady: function () {
                    if (k.bypass) {
                        return true
                    }
                    if (activeCount > 0 || !k.enabled) {
                        return false
                    }
                    var a, ref;
                    for (a in j.core.items) {
                        if ((ref = j.core.items[a].ref) === undefined) {
                            continue
                        }
                        if (ref.hasRendered && ref.hasRendered() === false) {
                            return false
                        }
                    }
                    return true
                }, enabled: function (a) {
                    if (a === undefined) {
                        return k.enabled
                    }
                    if ('\v' === 'v' || j.renderer.currentRendererName() !== 'flash' || typeof document
                        .createElement('canvas').getContext !== 'function') {
                        k.bypass = true;
                        j.raiseEvent('PrintReadyStateChange', {
                            ready: true, bypass: k.bypass
                        });
                        j
                            .raiseWarning(j.core, '25081816', 'run', '.printManager.enabled', 'printManager is not compatible with your browser');
                        return k.enabled
                    }
                    k.bypass = false;
                    subscribeToEvents(a);
                    if (a === true) {
                        initialize()
                    } else {
                        destroy()
                    }
                    return (k.enabled = a)
                }, managedPrint: function () {
                    if (k.bypass) {
                        window.print();
                        return
                    }
                    if (!j.core.printManager.isReady()) {
                        if (j.core.printManager.enabled(true) !== true) {
                            window.print();
                            return
                        }
                        j.addEventListener('PrintReadyStateChange', j.core.printManager.managedPrint);
                        return
                    }
                    if (typeof arguments[1] === 'object' && arguments[1].ready !== true) {
                        return
                    }
                    j.removeEventListener('PrintReadyStateChange', j.core.printManager.managedPrint);
                    window.print()
                }
            }
        }, false);
    FusionChartsEvents.PrintReadyStateChange = 'printreadystatechange'
}());
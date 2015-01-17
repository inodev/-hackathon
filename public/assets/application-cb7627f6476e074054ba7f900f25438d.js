/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
var gulp = require('gulp')
var eslint = require('gulp-eslint')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var header = require('gulp-header')
var footer = require('gulp-footer')
var tap = require('gulp-tap')
var merge = require('merge-stream')
var pkg = require('./package.json')
var path = require('path')

var jsFiles = ['src/**/*.js', 'test/**/*.js', '!test/lib/**/*.js']
var shortcutTitles = {
  'infinite': 'Waypoints Infinite Scroll Shortcut',
  'inview': 'Waypoints Inview Shortcut',
  'sticky': 'Waypoints Sticky Element Shortcut'
}

function fileHeader(title) {
  return [
    '/*!',
    title + ' - ' + pkg.version,
    'Copyright © 2011-' + new Date().getFullYear() + ' Caleb Troughton',
    'Licensed under the MIT license.',
    'https://github.com/imakewebthings/waypoints/blog/master/licenses.txt',
    '*/\n'
  ].join('\n')
}

gulp.task('lint', function() {
  return gulp.src(jsFiles).pipe(eslint('.eslintrc')).pipe(eslint.format())
})

gulp.task('build-core', function() {
  var streams = ['noframework', 'jquery', 'zepto'].map(function(adapter) {
    var sources = [
      'src/waypoint.js',
      'src/context.js',
      'src/group.js',
      'src/adapters/' + adapter + '.js'
    ]
    if (['jquery', 'zepto'].indexOf(adapter) > -1) {
      sources.push('src/adapters/jquery-zepto-fn-extension.js')
    }
    return gulp.src(sources)
    .pipe(concat(adapter + '.waypoints.js', { newLine: ';' }))
    .pipe(header(fileHeader('Waypoints')))
    .pipe(footer(';'))
    .pipe(gulp.dest('lib/'))
    .pipe(rename(adapter + '.waypoints.min.js'))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('lib/'))
  })
  return merge.apply(null, streams)
})

gulp.task('build-shortcuts', function() {
  return gulp.src([
    'src/shortcuts/*.js'
  ])
  .pipe(tap(function(file) {
    var title = path.basename(file.path, '.js')
    file.contents = Buffer.concat([
      new Buffer(fileHeader(shortcutTitles[title])),
      file.contents
    ])
  }))
  .pipe(footer(';'))
  .pipe(gulp.dest('lib/shortcuts/'))
  .pipe(rename(function(path) {
    path.basename += '.min'
  }))
  .pipe(uglify({
    preserveComments: 'some'
  }))
  .pipe(gulp.dest('lib/shortcuts/'))
})

gulp.task('build-debug', function() {
  return gulp.src([
    'src/debug.js'
  ])
  .pipe(rename('waypoints.debug.js'))
  .pipe(header(fileHeader('Waypoints Debug')))
  .pipe(footer(';'))
  .pipe(gulp.dest('lib/'))
})

gulp.task('build', ['build-core', 'build-shortcuts', 'build-debug'])

gulp.task('watch', function() {
  gulp.watch(jsFiles, ['lint', 'build'])
})

gulp.task('default', ['lint', 'build', 'watch'])
;
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    requestAnimationFrameShim
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportHeight()
    }
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportWidth()
    }
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    var isWindow = this.element === this.element.window
    var contextOffset = this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.destroyAll=function(){var t=[];for(var e in i)t.push(i[e]);for(var o=0,r=t.length;r>o;o++)t[o].destroy()},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=r.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},r=window.Waypoint,n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t,s=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||r.isTouch)&&(e.didScroll=!0,n(t))})},e.prototype.handleResize=function(){r.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],r=o.newScroll>o.oldScroll,n=r?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(n),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element===this.element.window?r.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element===this.element.window?r.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,r=t.length;r>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element===this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var n=t[r];for(var s in this.waypoints[r]){var a,l,h,p,u,c=this.waypoints[r][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[n.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(n.contextDimension*d/100))),a=n.contextScroll-n.contextOffset,c.triggerPoint=w+a-d,l=f<n.oldScroll,h=c.triggerPoint>=n.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(n.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(n.forward),o[c.group.id]=c.group):y&&n.oldScroll>=c.triggerPoint&&(c.queueTrigger(n.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){s&&s(),e.refreshAll()},r.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},r=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],r="up"===i||"left"===i;o.sort(r?e:t);for(var n=0,s=o.length;s>n;n+=1){var a=o[n];(a.options.continuous||n===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=r.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=r.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=r.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},r.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var r=t.extend({},o,{element:this});"string"==typeof r.context&&(r.context=t(this).closest(r.context)[0]),i.push(new e(r))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    requestAnimationFrameShim
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportHeight()
    }
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportWidth()
    }
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    var isWindow = this.element === this.element.window
    var contextOffset = this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function isWindow(element) {
    return element === element.window
  }

  function getWindow(element) {
    if (isWindow(element)) {
      return element
    }
    return element.defaultView
  }

  function NoFrameworkAdapter(element) {
    this.element = element
    this.handlers = {}
  }

  NoFrameworkAdapter.prototype.innerHeight = function() {
    var isWin = isWindow(this.element)
    return isWin ? this.element.innerHeight : this.element.clientHeight
  }

  NoFrameworkAdapter.prototype.innerWidth = function() {
    var isWin = isWindow(this.element)
    return isWin ? this.element.innerWidth : this.element.clientWidth
  }

  NoFrameworkAdapter.prototype.off = function(event, handler) {
    function removeListeners(element, listeners, handler) {
      for (var i = 0, end = listeners.length - 1; i < end; i++) {
        var listener = listeners[i]
        if (!handler || handler === listener) {
          element.removeEventListener(listener)
        }
      }
    }

    var eventParts = event.split('.')
    var eventType = eventParts[0]
    var namespace = eventParts[1]
    var element = this.element

    if (namespace && this.handlers[namespace] && eventType) {
      removeListeners(element, this.handlers[namespace][eventType], handler)
      this.handlers[namespace][eventType] = []
    }
    else if (eventType) {
      for (var ns in this.handlers) {
        removeListeners(element, this.handlers[ns][eventType] || [], handler)
        this.handlers[ns][eventType] = []
      }
    }
    else if (namespace && this.handlers[namespace]) {
      for (var type in this.handlers[namespace]) {
        removeListeners(element, this.handlers[namespace][type], handler)
      }
      this.handlers[namespace] = {}
    }
  }

  /* Adapted from jQuery 1.x offset() */
  NoFrameworkAdapter.prototype.offset = function() {
    if (!this.element.ownerDocument) {
      return null
    }

    var documentElement = this.element.ownerDocument.documentElement
    var win = getWindow(this.element.ownerDocument)
    var rect = {
      top: 0,
      left: 0
    }

    if (this.element.getBoundingClientRect) {
      rect = this.element.getBoundingClientRect()
    }

    return {
      top: rect.top + win.pageYOffset - documentElement.clientTop,
      left: rect.left + win.pageXOffset - documentElement.clientLeft
    }
  }

  NoFrameworkAdapter.prototype.on = function(event, handler) {
    var eventParts = event.split('.')
    var eventType = eventParts[0]
    var namespace = eventParts[1] || '__default'
    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {}
    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || []

    nsTypeList.push(handler)
    this.element.addEventListener(eventType, handler)
  }

  NoFrameworkAdapter.prototype.outerHeight = function(includeMargin) {
    var height = this.innerHeight()
    var computedStyle

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element)
      height += parseInt(computedStyle.marginTop, 10)
      height += parseInt(computedStyle.marginBottom, 10)
    }

    return height
  }

  NoFrameworkAdapter.prototype.outerWidth = function(includeMargin) {
    var width = this.innerWidth()
    var computedStyle

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element)
      width += parseInt(computedStyle.marginLeft, 10)
      width += parseInt(computedStyle.marginRight, 10)
    }

    return width
  }

  NoFrameworkAdapter.prototype.scrollLeft = function() {
    var win = getWindow(this.element)
    return win ? win.pageXOffset : this.element.scrollLeft
  }

  NoFrameworkAdapter.prototype.scrollTop = function() {
    var win = getWindow(this.element)
    return win ? win.pageYOffset : this.element.scrollTop
  }

  NoFrameworkAdapter.extend = function() {
    var args = Array.prototype.slice.call(arguments)

    function merge(target, obj) {
      if (typeof target === 'object' && typeof obj === 'object') {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            target[key] = obj[key]
          }
        }
      }

      return target
    }

    for (var i = 1, end = args.length; i < end; i++) {
      merge(args[0], args[i])
    }
    return args[0]
  }

  NoFrameworkAdapter.inArray = function(element, array, i) {
    return array == null ? -1 : array.indexOf(element, i)
  }

  NoFrameworkAdapter.isEmptyObject = function(obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false
    }
    return true
  }

  Waypoint.adapters.push({
    name: 'noframework',
    Adapter: NoFrameworkAdapter
  })
  Waypoint.Adapter = NoFrameworkAdapter
}())
;
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.destroyAll=function(){var t=[];for(var e in i)t.push(i[e]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t,s=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,r(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,r(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=n.oldScroll<a.triggerPoint,h=n.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element===this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element===this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element===this.element.window,i=this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in t){var r=t[o];for(var s in this.waypoints[o]){var a,l,h,p,u,c=this.waypoints[o][s],f=c.options.offset,d=c.triggerPoint,y=0,g=null==d;c.element!==c.element.window&&(y=c.adapter.offset()[r.offsetProp]),"function"==typeof f?f=f.apply(c):"string"==typeof f&&(f=parseFloat(f),c.options.offset.indexOf("%")>-1&&(f=Math.ceil(r.contextDimension*f/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=y+a-f,l=d<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!g&&p?(c.queueTrigger(r.backward),n[c.group.id]=c.group):!g&&u?(c.queueTrigger(r.forward),n[c.group.id]=c.group):g&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),n[c.group.id]=c.group)}}for(var w in n)n[w].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){s&&s(),e.refreshAll()},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var r=0,s=n.length;s>r;r+=1){var a=n[r];(a.options.continuous||r===n.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function i(t){this.element=t,this.handlers={}}var n=window.Waypoint;i.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function i(t,e,i){for(var n=0,o=e.length-1;o>n;n++){var r=e[n];i&&i!==r||t.removeEventListener(r)}}var n=t.split("."),o=n[0],r=n[1],s=this.element;if(r&&this.handlers[r]&&o)i(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)i(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])i(s,this.handlers[r][l],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,i=e(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),{top:n.top+i.pageYOffset-t.clientTop,left:n.left+i.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var i=t.split("."),n=i[0],o=i[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[n]=r[n]||[];s.push(e),this.element.addEventListener(n,e)},i.prototype.outerHeight=function(e){var i,n=this.innerHeight();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginTop,10),n+=parseInt(i.marginBottom,10)),n},i.prototype.outerWidth=function(e){var i,n=this.innerWidth();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginLeft,10),n+=parseInt(i.marginRight,10)),n},i.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}for(var e=Array.prototype.slice.call(arguments),i=1,n=e.length;n>i;i++)t(e[0],e[i]);return e[0]},i.inArray=function(t,e,i){return null==e?-1:e.indexOf(t,i)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},n.adapters.push({name:"noframework",Adapter:i}),n.Adapter=i}();
/*!
Waypoints Infinite Scroll Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/infinite-scroll */
  function Infinite(options) {
    this.options = $.extend({}, Infinite.defaults, options)
    this.container = this.options.element
    if (this.options.container !== 'auto') {
      this.container = this.options.container
    }
    this.$container = $(this.container)
    this.$more = $(this.options.more)

    if (this.$more.length) {
      this.setupHandler()
      this.waypoint = new Waypoint(this.options)
    }
  }

  /* Private */
  Infinite.prototype.setupHandler = function() {
    this.options.handler = $.proxy(function() {
      window.setTimeout($.proxy(function() {
        this.options.onBeforePageLoad()
        this.destroy()
        this.$container.addClass(this.options.loadingClass)

        $.get($(this.options.more).attr('href'), $.proxy(function(data) {
          var $data = $($.parseHTML(data))
          var $newMore = $data.find(this.options.more)

          this.$container.append($data.find(this.options.items))
          this.$container.removeClass(this.options.loadingClass)

          if (!$newMore.length) {
            $newMore = $data.filter(this.options.more)
          }
          if ($newMore.length) {
            this.$more.replaceWith($newMore)
            this.$more = $newMore
            this.waypoint = new Waypoint(this.options)
          }
          else {
            this.$more.remove()
          }

          this.options.onAfterPageLoad()
        }, this), 0)
      }, this))
    }, this)
  }

  /* Public */
  Infinite.prototype.destroy = function() {
    if (this.waypoint) {
      this.waypoint.destroy()
    }
  }

  Infinite.defaults = {
    container: 'auto',
    items: '.infinite-item',
    more: '.infinite-more-link',
    offset: 'bottom-in-view',
    loadingClass: 'infinite-loading',
    onBeforePageLoad: $.noop,
    onAfterPageLoad: $.noop
  }

  Waypoint.Infinite = Infinite
}())
;
/*!
Waypoints Infinite Scroll Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(n){this.options=i.extend({},t.defaults,n),this.container=this.options.element,"auto"!==this.options.container&&(this.container=this.options.container),this.$container=i(this.container),this.$more=i(this.options.more),this.$more.length&&(this.setupHandler(),this.waypoint=new o(this.options))}var i=window.jQuery,o=window.Waypoint;t.prototype.setupHandler=function(){this.options.handler=i.proxy(function(){window.setTimeout(i.proxy(function(){this.options.onBeforePageLoad(),this.destroy(),this.$container.addClass(this.options.loadingClass),i.get(i(this.options.more).attr("href"),i.proxy(function(t){var n=i(i.parseHTML(t)),e=n.find(this.options.more);this.$container.append(n.find(this.options.items)),this.$container.removeClass(this.options.loadingClass),e.length||(e=n.filter(this.options.more)),e.length?(this.$more.replaceWith(e),this.$more=e,this.waypoint=new o(this.options)):this.$more.remove(),this.options.onAfterPageLoad()},this),0)},this))},this)},t.prototype.destroy=function(){this.waypoint&&this.waypoint.destroy()},t.defaults={container:"auto",items:".infinite-item",more:".infinite-more-link",offset:"bottom-in-view",loadingClass:"infinite-loading",onBeforePageLoad:i.noop,onAfterPageLoad:i.noop},o.Infinite=t}();
/*!
Waypoints Inview Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  function noop() {}

  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/inview */
  function Inview(options) {
    this.options = Waypoint.Adapter.extend({}, Inview.defaults, options)
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints = []
    this.createWaypoints()
  }

  /* Private */
  Inview.prototype.createWaypoints = function() {
    var configs = {
      vertical: [{
        down: 'enter',
        up: 'exited',
        offset: '100%'
      }, {
        down: 'entered',
        up: 'exit',
        offset: 'bottom-in-view'
      }, {
        down: 'exit',
        up: 'entered',
        offset: 0
      }, {
        down: 'exited',
        up: 'enter',
        offset: function() {
          return -this.adapter.outerHeight()
        }
      }],
      horizontal: [{
        right: 'enter',
        left: 'exited',
        offset: '100%'
      }, {
        right: 'entered',
        left: 'exit',
        offset: 'right-in-view'
      }, {
        right: 'exit',
        left: 'entered',
        offset: 0
      }, {
        right: 'exited',
        left: 'enter',
        offset: function() {
          return -this.adapter.outerWidth()
        }
      }]
    }

    for (var i = 0, end = configs[this.axis].length; i < end; i++) {
      var config = configs[this.axis][i]
      this.createWaypoint(config)
    }
  }

  /* Private */
  Inview.prototype.createWaypoint = function(config) {
    var self = this
    this.waypoints.push(new Waypoint({
      element: this.options.element,
      handler: (function(config) {
        return function(direction) {
          self.options[config[direction]].call(this, direction)
        }
      }(config)),
      offset: config.offset,
      horizontal: this.options.horizontal
    }))
  }

  /* Public */
  Inview.prototype.destroy = function() {
    for (var i = 0, end = this.waypoints.length; i < end; i++) {
      this.waypoints[i].destroy()
    }
    this.waypoints = []
  }

  Inview.defaults = {
    enter: noop,
    entered: noop,
    exit: noop,
    exited: noop
  }

  Waypoint.Inview = Inview
}())
;
/*!
Waypoints Inview Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(){}function e(t){this.options=i.Adapter.extend({},e.defaults,t),this.axis=this.options.horizontal?"horizontal":"vertical",this.waypoints=[],this.createWaypoints()}var i=window.Waypoint;e.prototype.createWaypoints=function(){for(var t={vertical:[{down:"enter",up:"exited",offset:"100%"},{down:"entered",up:"exit",offset:"bottom-in-view"},{down:"exit",up:"entered",offset:0},{down:"exited",up:"enter",offset:function(){return-this.adapter.outerHeight()}}],horizontal:[{right:"enter",left:"exited",offset:"100%"},{right:"entered",left:"exit",offset:"right-in-view"},{right:"exit",left:"entered",offset:0},{right:"exited",left:"enter",offset:function(){return-this.adapter.outerWidth()}}]},e=0,i=t[this.axis].length;i>e;e++){var o=t[this.axis][e];this.createWaypoint(o)}},e.prototype.createWaypoint=function(t){var e=this;this.waypoints.push(new i({element:this.options.element,handler:function(t){return function(i){e.options[t[i]].call(this,i)}}(t),offset:t.offset,horizontal:this.options.horizontal}))},e.prototype.destroy=function(){for(var t=0,e=this.waypoints.length;e>t;t++)this.waypoints[t].destroy();this.waypoints=[]},e.defaults={enter:t,entered:t,exit:t,exited:t},i.Inview=e}();
/*!
Waypoints Sticky Element Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    this.$element.wrap(this.options.wrapper)
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass).unwrap()
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;
/*!
Waypoints Sticky Element Shortcut - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(s){this.options=e.extend({},i.defaults,t.defaults,s),this.element=this.options.element,this.$element=e(this.element),this.createWrapper(),this.createWaypoint()}var e=window.jQuery,i=window.Waypoint;t.prototype.createWaypoint=function(){var t=this.options.handler;this.waypoint=new i(e.extend({},this.options,{element:this.wrapper,handler:e.proxy(function(e){var i=this.options.direction.indexOf(e)>-1,s=i?this.$element.outerHeight(!0):"";this.$wrapper.height(s),this.$element.toggleClass(this.options.stuckClass,i),t&&t.call(this,e)},this)}))},t.prototype.createWrapper=function(){this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},t.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass).unwrap())},t.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},i.Sticky=t}();
/*!
Waypoints Debug - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var displayNoneMessage = [
    'You have a Waypoint element with display none. For more information on ',
    'why this is a bad idea read ',
    'http://imakewebthings.com/waypoints/guides/debugging/#display-none'
  ].join('')
  var fixedMessage = [
    'You have a Waypoint element with fixed positioning. For more ',
    'information on why this is a bad idea read ',
    'http://imakewebthings.com/waypoints/guides/debugging/#fixed-position'
  ].join('')

  function checkWaypointStyles() {
    var originalRefresh = window.Waypoint.Context.prototype.refresh

    window.Waypoint.Context.prototype.refresh = function() {
      for (var axis in this.waypoints) {
        for (var key in this.waypoints[axis]) {
          var style = this.waypoints[axis][key].element.style
          if (style && style.display === 'none') {
            console.error(displayNoneMessage)
          }
          if (style && style.position === 'fixed') {
            console.error(fixedMessage)
          }
        }
      }
      return originalRefresh.call(this)
    }
  }

  checkWaypointStyles()
}())
;
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    requestAnimationFrameShim
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportHeight()
    }
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportWidth()
    }
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    var isWindow = this.element === this.element.window
    var contextOffset = this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.Zepto
  var Waypoint = window.Waypoint

  function ZeptoAdapter(element) {
    this.element = element
    this.$element = $(element)
  }

  $.each([
    'off',
    'on',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    ZeptoAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  ZeptoAdapter.prototype.offset = function() {
    if (this.element !== this.element.window) {
      return this.$element.offset()
    }
  }

  // Adapted from https://gist.github.com/wheresrhys/5823198
  $.each([
    'width',
    'height'
  ], function(i, dimension) {
    function createDimensionMethod($element, includeBorder) {
      return function(includeMargin) {
        var $element = this.$element
        var size = $element[dimension]()
        var sides = {
          width: ['left', 'right'],
          height: ['top', 'bottom']
        }

        $.each(sides[dimension], function(i, side) {
          size += parseInt($element.css('padding-' + side), 10)
          if (includeBorder) {
            size += parseInt($element.css('border-' + side + '-width'), 10)
          }
          if (includeMargin) {
            size += parseInt($element.css('margin-' + side), 10)
          }
        })
        return size
      }
    }

    var innerMethod = $.camelCase('inner-' + dimension)
    var outerMethod = $.camelCase('outer-' + dimension)

    ZeptoAdapter.prototype[innerMethod] = createDimensionMethod(false)
    ZeptoAdapter.prototype[outerMethod] = createDimensionMethod(true)
  })

  $.each([
    'extend',
    'inArray'
  ], function(i, method) {
    ZeptoAdapter[method] = $[method]
  })

  ZeptoAdapter.isEmptyObject = function(obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false
    }
    return true
  }

  Waypoint.adapters.push({
    name: 'zepto',
    Adapter: ZeptoAdapter
  })
  Waypoint.Adapter = ZeptoAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),o[this.key]=this,e+=1}var e=0,o={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete o[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.destroyAll=function(){var t=[];for(var e in o)t.push(o[e]);for(var i=0,n=t.length;n>i;i++)t[i].destroy()},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+o,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,o+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var o=0,i={},n=window.Waypoint,r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t,s=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,r(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,r(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var o in e){var i=e[o],n=i.newScroll>i.oldScroll,r=n?i.forward:i.backward;for(var s in this.waypoints[o]){var a=this.waypoints[o][s],l=i.oldScroll<a.triggerPoint,h=i.newScroll>=a.triggerPoint,p=l&&h,c=!l&&!h;(p||c)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var u in t)t[u].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element===this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element===this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var o in this.waypoints[e])t.push(this.waypoints[e][o]);for(var i=0,n=t.length;n>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element===this.element.window,o=this.adapter.offset(),i={};this.handleScroll(),t={horizontal:{contextOffset:e?0:o.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:o.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,c,u=this.waypoints[n][s],d=u.options.offset,f=u.triggerPoint,w=0,y=null==f;u.element!==u.element.window&&(w=u.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(u):"string"==typeof d&&(d=parseFloat(d),u.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,u.triggerPoint=w+a-d,l=f<r.oldScroll,h=u.triggerPoint>=r.oldScroll,p=l&&h,c=!l&&!h,!y&&p?(u.queueTrigger(r.backward),i[u.group.id]=u.group):!y&&c?(u.queueTrigger(r.forward),i[u.group.id]=u.group):y&&r.oldScroll>=u.triggerPoint&&(u.queueTrigger(r.forward),i[u.group.id]=u.group)}}for(var g in i)i[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){s&&s(),e.refreshAll()},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function o(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},n=window.Waypoint;o.prototype.add=function(t){this.waypoints.push(t)},o.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},o.prototype.flushTriggers=function(){for(var o in this.triggerQueues){var i=this.triggerQueues[o],n="up"===o||"left"===o;i.sort(n?e:t);for(var r=0,s=i.length;s>r;r+=1){var a=i[r];(a.options.continuous||r===i.length-1)&&a.trigger([o])}}this.clearTriggerQueues()},o.prototype.next=function(e){this.waypoints.sort(t);var o=n.Adapter.inArray(e,this.waypoints),i=o===this.waypoints.length-1;return i?null:this.waypoints[o+1]},o.prototype.previous=function(e){this.waypoints.sort(t);var o=n.Adapter.inArray(e,this.waypoints);return o?this.waypoints[o-1]:null},o.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},o.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},o.prototype.first=function(){return this.waypoints[0]},o.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},o.findOrCreate=function(t){return i[t.axis][t.name]||new o(t)},n.Group=o}(),function(){"use strict";function t(t){this.element=t,this.$element=e(t)}var e=window.Zepto,o=window.Waypoint;e.each(["off","on","scrollLeft","scrollTop"],function(e,o){t.prototype[o]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[o].apply(this.$element,t)}}),t.prototype.offset=function(){return this.element!==this.element.window?this.$element.offset():void 0},e.each(["width","height"],function(o,i){function n(t,o){return function(t){var n=this.$element,r=n[i](),s={width:["left","right"],height:["top","bottom"]};return e.each(s[i],function(e,i){r+=parseInt(n.css("padding-"+i),10),o&&(r+=parseInt(n.css("border-"+i+"-width"),10)),t&&(r+=parseInt(n.css("margin-"+i),10))}),r}}var r=e.camelCase("inner-"+i),s=e.camelCase("outer-"+i);t.prototype[r]=n(!1),t.prototype[s]=n(!0)}),e.each(["extend","inArray"],function(o,i){t[i]=e[i]}),t.isEmptyObject=function(t){for(var e in t)return!1;return!0},o.adapters.push({name:"zepto",Adapter:t}),o.Adapter=t}(),function(){"use strict";function t(t){return function(){var o=[],i=arguments[0];return t.isFunction(arguments[0])&&(i=t.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var n=t.extend({},i,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),o.push(new e(n))}),o}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;
(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function isWindow(element) {
    return element === element.window
  }

  function getWindow(element) {
    if (isWindow(element)) {
      return element
    }
    return element.defaultView
  }

  function NoFrameworkAdapter(element) {
    this.element = element
    this.handlers = {}
  }

  NoFrameworkAdapter.prototype.innerHeight = function() {
    var isWin = isWindow(this.element)
    return isWin ? this.element.innerHeight : this.element.clientHeight
  }

  NoFrameworkAdapter.prototype.innerWidth = function() {
    var isWin = isWindow(this.element)
    return isWin ? this.element.innerWidth : this.element.clientWidth
  }

  NoFrameworkAdapter.prototype.off = function(event, handler) {
    function removeListeners(element, listeners, handler) {
      for (var i = 0, end = listeners.length - 1; i < end; i++) {
        var listener = listeners[i]
        if (!handler || handler === listener) {
          element.removeEventListener(listener)
        }
      }
    }

    var eventParts = event.split('.')
    var eventType = eventParts[0]
    var namespace = eventParts[1]
    var element = this.element

    if (namespace && this.handlers[namespace] && eventType) {
      removeListeners(element, this.handlers[namespace][eventType], handler)
      this.handlers[namespace][eventType] = []
    }
    else if (eventType) {
      for (var ns in this.handlers) {
        removeListeners(element, this.handlers[ns][eventType] || [], handler)
        this.handlers[ns][eventType] = []
      }
    }
    else if (namespace && this.handlers[namespace]) {
      for (var type in this.handlers[namespace]) {
        removeListeners(element, this.handlers[namespace][type], handler)
      }
      this.handlers[namespace] = {}
    }
  }

  /* Adapted from jQuery 1.x offset() */
  NoFrameworkAdapter.prototype.offset = function() {
    if (!this.element.ownerDocument) {
      return null
    }

    var documentElement = this.element.ownerDocument.documentElement
    var win = getWindow(this.element.ownerDocument)
    var rect = {
      top: 0,
      left: 0
    }

    if (this.element.getBoundingClientRect) {
      rect = this.element.getBoundingClientRect()
    }

    return {
      top: rect.top + win.pageYOffset - documentElement.clientTop,
      left: rect.left + win.pageXOffset - documentElement.clientLeft
    }
  }

  NoFrameworkAdapter.prototype.on = function(event, handler) {
    var eventParts = event.split('.')
    var eventType = eventParts[0]
    var namespace = eventParts[1] || '__default'
    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {}
    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || []

    nsTypeList.push(handler)
    this.element.addEventListener(eventType, handler)
  }

  NoFrameworkAdapter.prototype.outerHeight = function(includeMargin) {
    var height = this.innerHeight()
    var computedStyle

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element)
      height += parseInt(computedStyle.marginTop, 10)
      height += parseInt(computedStyle.marginBottom, 10)
    }

    return height
  }

  NoFrameworkAdapter.prototype.outerWidth = function(includeMargin) {
    var width = this.innerWidth()
    var computedStyle

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element)
      width += parseInt(computedStyle.marginLeft, 10)
      width += parseInt(computedStyle.marginRight, 10)
    }

    return width
  }

  NoFrameworkAdapter.prototype.scrollLeft = function() {
    var win = getWindow(this.element)
    return win ? win.pageXOffset : this.element.scrollLeft
  }

  NoFrameworkAdapter.prototype.scrollTop = function() {
    var win = getWindow(this.element)
    return win ? win.pageYOffset : this.element.scrollTop
  }

  NoFrameworkAdapter.extend = function() {
    var args = Array.prototype.slice.call(arguments)

    function merge(target, obj) {
      if (typeof target === 'object' && typeof obj === 'object') {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            target[key] = obj[key]
          }
        }
      }

      return target
    }

    for (var i = 1, end = args.length; i < end; i++) {
      merge(args[0], args[i])
    }
    return args[0]
  }

  NoFrameworkAdapter.inArray = function(element, array, i) {
    return array == null ? -1 : array.indexOf(element, i)
  }

  NoFrameworkAdapter.isEmptyObject = function(obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false
    }
    return true
  }

  Waypoint.adapters.push({
    name: 'noframework',
    Adapter: NoFrameworkAdapter
  })
  Waypoint.Adapter = NoFrameworkAdapter
}())
;
(function() {
  'use strict'

  var $ = window.Zepto
  var Waypoint = window.Waypoint

  function ZeptoAdapter(element) {
    this.element = element
    this.$element = $(element)
  }

  $.each([
    'off',
    'on',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    ZeptoAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  ZeptoAdapter.prototype.offset = function() {
    if (this.element !== this.element.window) {
      return this.$element.offset()
    }
  }

  // Adapted from https://gist.github.com/wheresrhys/5823198
  $.each([
    'width',
    'height'
  ], function(i, dimension) {
    function createDimensionMethod($element, includeBorder) {
      return function(includeMargin) {
        var $element = this.$element
        var size = $element[dimension]()
        var sides = {
          width: ['left', 'right'],
          height: ['top', 'bottom']
        }

        $.each(sides[dimension], function(i, side) {
          size += parseInt($element.css('padding-' + side), 10)
          if (includeBorder) {
            size += parseInt($element.css('border-' + side + '-width'), 10)
          }
          if (includeMargin) {
            size += parseInt($element.css('margin-' + side), 10)
          }
        })
        return size
      }
    }

    var innerMethod = $.camelCase('inner-' + dimension)
    var outerMethod = $.camelCase('outer-' + dimension)

    ZeptoAdapter.prototype[innerMethod] = createDimensionMethod(false)
    ZeptoAdapter.prototype[outerMethod] = createDimensionMethod(true)
  })

  $.each([
    'extend',
    'inArray'
  ], function(i, method) {
    ZeptoAdapter[method] = $[method]
  })

  ZeptoAdapter.isEmptyObject = function(obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false
    }
    return true
  }

  Waypoint.adapters.push({
    name: 'zepto',
    Adapter: ZeptoAdapter
  })
  Waypoint.Adapter = ZeptoAdapter
}())
;
(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    requestAnimationFrameShim
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportHeight()
    }
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    if (this.element === this.element.window) {
      return Waypoint.viewportWidth()
    }
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    var isWindow = this.element === this.element.window
    var contextOffset = this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }
  Waypoint.Context = Context
}())
;
(function() {
  'use strict'

  var displayNoneMessage = [
    'You have a Waypoint element with display none. For more information on ',
    'why this is a bad idea read ',
    'http://imakewebthings.com/waypoints/guides/debugging/#display-none'
  ].join('')
  var fixedMessage = [
    'You have a Waypoint element with fixed positioning. For more ',
    'information on why this is a bad idea read ',
    'http://imakewebthings.com/waypoints/guides/debugging/#fixed-position'
  ].join('')

  function checkWaypointStyles() {
    var originalRefresh = window.Waypoint.Context.prototype.refresh

    window.Waypoint.Context.prototype.refresh = function() {
      for (var axis in this.waypoints) {
        for (var key in this.waypoints[axis]) {
          var style = this.waypoints[axis][key].element.style
          if (style && style.display === 'none') {
            console.error(displayNoneMessage)
          }
          if (style && style.position === 'fixed') {
            console.error(fixedMessage)
          }
        }
      }
      return originalRefresh.call(this)
    }
  }

  checkWaypointStyles()
}())
;
(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/infinite-scroll */
  function Infinite(options) {
    this.options = $.extend({}, Infinite.defaults, options)
    this.container = this.options.element
    if (this.options.container !== 'auto') {
      this.container = this.options.container
    }
    this.$container = $(this.container)
    this.$more = $(this.options.more)

    if (this.$more.length) {
      this.setupHandler()
      this.waypoint = new Waypoint(this.options)
    }
  }

  /* Private */
  Infinite.prototype.setupHandler = function() {
    this.options.handler = $.proxy(function() {
      window.setTimeout($.proxy(function() {
        this.options.onBeforePageLoad()
        this.destroy()
        this.$container.addClass(this.options.loadingClass)

        $.get($(this.options.more).attr('href'), $.proxy(function(data) {
          var $data = $($.parseHTML(data))
          var $newMore = $data.find(this.options.more)

          this.$container.append($data.find(this.options.items))
          this.$container.removeClass(this.options.loadingClass)

          if (!$newMore.length) {
            $newMore = $data.filter(this.options.more)
          }
          if ($newMore.length) {
            this.$more.replaceWith($newMore)
            this.$more = $newMore
            this.waypoint = new Waypoint(this.options)
          }
          else {
            this.$more.remove()
          }

          this.options.onAfterPageLoad()
        }, this), 0)
      }, this))
    }, this)
  }

  /* Public */
  Infinite.prototype.destroy = function() {
    if (this.waypoint) {
      this.waypoint.destroy()
    }
  }

  Infinite.defaults = {
    container: 'auto',
    items: '.infinite-item',
    more: '.infinite-more-link',
    offset: 'bottom-in-view',
    loadingClass: 'infinite-loading',
    onBeforePageLoad: $.noop,
    onAfterPageLoad: $.noop
  }

  Waypoint.Infinite = Infinite
}())
;
(function() {
  'use strict'

  function noop() {}

  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/inview */
  function Inview(options) {
    this.options = Waypoint.Adapter.extend({}, Inview.defaults, options)
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints = []
    this.createWaypoints()
  }

  /* Private */
  Inview.prototype.createWaypoints = function() {
    var configs = {
      vertical: [{
        down: 'enter',
        up: 'exited',
        offset: '100%'
      }, {
        down: 'entered',
        up: 'exit',
        offset: 'bottom-in-view'
      }, {
        down: 'exit',
        up: 'entered',
        offset: 0
      }, {
        down: 'exited',
        up: 'enter',
        offset: function() {
          return -this.adapter.outerHeight()
        }
      }],
      horizontal: [{
        right: 'enter',
        left: 'exited',
        offset: '100%'
      }, {
        right: 'entered',
        left: 'exit',
        offset: 'right-in-view'
      }, {
        right: 'exit',
        left: 'entered',
        offset: 0
      }, {
        right: 'exited',
        left: 'enter',
        offset: function() {
          return -this.adapter.outerWidth()
        }
      }]
    }

    for (var i = 0, end = configs[this.axis].length; i < end; i++) {
      var config = configs[this.axis][i]
      this.createWaypoint(config)
    }
  }

  /* Private */
  Inview.prototype.createWaypoint = function(config) {
    var self = this
    this.waypoints.push(new Waypoint({
      element: this.options.element,
      handler: (function(config) {
        return function(direction) {
          self.options[config[direction]].call(this, direction)
        }
      }(config)),
      offset: config.offset,
      horizontal: this.options.horizontal
    }))
  }

  /* Public */
  Inview.prototype.destroy = function() {
    for (var i = 0, end = this.waypoints.length; i < end; i++) {
      this.waypoints[i].destroy()
    }
    this.waypoints = []
  }

  Inview.defaults = {
    enter: noop,
    entered: noop,
    exit: noop,
    exited: noop
  }

  Waypoint.Inview = Inview
}())
;
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    this.$element.wrap(this.options.wrapper)
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass).unwrap()
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

window.jQuery.each(window.jQuery.grep(Waypoint.adapters, function(adapter) {
  return 'jquery zepto'.indexOf(adapter.name) > -1
}), function(i, adapter) {
  describe('$.fn extension for ' + adapter.name + ':', function() {
    var $, waypoints

    beforeEach(function() {
      $ = adapter.name === 'jquery' ? window.jQuery : window.Zepto
      Waypoint.Adapter = adapter.Adapter
      loadFixtures('standard.html')
    })

    afterEach(function() {
      $.each(waypoints, function(i, waypoint) {
        waypoint.destroy()
      })
      waits(50)
    })

    describe('waypoint initialization', function() {
      it('uses the subject elements as the element option', function() {
        waypoints = $('.nearsame').waypoint(function() {})
        expect(waypoints[0].element.id).toEqual('near1')
        expect(waypoints[1].element.id).toEqual('near2')
      })

      it('returns an array of Waypoint instances', function() {
        waypoints = $('.nearsame').waypoint(function() {})
        expect($.isArray(waypoints)).toBeTruthy()
        expect(waypoints.length).toEqual(2)
      })

      it('can take the handler as the first parameter', function() {
        function handler() {}
        waypoints = $('#near1').waypoint(handler)
        expect(waypoints[0].callback).toBe(handler)
      })
    })

    describe('context option', function() {
      it('can be given a string selector', function() {
        waypoints = $('#inner3').waypoint({
          context: '#bottom',
          handler: function() {}
        })
        expect(waypoints[0].context.element).toBe($('#bottom')[0])
      })
    })
  })
})
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

window.jQuery.each(Waypoint.adapters, function(i, adapter) {
  describe(adapter.name + ' adapter:', function() {
    describe('Waypoint.Context', function() {
      var $ = window.jQuery
      var standard = 50
      var currentDirection, $scroller, waypoint, $target, context, skipDestroy

      function setDirection(direction) {
        currentDirection = direction
      }

      beforeEach(function() {
        Waypoint.Adapter = adapter.Adapter
        loadFixtures('standard.html')
        $scroller = $(window)
        currentDirection = null
        skipDestroy = false
        $target = $('#same1')
        waypoint = new Waypoint({
          element: $target[0],
          handler: setDirection
        })
        context = waypoint.context
      })

      afterEach(function() {
        if (!skipDestroy) {
          waypoint.destroy()
        }
        $scroller.scrollTop(0).scrollLeft(0)
        waits(standard)
      })

      describe('#refresh', function() {
        it('updates trigger point of waypoints', function() {
          var top = $target.offset().top
          $target.css({
            top: top + 1
          })
          context.refresh()
          expect(waypoint.triggerPoint).toEqual(top + 1)
        })

        it('triggers down direction if waypoint crosses upwards', function() {
          $target.css('top', '-1px')
          context.refresh()
          expect(currentDirection).toEqual('down')
        })

        it('triggers up direction if waypoint crosses downwards', function() {
          $target.css('top', '-1px')
          context.refresh()
          $target.css('top', '0px')
          context.refresh()
          expect(currentDirection).toEqual('up')
        })

        it('returns the same context instance for chaining', function() {
          expect(context.refresh()).toEqual(context)
        })
      })

      describe('#destroy', function() {
        it('prevents further waypoint triggers', function() {
          skipDestroy = true
          runs(function() {
            context.destroy()
            $scroller.scrollTop($target.offset().top)
          })
          waits(standard)
          runs(function() {
            expect(currentDirection).toBeNull()
          })
        })

        it('removes context from global lookup', function() {
          skipDestroy = true
          context.destroy()
          expect(Waypoint.Context.findByElement(window)).toBeFalsy()
        })
      })

      describe('Waypoint.Context.refreshAll()', function() {
        it('calls refresh on all contexts', function() {
          var secondWaypoint = new Waypoint({
            element: $('#inner3')[0],
            context: $('#bottom')[0],
            handler: function() {}
          })
          var secondContext = secondWaypoint.context
          spyOn(context, 'refresh')
          spyOn(secondContext, 'refresh')
          Waypoint.Context.refreshAll()
          expect(context.refresh).toHaveBeenCalled()
          expect(secondContext.refresh).toHaveBeenCalled()
          secondWaypoint.destroy()
        })
      })
    })
  })
})
;
'use strict'

/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

describe('Waypoints debug script', function() {
  var waypoint, element

  beforeEach(function() {
    loadFixtures('standard.html')
  })

  afterEach(function() {
    waypoint.destroy()
  })

  describe('display none detection', function() {
    beforeEach(function() {
      element = document.getElementById('same1')
      waypoint = new Waypoint({
        element: element,
        handler: function() {}
      })
      element.style.display = 'none'
    })

    it('logs a console error', function() {
      spyOn(console, 'error')
      waypoint.context.refresh()
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('display fixed positioning detection', function() {
    beforeEach(function() {
      element = document.getElementById('same1')
      waypoint = new Waypoint({
        element: element,
        handler: function() {}
      })
      element.style.position = 'fixed'
    })

    it('logs a console error', function() {
      spyOn(console, 'error')
      waypoint.context.refresh()
      expect(console.error).toHaveBeenCalled()
    })
  })


  describe('fixed position detection', function() {

  })
})
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

window.jQuery.each(Waypoint.adapters, function(i, adapter) {
  describe(adapter.name + ' adapter:', function() {
    describe('Waypoint.Group', function() {
      var $ = window.jQuery
      var standard = 50
      var firstWaypoint, secondWaypoint, customGroupWaypoint, defaultGroup

      beforeEach(function() {
        Waypoint.Adapter = adapter.Adapter
        loadFixtures('standard.html')
        firstWaypoint = new Waypoint({
          element: $('#same1')[0],
          handler: function() {}
        })
        secondWaypoint = new Waypoint({
          element: $('#near1')[0],
          handler: function() {}
        })
        customGroupWaypoint = new Waypoint({
          element: $('#same2')[0],
          group: 'custom',
          handler: function() {}
        })
        defaultGroup = firstWaypoint.group
      })

      afterEach(function() {
        firstWaypoint.destroy()
        secondWaypoint.destroy()
        customGroupWaypoint.destroy()
        waits(standard)
      })

      describe('#previous(waypoint)', function() {
        it('returns previous waypoint based on trigger point', function() {
          expect(defaultGroup.previous(secondWaypoint)).toEqual(firstWaypoint)
        })

        it('returns null if on the first waypoint in the group', function() {
          expect(defaultGroup.previous(firstWaypoint)).toBeNull()
        })
      })

      describe('#next(waypoint)', function() {
        it('returns next waypoint based on trigger point', function() {
          expect(defaultGroup.next(firstWaypoint)).toEqual(secondWaypoint)
        })

        it('returns null if on the last waypoint in the group', function() {
          expect(defaultGroup.next(secondWaypoint)).toBeNull()
        })
      })

      describe('#first()', function() {
        it('returns the first waypoint based on trigger point', function() {
          expect(defaultGroup.first()).toEqual(firstWaypoint)
        })
      })

      describe('#last()', function() {
        it('returns the first waypoint based on trigger point', function() {
          expect(defaultGroup.last()).toEqual(secondWaypoint)
        })
      })
    })
  })
})
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint, jasmine
 */

describe('Waypoint Sticky Shortcut', function() {
  var $ = window.jQuery
  var standard = 50
  var $scroller = $(window)
  var $container, $items, $more, waypoint, beforeSpy, afterSpy

  beforeEach(function() {
    loadFixtures('infinite.html')
    $items = $('.infinite-item')
    $container = $('.infinite-container')
    $more = $('.infinite-more-link')
    beforeSpy = jasmine.createSpy('on before callback')
    afterSpy = jasmine.createSpy('on after callback')
  })

  afterEach(function() {
    waypoint.destroy()
    $scroller.scrollTop(0)
    waits(standard)
  })

  it('returns an instance of the Waypoint.Infinite class', function() {
    waypoint = new Waypoint.Infinite({
      element: $container[0]
    })
    expect(waypoint instanceof Waypoint.Infinite).toBeTruthy()
  })

  describe('loading new pages', function() {
    beforeEach(function() {
      runs(function() {
        waypoint = new Waypoint.Infinite({
          element: $container[0],
          onBeforePageLoad: beforeSpy,
          onAfterPageLoad: afterSpy
        })
        $scroller.scrollTop(Waypoint.viewportHeight() - $container.height())
      })
      waitsFor(function() {
        return $('.infinite-container > .infinite-item').length > $items.length
      }, 'new items to load')
    })

    it('replaces the more link with the new more link', function() {
      expect($more[0]).not.toEqual($('.infinite-more-link')[0])
    })

    it('fires the before callback', function() {
      expect(beforeSpy.callCount).toBeTruthy()
    })

    it('fires the after callback', function() {
      expect(afterSpy.callCount).toBeTruthy()
    })
  })

  describe('when there is no more link on initialization', function() {
    beforeEach(function() {
      $more.remove()
      waypoint = new Waypoint.Infinite({
        element: $container[0]
      })
    })

    it('does not create the waypoint', function() {
      expect(waypoint.waypoint).toBeFalsy()
    })
  })
})
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

window.jQuery.each(Waypoint.adapters, function(i, adapter) {
  describe(adapter.name + ' adapter:', function() {
    describe('Waypoints Inview Shortcut', function() {
      var $ = window.jQuery
      var standard = 50
      var $scroller = $(window)
      var $target, waypoint, hits

      function setsTrue(key) {
        return function() {
          hits[key] = true
        }
      }

      function toBeTrue(key) {
        return function() {
          return hits[key]
        }
      }

      beforeEach(function() {
        Waypoint.Adapter = adapter.Adapter
        loadFixtures('standard.html')
        $target = $('#near2')
        hits = {}
      })

      afterEach(function() {
        waypoint.destroy()
        $scroller.scrollTop(0).scrollLeft(0)
        waits(standard)
      })

      describe('vertical', function() {
        beforeEach(function() {
          waypoint = new Waypoint.Inview({
            element: $target[0],
            enter: setsTrue('enter'),
            entered: setsTrue('entered'),
            exit: setsTrue('exit'),
            exited: setsTrue('exited')
          })
        })

        describe('enter callback', function() {
          it('triggers when element starts entering from below', function() {
            runs(function() {
              var top = $target.offset().top
              $scroller.scrollTop(top - Waypoint.viewportHeight())
            })
            waitsFor(toBeTrue('enter'), 'enter to trigger')
          })

          it('triggers when element starts entering from above', function() {
            runs(function() {
              $scroller.scrollTop($target.offset().top + $target.outerHeight())
            })
            waits(standard)
            runs(function() {
              hits.enter = false
              $scroller.scrollTop($scroller.scrollTop() - 1)
            })
            waitsFor(toBeTrue('enter'), 'enter to trigger')
          })
        })

        describe('entered callback', function() {
          it('triggers when element finishes entering from below', function() {
            runs(function() {
              var top = $target.offset().top
              var viewportHeight = Waypoint.viewportHeight()
              var elementHeight = $target.outerHeight()
              $scroller.scrollTop(top - viewportHeight + elementHeight)
            })
            waitsFor(toBeTrue('entered'), 'entered to trigger')
          })

          it('triggers when element finishes entering from above', function() {
            runs(function() {
              $scroller.scrollTop($target.offset().top)
            })
            waits(standard)
            runs(function() {
              hits.entered = false
              $scroller.scrollTop($scroller.scrollTop() - 1)
            })
            waitsFor(toBeTrue('entered'), 'entered to trigger')
          })
        })

        describe('exit callback', function() {
          it('triggers when element starts leaving below', function() {
            runs(function() {
              var top = $target.offset().top
              var viewportHeight = Waypoint.viewportHeight()
              var elementHeight = $target.outerHeight()
              $scroller.scrollTop(top - viewportHeight + elementHeight)
            })
            waits(standard)
            runs(function() {
              expect(hits.exit).toBeFalsy()
              $scroller.scrollTop($scroller.scrollTop() - 1)
            })
            waitsFor(toBeTrue('exit'), 'exit to trigger')
          })

          it('triggers when element starts leaving above', function() {
            runs(function() {
              $scroller.scrollTop($target.offset().top)
            })
            waitsFor(toBeTrue('exit'), 'exit to trigger')
          })
        })

        describe('exited callback', function() {
          it('triggers when element finishes exiting below', function() {
            runs(function() {
              var top = $target.offset().top
              $scroller.scrollTop(top - Waypoint.viewportHeight())
            })
            waits(standard)
            runs(function() {
              $scroller.scrollTop($scroller.scrollTop() - 1)
            })
            waitsFor(toBeTrue('exited'), 'exited to trigger')
          })

          it('triggers when element finishes exiting above', function() {
            runs(function() {
              $scroller.scrollTop($target.offset().top + $target.outerHeight())
            })
            waitsFor(toBeTrue('exited'), 'exited to trigger')
          })
        })
      })

      describe('horizontal', function() {
        beforeEach(function() {
          waypoint = new Waypoint.Inview({
            horizontal: true,
            element: $target[0],
            enter: setsTrue('enter'),
            entered: setsTrue('entered'),
            exit: setsTrue('exit'),
            exited: setsTrue('exited')
          })
        })

        describe('enter callback', function() {
          it('triggers when element starts entering from right', function() {
            runs(function() {
              $scroller.scrollLeft($target.offset().left - $scroller.width())
            })
            waitsFor(toBeTrue('enter'), 'enter to trigger')
          })

          it('triggers when element starts entering from left', function() {
            runs(function() {
              var left = $target.offset().left
              $scroller.scrollLeft(left + $target.outerWidth())
            })
            waits(standard)
            runs(function() {
              hits.enter = false
              $scroller.scrollLeft($scroller.scrollLeft() - 1)
            })
            waitsFor(toBeTrue('enter'), 'enter to trigger')
          })
        })

        describe('entered callback', function() {
          it('triggers when element finishes entering from right', function() {
            runs(function() {
              var left = $target.offset().left
              var viewportWidth = $scroller.width()
              var elementWidth = $target.outerWidth()
              $scroller.scrollLeft(left - viewportWidth + elementWidth)
            })
            waitsFor(toBeTrue('entered'), 'entered to trigger')
          })

          it('triggers when element finishes entering from left', function() {
            runs(function() {
              $scroller.scrollLeft($target.offset().left)
            })
            waits(standard)
            runs(function() {
              hits.entered = false
              $scroller.scrollLeft($scroller.scrollLeft() - 1)
            })
            waitsFor(toBeTrue('entered'), 'entered to trigger')
          })
        })

        describe('exit callback', function() {
          it('triggers when element starts leaving on the right', function() {
            runs(function() {
              var left = $target.offset().left
              var viewportWidth = $scroller.width()
              var elementWidth = $target.outerWidth()
              $scroller.scrollLeft(left - viewportWidth + elementWidth)
            })
            waits(standard)
            runs(function() {
              expect(hits.exit).toBeFalsy()
              $scroller.scrollLeft($scroller.scrollLeft() - 1)
            })
            waitsFor(toBeTrue('exit'), 'exit to trigger')
          })

          it('triggers when element starts leaving on the left', function() {
            runs(function() {
              $scroller.scrollLeft($target.offset().left)
            })
            waitsFor(toBeTrue('exit'), 'exit to trigger')
          })
        })

        describe('exited callback', function() {
          it('triggers when element finishes exiting to the right', function() {
            runs(function() {
              var left = $target.offset().left
              $scroller.scrollLeft(left - $scroller.width())
            })
            waits(standard)
            runs(function() {
              $scroller.scrollLeft($scroller.scrollLeft() - 1)
            })
            waitsFor(toBeTrue('exited'), 'exited to trigger')
          })

          it('triggers when element finishes exiting to the left', function() {
            runs(function() {
              var left = $target.offset().left
              $scroller.scrollLeft(left + $target.outerWidth())
            })
            waitsFor(toBeTrue('exited'), 'exited to trigger')
          })
        })
      })
    })
  })
})
;
/**
 * CoffeeScript Compiler v1.3.3
 * http://coffeescript.org
 *
 * Copyright 2011, Jeremy Ashkenas
 * Released under the MIT License
 */

(function(root){var CoffeeScript=function(){function require(a){return require[a]}require["./helpers"]=new function(){var a=this;(function(){var b,c;a.starts=function(a,b,c){return b===a.substr(c,b.length)},a.ends=function(a,b,c){var d;d=b.length;return b===a.substr(a.length-d-(c||0),d)},a.compact=function(a){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++)b=a[c],b&&e.push(b);return e},a.count=function(a,b){var c,d;c=d=0;if(!b.length)return 1/0;while(d=1+a.indexOf(b,d))c++;return c},a.merge=function(a,c){return b(b({},a),c)},b=a.extend=function(a,b){var c,d;for(c in b)d=b[c],a[c]=d;return a},a.flatten=c=function(a){var b,d,e,f;d=[];for(e=0,f=a.length;e<f;e++)b=a[e],b instanceof Array?d=d.concat(c(b)):d.push(b);return d},a.del=function(a,b){var c;c=a[b],delete a[b];return c},a.last=function(a,b){return a[a.length-(b||0)-1]}}).call(this)},require["./rewriter"]=new function(){var a=this;(function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1},u=[].slice;a.Rewriter=function(){function a(){}a.prototype.rewrite=function(a){this.tokens=a,this.removeLeadingNewlines(),this.removeMidExpressionNewlines(),this.closeOpenCalls(),this.closeOpenIndexes(),this.addImplicitIndentation(),this.tagPostfixConditionals(),this.addImplicitBraces(),this.addImplicitParentheses();return this.tokens},a.prototype.scanTokens=function(a){var b,c,d;d=this.tokens,b=0;while(c=d[b])b+=a.call(this,c,b,d);return!0},a.prototype.detectEnd=function(a,b,c){var f,g,h,i,j;h=this.tokens,f=0;while(g=h[a]){if(f===0&&b.call(this,g,a))return c.call(this,g,a);if(!g||f<0)return c.call(this,g,a-1);if(i=g[0],t.call(e,i)>=0)f+=1;else if(j=g[0],t.call(d,j)>=0)f-=1;a+=1}return a-1},a.prototype.removeLeadingNewlines=function(){var a,b,c,d,e;e=this.tokens;for(a=c=0,d=e.length;c<d;a=++c){b=e[a][0];if(b!=="TERMINATOR")break}if(a)return this.tokens.splice(0,a)},a.prototype.removeMidExpressionNewlines=function(){return this.scanTokens(function(a,b,d){var e;if(!(a[0]==="TERMINATOR"&&(e=this.tag(b+1),t.call(c,e)>=0)))return 1;d.splice(b,1);return 0})},a.prototype.closeOpenCalls=function(){var a,b;b=function(a,b){var c;return(c=a[0])===")"||c==="CALL_END"||a[0]==="OUTDENT"&&this.tag(b-1)===")"},a=function(a,b){return this.tokens[a[0]==="OUTDENT"?b-1:b][0]="CALL_END"};return this.scanTokens(function(c,d){c[0]==="CALL_START"&&this.detectEnd(d+1,b,a);return 1})},a.prototype.closeOpenIndexes=function(){var a,b;b=function(a,b){var c;return(c=a[0])==="]"||c==="INDEX_END"},a=function(a,b){return a[0]="INDEX_END"};return this.scanTokens(function(c,d){c[0]==="INDEX_START"&&this.detectEnd(d+1,b,a);return 1})},a.prototype.addImplicitBraces=function(){var a,b,c,f,g,i,j,k;f=[],g=null,k=null,c=!0,i=0,j=0,b=function(a,b){var d,e,f,g,i,m;i=this.tokens.slice(b+1,b+3+1||9e9),d=i[0],g=i[1],f=i[2];if("HERECOMMENT"===(d!=null?d[0]:void 0))return!1;e=a[0],t.call(l,e)>=0&&(c=!1);return(e==="TERMINATOR"||e==="OUTDENT"||t.call(h,e)>=0&&c&&b-j!==1)&&(!k&&this.tag(b-1)!==","||(g!=null?g[0]:void 0)!==":"&&((d!=null?d[0]:void 0)!=="@"||(f!=null?f[0]:void 0)!==":"))||e===","&&d&&(m=d[0])!=="IDENTIFIER"&&m!=="NUMBER"&&m!=="STRING"&&m!=="@"&&m!=="TERMINATOR"&&m!=="OUTDENT"},a=function(a,b){var c;c=this.generate("}","}",a[2]);return this.tokens.splice(b,0,c)};return this.scanTokens(function(h,i,m){var n,o,p,q,r,s,u,v;if(u=q=h[0],t.call(e,u)>=0){f.push([q==="INDENT"&&this.tag(i-1)==="{"?"{":q,i]);return 1}if(t.call(d,q)>=0){g=f.pop();return 1}if(q!==":"||(n=this.tag(i-2))!==":"&&((v=f[f.length-1])!=null?v[0]:void 0)==="{")return 1;c=!0,j=i+1,f.push(["{"]),o=n==="@"?i-2:i-1;while(this.tag(o-2)==="HERECOMMENT")o-=2;p=this.tag(o-1),k=!p||t.call(l,p)>=0,s=new String("{"),s.generated=!0,r=this.generate("{",s,h[2]),m.splice(o,0,r),this.detectEnd(i+2,b,a);return 2})},a.prototype.addImplicitParentheses=function(){var a,b,c,d,e;c=e=d=!1,b=function(a,b){var c,g,i,j;g=a[0];if(!e&&a.fromThen)return!0;if(g==="IF"||g==="ELSE"||g==="CATCH"||g==="->"||g==="=>"||g==="CLASS")e=!0;if(g==="IF"||g==="ELSE"||g==="SWITCH"||g==="TRY"||g==="=")d=!0;if((g==="."||g==="?."||g==="::")&&this.tag(b-1)==="OUTDENT")return!0;return!a.generated&&this.tag(b-1)!==","&&(t.call(h,g)>=0||g==="INDENT"&&!d)&&(g!=="INDENT"||(i=this.tag(b-2))!=="CLASS"&&i!=="EXTENDS"&&(j=this.tag(b-1),t.call(f,j)<0)&&(!(c=this.tokens[b+1])||!c.generated||c[0]!=="{"))},a=function(a,b){return this.tokens.splice(b,0,this.generate("CALL_END",")",a[2]))};return this.scanTokens(function(f,h,k){var m,n,o,p,q,r,s,u;q=f[0];if(q==="CLASS"||q==="IF"||q==="FOR"||q==="WHILE")c=!0;r=k.slice(h-1,h+1+1||9e9),p=r[0],n=r[1],o=r[2],m=!c&&q==="INDENT"&&o&&o.generated&&o[0]==="{"&&p&&(s=p[0],t.call(i,s)>=0),e=!1,d=!1,t.call(l,q)>=0&&(c=!1),p&&!p.spaced&&q==="?"&&(f.call=!0);if(f.fromThen)return 1;if(!(m||(p!=null?p.spaced:void 0)&&(p.call||(u=p[0],t.call(i,u)>=0))&&(t.call(g,q)>=0||!f.spaced&&!f.newLine&&t.call(j,q)>=0)))return 1;k.splice(h,0,this.generate("CALL_START","(",f[2])),this.detectEnd(h+1,b,a),p[0]==="?"&&(p[0]="FUNC_EXIST");return 2})},a.prototype.addImplicitIndentation=function(){var a,b,c,d,e;e=c=d=null,b=function(a,b){var c;return a[1]!==";"&&(c=a[0],t.call(m,c)>=0)&&(a[0]!=="ELSE"||e==="IF"||e==="THEN")},a=function(a,b){return this.tokens.splice(this.tag(b-1)===","?b-1:b,0,d)};return this.scanTokens(function(f,g,h){var i,j,k;i=f[0];if(i==="TERMINATOR"&&this.tag(g+1)==="THEN"){h.splice(g,1);return 0}if(i==="ELSE"&&this.tag(g-1)!=="OUTDENT"){h.splice.apply(h,[g,0].concat(u.call(this.indentation(f))));return 2}if(i==="CATCH"&&((j=this.tag(g+2))==="OUTDENT"||j==="TERMINATOR"||j==="FINALLY")){h.splice.apply(h,[g+2,0].concat(u.call(this.indentation(f))));return 4}if(t.call(n,i)>=0&&this.tag(g+1)!=="INDENT"&&(i!=="ELSE"||this.tag(g+1)!=="IF")){e=i,k=this.indentation(f,!0),c=k[0],d=k[1],e==="THEN"&&(c.fromThen=!0),h.splice(g+1,0,c),this.detectEnd(g+2,b,a),i==="THEN"&&h.splice(g,1);return 1}return 1})},a.prototype.tagPostfixConditionals=function(){var a,b,c;c=null,b=function(a,b){var c;return(c=a[0])==="TERMINATOR"||c==="INDENT"},a=function(a,b){if(a[0]!=="INDENT"||a.generated&&!a.fromThen)return c[0]="POST_"+c[0]};return this.scanTokens(function(d,e){if(d[0]!=="IF")return 1;c=d,this.detectEnd(e+1,b,a);return 1})},a.prototype.indentation=function(a,b){var c,d;b==null&&(b=!1),c=["INDENT",2,a[2]],d=["OUTDENT",2,a[2]],b&&(c.generated=d.generated=!0);return[c,d]},a.prototype.generate=function(a,b,c){var d;d=[a,b,c],d.generated=!0;return d},a.prototype.tag=function(a){var b;return(b=this.tokens[a])!=null?b[0]:void 0};return a}(),b=[["(",")"],["[","]"],["{","}"],["INDENT","OUTDENT"],["CALL_START","CALL_END"],["PARAM_START","PARAM_END"],["INDEX_START","INDEX_END"]],a.INVERSES=k={},e=[],d=[];for(q=0,r=b.length;q<r;q++)s=b[q],o=s[0],p=s[1],e.push(k[p]=o),d.push(k[o]=p);c=["CATCH","WHEN","ELSE","FINALLY"].concat(d),i=["IDENTIFIER","SUPER",")","CALL_END","]","INDEX_END","@","THIS"],g=["IDENTIFIER","NUMBER","STRING","JS","REGEX","NEW","PARAM_START","CLASS","IF","TRY","SWITCH","THIS","BOOL","NULL","UNDEFINED","UNARY","SUPER","@","->","=>","[","(","{","--","++"],j=["+","-"],f=["->","=>","{","[",","],h=["POST_IF","FOR","WHILE","UNTIL","WHEN","BY","LOOP","TERMINATOR"],n=["ELSE","->","=>","TRY","FINALLY","THEN"],m=["TERMINATOR","CATCH","FINALLY","ELSE","OUTDENT","LEADING_WHEN"],l=["TERMINATOR","INDENT","OUTDENT"]}).call(this)},require["./lexer"]=new function(){var a=this;(function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};V=require("./rewriter"),J=V.Rewriter,r=V.INVERSES,W=require("./helpers"),R=W.count,U=W.starts,Q=W.compact,T=W.last,a.Lexer=y=function(){function a(){}a.prototype.tokenize=function(a,b){var c,d;b==null&&(b={}),P.test(a)&&(a="\n"+a),a=a.replace(/\r/g,"").replace(N,""),this.code=a,this.line=b.line||0,this.indent=0,this.indebt=0,this.outdebt=0,this.indents=[],this.ends=[],this.tokens=[],c=0;while(this.chunk=a.slice(c))c+=this.identifierToken()||this.commentToken()||this.whitespaceToken()||this.lineToken()||this.heredocToken()||this.stringToken()||this.numberToken()||this.regexToken()||this.jsToken()||this.literalToken();this.closeIndentation(),(d=this.ends.pop())&&this.error("missing "+d);if(b.rewrite===!1)return this.tokens;return(new J).rewrite(this.tokens)},a.prototype.identifierToken=function(){var a,b,c,d,h,i,j,k,l;if(!(h=p.exec(this.chunk)))return 0;d=h[0],c=h[1],a=h[2];if(c==="own"&&this.tag()==="FOR"){this.token("OWN",c);return c.length}b=a||(i=T(this.tokens))&&((k=i[0])==="."||k==="?."||k==="::"||!i.spaced&&i[0]==="@"),j="IDENTIFIER",!b&&(X.call(u,c)>=0||X.call(g,c)>=0)&&(j=c.toUpperCase(),j==="WHEN"&&(l=this.tag(),X.call(v,l)>=0)?j="LEADING_WHEN":j==="FOR"?this.seenFor=!0:j==="UNLESS"?j="IF":X.call(O,j)>=0?j="UNARY":X.call(H,j)>=0&&(j!=="INSTANCEOF"&&this.seenFor?(j="FOR"+j,this.seenFor=!1):(j="RELATION",this.value()==="!"&&(this.tokens.pop(),c="!"+c)))),X.call(t,c)>=0&&(b?(j="IDENTIFIER",c=new String(c),c.reserved=!0):X.call(I,c)>=0&&this.error('reserved word "'+c+'"')),b||(X.call(e,c)>=0&&(c=f[c]),j=function(){switch(c){case"!":return"UNARY";case"==":case"!=":return"COMPARE";case"&&":case"||":return"LOGIC";case"true":case"false":return"BOOL";case"break":case"continue":return"STATEMENT";default:return j}}()),this.token(j,c),a&&this.token(":",":");return d.length},a.prototype.numberToken=function(){var a,b,c,d,e;if(!(c=E.exec(this.chunk)))return 0;d=c[0],/^0[BOX]/.test(d)?this.error("radix prefix '"+d+"' must be lowercase"):/E/.test(d)&&!/^0x/.test(d)?this.error("exponential notation '"+d+"' must be indicated with a lowercase 'e'"):/^0\d*[89]/.test(d)?this.error("decimal literal '"+d+"' must not be prefixed with '0'"):/^0\d+/.test(d)&&this.error("octal literal '"+d+"' must be prefixed with '0o'"),b=d.length;if(e=/^0o([0-7]+)/.exec(d))d="0x"+parseInt(e[1],8).toString(16);if(a=/^0b([01]+)/.exec(d))d="0x"+parseInt(a[1],2).toString(16);this.token("NUMBER",d);return b},a.prototype.stringToken=function(){var a,b,c;switch(this.chunk.charAt(0)){case"'":if(!(a=L.exec(this.chunk)))return 0;this.token("STRING",(c=a[0]).replace(A,"\\\n"));break;case'"':if(!(c=this.balancedString(this.chunk,'"')))return 0;0<c.indexOf("#{",1)?this.interpolateString(c.slice(1,-1)):this.token("STRING",this.escapeLines(c));break;default:return 0}(b=/^(?:\\.|[^\\])*\\(?:0[0-7]|[1-7])/.test(c))&&this.error("octal escape sequences "+c+" are not allowed"),this.line+=R(c,"\n");return c.length},a.prototype.heredocToken=function(){var a,b,c,d;if(!(c=k.exec(this.chunk)))return 0;b=c[0],d=b.charAt(0),a=this.sanitizeHeredoc(c[2],{quote:d,indent:null}),d==='"'&&0<=a.indexOf("#{")?this.interpolateString(a,{heredoc:!0}):this.token("STRING",this.makeString(a,d,!0)),this.line+=R(b,"\n");return b.length},a.prototype.commentToken=function(){var a,b,c;if(!(c=this.chunk.match(h)))return 0;a=c[0],b=c[1],b&&this.token("HERECOMMENT",this.sanitizeHeredoc(b,{herecomment:!0,indent:Array(this.indent+1).join(" ")})),this.line+=R(a,"\n");return a.length},a.prototype.jsToken=function(){var a,b;if(this.chunk.charAt(0)!=="`"||!(a=s.exec(this.chunk)))return 0;this.token("JS",(b=a[0]).slice(1,-1));return b.length},a.prototype.regexToken=function(){var a,b,c,d,e,f,g;if(this.chunk.charAt(0)!=="/")return 0;if(c=n.exec(this.chunk)){b=this.heregexToken(c),this.line+=R(c[0],"\n");return b}d=T(this.tokens);if(d&&(f=d[0],X.call(d.spaced?C:D,f)>=0))return 0;if(!(c=G.exec(this.chunk)))return 0;g=c,c=g[0],e=g[1],a=g[2],e.slice(0,2)==="/*"&&this.error("regular expressions cannot begin with `*`"),e==="//"&&(e="/(?:)/"),this.token("REGEX",""+e+a);return c.length},a.prototype.heregexToken=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n;d=a[0],b=a[1],c=a[2];if(0>b.indexOf("#{")){e=b.replace(o,"").replace(/\//g,"\\/"),e.match(/^\*/)&&this.error("regular expressions cannot begin with `*`"),this.token("REGEX","/"+(e||"(?:)")+"/"+c);return d.length}this.token("IDENTIFIER","RegExp"),this.tokens.push(["CALL_START","("]),g=[],k=this.interpolateString(b,{regex:!0});for(i=0,j=k.length;i<j;i++){l=k[i],f=l[0],h=l[1];if(f==="TOKENS")g.push.apply(g,h);else{if(!(h=h.replace(o,"")))continue;h=h.replace(/\\/g,"\\\\"),g.push(["STRING",this.makeString(h,'"',!0)])}g.push(["+","+"])}g.pop(),((m=g[0])!=null?m[0]:void 0)!=="STRING"&&this.tokens.push(["STRING",'""'],["+","+"]),(n=this.tokens).push.apply(n,g),c&&this.tokens.push([",",","],["STRING",'"'+c+'"']),this.token(")",")");return d.length},a.prototype.lineToken=function(){var a,b,c,d,e,f;if(!(c=B.exec(this.chunk)))return 0;b=c[0],this.line+=R(b,"\n"),this.seenFor=!1,e=T(this.tokens,1),f=b.length-1-b.lastIndexOf("\n"),d=this.unfinished();if(f-this.indebt===this.indent){d?this.suppressNewlines():this.newlineToken();return b.length}if(f>this.indent){if(d){this.indebt=f-this.indent,this.suppressNewlines();return b.length}a=f-this.indent+this.outdebt,this.token("INDENT",a),this.indents.push(a),this.ends.push("OUTDENT"),this.outdebt=this.indebt=0}else this.indebt=0,this.outdentToken(this.indent-f,d);this.indent=f;return b.length},a.prototype.outdentToken=function(a,b){var c,d;while(a>0)d=this.indents.length-1,this.indents[d]===void 0?a=0:this.indents[d]===this.outdebt?(a-=this.outdebt,this.outdebt=0):this.indents[d]<this.outdebt?(this.outdebt-=this.indents[d],a-=this.indents[d]):(c=this.indents.pop()-this.outdebt,a-=c,this.outdebt=0,this.pair("OUTDENT"),this.token("OUTDENT",c));c&&(this.outdebt-=a);while(this.value()===";")this.tokens.pop();this.tag()!=="TERMINATOR"&&!b&&this.token("TERMINATOR","\n");return this},a.prototype.whitespaceToken=function(){var a,b,c;if(!(a=P.exec(this.chunk))&&!(b=this.chunk.charAt(0)==="\n"))return 0;c=T(this.tokens),c&&(c[a?"spaced":"newLine"]=!0);return a?a[0].length:0},a.prototype.newlineToken=function(){while(this.value()===";")this.tokens.pop();this.tag()!=="TERMINATOR"&&this.token("TERMINATOR","\n");return this},a.prototype.suppressNewlines=function(){this.value()==="\\"&&this.tokens.pop();return this},a.prototype.literalToken=function(){var a,b,e,f,g,h,k,l;(a=F.exec(this.chunk))?(f=a[0],d.test(f)&&this.tagParameters()):f=this.chunk.charAt(0),e=f,b=T(this.tokens);if(f==="="&&b){!b[1].reserved&&(g=b[1],X.call(t,g)>=0)&&this.error('reserved word "'+this.value()+"\" can't be assigned");if((h=b[1])==="||"||h==="&&"){b[0]="COMPOUND_ASSIGN",b[1]+="=";return f.length}}if(f===";")this.seenFor=!1,e="TERMINATOR";else if(X.call(z,f)>=0)e="MATH";else if(X.call(i,f)>=0)e="COMPARE";else if(X.call(j,f)>=0)e="COMPOUND_ASSIGN";else if(X.call(O,f)>=0)e="UNARY";else if(X.call(K,f)>=0)e="SHIFT";else if(X.call(x,f)>=0||f==="?"&&(b!=null?b.spaced:void 0))e="LOGIC";else if(b&&!b.spaced)if(f==="("&&(k=b[0],X.call(c,k)>=0))b[0]==="?"&&(b[0]="FUNC_EXIST"),e="CALL_START";else if(f==="["&&(l=b[0],X.call(q,l)>=0)){e="INDEX_START";switch(b[0]){case"?":b[0]="INDEX_SOAK"}}switch(f){case"(":case"{":case"[":this.ends.push(r[f]);break;case")":case"}":case"]":this.pair(f)}this.token(e,f);return f.length},a.prototype.sanitizeHeredoc=function(a,b){var c,d,e,f,g;e=b.indent,d=b.herecomment;if(d){l.test(a)&&this.error('block comment cannot contain "*/", starting');if(a.indexOf("\n")<=0)return a}else while(f=m.exec(a)){c=f[1];if(e===null||0<(g=c.length)&&g<e.length)e=c}e&&(a=a.replace(RegExp("\\n"+e,"g"),"\n")),d||(a=a.replace(/^\n/,""));return a},a.prototype.tagParameters=function(){var a,b,c,d;if(this.tag()!==")")return this;b=[],d=this.tokens,a=d.length,d[--a][0]="PARAM_END";while(c=d[--a])switch(c[0]){case")":b.push(c);break;case"(":case"CALL_START":if(b.length)b.pop();else{if(c[0]==="("){c[0]="PARAM_START";return this}return this}}return this},a.prototype.closeIndentation=function(){return this.outdentToken(this.indent)},a.prototype.balancedString=function(a,b){var c,d,e,f,g,h,i,j;c=0,h=[b];for(d=i=1,j=a.length;1<=j?i<j:i>j;d=1<=j?++i:--i){if(c){--c;continue}switch(e=a.charAt(d)){case"\\":++c;continue;case b:h.pop();if(!h.length)return a.slice(0,d+1||9e9);b=h[h.length-1];continue}b!=="}"||e!=='"'&&e!=="'"?b==="}"&&e==="/"&&(f=n.exec(a.slice(d))||G.exec(a.slice(d)))?c+=f[0].length-1:b==="}"&&e==="{"?h.push(b="}"):b==='"'&&g==="#"&&e==="{"&&h.push(b="}"):h.push(b=e),g=e}return this.error("missing "+h.pop()+", starting")},a.prototype.interpolateString=function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;c==null&&(c={}),e=c.heredoc,m=c.regex,o=[],l=0,f=-1;while(j=b.charAt(f+=1)){if(j==="\\"){f+=1;continue}if(j!=="#"||b.charAt(f+1)!=="{"||!(d=this.balancedString(b.slice(f+1),"}")))continue;l<f&&o.push(["NEOSTRING",b.slice(l,f)]),g=d.slice(1,-1);if(g.length){k=(new a).tokenize(g,{line:this.line,rewrite:!1}),k.pop(),((s=k[0])!=null?s[0]:void 0)==="TERMINATOR"&&k.shift();if(i=k.length)i>1&&(k.unshift(["(","(",this.line]),k.push([")",")",this.line])),o.push(["TOKENS",k])}f+=d.length,l=f+1}f>l&&l<b.length&&o.push(["NEOSTRING",b.slice(l)]);if(m)return o;if(!o.length)return this.token("STRING",'""');o[0][0]!=="NEOSTRING"&&o.unshift(["",""]),(h=o.length>1)&&this.token("(","(");for(f=q=0,r=o.length;q<r;f=++q)t=o[f],n=t[0],p=t[1],f&&this.token("+","+"),n==="TOKENS"?(u=this.tokens).push.apply(u,p):this.token("STRING",this.makeString(p,'"',e));h&&this.token(")",")");return o},a.prototype.pair=function(a){var b,c;if(a!==(c=T(this.ends))){"OUTDENT"!==c&&this.error("unmatched "+a),this.indent-=b=T(this.indents),this.outdentToken(b,!0);return this.pair(a)}return this.ends.pop()},a.prototype.token=function(a,b){return this.tokens.push([a,b,this.line])},a.prototype.tag=function(a,b){var c;return(c=T(this.tokens,a))&&(b?c[0]=b:c[0])},a.prototype.value=function(a,b){var c;return(c=T(this.tokens,a))&&(b?c[1]=b:c[1])},a.prototype.unfinished=function(){var a;return w.test(this.chunk)||(a=this.tag())==="\\"||a==="."||a==="?."||a==="UNARY"||a==="MATH"||a==="+"||a==="-"||a==="SHIFT"||a==="RELATION"||a==="COMPARE"||a==="LOGIC"||a==="THROW"||a==="EXTENDS"},a.prototype.escapeLines=function(a,b){return a.replace(A,b?"\\n":"")},a.prototype.makeString=function(a,b,c){if(!a)return b+b;a=a.replace(/\\([\s\S])/g,function(a,c){return c==="\n"||c===b?c:a}),a=a.replace(RegExp(""+b,"g"),"\\$&");return b+this.escapeLines(a,c)+b},a.prototype.error=function(a){throw SyntaxError(""+a+" on line "+(this.line+1))};return a}(),u=["true","false","null","this","new","delete","typeof","in","instanceof","return","throw","break","continue","debugger","if","else","switch","for","while","do","try","catch","finally","class","extends","super"],g=["undefined","then","unless","until","loop","of","by","when"],f={and:"&&",or:"||",is:"==",isnt:"!=",not:"!",yes:"true",no:"false",on:"true",off:"false"},e=function(){var a;a=[];for(S in f)a.push(S);return a}(),g=g.concat(e),I=["case","default","function","var","void","with","const","let","enum","export","import","native","__hasProp","__extends","__slice","__bind","__indexOf","implements","interface","let","package","private","protected","public","static","yield"],M=["arguments","eval"],t=u.concat(I).concat(M),a.RESERVED=I.concat(u).concat(g).concat(M),a.STRICT_PROSCRIBED=M,p=/^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?/,E=/^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i,k=/^("""|''')([\s\S]*?)(?:\n[^\n\S]*)?\1/,F=/^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?\.|\.{2,3})/,P=/^[^\n\S]+/,h=/^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)?$)|^(?:\s*#(?!##[^#]).*)+/,d=/^[-=]>/,B=/^(?:\n[^\n\S]*)+/,L=/^'[^\\']*(?:\\.[^\\']*)*'/,s=/^`[^\\`]*(?:\\.[^\\`]*)*`/,G=/^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/,n=/^\/{3}([\s\S]+?)\/{3}([imgy]{0,4})(?!\w)/,o=/\s+(?:#.*)?/g,A=/\n/g,m=/\n+([^\n\S]*)/g,l=/\*\//,w=/^\s*(?:,|\??\.(?![.\d])|::)/,N=/\s+$/,j=["-=","+=","/=","*=","%=","||=","&&=","?=","<<=",">>=",">>>=","&=","^=","|="],O=["!","~","NEW","TYPEOF","DELETE","DO"],x=["&&","||","&","|","^"],K=["<<",">>",">>>"],i=["==","!=","<",">","<=",">="],z=["*","/","%"],H=["IN","OF","INSTANCEOF"],b=["TRUE","FALSE"],C=["NUMBER","REGEX","BOOL","NULL","UNDEFINED","++","--","]"],D=C.concat(")","}","THIS","IDENTIFIER","STRING"),c=["IDENTIFIER","STRING","REGEX",")","]","}","?","::","@","THIS","SUPER"],q=c.concat("NUMBER","BOOL","NULL","UNDEFINED"),v=["INDENT","OUTDENT","TERMINATOR"]}).call(this)},require["./parser"]=new function(){var a=this,b=function(){var a={trace:function(){},yy:{},symbols_:{error:2,Root:3,Body:4,Block:5,TERMINATOR:6,Line:7,Expression:8,Statement:9,Return:10,Comment:11,STATEMENT:12,Value:13,Invocation:14,Code:15,Operation:16,Assign:17,If:18,Try:19,While:20,For:21,Switch:22,Class:23,Throw:24,INDENT:25,OUTDENT:26,Identifier:27,IDENTIFIER:28,AlphaNumeric:29,NUMBER:30,STRING:31,Literal:32,JS:33,REGEX:34,DEBUGGER:35,UNDEFINED:36,NULL:37,BOOL:38,Assignable:39,"=":40,AssignObj:41,ObjAssignable:42,":":43,ThisProperty:44,RETURN:45,HERECOMMENT:46,PARAM_START:47,ParamList:48,PARAM_END:49,FuncGlyph:50,"->":51,"=>":52,OptComma:53,",":54,Param:55,ParamVar:56,"...":57,Array:58,Object:59,Splat:60,SimpleAssignable:61,Accessor:62,Parenthetical:63,Range:64,This:65,".":66,"?.":67,"::":68,Index:69,INDEX_START:70,IndexValue:71,INDEX_END:72,INDEX_SOAK:73,Slice:74,"{":75,AssignList:76,"}":77,CLASS:78,EXTENDS:79,OptFuncExist:80,Arguments:81,SUPER:82,FUNC_EXIST:83,CALL_START:84,CALL_END:85,ArgList:86,THIS:87,"@":88,"[":89,"]":90,RangeDots:91,"..":92,Arg:93,SimpleArgs:94,TRY:95,Catch:96,FINALLY:97,CATCH:98,THROW:99,"(":100,")":101,WhileSource:102,WHILE:103,WHEN:104,UNTIL:105,Loop:106,LOOP:107,ForBody:108,FOR:109,ForStart:110,ForSource:111,ForVariables:112,OWN:113,ForValue:114,FORIN:115,FOROF:116,BY:117,SWITCH:118,Whens:119,ELSE:120,When:121,LEADING_WHEN:122,IfBlock:123,IF:124,POST_IF:125,UNARY:126,"-":127,"+":128,"--":129,"++":130,"?":131,MATH:132,SHIFT:133,COMPARE:134,LOGIC:135,RELATION:136,COMPOUND_ASSIGN:137,$accept:0,$end:1},terminals_:{2:"error",6:"TERMINATOR",12:"STATEMENT",25:"INDENT",26:"OUTDENT",28:"IDENTIFIER",30:"NUMBER",31:"STRING",33:"JS",34:"REGEX",35:"DEBUGGER",36:"UNDEFINED",37:"NULL",38:"BOOL",40:"=",43:":",45:"RETURN",46:"HERECOMMENT",47:"PARAM_START",49:"PARAM_END",51:"->",52:"=>",54:",",57:"...",66:".",67:"?.",68:"::",70:"INDEX_START",72:"INDEX_END",73:"INDEX_SOAK",75:"{",77:"}",78:"CLASS",79:"EXTENDS",82:"SUPER",83:"FUNC_EXIST",84:"CALL_START",85:"CALL_END",87:"THIS",88:"@",89:"[",90:"]",92:"..",95:"TRY",97:"FINALLY",98:"CATCH",99:"THROW",100:"(",101:")",103:"WHILE",104:"WHEN",105:"UNTIL",107:"LOOP",109:"FOR",113:"OWN",115:"FORIN",116:"FOROF",117:"BY",118:"SWITCH",120:"ELSE",122:"LEADING_WHEN",124:"IF",125:"POST_IF",126:"UNARY",127:"-",128:"+",129:"--",130:"++",131:"?",132:"MATH",133:"SHIFT",134:"COMPARE",135:"LOGIC",136:"RELATION",137:"COMPOUND_ASSIGN"},productions_:[0,[3,0],[3,1],[3,2],[4,1],[4,3],[4,2],[7,1],[7,1],[9,1],[9,1],[9,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[5,2],[5,3],[27,1],[29,1],[29,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[17,3],[17,4],[17,5],[41,1],[41,3],[41,5],[41,1],[42,1],[42,1],[42,1],[10,2],[10,1],[11,1],[15,5],[15,2],[50,1],[50,1],[53,0],[53,1],[48,0],[48,1],[48,3],[48,4],[48,6],[55,1],[55,2],[55,3],[56,1],[56,1],[56,1],[56,1],[60,2],[61,1],[61,2],[61,2],[61,1],[39,1],[39,1],[39,1],[13,1],[13,1],[13,1],[13,1],[13,1],[62,2],[62,2],[62,2],[62,1],[62,1],[69,3],[69,2],[71,1],[71,1],[59,4],[76,0],[76,1],[76,3],[76,4],[76,6],[23,1],[23,2],[23,3],[23,4],[23,2],[23,3],[23,4],[23,5],[14,3],[14,3],[14,1],[14,2],[80,0],[80,1],[81,2],[81,4],[65,1],[65,1],[44,2],[58,2],[58,4],[91,1],[91,1],[64,5],[74,3],[74,2],[74,2],[74,1],[86,1],[86,3],[86,4],[86,4],[86,6],[93,1],[93,1],[94,1],[94,3],[19,2],[19,3],[19,4],[19,5],[96,3],[24,2],[63,3],[63,5],[102,2],[102,4],[102,2],[102,4],[20,2],[20,2],[20,2],[20,1],[106,2],[106,2],[21,2],[21,2],[21,2],[108,2],[108,2],[110,2],[110,3],[114,1],[114,1],[114,1],[114,1],[112,1],[112,3],[111,2],[111,2],[111,4],[111,4],[111,4],[111,6],[111,6],[22,5],[22,7],[22,4],[22,6],[119,1],[119,2],[121,3],[121,4],[123,3],[123,5],[18,1],[18,3],[18,3],[18,3],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,5],[16,3]],performAction:function(a,b,c,d,e,f,g){var h=f.length-1;switch(e){case 1:return this.$=new d.Block;case 2:return this.$=f[h];case 3:return this.$=f[h-1];case 4:this.$=d.Block.wrap([f[h]]);break;case 5:this.$=f[h-2].push(f[h]);break;case 6:this.$=f[h-1];break;case 7:this.$=f[h];break;case 8:this.$=f[h];break;case 9:this.$=f[h];break;case 10:this.$=f[h];break;case 11:this.$=new d.Literal(f[h]);break;case 12:this.$=f[h];break;case 13:this.$=f[h];break;case 14:this.$=f[h];break;case 15:this.$=f[h];break;case 16:this.$=f[h];break;case 17:this.$=f[h];break;case 18:this.$=f[h];break;case 19:this.$=f[h];break;case 20:this.$=f[h];break;case 21:this.$=f[h];break;case 22:this.$=f[h];break;case 23:this.$=f[h];break;case 24:this.$=new d.Block;break;case 25:this.$=f[h-1];break;case 26:this.$=new d.Literal(f[h]);break;case 27:this.$=new d.Literal(f[h]);break;case 28:this.$=new d.Literal(f[h]);break;case 29:this.$=f[h];break;case 30:this.$=new d.Literal(f[h]);break;case 31:this.$=new d.Literal(f[h]);break;case 32:this.$=new d.Literal(f[h]);break;case 33:this.$=new d.Undefined;break;case 34:this.$=new d.Null;break;case 35:this.$=new d.Bool(f[h]);break;case 36:this.$=new d.Assign(f[h-2],f[h]);break;case 37:this.$=new d.Assign(f[h-3],f[h]);break;case 38:this.$=new d.Assign(f[h-4],f[h-1]);break;case 39:this.$=new d.Value(f[h]);break;case 40:this.$=new d.Assign(new d.Value(f[h-2]),f[h],"object");break;case 41:this.$=new d.Assign(new d.Value(f[h-4]),f[h-1],"object");break;case 42:this.$=f[h];break;case 43:this.$=f[h];break;case 44:this.$=f[h];break;case 45:this.$=f[h];break;case 46:this.$=new d.Return(f[h]);break;case 47:this.$=new d.Return;break;case 48:this.$=new d.Comment(f[h]);break;case 49:this.$=new d.Code(f[h-3],f[h],f[h-1]);break;case 50:this.$=new d.Code([],f[h],f[h-1]);break;case 51:this.$="func";break;case 52:this.$="boundfunc";break;case 53:this.$=f[h];break;case 54:this.$=f[h];break;case 55:this.$=[];break;case 56:this.$=[f[h]];break;case 57:this.$=f[h-2].concat(f[h]);break;case 58:this.$=f[h-3].concat(f[h]);break;case 59:this.$=f[h-5].concat(f[h-2]);break;case 60:this.$=new d.Param(f[h]);break;case 61:this.$=new d.Param(f[h-1],null,!0);break;case 62:this.$=new d.Param(f[h-2],f[h]);break;case 63:this.$=f[h];break;case 64:this.$=f[h];break;case 65:this.$=f[h];break;case 66:this.$=f[h];break;case 67:this.$=new d.Splat(f[h-1]);break;case 68:this.$=new d.Value(f[h]);break;case 69:this.$=f[h-1].add(f[h]);break;case 70:this.$=new d.Value(f[h-1],[].concat(f[h]));break;case 71:this.$=f[h];break;case 72:this.$=f[h];break;case 73:this.$=new d.Value(f[h]);break;case 74:this.$=new d.Value(f[h]);break;case 75:this.$=f[h];break;case 76:this.$=new d.Value(f[h]);break;case 77:this.$=new d.Value(f[h]);break;case 78:this.$=new d.Value(f[h]);break;case 79:this.$=f[h];break;case 80:this.$=new d.Access(f[h]);break;case 81:this.$=new d.Access(f[h],"soak");break;case 82:this.$=[new d.Access(new d.Literal("prototype")),new d.Access(f[h])];break;case 83:this.$=new d.Access(new d.Literal("prototype"));break;case 84:this.$=f[h];break;case 85:this.$=f[h-1];break;case 86:this.$=d.extend(f[h],{soak:!0});break;case 87:this.$=new d.Index(f[h]);break;case 88:this.$=new d.Slice(f[h]);break;case 89:this.$=new d.Obj(f[h-2],f[h-3].generated);break;case 90:this.$=[];break;case 91:this.$=[f[h]];break;case 92:this.$=f[h-2].concat(f[h]);break;case 93:this.$=f[h-3].concat(f[h]);break;case 94:this.$=f[h-5].concat(f[h-2]);break;case 95:this.$=new d.Class;break;case 96:this.$=new d.Class(null,null,f[h]);break;case 97:this.$=new d.Class(null,f[h]);break;case 98:this.$=new d.Class(null,f[h-1],f[h]);break;case 99:this.$=new d.Class(f[h]);break;case 100:this.$=new d.Class(f[h-1],null,f[h]);break;case 101:this.$=new d.Class(f[h-2],f[h]);break;case 102:this.$=new d.Class(f[h-3],f[h-1],f[h]);break;case 103:this.$=new d.Call(f[h-2],f[h],f[h-1]);break;case 104:this.$=new d.Call(f[h-2],f[h],f[h-1]);break;case 105:this.$=new d.Call("super",[new d.Splat(new d.Literal("arguments"))]);break;case 106:this.$=new d.Call("super",f[h]);break;case 107:this.$=!1;break;case 108:this.$=!0;break;case 109:this.$=[];break;case 110:this.$=f[h-2];break;case 111:this.$=new d.Value(new d.Literal("this"));break;case 112:this.$=new d.Value(new d.Literal("this"));break;case 113:this.$=new d.Value(new d.Literal("this"),[new d.Access(f[h])],"this");break;case 114:this.$=new d.Arr([]);break;case 115:this.$=new d.Arr(f[h-2]);break;case 116:this.$="inclusive";break;case 117:this.$="exclusive";break;case 118:this.$=new d.Range(f[h-3],f[h-1],f[h-2]);break;case 119:this.$=new d.Range(f[h-2],f[h],f[h-1]);break;case 120:this.$=new d.Range(f[h-1],null,f[h]);break;case 121:this.$=new d.Range(null,f[h],f[h-1]);break;case 122:this.$=new d.Range(null,null,f[h]);break;case 123:this.$=[f[h]];break;case 124:this.$=f[h-2].concat(f[h]);break;case 125:this.$=f[h-3].concat(f[h]);break;case 126:this.$=f[h-2];break;case 127:this.$=f[h-5].concat(f[h-2]);break;case 128:this.$=f[h];break;case 129:this.$=f[h];break;case 130:this.$=f[h];break;case 131:this.$=[].concat(f[h-2],f[h]);break;case 132:this.$=new d.Try(f[h]);break;case 133:this.$=new d.Try(f[h-1],f[h][0],f[h][1]);break;case 134:this.$=new d.Try(f[h-2],null,null,f[h]);break;case 135:this.$=new d.Try(f[h-3],f[h-2][0],f[h-2][1],f[h]);break;case 136:this.$=[f[h-1],f[h]];break;case 137:this.$=new d.Throw(f[h]);break;case 138:this.$=new d.Parens(f[h-1]);break;case 139:this.$=new d.Parens(f[h-2]);break;case 140:this.$=new d.While(f[h]);break;case 141:this.$=new d.While(f[h-2],{guard:f[h]});break;case 142:this.$=new d.While(f[h],{invert:!0});break;case 143:this.$=new d.While(f[h-2],{invert:!0,guard:f[h]});break;case 144:this.$=f[h-1].addBody(f[h]);break;case 145:this.$=f[h].addBody(d.Block.wrap([f[h-1]]));break;case 146:this.$=f[h].addBody(d.Block.wrap([f[h-1]]));break;case 147:this.$=f[h];break;case 148:this.$=(new d.While(new d.Literal("true"))).addBody(f[h]);break;case 149:this.$=(new d.While(new d.Literal("true"))).addBody(d.Block.wrap([f[h]]));break;case 150:this.$=new d.For(f[h-1],f[h]);break;case 151:this.$=new d.For(f[h-1],f[h]);break;case 152:this.$=new d.For(f[h],f[h-1]);break;case 153:this.$={source:new d.Value(f[h])};break;case 154:this.$=function(){f[h].own=f[h-1].own,f[h].name=f[h-1][0],f[h].index=f[h-1][1];return f[h]}();break;case 155:this.$=f[h];break;case 156:this.$=function(){f[h].own=!0;return f[h]}();break;case 157:this.$=f[h];break;case 158:this.$=f[h];break;case 159:this.$=new d.Value(f[h]);break;case 160:this.$=new d.Value(f[h]);break;case 161:this.$=[f[h]];break;case 162:this.$=[f[h-2],f[h]];break;case 163:this.$={source:f[h]};break;case 164:this.$={source:f[h],object:!0};break;case 165:this.$={source:f[h-2],guard:f[h]};break;case 166:this.$={source:f[h-2],guard:f[h],object:!0};break;case 167:this.$={source:f[h-2],step:f[h]};break;case 168:this.$={source:f[h-4],guard:f[h-2],step:f[h]};break;case 169:this.$={source:f[h-4],step:f[h-2],guard:f[h]};break;case 170:this.$=new d.Switch(f[h-3],f[h-1]);break;case 171:this.$=new d.Switch(f[h-5],f[h-3],f[h-1]);break;case 172:this.$=new d.Switch(null,f[h-1]);break;case 173:this.$=new d.Switch(null,f[h-3],f[h-1]);break;case 174:this.$=f[h];break;case 175:this.$=f[h-1].concat(f[h]);break;case 176:this.$=[[f[h-1],f[h]]];break;case 177:this.$=[[f[h-2],f[h-1]]];break;case 178:this.$=new d.If(f[h-1],f[h],{type:f[h-2]});break;case 179:this.$=f[h-4].addElse(new d.If(f[h-1],f[h],{type:f[h-2]}));break;case 180:this.$=f[h];break;case 181:this.$=f[h-2].addElse(f[h]);break;case 182:this.$=new d.If(f[h],d.Block.wrap([f[h-2]]),{type:f[h-1],statement:!0});break;case 183:this.$=new d.If(f[h],d.Block.wrap([f[h-2]]),{type:f[h-1],statement:!0});break;case 184:this.$=new d.Op(f[h-1],f[h]);break;case 185:this.$=new d.Op("-",f[h]);break;case 186:this.$=new d.Op("+",f[h]);break;case 187:this.$=new d.Op("--",f[h]);break;case 188:this.$=new d.Op("++",f[h]);break;case 189:this.$=new d.Op("--",f[h-1],null,!0);break;case 190:this.$=new d.Op("++",f[h-1],null,!0);break;case 191:this.$=new d.Existence(f[h-1]);break;case 192:this.$=new d.Op("+",f[h-2],f[h]);break;case 193:this.$=new d.Op("-",f[h-2],f[h]);break;case 194:this.$=new d.Op(f[h-1],f[h-2],f[h]);break;case 195:this.$=new d.Op(f[h-1],f[h-2],f[h]);break;case 196:this.$=new d.Op(f[h-1],f[h-2],f[h]);break;case 197:this.$=new d.Op(f[h-1],f[h-2],f[h]);break;case 198:this.$=function(){return f[h-1].charAt(0)==="!"?(new d.Op(f[h-1].slice(1),f[h-2],f[h])).invert():new d.Op(f[h-1],f[h-2],f[h])}();break;case 199:this.$=new d.Assign(f[h-2],f[h],f[h-1]);break;case 200:this.$=new d.Assign(f[h-4],f[h-1],f[h-3]);break;case 201:this.$=new d.Extends(f[h-2],f[h])}},table:[{1:[2,1],3:1,4:2,5:3,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[3]},{1:[2,2],6:[1,74]},{6:[1,75]},{1:[2,4],6:[2,4],26:[2,4],101:[2,4]},{4:77,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[1,76],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,7],6:[2,7],26:[2,7],101:[2,7],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,8],6:[2,8],26:[2,8],101:[2,8],102:90,103:[1,65],105:[1,66],108:91,109:[1,68],110:69,125:[1,89]},{1:[2,12],6:[2,12],25:[2,12],26:[2,12],49:[2,12],54:[2,12],57:[2,12],62:93,66:[1,95],67:[1,96],68:[1,97],69:98,70:[1,99],72:[2,12],73:[1,100],77:[2,12],80:92,83:[1,94],84:[2,107],85:[2,12],90:[2,12],92:[2,12],101:[2,12],103:[2,12],104:[2,12],105:[2,12],109:[2,12],117:[2,12],125:[2,12],127:[2,12],128:[2,12],131:[2,12],132:[2,12],133:[2,12],134:[2,12],135:[2,12],136:[2,12]},{1:[2,13],6:[2,13],25:[2,13],26:[2,13],49:[2,13],54:[2,13],57:[2,13],62:102,66:[1,95],67:[1,96],68:[1,97],69:98,70:[1,99],72:[2,13],73:[1,100],77:[2,13],80:101,83:[1,94],84:[2,107],85:[2,13],90:[2,13],92:[2,13],101:[2,13],103:[2,13],104:[2,13],105:[2,13],109:[2,13],117:[2,13],125:[2,13],127:[2,13],128:[2,13],131:[2,13],132:[2,13],133:[2,13],134:[2,13],135:[2,13],136:[2,13]},{1:[2,14],6:[2,14],25:[2,14],26:[2,14],49:[2,14],54:[2,14],57:[2,14],72:[2,14],77:[2,14],85:[2,14],90:[2,14],92:[2,14],101:[2,14],103:[2,14],104:[2,14],105:[2,14],109:[2,14],117:[2,14],125:[2,14],127:[2,14],128:[2,14],131:[2,14],132:[2,14],133:[2,14],134:[2,14],135:[2,14],136:[2,14]},{1:[2,15],6:[2,15],25:[2,15],26:[2,15],49:[2,15],54:[2,15],57:[2,15],72:[2,15],77:[2,15],85:[2,15],90:[2,15],92:[2,15],101:[2,15],103:[2,15],104:[2,15],105:[2,15],109:[2,15],117:[2,15],125:[2,15],127:[2,15],128:[2,15],131:[2,15],132:[2,15],133:[2,15],134:[2,15],135:[2,15],136:[2,15]},{1:[2,16],6:[2,16],25:[2,16],26:[2,16],49:[2,16],54:[2,16],57:[2,16],72:[2,16],77:[2,16],85:[2,16],90:[2,16],92:[2,16],101:[2,16],103:[2,16],104:[2,16],105:[2,16],109:[2,16],117:[2,16],125:[2,16],127:[2,16],128:[2,16],131:[2,16],132:[2,16],133:[2,16],134:[2,16],135:[2,16],136:[2,16]},{1:[2,17],6:[2,17],25:[2,17],26:[2,17],49:[2,17],54:[2,17],57:[2,17],72:[2,17],77:[2,17],85:[2,17],90:[2,17],92:[2,17],101:[2,17],103:[2,17],104:[2,17],105:[2,17],109:[2,17],117:[2,17],125:[2,17],127:[2,17],128:[2,17],131:[2,17],132:[2,17],133:[2,17],134:[2,17],135:[2,17],136:[2,17]},{1:[2,18],6:[2,18],25:[2,18],26:[2,18],49:[2,18],54:[2,18],57:[2,18],72:[2,18],77:[2,18],85:[2,18],90:[2,18],92:[2,18],101:[2,18],103:[2,18],104:[2,18],105:[2,18],109:[2,18],117:[2,18],125:[2,18],127:[2,18],128:[2,18],131:[2,18],132:[2,18],133:[2,18],134:[2,18],135:[2,18],136:[2,18]},{1:[2,19],6:[2,19],25:[2,19],26:[2,19],49:[2,19],54:[2,19],57:[2,19],72:[2,19],77:[2,19],85:[2,19],90:[2,19],92:[2,19],101:[2,19],103:[2,19],104:[2,19],105:[2,19],109:[2,19],117:[2,19],125:[2,19],127:[2,19],128:[2,19],131:[2,19],132:[2,19],133:[2,19],134:[2,19],135:[2,19],136:[2,19]},{1:[2,20],6:[2,20],25:[2,20],26:[2,20],49:[2,20],54:[2,20],57:[2,20],72:[2,20],77:[2,20],85:[2,20],90:[2,20],92:[2,20],101:[2,20],103:[2,20],104:[2,20],105:[2,20],109:[2,20],117:[2,20],125:[2,20],127:[2,20],128:[2,20],131:[2,20],132:[2,20],133:[2,20],134:[2,20],135:[2,20],136:[2,20]},{1:[2,21],6:[2,21],25:[2,21],26:[2,21],49:[2,21],54:[2,21],57:[2,21],72:[2,21],77:[2,21],85:[2,21],90:[2,21],92:[2,21],101:[2,21],103:[2,21],104:[2,21],105:[2,21],109:[2,21],117:[2,21],125:[2,21],127:[2,21],128:[2,21],131:[2,21],132:[2,21],133:[2,21],134:[2,21],135:[2,21],136:[2,21]},{1:[2,22],6:[2,22],25:[2,22],26:[2,22],49:[2,22],54:[2,22],57:[2,22],72:[2,22],77:[2,22],85:[2,22],90:[2,22],92:[2,22],101:[2,22],103:[2,22],104:[2,22],105:[2,22],109:[2,22],117:[2,22],125:[2,22],127:[2,22],128:[2,22],131:[2,22],132:[2,22],133:[2,22],134:[2,22],135:[2,22],136:[2,22]},{1:[2,23],6:[2,23],25:[2,23],26:[2,23],49:[2,23],54:[2,23],57:[2,23],72:[2,23],77:[2,23],85:[2,23],90:[2,23],92:[2,23],101:[2,23],103:[2,23],104:[2,23],105:[2,23],109:[2,23],117:[2,23],125:[2,23],127:[2,23],128:[2,23],131:[2,23],132:[2,23],133:[2,23],134:[2,23],135:[2,23],136:[2,23]},{1:[2,9],6:[2,9],26:[2,9],101:[2,9],103:[2,9],105:[2,9],109:[2,9],125:[2,9]},{1:[2,10],6:[2,10],26:[2,10],101:[2,10],103:[2,10],105:[2,10],109:[2,10],125:[2,10]},{1:[2,11],6:[2,11],26:[2,11],101:[2,11],103:[2,11],105:[2,11],109:[2,11],125:[2,11]},{1:[2,75],6:[2,75],25:[2,75],26:[2,75],40:[1,103],49:[2,75],54:[2,75],57:[2,75],66:[2,75],67:[2,75],68:[2,75],70:[2,75],72:[2,75],73:[2,75],77:[2,75],83:[2,75],84:[2,75],85:[2,75],90:[2,75],92:[2,75],101:[2,75],103:[2,75],104:[2,75],105:[2,75],109:[2,75],117:[2,75],125:[2,75],127:[2,75],128:[2,75],131:[2,75],132:[2,75],133:[2,75],134:[2,75],135:[2,75],136:[2,75]},{1:[2,76],6:[2,76],25:[2,76],26:[2,76],49:[2,76],54:[2,76],57:[2,76],66:[2,76],67:[2,76],68:[2,76],70:[2,76],72:[2,76],73:[2,76],77:[2,76],83:[2,76],84:[2,76],85:[2,76],90:[2,76],92:[2,76],101:[2,76],103:[2,76],104:[2,76],105:[2,76],109:[2,76],117:[2,76],125:[2,76],127:[2,76],128:[2,76],131:[2,76],132:[2,76],133:[2,76],134:[2,76],135:[2,76],136:[2,76]},{1:[2,77],6:[2,77],25:[2,77],26:[2,77],49:[2,77],54:[2,77],57:[2,77],66:[2,77],67:[2,77],68:[2,77],70:[2,77],72:[2,77],73:[2,77],77:[2,77],83:[2,77],84:[2,77],85:[2,77],90:[2,77],92:[2,77],101:[2,77],103:[2,77],104:[2,77],105:[2,77],109:[2,77],117:[2,77],125:[2,77],127:[2,77],128:[2,77],131:[2,77],132:[2,77],133:[2,77],134:[2,77],135:[2,77],136:[2,77]},{1:[2,78],6:[2,78],25:[2,78],26:[2,78],49:[2,78],54:[2,78],57:[2,78],66:[2,78],67:[2,78],68:[2,78],70:[2,78],72:[2,78],73:[2,78],77:[2,78],83:[2,78],84:[2,78],85:[2,78],90:[2,78],92:[2,78],101:[2,78],103:[2,78],104:[2,78],105:[2,78],109:[2,78],117:[2,78],125:[2,78],127:[2,78],128:[2,78],131:[2,78],132:[2,78],133:[2,78],134:[2,78],135:[2,78],136:[2,78]},{1:[2,79],6:[2,79],25:[2,79],26:[2,79],49:[2,79],54:[2,79],57:[2,79],66:[2,79],67:[2,79],68:[2,79],70:[2,79],72:[2,79],73:[2,79],77:[2,79],83:[2,79],84:[2,79],85:[2,79],90:[2,79],92:[2,79],101:[2,79],103:[2,79],104:[2,79],105:[2,79],109:[2,79],117:[2,79],125:[2,79],127:[2,79],128:[2,79],131:[2,79],132:[2,79],133:[2,79],134:[2,79],135:[2,79],136:[2,79]},{1:[2,105],6:[2,105],25:[2,105],26:[2,105],49:[2,105],54:[2,105],57:[2,105],66:[2,105],67:[2,105],68:[2,105],70:[2,105],72:[2,105],73:[2,105],77:[2,105],81:104,83:[2,105],84:[1,105],85:[2,105],90:[2,105],92:[2,105],101:[2,105],103:[2,105],104:[2,105],105:[2,105],109:[2,105],117:[2,105],125:[2,105],127:[2,105],128:[2,105],131:[2,105],132:[2,105],133:[2,105],134:[2,105],135:[2,105],136:[2,105]},{6:[2,55],25:[2,55],27:109,28:[1,73],44:110,48:106,49:[2,55],54:[2,55],55:107,56:108,58:111,59:112,75:[1,70],88:[1,113],89:[1,114]},{5:115,25:[1,5]},{8:116,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:118,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:119,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{13:121,14:122,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:123,44:63,58:47,59:48,61:120,63:25,64:26,65:27,75:[1,70],82:[1,28],87:[1,58],88:[1,59],89:[1,57],100:[1,56]},{13:121,14:122,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:123,44:63,58:47,59:48,61:124,63:25,64:26,65:27,75:[1,70],82:[1,28],87:[1,58],88:[1,59],89:[1,57],100:[1,56]},{1:[2,72],6:[2,72],25:[2,72],26:[2,72],40:[2,72],49:[2,72],54:[2,72],57:[2,72],66:[2,72],67:[2,72],68:[2,72],70:[2,72],72:[2,72],73:[2,72],77:[2,72],79:[1,128],83:[2,72],84:[2,72],85:[2,72],90:[2,72],92:[2,72],101:[2,72],103:[2,72],104:[2,72],105:[2,72],109:[2,72],117:[2,72],125:[2,72],127:[2,72],128:[2,72],129:[1,125],130:[1,126],131:[2,72],132:[2,72],133:[2,72],134:[2,72],135:[2,72],136:[2,72],137:[1,127]},{1:[2,180],6:[2,180],25:[2,180],26:[2,180],49:[2,180],54:[2,180],57:[2,180],72:[2,180],77:[2,180],85:[2,180],90:[2,180],92:[2,180],101:[2,180],103:[2,180],104:[2,180],105:[2,180],109:[2,180],117:[2,180],120:[1,129],125:[2,180],127:[2,180],128:[2,180],131:[2,180],132:[2,180],133:[2,180],134:[2,180],135:[2,180],136:[2,180]},{5:130,25:[1,5]},{5:131,25:[1,5]},{1:[2,147],6:[2,147],25:[2,147],26:[2,147],49:[2,147],54:[2,147],57:[2,147],72:[2,147],77:[2,147],85:[2,147],90:[2,147],92:[2,147],101:[2,147],103:[2,147],104:[2,147],105:[2,147],109:[2,147],117:[2,147],125:[2,147],127:[2,147],128:[2,147],131:[2,147],132:[2,147],133:[2,147],134:[2,147],135:[2,147],136:[2,147]},{5:132,25:[1,5]},{8:133,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,134],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,95],5:135,6:[2,95],13:121,14:122,25:[1,5],26:[2,95],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:123,44:63,49:[2,95],54:[2,95],57:[2,95],58:47,59:48,61:137,63:25,64:26,65:27,72:[2,95],75:[1,70],77:[2,95],79:[1,136],82:[1,28],85:[2,95],87:[1,58],88:[1,59],89:[1,57],90:[2,95],92:[2,95],100:[1,56],101:[2,95],103:[2,95],104:[2,95],105:[2,95],109:[2,95],117:[2,95],125:[2,95],127:[2,95],128:[2,95],131:[2,95],132:[2,95],133:[2,95],134:[2,95],135:[2,95],136:[2,95]},{8:138,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,47],6:[2,47],8:139,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,47],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],101:[2,47],102:39,103:[2,47],105:[2,47],106:40,107:[1,67],108:41,109:[2,47],110:69,118:[1,42],123:37,124:[1,64],125:[2,47],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,48],6:[2,48],25:[2,48],26:[2,48],54:[2,48],77:[2,48],101:[2,48],103:[2,48],105:[2,48],109:[2,48],125:[2,48]},{1:[2,73],6:[2,73],25:[2,73],26:[2,73],40:[2,73],49:[2,73],54:[2,73],57:[2,73],66:[2,73],67:[2,73],68:[2,73],70:[2,73],72:[2,73],73:[2,73],77:[2,73],83:[2,73],84:[2,73],85:[2,73],90:[2,73],92:[2,73],101:[2,73],103:[2,73],104:[2,73],105:[2,73],109:[2,73],117:[2,73],125:[2,73],127:[2,73],128:[2,73],131:[2,73],132:[2,73],133:[2,73],134:[2,73],135:[2,73],136:[2,73]},{1:[2,74],6:[2,74],25:[2,74],26:[2,74],40:[2,74],49:[2,74],54:[2,74],57:[2,74],66:[2,74],67:[2,74],68:[2,74],70:[2,74],72:[2,74],73:[2,74],77:[2,74],83:[2,74],84:[2,74],85:[2,74],90:[2,74],92:[2,74],101:[2,74],103:[2,74],104:[2,74],105:[2,74],109:[2,74],117:[2,74],125:[2,74],127:[2,74],128:[2,74],131:[2,74],132:[2,74],133:[2,74],134:[2,74],135:[2,74],136:[2,74]},{1:[2,29],6:[2,29],25:[2,29],26:[2,29],49:[2,29],54:[2,29],57:[2,29],66:[2,29],67:[2,29],68:[2,29],70:[2,29],72:[2,29],73:[2,29],77:[2,29],83:[2,29],84:[2,29],85:[2,29],90:[2,29],92:[2,29],101:[2,29],103:[2,29],104:[2,29],105:[2,29],109:[2,29],117:[2,29],125:[2,29],127:[2,29],128:[2,29],131:[2,29],132:[2,29],133:[2,29],134:[2,29],135:[2,29],136:[2,29]},{1:[2,30],6:[2,30],25:[2,30],26:[2,30],49:[2,30],54:[2,30],57:[2,30],66:[2,30],67:[2,30],68:[2,30],70:[2,30],72:[2,30],73:[2,30],77:[2,30],83:[2,30],84:[2,30],85:[2,30],90:[2,30],92:[2,30],101:[2,30],103:[2,30],104:[2,30],105:[2,30],109:[2,30],117:[2,30],125:[2,30],127:[2,30],128:[2,30],131:[2,30],132:[2,30],133:[2,30],134:[2,30],135:[2,30],136:[2,30]},{1:[2,31],6:[2,31],25:[2,31],26:[2,31],49:[2,31],54:[2,31],57:[2,31],66:[2,31],67:[2,31],68:[2,31],70:[2,31],72:[2,31],73:[2,31],77:[2,31],83:[2,31],84:[2,31],85:[2,31],90:[2,31],92:[2,31],101:[2,31],103:[2,31],104:[2,31],105:[2,31],109:[2,31],117:[2,31],125:[2,31],127:[2,31],128:[2,31],131:[2,31],132:[2,31],133:[2,31],134:[2,31],135:[2,31],136:[2,31]},{1:[2,32],6:[2,32],25:[2,32],26:[2,32],49:[2,32],54:[2,32],57:[2,32],66:[2,32],67:[2,32],68:[2,32],70:[2,32],72:[2,32],73:[2,32],77:[2,32],83:[2,32],84:[2,32],85:[2,32],90:[2,32],92:[2,32],101:[2,32],103:[2,32],104:[2,32],105:[2,32],109:[2,32],117:[2,32],125:[2,32],127:[2,32],128:[2,32],131:[2,32],132:[2,32],133:[2,32],134:[2,32],135:[2,32],136:[2,32]},{1:[2,33],6:[2,33],25:[2,33],26:[2,33],49:[2,33],54:[2,33],57:[2,33],66:[2,33],67:[2,33],68:[2,33],70:[2,33],72:[2,33],73:[2,33],77:[2,33],83:[2,33],84:[2,33],85:[2,33],90:[2,33],92:[2,33],101:[2,33],103:[2,33],104:[2,33],105:[2,33],109:[2,33],117:[2,33],125:[2,33],127:[2,33],128:[2,33],131:[2,33],132:[2,33],133:[2,33],134:[2,33],135:[2,33],136:[2,33]},{1:[2,34],6:[2,34],25:[2,34],26:[2,34],49:[2,34],54:[2,34],57:[2,34],66:[2,34],67:[2,34],68:[2,34],70:[2,34],72:[2,34],73:[2,34],77:[2,34],83:[2,34],84:[2,34],85:[2,34],90:[2,34],92:[2,34],101:[2,34],103:[2,34],104:[2,34],105:[2,34],109:[2,34],117:[2,34],125:[2,34],127:[2,34],128:[2,34],131:[2,34],132:[2,34],133:[2,34],134:[2,34],135:[2,34],136:[2,34]},{1:[2,35],6:[2,35],25:[2,35],26:[2,35],49:[2,35],54:[2,35],57:[2,35],66:[2,35],67:[2,35],68:[2,35],70:[2,35],72:[2,35],73:[2,35],77:[2,35],83:[2,35],84:[2,35],85:[2,35],90:[2,35],92:[2,35],101:[2,35],103:[2,35],104:[2,35],105:[2,35],109:[2,35],117:[2,35],125:[2,35],127:[2,35],128:[2,35],131:[2,35],132:[2,35],133:[2,35],134:[2,35],135:[2,35],136:[2,35]},{4:140,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,141],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:142,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,146],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],86:144,87:[1,58],88:[1,59],89:[1,57],90:[1,143],93:145,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,111],6:[2,111],25:[2,111],26:[2,111],49:[2,111],54:[2,111],57:[2,111],66:[2,111],67:[2,111],68:[2,111],70:[2,111],72:[2,111],73:[2,111],77:[2,111],83:[2,111],84:[2,111],85:[2,111],90:[2,111],92:[2,111],101:[2,111],103:[2,111],104:[2,111],105:[2,111],109:[2,111],117:[2,111],125:[2,111],127:[2,111],128:[2,111],131:[2,111],132:[2,111],133:[2,111],134:[2,111],135:[2,111],136:[2,111]},{1:[2,112],6:[2,112],25:[2,112],26:[2,112],27:148,28:[1,73],49:[2,112],54:[2,112],57:[2,112],66:[2,112],67:[2,112],68:[2,112],70:[2,112],72:[2,112],73:[2,112],77:[2,112],83:[2,112],84:[2,112],85:[2,112],90:[2,112],92:[2,112],101:[2,112],103:[2,112],104:[2,112],105:[2,112],109:[2,112],117:[2,112],125:[2,112],127:[2,112],128:[2,112],131:[2,112],132:[2,112],133:[2,112],134:[2,112],135:[2,112],136:[2,112]},{25:[2,51]},{25:[2,52]},{1:[2,68],6:[2,68],25:[2,68],26:[2,68],40:[2,68],49:[2,68],54:[2,68],57:[2,68],66:[2,68],67:[2,68],68:[2,68],70:[2,68],72:[2,68],73:[2,68],77:[2,68],79:[2,68],83:[2,68],84:[2,68],85:[2,68],90:[2,68],92:[2,68],101:[2,68],103:[2,68],104:[2,68],105:[2,68],109:[2,68],117:[2,68],125:[2,68],127:[2,68],128:[2,68],129:[2,68],130:[2,68],131:[2,68],132:[2,68],133:[2,68],134:[2,68],135:[2,68],136:[2,68],137:[2,68]},{1:[2,71],6:[2,71],25:[2,71],26:[2,71],40:[2,71],49:[2,71],54:[2,71],57:[2,71],66:[2,71],67:[2,71],68:[2,71],70:[2,71],72:[2,71],73:[2,71],77:[2,71],79:[2,71],83:[2,71],84:[2,71],85:[2,71],90:[2,71],92:[2,71],101:[2,71],103:[2,71],104:[2,71],105:[2,71],109:[2,71],117:[2,71],125:[2,71],127:[2,71],128:[2,71],129:[2,71],130:[2,71],131:[2,71],132:[2,71],133:[2,71],134:[2,71],135:[2,71],136:[2,71],137:[2,71]},{8:149,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:150,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:151,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{5:152,8:153,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{27:158,28:[1,73],44:159,58:160,59:161,64:154,75:[1,70],88:[1,113],89:[1,57],112:155,113:[1,156],114:157},{111:162,115:[1,163],116:[1,164]},{6:[2,90],11:168,25:[2,90],27:169,28:[1,73],29:170,30:[1,71],31:[1,72],41:166,42:167,44:171,46:[1,46],54:[2,90],76:165,77:[2,90],88:[1,113]},{1:[2,27],6:[2,27],25:[2,27],26:[2,27],43:[2,27],49:[2,27],54:[2,27],57:[2,27],66:[2,27],67:[2,27],68:[2,27],70:[2,27],72:[2,27],73:[2,27],77:[2,27],83:[2,27],84:[2,27],85:[2,27],90:[2,27],92:[2,27],101:[2,27],103:[2,27],104:[2,27],105:[2,27],109:[2,27],117:[2,27],125:[2,27],127:[2,27],128:[2,27],131:[2,27],132:[2,27],133:[2,27],134:[2,27],135:[2,27],136:[2,27]},{1:[2,28],6:[2,28],25:[2,28],26:[2,28],43:[2,28],49:[2,28],54:[2,28],57:[2,28],66:[2,28],67:[2,28],68:[2,28],70:[2,28],72:[2,28],73:[2,28],77:[2,28],83:[2,28],84:[2,28],85:[2,28],90:[2,28],92:[2,28],101:[2,28],103:[2,28],104:[2,28],105:[2,28],109:[2,28],117:[2,28],125:[2,28],127:[2,28],128:[2,28],131:[2,28],132:[2,28],133:[2,28],134:[2,28],135:[2,28],136:[2,28]},{1:[2,26],6:[2,26],25:[2,26],26:[2,26],40:[2,26],43:[2,26],49:[2,26],54:[2,26],57:[2,26],66:[2,26],67:[2,26],68:[2,26],70:[2,26],72:[2,26],73:[2,26],77:[2,26],79:[2,26],83:[2,26],84:[2,26],85:[2,26],90:[2,26],92:[2,26],101:[2,26],103:[2,26],104:[2,26],105:[2,26],109:[2,26],115:[2,26],116:[2,26],117:[2,26],125:[2,26],127:[2,26],128:[2,26],129:[2,26],130:[2,26],131:[2,26],132:[2,26],133:[2,26],134:[2,26],135:[2,26],136:[2,26],137:[2,26]},{1:[2,6],6:[2,6],7:172,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,6],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],101:[2,6],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,3]},{1:[2,24],6:[2,24],25:[2,24],26:[2,24],49:[2,24],54:[2,24],57:[2,24],72:[2,24],77:[2,24],85:[2,24],90:[2,24],92:[2,24],97:[2,24],98:[2,24],101:[2,24],103:[2,24],104:[2,24],105:[2,24],109:[2,24],117:[2,24],120:[2,24],122:[2,24],125:[2,24],127:[2,24],128:[2,24],131:[2,24],132:[2,24],133:[2,24],134:[2,24],135:[2,24],136:[2,24]},{6:[1,74],26:[1,173]},{1:[2,191],6:[2,191],25:[2,191],26:[2,191],49:[2,191],54:[2,191],57:[2,191],72:[2,191],77:[2,191],85:[2,191],90:[2,191],92:[2,191],101:[2,191],103:[2,191],104:[2,191],105:[2,191],109:[2,191],117:[2,191],125:[2,191],127:[2,191],128:[2,191],131:[2,191],132:[2,191],133:[2,191],134:[2,191],135:[2,191],136:[2,191]},{8:174,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:175,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:176,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:177,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:178,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:179,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:180,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:181,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,146],6:[2,146],25:[2,146],26:[2,146],49:[2,146],54:[2,146],57:[2,146],72:[2,146],77:[2,146],85:[2,146],90:[2,146],92:[2,146],101:[2,146],103:[2,146],104:[2,146],105:[2,146],109:[2,146],117:[2,146],125:[2,146],127:[2,146],128:[2,146],131:[2,146],132:[2,146],133:[2,146],134:[2,146],135:[2,146],136:[2,146]},{1:[2,151],6:[2,151],25:[2,151],26:[2,151],49:[2,151],54:[2,151],57:[2,151],72:[2,151],77:[2,151],85:[2,151],90:[2,151],92:[2,151],101:[2,151],103:[2,151],104:[2,151],105:[2,151],109:[2,151],117:[2,151],125:[2,151],127:[2,151],128:[2,151],131:[2,151],132:[2,151],133:[2,151],134:[2,151],135:[2,151],136:[2,151]},{8:182,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,145],6:[2,145],25:[2,145],26:[2,145],49:[2,145],54:[2,145],57:[2,145],72:[2,145],77:[2,145],85:[2,145],90:[2,145],92:[2,145],101:[2,145],103:[2,145],104:[2,145],105:[2,145],109:[2,145],117:[2,145],125:[2,145],127:[2,145],128:[2,145],131:[2,145],132:[2,145],133:[2,145],134:[2,145],135:[2,145],136:[2,145]},{1:[2,150],6:[2,150],25:[2,150],26:[2,150],49:[2,150],54:[2,150],57:[2,150],72:[2,150],77:[2,150],85:[2,150],90:[2,150],92:[2,150],101:[2,150],103:[2,150],104:[2,150],105:[2,150],109:[2,150],117:[2,150],125:[2,150],127:[2,150],128:[2,150],131:[2,150],132:[2,150],133:[2,150],134:[2,150],135:[2,150],136:[2,150]},{81:183,84:[1,105]},{1:[2,69],6:[2,69],25:[2,69],26:[2,69],40:[2,69],49:[2,69],54:[2,69],57:[2,69],66:[2,69],67:[2,69],68:[2,69],70:[2,69],72:[2,69],73:[2,69],77:[2,69],79:[2,69],83:[2,69],84:[2,69],85:[2,69],90:[2,69],92:[2,69],101:[2,69],103:[2,69],104:[2,69],105:[2,69],109:[2,69],117:[2,69],125:[2,69],127:[2,69],128:[2,69],129:[2,69],130:[2,69],131:[2,69],132:[2,69],133:[2,69],134:[2,69],135:[2,69],136:[2,69],137:[2,69]},{84:[2,108]},{27:184,28:[1,73]},{27:185,28:[1,73]},{1:[2,83],6:[2,83],25:[2,83],26:[2,83],27:186,28:[1,73],40:[2,83],49:[2,83],54:[2,83],57:[2,83],66:[2,83],67:[2,83],68:[2,83],70:[2,83],72:[2,83],73:[2,83],77:[2,83],79:[2,83],83:[2,83],84:[2,83],85:[2,83],90:[2,83],92:[2,83],101:[2,83],103:[2,83],104:[2,83],105:[2,83],109:[2,83],117:[2,83],125:[2,83],127:[2,83],128:[2,83],129:[2,83],130:[2,83],131:[2,83],132:[2,83],133:[2,83],134:[2,83],135:[2,83],136:[2,83],137:[2,83]},{1:[2,84],6:[2,84],25:[2,84],26:[2,84],40:[2,84],49:[2,84],54:[2,84],57:[2,84],66:[2,84],67:[2,84],68:[2,84],70:[2,84],72:[2,84],73:[2,84],77:[2,84],79:[2,84],83:[2,84],84:[2,84],85:[2,84],90:[2,84],92:[2,84],101:[2,84],103:[2,84],104:[2,84],105:[2,84],109:[2,84],117:[2,84],125:[2,84],127:[2,84],128:[2,84],129:[2,84],130:[2,84],131:[2,84],132:[2,84],133:[2,84],134:[2,84],135:[2,84],136:[2,84],137:[2,84]},{8:188,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],57:[1,192],58:47,59:48,61:36,63:25,64:26,65:27,71:187,74:189,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],91:190,92:[1,191],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{69:193,70:[1,99],73:[1,100]},{81:194,84:[1,105]},{1:[2,70],6:[2,70],25:[2,70],26:[2,70],40:[2,70],49:[2,70],54:[2,70],57:[2,70],66:[2,70],67:[2,70],68:[2,70],70:[2,70],72:[2,70],73:[2,70],77:[2,70],79:[2,70],83:[2,70],84:[2,70],85:[2,70],90:[2,70],92:[2,70],101:[2,70],103:[2,70],104:[2,70],105:[2,70],109:[2,70],117:[2,70],125:[2,70],127:[2,70],128:[2,70],129:[2,70],130:[2,70],131:[2,70],132:[2,70],133:[2,70],134:[2,70],135:[2,70],136:[2,70],137:[2,70]},{6:[1,196],8:195,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,197],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,106],6:[2,106],25:[2,106],26:[2,106],49:[2,106],54:[2,106],57:[2,106],66:[2,106],67:[2,106],68:[2,106],70:[2,106],72:[2,106],73:[2,106],77:[2,106],83:[2,106],84:[2,106],85:[2,106],90:[2,106],92:[2,106],101:[2,106],103:[2,106],104:[2,106],105:[2,106],109:[2,106],117:[2,106],125:[2,106],127:[2,106],128:[2,106],131:[2,106],132:[2,106],133:[2,106],134:[2,106],135:[2,106],136:[2,106]},{8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,146],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],85:[1,198],86:199,87:[1,58],88:[1,59],89:[1,57],93:145,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,53],25:[2,53],49:[1,201],53:203,54:[1,202]},{6:[2,56],25:[2,56],26:[2,56],49:[2,56],54:[2,56]},{6:[2,60],25:[2,60],26:[2,60],40:[1,205],49:[2,60],54:[2,60],57:[1,204]},{6:[2,63],25:[2,63],26:[2,63],40:[2,63],49:[2,63],54:[2,63],57:[2,63]},{6:[2,64],25:[2,64],26:[2,64],40:[2,64],49:[2,64],54:[2,64],57:[2,64]},{6:[2,65],25:[2,65],26:[2,65],40:[2,65],49:[2,65],54:[2,65],57:[2,65]},{6:[2,66],25:[2,66],26:[2,66],40:[2,66],49:[2,66],54:[2,66],57:[2,66]},{27:148,28:[1,73]},{8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,146],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],86:144,87:[1,58],88:[1,59],89:[1,57],90:[1,143],93:145,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,50],6:[2,50],25:[2,50],26:[2,50],49:[2,50],54:[2,50],57:[2,50],72:[2,50],77:[2,50],85:[2,50],90:[2,50],92:[2,50],101:[2,50],103:[2,50],104:[2,50],105:[2,50],109:[2,50],117:[2,50],125:[2,50],127:[2,50],128:[2,50],131:[2,50],132:[2,50],133:[2,50],134:[2,50],135:[2,50],136:[2,50]},{1:[2,184],6:[2,184],25:[2,184],26:[2,184],49:[2,184],54:[2,184],57:[2,184],72:[2,184],77:[2,184],85:[2,184],90:[2,184],92:[2,184],101:[2,184],102:87,103:[2,184],104:[2,184],105:[2,184],108:88,109:[2,184],110:69,117:[2,184],125:[2,184],127:[2,184],128:[2,184],131:[1,78],132:[2,184],133:[2,184],134:[2,184],135:[2,184],136:[2,184]},{102:90,103:[1,65],105:[1,66],108:91,109:[1,68],110:69,125:[1,89]},{1:[2,185],6:[2,185],25:[2,185],26:[2,185],49:[2,185],54:[2,185],57:[2,185],72:[2,185],77:[2,185],85:[2,185],90:[2,185],92:[2,185],101:[2,185],102:87,103:[2,185],104:[2,185],105:[2,185],108:88,109:[2,185],110:69,117:[2,185],125:[2,185],127:[2,185],128:[2,185],131:[1,78],132:[2,185],133:[2,185],134:[2,185],135:[2,185],136:[2,185]},{1:[2,186],6:[2,186],25:[2,186],26:[2,186],49:[2,186],54:[2,186],57:[2,186],72:[2,186],77:[2,186],85:[2,186],90:[2,186],92:[2,186],101:[2,186],102:87,103:[2,186],104:[2,186],105:[2,186],108:88,109:[2,186],110:69,117:[2,186],125:[2,186],127:[2,186],128:[2,186],131:[1,78],132:[2,186],133:[2,186],134:[2,186],135:[2,186],136:[2,186]},{1:[2,187],6:[2,187],25:[2,187],26:[2,187],49:[2,187],54:[2,187],57:[2,187],66:[2,72],67:[2,72],68:[2,72],70:[2,72],72:[2,187],73:[2,72],77:[2,187],83:[2,72],84:[2,72],85:[2,187],90:[2,187],92:[2,187],101:[2,187],103:[2,187],104:[2,187],105:[2,187],109:[2,187],117:[2,187],125:[2,187],127:[2,187],128:[2,187],131:[2,187],132:[2,187],133:[2,187],134:[2,187],135:[2,187],136:[2,187]},{62:93,66:[1,95],67:[1,96],68:[1,97],69:98,70:[1,99],73:[1,100],80:92,83:[1,94],84:[2,107]},{62:102,66:[1,95],67:[1,96],68:[1,97],69:98,70:[1,99],73:[1,100],80:101,83:[1,94],84:[2,107]},{66:[2,75],67:[2,75],68:[2,75],70:[2,75],73:[2,75],83:[2,75],84:[2,75]},{1:[2,188],6:[2,188],25:[2,188],26:[2,188],49:[2,188],54:[2,188],57:[2,188],66:[2,72],67:[2,72],68:[2,72],70:[2,72],72:[2,188],73:[2,72],77:[2,188],83:[2,72],84:[2,72],85:[2,188],90:[2,188],92:[2,188],101:[2,188],103:[2,188],104:[2,188],105:[2,188],109:[2,188],117:[2,188],125:[2,188],127:[2,188],128:[2,188],131:[2,188],132:[2,188],133:[2,188],134:[2,188],135:[2,188],136:[2,188]},{1:[2,189],6:[2,189],25:[2,189],26:[2,189],49:[2,189],54:[2,189],57:[2,189],72:[2,189],77:[2,189],85:[2,189],90:[2,189],92:[2,189],101:[2,189],103:[2,189],104:[2,189],105:[2,189],109:[2,189],117:[2,189],125:[2,189],127:[2,189],128:[2,189],131:[2,189],132:[2,189],133:[2,189],134:[2,189],135:[2,189],136:[2,189]},{1:[2,190],6:[2,190],25:[2,190],26:[2,190],49:[2,190],54:[2,190],57:[2,190],72:[2,190],77:[2,190],85:[2,190],90:[2,190],92:[2,190],101:[2,190],103:[2,190],104:[2,190],105:[2,190],109:[2,190],117:[2,190],125:[2,190],127:[2,190],128:[2,190],131:[2,190],132:[2,190],133:[2,190],134:[2,190],135:[2,190],136:[2,190]},{8:206,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,207],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:208,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{5:209,25:[1,5],124:[1,210]},{1:[2,132],6:[2,132],25:[2,132],26:[2,132],49:[2,132],54:[2,132],57:[2,132],72:[2,132],77:[2,132],85:[2,132],90:[2,132],92:[2,132],96:211,97:[1,212],98:[1,213],101:[2,132],103:[2,132],104:[2,132],105:[2,132],109:[2,132],117:[2,132],125:[2,132],127:[2,132],128:[2,132],131:[2,132],132:[2,132],133:[2,132],134:[2,132],135:[2,132],136:[2,132]},{1:[2,144],6:[2,144],25:[2,144],26:[2,144],49:[2,144],54:[2,144],57:[2,144],72:[2,144],77:[2,144],85:[2,144],90:[2,144],92:[2,144],101:[2,144],103:[2,144],104:[2,144],105:[2,144],109:[2,144],117:[2,144],125:[2,144],127:[2,144],128:[2,144],131:[2,144],132:[2,144],133:[2,144],134:[2,144],135:[2,144],136:[2,144]},{1:[2,152],6:[2,152],25:[2,152],26:[2,152],49:[2,152],54:[2,152],57:[2,152],72:[2,152],77:[2,152],85:[2,152],90:[2,152],92:[2,152],101:[2,152],103:[2,152],104:[2,152],105:[2,152],109:[2,152],117:[2,152],125:[2,152],127:[2,152],128:[2,152],131:[2,152],132:[2,152],133:[2,152],134:[2,152],135:[2,152],136:[2,152]},{25:[1,214],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{119:215,121:216,122:[1,217]},{1:[2,96],6:[2,96],25:[2,96],26:[2,96],49:[2,96],54:[2,96],57:[2,96],72:[2,96],77:[2,96],85:[2,96],90:[2,96],92:[2,96],101:[2,96],103:[2,96],104:[2,96],105:[2,96],109:[2,96],117:[2,96],125:[2,96],127:[2,96],128:[2,96],131:[2,96],132:[2,96],133:[2,96],134:[2,96],135:[2,96],136:[2,96]},{8:218,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,99],5:219,6:[2,99],25:[1,5],26:[2,99],49:[2,99],54:[2,99],57:[2,99],66:[2,72],67:[2,72],68:[2,72],70:[2,72],72:[2,99],73:[2,72],77:[2,99],79:[1,220],83:[2,72],84:[2,72],85:[2,99],90:[2,99],92:[2,99],101:[2,99],103:[2,99],104:[2,99],105:[2,99],109:[2,99],117:[2,99],125:[2,99],127:[2,99],128:[2,99],131:[2,99],132:[2,99],133:[2,99],134:[2,99],135:[2,99],136:[2,99]},{1:[2,137],6:[2,137],25:[2,137],26:[2,137],49:[2,137],54:[2,137],57:[2,137],72:[2,137],77:[2,137],85:[2,137],90:[2,137],92:[2,137],101:[2,137],102:87,103:[2,137],104:[2,137],105:[2,137],108:88,109:[2,137],110:69,117:[2,137],125:[2,137],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,46],6:[2,46],26:[2,46],101:[2,46],102:87,103:[2,46],105:[2,46],108:88,109:[2,46],110:69,125:[2,46],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[1,74],101:[1,221]},{4:222,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,128],25:[2,128],54:[2,128],57:[1,224],90:[2,128],91:223,92:[1,191],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,114],6:[2,114],25:[2,114],26:[2,114],40:[2,114],49:[2,114],54:[2,114],57:[2,114],66:[2,114],67:[2,114],68:[2,114],70:[2,114],72:[2,114],73:[2,114],77:[2,114],83:[2,114],84:[2,114],85:[2,114],90:[2,114],92:[2,114],101:[2,114],103:[2,114],104:[2,114],105:[2,114],109:[2,114],115:[2,114],116:[2,114],117:[2,114],125:[2,114],127:[2,114],128:[2,114],131:[2,114],132:[2,114],133:[2,114],134:[2,114],135:[2,114],136:[2,114]},{6:[2,53],25:[2,53],53:225,54:[1,226],90:[2,53]},{6:[2,123],25:[2,123],26:[2,123],54:[2,123],85:[2,123],90:[2,123]},{8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,146],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],86:227,87:[1,58],88:[1,59],89:[1,57],93:145,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,129],25:[2,129],26:[2,129],54:[2,129],85:[2,129],90:[2,129]},{1:[2,113],6:[2,113],25:[2,113],26:[2,113],40:[2,113],43:[2,113],49:[2,113],54:[2,113],57:[2,113],66:[2,113],67:[2,113],68:[2,113],70:[2,113],72:[2,113],73:[2,113],77:[2,113],79:[2,113],83:[2,113],84:[2,113],85:[2,113],90:[2,113],92:[2,113],101:[2,113],103:[2,113],104:[2,113],105:[2,113],109:[2,113],115:[2,113],116:[2,113],117:[2,113],125:[2,113],127:[2,113],128:[2,113],129:[2,113],130:[2,113],131:[2,113],132:[2,113],133:[2,113],134:[2,113],135:[2,113],136:[2,113],137:[2,113]},{5:228,25:[1,5],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,140],6:[2,140],25:[2,140],26:[2,140],49:[2,140],54:[2,140],57:[2,140],72:[2,140],77:[2,140],85:[2,140],90:[2,140],92:[2,140],101:[2,140],102:87,103:[1,65],104:[1,229],105:[1,66],108:88,109:[1,68],110:69,117:[2,140],125:[2,140],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,142],6:[2,142],25:[2,142],26:[2,142],49:[2,142],54:[2,142],57:[2,142],72:[2,142],77:[2,142],85:[2,142],90:[2,142],92:[2,142],101:[2,142],102:87,103:[1,65],104:[1,230],105:[1,66],108:88,109:[1,68],110:69,117:[2,142],125:[2,142],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,148],6:[2,148],25:[2,148],26:[2,148],49:[2,148],54:[2,148],57:[2,148],72:[2,148],77:[2,148],85:[2,148],90:[2,148],92:[2,148],101:[2,148],103:[2,148],104:[2,148],105:[2,148],109:[2,148],117:[2,148],125:[2,148],127:[2,148],128:[2,148],131:[2,148],132:[2,148],133:[2,148],134:[2,148],135:[2,148],136:[2,148]},{1:[2,149],6:[2,149],25:[2,149],26:[2,149],49:[2,149],54:[2,149],57:[2,149],72:[2,149],77:[2,149],85:[2,149],90:[2,149],92:[2,149],101:[2,149],102:87,103:[1,65],104:[2,149],105:[1,66],108:88,109:[1,68],110:69,117:[2,149],125:[2,149],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,153],6:[2,153],25:[2,153],26:[2,153],49:[2,153],54:[2,153],57:[2,153],72:[2,153],77:[2,153],85:[2,153],90:[2,153],92:[2,153],101:[2,153],103:[2,153],104:[2,153],105:[2,153],109:[2,153],117:[2,153],125:[2,153],127:[2,153],128:[2,153],131:[2,153],132:[2,153],133:[2,153],134:[2,153],135:[2,153],136:[2,153]},{115:[2,155],116:[2,155]},{27:158,28:[1,73],44:159,58:160,59:161,75:[1,70],88:[1,113],89:[1,114],112:231,114:157},{54:[1,232],115:[2,161],116:[2,161]},{54:[2,157],115:[2,157],116:[2,157]},{54:[2,158],115:[2,158],116:[2,158]},{54:[2,159],115:[2,159],116:[2,159]},{54:[2,160],115:[2,160],116:[2,160]},{1:[2,154],6:[2,154],25:[2,154],26:[2,154],49:[2,154],54:[2,154],57:[2,154],72:[2,154],77:[2,154],85:[2,154],90:[2,154],92:[2,154],101:[2,154],103:[2,154],104:[2,154],105:[2,154],109:[2,154],117:[2,154],125:[2,154],127:[2,154],128:[2,154],131:[2,154],132:[2,154],133:[2,154],134:[2,154],135:[2,154],136:[2,154]},{8:233,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:234,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,53],25:[2,53],53:235,54:[1,236],77:[2,53]},{6:[2,91],25:[2,91],26:[2,91],54:[2,91],77:[2,91]},{6:[2,39],25:[2,39],26:[2,39],43:[1,237],54:[2,39],77:[2,39]},{6:[2,42],25:[2,42],26:[2,42],54:[2,42],77:[2,42]},{6:[2,43],25:[2,43],26:[2,43],43:[2,43],54:[2,43],77:[2,43]},{6:[2,44],25:[2,44],26:[2,44],43:[2,44],54:[2,44],77:[2,44]},{6:[2,45],25:[2,45],26:[2,45],43:[2,45],54:[2,45],77:[2,45]},{1:[2,5],6:[2,5],26:[2,5],101:[2,5]},{1:[2,25],6:[2,25],25:[2,25],26:[2,25],49:[2,25],54:[2,25],57:[2,25],72:[2,25],77:[2,25],85:[2,25],90:[2,25],92:[2,25],97:[2,25],98:[2,25],101:[2,25],103:[2,25],104:[2,25],105:[2,25],109:[2,25],117:[2,25],120:[2,25],122:[2,25],125:[2,25],127:[2,25],128:[2,25],131:[2,25],132:[2,25],133:[2,25],134:[2,25],135:[2,25],136:[2,25]},{1:[2,192],6:[2,192],25:[2,192],26:[2,192],49:[2,192],54:[2,192],57:[2,192],72:[2,192],77:[2,192],85:[2,192],90:[2,192],92:[2,192],101:[2,192],102:87,103:[2,192],104:[2,192],105:[2,192],108:88,109:[2,192],110:69,117:[2,192],125:[2,192],127:[2,192],128:[2,192],131:[1,78],132:[1,81],133:[2,192],134:[2,192],135:[2,192],136:[2,192]},{1:[2,193],6:[2,193],25:[2,193],26:[2,193],49:[2,193],54:[2,193],57:[2,193],72:[2,193],77:[2,193],85:[2,193],90:[2,193],92:[2,193],101:[2,193],102:87,103:[2,193],104:[2,193],105:[2,193],108:88,109:[2,193],110:69,117:[2,193],125:[2,193],127:[2,193],128:[2,193],131:[1,78],132:[1,81],133:[2,193],134:[2,193],135:[2,193],136:[2,193]},{1:[2,194],6:[2,194],25:[2,194],26:[2,194],49:[2,194],54:[2,194],57:[2,194],72:[2,194],77:[2,194],85:[2,194],90:[2,194],92:[2,194],101:[2,194],102:87,103:[2,194],104:[2,194],105:[2,194],108:88,109:[2,194],110:69,117:[2,194],125:[2,194],127:[2,194],128:[2,194],131:[1,78],132:[2,194],133:[2,194],134:[2,194],135:[2,194],136:[2,194]},{1:[2,195],6:[2,195],25:[2,195],26:[2,195],49:[2,195],54:[2,195],57:[2,195],72:[2,195],77:[2,195],85:[2,195],90:[2,195],92:[2,195],101:[2,195],102:87,103:[2,195],104:[2,195],105:[2,195],108:88,109:[2,195],110:69,117:[2,195],125:[2,195],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[2,195],134:[2,195],135:[2,195],136:[2,195]},{1:[2,196],6:[2,196],25:[2,196],26:[2,196],49:[2,196],54:[2,196],57:[2,196],72:[2,196],77:[2,196],85:[2,196],90:[2,196],92:[2,196],101:[2,196],102:87,103:[2,196],104:[2,196],105:[2,196],108:88,109:[2,196],110:69,117:[2,196],125:[2,196],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[2,196],135:[2,196],136:[1,85]},{1:[2,197],6:[2,197],25:[2,197],26:[2,197],49:[2,197],54:[2,197],57:[2,197],72:[2,197],77:[2,197],85:[2,197],90:[2,197],92:[2,197],101:[2,197],102:87,103:[2,197],104:[2,197],105:[2,197],108:88,109:[2,197],110:69,117:[2,197],125:[2,197],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[2,197],136:[1,85]},{1:[2,198],6:[2,198],25:[2,198],26:[2,198],49:[2,198],54:[2,198],57:[2,198],72:[2,198],77:[2,198],85:[2,198],90:[2,198],92:[2,198],101:[2,198],102:87,103:[2,198],104:[2,198],105:[2,198],108:88,109:[2,198],110:69,117:[2,198],125:[2,198],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[2,198],135:[2,198],136:[2,198]},{1:[2,183],6:[2,183],25:[2,183],26:[2,183],49:[2,183],54:[2,183],57:[2,183],72:[2,183],77:[2,183],85:[2,183],90:[2,183],92:[2,183],101:[2,183],102:87,103:[1,65],104:[2,183],105:[1,66],108:88,109:[1,68],110:69,117:[2,183],125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,182],6:[2,182],25:[2,182],26:[2,182],49:[2,182],54:[2,182],57:[2,182],72:[2,182],77:[2,182],85:[2,182],90:[2,182],92:[2,182],101:[2,182],102:87,103:[1,65],104:[2,182],105:[1,66],108:88,109:[1,68],110:69,117:[2,182],125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,103],6:[2,103],25:[2,103],26:[2,103],49:[2,103],54:[2,103],57:[2,103],66:[2,103],67:[2,103],68:[2,103],70:[2,103],72:[2,103],73:[2,103],77:[2,103],83:[2,103],84:[2,103],85:[2,103],90:[2,103],92:[2,103],101:[2,103],103:[2,103],104:[2,103],105:[2,103],109:[2,103],117:[2,103],125:[2,103],127:[2,103],128:[2,103],131:[2,103],132:[2,103],133:[2,103],134:[2,103],135:[2,103],136:[2,103]},{1:[2,80],6:[2,80],25:[2,80],26:[2,80],40:[2,80],49:[2,80],54:[2,80],57:[2,80],66:[2,80],67:[2,80],68:[2,80],70:[2,80],72:[2,80],73:[2,80],77:[2,80],79:[2,80],83:[2,80],84:[2,80],85:[2,80],90:[2,80],92:[2,80],101:[2,80],103:[2,80],104:[2,80],105:[2,80],109:[2,80],117:[2,80],125:[2,80],127:[2,80],128:[2,80],129:[2,80],130:[2,80],131:[2,80],132:[2,80],133:[2,80],134:[2,80],135:[2,80],136:[2,80],137:[2,80]},{1:[2,81],6:[2,81],25:[2,81],26:[2,81],40:[2,81],49:[2,81],54:[2,81],57:[2,81],66:[2,81],67:[2,81],68:[2,81],70:[2,81],72:[2,81],73:[2,81],77:[2,81],79:[2,81],83:[2,81],84:[2,81],85:[2,81],90:[2,81],92:[2,81],101:[2,81],103:[2,81],104:[2,81],105:[2,81],109:[2,81],117:[2,81],125:[2,81],127:[2,81],128:[2,81],129:[2,81],130:[2,81],131:[2,81],132:[2,81],133:[2,81],134:[2,81],135:[2,81],136:[2,81],137:[2,81]},{1:[2,82],6:[2,82],25:[2,82],26:[2,82],40:[2,82],49:[2,82],54:[2,82],57:[2,82],66:[2,82],67:[2,82],68:[2,82],70:[2,82],72:[2,82],73:[2,82],77:[2,82],79:[2,82],83:[2,82],84:[2,82],85:[2,82],90:[2,82],92:[2,82],101:[2,82],103:[2,82],104:[2,82],105:[2,82],109:[2,82],117:[2,82],125:[2,82],127:[2,82],128:[2,82],129:[2,82],130:[2,82],131:[2,82],132:[2,82],133:[2,82],134:[2,82],135:[2,82],136:[2,82],137:[2,82]},{72:[1,238]},{57:[1,192],72:[2,87],91:239,92:[1,191],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{72:[2,88]},{8:240,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,72:[2,122],75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{12:[2,116],28:[2,116],30:[2,116],31:[2,116],33:[2,116],34:[2,116],35:[2,116],36:[2,116],37:[2,116],38:[2,116],45:[2,116],46:[2,116],47:[2,116],51:[2,116],52:[2,116],72:[2,116],75:[2,116],78:[2,116],82:[2,116],87:[2,116],88:[2,116],89:[2,116],95:[2,116],99:[2,116],100:[2,116],103:[2,116],105:[2,116],107:[2,116],109:[2,116],118:[2,116],124:[2,116],126:[2,116],127:[2,116],128:[2,116],129:[2,116],130:[2,116]},{12:[2,117],28:[2,117],30:[2,117],31:[2,117],33:[2,117],34:[2,117],35:[2,117],36:[2,117],37:[2,117],38:[2,117],45:[2,117],46:[2,117],47:[2,117],51:[2,117],52:[2,117],72:[2,117],75:[2,117],78:[2,117],82:[2,117],87:[2,117],88:[2,117],89:[2,117],95:[2,117],99:[2,117],100:[2,117],103:[2,117],105:[2,117],107:[2,117],109:[2,117],118:[2,117],124:[2,117],126:[2,117],127:[2,117],128:[2,117],129:[2,117],130:[2,117]},{1:[2,86],6:[2,86],25:[2,86],26:[2,86],40:[2,86],49:[2,86],54:[2,86],57:[2,86],66:[2,86],67:[2,86],68:[2,86],70:[2,86],72:[2,86],73:[2,86],77:[2,86],79:[2,86],83:[2,86],84:[2,86],85:[2,86],90:[2,86],92:[2,86],101:[2,86],103:[2,86],104:[2,86],105:[2,86],109:[2,86],117:[2,86],125:[2,86],127:[2,86],128:[2,86],129:[2,86],130:[2,86],131:[2,86],132:[2,86],133:[2,86],134:[2,86],135:[2,86],136:[2,86],137:[2,86]},{1:[2,104],6:[2,104],25:[2,104],26:[2,104],49:[2,104],54:[2,104],57:[2,104],66:[2,104],67:[2,104],68:[2,104],70:[2,104],72:[2,104],73:[2,104],77:[2,104],83:[2,104],84:[2,104],85:[2,104],90:[2,104],92:[2,104],101:[2,104],103:[2,104],104:[2,104],105:[2,104],109:[2,104],117:[2,104],125:[2,104],127:[2,104],128:[2,104],131:[2,104],132:[2,104],133:[2,104],134:[2,104],135:[2,104],136:[2,104]},{1:[2,36],6:[2,36],25:[2,36],26:[2,36],49:[2,36],54:[2,36],57:[2,36],72:[2,36],77:[2,36],85:[2,36],90:[2,36],92:[2,36],101:[2,36],102:87,103:[2,36],104:[2,36],105:[2,36],108:88,109:[2,36],110:69,117:[2,36],125:[2,36],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{8:241,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:242,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,109],6:[2,109],25:[2,109],26:[2,109],49:[2,109],54:[2,109],57:[2,109],66:[2,109],67:[2,109],68:[2,109],70:[2,109],72:[2,109],73:[2,109],77:[2,109],83:[2,109],84:[2,109],85:[2,109],90:[2,109],92:[2,109],101:[2,109],103:[2,109],104:[2,109],105:[2,109],109:[2,109],117:[2,109],125:[2,109],127:[2,109],128:[2,109],131:[2,109],132:[2,109],133:[2,109],134:[2,109],135:[2,109],136:[2,109]},{6:[2,53],25:[2,53],53:243,54:[1,226],85:[2,53]},{6:[2,128],25:[2,128],26:[2,128],54:[2,128],57:[1,244],85:[2,128],90:[2,128],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{50:245,51:[1,60],52:[1,61]},{6:[2,54],25:[2,54],26:[2,54],27:109,28:[1,73],44:110,55:246,56:108,58:111,59:112,75:[1,70],88:[1,113],89:[1,114]},{6:[1,247],25:[1,248]},{6:[2,61],25:[2,61],26:[2,61],49:[2,61],54:[2,61]},{8:249,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,199],6:[2,199],25:[2,199],26:[2,199],49:[2,199],54:[2,199],57:[2,199],72:[2,199],77:[2,199],85:[2,199],90:[2,199],92:[2,199],101:[2,199],102:87,103:[2,199],104:[2,199],105:[2,199],108:88,109:[2,199],110:69,117:[2,199],125:[2,199],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{8:250,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,201],6:[2,201],25:[2,201],26:[2,201],49:[2,201],54:[2,201],57:[2,201],72:[2,201],77:[2,201],85:[2,201],90:[2,201],92:[2,201],101:[2,201],102:87,103:[2,201],104:[2,201],105:[2,201],108:88,109:[2,201],110:69,117:[2,201],125:[2,201],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,181],6:[2,181],25:[2,181],26:[2,181],49:[2,181],54:[2,181],57:[2,181],72:[2,181],77:[2,181],85:[2,181],90:[2,181],92:[2,181],101:[2,181],103:[2,181],104:[2,181],105:[2,181],109:[2,181],117:[2,181],125:[2,181],127:[2,181],128:[2,181],131:[2,181],132:[2,181],133:[2,181],134:[2,181],135:[2,181],136:[2,181]},{8:251,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,133],6:[2,133],25:[2,133],26:[2,133],49:[2,133],54:[2,133],57:[2,133],72:[2,133],77:[2,133],85:[2,133],90:[2,133],92:[2,133],97:[1,252],101:[2,133],103:[2,133],104:[2,133],105:[2,133],109:[2,133],117:[2,133],125:[2,133],127:[2,133],128:[2,133],131:[2,133],132:[2,133],133:[2,133],134:[2,133],135:[2,133],136:[2,133]},{5:253,25:[1,5]},{27:254,28:[1,73]},{119:255,121:216,122:[1,217]},{26:[1,256],120:[1,257],121:258,122:[1,217]},{26:[2,174],120:[2,174],122:[2,174]},{8:260,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],94:259,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,97],5:261,6:[2,97],25:[1,5],26:[2,97],49:[2,97],54:[2,97],57:[2,97],72:[2,97],77:[2,97],85:[2,97],90:[2,97],92:[2,97],101:[2,97],102:87,103:[1,65],104:[2,97],105:[1,66],108:88,109:[1,68],110:69,117:[2,97],125:[2,97],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,100],6:[2,100],25:[2,100],26:[2,100],49:[2,100],54:[2,100],57:[2,100],72:[2,100],77:[2,100],85:[2,100],90:[2,100],92:[2,100],101:[2,100],103:[2,100],104:[2,100],105:[2,100],109:[2,100],117:[2,100],125:[2,100],127:[2,100],128:[2,100],131:[2,100],132:[2,100],133:[2,100],134:[2,100],135:[2,100],136:[2,100]},{8:262,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,138],6:[2,138],25:[2,138],26:[2,138],49:[2,138],54:[2,138],57:[2,138],66:[2,138],67:[2,138],68:[2,138],70:[2,138],72:[2,138],73:[2,138],77:[2,138],83:[2,138],84:[2,138],85:[2,138],90:[2,138],92:[2,138],101:[2,138],103:[2,138],104:[2,138],105:[2,138],109:[2,138],117:[2,138],125:[2,138],127:[2,138],128:[2,138],131:[2,138],132:[2,138],133:[2,138],134:[2,138],135:[2,138],136:[2,138]},{6:[1,74],26:[1,263]},{8:264,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,67],12:[2,117],25:[2,67],28:[2,117],30:[2,117],31:[2,117],33:[2,117],34:[2,117],35:[2,117],36:[2,117],37:[2,117],38:[2,117],45:[2,117],46:[2,117],47:[2,117],51:[2,117],52:[2,117],54:[2,67],75:[2,117],78:[2,117],82:[2,117],87:[2,117],88:[2,117],89:[2,117],90:[2,67],95:[2,117],99:[2,117],100:[2,117],103:[2,117],105:[2,117],107:[2,117],109:[2,117],118:[2,117],124:[2,117],126:[2,117],127:[2,117],128:[2,117],129:[2,117],130:[2,117]},{6:[1,266],25:[1,267],90:[1,265]},{6:[2,54],8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[2,54],26:[2,54],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],85:[2,54],87:[1,58],88:[1,59],89:[1,57],90:[2,54],93:268,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,53],25:[2,53],26:[2,53],53:269,54:[1,226]},{1:[2,178],6:[2,178],25:[2,178],26:[2,178],49:[2,178],54:[2,178],57:[2,178],72:[2,178],77:[2,178],85:[2,178],90:[2,178],92:[2,178],101:[2,178],103:[2,178],104:[2,178],105:[2,178],109:[2,178],117:[2,178],120:[2,178],125:[2,178],127:[2,178],128:[2,178],131:[2,178],132:[2,178],133:[2,178],134:[2,178],135:[2,178],136:[2,178]},{8:270,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:271,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{115:[2,156],116:[2,156]},{27:158,28:[1,73],44:159,58:160,59:161,75:[1,70],88:[1,113],89:[1,114],114:272},{1:[2,163],6:[2,163],25:[2,163],26:[2,163],49:[2,163],54:[2,163],57:[2,163],72:[2,163],77:[2,163],85:[2,163],90:[2,163],92:[2,163],101:[2,163],102:87,103:[2,163],104:[1,273],105:[2,163],108:88,109:[2,163],110:69,117:[1,274],125:[2,163],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,164],6:[2,164],25:[2,164],26:[2,164],49:[2,164],54:[2,164],57:[2,164],72:[2,164],77:[2,164],85:[2,164],90:[2,164],92:[2,164],101:[2,164],102:87,103:[2,164],104:[1,275],105:[2,164],108:88,109:[2,164],110:69,117:[2,164],125:[2,164],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[1,277],25:[1,278],77:[1,276]},{6:[2,54],11:168,25:[2,54],26:[2,54],27:169,28:[1,73],29:170,30:[1,71],31:[1,72],41:279,42:167,44:171,46:[1,46],77:[2,54],88:[1,113]},{8:280,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,281],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,85],6:[2,85],25:[2,85],26:[2,85],40:[2,85],49:[2,85],54:[2,85],57:[2,85],66:[2,85],67:[2,85],68:[2,85],70:[2,85],72:[2,85],73:[2,85],77:[2,85],79:[2,85],83:[2,85],84:[2,85],85:[2,85],90:[2,85],92:[2,85],101:[2,85],103:[2,85],104:[2,85],105:[2,85],109:[2,85],117:[2,85],125:[2,85],127:[2,85],128:[2,85],129:[2,85],130:[2,85],131:[2,85],132:[2,85],133:[2,85],134:[2,85],135:[2,85],136:[2,85],137:[2,85]},{8:282,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,72:[2,120],75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{72:[2,121],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,37],6:[2,37],25:[2,37],26:[2,37],49:[2,37],54:[2,37],57:[2,37],72:[2,37],77:[2,37],85:[2,37],90:[2,37],92:[2,37],101:[2,37],102:87,103:[2,37],104:[2,37],105:[2,37],108:88,109:[2,37],110:69,117:[2,37],125:[2,37],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{26:[1,283],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[1,266],25:[1,267],85:[1,284]},{6:[2,67],25:[2,67],26:[2,67],54:[2,67],85:[2,67],90:[2,67]},{5:285,25:[1,5]},{6:[2,57],25:[2,57],26:[2,57],49:[2,57],54:[2,57]},{27:109,28:[1,73],44:110,55:286,56:108,58:111,59:112,75:[1,70],88:[1,113],89:[1,114]},{6:[2,55],25:[2,55],26:[2,55],27:109,28:[1,73],44:110,48:287,54:[2,55],55:107,56:108,58:111,59:112,75:[1,70],88:[1,113],89:[1,114]},{6:[2,62],25:[2,62],26:[2,62],49:[2,62],54:[2,62],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{26:[1,288],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{5:289,25:[1,5],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{5:290,25:[1,5]},{1:[2,134],6:[2,134],25:[2,134],26:[2,134],49:[2,134],54:[2,134],57:[2,134],72:[2,134],77:[2,134],85:[2,134],90:[2,134],92:[2,134],101:[2,134],103:[2,134],104:[2,134],105:[2,134],109:[2,134],117:[2,134],125:[2,134],127:[2,134],128:[2,134],131:[2,134],132:[2,134],133:[2,134],134:[2,134],135:[2,134],136:[2,134]},{5:291,25:[1,5]},{26:[1,292],120:[1,293],121:258,122:[1,217]},{1:[2,172],6:[2,172],25:[2,172],26:[2,172],49:[2,172],54:[2,172],57:[2,172],72:[2,172],77:[2,172],85:[2,172],90:[2,172],92:[2,172],101:[2,172],103:[2,172],104:[2,172],105:[2,172],109:[2,172],117:[2,172],125:[2,172],127:[2,172],128:[2,172],131:[2,172],132:[2,172],133:[2,172],134:[2,172],135:[2,172],136:[2,172]},{5:294,25:[1,5]},{26:[2,175],120:[2,175],122:[2,175]},{5:295,25:[1,5],54:[1,296]},{25:[2,130],54:[2,130],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,98],6:[2,98],25:[2,98],26:[2,98],49:[2,98],54:[2,98],57:[2,98],72:[2,98],77:[2,98],85:[2,98],90:[2,98],92:[2,98],101:[2,98],103:[2,98],104:[2,98],105:[2,98],109:[2,98],117:[2,98],125:[2,98],127:[2,98],128:[2,98],131:[2,98],132:[2,98],133:[2,98],134:[2,98],135:[2,98],136:[2,98]},{1:[2,101],5:297,6:[2,101],25:[1,5],26:[2,101],49:[2,101],54:[2,101],57:[2,101],72:[2,101],77:[2,101],85:[2,101],90:[2,101],92:[2,101],101:[2,101],102:87,103:[1,65],104:[2,101],105:[1,66],108:88,109:[1,68],110:69,117:[2,101],125:[2,101],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{101:[1,298]},{90:[1,299],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,115],6:[2,115],25:[2,115],26:[2,115],40:[2,115],49:[2,115],54:[2,115],57:[2,115],66:[2,115],67:[2,115],68:[2,115],70:[2,115],72:[2,115],73:[2,115],77:[2,115],83:[2,115],84:[2,115],85:[2,115],90:[2,115],92:[2,115],101:[2,115],103:[2,115],104:[2,115],105:[2,115],109:[2,115],115:[2,115],116:[2,115],117:[2,115],125:[2,115],127:[2,115],128:[2,115],131:[2,115],132:[2,115],133:[2,115],134:[2,115],135:[2,115],136:[2,115]},{8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],93:300,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:200,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,146],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:147,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],86:301,87:[1,58],88:[1,59],89:[1,57],93:145,95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[2,124],25:[2,124],26:[2,124],54:[2,124],85:[2,124],90:[2,124]},{6:[1,266],25:[1,267],26:[1,302]},{1:[2,141],6:[2,141],25:[2,141],26:[2,141],49:[2,141],54:[2,141],57:[2,141],72:[2,141],77:[2,141],85:[2,141],90:[2,141],92:[2,141],101:[2,141],102:87,103:[1,65],104:[2,141],105:[1,66],108:88,109:[1,68],110:69,117:[2,141],125:[2,141],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,143],6:[2,143],25:[2,143],26:[2,143],49:[2,143],54:[2,143],57:[2,143],72:[2,143],77:[2,143],85:[2,143],90:[2,143],92:[2,143],101:[2,143],102:87,103:[1,65],104:[2,143],105:[1,66],108:88,109:[1,68],110:69,117:[2,143],125:[2,143],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{115:[2,162],116:[2,162]},{8:303,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:304,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:305,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,89],6:[2,89],25:[2,89],26:[2,89],40:[2,89],49:[2,89],54:[2,89],57:[2,89],66:[2,89],67:[2,89],68:[2,89],70:[2,89],72:[2,89],73:[2,89],77:[2,89],83:[2,89],84:[2,89],85:[2,89],90:[2,89],92:[2,89],101:[2,89],103:[2,89],104:[2,89],105:[2,89],109:[2,89],115:[2,89],116:[2,89],117:[2,89],125:[2,89],127:[2,89],128:[2,89],131:[2,89],132:[2,89],133:[2,89],134:[2,89],135:[2,89],136:[2,89]},{11:168,27:169,28:[1,73],29:170,30:[1,71],31:[1,72],41:306,42:167,44:171,46:[1,46],88:[1,113]},{6:[2,90],11:168,25:[2,90],26:[2,90],27:169,28:[1,73],29:170,30:[1,71],31:[1,72],41:166,42:167,44:171,46:[1,46],54:[2,90],76:307,88:[1,113]},{6:[2,92],25:[2,92],26:[2,92],54:[2,92],77:[2,92]},{6:[2,40],25:[2,40],26:[2,40],54:[2,40],77:[2,40],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{8:308,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{72:[2,119],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,38],6:[2,38],25:[2,38],26:[2,38],49:[2,38],54:[2,38],57:[2,38],72:[2,38],77:[2,38],85:[2,38],90:[2,38],92:[2,38],101:[2,38],103:[2,38],104:[2,38],105:[2,38],109:[2,38],117:[2,38],125:[2,38],127:[2,38],128:[2,38],131:[2,38],132:[2,38],133:[2,38],134:[2,38],135:[2,38],136:[2,38]},{1:[2,110],6:[2,110],25:[2,110],26:[2,110],49:[2,110],54:[2,110],57:[2,110],66:[2,110],67:[2,110],68:[2,110],70:[2,110],72:[2,110],73:[2,110],77:[2,110],83:[2,110],84:[2,110],85:[2,110],90:[2,110],92:[2,110],101:[2,110],103:[2,110],104:[2,110],105:[2,110],109:[2,110],117:[2,110],125:[2,110],127:[2,110],128:[2,110],131:[2,110],132:[2,110],133:[2,110],134:[2,110],135:[2,110],136:[2,110]},{1:[2,49],6:[2,49],25:[2,49],26:[2,49],49:[2,49],54:[2,49],57:[2,49],72:[2,49],77:[2,49],85:[2,49],90:[2,49],92:[2,49],101:[2,49],103:[2,49],104:[2,49],105:[2,49],109:[2,49],117:[2,49],125:[2,49],127:[2,49],128:[2,49],131:[2,49],132:[2,49],133:[2,49],134:[2,49],135:[2,49],136:[2,49]},{6:[2,58],25:[2,58],26:[2,58],49:[2,58],54:[2,58]},{6:[2,53],25:[2,53],26:[2,53],53:309,54:[1,202]},{1:[2,200],6:[2,200],25:[2,200],26:[2,200],49:[2,200],54:[2,200],57:[2,200],72:[2,200],77:[2,200],85:[2,200],90:[2,200],92:[2,200],101:[2,200],103:[2,200],104:[2,200],105:[2,200],109:[2,200],117:[2,200],125:[2,200],127:[2,200],128:[2,200],131:[2,200],132:[2,200],133:[2,200],134:[2,200],135:[2,200],136:[2,200]},{1:[2,179],6:[2,179],25:[2,179],26:[2,179],49:[2,179],54:[2,179],57:[2,179],72:[2,179],77:[2,179],85:[2,179],90:[2,179],92:[2,179],101:[2,179],103:[2,179],104:[2,179],105:[2,179],109:[2,179],117:[2,179],120:[2,179],125:[2,179],127:[2,179],128:[2,179],131:[2,179],132:[2,179],133:[2,179],134:[2,179],135:[2,179],136:[2,179]},{1:[2,135],6:[2,135],25:[2,135],26:[2,135],49:[2,135],54:[2,135],57:[2,135],72:[2,135],77:[2,135],85:[2,135],90:[2,135],92:[2,135],101:[2,135],103:[2,135],104:[2,135],105:[2,135],109:[2,135],117:[2,135],125:[2,135],127:[2,135],128:[2,135],131:[2,135],132:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135]},{1:[2,136],6:[2,136],25:[2,136],26:[2,136],49:[2,136],54:[2,136],57:[2,136],72:[2,136],77:[2,136],85:[2,136],90:[2,136],92:[2,136],97:[2,136],101:[2,136],103:[2,136],104:[2,136],105:[2,136],109:[2,136],117:[2,136],125:[2,136],127:[2,136],128:[2,136],131:[2,136],132:[2,136],133:[2,136],134:[2,136],135:[2,136],136:[2,136]},{1:[2,170],6:[2,170],25:[2,170],26:[2,170],49:[2,170],54:[2,170],57:[2,170],72:[2,170],77:[2,170],85:[2,170],90:[2,170],92:[2,170],101:[2,170],103:[2,170],104:[2,170],105:[2,170],109:[2,170],117:[2,170],125:[2,170],127:[2,170],128:[2,170],131:[2,170],132:[2,170],133:[2,170],134:[2,170],135:[2,170],136:[2,170]},{5:310,25:[1,5]},{26:[1,311]},{6:[1,312],26:[2,176],120:[2,176],122:[2,176]},{8:313,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{1:[2,102],6:[2,102],25:[2,102],26:[2,102],49:[2,102],54:[2,102],57:[2,102],72:[2,102],77:[2,102],85:[2,102],90:[2,102],92:[2,102],101:[2,102],103:[2,102],104:[2,102],105:[2,102],109:[2,102],117:[2,102],125:[2,102],127:[2,102],128:[2,102],131:[2,102],132:[2,102],133:[2,102],134:[2,102],135:[2,102],136:[2,102]},{1:[2,139],6:[2,139],25:[2,139],26:[2,139],49:[2,139],54:[2,139],57:[2,139],66:[2,139],67:[2,139],68:[2,139],70:[2,139],72:[2,139],73:[2,139],77:[2,139],83:[2,139],84:[2,139],85:[2,139],90:[2,139],92:[2,139],101:[2,139],103:[2,139],104:[2,139],105:[2,139],109:[2,139],117:[2,139],125:[2,139],127:[2,139],128:[2,139],131:[2,139],132:[2,139],133:[2,139],134:[2,139],135:[2,139],136:[2,139]},{1:[2,118],6:[2,118],25:[2,118],26:[2,118],49:[2,118],54:[2,118],57:[2,118],66:[2,118],67:[2,118],68:[2,118],70:[2,118],72:[2,118],73:[2,118],77:[2,118],83:[2,118],84:[2,118],85:[2,118],90:[2,118],92:[2,118],101:[2,118],103:[2,118],104:[2,118],105:[2,118],109:[2,118],117:[2,118],125:[2,118],127:[2,118],128:[2,118],131:[2,118],132:[2,118],133:[2,118],134:[2,118],135:[2,118],136:[2,118]},{6:[2,125],25:[2,125],26:[2,125],54:[2,125],85:[2,125],90:[2,125]},{6:[2,53],25:[2,53],26:[2,53],53:314,54:[1,226]},{6:[2,126],25:[2,126],26:[2,126],54:[2,126],85:[2,126],90:[2,126]},{1:[2,165],6:[2,165],25:[2,165],26:[2,165],49:[2,165],54:[2,165],57:[2,165],72:[2,165],77:[2,165],85:[2,165],90:[2,165],92:[2,165],101:[2,165],102:87,103:[2,165],104:[2,165],105:[2,165],108:88,109:[2,165],110:69,117:[1,315],125:[2,165],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,167],6:[2,167],25:[2,167],26:[2,167],49:[2,167],54:[2,167],57:[2,167],72:[2,167],77:[2,167],85:[2,167],90:[2,167],92:[2,167],101:[2,167],102:87,103:[2,167],104:[1,316],105:[2,167],108:88,109:[2,167],110:69,117:[2,167],125:[2,167],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,166],6:[2,166],25:[2,166],26:[2,166],49:[2,166],54:[2,166],57:[2,166],72:[2,166],77:[2,166],85:[2,166],90:[2,166],92:[2,166],101:[2,166],102:87,103:[2,166],104:[2,166],105:[2,166],108:88,109:[2,166],110:69,117:[2,166],125:[2,166],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[2,93],25:[2,93],26:[2,93],54:[2,93],77:[2,93]},{6:[2,53],25:[2,53],26:[2,53],53:317,54:[1,236]},{26:[1,318],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[1,247],25:[1,248],26:[1,319]},{26:[1,320]},{1:[2,173],6:[2,173],25:[2,173],26:[2,173],49:[2,173],54:[2,173],57:[2,173],72:[2,173],77:[2,173],85:[2,173],90:[2,173],92:[2,173],101:[2,173],103:[2,173],104:[2,173],105:[2,173],109:[2,173],117:[2,173],125:[2,173],127:[2,173],128:[2,173],131:[2,173],132:[2,173],133:[2,173],134:[2,173],135:[2,173],136:[2,173]},{26:[2,177],120:[2,177],122:[2,177]},{25:[2,131],54:[2,131],102:87,103:[1,65],105:[1,66],108:88,109:[1,68],110:69,125:[1,86],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[1,266],25:[1,267],26:[1,321]},{8:322,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{8:323,9:117,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,75:[1,70],78:[1,43],82:[1,28],87:[1,58],88:[1,59],89:[1,57],95:[1,38],99:[1,44],100:[1,56],102:39,103:[1,65],105:[1,66],106:40,107:[1,67],108:41,109:[1,68],110:69,118:[1,42],123:37,124:[1,64],126:[1,31],127:[1,32],128:[1,33],129:[1,34],130:[1,35]},{6:[1,277],25:[1,278],26:[1,324]},{6:[2,41],25:[2,41],26:[2,41],54:[2,41],77:[2,41]},{6:[2,59],25:[2,59],26:[2,59],49:[2,59],54:[2,59]},{1:[2,171],6:[2,171],25:[2,171],26:[2,171],49:[2,171],54:[2,171],57:[2,171],72:[2,171],77:[2,171],85:[2,171],90:[2,171],92:[2,171],101:[2,171],103:[2,171],104:[2,171],105:[2,171],109:[2,171],117:[2,171],125:[2,171],127:[2,171],128:[2,171],131:[2,171],132:[2,171],133:[2,171],134:[2,171],135:[2,171],136:[2,171]},{6:[2,127],25:[2,127],26:[2,127],54:[2,127],85:[2,127],90:[2,127]},{1:[2,168],6:[2,168],25:[2,168],26:[2,168],49:[2,168],54:[2,168],57:[2,168],72:[2,168],77:[2,168],85:[2,168],90:[2,168],92:[2,168],101:[2,168],102:87,103:[2,168],104:[2,168],105:[2,168],108:88,109:[2,168],110:69,117:[2,168],125:[2,168],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{1:[2,169],6:[2,169],25:[2,169],26:[2,169],49:[2,169],54:[2,169],57:[2,169],72:[2,169],77:[2,169],85:[2,169],90:[2,169],92:[2,169],101:[2,169],102:87,103:[2,169],104:[2,169],105:[2,169],108:88,109:[2,169],110:69,117:[2,169],125:[2,169],127:[1,80],128:[1,79],131:[1,78],132:[1,81],133:[1,82],134:[1,83],135:[1,84],136:[1,85]},{6:[2,94],25:[2,94],26:[2,94],54:[2,94],77:[2,94]}],defaultActions:{60:[2,51],61:[2,52],75:[2,3],94:[2,108],189:[2,88]},parseError:function(a,b){throw new Error(a)},parse:function(a){function o(){var a;a=b.lexer.lex()||1,typeof a!="number"&&(a=b.symbols_[a]||a);return a}function n(a){c.length=c.length-2*a,d.length=d.length-a,e.length=e.length-a}var b=this,c=[0],d=[null],e=[],f=this.table,g="",h=0,i=0,j=0,k=2,l=1;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,typeof this.lexer.yylloc=="undefined"&&(this.lexer.yylloc={});var m=this.lexer.yylloc;e.push(m),typeof this.yy.parseError=="function"&&(this.parseError=this.yy.parseError);var p,q,r,s,t,u,v={},w,x,y,z;for(;;){r=c[c.length-1],this.defaultActions[r]?s=this.defaultActions[r]:(p==null&&(p=o()),s=f[r]&&f[r][p]);_handle_error:if(typeof s=="undefined"||!s.length||!s[0]){if(!j){z=[];for(w in f[r])this.terminals_[w]&&w>2&&z.push("'"+this.terminals_[w]+"'");var A="";this.lexer.showPosition?A="Parse error on line "+(h+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+z.join(", ")+", got '"+this.terminals_[p]+"'":A="Parse error on line "+(h+1)+": Unexpected "+(p==1?"end of input":"'"+(this.terminals_[p]||p)+"'"),this.parseError(A,{text:this.lexer.match,token:this.terminals_[p]||p,line:this.lexer.yylineno,loc:m,expected:z})}if(j==3){if(p==l)throw new Error(A||"Parsing halted.");i=this.lexer.yyleng,g=this.lexer.yytext,h=this.lexer.yylineno,m=this.lexer.yylloc,p=o()}for(;;){if(k.toString()in f[r])break;if(r==0)throw new Error(A||"Parsing halted.");n(1),r=c[c.length-1]}q=p,p=k,r=c[c.length-1],s=f[r]&&f[r][k],j=3}if(s[0]instanceof Array&&s.length>1)throw new Error("Parse Error: multiple actions possible at state: "+r+", token: "+p);switch(s[0]){case 1:c.push(p),d.push(this.lexer.yytext),e.push(this.lexer.yylloc),c.push(s[1]),p=null,q?(p=q,q=null):(i=this.lexer.yyleng,g=this.lexer.yytext,h=this.lexer.yylineno,m=this.lexer.yylloc,j>0&&j--);break;case 2:x=this.productions_[s[1]][1],v.$=d[d.length-x],v._$={first_line:e[e.length-(x||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(x||1)].first_column,last_column:e[e.length-1].last_column},u=this.performAction.call(v,g,i,h,this.yy,s[1],d,e);if(typeof u!="undefined")return u;x&&(c=c.slice(0,-1*x*2),d=d.slice(0,-1*x),e=e.slice(0,-1*x)),c.push(this.productions_[s[1]][0]),d.push(v.$),e.push(v._$),y=f[c[c.length-2]][c[c.length-1]],c.push(y);break;case 3:return!0}}return!0}};undefined;return a}();typeof require!="undefined"&&typeof a!="undefined"&&(a.parser=b,a.parse=function(){return b.parse.apply(b,arguments)},a.main=function(b){if(!b[1])throw new Error("Usage: "+b[0]+" FILE");if(typeof process!="undefined")var c=require("fs").readFileSync(require("path").join(process.cwd(),b[1]),"utf8");else var d=require("file").path(require("file").cwd()),c=d.join(b[1]).read({charset:"utf-8"});return a.parser.parse(c)},typeof module!="undefined"&&require.main===module&&a.main(typeof process!="undefined"?process.argv.slice(1):require("system").args))},require["./scope"]=new function(){var a=this;(function(){var b,c,d,e;e=require("./helpers"),c=e.extend,d=e.last,a.Scope=b=function(){function a(b,c,d){this.parent=b,this.expressions=c,this.method=d,this.variables=[{name:"arguments",type:"arguments"}],this.positions={},this.parent||(a.root=this)}a.root=null,a.prototype.add=function(a,b,c){if(this.shared&&!c)return this.parent.add(a,b,c);return Object.prototype.hasOwnProperty.call(this.positions,a)?this.variables[this.positions[a]].type=b:this.positions[a]=this.variables.push({name:a,type:b})-1},a.prototype.namedMethod=function(){if(this.method.name||!this.parent)return this.method;return this.parent.namedMethod()},a.prototype.find=function(a){if(this.check(a))return!0;this.add(a,"var");return!1},a.prototype.parameter=function(a){if(!this.shared||!this.parent.check(a,!0))return this.add(a,"param")},a.prototype.check=function(a){var b;return!!(this.type(a)||((b=this.parent)!=null?b.check(a):void 0))},a.prototype.temporary=function(a,b){return a.length>1?"_"+a+(b>1?b-1:""):"_"+(b+parseInt(a,36)).toString(36).replace(/\d/g,"a")},a.prototype.type=function(a){var b,c,d,e;e=this.variables;for(c=0,d=e.length;c<d;c++){b=e[c];if(b.name===a)return b.type}return null},a.prototype.freeVariable=function(a,b){var c,d;b==null&&(b=!0),c=0;while(this.check(d=this.temporary(a,c)))c++;b&&this.add(d,"var",!0);return d},a.prototype.assign=function(a,b){this.add(a,{value:b,assigned:!0},!0);return this.hasAssignments=!0},a.prototype.hasDeclarations=function(){return!!this.declaredVariables().length},a.prototype.declaredVariables=function(){var a,b,c,d,e,f;a=[],b=[],f=this.variables;for(d=0,e=f.length;d<e;d++)c=f[d],c.type==="var"&&(c.name.charAt(0)==="_"?b:a).push(c.name);return a.sort().concat(b.sort())},a.prototype.assignedVariables=function(){var a,b,c,d,e;d=this.variables,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],a.type.assigned&&e.push(""+a.name+" = "+a.type.value);return e};return a}()}).call(this)},require["./nodes"]=new function(){var a=this;(function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ba,bb,bc,bd,be,bf,bg,bh,bi,bj,bk=({}).hasOwnProperty,bl=function(a,b){function d(){this.constructor=a}for(var c in b)bk.call(b,c)&&(a[c]=b[c]);d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype;return a},bm=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};N=require("./scope").Scope,bi=require("./lexer"),I=bi.RESERVED,M=bi.STRICT_PROSCRIBED,bj=require("./helpers"),Z=bj.compact,bb=bj.flatten,ba=bj.extend,bd=bj.merge,$=bj.del,bf=bj.starts,_=bj.ends,bc=bj.last,a.extend=ba,Y=function(){return!0},D=function(){return!1},S=function(){return this},C=function(){this.negated=!this.negated;return this},a.Base=e=function(){function a(){}a.prototype.compile=function(a,b){var c;a=ba({},a),b&&(a.level=b),c=this.unfoldSoak(a)||this,c.tab=a.indent;return a.level===z||!c.isStatement(a)?c.compileNode(a):c.compileClosure(a)},a.prototype.compileClosure=function(a){if(this.jumps())throw SyntaxError("cannot use a pure statement in an expression.");a.sharedScope=!0;return i.wrap(this).compileNode(a)},a.prototype.cache=function(a,b,c){var e,f;if(!this.isComplex()){e=b?this.compile(a,b):this;return[e,e]}e=new A(c||a.scope.freeVariable("ref")),f=new d(e,this);return b?[f.compile(a,b),e.value]:[f,e]},a.prototype.compileLoopReference=function(a,b){var c,d;c=d=this.compile(a,w),-Infinity<+c&&+c<Infinity||o.test(c)&&a.scope.check(c,!0)||(c=""+(d=a.scope.freeVariable(b))+" = "+c);return[c,d]},a.prototype.makeReturn=function(a){var b;b=this.unwrapAll();return a?new g(new A(""+a+".push"),[b]):new K(b)},a.prototype.contains=function(a){var b;b=!1,this.traverseChildren(!1,function(c){if(a(c)){b=!0;return!1}});return b},a.prototype.containsType=function(a){return this instanceof a||this.contains(function(b){return b instanceof a})},a.prototype.lastNonComment=function(a){var b;b=a.length;while(b--)if(!(a[b]instanceof k))return a[b];return null},a.prototype.toString=function(a,b){var c;a==null&&(a=""),b==null&&(b=this.constructor.name),c="\n"+a+b,this.soak&&(c+="?"),this.eachChild(function(b){return c+=b.toString(a+R)});return c},a.prototype.eachChild=function(a){var b,c,d,e,f,g,h,i;if(!this.children)return this;h=this.children;for(d=0,f=h.length;d<f;d++){b=h[d];if(this[b]){i=bb([this[b]]);for(e=0,g=i.length;e<g;e++){c=i[e];if(a(c)===!1)return this}}}return this},a.prototype.traverseChildren=function(a,b){return this.eachChild(function(c){if(b(c)===!1)return!1;return c.traverseChildren(a,b)})},a.prototype.invert=function(){return new F("!",this)},a.prototype.unwrapAll=function(){var a;a=this;while(a!==(a=a.unwrap()))continue;return a},a.prototype.children=[],a.prototype.isStatement=D,a.prototype.jumps=D,a.prototype.isComplex=Y,a.prototype.isChainable=D,a.prototype.isAssignable=D,a.prototype.unwrap=S,a.prototype.unfoldSoak=D,a.prototype.assigns=D;return a}(),a.Block=f=function(a){function b(a){this.expressions=Z(bb(a||[]))}bl(b,a),b.prototype.children=["expressions"],b.prototype.push=function(a){this.expressions.push(a);return this},b.prototype.pop=function(){return this.expressions.pop()},b.prototype.unshift=function(a){this.expressions.unshift(a);return this},b.prototype.unwrap=function(){return this.expressions.length===1?this.expressions[0]:this},b.prototype.isEmpty=function(){return!this.expressions.length},b.prototype.isStatement=function(a){var b,c,d,e;e=this.expressions;for(c=0,d=e.length;c<d;c++){b=e[c];if(b.isStatement(a))return!0}return!1},b.prototype.jumps=function(a){var b,c,d,e;e=this.expressions;for(c=0,d=e.length;c<d;c++){b=e[c];if(b.jumps(a))return b}},b.prototype.makeReturn=function(a){var b,c;c=this.expressions.length;while(c--){b=this.expressions[c];if(!(b instanceof k)){this.expressions[c]=b.makeReturn(a),b instanceof K&&!b.expression&&this.expressions.splice(c,1);break}}return this},b.prototype.compile=function(a,c){a==null&&(a={});return a.scope?b.__super__.compile.call(this,a,c):this.compileRoot(a)},b.prototype.compileNode=function(a){var c,d,e,f,g,h,i;this.tab=a.indent,f=a.level===z,d=[],i=this.expressions;for(g=0,h=i.length;g<h;g++)e=i[g],e=e.unwrapAll(),e=e.unfoldSoak(a)||e,e instanceof b?d.push(e.compileNode(a)):f?(e.front=!0,c=e.compile(a),e.isStatement(a)||(c=""+this.tab+c+";",e instanceof A&&(c=""+c+"\n")),d.push(c)):d.push(e.compile(a,w));if(f)return this.spaced?"\n"+d.join("\n\n")+"\n":d.join("\n");c=d.join(", ")||"void 0";return d.length>1&&a.level>=w?"("+c+")":c},b.prototype.compileRoot=function(a){var b,c,d,e,f,g;a.indent=a.bare?"":R,a.scope=new N(null,this,null),a.level=z,this.spaced=!0,e="",a.bare||(f=function(){var a,b,e,f;e=this.expressions,f=[];for(d=a=0,b=e.length;a<b;d=++a){c=e[d];if(!(c.unwrap()instanceof k))break;f.push(c)}return f}.call(this),g=this.expressions.slice(f.length),this.expressions=f,f.length&&(e=""+this.compileNode(bd(a,{indent:""}))+"\n"),this.expressions=g),b=this.compileWithDeclarations(a);if(a.bare)return b;return""+e+"(function() {\n"+b+"\n}).call(this);\n"},b.prototype.compileWithDeclarations=function(a){var b,c,d,e,f,g,h,i,j,l,m,n,o,p;c=g="",n=this.expressions;for(f=l=0,m=n.length;l<m;f=++l){e=n[f],e=e.unwrap();if(!(e instanceof k||e instanceof A))break}a=bd(a,{level:z}),f&&(h=this.expressions.splice(f,9e9),o=[this.spaced,!1],j=o[0],this.spaced=o[1],p=[this.compileNode(a),j],c=p[0],this.spaced=p[1],this.expressions=h),g=this.compileNode(a),i=a.scope;if(i.expressions===this){d=a.scope.hasDeclarations(),b=i.hasAssignments;if(d||b)f&&(c+="\n"),c+=""+this.tab+"var ",d&&(c+=i.declaredVariables().join(", ")),b&&(d&&(c+=",\n"+(this.tab+R)),c+=i.assignedVariables().join(",\n"+(this.tab+R))),c+=";\n"}return c+g},b.wrap=function(a){if(a.length===1&&a[0]instanceof b)return a[0];return new b(a)};return b}(e),a.Literal=A=function(a){function b(a){this.value=a}bl(b,a),b.prototype.makeReturn=function(){return this.isStatement()?this:b.__super__.makeReturn.apply(this,arguments)},b.prototype.isAssignable=function(){return o.test(this.value)},b.prototype.isStatement=function(){var a;return(a=this.value)==="break"||a==="continue"||a==="debugger"},b.prototype.isComplex=D,b.prototype.assigns=function(a){return a===this.value},b.prototype.jumps=function(a){if(this.value==="break"&&!((a!=null?a.loop:void 0)||(a!=null?a.block:void 0)))return this;if(this.value==="continue"&&(a!=null?!a.loop:!void 0))return this},b.prototype.compileNode=function(a){var b,c;b=this.value==="this"?((c=a.scope.method)!=null?c.bound:void 0)?a.scope.method.context:this.value:this.value.reserved?'"'+this.value+'"':this.value;return this.isStatement()?""+this.tab+b+";":b},b.prototype.toString=function(){return' "'+this.value+'"'};return b}(e),a.Undefined=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}bl(b,a),b.prototype.isAssignable=D,b.prototype.isComplex=D,b.prototype.compileNode=function(a){return a.level>=u?"(void 0)":"void 0"};return b}(e),a.Null=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}bl(b,a),b.prototype.isAssignable=D,b.prototype.isComplex=D,b.prototype.compileNode=function(){return"null"};return b}(e),a.Bool=function(a){function b(a){this.val=a}bl(b,a),b.prototype.isAssignable=D,b.prototype.isComplex=D,b.prototype.compileNode=function(){return this.val};return b}(e),a.Return=K=function(a){function b(a){a&&!a.unwrap().isUndefined&&(this.expression=a)}bl(b,a),b.prototype.children=["expression"],b.prototype.isStatement=Y,b.prototype.makeReturn=S,b.prototype.jumps=S,b.prototype.compile=function(a,c){var d,e;d=(e=this.expression)!=null?e.makeReturn():void 0;return!d||d instanceof b?b.__super__.compile.call(this,a,c):d.compile(a,c)},b.prototype.compileNode=function(a){return this.tab+("return"+[this.expression?" "+this.expression.compile(a,y):void 0]+";")};return b}(e),a.Value=W=function(a){function b(a,c,d){if(!c&&a instanceof b)return a;this.base=a,this.properties=c||[],d&&(this[d]=!0);return this}bl(b,a),b.prototype.children=["base","properties"],b.prototype.add=function(a){this.properties=this.properties.concat(a);return this},b.prototype.hasProperties=function(){return!!this.properties.length},b.prototype.isArray=function(){return!this.properties.length&&this.base instanceof c},b.prototype.isComplex=function(){return this.hasProperties()||this.base.isComplex()},b.prototype.isAssignable=function(){return this.hasProperties()||this.base.isAssignable()},b.prototype.isSimpleNumber=function(){return this.base instanceof A&&L.test(this.base.value)},b.prototype.isString=function(){return this.base instanceof A&&q.test(this.base.value)},b.prototype.isAtomic=function(){var a,b,c,d;d=this.properties.concat(this.base);for(b=0,c=d.length;b<c;b++){a=d[b];if(a.soak||a instanceof g)return!1}return!0},b.prototype.isStatement=function(a){return!this.properties.length&&this.base.isStatement(a)},b.prototype.assigns=function(a){return!this.properties.length&&this.base.assigns(a)},b.prototype.jumps=function(a){return!this.properties.length&&this.base.jumps(a)},b.prototype.isObject=function(a){if(this.properties.length)return!1;return this.base instanceof E&&(!a||this.base.generated)},b.prototype.isSplice=function(){return bc(this.properties)instanceof O},b.prototype.unwrap=function(){return this.properties.length?this:this.base},b.prototype.cacheReference=function(a){var c,e,f,g;f=bc(this.properties);if(this.properties.length<2&&!this.base.isComplex()&&(f!=null?!f.isComplex():!void 0))return[this,this];c=new b(this.base,this.properties.slice(0,-1)),c.isComplex()&&(e=new A(a.scope.freeVariable("base")),c=new b(new H(new d(e,c))));if(!f)return[c,e];f.isComplex()&&(g=new A(a.scope.freeVariable("name")),f=new t(new d(g,f.index)),g=new t(g));return[c.add(f),new b(e||c.base,[g||f])]},b.prototype.compileNode=function(a){var b,c,d,e,f;this.base.front=this.front,d=this.properties,b=this.base.compile(a,d.length?u:null),(this.base instanceof H||d.length)&&L.test(b)&&(b=""+b+".");for(e=0,f=d.length;e<f;e++)c=d[e],b+=c.compile(a);return b},b.prototype.unfoldSoak=function(a){var c,e=this;if(this.unfoldedSoak!=null)return this.unfoldedSoak;c=function(){var c,f,g,h,i,j,k,m,n;if(g=e.base.unfoldSoak(a)){Array.prototype.push.apply(g.body.properties,e.properties);return g}n=e.properties;for(f=k=0,m=n.length;k<m;f=++k){h=n[f];if(!h.soak)continue;h.soak=!1,c=new b(e.base,e.properties.slice(0,f)),j=new b(e.base,e.properties.slice(f)),c.isComplex()&&(i=new A(a.scope.freeVariable("ref")),c=new H(new d(i,c)),j.base=i);return new r(new l(c),j,{soak:!0})}return null}();return this.unfoldedSoak=c||!1};return b}(e),a.Comment=k=function(a){function b(a){this.comment=a}bl(b,a),b.prototype.isStatement=Y,b.prototype.makeReturn=S,b.prototype.compileNode=function(a,b){var c;c="/*"+be(this.comment,this.tab)+("\n"+this.tab+"*/\n"),(b||a.level)===z&&(c=a.indent+c);return c};return b}(e),a.Call=g=function(a){function c(a,b,c){this.args=b!=null?b:[],this.soak=c,this.isNew=!1,this.isSuper=a==="super",this.variable=this.isSuper?null:a}bl(c,a),c.prototype.children=["variable","args"],c.prototype.newInstance=function(){var a,b;a=((b=this.variable)!=null?b.base:void 0)||this.variable,a instanceof c&&!a.isNew?a.newInstance():this.isNew=!0;return this},c.prototype.superReference=function(a){var c,d,e;d=a.scope.namedMethod();if(!d)throw SyntaxError("cannot call super outside of a function.");e=d.name;if(e==null)throw SyntaxError("cannot call super on an anonymous function.");if(d.klass){c=[new b(new A("__super__"))],d["static"]&&c.push(new b(new A("constructor"))),c.push(new b(new A(e)));return(new W(new A(d.klass),c)).compile(a)}return""+e+".__super__.constructor"},c.prototype.superThis=function(a){var b;b=a.scope.method;return b&&!b.klass&&b.context||"this"},c.prototype.unfoldSoak=function(a){var b,d,e,f,g,h,i,j,k;if(this.soak){if(this.variable){if(d=bg(a,this,"variable"))return d;j=(new W(this.variable)).cacheReference(a),e=j[0],g=j[1]}else e=new A(this.superReference(a)),g=new W(e);g=new c(g,this.args),g.isNew=this.isNew,e=new A("typeof "+e.compile(a)+' === "function"');return new r(e,new W(g),{soak:!0})}b=this,f=[];for(;;){if(b.variable instanceof c){f.push(b),b=b.variable;continue}if(!(b.variable instanceof W))break;f.push(b);if(!((b=b.variable.base)instanceof c))break}k=f.reverse();for(h=0,i=k.length;h<i;h++)b=k[h],d&&(b.variable instanceof c?b.variable=d:b.variable.base=d),d=bg(a,b,"variable");return d},c.prototype.filterImplicitObjects=function(a){var b,c,e,f,g,h,i,j,l,m;c=[];for(h=0,j=a.length;h<j;h++){b=a[h];if(!((typeof b.isObject=="function"?b.isObject():void 0)&&b.base.generated)){c.push(b);continue}e=null,m=b.base.properties;for(i=0,l=m.length;i<l;i++)f=m[i],f instanceof d||f instanceof k?(e||c.push(e=new E(g=[],!0)),g.push(f)):(c.push(f),e=null)}return c},c.prototype.compileNode=function(a){var b,c,d,e;(e=this.variable)!=null&&(e.front=this.front);if(d=P.compileSplattedArray(a,this.args,!0))return this.compileSplat(a,d);c=this.filterImplicitObjects(this.args),c=function(){var d,e,f;f=[];for(d=0,e=c.length;d<e;d++)b=c[d],f.push(b.compile(a,w));return f}().join(", ");return this.isSuper?this.superReference(a)+(".call("+this.superThis(a)+(c&&", "+c)+")"):(this.isNew?"new ":"")+this.variable.compile(a,u)+("("+c+")")},c.prototype.compileSuper=function(a,b){return""+this.superReference(b)+".call("+this.superThis(b)+(a.length?", ":"")+a+")"},c.prototype.compileSplat=function(a,b){var c,d,e,f,g;if(this.isSuper)return""+this.superReference(a)+".apply("+this.superThis(a)+", "+b+")";if(this.isNew){e=this.tab+R;return"(function(func, args, ctor) {\n"+e+"ctor.prototype = func.prototype;\n"+e+"var child = new ctor, result = func.apply(child, args), t = typeof result;\n"+e+'return t == "object" || t == "function" ? result || child : child;\n'+this.tab+"})("+this.variable.compile(a,w)+", "+b+", function(){})"}c=new W(this.variable),(f=c.properties.pop())&&c.isComplex()?(g=a.scope.freeVariable("ref"),d="("+g+" = "+c.compile(a,w)+")"+f.compile(a)):(d=c.compile(a,u),L.test(d)&&(d="("+d+")"),f?(g=d,d+=f.compile(a)):g="null");return""+d+".apply("+g+", "+b+")"};return c}(e),a.Extends=m=function(a){function b(a,b){this.child=a,this.parent=b}bl(b,a),b.prototype.children=["child","parent"],b.prototype.compile=function(a){return(new g(new W(new A(bh("extends"))),[this.child,this.parent])).compile(a)};return b}(e),a.Access=b=function(a){function b(a,b){this.name=a,this.name.asKey=!0,this.soak=b==="soak"}bl(b,a),b.prototype.children=["name"],b.prototype.compile=function(a){var b;b=this.name.compile(a);return o.test(b)?"."+b:"["+b+"]"},b.prototype.isComplex=D;return b}(e),a.Index=t=function(a){function b(a){this.index=a}bl(b,a),b.prototype.children=["index"],b.prototype.compile=function(a){return"["+this.index.compile(a,y)+"]"},b.prototype.isComplex=function(){return this.index.isComplex()};return b}(e),a.Range=J=function(a){function b(a,b,c){this.from=a,this.to=b,this.exclusive=c==="exclusive",this.equals=this.exclusive?"":"="}bl(b,a),b.prototype.children=["from","to"],b.prototype.compileVariables=function(a){var b,c,d,e,f;a=bd(a,{top:!0}),c=this.from.cache(a,w),this.fromC=c[0],this.fromVar=c[1],d=this.to.cache(a,w),this.toC=d[0],this.toVar=d[1];if(b=$(a,"step"))e=b.cache(a,w),this.step=e[0],this.stepVar=e[1];f=[this.fromVar.match(L),this.toVar.match(L)],this.fromNum=f[0],this.toNum=f[1];if(this.stepVar)return this.stepNum=this.stepVar.match(L)},b.prototype.compileNode=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o;this.fromVar||this.compileVariables(a);if(!a.index)return this.compileArray(a);h=this.fromNum&&this.toNum,f=$(a,"index"),g=$(a,"name"),j=g&&g!==f,m=""+f+" = "+this.fromC,this.toC!==this.toVar&&(m+=", "+this.toC),this.step!==this.stepVar&&(m+=", "+this.step),n=[""+f+" <"+this.equals,""+f+" >"+this.equals],i=n[0],e=n[1],c=this.stepNum?+this.stepNum>0?""+i+" "+this.toVar:""+e+" "+this.toVar:h?(o=[+this.fromNum,+this.toNum],d=o[0],l=o[1],o,d<=l?""+i+" "+l:""+e+" "+l):(b=""+this.fromVar+" <= "+this.toVar,""+b+" ? "+i+" "+this.toVar+" : "+e+" "+this.toVar),k=this.stepVar?""+f+" += "+this.stepVar:h?j?d<=l?"++"+f:"--"+f:d<=l?""+f+"++":""+f+"--":j?""+b+" ? ++"+f+" : --"+f:""+b+" ? "+f+"++ : "+f+"--",j&&(m=""+g+" = "+m),j&&(k=""+g+" = "+k);return""+m+"; "+c+"; "+k},b.prototype.compileArray=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;if(this.fromNum&&this.toNum&&Math.abs(this.fromNum-this.toNum)<=20){j=function(){p=[];for(var a=n=+this.fromNum,b=+this.toNum;n<=b?a<=b:a>=b;n<=b?a++:a--)p.push(a);return p}.apply(this),this.exclusive&&j.pop();return"["+j.join(", ")+"]"}g=this.tab+R,f=a.scope.freeVariable("i"),k=a.scope.freeVariable("results"),i="\n"+g+k+" = [];",this.fromNum&&this.toNum?(a.index=f,c=this.compileNode(a)):(l=""+f+" = "+this.fromC+(this.toC!==this.toVar?", "+this.toC:""),d=""+this.fromVar+" <= "+this.toVar,c="var "+l+"; "+d+" ? "+f+" <"+this.equals+" "+this.toVar+" : "+f+" >"+this.equals+" "+this.toVar+"; "+d+" ? "+f+"++ : "+f+"--"),h="{ "+k+".push("+f+"); }\n"+g+"return "+k+";\n"+a.indent,e=function(a){return a!=null?a.contains(function(a){return a instanceof A&&a.value==="arguments"&&!a.asKey}):void 0};if(e(this.from)||e(this.to))b=", arguments";return"(function() {"+i+"\n"+g+"for ("+c+")"+h+"}).apply(this"+(b!=null?b:"")+")"};return b}(e),a.Slice=O=function(a){function b(a){this.range=a,b.__super__.constructor.call(this)}bl(b,a),b.prototype.children=["range"],b.prototype.compileNode=function(a){var b,c,d,e,f,g;g=this.range,e=g.to,c=g.from,d=c&&c.compile(a,y)||"0",b=e&&e.compile(a,y),e&&(!!this.range.exclusive||+b!==-1)&&(f=", "+(this.range.exclusive?b:L.test(b)?""+(+b+1):(b=e.compile(a,u),""+b+" + 1 || 9e9")));return".slice("+d+(f||"")+")"};return b}(e),a.Obj=E=function(a){function b(a,b){this.generated=b!=null?b:!1,this.objects=this.properties=a||[]}bl(b,a),b.prototype.children=["properties"],b.prototype.compileNode=function(a){var b,c,e,f,g,h,i,j,l,m,n,o,p,q,r,s;n=this.properties,m=[],s=this.properties;for(o=0,q=s.length;o<q;o++){j=s[o],j.isComplex()&&(j=j.variable);if(j!=null){l=j.unwrapAll().value.toString();if(bm.call(m,l)>=0)throw SyntaxError('multiple object literal properties named "'+l+'"');m.push(l)}}if(!n.length)return this.front?"({})":"{}";if(this.generated)for(p=0,r=n.length;p<r;p++){h=n[p];if(h instanceof W)throw new Error("cannot have an implicit value in an implicit object")}c=a.indent+=R,g=this.lastNonComment(this.properties),n=function(){var h,i,l;l=[];for(b=h=0,i=n.length;h<i;b=++h)j=n[b],f=b===n.length-1?"":j===g||j instanceof k?"\n":",\n",e=j instanceof k?"":c,j instanceof W&&j["this"]&&(j=new d(j.properties[0].name,j,"object")),j instanceof k||(j instanceof d||(j=new d(j,j,"object")),(j.variable.base||j.variable).asKey=!0),l.push(e+j.compile(a,z)+f);return l}(),n=n.join(""),i="{"+(n&&"\n"+n+"\n"+this.tab)+"}";return this.front?"("+i+")":i},b.prototype.assigns=function(a){var b,c,d,e;e=this.properties;for(c=0,d=e.length;c<d;c++){b=e[c];if(b.assigns(a))return!0}return!1};return b}(e),a.Arr=c=function(a){function b(a){this.objects=a||[]}bl(b,a),b.prototype.children=["objects"],b.prototype.filterImplicitObjects=g.prototype.filterImplicitObjects,b.prototype.compileNode=function(a){var b,c,d;if(!this.objects.length)return"[]";a.indent+=R,d=this.filterImplicitObjects(this.objects);if(b=P.compileSplattedArray(a,d))return b;b=function(){var b,e,f;f=[];for(b=0,e=d.length;b<e;b++)c=d[b],f.push(c.compile(a,w));return f}().join(", ");return b.indexOf("\n")>=0?"[\n"+a.indent+b+"\n"+this.tab+"]":"["+b+"]"},b.prototype.assigns=function(a){var b,c,d,e;e=this.objects;for(c=0,d=e.length;c<d;c++){b=e[c];if(b.assigns(a))return!0}return!1};return b}(e),a.Class=h=function(a){function c(a,b,c){this.variable=a,this.parent=b,this.body=c!=null?c:new f,this.boundFuncs=[],this.body.classBody=!0}bl(c,a),c.prototype.children=["variable","parent","body"],c.prototype.determineName=function(){var a,c;if(!this.variable)return null;a=(c=bc(this.variable.properties))?c instanceof b&&c.name.value:this.variable.base.value;if(bm.call(M,a)>=0)throw SyntaxError("variable name may not be "+a);return a&&(a=o.test(a)&&a)},c.prototype.setContext=function(a){return this.body.traverseChildren(!1,function(b){if(b.classBody)return!1;if(b instanceof A&&b.value==="this")return b.value=a;if(b instanceof j){b.klass=a;if(b.bound)return b.context=a}})},c.prototype.addBoundFunctions=function(a){var c,d,e,f,g,h;if(this.boundFuncs.length){g=this.boundFuncs,h=[];for(e=0,f=g.length;e<f;e++)c=g[e],d=(new W(new A("this"),[new b(c)])).compile(a),h.push(this.ctor.body.unshift(new A(""+d+" = "+bh("bind")+"("+d+", this)")));return h}},c.prototype.addProperties=function(a,c,e){var f,g,h,i,k;k=a.base.properties.slice(0),h=function(){var a;a=[];while(f=k.shift()){if(f instanceof d){g=f.variable.base,delete f.context,i=f.value;if(g.value==="constructor"){if(this.ctor)throw new Error("cannot define more than one constructor in a class");if(i.bound)throw new Error("cannot define a constructor as a bound function");i instanceof j?f=this.ctor=i:(this.externalCtor=e.scope.freeVariable("class"),f=new d(new A(this.externalCtor),i))}else f.variable["this"]?(i["static"]=!0,i.bound&&(i.context=c)):(f.variable=new W(new A(c),[new b(new A("prototype")),new b(g)]),i instanceof j&&i.bound&&(this.boundFuncs.push(g),i.bound=!1))}a.push(f)}return a}.call(this);return Z(h)},c.prototype.walkBody=function(a,b){var d=this;return this.traverseChildren(!1,function(e){var g,h,i,j,k,l;if(e instanceof c)return!1;if(e instanceof f){l=g=e.expressions;for(h=j=0,k=l.length;j<k;h=++j)i=l[h],i instanceof W&&i.isObject(!0)&&(g[h]=d.addProperties(i,a,b));return e.expressions=g=bb(g)}})},c.prototype.hoistDirectivePrologue=function(){var a,b,c;b=0,a=this.body.expressions;while((c=a[b])&&c instanceof k||c instanceof W&&c.isString())++b;return this.directives=a.splice(0,b)},c.prototype.ensureConstructor=function(a){this.ctor||(this.ctor=new j,this.parent&&this.ctor.body.push(new A(""+a+".__super__.constructor.apply(this, arguments)")),this.externalCtor&&this.ctor.body.push(new A(""+this.externalCtor+".apply(this, arguments)")),this.ctor.body.makeReturn(),this.body.expressions.unshift(this.ctor)),this.ctor.ctor=this.ctor.name=a,this.ctor.klass=null;return this.ctor.noReturn=!0},c.prototype.compileNode=function(a){var b,c,e,f,g,h,k;c=this.determineName(),g=c||"_Class",g.reserved&&(g="_"+g),f=new A(g),this.hoistDirectivePrologue(),this.setContext(g),this.walkBody(g,a),this.ensureConstructor(g),this.body.spaced=!0,this.ctor instanceof j||this.body.expressions.unshift(this.ctor),this.body.expressions.push(f),(k=this.body.expressions).unshift.apply(k,this.directives),this.addBoundFunctions(a),b=i.wrap(this.body),this.parent&&(this.superClass=new A(a.scope.freeVariable("super",!1)),this.body.expressions.unshift(new m(f,this.superClass)),b.args.push(this.parent),h=b.variable.params||b.variable.base.params,h.push(new G(this.superClass))),e=new H(b,!0),this.variable&&(e=new d(this.variable,e));return e.compile(a)};return c}(e),a.Assign=d=function(a){function c(a,b,c,d){var e,f,g;this.variable=a,this.value=b,this.context=c,this.param=d&&d.param,this.subpattern=d&&d.subpattern,e=(g=f=this.variable.unwrapAll().value,bm.call(M,g)>=0);if(e&&this.context!=="object")throw SyntaxError('variable name may not be "'+f+'"')}bl(c,a),c.prototype.children=["variable","value"],c.prototype.isStatement=function(a){return(a!=null?a.level:void 0)===z&&this.context!=null&&bm.call(this.context,"?")>=0},c.prototype.assigns=function(a){return this[this.context==="object"?"value":"variable"].assigns(a)},c.prototype.unfoldSoak=function(a){return bg(a,this,"variable")},c.prototype.compileNode=function(a){var b,c,d,e,f,g,h,i,k;if(b=this.variable instanceof W){if(this.variable.isArray()||this.variable.isObject())return this.compilePatternMatch(a);if(this.variable.isSplice())return this.compileSplice(a);if((g=this.context)==="||="||g==="&&="||g==="?=")return this.compileConditional(a)}d=this.variable.compile(a,w);if(!this.context){if(!(f=this.variable.unwrapAll()).isAssignable())throw SyntaxError('"'+this.variable.compile(a)+'" cannot be assigned.');if(typeof f.hasProperties=="function"?!f.hasProperties():!void 0)this.param?a.scope.add(d,"var"):a.scope.find(d)}this.value instanceof j&&(c=B.exec(d))&&(c[1]&&(this.value.klass=c[1]),this.value.name=(h=(i=(k=c[2])!=null?k:c[3])!=null?i:c[4])!=null?h:c[5]),e=this.value.compile(a,w);if(this.context==="object")return""+d+": "+e;e=d+(" "+(this.context||"=")+" ")+e;return a.level<=w?e:"("+e+")"},c.prototype.compilePatternMatch=function(a){var d,e,f,g,h,i,j,k,l,m,n,p,q,r,s,u,v,y,B,C,D,E,F,G,J,K,L;s=a.level===z,v=this.value,m=this.variable.base.objects;if(!(n=m.length)){f=v.compile(a);return a.level>=x?"("+f+")":f}i=this.variable.isObject();if(s&&n===1&&!((l=m[0])instanceof P)){l instanceof c?(D=l,E=D.variable,h=E.base,l=D.value):l.base instanceof H?(F=(new W(l.unwrapAll())).cacheReference(a),l=F[0],h=F[1]):h=i?l["this"]?l.properties[0].name:l:new A(0),d=o.test(h.unwrap().value||0),v=new W(v),v.properties.push(new(d?b:t)(h));if(G=l.unwrap().value,bm.call(I,G)>=0)throw new SyntaxError("assignment to a reserved word: "+l.compile(a)+" = "+v.compile(a));return(new c(l,v,null,{param:this.param})).compile(a,z)}y=v.compile(a,w),e=[],r=!1;if(!o.test(y)||this.variable.assigns(y))e.push(""+(p=a.scope.freeVariable("ref"))+" = "+y),y=p;for(g=B=0,C=m.length;B<C;g=++B){l=m[g],h=g,i&&(l instanceof c?(J=l,K=J.variable,h=K.base,l=J.value):l.base instanceof H?(L=(new W(l.unwrapAll())).cacheReference(a),l=L[0],h=L[1]):h=l["this"]?l.properties[0].name:l);if(!r&&l instanceof P)k=l.name.unwrap().value,l=l.unwrap(),u=""+n+" <= "+y+".length ? "+bh("slice")+".call("+y+", "+g,(q=n-g-1)?(j=a.scope.freeVariable("i"),u+=", "+j+" = "+y+".length - "+q+") : ("+j+" = "+g+", [])"):u+=") : []",u=new A(u),r=""+j+"++";else{k=l.unwrap().value;if(l instanceof P){l=l.name.compile(a);throw new SyntaxError("multiple splats are disallowed in an assignment: "+l+"...")}typeof h=="number"?(h=new A(r||h),d=!1):d=i&&o.test(h.unwrap().value||0),u=new W(new A(y),[new(d?b:t)(h)])}if(k!=null&&bm.call(I,k)>=0)throw new SyntaxError("assignment to a reserved word: "+l.compile(a)+" = "+u.compile(a));e.push((new c(l,u,null,{param:this.param,subpattern:!0})).compile(a,w))}!s&&!this.subpattern&&e.push(y),f=e.join(", ");return a.level<w?f:"("+f+")"},c.prototype.compileConditional=function(a){var b,d,e;e=this.variable.cacheReference(a),b=e[0],d=e[1];if(!b.properties.length&&b.base instanceof A&&b.base.value!=="this"&&!a.scope.check(b.base.value))throw new Error('the variable "'+b.base.value+"\" can't be assigned with "+this.context+" because it has not been defined.");bm.call(this.context,"?")>=0&&(a.isExistentialEquals=!0);return(new F(this.context.slice(0,-1),b,new c(d,this.value,"="))).compile(a)},c.prototype.compileSplice=function(a){var b,c,d,e,f,g,h,i,j,k,l,m;k=this.variable.properties.pop().range,d=k.from,h=k.to,c=k.exclusive,g=this.variable.compile(a),l=(d!=null?d.cache(a,x):void 0)||["0","0"],e=l[0],f=l[1],h?(d!=null?d.isSimpleNumber():void 0)&&h.isSimpleNumber()?(h=+h.compile(a)- +f,c||(h+=1)):(h=h.compile(a,u)+" - "+f,c||(h+=" + 1")):h="9e9",m=this.value.cache(a,w),i=m[0],j=m[1],b="[].splice.apply("+g+", ["+e+", "+h+"].concat("+i+")), "+j;return a.level>z?"("+b+")":b};return c}(e),a.Code=j=function(a){function b(a,b,c){this.params=a||[],this.body=b||new f,this.bound=c==="boundfunc",this.bound&&(this.context="_this")}bl(b,a),b.prototype.children=["params","body"],b.prototype.isStatement=function(){return!!this.ctor},b.prototype.jumps=D,b.prototype.compileNode=function(a){var b,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,v,w,x,y,z,B,C,D,E,G,H,I,J,K,L,M,O;a.scope=new N(a.scope,this.body,this),a.scope.shared=$(a,"sharedScope"),a.indent+=R,delete a.bare,delete a.isExistentialEquals,l=[],e=[],H=this.paramNames();for(s=0,x=H.length;s<x;s++)i=H[s],a.scope.check(i)||a.scope.parameter(i);I=this.params;for(t=0,y=I.length;t<y;t++){k=I[t];if(!k.splat)continue;J=this.params;for(v=0,z=J.length;v<z;v++)j=J[v].name,j["this"]&&(j=j.properties[0].name),j.value&&a.scope.add(j.value,"var",!0);n=new d(new W(new c(function(){var b,c,d,e;d=this.params,e=[];for(b=0,c=d.length;b<c;b++)j=d[b],e.push(j.asReference(a));return e}.call(this))),new W(new A("arguments")));break}K=this.params;for(w=0,B=K.length;w<B;w++)k=K[w],k.isComplex()?(p=m=k.asReference(a),k.value&&(p=new F("?",m,k.value)),e.push(new d(new W(k.name),p,"=",{param:!0}))):(m=k,k.value&&(h=new A(m.name.value+" == null"),p=new d(new W(k.name),k.value,"="),e.push(new r(h,p)))),n||l.push(m);q=this.body.isEmpty(),n&&e.unshift(n),e.length&&(L=this.body.expressions).unshift.apply(L,e);for(f=E=0,C=l.length;E<C;f=++E)j=l[f],a.scope.parameter(l[f]=j.compile(a));o=[],M=this.paramNames();for(G=0,D=M.length;G<D;G++){i=M[G];if(bm.call(o,i)>=0)throw SyntaxError("multiple parameters named '"+i+"'");o.push(i)}!q&&!this.noReturn&&this.body.makeReturn(),this.bound&&(((O=a.scope.parent.method)!=null?O.bound:void 0)?this.bound=this.context=a.scope.parent.method.context:this["static"]||a.scope.parent.assign("_this","this")),g=a.indent,b="function",this.ctor&&(b+=" "+this.name),b+="("+l.join(", ")+") {",this.body.isEmpty()||(b+="\n"+this.body.compileWithDeclarations(a)+"\n"+this.tab),b+="}";if(this.ctor)return this.tab+b;return this.front||a.level>=u?"("+b+")":b},b.prototype.paramNames=function(){var a,b,c,d,e;a=[],e=this.params;for(c=0,d=e.length;c<d;c++)b=e[c],a.push.apply(a,b.names());return a},b.prototype.traverseChildren=function(a,c){if(a)return b.__super__.traverseChildren.call(this,a,c)};return b}(e),a.Param=G=function(a){function b(a,b,c){var d;this.name=a,this.value=b,this.splat=c;if(d=a=this.name.unwrapAll().value,bm.call(M,d)>=0)throw SyntaxError('parameter name "'+a+'" is not allowed')}bl(b,a),b.prototype.children=["name","value"],b.prototype.compile=function(a){return this.name.compile(a,w)},b.prototype.asReference=function(a){var b;if(this.reference)return this.reference;b=this.name,b["this"]?(b=b.properties[0].name,b.value.reserved&&(b=new A(a.scope.freeVariable(b.value)))):b.isComplex()&&(b=new A(a.scope.freeVariable("arg"))),b=new W(b),this.splat&&(b=new P(b));return this.reference=b},b.prototype.isComplex=function(){return this.name.isComplex()},b.prototype.names=function(a){var b,c,e,f,g,h;a==null&&(a=this.name),b=function(a){var b;b=a.properties[0].name.value;return b.reserved?[]:[b]};if(a instanceof A)return[a.value];if(a instanceof W)return b(a);c=[],h=a.objects;for(f=0,g=h.length;f<g;f++){e=h[f];if(e instanceof d)c.push(e.value.unwrap().value);else if(e instanceof P)c.push(e.name.unwrap().value);else if(e instanceof W)e.isArray()||e.isObject()?c.push.apply(c,this.names(e.base)):e["this"]?c.push.apply(c,b(e)):c.push(e.base.value);else throw SyntaxError("illegal parameter "+e.compile())}return c};return b}(e),a.Splat=P=function(a){function b(a){this.name=a.compile?a:new A(a)}bl(b,a),b.prototype.children=["name"],b.prototype.isAssignable=Y,b.prototype.assigns=function(a){return this.name.assigns(a)},b.prototype.compile=function(a){return this.index!=null?this.compileParam(a):this.name.compile(a)},b.prototype.unwrap=function(){return this.name},b.compileSplattedArray=function(a,c,d){var e,f,g,h,i,j,k,l;i=-1;while((j=c[++i])&&!(j instanceof b))continue;if(i>=c.length)return"";if(c.length===1){g=c[0].compile(a,w);if(d)return g;return""+bh("slice")+".call("+g+")"}e=c.slice(i);for(h=k=0,l=e.length;k<l;h=++k)j=e[h],g=j.compile(a,w),e[h]=j instanceof b?""+bh("slice")+".call("+g+")":"["+g+"]";if(i===0)return e[0]+(".concat("+e.slice(1).join(", ")+")");f=function(){var b,d,e,f;e=c.slice(0,i),f=[];for(b=0,d=e.length;b<d;b++)j=e[b],f.push(j.compile(a,w));return f}();return"["+f.join(", ")+"].concat("+e.join(", ")+")"};return b}(e),a.While=X=function(a){function b(a,b){this.condition=(b!=null?b.invert:void 0)?a.invert():a,this.guard=b!=null?b.guard:void 0}bl(b,a),b.prototype.children=["condition","guard","body"],b.prototype.isStatement=Y,b.prototype.makeReturn=function(a){if(a)return b.__super__.makeReturn.apply(this,arguments);this.returns=!this.jumps({loop:!0});return this},b.prototype.addBody=function(a){this.body=a;return this},b.prototype.jumps=function(){var a,b,c,d;a=this.body.expressions;if(!a.length)return!1;for(c=0,d=a.length;c<d;c++){b=a[c];if(b.jumps({loop:!0}))return b}return!1},b.prototype.compileNode=function(a){var b,c,d,e;a.indent+=R,e="",b=this.body,b.isEmpty()?b="":(this.returns&&(b.makeReturn(d=a.scope.freeVariable("results")),e=""+this.tab+d+" = [];\n"),this.guard&&(b.expressions.length>1?b.expressions.unshift(new r((new H(this.guard)).invert(),new A("continue"))):this.guard&&(b=f.wrap([new r(this.guard,b)]))),b="\n"+b.compile(a,z)+"\n"+this.tab),c=e+this.tab+("while ("+this.condition.compile(a,y)+") {"+b+"}"),this.returns&&(c+="\n"+this.tab+"return "+d+";");return c};return b}(e),a.Op=F=function(a){function e(a,c,d,e){if(a==="in")return new s(c,d);if(a==="do")return this.generateDo(c);if(a==="new"){if(c instanceof g&&!c["do"]&&!c.isNew)return c.newInstance();if(c instanceof j&&c.bound||c["do"])c=new H(c)}this.operator=b[a]||a,this.first=c,this.second=d,this.flip=!!e;return this}var b,c;bl(e,a),b={"==":"===","!=":"!==",of:"in"},c={"!==":"===","===":"!=="},e.prototype.children=["first","second"],e.prototype.isSimpleNumber=D,e.prototype.isUnary=function(){return!this.second},e.prototype.isComplex=function(){var a;return!this.isUnary()||(a=this.operator)!=="+"&&a!=="-"||this.first.isComplex()},e.prototype.isChainable=function(){var a;return(a=this.operator)==="<"||a===">"||a===">="||a==="<="||a==="==="||a==="!=="},e.prototype.invert=function(){var a,b,d,f,g;if(this.isChainable()&&this.first.isChainable()){a=!0,b=this;while(b&&b.operator)a&&(a=b.operator in c),b=b.first;if(!a)return(new H(this)).invert();b=this;while(b&&b.operator)b.invert=!b.invert,b.operator=c[b.operator],b=b.first;return this}if(f=c[this.operator]){this.operator=f,this.first.unwrap()instanceof e&&this.first.invert();return this}return this.second?(new H(this)).invert():this.operator==="!"&&(d=this.first.unwrap())instanceof e&&((g=d.operator)==="!"||g==="in"||g==="instanceof")?d:new e("!",this)},e.prototype.unfoldSoak=function(a){var b;return((b=this.operator)==="++"||b==="--"||b==="delete")&&bg(a,this,"first")},e.prototype.generateDo=function(a){var b,c,e,f,h,i,k,l;f=[],c=a instanceof d&&(h=a.value.unwrap())instanceof j?h:a,l=c.params||[];for(i=0,k=l.length;i<k;i++)e=l[i],e.value?(f.push(e.value),delete e.value):f.push(e);b=new g(a,f),b["do"]=!0;return b},e.prototype.compileNode=function(a){var b,c,d,e;c=this.isChainable()&&this.first.isChainable(),c||(this.first.front=this.front);if(this.operator==="delete"&&a.scope.check(this.first.unwrapAll().value))throw SyntaxError("delete operand may not be argument or var");if(((d=this.operator)==="--"||d==="++")&&(e=this.first.unwrapAll().value,bm.call(M,e)>=0))throw SyntaxError("prefix increment/decrement may not have eval or arguments operand");if(this.isUnary())return this.compileUnary(a);if(c)return this.compileChain(a);if(this.operator==="?")return this.compileExistence(a);b=this.first.compile(a,x)+" "+this.operator+" "+this.second.compile(a,x);return a.level<=x?b:"("+b+")"},e.prototype.compileChain=function(a){var b,c,d,e;e=this.first.second.cache(a),this.first.second=e[0],d=e[1],c=this.first.compile(a,x),b=""+c+" "+(this.invert?"&&":"||")+" "+d.compile(a)+" "+this.operator+" "+this.second.compile(a,x);return"("+b+")"},e.prototype.compileExistence=function(a){var b,c;this.first.isComplex()?(c=new A(a.scope.freeVariable("ref")),b=new H(new d(c,this.first))):(b=this.first,c=b);return(new r(new l(b),c,{type:"if"})).addElse(this.second).compile(a)},e.prototype.compileUnary=function(a){var b,c,d;if(a.level>=u)return(new H(this)).compile(a);c=[b=this.operator],d=b==="+"||b==="-",(b==="new"||b==="typeof"||b==="delete"||d&&this.first instanceof e&&this.first.operator===b)&&c.push(" ");if(d&&this.first instanceof e||b==="new"&&this.first.isStatement(a))this.first=new H(this.first);c.push(this.first.compile(a,x)),this.flip&&c.reverse();return c.join("")},e.prototype.toString=function(a){return e.__super__.toString.call(this,a,this.constructor.name+" "+this.operator)};return e}(e),a.In=s=function(a){function b(a,b){this.object=a,this.array=b}bl(b,a),b.prototype.children=["object","array"],b.prototype.invert=C,b.prototype.compileNode=function(a){var b,c,d,e,f;if(this.array instanceof W&&this.array.isArray()){f=this.array.base.objects;for(d=0,e=f.length;d<e;d++){c=f[d];if(!(c instanceof P))continue;b=!0;break}if(!b)return this.compileOrTest(a)}return this.compileLoopTest(a)},b.prototype.compileOrTest=function(a){var b,c,d,e,f,g,h,i,j;if(this.array.base.objects.length===0)return""+!!this.negated;i=this.object.cache(a,x),g=i[0],f=i[1],j=this.negated?[" !== "," && "]:[" === "," || "],b=j[0],c=j[1],h=function(){var c,h,i,j;i=this.array.base.objects,j=[];for(d=c=0,h=i.length;c<h;d=++c)e=i[d],j.push((d?f:g)+b+e.compile(a,u));return j}.call(this),h=h.join(c);return a.level<x?h:"("+h+")"},b.prototype.compileLoopTest=function(a){var b,c,d,e;e=this.object.cache(a,w),d=e[0],c=e[1],b=bh("indexOf")+(".call("+this.array.compile(a,w)+", "+c+") ")+(this.negated?"< 0":">= 0");if(d===c)return b;b=d+", "+b;return a.level<w?b:"("+b+")"},b.prototype.toString=function(a){return b.__super__.toString.call(this,a,this.constructor.name+(this.negated?"!":""))};return b}(e),a.Try=U=function(a){function b(a,b,c,d){this.attempt=a,this.error=b,this.recovery=c,this.ensure=d}bl(b,a),b.prototype.children=["attempt","recovery","ensure"],b.prototype.isStatement=Y,b.prototype.jumps=function(a){var b;return this.attempt.jumps(a)||((b=this.recovery)!=null?b.jumps(a):void 0)},b.prototype.makeReturn=function(a){this.attempt&&(this.attempt=this.attempt.makeReturn(a)),this.recovery&&(this.recovery=this.recovery.makeReturn(a));return this},b.prototype.compileNode=function(a){var b,c,d,e;a.indent+=R,d=this.error?" ("+this.error.compile(a)+") ":" ",e=this.attempt.compile(a,z),b=function(){var b;if(this.recovery){if(b=this.error.value,bm.call(M,b)>=0)throw SyntaxError('catch variable may not be "'+this.error.value+'"');a.scope.check(this.error.value)||a.scope.add(this.error.value,"param");return" catch"+d+"{\n"+this.recovery.compile(a,z)+"\n"+this.tab+"}"}if(!this.ensure&&!this.recovery)return" catch (_error) {}"}.call(this),c=this.ensure?" finally {\n"+this.ensure.compile(a,z)+"\n"+this.tab+"}":"";return""+this.tab+"try {\n"+e+"\n"+this.tab+"}"+(b||"")+c};return b}(e),a.Throw=T=function(a){function b(a){this.expression=a}bl(b,a),b.prototype.children=["expression"],b.prototype.isStatement=Y,b.prototype.jumps=D,b.prototype.makeReturn=S,b.prototype.compileNode=function(a){return this.tab+("throw "+this.expression.compile(a)+";")};return b}(e),a.Existence=l=function(a){function b(a){this.expression=a}bl(b,a),b.prototype.children=["expression"],b.prototype.invert=C,b.prototype.compileNode=function(a){var b,c,d,e;this.expression.front=this.front,d=this.expression.compile(a,x),o.test(d)&&!a.scope.check(d)?(e=this.negated?["===","||"]:["!==","&&"],b=e[0],c=e[1],d="typeof "+d+" "+b+' "undefined" '+c+" "+d+" "+b+" null"):d=""+d+" "+(this.negated?"==":"!=")+" null";return a.level<=v?d:"("+d+")"};return b}(e),a.Parens=H=function(a){function b(a){this.body=a}bl(b,a),b.prototype.children=["body"],b.prototype.unwrap=function(){return this.body},b.prototype.isComplex=function(){return this.body.isComplex()},b.prototype.compileNode=function(a){var b,c,d;d=this.body.unwrap();if(d instanceof W&&d.isAtomic()){d.front=this.front;return d.compile(a)}c=d.compile(a,y),b=a.level<x&&(d instanceof F||d instanceof g||d instanceof n&&d.returns);return b?c:"("+c+")"};return b}(e),a.For=n=function(a){function b(a,b){var c;this.source=b.source,this.guard=b.guard,this.step=b.step,this.name=b.name,this.index=b.index,this.body=f.wrap([a]),this.own=!!b.own,this.object=!!b.object,this.object&&(c=[this.index,this.name],this.name=c[0],this.index=c[1]);if(this.index instanceof W)throw SyntaxError("index cannot be a pattern matching expression");this.range=this.source instanceof W&&this.source.base instanceof J&&!this.source.properties.length,this.pattern=this.name instanceof W;if(this.range&&this.index)throw SyntaxError("indexes do not apply to range loops");if(this.range&&this.pattern)throw SyntaxError("cannot pattern match over range loops");this.returns=!1}bl(b,a),b.prototype.children=["body","source","guard","step"],b.prototype.compileNode=function(a){var b,c,e,g,h,i,j,k,l,m,n,p,q,s,t,u,v,y,B,C,D,E,F,G,I;b=f.wrap([this.body]),n=(I=bc(b.expressions))!=null?I.jumps():void 0,n&&n instanceof K&&(this.returns=!1),C=this.range?this.source.base:this.source,B=a.scope,q=this.name&&this.name.compile(a,w),j=this.index&&this.index.compile(a,w),q&&!this.pattern&&B.find(q),j&&B.find(j),this.returns&&(y=B.freeVariable("results")),k=this.object&&j||B.freeVariable("i"),l=this.range&&q||j||k,m=l!==k?""+l+" = ":"",this.step&&!this.range&&(E=B.freeVariable("step")),this.pattern&&(q=k),G="",h="",c="",i=this.tab+R,this.range?e=C.compile(bd(a,{index:k,name:q,step:this.step})):(F=this.source.compile(a,w),(q||this.own)&&!o.test(F)&&(c=""+this.tab+(t=B.freeVariable("ref"))+" = "+F+";\n",F=t),q&&!this.pattern&&(s=""+q+" = "+F+"["+l+"]"),this.object||(p=B.freeVariable("len"),g=""+m+k+" = 0, "+p+" = "+F+".length",this.step&&(g+=", "+E+" = "+this.step.compile(a,x)),D=""+m+(this.step?""+k+" += "+E:l!==k?"++"+k:""+k+"++"),e=""+g+"; "+k+" < "+p+"; "+D)),this.returns&&(u=""+this.tab+y+" = [];\n",v="\n"+this.tab+"return "+y+";",b.makeReturn(y)),this.guard&&(b.expressions.length>1?b.expressions.unshift(new r((new H(this.guard)).invert(),new A("continue"))):this.guard&&(b=f.wrap([new r(this.guard,b)]))),this.pattern&&b.expressions.unshift(new d(this.name,new A(""+F+"["+l+"]"))),c+=this.pluckDirectCall(a,b),s&&(G="\n"+i+s+";"),this.object&&(e=""+l+" in "+F,this.own&&(h="\n"+i+"if (!"+bh("hasProp")+".call("+F+", "+l+")) continue;")),b=b.compile(bd(a,{indent:i}),z),b&&(b="\n"+b+"\n");return""+c+(u||"")+this.tab+"for ("+e+") {"+h+G+b+this.tab+"}"+(v||"")},b.prototype.pluckDirectCall=function(a,b){var c,e,f,h,i,k,l,m,n,o,p,q,r,s,t;e="",o=b.expressions;for(i=m=0,n=o.length;m<n;i=++m){f=o[i],f=f.unwrapAll();if(!(f instanceof g))continue;l=f.variable.unwrapAll();if(!(l instanceof j||l instanceof W&&((p=l.base)!=null?p.unwrapAll():void 0)instanceof j&&l.properties.length===1&&((q=(r=l.properties[0].name)!=null?r.value:void 0)==="call"||q==="apply")))continue;h=((s=l.base)!=null?s.unwrapAll():void 0)||l,k=new A(a.scope.freeVariable("fn")),c=new W(k),l.base&&(t=[c,l],l.base=t[0],c=t[1]),b.expressions[i]=new g(c,f.args),e+=this.tab+(new d(k,h)).compile(a,z)+";\n"}return e};return b}(X),a.Switch=Q=function(a){function b(a,b,c){this.subject=a,this.cases=b,this.otherwise=c}bl(b,a),b.prototype.children=["subject","cases","otherwise"],b.prototype.isStatement=Y,b.prototype.jumps=function(a){var b,c,d,e,f,g,h;a==null&&(a={block:!0}),f=this.cases;for(d=0,e=f.length;d<e;d++){g=f[d],c=g[0],b=g[1];if(b.jumps(a))return b}return(h=this.otherwise)!=null?h.jumps(a):void 0},b.prototype.makeReturn=function(a){var b,c,d,e,g;e=this.cases;for(c=0,d=e.length;c<d;c++)b=e[c],b[1].makeReturn(a);a&&(this.otherwise||(this.otherwise=new f([new A("void 0")]))),(g=this.otherwise)!=null&&g.makeReturn(a);return this},b.prototype.compileNode=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;i=a.indent+R,j=a.indent=i+R,d=this.tab+("switch ("+(((o=this.subject)!=null?o.compile(a,y):void 0)||!1)+") {\n"),p=this.cases;for(h=k=0,m=p.length;k<m;h=++k){q=p[h],f=q[0],b=q[1],r=bb([f]);for(l=0,n=r.length;l<n;l++)e=r[l],this.subject||(e=e.invert()),d+=i+("case "+e.compile(a,y)+":\n");if(c=b.compile(a,z))d+=c+"\n";if(h===this.cases.length-1&&!this.otherwise)break;g=this.lastNonComment(b.expressions);if(g instanceof K||g instanceof A&&g.jumps()&&g.value!=="debugger")continue;d+=j+"break;\n"}this.otherwise&&this.otherwise.expressions.length&&(d+=i+("default:\n"+this.otherwise.compile(a,z)+"\n"));return d+this.tab+"}"};return b}(e),a.If=r=function(a){function b(a,b,c){this.body=b,c==null&&(c={}),this.condition=c.type==="unless"?a.invert():a,this.elseBody=null,this.isChain=!1,this.soak=c.soak}bl(b,a),b.prototype.children=["condition","body","elseBody"],b.prototype.bodyNode=function(){var a;return(a=this.body)!=null?a.unwrap():void 0},b.prototype.elseBodyNode=function(){var a;return(a=this.elseBody)!=null?a.unwrap():void 0},b.prototype.addElse=function(a){this.isChain?this.elseBodyNode().addElse(a):(this.isChain=a instanceof b,this.elseBody=this.ensureBlock(a));return this},b.prototype.isStatement=function(a){var b;return(a!=null?a.level:void 0)===z||this.bodyNode().isStatement(a)||((b=this.elseBodyNode())!=null?b.isStatement(a):void 0)},b.prototype.jumps=function(a){var b;return this.body.jumps(a)||((b=this.elseBody)!=null?b.jumps(a):void 0)},b.prototype.compileNode=function(a){return this.isStatement(a)?this.compileStatement(a):this.compileExpression(a)},b.prototype.makeReturn=function(a){a&&(this.elseBody||(this.elseBody=new f([new A("void 0")]))),this.body&&(this.body=new f([this.body.makeReturn(a)])),this.elseBody&&(this.elseBody=new f([this.elseBody.makeReturn(a)]));return this},b.prototype.ensureBlock=function(a){return a instanceof f?a:new f([a])},b.prototype.compileStatement=function(a){var c,d,e,f,g;d=$(a,"chainChild"),f=$(a,"isExistentialEquals");if(f)return(new b(this.condition.invert(),this.elseBodyNode(),{type:"if"})).compile(a);e=this.condition.compile(a,y),a.indent+=R,c=this.ensureBlock(this.body),g="if ("+e+") {\n"+c.compile(a)+"\n"+this.tab+"}",d||(g=this.tab+g);if(!this.elseBody)return g;return g+" else "+(this.isChain?(a.indent=this.tab,a.chainChild=!0,this.elseBody.unwrap().compile(a,z)):"{\n"+this.elseBody.compile(a,z)+"\n"+this.tab+"}")},b.prototype.compileExpression=function(a){var b,c,d,e;e=this.condition.compile(a,v),c=this.bodyNode().compile(a,w),b=this.elseBodyNode()?this.elseBodyNode().compile(a,w):"void 0",d=""+e+" ? "+c+" : "+b;return a.level>=v?"("+d+")":d},b.prototype.unfoldSoak=function(){return this.soak&&this};return b}(e),i={wrap:function(a,c,d){var e,h,i,k,l;if(a.jumps())return a;i=new j([],f.wrap([a])),e=[];if((k=a.contains(this.literalArgs))||a.contains(this.literalThis))l=new A(k?"apply":"call"),e=[new A("this")],k&&e.push(new A("arguments")),i=new W(i,[new b(l)]);i.noReturn=d,h=new g(i,e);return c?f.wrap([h]):h},literalArgs:function(a){return a instanceof A&&a.value==="arguments"&&!a.asKey},literalThis:function(a){return a instanceof A&&a.value==="this"&&!a.asKey||a instanceof j&&a.bound||a instanceof g&&a.isSuper}},bg=function(a,b,c){var d;if(!!(d=b[c].unfoldSoak(a))){b[c]=d.body,d.body=new W(b);return d}},V={"extends":function(){return"function(child, parent) { for (var key in parent) { if ("+bh("hasProp")+".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }"},bind:function(){return"function(fn, me){ return function(){ return fn.apply(me, arguments); }; }"},indexOf:function(){return"[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }"},hasProp:function(){return"{}.hasOwnProperty"},slice:function(){return"[].slice"}},z=1,y=2,w=3,v=4,x=5,u=6,R="  ",p="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",o=RegExp("^"+p+"$"),L=/^[+-]?\d+$/,B=RegExp("^(?:("+p+")\\.prototype(?:\\.("+p+")|\\[(\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*')\\]|\\[(0x[\\da-fA-F]+|\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\]))|("+p+")$"),q=/^['"]/,bh=function(a){var b;b="__"+a,N.root.assign(b,V[a]());return b},be=function(a,b){a=a.replace(/\n/g,"$&"+b);return a.replace(/\s+$/,"")}}).call(this)},require["./coffee-script"]=new function(){var a=this;(function(){var b,c,d,e,f,g,h,i,j,k=({}).hasOwnProperty;e=require("fs"),h=require("path"),j=require("./lexer"),b=j.Lexer,c=j.RESERVED,g=require("./parser").parser,i=require("vm"),require.extensions?require.extensions[".coffee"]=function(a,b){var c;c=d(e.readFileSync(b,"utf8"),{filename:b});return a._compile(c,b)}:require.registerExtension&&require.registerExtension(".coffee",function(a){return d(a)}),a.VERSION="1.3.3",a.RESERVED=c,a.helpers=require("./helpers"),a.compile=d=function(b,c){var d,e,h;c==null&&(c={}),h=a.helpers.merge;try{e=g.parse(f.tokenize(b)).compile(c);if(!c.header)return e}catch(i){c.filename&&(i.message="In "+c.filename+", "+i.message);throw i}d="Generated by CoffeeScript "+this.VERSION;return"// "+d+"\n"+e},a.tokens=function(a,b){return f.tokenize(a,b)},a.nodes=function(a,b){return typeof a=="string"?g.parse(f.tokenize(a,b)):g.parse(a)},a.run=function(a,b){var c;b==null&&(b={}),c=require.main,c.filename=process.argv[1]=b.filename?e.realpathSync(b.filename):".",c.moduleCache&&(c.moduleCache={}),c.paths=require("module")._nodeModulePaths(h.dirname(e.realpathSync(b.filename)));return h.extname(c.filename)!==".coffee"||require.extensions?c._compile(d(a,b),c.filename):c._compile(a,c.filename)},a.eval=function(a,b){var c,e,f,g,j,l,m,n,o,p,q,r,s,t;b==null&&(b={});if(!!(a=a.trim())){e=i.Script;if(e){if(b.sandbox!=null){if(b.sandbox instanceof e.createContext().constructor)m=b.sandbox;else{m=e.createContext(),r=b.sandbox;for(g in r){if(!k.call(r,g))continue;n=r[g],m[g]=n}}m.global=m.root=m.GLOBAL=m}else m=global;m.__filename=b.filename||"eval",m.__dirname=h.dirname(m.__filename);if(m===global&&!m.module&&!m.require){c=require("module"),m.module=q=new c(b.modulename||"eval"),m.require=t=function(a){return c._load(a,q,!0)},q.filename=m.__filename,s=Object.getOwnPropertyNames(require);for(o=0,p=s.length;o<p;o++)l=s[o],l!=="paths"&&(t[l]=require[l]);t.paths=q.paths=c._nodeModulePaths(process.cwd()),t.resolve=function(a){return c._resolveFilename(a,q)}}}j={};for(g in b){if(!k.call(b,g))continue;n=b[g],j[g]=n}j.bare=!0,f=d(a,j);return m===global?i.runInThisContext(f):i.runInContext(f,m)}},f=new b,g.lexer={lex:function(){var a,b;b=this.tokens[this.pos++]||[""],a=b[0],this.yytext=b[1],this.yylineno=b[2];return a},setInput:function(a){this.tokens=a;return this.pos=0},upcomingInput:function(){return""}},g.yy=require("./nodes")}).call(this)},require["./browser"]=new function(){var exports=this;(function(){var CoffeeScript,runScripts;CoffeeScript=require("./coffee-script"),CoffeeScript.require=require,CoffeeScript.eval=function(code,options){var _ref;options==null&&(options={}),(_ref=options.bare)==null&&(options.bare=!0);return eval(CoffeeScript.compile(code,options))},CoffeeScript.run=function(a,b){b==null&&(b={}),b.bare=!0;return Function(CoffeeScript.compile(a,b))()};typeof window!="undefined"&&window!==null&&(CoffeeScript.load=function(a,b){var c;c=new(window.ActiveXObject||XMLHttpRequest)("Microsoft.XMLHTTP"),c.open("GET",a,!0),"overrideMimeType"in c&&c.overrideMimeType("text/plain"),c.onreadystatechange=function(){var d;if(c.readyState===4){if((d=c.status)===0||d===200)CoffeeScript.run(c.responseText);else throw new Error("Could not load "+a);if(b)return b()}};return c.send(null)},runScripts=function(){var a,b,c,d,e,f;f=document.getElementsByTagName("script"),a=function(){var a,b,c;c=[];for(a=0,b=f.length;a<b;a++)e=f[a],e.type==="text/coffeescript"&&c.push(e);return c}(),c=0,d=a.length,(b=function(){var d;d=a[c++];if((d!=null?d.type:void 0)==="text/coffeescript"){if(d.src)return CoffeeScript.load(d.src,b);CoffeeScript.run(d.innerHTML);return b()}})();return null},window.addEventListener?addEventListener("DOMContentLoaded",runScripts,!1):attachEvent("onload",runScripts))}).call(this)};return require["./coffee-script"]}();typeof define=="function"&&define.amd?define(function(){return CoffeeScript}):root.CoffeeScript=CoffeeScript})(this)
;
jasmine.HtmlReporterHelpers = {};

jasmine.HtmlReporterHelpers.createDom = function(type, attrs, childrenVarArgs) {
  var el = document.createElement(type);

  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      if (child) {
        el.appendChild(child);
      }
    }
  }

  for (var attr in attrs) {
    if (attr == "className") {
      el[attr] = attrs[attr];
    } else {
      el.setAttribute(attr, attrs[attr]);
    }
  }

  return el;
};

jasmine.HtmlReporterHelpers.getSpecStatus = function(child) {
  var results = child.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.skipped) {
    status = 'skipped';
  }

  return status;
};

jasmine.HtmlReporterHelpers.appendToSummary = function(child, childElement) {
  var parentDiv = this.dom.summary;
  var parentSuite = (typeof child.parentSuite == 'undefined') ? 'suite' : 'parentSuite';
  var parent = child[parentSuite];

  if (parent) {
    if (typeof this.views.suites[parent.id] == 'undefined') {
      this.views.suites[parent.id] = new jasmine.HtmlReporter.SuiteView(parent, this.dom, this.views);
    }
    parentDiv = this.views.suites[parent.id].element;
  }

  parentDiv.appendChild(childElement);
};


jasmine.HtmlReporterHelpers.addHelpers = function(ctor) {
  for(var fn in jasmine.HtmlReporterHelpers) {
    ctor.prototype[fn] = jasmine.HtmlReporterHelpers[fn];
  }
};

jasmine.HtmlReporter = function(_doc) {
  var self = this;
  var doc = _doc || window.document;

  var reporterView;

  var dom = {};

  // Jasmine Reporter Public Interface
  self.logRunningSpecs = false;

  self.reportRunnerStarting = function(runner) {
    var specs = runner.specs() || [];

    if (specs.length == 0) {
      return;
    }

    createReporterDom(runner.env.versionString());
    doc.body.appendChild(dom.reporter);
    setExceptionHandling();

    reporterView = new jasmine.HtmlReporter.ReporterView(dom);
    reporterView.addSpecs(specs, self.specFilter);
  };

  self.reportRunnerResults = function(runner) {
    reporterView && reporterView.complete();
  };

  self.reportSuiteResults = function(suite) {
    reporterView.suiteComplete(suite);
  };

  self.reportSpecStarting = function(spec) {
    if (self.logRunningSpecs) {
      self.log('>> Jasmine Running ' + spec.suite.description + ' ' + spec.description + '...');
    }
  };

  self.reportSpecResults = function(spec) {
    reporterView.specComplete(spec);
  };

  self.log = function() {
    var console = jasmine.getGlobal().console;
    if (console && console.log) {
      if (console.log.apply) {
        console.log.apply(console, arguments);
      } else {
        console.log(arguments); // ie fix: console.log.apply doesn't exist on ie
      }
    }
  };

  self.specFilter = function(spec) {
    if (!focusedSpecName()) {
      return true;
    }

    return spec.getFullName().indexOf(focusedSpecName()) === 0;
  };

  return self;

  function focusedSpecName() {
    var specName;

    (function memoizeFocusedSpec() {
      if (specName) {
        return;
      }

      var paramMap = [];
      var params = jasmine.HtmlReporter.parameters(doc);

      for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
      }

      specName = paramMap.spec;
    })();

    return specName;
  }

  function createReporterDom(version) {
    dom.reporter = self.createDom('div', { id: 'HTMLReporter', className: 'jasmine_reporter' },
      dom.banner = self.createDom('div', { className: 'banner' },
        self.createDom('span', { className: 'title' }, "Jasmine "),
        self.createDom('span', { className: 'version' }, version)),

      dom.symbolSummary = self.createDom('ul', {className: 'symbolSummary'}),
      dom.alert = self.createDom('div', {className: 'alert'},
        self.createDom('span', { className: 'exceptions' },
          self.createDom('label', { className: 'label', 'for': 'no_try_catch' }, 'No try/catch'),
          self.createDom('input', { id: 'no_try_catch', type: 'checkbox' }))),
      dom.results = self.createDom('div', {className: 'results'},
        dom.summary = self.createDom('div', { className: 'summary' }),
        dom.details = self.createDom('div', { id: 'details' }))
    );
  }

  function noTryCatch() {
    return window.location.search.match(/catch=false/);
  }

  function searchWithCatch() {
    var params = jasmine.HtmlReporter.parameters(window.document);
    var removed = false;
    var i = 0;

    while (!removed && i < params.length) {
      if (params[i].match(/catch=/)) {
        params.splice(i, 1);
        removed = true;
      }
      i++;
    }
    if (jasmine.CATCH_EXCEPTIONS) {
      params.push("catch=false");
    }

    return params.join("&");
  }

  function setExceptionHandling() {
    var chxCatch = document.getElementById('no_try_catch');

    if (noTryCatch()) {
      chxCatch.setAttribute('checked', true);
      jasmine.CATCH_EXCEPTIONS = false;
    }
    chxCatch.onclick = function() {
      window.location.search = searchWithCatch();
    };
  }
};
jasmine.HtmlReporter.parameters = function(doc) {
  var paramStr = doc.location.search.substring(1);
  var params = [];

  if (paramStr.length > 0) {
    params = paramStr.split('&');
  }
  return params;
}
jasmine.HtmlReporter.sectionLink = function(sectionName) {
  var link = '?';
  var params = [];

  if (sectionName) {
    params.push('spec=' + encodeURIComponent(sectionName));
  }
  if (!jasmine.CATCH_EXCEPTIONS) {
    params.push("catch=false");
  }
  if (params.length > 0) {
    link += params.join("&");
  }

  return link;
};
jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter);
jasmine.HtmlReporter.ReporterView = function(dom) {
  this.startedAt = new Date();
  this.runningSpecCount = 0;
  this.completeSpecCount = 0;
  this.passedCount = 0;
  this.failedCount = 0;
  this.skippedCount = 0;

  this.createResultsMenu = function() {
    this.resultsMenu = this.createDom('span', {className: 'resultsMenu bar'},
      this.summaryMenuItem = this.createDom('a', {className: 'summaryMenuItem', href: "#"}, '0 specs'),
      ' | ',
      this.detailsMenuItem = this.createDom('a', {className: 'detailsMenuItem', href: "#"}, '0 failing'));

    this.summaryMenuItem.onclick = function() {
      dom.reporter.className = dom.reporter.className.replace(/ showDetails/g, '');
    };

    this.detailsMenuItem.onclick = function() {
      showDetails();
    };
  };

  this.addSpecs = function(specs, specFilter) {
    this.totalSpecCount = specs.length;

    this.views = {
      specs: {},
      suites: {}
    };

    for (var i = 0; i < specs.length; i++) {
      var spec = specs[i];
      this.views.specs[spec.id] = new jasmine.HtmlReporter.SpecView(spec, dom, this.views);
      if (specFilter(spec)) {
        this.runningSpecCount++;
      }
    }
  };

  this.specComplete = function(spec) {
    this.completeSpecCount++;

    if (isUndefined(this.views.specs[spec.id])) {
      this.views.specs[spec.id] = new jasmine.HtmlReporter.SpecView(spec, dom);
    }

    var specView = this.views.specs[spec.id];

    switch (specView.status()) {
      case 'passed':
        this.passedCount++;
        break;

      case 'failed':
        this.failedCount++;
        break;

      case 'skipped':
        this.skippedCount++;
        break;
    }

    specView.refresh();
    this.refresh();
  };

  this.suiteComplete = function(suite) {
    var suiteView = this.views.suites[suite.id];
    if (isUndefined(suiteView)) {
      return;
    }
    suiteView.refresh();
  };

  this.refresh = function() {

    if (isUndefined(this.resultsMenu)) {
      this.createResultsMenu();
    }

    // currently running UI
    if (isUndefined(this.runningAlert)) {
      this.runningAlert = this.createDom('a', { href: jasmine.HtmlReporter.sectionLink(), className: "runningAlert bar" });
      dom.alert.appendChild(this.runningAlert);
    }
    this.runningAlert.innerHTML = "Running " + this.completeSpecCount + " of " + specPluralizedFor(this.totalSpecCount);

    // skipped specs UI
    if (isUndefined(this.skippedAlert)) {
      this.skippedAlert = this.createDom('a', { href: jasmine.HtmlReporter.sectionLink(), className: "skippedAlert bar" });
    }

    this.skippedAlert.innerHTML = "Skipping " + this.skippedCount + " of " + specPluralizedFor(this.totalSpecCount) + " - run all";

    if (this.skippedCount === 1 && isDefined(dom.alert)) {
      dom.alert.appendChild(this.skippedAlert);
    }

    // passing specs UI
    if (isUndefined(this.passedAlert)) {
      this.passedAlert = this.createDom('span', { href: jasmine.HtmlReporter.sectionLink(), className: "passingAlert bar" });
    }
    this.passedAlert.innerHTML = "Passing " + specPluralizedFor(this.passedCount);

    // failing specs UI
    if (isUndefined(this.failedAlert)) {
      this.failedAlert = this.createDom('span', {href: "?", className: "failingAlert bar"});
    }
    this.failedAlert.innerHTML = "Failing " + specPluralizedFor(this.failedCount);

    if (this.failedCount === 1 && isDefined(dom.alert)) {
      dom.alert.appendChild(this.failedAlert);
      dom.alert.appendChild(this.resultsMenu);
    }

    // summary info
    this.summaryMenuItem.innerHTML = "" + specPluralizedFor(this.runningSpecCount);
    this.detailsMenuItem.innerHTML = "" + this.failedCount + " failing";
  };

  this.complete = function() {
    dom.alert.removeChild(this.runningAlert);

    this.skippedAlert.innerHTML = "Ran " + this.runningSpecCount + " of " + specPluralizedFor(this.totalSpecCount) + " - run all";

    if (this.failedCount === 0) {
      dom.alert.appendChild(this.createDom('span', {className: 'passingAlert bar'}, "Passing " + specPluralizedFor(this.passedCount)));
    } else {
      showDetails();
    }

    dom.banner.appendChild(this.createDom('span', {className: 'duration'}, "finished in " + ((new Date().getTime() - this.startedAt.getTime()) / 1000) + "s"));
  };

  return this;

  function showDetails() {
    if (dom.reporter.className.search(/showDetails/) === -1) {
      dom.reporter.className += " showDetails";
    }
  }

  function isUndefined(obj) {
    return typeof obj === 'undefined';
  }

  function isDefined(obj) {
    return !isUndefined(obj);
  }

  function specPluralizedFor(count) {
    var str = count + " spec";
    if (count > 1) {
      str += "s"
    }
    return str;
  }

};

jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.ReporterView);


jasmine.HtmlReporter.SpecView = function(spec, dom, views) {
  this.spec = spec;
  this.dom = dom;
  this.views = views;

  this.symbol = this.createDom('li', { className: 'pending' });
  this.dom.symbolSummary.appendChild(this.symbol);

  this.summary = this.createDom('div', { className: 'specSummary' },
    this.createDom('a', {
      className: 'description',
      href: jasmine.HtmlReporter.sectionLink(this.spec.getFullName()),
      title: this.spec.getFullName()
    }, this.spec.description)
  );

  this.detail = this.createDom('div', { className: 'specDetail' },
      this.createDom('a', {
        className: 'description',
        href: '?spec=' + encodeURIComponent(this.spec.getFullName()),
        title: this.spec.getFullName()
      }, this.spec.getFullName())
  );
};

jasmine.HtmlReporter.SpecView.prototype.status = function() {
  return this.getSpecStatus(this.spec);
};

jasmine.HtmlReporter.SpecView.prototype.refresh = function() {
  this.symbol.className = this.status();

  switch (this.status()) {
    case 'skipped':
      break;

    case 'passed':
      this.appendSummaryToSuiteDiv();
      break;

    case 'failed':
      this.appendSummaryToSuiteDiv();
      this.appendFailureDetail();
      break;
  }
};

jasmine.HtmlReporter.SpecView.prototype.appendSummaryToSuiteDiv = function() {
  this.summary.className += ' ' + this.status();
  this.appendToSummary(this.spec, this.summary);
};

jasmine.HtmlReporter.SpecView.prototype.appendFailureDetail = function() {
  this.detail.className += ' ' + this.status();

  var resultItems = this.spec.results().getItems();
  var messagesDiv = this.createDom('div', { className: 'messages' });

  for (var i = 0; i < resultItems.length; i++) {
    var result = resultItems[i];

    if (result.type == 'log') {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage log'}, result.toString()));
    } else if (result.type == 'expect' && result.passed && !result.passed()) {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage fail'}, result.message));

      if (result.trace.stack) {
        messagesDiv.appendChild(this.createDom('div', {className: 'stackTrace'}, result.trace.stack));
      }
    }
  }

  if (messagesDiv.childNodes.length > 0) {
    this.detail.appendChild(messagesDiv);
    this.dom.details.appendChild(this.detail);
  }
};

jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.SpecView);jasmine.HtmlReporter.SuiteView = function(suite, dom, views) {
  this.suite = suite;
  this.dom = dom;
  this.views = views;

  this.element = this.createDom('div', { className: 'suite' },
    this.createDom('a', { className: 'description', href: jasmine.HtmlReporter.sectionLink(this.suite.getFullName()) }, this.suite.description)
  );

  this.appendToSummary(this.suite, this.element);
};

jasmine.HtmlReporter.SuiteView.prototype.status = function() {
  return this.getSpecStatus(this.suite);
};

jasmine.HtmlReporter.SuiteView.prototype.refresh = function() {
  this.element.className += " " + this.status();
};

jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.SuiteView);

/* @deprecated Use jasmine.HtmlReporter instead
 */
jasmine.TrivialReporter = function(doc) {
  this.document = doc || document;
  this.suiteDivs = {};
  this.logRunningSpecs = false;
};

jasmine.TrivialReporter.prototype.createDom = function(type, attrs, childrenVarArgs) {
  var el = document.createElement(type);

  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      if (child) { el.appendChild(child); }
    }
  }

  for (var attr in attrs) {
    if (attr == "className") {
      el[attr] = attrs[attr];
    } else {
      el.setAttribute(attr, attrs[attr]);
    }
  }

  return el;
};

jasmine.TrivialReporter.prototype.reportRunnerStarting = function(runner) {
  var showPassed, showSkipped;

  this.outerDiv = this.createDom('div', { id: 'TrivialReporter', className: 'jasmine_reporter' },
      this.createDom('div', { className: 'banner' },
        this.createDom('div', { className: 'logo' },
            this.createDom('span', { className: 'title' }, "Jasmine"),
            this.createDom('span', { className: 'version' }, runner.env.versionString())),
        this.createDom('div', { className: 'options' },
            "Show ",
            showPassed = this.createDom('input', { id: "__jasmine_TrivialReporter_showPassed__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showPassed__" }, " passed "),
            showSkipped = this.createDom('input', { id: "__jasmine_TrivialReporter_showSkipped__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showSkipped__" }, " skipped")
            )
          ),

      this.runnerDiv = this.createDom('div', { className: 'runner running' },
          this.createDom('a', { className: 'run_spec', href: '?' }, "run all"),
          this.runnerMessageSpan = this.createDom('span', {}, "Running..."),
          this.finishedAtSpan = this.createDom('span', { className: 'finished-at' }, ""))
      );

  this.document.body.appendChild(this.outerDiv);

  var suites = runner.suites();
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];
    var suiteDiv = this.createDom('div', { className: 'suite' },
        this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, "run"),
        this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, suite.description));
    this.suiteDivs[suite.id] = suiteDiv;
    var parentDiv = this.outerDiv;
    if (suite.parentSuite) {
      parentDiv = this.suiteDivs[suite.parentSuite.id];
    }
    parentDiv.appendChild(suiteDiv);
  }

  this.startedAt = new Date();

  var self = this;
  showPassed.onclick = function(evt) {
    if (showPassed.checked) {
      self.outerDiv.className += ' show-passed';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-passed/, '');
    }
  };

  showSkipped.onclick = function(evt) {
    if (showSkipped.checked) {
      self.outerDiv.className += ' show-skipped';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-skipped/, '');
    }
  };
};

jasmine.TrivialReporter.prototype.reportRunnerResults = function(runner) {
  var results = runner.results();
  var className = (results.failedCount > 0) ? "runner failed" : "runner passed";
  this.runnerDiv.setAttribute("class", className);
  //do it twice for IE
  this.runnerDiv.setAttribute("className", className);
  var specs = runner.specs();
  var specCount = 0;
  for (var i = 0; i < specs.length; i++) {
    if (this.specFilter(specs[i])) {
      specCount++;
    }
  }
  var message = "" + specCount + " spec" + (specCount == 1 ? "" : "s" ) + ", " + results.failedCount + " failure" + ((results.failedCount == 1) ? "" : "s");
  message += " in " + ((new Date().getTime() - this.startedAt.getTime()) / 1000) + "s";
  this.runnerMessageSpan.replaceChild(this.createDom('a', { className: 'description', href: '?'}, message), this.runnerMessageSpan.firstChild);

  this.finishedAtSpan.appendChild(document.createTextNode("Finished at " + new Date().toString()));
};

jasmine.TrivialReporter.prototype.reportSuiteResults = function(suite) {
  var results = suite.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.totalCount === 0) { // todo: change this to check results.skipped
    status = 'skipped';
  }
  this.suiteDivs[suite.id].className += " " + status;
};

jasmine.TrivialReporter.prototype.reportSpecStarting = function(spec) {
  if (this.logRunningSpecs) {
    this.log('>> Jasmine Running ' + spec.suite.description + ' ' + spec.description + '...');
  }
};

jasmine.TrivialReporter.prototype.reportSpecResults = function(spec) {
  var results = spec.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.skipped) {
    status = 'skipped';
  }
  var specDiv = this.createDom('div', { className: 'spec '  + status },
      this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(spec.getFullName()) }, "run"),
      this.createDom('a', {
        className: 'description',
        href: '?spec=' + encodeURIComponent(spec.getFullName()),
        title: spec.getFullName()
      }, spec.description));


  var resultItems = results.getItems();
  var messagesDiv = this.createDom('div', { className: 'messages' });
  for (var i = 0; i < resultItems.length; i++) {
    var result = resultItems[i];

    if (result.type == 'log') {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage log'}, result.toString()));
    } else if (result.type == 'expect' && result.passed && !result.passed()) {
      messagesDiv.appendChild(this.createDom('div', {className: 'resultMessage fail'}, result.message));

      if (result.trace.stack) {
        messagesDiv.appendChild(this.createDom('div', {className: 'stackTrace'}, result.trace.stack));
      }
    }
  }

  if (messagesDiv.childNodes.length > 0) {
    specDiv.appendChild(messagesDiv);
  }

  this.suiteDivs[spec.suite.id].appendChild(specDiv);
};

jasmine.TrivialReporter.prototype.log = function() {
  var console = jasmine.getGlobal().console;
  if (console && console.log) {
    if (console.log.apply) {
      console.log.apply(console, arguments);
    } else {
      console.log(arguments); // ie fix: console.log.apply doesn't exist on ie
    }
  }
};

jasmine.TrivialReporter.prototype.getLocation = function() {
  return this.document.location;
};

jasmine.TrivialReporter.prototype.specFilter = function(spec) {
  var paramMap = {};
  var params = this.getLocation().search.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var p = params[i].split('=');
    paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
  }

  if (!paramMap.spec) {
    return true;
  }
  return spec.getFullName().indexOf(paramMap.spec) === 0;
};
/*!
Jasmine-jQuery: a set of jQuery helpers for Jasmine tests.

Version 1.7.0

https://github.com/velesin/jasmine-jquery

Copyright (c) 2010-2013 Wojciech Zawistowski, Travis Jeffery

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


+function (jasmine, $) { "use strict";

  jasmine.spiedEventsKey = function (selector, eventName) {
    return [$(selector).selector, eventName].toString()
  }

  jasmine.getFixtures = function () {
    return jasmine.currentFixtures_ = jasmine.currentFixtures_ || new jasmine.Fixtures()
  }

  jasmine.getStyleFixtures = function () {
    return jasmine.currentStyleFixtures_ = jasmine.currentStyleFixtures_ || new jasmine.StyleFixtures()
  }

  jasmine.Fixtures = function () {
    this.containerId = 'jasmine-fixtures'
    this.fixturesCache_ = {}
    this.fixturesPath = 'spec/javascripts/fixtures'
  }

  jasmine.Fixtures.prototype.set = function (html) {
    this.cleanUp()
    return this.createContainer_(html)
  }

  jasmine.Fixtures.prototype.appendSet= function (html) {
    this.addToContainer_(html)
  }

  jasmine.Fixtures.prototype.preload = function () {
    this.read.apply(this, arguments)
  }

  jasmine.Fixtures.prototype.load = function () {
    this.cleanUp()
    this.createContainer_(this.read.apply(this, arguments))
  }

  jasmine.Fixtures.prototype.appendLoad = function () {
    this.addToContainer_(this.read.apply(this, arguments))
  }

  jasmine.Fixtures.prototype.read = function () {
    var htmlChunks = []
      , fixtureUrls = arguments

    for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
      htmlChunks.push(this.getFixtureHtml_(fixtureUrls[urlIndex]))
    }

    return htmlChunks.join('')
  }

  jasmine.Fixtures.prototype.clearCache = function () {
    this.fixturesCache_ = {}
  }

  jasmine.Fixtures.prototype.cleanUp = function () {
    $('#' + this.containerId).remove()
  }

  jasmine.Fixtures.prototype.sandbox = function (attributes) {
    var attributesToSet = attributes || {}
    return $('<div id="sandbox" />').attr(attributesToSet)
  }

  jasmine.Fixtures.prototype.createContainer_ = function (html) {
    var container = $('<div>')
    .attr('id', this.containerId)
    .html(html)

    $(document.body).append(container)
    return container
  }

  jasmine.Fixtures.prototype.addToContainer_ = function (html){
    var container = $(document.body).find('#'+this.containerId).append(html)
    if(!container.length){
      this.createContainer_(html)
    }
  }

  jasmine.Fixtures.prototype.getFixtureHtml_ = function (url) {
    if (typeof this.fixturesCache_[url] === 'undefined') {
      this.loadFixtureIntoCache_(url)
    }
    return this.fixturesCache_[url]
  }

  jasmine.Fixtures.prototype.loadFixtureIntoCache_ = function (relativeUrl) {
    var self = this
      , url = this.makeFixtureUrl_(relativeUrl)
      , request = $.ajax({
        async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded
        cache: false,
        url: url,
        success: function (data, status, $xhr) {
          self.fixturesCache_[relativeUrl] = $xhr.responseText
        },
        error: function (jqXHR, status, errorThrown) {
          throw new Error('Fixture could not be loaded: ' + url + ' (status: ' + status + ', message: ' + errorThrown.message + ')')
        }
      })
  }

  jasmine.Fixtures.prototype.makeFixtureUrl_ = function (relativeUrl){
    return this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl
  }

  jasmine.Fixtures.prototype.proxyCallTo_ = function (methodName, passedArguments) {
    return this[methodName].apply(this, passedArguments)
  }


  jasmine.StyleFixtures = function () {
    this.fixturesCache_ = {}
    this.fixturesNodes_ = []
    this.fixturesPath = 'spec/javascripts/fixtures'
  }

  jasmine.StyleFixtures.prototype.set = function (css) {
    this.cleanUp()
    this.createStyle_(css)
  }

  jasmine.StyleFixtures.prototype.appendSet = function (css) {
    this.createStyle_(css)
  }

  jasmine.StyleFixtures.prototype.preload = function () {
    this.read_.apply(this, arguments)
  }

  jasmine.StyleFixtures.prototype.load = function () {
    this.cleanUp()
    this.createStyle_(this.read_.apply(this, arguments))
  }

  jasmine.StyleFixtures.prototype.appendLoad = function () {
    this.createStyle_(this.read_.apply(this, arguments))
  }

  jasmine.StyleFixtures.prototype.cleanUp = function () {
    while(this.fixturesNodes_.length) {
      this.fixturesNodes_.pop().remove()
    }
  }

  jasmine.StyleFixtures.prototype.createStyle_ = function (html) {
    var styleText = $('<div></div>').html(html).text()
      , style = $('<style>' + styleText + '</style>')

    this.fixturesNodes_.push(style)
    $('head').append(style)
  }

  jasmine.StyleFixtures.prototype.clearCache = jasmine.Fixtures.prototype.clearCache
  jasmine.StyleFixtures.prototype.read_ = jasmine.Fixtures.prototype.read
  jasmine.StyleFixtures.prototype.getFixtureHtml_ = jasmine.Fixtures.prototype.getFixtureHtml_
  jasmine.StyleFixtures.prototype.loadFixtureIntoCache_ = jasmine.Fixtures.prototype.loadFixtureIntoCache_
  jasmine.StyleFixtures.prototype.makeFixtureUrl_ = jasmine.Fixtures.prototype.makeFixtureUrl_
  jasmine.StyleFixtures.prototype.proxyCallTo_ = jasmine.Fixtures.prototype.proxyCallTo_

  jasmine.getJSONFixtures = function () {
    return jasmine.currentJSONFixtures_ = jasmine.currentJSONFixtures_ || new jasmine.JSONFixtures()
  }

  jasmine.JSONFixtures = function () {
    this.fixturesCache_ = {}
    this.fixturesPath = 'spec/javascripts/fixtures/json'
  }

  jasmine.JSONFixtures.prototype.load = function () {
    this.read.apply(this, arguments)
    return this.fixturesCache_
  }

  jasmine.JSONFixtures.prototype.read = function () {
    var fixtureUrls = arguments

    for(var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
      this.getFixtureData_(fixtureUrls[urlIndex])
    }

    return this.fixturesCache_
  }

  jasmine.JSONFixtures.prototype.clearCache = function () {
    this.fixturesCache_ = {}
  }

  jasmine.JSONFixtures.prototype.getFixtureData_ = function (url) {
    if (!this.fixturesCache_[url]) this.loadFixtureIntoCache_(url)
    return this.fixturesCache_[url]
  }

  jasmine.JSONFixtures.prototype.loadFixtureIntoCache_ = function (relativeUrl) {
    var self = this
      , url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl

    $.ajax({
      async: false, // must be synchronous to guarantee that no tests are run before fixture is loaded
      cache: false,
      dataType: 'json',
      url: url,
      success: function (data) {
        self.fixturesCache_[relativeUrl] = data
      },
      error: function (jqXHR, status, errorThrown) {
        throw new Error('JSONFixture could not be loaded: ' + url + ' (status: ' + status + ', message: ' + errorThrown.message + ')')
      }
    })
  }

  jasmine.JSONFixtures.prototype.proxyCallTo_ = function (methodName, passedArguments) {
    return this[methodName].apply(this, passedArguments)
  }

  jasmine.jQuery = function () {}

  jasmine.jQuery.browserTagCaseIndependentHtml = function (html) {
    return $('<div/>').append(html).html()
  }

  jasmine.jQuery.elementToString = function (element) {
    return $(element).map(function () { return this.outerHTML; }).toArray().join(', ')
  }

  jasmine.jQuery.matchersClass = {}

  var data = {
      spiedEvents: {}
    , handlers:    []
  }

  jasmine.jQuery.events = {
    spyOn: function (selector, eventName) {
      var handler = function (e) {
        data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)] = jasmine.util.argsToArray(arguments)
      }

      $(selector).on(eventName, handler)
      data.handlers.push(handler)

      return {
        selector: selector,
        eventName: eventName,
        handler: handler,
        reset: function (){
          delete data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]
        }
      }
    },

    args: function (selector, eventName) {
      var actualArgs = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]

      if (!actualArgs) {
        throw "There is no spy for " + eventName + " on " + selector.toString() + ". Make sure to create a spy using spyOnEvent."
      }

      return actualArgs
    },

    wasTriggered: function (selector, eventName) {
      return !!(data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)])
    },

    wasTriggeredWith: function (selector, eventName, expectedArgs, env) {
      var actualArgs = jasmine.jQuery.events.args(selector, eventName).slice(1)
      if (Object.prototype.toString.call(expectedArgs) !== '[object Array]') {
        actualArgs = actualArgs[0]
      }
      return env.equals_(expectedArgs, actualArgs)
    },

    wasPrevented: function (selector, eventName) {
      var args = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]
        , e = args ? args[0] : undefined

      return e && e.isDefaultPrevented()
    },

    wasStopped: function (selector, eventName) {
      var args = data.spiedEvents[jasmine.spiedEventsKey(selector, eventName)]
        , e = args ? args[0] : undefined
      return e && e.isPropagationStopped()
    },

    cleanUp: function () {
      data.spiedEvents = {}
      data.handlers    = []
    }
  }

  var jQueryMatchers = {
    toHaveClass: function (className) {
      return this.actual.hasClass(className)
    },

    toHaveCss: function (css){
      for (var prop in css){
        var value = css[prop]
        // see issue #147 on gh
        ;if (value === 'auto' && this.actual.get(0).style[prop] === 'auto') continue
        if (this.actual.css(prop) !== value) return false
      }
      return true
    },

    toBeVisible: function () {
      return this.actual.is(':visible')
    },

    toBeHidden: function () {
      return this.actual.is(':hidden')
    },

    toBeSelected: function () {
      return this.actual.is(':selected')
    },

    toBeChecked: function () {
      return this.actual.is(':checked')
    },

    toBeEmpty: function () {
      return this.actual.is(':empty')
    },

    toBeInDOM: function () {
      return $.contains(document.documentElement, this.actual[0])
    },

    toExist: function () {
      return this.actual.length
    },

    toHaveLength: function (length) {
      return this.actual.length === length
    },

    toHaveAttr: function (attributeName, expectedAttributeValue) {
      return hasProperty(this.actual.attr(attributeName), expectedAttributeValue)
    },

    toHaveProp: function (propertyName, expectedPropertyValue) {
      return hasProperty(this.actual.prop(propertyName), expectedPropertyValue)
    },

    toHaveId: function (id) {
      return this.actual.attr('id') == id
    },

    toHaveHtml: function (html) {
      return this.actual.html() == jasmine.jQuery.browserTagCaseIndependentHtml(html)
    },

    toContainHtml: function (html){
      var actualHtml = this.actual.html()
        , expectedHtml = jasmine.jQuery.browserTagCaseIndependentHtml(html)

      return (actualHtml.indexOf(expectedHtml) >= 0)
    },

    toHaveText: function (text) {
      var trimmedText = $.trim(this.actual.text())

      if (text && $.isFunction(text.test)) {
        return text.test(trimmedText)
      } else {
        return trimmedText == text
      }
    },

    toContainText: function (text) {
      var trimmedText = $.trim(this.actual.text())

      if (text && $.isFunction(text.test)) {
        return text.test(trimmedText)
      } else {
        return trimmedText.indexOf(text) != -1
      }
    },

    toHaveValue: function (value) {
      return this.actual.val() === value
    },

    toHaveData: function (key, expectedValue) {
      return hasProperty(this.actual.data(key), expectedValue)
    },

    toBe: function (selector) {
      return this.actual.is(selector)
    },

    toContain: function (selector) {
      return this.actual.find(selector).length
    },

    toBeMatchedBy: function (selector) {
      return this.actual.filter(selector).length
    },

    toBeDisabled: function (selector){
      return this.actual.is(':disabled')
    },

    toBeFocused: function (selector) {
      return this.actual[0] === this.actual[0].ownerDocument.activeElement
    },

    toHandle: function (event) {
      var events = $._data(this.actual.get(0), "events")

      if(!events || !event || typeof event !== "string") {
        return false
      }

      var namespaces = event.split(".")
        , eventType = namespaces.shift()
        , sortedNamespaces = namespaces.slice(0).sort()
        , namespaceRegExp = new RegExp("(^|\\.)" + sortedNamespaces.join("\\.(?:.*\\.)?") + "(\\.|$)")

      if(events[eventType] && namespaces.length) {
        for(var i = 0; i < events[eventType].length; i++) {
          var namespace = events[eventType][i].namespace

          if(namespaceRegExp.test(namespace)) {
            return true
          }
        }
      } else {
        return events[eventType] && events[eventType].length > 0
      }
    },

    toHandleWith: function (eventName, eventHandler) {
      var normalizedEventName = eventName.split('.')[0]
        , stack = $._data(this.actual.get(0), "events")[normalizedEventName]

      for (var i = 0; i < stack.length; i++) {
        if (stack[i].handler == eventHandler) return true
      }

      return false
    }
  }

  var hasProperty = function (actualValue, expectedValue) {
    if (expectedValue === undefined) return actualValue !== undefined

    return actualValue === expectedValue
  }

  var bindMatcher = function (methodName) {
    var builtInMatcher = jasmine.Matchers.prototype[methodName]

    jasmine.jQuery.matchersClass[methodName] = function () {
      if (this.actual
        && (this.actual instanceof $
          || jasmine.isDomNode(this.actual))) {
            this.actual = $(this.actual)
            var result = jQueryMatchers[methodName].apply(this, arguments)
              , element

            if (this.actual.get && (element = this.actual.get()[0]) && !$.isWindow(element) && element.tagName !== "HTML")
              this.actual = jasmine.jQuery.elementToString(this.actual)

            return result
          }

          if (builtInMatcher) {
            return builtInMatcher.apply(this, arguments)
          }

          return false
    }
  }

  for(var methodName in jQueryMatchers) {
    bindMatcher(methodName)
  }

  beforeEach(function () {
    this.addMatchers(jasmine.jQuery.matchersClass)
    this.addMatchers({
      toHaveBeenTriggeredOn: function (selector) {
        this.message = function () {
          return [
            "Expected event " + this.actual + " to have been triggered on " + selector,
            "Expected event " + this.actual + " not to have been triggered on " + selector
          ]
        }
        return jasmine.jQuery.events.wasTriggered(selector, this.actual)
      }
    })

    this.addMatchers({
      toHaveBeenTriggered: function (){
        var eventName = this.actual.eventName
          , selector = this.actual.selector

        this.message = function () {
          return [
            "Expected event " + eventName + " to have been triggered on " + selector,
            "Expected event " + eventName + " not to have been triggered on " + selector
          ]
        }

        return jasmine.jQuery.events.wasTriggered(selector, eventName)
      }
    })

    this.addMatchers({
      toHaveBeenTriggeredOnAndWith: function () {
        var selector = arguments[0]
          , expectedArgs = arguments[1]
          , wasTriggered = jasmine.jQuery.events.wasTriggered(selector, this.actual)

        this.message = function () {
          if (wasTriggered) {
            var actualArgs = jasmine.jQuery.events.args(selector, this.actual, expectedArgs)[1]
            return [
              "Expected event " + this.actual + " to have been triggered with " + jasmine.pp(expectedArgs) + "  but it was triggered with " + jasmine.pp(actualArgs),
              "Expected event " + this.actual + " not to have been triggered with " + jasmine.pp(expectedArgs) + " but it was triggered with " + jasmine.pp(actualArgs)
            ]
          } else {
            return [
              "Expected event " + this.actual + " to have been triggered on " + selector,
              "Expected event " + this.actual + " not to have been triggered on " + selector
            ]
          }
        }

        return wasTriggered && jasmine.jQuery.events.wasTriggeredWith(selector, this.actual, expectedArgs, this.env)
      }
    })

    this.addMatchers({
      toHaveBeenPreventedOn: function (selector) {
        this.message = function () {
          return [
            "Expected event " + this.actual + " to have been prevented on " + selector,
            "Expected event " + this.actual + " not to have been prevented on " + selector
          ]
        }

        return jasmine.jQuery.events.wasPrevented(selector, this.actual)
      }
    })

    this.addMatchers({
      toHaveBeenPrevented: function () {
        var eventName = this.actual.eventName
          , selector = this.actual.selector
        this.message = function () {
          return [
            "Expected event " + eventName + " to have been prevented on " + selector,
            "Expected event " + eventName + " not to have been prevented on " + selector
          ]
        }

        return jasmine.jQuery.events.wasPrevented(selector, eventName)
      }
    })

    this.addMatchers({
      toHaveBeenStoppedOn: function (selector) {
        this.message = function () {
          return [
            "Expected event " + this.actual + " to have been stopped on " + selector,
            "Expected event " + this.actual + " not to have been stopped on " + selector
          ]
        }

        return jasmine.jQuery.events.wasStopped(selector, this.actual)
      }
    })

    this.addMatchers({
      toHaveBeenStopped: function () {
        var eventName = this.actual.eventName
          , selector = this.actual.selector
        this.message = function () {
          return [
            "Expected event " + eventName + " to have been stopped on " + selector,
            "Expected event " + eventName + " not to have been stopped on " + selector
          ]
        }
        return jasmine.jQuery.events.wasStopped(selector, eventName)
      }
    })

    jasmine.getEnv().addEqualityTester(function (a, b) {
      if(a instanceof $ && b instanceof $) {
        if(a.size() != b.size()) {
          return jasmine.undefined
        }
        else if(a.is(b)) {
          return true
        }
      }

      return jasmine.undefined
    })
  })

  afterEach(function () {
    jasmine.getFixtures().cleanUp()
    jasmine.getStyleFixtures().cleanUp()
    jasmine.jQuery.events.cleanUp()
  })

  window.readFixtures = function () {
    return jasmine.getFixtures().proxyCallTo_('read', arguments)
  }

  window.preloadFixtures = function () {
    jasmine.getFixtures().proxyCallTo_('preload', arguments)
  }

  window.loadFixtures = function () {
    jasmine.getFixtures().proxyCallTo_('load', arguments)
  }

  window.appendLoadFixtures = function () {
    jasmine.getFixtures().proxyCallTo_('appendLoad', arguments)
  }

  window.setFixtures = function (html) {
    return jasmine.getFixtures().proxyCallTo_('set', arguments)
  }

  window.appendSetFixtures = function () {
    jasmine.getFixtures().proxyCallTo_('appendSet', arguments)
  }

  window.sandbox = function (attributes) {
    return jasmine.getFixtures().sandbox(attributes)
  }

  window.spyOnEvent = function (selector, eventName) {
    return jasmine.jQuery.events.spyOn(selector, eventName)
  }

  window.preloadStyleFixtures = function () {
    jasmine.getStyleFixtures().proxyCallTo_('preload', arguments)
  }

  window.loadStyleFixtures = function () {
    jasmine.getStyleFixtures().proxyCallTo_('load', arguments)
  }

  window.appendLoadStyleFixtures = function () {
    jasmine.getStyleFixtures().proxyCallTo_('appendLoad', arguments)
  }

  window.setStyleFixtures = function (html) {
    jasmine.getStyleFixtures().proxyCallTo_('set', arguments)
  }

  window.appendSetStyleFixtures = function (html) {
    jasmine.getStyleFixtures().proxyCallTo_('appendSet', arguments)
  }

  window.loadJSONFixtures = function () {
    return jasmine.getJSONFixtures().proxyCallTo_('load', arguments)
  }

  window.getJSONFixture = function (url) {
    return jasmine.getJSONFixtures().proxyCallTo_('read', arguments)[url]
  }
}(window.jasmine, window.jQuery);

var isCommonJS = typeof window == "undefined" && typeof exports == "object";

/**
 * Top level namespace for Jasmine, a lightweight JavaScript BDD/spec/testing framework.
 *
 * @namespace
 */
var jasmine = {};
if (isCommonJS) exports.jasmine = jasmine;
/**
 * @private
 */
jasmine.unimplementedMethod_ = function() {
  throw new Error("unimplemented method");
};

/**
 * Use <code>jasmine.undefined</code> instead of <code>undefined</code>, since <code>undefined</code> is just
 * a plain old variable and may be redefined by somebody else.
 *
 * @private
 */
jasmine.undefined = jasmine.___undefined___;

/**
 * Show diagnostic messages in the console if set to true
 *
 */
jasmine.VERBOSE = false;

/**
 * Default interval in milliseconds for event loop yields (e.g. to allow network activity or to refresh the screen with the HTML-based runner). Small values here may result in slow test running. Zero means no updates until all tests have completed.
 *
 */
jasmine.DEFAULT_UPDATE_INTERVAL = 250;

/**
 * Maximum levels of nesting that will be included when an object is pretty-printed
 */
jasmine.MAX_PRETTY_PRINT_DEPTH = 40;

/**
 * Default timeout interval in milliseconds for waitsFor() blocks.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

/**
 * By default exceptions thrown in the context of a test are caught by jasmine so that it can run the remaining tests in the suite.
 * Set to false to let the exception bubble up in the browser.
 *
 */
jasmine.CATCH_EXCEPTIONS = true;

jasmine.getGlobal = function() {
  function getGlobal() {
    return this;
  }

  return getGlobal();
};

/**
 * Allows for bound functions to be compared.  Internal use only.
 *
 * @ignore
 * @private
 * @param base {Object} bound 'this' for the function
 * @param name {Function} function to find
 */
jasmine.bindOriginal_ = function(base, name) {
  var original = base[name];
  if (original.apply) {
    return function() {
      return original.apply(base, arguments);
    };
  } else {
    // IE support
    return jasmine.getGlobal()[name];
  }
};

jasmine.setTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'setTimeout');
jasmine.clearTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearTimeout');
jasmine.setInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'setInterval');
jasmine.clearInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearInterval');

jasmine.MessageResult = function(values) {
  this.type = 'log';
  this.values = values;
  this.trace = new Error(); // todo: test better
};

jasmine.MessageResult.prototype.toString = function() {
  var text = "";
  for (var i = 0; i < this.values.length; i++) {
    if (i > 0) text += " ";
    if (jasmine.isString_(this.values[i])) {
      text += this.values[i];
    } else {
      text += jasmine.pp(this.values[i]);
    }
  }
  return text;
};

jasmine.ExpectationResult = function(params) {
  this.type = 'expect';
  this.matcherName = params.matcherName;
  this.passed_ = params.passed;
  this.expected = params.expected;
  this.actual = params.actual;
  this.message = this.passed_ ? 'Passed.' : params.message;

  var trace = (params.trace || new Error(this.message));
  this.trace = this.passed_ ? '' : trace;
};

jasmine.ExpectationResult.prototype.toString = function () {
  return this.message;
};

jasmine.ExpectationResult.prototype.passed = function () {
  return this.passed_;
};

/**
 * Getter for the Jasmine environment. Ensures one gets created
 */
jasmine.getEnv = function() {
  var env = jasmine.currentEnv_ = jasmine.currentEnv_ || new jasmine.Env();
  return env;
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isArray_ = function(value) {
  return jasmine.isA_("Array", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isString_ = function(value) {
  return jasmine.isA_("String", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isNumber_ = function(value) {
  return jasmine.isA_("Number", value);
};

/**
 * @ignore
 * @private
 * @param {String} typeName
 * @param value
 * @returns {Boolean}
 */
jasmine.isA_ = function(typeName, value) {
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
};

/**
 * Pretty printer for expecations.  Takes any object and turns it into a human-readable string.
 *
 * @param value {Object} an object to be outputted
 * @returns {String}
 */
jasmine.pp = function(value) {
  var stringPrettyPrinter = new jasmine.StringPrettyPrinter();
  stringPrettyPrinter.format(value);
  return stringPrettyPrinter.string;
};

/**
 * Returns true if the object is a DOM Node.
 *
 * @param {Object} obj object to check
 * @returns {Boolean}
 */
jasmine.isDomNode = function(obj) {
  return obj.nodeType > 0;
};

/**
 * Returns a matchable 'generic' object of the class type.  For use in expecations of type when values don't matter.
 *
 * @example
 * // don't care about which function is passed in, as long as it's a function
 * expect(mySpy).toHaveBeenCalledWith(jasmine.any(Function));
 *
 * @param {Class} clazz
 * @returns matchable object of the type clazz
 */
jasmine.any = function(clazz) {
  return new jasmine.Matchers.Any(clazz);
};

/**
 * Returns a matchable subset of a JSON object. For use in expectations when you don't care about all of the
 * attributes on the object.
 *
 * @example
 * // don't care about any other attributes than foo.
 * expect(mySpy).toHaveBeenCalledWith(jasmine.objectContaining({foo: "bar"});
 *
 * @param sample {Object} sample
 * @returns matchable object for the sample
 */
jasmine.objectContaining = function (sample) {
    return new jasmine.Matchers.ObjectContaining(sample);
};

/**
 * Jasmine Spies are test doubles that can act as stubs, spies, fakes or when used in an expecation, mocks.
 *
 * Spies should be created in test setup, before expectations.  They can then be checked, using the standard Jasmine
 * expectation syntax. Spies can be checked if they were called or not and what the calling params were.
 *
 * A Spy has the following fields: wasCalled, callCount, mostRecentCall, and argsForCall (see docs).
 *
 * Spies are torn down at the end of every spec.
 *
 * Note: Do <b>not</b> call new jasmine.Spy() directly - a spy must be created using spyOn, jasmine.createSpy or jasmine.createSpyObj.
 *
 * @example
 * // a stub
 * var myStub = jasmine.createSpy('myStub');  // can be used anywhere
 *
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // actual foo.not will not be called, execution stops
 * spyOn(foo, 'not');

 // foo.not spied upon, execution will continue to implementation
 * spyOn(foo, 'not').andCallThrough();
 *
 * // fake example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // foo.not(val) will return val
 * spyOn(foo, 'not').andCallFake(function(value) {return value;});
 *
 * // mock example
 * foo.not(7 == 7);
 * expect(foo.not).toHaveBeenCalled();
 * expect(foo.not).toHaveBeenCalledWith(true);
 *
 * @constructor
 * @see spyOn, jasmine.createSpy, jasmine.createSpyObj
 * @param {String} name
 */
jasmine.Spy = function(name) {
  /**
   * The name of the spy, if provided.
   */
  this.identity = name || 'unknown';
  /**
   *  Is this Object a spy?
   */
  this.isSpy = true;
  /**
   * The actual function this spy stubs.
   */
  this.plan = function() {
  };
  /**
   * Tracking of the most recent call to the spy.
   * @example
   * var mySpy = jasmine.createSpy('foo');
   * mySpy(1, 2);
   * mySpy.mostRecentCall.args = [1, 2];
   */
  this.mostRecentCall = {};

  /**
   * Holds arguments for each call to the spy, indexed by call count
   * @example
   * var mySpy = jasmine.createSpy('foo');
   * mySpy(1, 2);
   * mySpy(7, 8);
   * mySpy.mostRecentCall.args = [7, 8];
   * mySpy.argsForCall[0] = [1, 2];
   * mySpy.argsForCall[1] = [7, 8];
   */
  this.argsForCall = [];
  this.calls = [];
};

/**
 * Tells a spy to call through to the actual implemenatation.
 *
 * @example
 * var foo = {
 *   bar: function() { // do some stuff }
 * }
 *
 * // defining a spy on an existing property: foo.bar
 * spyOn(foo, 'bar').andCallThrough();
 */
jasmine.Spy.prototype.andCallThrough = function() {
  this.plan = this.originalValue;
  return this;
};

/**
 * For setting the return value of a spy.
 *
 * @example
 * // defining a spy from scratch: foo() returns 'baz'
 * var foo = jasmine.createSpy('spy on foo').andReturn('baz');
 *
 * // defining a spy on an existing property: foo.bar() returns 'baz'
 * spyOn(foo, 'bar').andReturn('baz');
 *
 * @param {Object} value
 */
jasmine.Spy.prototype.andReturn = function(value) {
  this.plan = function() {
    return value;
  };
  return this;
};

/**
 * For throwing an exception when a spy is called.
 *
 * @example
 * // defining a spy from scratch: foo() throws an exception w/ message 'ouch'
 * var foo = jasmine.createSpy('spy on foo').andThrow('baz');
 *
 * // defining a spy on an existing property: foo.bar() throws an exception w/ message 'ouch'
 * spyOn(foo, 'bar').andThrow('baz');
 *
 * @param {String} exceptionMsg
 */
jasmine.Spy.prototype.andThrow = function(exceptionMsg) {
  this.plan = function() {
    throw exceptionMsg;
  };
  return this;
};

/**
 * Calls an alternate implementation when a spy is called.
 *
 * @example
 * var baz = function() {
 *   // do some stuff, return something
 * }
 * // defining a spy from scratch: foo() calls the function baz
 * var foo = jasmine.createSpy('spy on foo').andCall(baz);
 *
 * // defining a spy on an existing property: foo.bar() calls an anonymnous function
 * spyOn(foo, 'bar').andCall(function() { return 'baz';} );
 *
 * @param {Function} fakeFunc
 */
jasmine.Spy.prototype.andCallFake = function(fakeFunc) {
  this.plan = fakeFunc;
  return this;
};

/**
 * Resets all of a spy's the tracking variables so that it can be used again.
 *
 * @example
 * spyOn(foo, 'bar');
 *
 * foo.bar();
 *
 * expect(foo.bar.callCount).toEqual(1);
 *
 * foo.bar.reset();
 *
 * expect(foo.bar.callCount).toEqual(0);
 */
jasmine.Spy.prototype.reset = function() {
  this.wasCalled = false;
  this.callCount = 0;
  this.argsForCall = [];
  this.calls = [];
  this.mostRecentCall = {};
};

jasmine.createSpy = function(name) {

  var spyObj = function() {
    spyObj.wasCalled = true;
    spyObj.callCount++;
    var args = jasmine.util.argsToArray(arguments);
    spyObj.mostRecentCall.object = this;
    spyObj.mostRecentCall.args = args;
    spyObj.argsForCall.push(args);
    spyObj.calls.push({object: this, args: args});
    return spyObj.plan.apply(this, arguments);
  };

  var spy = new jasmine.Spy(name);

  for (var prop in spy) {
    spyObj[prop] = spy[prop];
  }

  spyObj.reset();

  return spyObj;
};

/**
 * Determines whether an object is a spy.
 *
 * @param {jasmine.Spy|Object} putativeSpy
 * @returns {Boolean}
 */
jasmine.isSpy = function(putativeSpy) {
  return putativeSpy && putativeSpy.isSpy;
};

/**
 * Creates a more complicated spy: an Object that has every property a function that is a spy.  Used for stubbing something
 * large in one call.
 *
 * @param {String} baseName name of spy class
 * @param {Array} methodNames array of names of methods to make spies
 */
jasmine.createSpyObj = function(baseName, methodNames) {
  if (!jasmine.isArray_(methodNames) || methodNames.length === 0) {
    throw new Error('createSpyObj requires a non-empty array of method names to create spies for');
  }
  var obj = {};
  for (var i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jasmine.createSpy(baseName + '.' + methodNames[i]);
  }
  return obj;
};

/**
 * All parameters are pretty-printed and concatenated together, then written to the current spec's output.
 *
 * Be careful not to leave calls to <code>jasmine.log</code> in production code.
 */
jasmine.log = function() {
  var spec = jasmine.getEnv().currentSpec;
  spec.log.apply(spec, arguments);
};

/**
 * Function that installs a spy on an existing object's method name.  Used within a Spec to create a spy.
 *
 * @example
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 * spyOn(foo, 'not'); // actual foo.not will not be called, execution stops
 *
 * @see jasmine.createSpy
 * @param obj
 * @param methodName
 * @return {jasmine.Spy} a Jasmine spy that can be chained with all spy methods
 */
var spyOn = function(obj, methodName) {
  return jasmine.getEnv().currentSpec.spyOn(obj, methodName);
};
if (isCommonJS) exports.spyOn = spyOn;

/**
 * Creates a Jasmine spec that will be added to the current suite.
 *
 * // TODO: pending tests
 *
 * @example
 * it('should be true', function() {
 *   expect(true).toEqual(true);
 * });
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var it = function(desc, func) {
  return jasmine.getEnv().it(desc, func);
};
if (isCommonJS) exports.it = it;

/**
 * Creates a <em>disabled</em> Jasmine spec.
 *
 * A convenience method that allows existing specs to be disabled temporarily during development.
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var xit = function(desc, func) {
  return jasmine.getEnv().xit(desc, func);
};
if (isCommonJS) exports.xit = xit;

/**
 * Starts a chain for a Jasmine expectation.
 *
 * It is passed an Object that is the actual value and should chain to one of the many
 * jasmine.Matchers functions.
 *
 * @param {Object} actual Actual value to test against and expected value
 * @return {jasmine.Matchers}
 */
var expect = function(actual) {
  return jasmine.getEnv().currentSpec.expect(actual);
};
if (isCommonJS) exports.expect = expect;

/**
 * Defines part of a jasmine spec.  Used in cominbination with waits or waitsFor in asynchrnous specs.
 *
 * @param {Function} func Function that defines part of a jasmine spec.
 */
var runs = function(func) {
  jasmine.getEnv().currentSpec.runs(func);
};
if (isCommonJS) exports.runs = runs;

/**
 * Waits a fixed time period before moving to the next block.
 *
 * @deprecated Use waitsFor() instead
 * @param {Number} timeout milliseconds to wait
 */
var waits = function(timeout) {
  jasmine.getEnv().currentSpec.waits(timeout);
};
if (isCommonJS) exports.waits = waits;

/**
 * Waits for the latchFunction to return true before proceeding to the next block.
 *
 * @param {Function} latchFunction
 * @param {String} optional_timeoutMessage
 * @param {Number} optional_timeout
 */
var waitsFor = function(latchFunction, optional_timeoutMessage, optional_timeout) {
  jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec, arguments);
};
if (isCommonJS) exports.waitsFor = waitsFor;

/**
 * A function that is called before each spec in a suite.
 *
 * Used for spec setup, including validating assumptions.
 *
 * @param {Function} beforeEachFunction
 */
var beforeEach = function(beforeEachFunction) {
  jasmine.getEnv().beforeEach(beforeEachFunction);
};
if (isCommonJS) exports.beforeEach = beforeEach;

/**
 * A function that is called after each spec in a suite.
 *
 * Used for restoring any state that is hijacked during spec execution.
 *
 * @param {Function} afterEachFunction
 */
var afterEach = function(afterEachFunction) {
  jasmine.getEnv().afterEach(afterEachFunction);
};
if (isCommonJS) exports.afterEach = afterEach;

/**
 * Defines a suite of specifications.
 *
 * Stores the description and all defined specs in the Jasmine environment as one suite of specs. Variables declared
 * are accessible by calls to beforeEach, it, and afterEach. Describe blocks can be nested, allowing for specialization
 * of setup in some tests.
 *
 * @example
 * // TODO: a simple suite
 *
 * // TODO: a simple suite with a nested describe block
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var describe = function(description, specDefinitions) {
  return jasmine.getEnv().describe(description, specDefinitions);
};
if (isCommonJS) exports.describe = describe;

/**
 * Disables a suite of specifications.  Used to disable some suites in a file, or files, temporarily during development.
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var xdescribe = function(description, specDefinitions) {
  return jasmine.getEnv().xdescribe(description, specDefinitions);
};
if (isCommonJS) exports.xdescribe = xdescribe;


// Provide the XMLHttpRequest class for IE 5.x-6.x:
jasmine.XmlHttpRequest = (typeof XMLHttpRequest == "undefined") ? function() {
  function tryIt(f) {
    try {
      return f();
    } catch(e) {
    }
    return null;
  }

  var xhr = tryIt(function() {
    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
  }) ||
    tryIt(function() {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }) ||
    tryIt(function() {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }) ||
    tryIt(function() {
      return new ActiveXObject("Microsoft.XMLHTTP");
    });

  if (!xhr) throw new Error("This browser does not support XMLHttpRequest.");

  return xhr;
} : XMLHttpRequest;
/**
 * @namespace
 */
jasmine.util = {};

/**
 * Declare that a child class inherit it's prototype from the parent class.
 *
 * @private
 * @param {Function} childClass
 * @param {Function} parentClass
 */
jasmine.util.inherit = function(childClass, parentClass) {
  /**
   * @private
   */
  var subclass = function() {
  };
  subclass.prototype = parentClass.prototype;
  childClass.prototype = new subclass();
};

jasmine.util.formatException = function(e) {
  var lineNumber;
  if (e.line) {
    lineNumber = e.line;
  }
  else if (e.lineNumber) {
    lineNumber = e.lineNumber;
  }

  var file;

  if (e.sourceURL) {
    file = e.sourceURL;
  }
  else if (e.fileName) {
    file = e.fileName;
  }

  var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();

  if (file && lineNumber) {
    message += ' in ' + file + ' (line ' + lineNumber + ')';
  }

  return message;
};

jasmine.util.htmlEscape = function(str) {
  if (!str) return str;
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

jasmine.util.argsToArray = function(args) {
  var arrayOfArgs = [];
  for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);
  return arrayOfArgs;
};

jasmine.util.extend = function(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
};

/**
 * Environment for Jasmine
 *
 * @constructor
 */
jasmine.Env = function() {
  this.currentSpec = null;
  this.currentSuite = null;
  this.currentRunner_ = new jasmine.Runner(this);

  this.reporter = new jasmine.MultiReporter();

  this.updateInterval = jasmine.DEFAULT_UPDATE_INTERVAL;
  this.defaultTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  this.lastUpdate = 0;
  this.specFilter = function() {
    return true;
  };

  this.nextSpecId_ = 0;
  this.nextSuiteId_ = 0;
  this.equalityTesters_ = [];

  // wrap matchers
  this.matchersClass = function() {
    jasmine.Matchers.apply(this, arguments);
  };
  jasmine.util.inherit(this.matchersClass, jasmine.Matchers);

  jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype, this.matchersClass);
};


jasmine.Env.prototype.setTimeout = jasmine.setTimeout;
jasmine.Env.prototype.clearTimeout = jasmine.clearTimeout;
jasmine.Env.prototype.setInterval = jasmine.setInterval;
jasmine.Env.prototype.clearInterval = jasmine.clearInterval;

/**
 * @returns an object containing jasmine version build info, if set.
 */
jasmine.Env.prototype.version = function () {
  if (jasmine.version_) {
    return jasmine.version_;
  } else {
    throw new Error('Version not set');
  }
};

/**
 * @returns string containing jasmine version build info, if set.
 */
jasmine.Env.prototype.versionString = function() {
  if (!jasmine.version_) {
    return "version unknown";
  }

  var version = this.version();
  var versionString = version.major + "." + version.minor + "." + version.build;
  if (version.release_candidate) {
    versionString += ".rc" + version.release_candidate;
  }
  versionString += " revision " + version.revision;
  return versionString;
};

/**
 * @returns a sequential integer starting at 0
 */
jasmine.Env.prototype.nextSpecId = function () {
  return this.nextSpecId_++;
};

/**
 * @returns a sequential integer starting at 0
 */
jasmine.Env.prototype.nextSuiteId = function () {
  return this.nextSuiteId_++;
};

/**
 * Register a reporter to receive status updates from Jasmine.
 * @param {jasmine.Reporter} reporter An object which will receive status updates.
 */
jasmine.Env.prototype.addReporter = function(reporter) {
  this.reporter.addReporter(reporter);
};

jasmine.Env.prototype.execute = function() {
  this.currentRunner_.execute();
};

jasmine.Env.prototype.describe = function(description, specDefinitions) {
  var suite = new jasmine.Suite(this, description, specDefinitions, this.currentSuite);

  var parentSuite = this.currentSuite;
  if (parentSuite) {
    parentSuite.add(suite);
  } else {
    this.currentRunner_.add(suite);
  }

  this.currentSuite = suite;

  var declarationError = null;
  try {
    specDefinitions.call(suite);
  } catch(e) {
    declarationError = e;
  }

  if (declarationError) {
    this.it("encountered a declaration exception", function() {
      throw declarationError;
    });
  }

  this.currentSuite = parentSuite;

  return suite;
};

jasmine.Env.prototype.beforeEach = function(beforeEachFunction) {
  if (this.currentSuite) {
    this.currentSuite.beforeEach(beforeEachFunction);
  } else {
    this.currentRunner_.beforeEach(beforeEachFunction);
  }
};

jasmine.Env.prototype.currentRunner = function () {
  return this.currentRunner_;
};

jasmine.Env.prototype.afterEach = function(afterEachFunction) {
  if (this.currentSuite) {
    this.currentSuite.afterEach(afterEachFunction);
  } else {
    this.currentRunner_.afterEach(afterEachFunction);
  }

};

jasmine.Env.prototype.xdescribe = function(desc, specDefinitions) {
  return {
    execute: function() {
    }
  };
};

jasmine.Env.prototype.it = function(description, func) {
  var spec = new jasmine.Spec(this, this.currentSuite, description);
  this.currentSuite.add(spec);
  this.currentSpec = spec;

  if (func) {
    spec.runs(func);
  }

  return spec;
};

jasmine.Env.prototype.xit = function(desc, func) {
  return {
    id: this.nextSpecId(),
    runs: function() {
    }
  };
};

jasmine.Env.prototype.compareRegExps_ = function(a, b, mismatchKeys, mismatchValues) {
  if (a.source != b.source)
    mismatchValues.push("expected pattern /" + b.source + "/ is not equal to the pattern /" + a.source + "/");

  if (a.ignoreCase != b.ignoreCase)
    mismatchValues.push("expected modifier i was" + (b.ignoreCase ? " " : " not ") + "set and does not equal the origin modifier");

  if (a.global != b.global)
    mismatchValues.push("expected modifier g was" + (b.global ? " " : " not ") + "set and does not equal the origin modifier");

  if (a.multiline != b.multiline)
    mismatchValues.push("expected modifier m was" + (b.multiline ? " " : " not ") + "set and does not equal the origin modifier");

  if (a.sticky != b.sticky)
    mismatchValues.push("expected modifier y was" + (b.sticky ? " " : " not ") + "set and does not equal the origin modifier");

  return (mismatchValues.length === 0);
};

jasmine.Env.prototype.compareObjects_ = function(a, b, mismatchKeys, mismatchValues) {
  if (a.__Jasmine_been_here_before__ === b && b.__Jasmine_been_here_before__ === a) {
    return true;
  }

  a.__Jasmine_been_here_before__ = b;
  b.__Jasmine_been_here_before__ = a;

  var hasKey = function(obj, keyName) {
    return obj !== null && obj[keyName] !== jasmine.undefined;
  };

  for (var property in b) {
    if (!hasKey(a, property) && hasKey(b, property)) {
      mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    }
  }
  for (property in a) {
    if (!hasKey(b, property) && hasKey(a, property)) {
      mismatchKeys.push("expected missing key '" + property + "', but present in actual.");
    }
  }
  for (property in b) {
    if (property == '__Jasmine_been_here_before__') continue;
    if (!this.equals_(a[property], b[property], mismatchKeys, mismatchValues)) {
      mismatchValues.push("'" + property + "' was '" + (b[property] ? jasmine.util.htmlEscape(b[property].toString()) : b[property]) + "' in expected, but was '" + (a[property] ? jasmine.util.htmlEscape(a[property].toString()) : a[property]) + "' in actual.");
    }
  }

  if (jasmine.isArray_(a) && jasmine.isArray_(b) && a.length != b.length) {
    mismatchValues.push("arrays were not the same length");
  }

  delete a.__Jasmine_been_here_before__;
  delete b.__Jasmine_been_here_before__;
  return (mismatchKeys.length === 0 && mismatchValues.length === 0);
};

jasmine.Env.prototype.equals_ = function(a, b, mismatchKeys, mismatchValues) {
  mismatchKeys = mismatchKeys || [];
  mismatchValues = mismatchValues || [];

  for (var i = 0; i < this.equalityTesters_.length; i++) {
    var equalityTester = this.equalityTesters_[i];
    var result = equalityTester(a, b, this, mismatchKeys, mismatchValues);
    if (result !== jasmine.undefined) return result;
  }

  if (a === b) return true;

  if (a === jasmine.undefined || a === null || b === jasmine.undefined || b === null) {
    return (a == jasmine.undefined && b == jasmine.undefined);
  }

  if (jasmine.isDomNode(a) && jasmine.isDomNode(b)) {
    return a === b;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() == b.getTime();
  }

  if (a.jasmineMatches) {
    return a.jasmineMatches(b);
  }

  if (b.jasmineMatches) {
    return b.jasmineMatches(a);
  }

  if (a instanceof jasmine.Matchers.ObjectContaining) {
    return a.matches(b);
  }

  if (b instanceof jasmine.Matchers.ObjectContaining) {
    return b.matches(a);
  }

  if (jasmine.isString_(a) && jasmine.isString_(b)) {
    return (a == b);
  }

  if (jasmine.isNumber_(a) && jasmine.isNumber_(b)) {
    return (a == b);
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return this.compareRegExps_(a, b, mismatchKeys, mismatchValues);
  }

  if (typeof a === "object" && typeof b === "object") {
    return this.compareObjects_(a, b, mismatchKeys, mismatchValues);
  }

  //Straight check
  return (a === b);
};

jasmine.Env.prototype.contains_ = function(haystack, needle) {
  if (jasmine.isArray_(haystack)) {
    for (var i = 0; i < haystack.length; i++) {
      if (this.equals_(haystack[i], needle)) return true;
    }
    return false;
  }
  return haystack.indexOf(needle) >= 0;
};

jasmine.Env.prototype.addEqualityTester = function(equalityTester) {
  this.equalityTesters_.push(equalityTester);
};
/** No-op base class for Jasmine reporters.
 *
 * @constructor
 */
jasmine.Reporter = function() {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.reportRunnerStarting = function(runner) {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.reportRunnerResults = function(runner) {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.reportSuiteResults = function(suite) {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.reportSpecStarting = function(spec) {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.reportSpecResults = function(spec) {
};

//noinspection JSUnusedLocalSymbols
jasmine.Reporter.prototype.log = function(str) {
};

/**
 * Blocks are functions with executable code that make up a spec.
 *
 * @constructor
 * @param {jasmine.Env} env
 * @param {Function} func
 * @param {jasmine.Spec} spec
 */
jasmine.Block = function(env, func, spec) {
  this.env = env;
  this.func = func;
  this.spec = spec;
};

jasmine.Block.prototype.execute = function(onComplete) {
  if (!jasmine.CATCH_EXCEPTIONS) {
    this.func.apply(this.spec);
  }
  else {
    try {
      this.func.apply(this.spec);
    } catch (e) {
      this.spec.fail(e);
    }
  }
  onComplete();
};
/** JavaScript API reporter.
 *
 * @constructor
 */
jasmine.JsApiReporter = function() {
  this.started = false;
  this.finished = false;
  this.suites_ = [];
  this.results_ = {};
};

jasmine.JsApiReporter.prototype.reportRunnerStarting = function(runner) {
  this.started = true;
  var suites = runner.topLevelSuites();
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];
    this.suites_.push(this.summarize_(suite));
  }
};

jasmine.JsApiReporter.prototype.suites = function() {
  return this.suites_;
};

jasmine.JsApiReporter.prototype.summarize_ = function(suiteOrSpec) {
  var isSuite = suiteOrSpec instanceof jasmine.Suite;
  var summary = {
    id: suiteOrSpec.id,
    name: suiteOrSpec.description,
    type: isSuite ? 'suite' : 'spec',
    children: []
  };
  
  if (isSuite) {
    var children = suiteOrSpec.children();
    for (var i = 0; i < children.length; i++) {
      summary.children.push(this.summarize_(children[i]));
    }
  }
  return summary;
};

jasmine.JsApiReporter.prototype.results = function() {
  return this.results_;
};

jasmine.JsApiReporter.prototype.resultsForSpec = function(specId) {
  return this.results_[specId];
};

//noinspection JSUnusedLocalSymbols
jasmine.JsApiReporter.prototype.reportRunnerResults = function(runner) {
  this.finished = true;
};

//noinspection JSUnusedLocalSymbols
jasmine.JsApiReporter.prototype.reportSuiteResults = function(suite) {
};

//noinspection JSUnusedLocalSymbols
jasmine.JsApiReporter.prototype.reportSpecResults = function(spec) {
  this.results_[spec.id] = {
    messages: spec.results().getItems(),
    result: spec.results().failedCount > 0 ? "failed" : "passed"
  };
};

//noinspection JSUnusedLocalSymbols
jasmine.JsApiReporter.prototype.log = function(str) {
};

jasmine.JsApiReporter.prototype.resultsForSpecs = function(specIds){
  var results = {};
  for (var i = 0; i < specIds.length; i++) {
    var specId = specIds[i];
    results[specId] = this.summarizeResult_(this.results_[specId]);
  }
  return results;
};

jasmine.JsApiReporter.prototype.summarizeResult_ = function(result){
  var summaryMessages = [];
  var messagesLength = result.messages.length;
  for (var messageIndex = 0; messageIndex < messagesLength; messageIndex++) {
    var resultMessage = result.messages[messageIndex];
    summaryMessages.push({
      text: resultMessage.type == 'log' ? resultMessage.toString() : jasmine.undefined,
      passed: resultMessage.passed ? resultMessage.passed() : true,
      type: resultMessage.type,
      message: resultMessage.message,
      trace: {
        stack: resultMessage.passed && !resultMessage.passed() ? resultMessage.trace.stack : jasmine.undefined
      }
    });
  }

  return {
    result : result.result,
    messages : summaryMessages
  };
};

/**
 * @constructor
 * @param {jasmine.Env} env
 * @param actual
 * @param {jasmine.Spec} spec
 */
jasmine.Matchers = function(env, actual, spec, opt_isNot) {
  this.env = env;
  this.actual = actual;
  this.spec = spec;
  this.isNot = opt_isNot || false;
  this.reportWasCalled_ = false;
};

// todo: @deprecated as of Jasmine 0.11, remove soon [xw]
jasmine.Matchers.pp = function(str) {
  throw new Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!");
};

// todo: @deprecated Deprecated as of Jasmine 0.10. Rewrite your custom matchers to return true or false. [xw]
jasmine.Matchers.prototype.report = function(result, failing_message, details) {
  throw new Error("As of jasmine 0.11, custom matchers must be implemented differently -- please see jasmine docs");
};

jasmine.Matchers.wrapInto_ = function(prototype, matchersClass) {
  for (var methodName in prototype) {
    if (methodName == 'report') continue;
    var orig = prototype[methodName];
    matchersClass.prototype[methodName] = jasmine.Matchers.matcherFn_(methodName, orig);
  }
};

jasmine.Matchers.matcherFn_ = function(matcherName, matcherFunction) {
  return function() {
    var matcherArgs = jasmine.util.argsToArray(arguments);
    var result = matcherFunction.apply(this, arguments);

    if (this.isNot) {
      result = !result;
    }

    if (this.reportWasCalled_) return result;

    var message;
    if (!result) {
      if (this.message) {
        message = this.message.apply(this, arguments);
        if (jasmine.isArray_(message)) {
          message = message[this.isNot ? 1 : 0];
        }
      } else {
        var englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });
        message = "Expected " + jasmine.pp(this.actual) + (this.isNot ? " not " : " ") + englishyPredicate;
        if (matcherArgs.length > 0) {
          for (var i = 0; i < matcherArgs.length; i++) {
            if (i > 0) message += ",";
            message += " " + jasmine.pp(matcherArgs[i]);
          }
        }
        message += ".";
      }
    }
    var expectationResult = new jasmine.ExpectationResult({
      matcherName: matcherName,
      passed: result,
      expected: matcherArgs.length > 1 ? matcherArgs : matcherArgs[0],
      actual: this.actual,
      message: message
    });
    this.spec.addMatcherResult(expectationResult);
    return jasmine.undefined;
  };
};




/**
 * toBe: compares the actual to the expected using ===
 * @param expected
 */
jasmine.Matchers.prototype.toBe = function(expected) {
  return this.actual === expected;
};

/**
 * toNotBe: compares the actual to the expected using !==
 * @param expected
 * @deprecated as of 1.0. Use not.toBe() instead.
 */
jasmine.Matchers.prototype.toNotBe = function(expected) {
  return this.actual !== expected;
};

/**
 * toEqual: compares the actual to the expected using common sense equality. Handles Objects, Arrays, etc.
 *
 * @param expected
 */
jasmine.Matchers.prototype.toEqual = function(expected) {
  return this.env.equals_(this.actual, expected);
};

/**
 * toNotEqual: compares the actual to the expected using the ! of jasmine.Matchers.toEqual
 * @param expected
 * @deprecated as of 1.0. Use not.toEqual() instead.
 */
jasmine.Matchers.prototype.toNotEqual = function(expected) {
  return !this.env.equals_(this.actual, expected);
};

/**
 * Matcher that compares the actual to the expected using a regular expression.  Constructs a RegExp, so takes
 * a pattern or a String.
 *
 * @param expected
 */
jasmine.Matchers.prototype.toMatch = function(expected) {
  return new RegExp(expected).test(this.actual);
};

/**
 * Matcher that compares the actual to the expected using the boolean inverse of jasmine.Matchers.toMatch
 * @param expected
 * @deprecated as of 1.0. Use not.toMatch() instead.
 */
jasmine.Matchers.prototype.toNotMatch = function(expected) {
  return !(new RegExp(expected).test(this.actual));
};

/**
 * Matcher that compares the actual to jasmine.undefined.
 */
jasmine.Matchers.prototype.toBeDefined = function() {
  return (this.actual !== jasmine.undefined);
};

/**
 * Matcher that compares the actual to jasmine.undefined.
 */
jasmine.Matchers.prototype.toBeUndefined = function() {
  return (this.actual === jasmine.undefined);
};

/**
 * Matcher that compares the actual to null.
 */
jasmine.Matchers.prototype.toBeNull = function() {
  return (this.actual === null);
};

/**
 * Matcher that compares the actual to NaN.
 */
jasmine.Matchers.prototype.toBeNaN = function() {
	this.message = function() {
		return [ "Expected " + jasmine.pp(this.actual) + " to be NaN." ];
	};

	return (this.actual !== this.actual);
};

/**
 * Matcher that boolean not-nots the actual.
 */
jasmine.Matchers.prototype.toBeTruthy = function() {
  return !!this.actual;
};


/**
 * Matcher that boolean nots the actual.
 */
jasmine.Matchers.prototype.toBeFalsy = function() {
  return !this.actual;
};


/**
 * Matcher that checks to see if the actual, a Jasmine spy, was called.
 */
jasmine.Matchers.prototype.toHaveBeenCalled = function() {
  if (arguments.length > 0) {
    throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
  }

  if (!jasmine.isSpy(this.actual)) {
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }

  this.message = function() {
    return [
      "Expected spy " + this.actual.identity + " to have been called.",
      "Expected spy " + this.actual.identity + " not to have been called."
    ];
  };

  return this.actual.wasCalled;
};

/** @deprecated Use expect(xxx).toHaveBeenCalled() instead */
jasmine.Matchers.prototype.wasCalled = jasmine.Matchers.prototype.toHaveBeenCalled;

/**
 * Matcher that checks to see if the actual, a Jasmine spy, was not called.
 *
 * @deprecated Use expect(xxx).not.toHaveBeenCalled() instead
 */
jasmine.Matchers.prototype.wasNotCalled = function() {
  if (arguments.length > 0) {
    throw new Error('wasNotCalled does not take arguments');
  }

  if (!jasmine.isSpy(this.actual)) {
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }

  this.message = function() {
    return [
      "Expected spy " + this.actual.identity + " to not have been called.",
      "Expected spy " + this.actual.identity + " to have been called."
    ];
  };

  return !this.actual.wasCalled;
};

/**
 * Matcher that checks to see if the actual, a Jasmine spy, was called with a set of parameters.
 *
 * @example
 *
 */
jasmine.Matchers.prototype.toHaveBeenCalledWith = function() {
  var expectedArgs = jasmine.util.argsToArray(arguments);
  if (!jasmine.isSpy(this.actual)) {
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }
  this.message = function() {
    var invertedMessage = "Expected spy " + this.actual.identity + " not to have been called with " + jasmine.pp(expectedArgs) + " but it was.";
    var positiveMessage = "";
    if (this.actual.callCount === 0) {
      positiveMessage = "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but it was never called.";
    } else {
      positiveMessage = "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but actual calls were " + jasmine.pp(this.actual.argsForCall).replace(/^\[ | \]$/g, '')
    }
    return [positiveMessage, invertedMessage];
  };

  return this.env.contains_(this.actual.argsForCall, expectedArgs);
};

/** @deprecated Use expect(xxx).toHaveBeenCalledWith() instead */
jasmine.Matchers.prototype.wasCalledWith = jasmine.Matchers.prototype.toHaveBeenCalledWith;

/** @deprecated Use expect(xxx).not.toHaveBeenCalledWith() instead */
jasmine.Matchers.prototype.wasNotCalledWith = function() {
  var expectedArgs = jasmine.util.argsToArray(arguments);
  if (!jasmine.isSpy(this.actual)) {
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }

  this.message = function() {
    return [
      "Expected spy not to have been called with " + jasmine.pp(expectedArgs) + " but it was",
      "Expected spy to have been called with " + jasmine.pp(expectedArgs) + " but it was"
    ];
  };

  return !this.env.contains_(this.actual.argsForCall, expectedArgs);
};

/**
 * Matcher that checks that the expected item is an element in the actual Array.
 *
 * @param {Object} expected
 */
jasmine.Matchers.prototype.toContain = function(expected) {
  return this.env.contains_(this.actual, expected);
};

/**
 * Matcher that checks that the expected item is NOT an element in the actual Array.
 *
 * @param {Object} expected
 * @deprecated as of 1.0. Use not.toContain() instead.
 */
jasmine.Matchers.prototype.toNotContain = function(expected) {
  return !this.env.contains_(this.actual, expected);
};

jasmine.Matchers.prototype.toBeLessThan = function(expected) {
  return this.actual < expected;
};

jasmine.Matchers.prototype.toBeGreaterThan = function(expected) {
  return this.actual > expected;
};

/**
 * Matcher that checks that the expected item is equal to the actual item
 * up to a given level of decimal precision (default 2).
 *
 * @param {Number} expected
 * @param {Number} precision, as number of decimal places
 */
jasmine.Matchers.prototype.toBeCloseTo = function(expected, precision) {
  if (!(precision === 0)) {
    precision = precision || 2;
  }
  return Math.abs(expected - this.actual) < (Math.pow(10, -precision) / 2);
};

/**
 * Matcher that checks that the expected exception was thrown by the actual.
 *
 * @param {String} [expected]
 */
jasmine.Matchers.prototype.toThrow = function(expected) {
  var result = false;
  var exception;
  if (typeof this.actual != 'function') {
    throw new Error('Actual is not a function');
  }
  try {
    this.actual();
  } catch (e) {
    exception = e;
  }
  if (exception) {
    result = (expected === jasmine.undefined || this.env.equals_(exception.message || exception, expected.message || expected));
  }

  var not = this.isNot ? "not " : "";

  this.message = function() {
    if (exception && (expected === jasmine.undefined || !this.env.equals_(exception.message || exception, expected.message || expected))) {
      return ["Expected function " + not + "to throw", expected ? expected.message || expected : "an exception", ", but it threw", exception.message || exception].join(' ');
    } else {
      return "Expected function to throw an exception.";
    }
  };

  return result;
};

jasmine.Matchers.Any = function(expectedClass) {
  this.expectedClass = expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineMatches = function(other) {
  if (this.expectedClass == String) {
    return typeof other == 'string' || other instanceof String;
  }

  if (this.expectedClass == Number) {
    return typeof other == 'number' || other instanceof Number;
  }

  if (this.expectedClass == Function) {
    return typeof other == 'function' || other instanceof Function;
  }

  if (this.expectedClass == Object) {
    return typeof other == 'object';
  }

  return other instanceof this.expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineToString = function() {
  return '<jasmine.any(' + this.expectedClass + ')>';
};

jasmine.Matchers.ObjectContaining = function (sample) {
  this.sample = sample;
};

jasmine.Matchers.ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
  mismatchKeys = mismatchKeys || [];
  mismatchValues = mismatchValues || [];

  var env = jasmine.getEnv();

  var hasKey = function(obj, keyName) {
    return obj != null && obj[keyName] !== jasmine.undefined;
  };

  for (var property in this.sample) {
    if (!hasKey(other, property) && hasKey(this.sample, property)) {
      mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    }
    else if (!env.equals_(this.sample[property], other[property], mismatchKeys, mismatchValues)) {
      mismatchValues.push("'" + property + "' was '" + (other[property] ? jasmine.util.htmlEscape(other[property].toString()) : other[property]) + "' in expected, but was '" + (this.sample[property] ? jasmine.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in actual.");
    }
  }

  return (mismatchKeys.length === 0 && mismatchValues.length === 0);
};

jasmine.Matchers.ObjectContaining.prototype.jasmineToString = function () {
  return "<jasmine.objectContaining(" + jasmine.pp(this.sample) + ")>";
};
// Mock setTimeout, clearTimeout
// Contributed by Pivotal Computer Systems, www.pivotalsf.com

jasmine.FakeTimer = function() {
  this.reset();

  var self = this;
  self.setTimeout = function(funcToCall, millis) {
    self.timeoutsMade++;
    self.scheduleFunction(self.timeoutsMade, funcToCall, millis, false);
    return self.timeoutsMade;
  };

  self.setInterval = function(funcToCall, millis) {
    self.timeoutsMade++;
    self.scheduleFunction(self.timeoutsMade, funcToCall, millis, true);
    return self.timeoutsMade;
  };

  self.clearTimeout = function(timeoutKey) {
    self.scheduledFunctions[timeoutKey] = jasmine.undefined;
  };

  self.clearInterval = function(timeoutKey) {
    self.scheduledFunctions[timeoutKey] = jasmine.undefined;
  };

};

jasmine.FakeTimer.prototype.reset = function() {
  this.timeoutsMade = 0;
  this.scheduledFunctions = {};
  this.nowMillis = 0;
};

jasmine.FakeTimer.prototype.tick = function(millis) {
  var oldMillis = this.nowMillis;
  var newMillis = oldMillis + millis;
  this.runFunctionsWithinRange(oldMillis, newMillis);
  this.nowMillis = newMillis;
};

jasmine.FakeTimer.prototype.runFunctionsWithinRange = function(oldMillis, nowMillis) {
  var scheduledFunc;
  var funcsToRun = [];
  for (var timeoutKey in this.scheduledFunctions) {
    scheduledFunc = this.scheduledFunctions[timeoutKey];
    if (scheduledFunc != jasmine.undefined &&
        scheduledFunc.runAtMillis >= oldMillis &&
        scheduledFunc.runAtMillis <= nowMillis) {
      funcsToRun.push(scheduledFunc);
      this.scheduledFunctions[timeoutKey] = jasmine.undefined;
    }
  }

  if (funcsToRun.length > 0) {
    funcsToRun.sort(function(a, b) {
      return a.runAtMillis - b.runAtMillis;
    });
    for (var i = 0; i < funcsToRun.length; ++i) {
      try {
        var funcToRun = funcsToRun[i];
        this.nowMillis = funcToRun.runAtMillis;
        funcToRun.funcToCall();
        if (funcToRun.recurring) {
          this.scheduleFunction(funcToRun.timeoutKey,
              funcToRun.funcToCall,
              funcToRun.millis,
              true);
        }
      } catch(e) {
      }
    }
    this.runFunctionsWithinRange(oldMillis, nowMillis);
  }
};

jasmine.FakeTimer.prototype.scheduleFunction = function(timeoutKey, funcToCall, millis, recurring) {
  this.scheduledFunctions[timeoutKey] = {
    runAtMillis: this.nowMillis + millis,
    funcToCall: funcToCall,
    recurring: recurring,
    timeoutKey: timeoutKey,
    millis: millis
  };
};

/**
 * @namespace
 */
jasmine.Clock = {
  defaultFakeTimer: new jasmine.FakeTimer(),

  reset: function() {
    jasmine.Clock.assertInstalled();
    jasmine.Clock.defaultFakeTimer.reset();
  },

  tick: function(millis) {
    jasmine.Clock.assertInstalled();
    jasmine.Clock.defaultFakeTimer.tick(millis);
  },

  runFunctionsWithinRange: function(oldMillis, nowMillis) {
    jasmine.Clock.defaultFakeTimer.runFunctionsWithinRange(oldMillis, nowMillis);
  },

  scheduleFunction: function(timeoutKey, funcToCall, millis, recurring) {
    jasmine.Clock.defaultFakeTimer.scheduleFunction(timeoutKey, funcToCall, millis, recurring);
  },

  useMock: function() {
    if (!jasmine.Clock.isInstalled()) {
      var spec = jasmine.getEnv().currentSpec;
      spec.after(jasmine.Clock.uninstallMock);

      jasmine.Clock.installMock();
    }
  },

  installMock: function() {
    jasmine.Clock.installed = jasmine.Clock.defaultFakeTimer;
  },

  uninstallMock: function() {
    jasmine.Clock.assertInstalled();
    jasmine.Clock.installed = jasmine.Clock.real;
  },

  real: {
    setTimeout: jasmine.getGlobal().setTimeout,
    clearTimeout: jasmine.getGlobal().clearTimeout,
    setInterval: jasmine.getGlobal().setInterval,
    clearInterval: jasmine.getGlobal().clearInterval
  },

  assertInstalled: function() {
    if (!jasmine.Clock.isInstalled()) {
      throw new Error("Mock clock is not installed, use jasmine.Clock.useMock()");
    }
  },

  isInstalled: function() {
    return jasmine.Clock.installed == jasmine.Clock.defaultFakeTimer;
  },

  installed: null
};
jasmine.Clock.installed = jasmine.Clock.real;

//else for IE support
jasmine.getGlobal().setTimeout = function(funcToCall, millis) {
  if (jasmine.Clock.installed.setTimeout.apply) {
    return jasmine.Clock.installed.setTimeout.apply(this, arguments);
  } else {
    return jasmine.Clock.installed.setTimeout(funcToCall, millis);
  }
};

jasmine.getGlobal().setInterval = function(funcToCall, millis) {
  if (jasmine.Clock.installed.setInterval.apply) {
    return jasmine.Clock.installed.setInterval.apply(this, arguments);
  } else {
    return jasmine.Clock.installed.setInterval(funcToCall, millis);
  }
};

jasmine.getGlobal().clearTimeout = function(timeoutKey) {
  if (jasmine.Clock.installed.clearTimeout.apply) {
    return jasmine.Clock.installed.clearTimeout.apply(this, arguments);
  } else {
    return jasmine.Clock.installed.clearTimeout(timeoutKey);
  }
};

jasmine.getGlobal().clearInterval = function(timeoutKey) {
  if (jasmine.Clock.installed.clearTimeout.apply) {
    return jasmine.Clock.installed.clearInterval.apply(this, arguments);
  } else {
    return jasmine.Clock.installed.clearInterval(timeoutKey);
  }
};

/**
 * @constructor
 */
jasmine.MultiReporter = function() {
  this.subReporters_ = [];
};
jasmine.util.inherit(jasmine.MultiReporter, jasmine.Reporter);

jasmine.MultiReporter.prototype.addReporter = function(reporter) {
  this.subReporters_.push(reporter);
};

(function() {
  var functionNames = [
    "reportRunnerStarting",
    "reportRunnerResults",
    "reportSuiteResults",
    "reportSpecStarting",
    "reportSpecResults",
    "log"
  ];
  for (var i = 0; i < functionNames.length; i++) {
    var functionName = functionNames[i];
    jasmine.MultiReporter.prototype[functionName] = (function(functionName) {
      return function() {
        for (var j = 0; j < this.subReporters_.length; j++) {
          var subReporter = this.subReporters_[j];
          if (subReporter[functionName]) {
            subReporter[functionName].apply(subReporter, arguments);
          }
        }
      };
    })(functionName);
  }
})();
/**
 * Holds results for a set of Jasmine spec. Allows for the results array to hold another jasmine.NestedResults
 *
 * @constructor
 */
jasmine.NestedResults = function() {
  /**
   * The total count of results
   */
  this.totalCount = 0;
  /**
   * Number of passed results
   */
  this.passedCount = 0;
  /**
   * Number of failed results
   */
  this.failedCount = 0;
  /**
   * Was this suite/spec skipped?
   */
  this.skipped = false;
  /**
   * @ignore
   */
  this.items_ = [];
};

/**
 * Roll up the result counts.
 *
 * @param result
 */
jasmine.NestedResults.prototype.rollupCounts = function(result) {
  this.totalCount += result.totalCount;
  this.passedCount += result.passedCount;
  this.failedCount += result.failedCount;
};

/**
 * Adds a log message.
 * @param values Array of message parts which will be concatenated later.
 */
jasmine.NestedResults.prototype.log = function(values) {
  this.items_.push(new jasmine.MessageResult(values));
};

/**
 * Getter for the results: message & results.
 */
jasmine.NestedResults.prototype.getItems = function() {
  return this.items_;
};

/**
 * Adds a result, tracking counts (total, passed, & failed)
 * @param {jasmine.ExpectationResult|jasmine.NestedResults} result
 */
jasmine.NestedResults.prototype.addResult = function(result) {
  if (result.type != 'log') {
    if (result.items_) {
      this.rollupCounts(result);
    } else {
      this.totalCount++;
      if (result.passed()) {
        this.passedCount++;
      } else {
        this.failedCount++;
      }
    }
  }
  this.items_.push(result);
};

/**
 * @returns {Boolean} True if <b>everything</b> below passed
 */
jasmine.NestedResults.prototype.passed = function() {
  return this.passedCount === this.totalCount;
};
/**
 * Base class for pretty printing for expectation results.
 */
jasmine.PrettyPrinter = function() {
  this.ppNestLevel_ = 0;
};

/**
 * Formats a value in a nice, human-readable string.
 *
 * @param value
 */
jasmine.PrettyPrinter.prototype.format = function(value) {
  this.ppNestLevel_++;
  try {
    if (value === jasmine.undefined) {
      this.emitScalar('undefined');
    } else if (value === null) {
      this.emitScalar('null');
    } else if (value === jasmine.getGlobal()) {
      this.emitScalar('<global>');
    } else if (value.jasmineToString) {
      this.emitScalar(value.jasmineToString());
    } else if (typeof value === 'string') {
      this.emitString(value);
    } else if (jasmine.isSpy(value)) {
      this.emitScalar("spy on " + value.identity);
    } else if (value instanceof RegExp) {
      this.emitScalar(value.toString());
    } else if (typeof value === 'function') {
      this.emitScalar('Function');
    } else if (typeof value.nodeType === 'number') {
      this.emitScalar('HTMLNode');
    } else if (value instanceof Date) {
      this.emitScalar('Date(' + value + ')');
    } else if (value.__Jasmine_been_here_before__) {
      this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
    } else if (jasmine.isArray_(value) || typeof value == 'object') {
      value.__Jasmine_been_here_before__ = true;
      if (jasmine.isArray_(value)) {
        this.emitArray(value);
      } else {
        this.emitObject(value);
      }
      delete value.__Jasmine_been_here_before__;
    } else {
      this.emitScalar(value.toString());
    }
  } finally {
    this.ppNestLevel_--;
  }
};

jasmine.PrettyPrinter.prototype.iterateObject = function(obj, fn) {
  for (var property in obj) {
    if (!obj.hasOwnProperty(property)) continue;
    if (property == '__Jasmine_been_here_before__') continue;
    fn(property, obj.__lookupGetter__ ? (obj.__lookupGetter__(property) !== jasmine.undefined && 
                                         obj.__lookupGetter__(property) !== null) : false);
  }
};

jasmine.PrettyPrinter.prototype.emitArray = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitObject = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitScalar = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitString = jasmine.unimplementedMethod_;

jasmine.StringPrettyPrinter = function() {
  jasmine.PrettyPrinter.call(this);

  this.string = '';
};
jasmine.util.inherit(jasmine.StringPrettyPrinter, jasmine.PrettyPrinter);

jasmine.StringPrettyPrinter.prototype.emitScalar = function(value) {
  this.append(value);
};

jasmine.StringPrettyPrinter.prototype.emitString = function(value) {
  this.append("'" + value + "'");
};

jasmine.StringPrettyPrinter.prototype.emitArray = function(array) {
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    this.append("Array");
    return;
  }

  this.append('[ ');
  for (var i = 0; i < array.length; i++) {
    if (i > 0) {
      this.append(', ');
    }
    this.format(array[i]);
  }
  this.append(' ]');
};

jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    this.append("Object");
    return;
  }

  var self = this;
  this.append('{ ');
  var first = true;

  this.iterateObject(obj, function(property, isGetter) {
    if (first) {
      first = false;
    } else {
      self.append(', ');
    }

    self.append(property);
    self.append(' : ');
    if (isGetter) {
      self.append('<getter>');
    } else {
      self.format(obj[property]);
    }
  });

  this.append(' }');
};

jasmine.StringPrettyPrinter.prototype.append = function(value) {
  this.string += value;
};
jasmine.Queue = function(env) {
  this.env = env;

  // parallel to blocks. each true value in this array means the block will
  // get executed even if we abort
  this.ensured = [];
  this.blocks = [];
  this.running = false;
  this.index = 0;
  this.offset = 0;
  this.abort = false;
};

jasmine.Queue.prototype.addBefore = function(block, ensure) {
  if (ensure === jasmine.undefined) {
    ensure = false;
  }

  this.blocks.unshift(block);
  this.ensured.unshift(ensure);
};

jasmine.Queue.prototype.add = function(block, ensure) {
  if (ensure === jasmine.undefined) {
    ensure = false;
  }

  this.blocks.push(block);
  this.ensured.push(ensure);
};

jasmine.Queue.prototype.insertNext = function(block, ensure) {
  if (ensure === jasmine.undefined) {
    ensure = false;
  }

  this.ensured.splice((this.index + this.offset + 1), 0, ensure);
  this.blocks.splice((this.index + this.offset + 1), 0, block);
  this.offset++;
};

jasmine.Queue.prototype.start = function(onComplete) {
  this.running = true;
  this.onComplete = onComplete;
  this.next_();
};

jasmine.Queue.prototype.isRunning = function() {
  return this.running;
};

jasmine.Queue.LOOP_DONT_RECURSE = true;

jasmine.Queue.prototype.next_ = function() {
  var self = this;
  var goAgain = true;

  while (goAgain) {
    goAgain = false;
    
    if (self.index < self.blocks.length && !(this.abort && !this.ensured[self.index])) {
      var calledSynchronously = true;
      var completedSynchronously = false;

      var onComplete = function () {
        if (jasmine.Queue.LOOP_DONT_RECURSE && calledSynchronously) {
          completedSynchronously = true;
          return;
        }

        if (self.blocks[self.index].abort) {
          self.abort = true;
        }

        self.offset = 0;
        self.index++;

        var now = new Date().getTime();
        if (self.env.updateInterval && now - self.env.lastUpdate > self.env.updateInterval) {
          self.env.lastUpdate = now;
          self.env.setTimeout(function() {
            self.next_();
          }, 0);
        } else {
          if (jasmine.Queue.LOOP_DONT_RECURSE && completedSynchronously) {
            goAgain = true;
          } else {
            self.next_();
          }
        }
      };
      self.blocks[self.index].execute(onComplete);

      calledSynchronously = false;
      if (completedSynchronously) {
        onComplete();
      }
      
    } else {
      self.running = false;
      if (self.onComplete) {
        self.onComplete();
      }
    }
  }
};

jasmine.Queue.prototype.results = function() {
  var results = new jasmine.NestedResults();
  for (var i = 0; i < this.blocks.length; i++) {
    if (this.blocks[i].results) {
      results.addResult(this.blocks[i].results());
    }
  }
  return results;
};


/**
 * Runner
 *
 * @constructor
 * @param {jasmine.Env} env
 */
jasmine.Runner = function(env) {
  var self = this;
  self.env = env;
  self.queue = new jasmine.Queue(env);
  self.before_ = [];
  self.after_ = [];
  self.suites_ = [];
};

jasmine.Runner.prototype.execute = function() {
  var self = this;
  if (self.env.reporter.reportRunnerStarting) {
    self.env.reporter.reportRunnerStarting(this);
  }
  self.queue.start(function () {
    self.finishCallback();
  });
};

jasmine.Runner.prototype.beforeEach = function(beforeEachFunction) {
  beforeEachFunction.typeName = 'beforeEach';
  this.before_.splice(0,0,beforeEachFunction);
};

jasmine.Runner.prototype.afterEach = function(afterEachFunction) {
  afterEachFunction.typeName = 'afterEach';
  this.after_.splice(0,0,afterEachFunction);
};


jasmine.Runner.prototype.finishCallback = function() {
  this.env.reporter.reportRunnerResults(this);
};

jasmine.Runner.prototype.addSuite = function(suite) {
  this.suites_.push(suite);
};

jasmine.Runner.prototype.add = function(block) {
  if (block instanceof jasmine.Suite) {
    this.addSuite(block);
  }
  this.queue.add(block);
};

jasmine.Runner.prototype.specs = function () {
  var suites = this.suites();
  var specs = [];
  for (var i = 0; i < suites.length; i++) {
    specs = specs.concat(suites[i].specs());
  }
  return specs;
};

jasmine.Runner.prototype.suites = function() {
  return this.suites_;
};

jasmine.Runner.prototype.topLevelSuites = function() {
  var topLevelSuites = [];
  for (var i = 0; i < this.suites_.length; i++) {
    if (!this.suites_[i].parentSuite) {
      topLevelSuites.push(this.suites_[i]);
    }
  }
  return topLevelSuites;
};

jasmine.Runner.prototype.results = function() {
  return this.queue.results();
};
/**
 * Internal representation of a Jasmine specification, or test.
 *
 * @constructor
 * @param {jasmine.Env} env
 * @param {jasmine.Suite} suite
 * @param {String} description
 */
jasmine.Spec = function(env, suite, description) {
  if (!env) {
    throw new Error('jasmine.Env() required');
  }
  if (!suite) {
    throw new Error('jasmine.Suite() required');
  }
  var spec = this;
  spec.id = env.nextSpecId ? env.nextSpecId() : null;
  spec.env = env;
  spec.suite = suite;
  spec.description = description;
  spec.queue = new jasmine.Queue(env);

  spec.afterCallbacks = [];
  spec.spies_ = [];

  spec.results_ = new jasmine.NestedResults();
  spec.results_.description = description;
  spec.matchersClass = null;
};

jasmine.Spec.prototype.getFullName = function() {
  return this.suite.getFullName() + ' ' + this.description + '.';
};


jasmine.Spec.prototype.results = function() {
  return this.results_;
};

/**
 * All parameters are pretty-printed and concatenated together, then written to the spec's output.
 *
 * Be careful not to leave calls to <code>jasmine.log</code> in production code.
 */
jasmine.Spec.prototype.log = function() {
  return this.results_.log(arguments);
};

jasmine.Spec.prototype.runs = function (func) {
  var block = new jasmine.Block(this.env, func, this);
  this.addToQueue(block);
  return this;
};

jasmine.Spec.prototype.addToQueue = function (block) {
  if (this.queue.isRunning()) {
    this.queue.insertNext(block);
  } else {
    this.queue.add(block);
  }
};

/**
 * @param {jasmine.ExpectationResult} result
 */
jasmine.Spec.prototype.addMatcherResult = function(result) {
  this.results_.addResult(result);
};

jasmine.Spec.prototype.expect = function(actual) {
  var positive = new (this.getMatchersClass_())(this.env, actual, this);
  positive.not = new (this.getMatchersClass_())(this.env, actual, this, true);
  return positive;
};

/**
 * Waits a fixed time period before moving to the next block.
 *
 * @deprecated Use waitsFor() instead
 * @param {Number} timeout milliseconds to wait
 */
jasmine.Spec.prototype.waits = function(timeout) {
  var waitsFunc = new jasmine.WaitsBlock(this.env, timeout, this);
  this.addToQueue(waitsFunc);
  return this;
};

/**
 * Waits for the latchFunction to return true before proceeding to the next block.
 *
 * @param {Function} latchFunction
 * @param {String} optional_timeoutMessage
 * @param {Number} optional_timeout
 */
jasmine.Spec.prototype.waitsFor = function(latchFunction, optional_timeoutMessage, optional_timeout) {
  var latchFunction_ = null;
  var optional_timeoutMessage_ = null;
  var optional_timeout_ = null;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    switch (typeof arg) {
      case 'function':
        latchFunction_ = arg;
        break;
      case 'string':
        optional_timeoutMessage_ = arg;
        break;
      case 'number':
        optional_timeout_ = arg;
        break;
    }
  }

  var waitsForFunc = new jasmine.WaitsForBlock(this.env, optional_timeout_, latchFunction_, optional_timeoutMessage_, this);
  this.addToQueue(waitsForFunc);
  return this;
};

jasmine.Spec.prototype.fail = function (e) {
  var expectationResult = new jasmine.ExpectationResult({
    passed: false,
    message: e ? jasmine.util.formatException(e) : 'Exception',
    trace: { stack: e.stack }
  });
  this.results_.addResult(expectationResult);
};

jasmine.Spec.prototype.getMatchersClass_ = function() {
  return this.matchersClass || this.env.matchersClass;
};

jasmine.Spec.prototype.addMatchers = function(matchersPrototype) {
  var parent = this.getMatchersClass_();
  var newMatchersClass = function() {
    parent.apply(this, arguments);
  };
  jasmine.util.inherit(newMatchersClass, parent);
  jasmine.Matchers.wrapInto_(matchersPrototype, newMatchersClass);
  this.matchersClass = newMatchersClass;
};

jasmine.Spec.prototype.finishCallback = function() {
  this.env.reporter.reportSpecResults(this);
};

jasmine.Spec.prototype.finish = function(onComplete) {
  this.removeAllSpies();
  this.finishCallback();
  if (onComplete) {
    onComplete();
  }
};

jasmine.Spec.prototype.after = function(doAfter) {
  if (this.queue.isRunning()) {
    this.queue.add(new jasmine.Block(this.env, doAfter, this), true);
  } else {
    this.afterCallbacks.unshift(doAfter);
  }
};

jasmine.Spec.prototype.execute = function(onComplete) {
  var spec = this;
  if (!spec.env.specFilter(spec)) {
    spec.results_.skipped = true;
    spec.finish(onComplete);
    return;
  }

  this.env.reporter.reportSpecStarting(this);

  spec.env.currentSpec = spec;

  spec.addBeforesAndAftersToQueue();

  spec.queue.start(function () {
    spec.finish(onComplete);
  });
};

jasmine.Spec.prototype.addBeforesAndAftersToQueue = function() {
  var runner = this.env.currentRunner();
  var i;

  for (var suite = this.suite; suite; suite = suite.parentSuite) {
    for (i = 0; i < suite.before_.length; i++) {
      this.queue.addBefore(new jasmine.Block(this.env, suite.before_[i], this));
    }
  }
  for (i = 0; i < runner.before_.length; i++) {
    this.queue.addBefore(new jasmine.Block(this.env, runner.before_[i], this));
  }
  for (i = 0; i < this.afterCallbacks.length; i++) {
    this.queue.add(new jasmine.Block(this.env, this.afterCallbacks[i], this), true);
  }
  for (suite = this.suite; suite; suite = suite.parentSuite) {
    for (i = 0; i < suite.after_.length; i++) {
      this.queue.add(new jasmine.Block(this.env, suite.after_[i], this), true);
    }
  }
  for (i = 0; i < runner.after_.length; i++) {
    this.queue.add(new jasmine.Block(this.env, runner.after_[i], this), true);
  }
};

jasmine.Spec.prototype.explodes = function() {
  throw 'explodes function should not have been called';
};

jasmine.Spec.prototype.spyOn = function(obj, methodName, ignoreMethodDoesntExist) {
  if (obj == jasmine.undefined) {
    throw "spyOn could not find an object to spy upon for " + methodName + "()";
  }

  if (!ignoreMethodDoesntExist && obj[methodName] === jasmine.undefined) {
    throw methodName + '() method does not exist';
  }

  if (!ignoreMethodDoesntExist && obj[methodName] && obj[methodName].isSpy) {
    throw new Error(methodName + ' has already been spied upon');
  }

  var spyObj = jasmine.createSpy(methodName);

  this.spies_.push(spyObj);
  spyObj.baseObj = obj;
  spyObj.methodName = methodName;
  spyObj.originalValue = obj[methodName];

  obj[methodName] = spyObj;

  return spyObj;
};

jasmine.Spec.prototype.removeAllSpies = function() {
  for (var i = 0; i < this.spies_.length; i++) {
    var spy = this.spies_[i];
    spy.baseObj[spy.methodName] = spy.originalValue;
  }
  this.spies_ = [];
};

/**
 * Internal representation of a Jasmine suite.
 *
 * @constructor
 * @param {jasmine.Env} env
 * @param {String} description
 * @param {Function} specDefinitions
 * @param {jasmine.Suite} parentSuite
 */
jasmine.Suite = function(env, description, specDefinitions, parentSuite) {
  var self = this;
  self.id = env.nextSuiteId ? env.nextSuiteId() : null;
  self.description = description;
  self.queue = new jasmine.Queue(env);
  self.parentSuite = parentSuite;
  self.env = env;
  self.before_ = [];
  self.after_ = [];
  self.children_ = [];
  self.suites_ = [];
  self.specs_ = [];
};

jasmine.Suite.prototype.getFullName = function() {
  var fullName = this.description;
  for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {
    fullName = parentSuite.description + ' ' + fullName;
  }
  return fullName;
};

jasmine.Suite.prototype.finish = function(onComplete) {
  this.env.reporter.reportSuiteResults(this);
  this.finished = true;
  if (typeof(onComplete) == 'function') {
    onComplete();
  }
};

jasmine.Suite.prototype.beforeEach = function(beforeEachFunction) {
  beforeEachFunction.typeName = 'beforeEach';
  this.before_.unshift(beforeEachFunction);
};

jasmine.Suite.prototype.afterEach = function(afterEachFunction) {
  afterEachFunction.typeName = 'afterEach';
  this.after_.unshift(afterEachFunction);
};

jasmine.Suite.prototype.results = function() {
  return this.queue.results();
};

jasmine.Suite.prototype.add = function(suiteOrSpec) {
  this.children_.push(suiteOrSpec);
  if (suiteOrSpec instanceof jasmine.Suite) {
    this.suites_.push(suiteOrSpec);
    this.env.currentRunner().addSuite(suiteOrSpec);
  } else {
    this.specs_.push(suiteOrSpec);
  }
  this.queue.add(suiteOrSpec);
};

jasmine.Suite.prototype.specs = function() {
  return this.specs_;
};

jasmine.Suite.prototype.suites = function() {
  return this.suites_;
};

jasmine.Suite.prototype.children = function() {
  return this.children_;
};

jasmine.Suite.prototype.execute = function(onComplete) {
  var self = this;
  this.queue.start(function () {
    self.finish(onComplete);
  });
};
jasmine.WaitsBlock = function(env, timeout, spec) {
  this.timeout = timeout;
  jasmine.Block.call(this, env, null, spec);
};

jasmine.util.inherit(jasmine.WaitsBlock, jasmine.Block);

jasmine.WaitsBlock.prototype.execute = function (onComplete) {
  if (jasmine.VERBOSE) {
    this.env.reporter.log('>> Jasmine waiting for ' + this.timeout + ' ms...');
  }
  this.env.setTimeout(function () {
    onComplete();
  }, this.timeout);
};
/**
 * A block which waits for some condition to become true, with timeout.
 *
 * @constructor
 * @extends jasmine.Block
 * @param {jasmine.Env} env The Jasmine environment.
 * @param {Number} timeout The maximum time in milliseconds to wait for the condition to become true.
 * @param {Function} latchFunction A function which returns true when the desired condition has been met.
 * @param {String} message The message to display if the desired condition hasn't been met within the given time period.
 * @param {jasmine.Spec} spec The Jasmine spec.
 */
jasmine.WaitsForBlock = function(env, timeout, latchFunction, message, spec) {
  this.timeout = timeout || env.defaultTimeoutInterval;
  this.latchFunction = latchFunction;
  this.message = message;
  this.totalTimeSpentWaitingForLatch = 0;
  jasmine.Block.call(this, env, null, spec);
};
jasmine.util.inherit(jasmine.WaitsForBlock, jasmine.Block);

jasmine.WaitsForBlock.TIMEOUT_INCREMENT = 10;

jasmine.WaitsForBlock.prototype.execute = function(onComplete) {
  if (jasmine.VERBOSE) {
    this.env.reporter.log('>> Jasmine waiting for ' + (this.message || 'something to happen'));
  }
  var latchFunctionResult;
  try {
    latchFunctionResult = this.latchFunction.apply(this.spec);
  } catch (e) {
    this.spec.fail(e);
    onComplete();
    return;
  }

  if (latchFunctionResult) {
    onComplete();
  } else if (this.totalTimeSpentWaitingForLatch >= this.timeout) {
    var message = 'timed out after ' + this.timeout + ' msec waiting for ' + (this.message || 'something to happen');
    this.spec.fail({
      name: 'timeout',
      message: message
    });

    this.abort = true;
    onComplete();
  } else {
    this.totalTimeSpentWaitingForLatch += jasmine.WaitsForBlock.TIMEOUT_INCREMENT;
    var self = this;
    this.env.setTimeout(function() {
      self.execute(onComplete);
    }, jasmine.WaitsForBlock.TIMEOUT_INCREMENT);
  }
};

jasmine.version_= {
  "major": 1,
  "minor": 3,
  "build": 1,
  "revision": 1354556913
};
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.2 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, jQuery, setTimeout, opera */


var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.2',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        aps = ap.slice,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && navigator && document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value !== 'string') {
                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    //Allow getting a global that expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite and existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                pkgs: {},
                shim: {},
                map: {},
                config: {}
            },
            registry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; ary[i]; i += 1) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment,
                foundMap, foundI, foundStarMap, starI,
                baseParts = baseName && baseName.split('/'),
                normalizedBaseParts = baseParts,
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name && name.charAt(0) === '.') {
                //If have a base name, try to normalize against it,
                //otherwise, assume it is a top-level require that will
                //be relative to baseUrl in the end.
                if (baseName) {
                    if (getOwn(config.pkgs, baseName)) {
                        //If the baseName is a package name, then just treat it as one
                        //name to concat the name with.
                        normalizedBaseParts = baseParts = [baseName];
                    } else {
                        //Convert baseName to array, and lop off the last part,
                        //so that . matches that 'directory' and not name of the baseName's
                        //module. For instance, baseName of 'one/two/three', maps to
                        //'one/two/three.js', but we want the directory, 'one/two' for
                        //this normalization.
                        normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    }

                    name = normalizedBaseParts.concat(name.split('/'));
                    trimDots(name);

                    //Some use of packages may use a . path to reference the
                    //'main' module name, so normalize for that.
                    pkgConfig = getOwn(config.pkgs, (pkgName = name[0]));
                    name = name.join('/');
                    if (pkgConfig && name === pkgName + '/' + pkgConfig.main) {
                        name = pkgName;
                    }
                } else if (name.indexOf('./') === 0) {
                    // No baseName, so this is ID is resolved relative
                    // to baseUrl, pull off the leading dot.
                    name = name.substring(2);
                }
            }

            //Apply map config if available.
            if (applyMap && (baseParts || starMap) && map) {
                nameParts = name.split('/');

                for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break;
                                }
                            }
                        }
                    }

                    if (foundMap) {
                        break;
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            return name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                removeScript(id);
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        normalizedName = normalize(name, parentName, applyMap);
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                getModule(depMap).on(name, fn);
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length - 1, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return mod.exports;
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return (config.config && getOwn(config.config, mod.map.id)) || {};
                        },
                        exports: defined[mod.map.id]
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var map, modId, err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(registry, function (mod) {
                map = mod.map;
                modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks is the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error.
                            if (this.events.error) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            if (this.map.isDefine) {
                                //If setting exports via 'module' is in play,
                                //favor that over return value and exports. After that,
                                //favor a non-undefined return value over exports use.
                                cjsModule = this.module;
                                if (cjsModule &&
                                        cjsModule.exports !== undefined &&
                                        //Make sure it is not already the exports value
                                        cjsModule.exports !== this.exports) {
                                    exports = cjsModule.exports;
                                } else if (exports === undefined && this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = [this.map.id];
                                err.requireType = 'define';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        delete registry[id];

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true,
                            skipMap: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            throw new Error('fromText eval for ' + moduleName +
                                            ' failed: ' + e);
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', this.errback);
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths and packages since they require special processing,
                //they are additive.
                var pkgs = config.pkgs,
                    shim = config.shim,
                    objs = {
                        paths: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (prop === 'map') {
                            mixin(config[prop], value, true, true);
                        } else {
                            mixin(config[prop], value, true);
                        }
                    } else {
                        config[prop] = value;
                    }
                });

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;
                        location = pkgObj.location;

                        //Create a brand new object on pkgs, since currentPackages can
                        //be passed in again, and config.pkgs is the internal transformed
                        //state for all package configs.
                        pkgs[pkgObj.name] = {
                            name: pkgObj.name,
                            location: location || pkgObj.name,
                            //Remove leading dot in main, so main paths are normalized,
                            //and remove any trailing .js, since different package
                            //envs have different conventions: some use a module name,
                            //some use a file name.
                            main: (pkgObj.main || 'main')
                                  .replace(currDirRegExp, '')
                                  .replace(jsSuffixRegExp, '')
                        };
                    });

                    //Done with modifications, assing packages back to context config
                    config.pkgs = pkgs;
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var index = moduleNamePlusExt.lastIndexOf('.'),
                            ext = null;

                        if (index !== -1) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. parent module is passed in for context,
             * used by the optimizer.
             */
            enable: function (depMap, parent) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext) {
                var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url,
                    parentPath;

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;
                    pkgs = config.pkgs;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');
                        pkg = getOwn(pkgs, parentModule);
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        } else if (pkg) {
                            //If module name is just the package name, then looking
                            //for the main module.
                            if (moduleName === pkg.name) {
                                pkgPath = pkg.location + '/' + pkg.main;
                            } else {
                                pkgPath = pkg.location;
                            }
                            syms.splice(0, i, pkgPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/\?/.test(url) ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callack function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error', evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = function (err) {
        throw err;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = config.xhtml ?
                    document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                    document.createElement('script');
            node.type = config.scriptType || 'text/javascript';
            node.charset = 'utf-8';
            node.async = true;

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEvenListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            //In a web worker, use importScripts. This is not a very
            //efficient use of importScripts, importScripts will block until
            //its script is downloaded and evaluated. However, if web workers
            //are in play, the expectation that a build has been done so that
            //only one script needs to be loaded anyway. This may need to be
            //reevaluated if other use cases become common.
            importScripts(url);

            //Account for anonymous modules
            context.completeLoad(moduleName);
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = dataMain.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                    dataMain = mainScript;
                }

                //Strip off any trailing .js since dataMain is now
                //like a module name.
                dataMain = dataMain.replace(jsSuffixRegExp, '');

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = [];
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps.length && isFunction(callback)) {
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));
function testLoader(){
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var currentWindowOnload = window.onload;

	window.onload = function() {
		var count = 0;
		var loadCoffee = function(files) {
			for (var i = 0, len = files.length; i < len; i++) {
				count++;
				CoffeeScript.load(files[i], function() {
					count--;
					if (!count) {
						jasmine.getFixtures().fixturesPath = 'fixtures';
						execJasmine();
					}
				});
			}
		};

		if (currentWindowOnload) {
			currentWindowOnload();
		}
		loadCoffee([
			'waypoints.coffee',
			'infinite.coffee',
			'sticky.coffee'
		]);
	};

	function execJasmine() {
		jasmineEnv.execute();
	}

	if (document.readyState === 'complete'){
		window.onload();
	}
}
;
/* global jasmine */


jasmine.getFixtures().fixturesPath = 'test/fixtures'
jasmine.getEnv().defaultTimeoutInterval = 1000
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint, jasmine
 */

describe('Waypoint Sticky Shortcut', function() {
  var $ = window.jQuery
  var standard = 50
  var $scroller = $(window)
  var $sticky, waypoint, handlerSpy

  beforeEach(function() {
    loadFixtures('sticky.html')
    $sticky = $('.sticky')
    handlerSpy = jasmine.createSpy('on handler')
    waypoint = new Waypoint.Sticky({
      element: $sticky[0],
      handler: handlerSpy
    })
  })

  afterEach(function() {
    if (waypoint) {
      waypoint.destroy()
    }
    $scroller.scrollTop(0)
    waits(standard)
  })

  describe('on init', function() {
    afterEach(function() {
      waypoint.destroy()
    })

    it('returns an instance of the Waypoint.Sticky class', function() {
      expect(waypoint instanceof Waypoint.Sticky).toBeTruthy()
    })

    it('wraps the sticky element on init', function() {
      expect($sticky.parent()).toHaveClass('sticky-wrapper')
    })

    describe('when sticky element is scrolled to', function() {
      beforeEach(function() {
        runs(function() {
          $scroller.scrollTop($sticky.offset().top)
        })
        waitsFor(function() {
          return $sticky.hasClass('stuck')
        }, 'stuck class to apply')
      })

      it('adds/removes stuck class', function() {
        runs(function() {
          $scroller.scrollTop($scroller.scrollTop() - 1)
        })
        waitsFor(function() {
          return !$sticky.hasClass('stuck')
        })
      })

      it('gives the wrapper the same height as the sticky element', function() {
        expect($sticky.parent().height()).toEqual($sticky.outerHeight())
      })

      it('executes handler option after stuck class applied', function() {
        waitsFor(function() {
          return handlerSpy.callCount
        }, 'callback to trigger')
      })
    })
  })

  describe('#destroy', function() {
    beforeEach(function() {
      runs(function() {
        $scroller.scrollTop($sticky.offset().top)
      })
      waitsFor(function() {
        return handlerSpy.callCount
      })
      runs(function() {
        waypoint.destroy()
      })
    })

    it('unwraps the sticky element', function() {
      expect($sticky.parent()).not.toHaveClass('sticky-wrapper')
    })

    it('removes the stuck class', function() {
      expect($sticky).not.toHaveClass('stuck')
    })
  })
})
;
'use strict'
/* global
 * describe, it, beforeEach, afterEach, expect, spyOn, waits, runs,
 * waitsFor, loadFixtures, Waypoint
 */

window.jQuery.each(Waypoint.adapters, function(i, adapter) {
  describe(adapter.name + ' adapter: ', function() {
    describe('Waypoint', function() {
      var $ = window.jQuery
      var standard = 50
      var hit, $scroller, waypoint, $target, returnValue

      function setHitTrue() {
        hit = true
      }

      function hitToBeTrue() {
        return hit
      }

      beforeEach(function() {
        Waypoint.Adapter = adapter.Adapter
        loadFixtures('standard.html')
        $scroller = $(window)
        hit = false
        waypoint = null
      })

      afterEach(function() {
        Waypoint.destroyAll()
        $scroller.scrollTop(0).scrollLeft(0)
        waits(standard)
      })

      describe('new Waypoint()', function() {
        it('errors out', function() {
          expect(function() {
            waypoint = new Waypoint()
          }).toThrow()
        })
      })

      describe('new Waypoint(options)', function() {
        it('returns an instance of the Waypoint class', function() {
          waypoint = new Waypoint({
            element: document.getElementById('same1'),
            handler: function() {}
          })
          expect(waypoint instanceof Waypoint).toBeTruthy()
        })

        it('requires the element option', function() {
          expect(function() {
            waypoint = new Waypoint({
              handler: function() {}
            })
          }).toThrow()
        })

        it('requires the handler option', function() {
          expect(function() {
            waypoint = new Waypoint({
              element: document.getElementById('same1')
            })
          }).toThrow()
        })

        it('triggers down on new already-reached waypoints', function() {
          runs(function() {
            $target = $('#same2')
            $scroller.scrollTop($target.offset().top + 1)
          })
          waits(standard)
          runs(function() {
            waypoint = new Waypoint({
              element: $target[0],
              handler: function(direction) {
                hit = direction === 'down'
              }
            })
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })
      })

      describe('handler option', function() {
        var currentDirection

        beforeEach(function() {
          $target = $('#same1')
          currentDirection = null
          waypoint = new Waypoint({
            element: $target[0],
            handler: function(direction) {
              currentDirection = direction
            }
          })
        })

        it('triggers with direction parameter', function() {
          runs(function() {
            $scroller.scrollTop($target.offset().top)
          })
          waitsFor(function() {
            return currentDirection === 'down'
          }, 'down to trigger')
          runs(function() {
            $scroller.scrollTop($target.offset().top - 1)
          })
          waitsFor(function() {
            return currentDirection === 'up'
          }, 'up to trigger')
        })
      })

      describe('offset option', function() {
        beforeEach(function() {
          $target = $('#same1')
        })

        it('takes a px offset', function(){
          runs(function() {
            waypoint = new Waypoint({
              element: $target[0],
              handler: setHitTrue,
              offset: 50
            })
            $scroller.scrollTop($target.offset().top - 51)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop($target.offset().top - 50)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('takes a % offset', function() {
          var trigger = $target.offset().top - Waypoint.viewportHeight() * 0.37
          runs(function() {
            waypoint = new Waypoint({
              element: $target[0],
              handler: setHitTrue,
              offset: '37%'
            })
            $scroller.scrollTop(trigger - 1)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(trigger)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('takes a function offset', function() {
          runs(function() {
            waypoint = new Waypoint({
              element: $target[0],
              handler: setHitTrue,
              offset: function() {
                return -$(this.element).height()
              }
            })
            $scroller.scrollTop($target.offset().top + $target.height() - 1)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop($target.offset().top + $target.height())
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('takes a bottom-in-view function alias', function() {
          var top = $target.offset().top
          var height = $target.outerHeight()
          var windowHeight = Waypoint.viewportHeight()
          var inview = top + height - windowHeight
          runs(function() {
            waypoint = new Waypoint({
              element: $target[0],
              handler: setHitTrue,
              offset: 'bottom-in-view'
            })
            $scroller.scrollTop(inview - 1)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(inview)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })
      })

      describe('context option', function() {
        beforeEach(function() {
          $scroller = $('#bottom')
          $target = $('#inner3')
        })

        it('works with px offset', function() {
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue,
            context: $scroller[0],
            offset: 10
          })
          runs(function() {
            $scroller.scrollTop(189)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(190)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('works with % offset', function() {
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue,
            context: $scroller[0],
            offset: '100%'
          })
          runs(function() {
            $scroller.scrollTop(149)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(150)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('works with function offset', function() {
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue,
            context: $scroller[0],
            offset: function() {
              return $(this.element).height() / 2
            }
          })
          runs(function() {
            $scroller.scrollTop(149)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(150)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })

        it('works with bottom-in-view offset alias', function() {
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue,
            context: $scroller[0],
            offset: 'bottom-in-view'
          })
          runs(function() {
            $scroller.scrollTop(249)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
            $scroller.scrollTop(250)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })
      })

      describe('horizontal option', function() {
        var currentDirection

        beforeEach(function() {
          currentDirection = null
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            horizontal: true,
            handler: function(direction) {
              currentDirection = direction
            }
          })
        })

        it('triggers right/left directions', function() {
          runs(function() {
            $scroller.scrollLeft($target.offset().left)
          })
          waitsFor(function() {
            return currentDirection === 'right'
          }, 'right direction to trigger')
          runs(function() {
            $scroller.scrollLeft($target.offset().left - 1)
          })
          waitsFor(function() {
            return currentDirection === 'left'
          })
        })
      })

      describe('continuous option', function() {
        var $later, laterWaypoint, hitCount, hitWaypoint

        function incrementHitCount() {
          hitCount += 1
          hitWaypoint = this
        }

        beforeEach(function() {
          $target = $('#same1')
          $later = $('#near1')
          hitCount = 0
          waypoint = new Waypoint({
            element: $target[0],
            continuous: false,
            handler: incrementHitCount
          })
          laterWaypoint = new Waypoint({
            element: $later[0],
            continuous: false,
            handler: incrementHitCount
          })
        })

        it('does not trigger the earlier waypoint', function() {
          runs(function() {
            $scroller.scrollTop($later.offset().top)
          })
          waitsFor(function() {
            return hitCount
          }, 'later callback to trigger')
          runs(function() {
            expect(hitCount).toEqual(1)
            expect(hitWaypoint).toEqual(laterWaypoint)
          })
        })

        it('prevents earlier trigger on refresh', function() {
          runs(function() {
            $target.css('top', '-1px')
            $later.css('top', '-2px')
            Waypoint.refreshAll()
          })
          waitsFor(function() {
            return hitCount
          }, 'later callback to trigger')
          runs(function() {
            expect(hitCount).toEqual(1)
            expect(hitWaypoint).toEqual(waypoint)
          })
        })
      })

      describe('with window as the waypoint element', function() {
        beforeEach(function() {
          $target = $(window)
          waypoint = new Waypoint({
            element: $target[0],
            offset: -$target.height(),
            handler: setHitTrue
          })
        })

        it('triggers waypoint', function() {
          runs(function() {
            $target.scrollTop($target.height() + 1)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })
      })

      describe('#disable()', function() {
        beforeEach(function() {
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue
          })
          returnValue = waypoint.disable()
        })

        it('returns the same waypoint object for chaining', function() {
          expect(returnValue).toEqual(waypoint)
        })

        it('disables callback triggers', function() {
          runs(function() {
            $scroller.scrollTop($target.offset().top)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
          })
        })
      })

      describe('#enable()', function() {
        beforeEach(function() {
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue
          })
          waypoint.disable()
          returnValue = waypoint.enable()
        })

        it('returns the same waypoint instance for chaining', function() {
          expect(returnValue).toEqual(waypoint)
        })

        it('enables callback triggers', function() {
          runs(function() {
            $scroller.scrollTop($target.offset().top)
          })
          waitsFor(hitToBeTrue, 'callback to trigger')
        })
      })

      describe('#destroy()', function() {
        beforeEach(function() {
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue
          })
          returnValue = waypoint.destroy()
        })

        it('returns undefined', function() {
          expect(returnValue).toBeUndefined()
        })

        it('no longer triggers callbacks', function() {
          runs(function() {
            $scroller.scrollTop($target.offset().top)
          })
          waits(standard)
          runs(function() {
            expect(hit).toBeFalsy()
          })
        })
      })

      describe('#previous', function() {
        beforeEach(function() {
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue
          })
        })

        it('calls previous on the waypoint group', function() {
          spyOn(waypoint.group, 'previous')
          waypoint.previous()
          expect(waypoint.group.previous).toHaveBeenCalledWith(waypoint)
        })

        it('returns the group call results', function() {
          expect(waypoint.previous()).toBeNull()
        })
      })

      describe('#next', function() {
        beforeEach(function() {
          $target = $('#same1')
          waypoint = new Waypoint({
            element: $target[0],
            handler: setHitTrue
          })
        })

        it('calls next on the waypoint group', function() {
          spyOn(waypoint.group, 'next')
          waypoint.next()
          expect(waypoint.group.next).toHaveBeenCalledWith(waypoint)
        })

        it('returns the group call results', function() {
          expect(waypoint.next()).toBeNull()
        })
      })

      describe('Waypoint.viewportHeight()', function() {
        it('returns window innerHeight if it exists', function() {
          var height = Waypoint.viewportHeight()
          if (window.innerHeight) {
            expect(height).toEqual(window.innerHeight)
          }
          else {
            expect(height).toEqual(document.documentElement.clientHeight)
          }
        })
      })

      describe('Waypoint.viewportWidth()', function() {
        it('returns client width', function() {
          var clientWidth = document.documentElement.clientWidth
          expect(Waypoint.viewportWidth()).toEqual(clientWidth)
        })
      })

      describe('Waypoint.refreshAll()', function() {
        it('is an alias for Waypoint.Context.refreshAll', function() {
          spyOn(Waypoint.Context, 'refreshAll')
          Waypoint.refreshAll()
          expect(Waypoint.Context.refreshAll).toHaveBeenCalled()
        })
      })

      describe('Waypoint.destroyAll()', function() {
        it('calls destroy on all waypoints', function() {
          var secondWaypoint = new Waypoint({
            element: $('#same1')[0],
            handler: function() {}
          })
          waypoint = new Waypoint({
            element: $('#same1')[0],
            handler: function() {}
          })
          spyOn(secondWaypoint, 'destroy').andCallThrough()
          spyOn(waypoint, 'destroy').andCallThrough()
          Waypoint.destroyAll()
          expect(secondWaypoint.destroy).toHaveBeenCalled()
          expect(waypoint.destroy).toHaveBeenCalled()
          waypoint = null
        })
      })
    })
  })
})
;
$(function(){

	$("button").on("click", function(){
		$(".container").toggleClass('animated zoomOutDown');
	});
});
/*!
Waypoints - 3.0.0
Copyright © 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.destroyAll=function(){var t=[];for(var e in i)t.push(i[e]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t,s=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,r(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,r(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=n.oldScroll<a.triggerPoint,h=n.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element===this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element===this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element===this.element.window,i=this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in t){var r=t[o];for(var s in this.waypoints[o]){var a,l,h,p,u,c=this.waypoints[o][s],f=c.options.offset,d=c.triggerPoint,y=0,g=null==d;c.element!==c.element.window&&(y=c.adapter.offset()[r.offsetProp]),"function"==typeof f?f=f.apply(c):"string"==typeof f&&(f=parseFloat(f),c.options.offset.indexOf("%")>-1&&(f=Math.ceil(r.contextDimension*f/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=y+a-f,l=d<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!g&&p?(c.queueTrigger(r.backward),n[c.group.id]=c.group):!g&&u?(c.queueTrigger(r.forward),n[c.group.id]=c.group):g&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),n[c.group.id]=c.group)}}for(var w in n)n[w].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){s&&s(),e.refreshAll()},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var r=0,s=n.length;s>r;r+=1){var a=n[r];(a.options.continuous||r===n.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function i(t){this.element=t,this.handlers={}}var n=window.Waypoint;i.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function i(t,e,i){for(var n=0,o=e.length-1;o>n;n++){var r=e[n];i&&i!==r||t.removeEventListener(r)}}var n=t.split("."),o=n[0],r=n[1],s=this.element;if(r&&this.handlers[r]&&o)i(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)i(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])i(s,this.handlers[r][l],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,i=e(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),{top:n.top+i.pageYOffset-t.clientTop,left:n.left+i.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var i=t.split("."),n=i[0],o=i[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[n]=r[n]||[];s.push(e),this.element.addEventListener(n,e)},i.prototype.outerHeight=function(e){var i,n=this.innerHeight();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginTop,10),n+=parseInt(i.marginBottom,10)),n},i.prototype.outerWidth=function(e){var i,n=this.innerWidth();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginLeft,10),n+=parseInt(i.marginRight,10)),n},i.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}for(var e=Array.prototype.slice.call(arguments),i=1,n=e.length;n>i;i++)t(e[0],e[i]);return e[0]},i.inArray=function(t,e,i){return null==e?-1:e.indexOf(t,i)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},n.adapters.push({name:"noframework",Adapter:i}),n.Adapter=i}();
(function() {


}).call(this);
$(function(){
	$(".namecard").toggleClass('animated rollIn');
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




;

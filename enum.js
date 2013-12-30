"use strict";

/** @type {int} */
var s = 1000;
/** @type {int} */
var m = s * 60;
/** @type {int} */
var h = m * 60;
/** @type {int} */
var d = h * 24;
/** @type {int} */
var w = d * 7;

/**
 * @enum {Number}
 * @const
 */
exports.time = { second: s, minute: m, hour: h, day: d, week: w };

/**
 * @type {Array.<String>}
 * @const
 * @static
 */
exports.month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
 * @type {Array.<String>}
 * @const
 * @static
 */
exports.weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/**
 * @enum {Number}
 * @const
 * @static
 */
exports.httpStatus =
{
	ok: 200,
	temporaryRedirect: 301,
	permanentRedirect: 302,
	forbidden: 403,
	notFound: 404,
	internalError: 500,
	unsupported: 501,
	badGateway: 502,
	unavailable: 503
};

/**
 * @enum {RegExp}
 * @const
 */
exports.pattern =
{
	haiku: /^([ \w]{5,100})\r*\n([ \w]{5,100})\r*\n([ \w]{5,100})[\t\r\n]*/gi,
	allPoem: /^[^\r\n]{5,75}\r*\n[^\r\n]{5,75}/gi,
	// exclude trailing comma -- can't remember why; also used to exclude trailing question mark
	poetry: /[\r\n]{1,2}((([^\r\n](?![,]”)){5,80}[\r\n]{1,2}){3,})/gi,
	newLine: /(\r\n|\n|\r)/gm,
	superscript: /([¹²³⁴⁵⁶⁷])/g,
	/**
	 * @example Video (960x720): <a href="http://youtu.be/obCgu3yJ4uw" rel="nofollow">youtu.be/obCgu3yJ4uw</a>
	 */
	video: /Video(\s*\((\d+)[x×](\d+)\))?:\s*<a[^>]+>[^\/]+\/([\w\-_]+)<\/a>/gi,
	url: /(http:\/\/[^\s\r\n]+)/g,
	link: /<a href=["']([^"']+)['"][^>]*>([^<]+)<\/a>/g,
	badLinkTag: /<\/a>(\([\w\.\-%\)\(]+)/g,
	footnotes: /((<p><\/p>)?<p>\s*<\/p>)?((<p>|\[POEM\])[*¹²³⁴⁵⁶⁷].+)$/gm,
	blockQuote: /[\r\n]*(“[^”]{275,}”[¹²³⁴⁵⁶⁷]*)\s*[\r\n]/g,
	/**
	 * Facebook album ID to be inserted into Enum.url.facebookAlbum
	 * @example 296706240428897.53174
	 * @example 296706240428897.53174
	 */
	facebookID: /\d{15}\.\d{5}/g,
	/** @see http://www.regular-expressions.info/regexbuddy/email.html */
	email: /\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi,
	machineTag: /=/g
};
/*
 * Provide some useful TiddlySpace helper functions
 */
(function(exports, $) {
	"use strict";

	/*
	 * perform ajax setup steps
	 */
	function ajaxSetup() {
		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader("X-ControlView", "false");
			}
		});
	}

	/*
	 * Turn a TiddlyWeb date into a date object
	 */
	function toDate(date) {
		return new Date(Date.UTC(
			parseInt(date.substr(0, 4), 10),
			parseInt(date.substr(4, 2), 10) - 1,
			parseInt(date.substr(6, 2), 10),
			parseInt(date.substr(8, 2), 10),
			parseInt(date.substr(10, 2), 10),
			parseInt(date.substr(12, 2) || "0", 10),
			parseInt(date.substr(14, 3) || "0", 10)
		));
	}

	/*
	 * returns url of the SiteIcon to use
	 */
	function getSiteIconURL(username) {
		if (!username || username === 'GUEST') {
			return 'http://tiddlyspace.com/SiteIcon';
		}
		return 'http://tiddlyspace.com/bags/' + username +
		'_public/tiddlers/SiteIcon';
	}

	/*
	 * Get user details from status.js (or server)
	 */
	function getUserDetails(callback) {
		if (window.tiddlyweb && tiddlyweb.status) {
			callback(tiddlyweb.status);
		} else {
			$.getJSON('/status.js', callback);
		}
	}

	/*
	 * checks if string is an acceptable space name
	 * returns boolean
	 */
	function isValidSpaceName(name) {
		return name.match(/^[a-z][0-9a-z\-]*[0-9a-z]$/) ? true : false;
	}

	/*
	 * turn string of tags back into tag array
	 */
	function stringToTags(tagString) {
		var brackets = /^\s*\[\[([^\]\]]+)\]\](\s*.*)/,
			whitespace = /^\s*([^\s]+)(\s*.*)/,
			match,
			rest = tagString,
			tags = [];

		match = brackets.exec(rest) || whitespace.exec(rest);
		while (match) {
			tags.push(match[1]);
			rest = match[2];
			match = brackets.exec(rest) || whitespace.exec(rest);
		}

		return tags;
	}

	/*
	 * turn tags array into a string
	 */
	function tagsToString(tags) {
		if (tags == null) { tags = []; }

		var tagString = '';
		tags.forEach(function(tag) {
			if (/( |\t|\n|\r|\[|\])/.test(tag)) {
				tagString += '[[' + tag + ']] ';
			} else {
				tagString += tag + ' ';
			}
		});

		return tagString.slice(0, tagString.length - 1);
	}

	// export _ts object with all available funcs
	exports._ts = {
		ajaxSetup: ajaxSetup,
		toDate: toDate,
		getSiteIconURL: getSiteIconURL,
		getUserDetails: getUserDetails,
		isValidSpaceName: isValidSpaceName,
		stringToTags: stringToTags,
		tagsToString: tagsToString
	};

}(window, jQuery));

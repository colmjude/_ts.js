describe('_ts.js library', function() {

	it('exists and is available on the window', function() {
		expect(window._ts).not.toBeUndefined();
		expect(window._ts).not.toBeNull();
	});

	describe('the isValidSpaceName function', function() {
		var str = "colmjude";

		it('should return true if the string is valid', function() {
			expect(_ts.isValidSpaceName( str )).toBe(true);
		});

		it('should return false if the string contains special chars', function() {
			str = str + "_";
			expect(_ts.isValidSpaceName( str )).toBe(false);
		});

	});

	describe('the getSiteIconURL function', function() {

		it('should return url to default SiteIcon', function() {
			var expected = "http://tiddlyspace.com/SiteIcon";
			expect(_ts.getSiteIconURL()).toBe(expected);
			expect(_ts.getSiteIconURL("GUEST")).toBe(expected);
		});

		it('should return url to the siteIcon of the given space', function() {
			var spacename = "colmjude";
			expect(_ts.getSiteIconURL( spacename )).toBe("http://tiddlyspace.com/bags/colmjude_public/tiddlers/SiteIcon");
		});

	});

	describe('the stringToTags function', function() {
		var result,
			tagStr = "tag1 [[the 2nd tag]]";

		beforeEach(function() {
			this.addMatchers({
				toBeArray: function() {
					return toString.call(this.actual) === "[object Array]";
				}
			});
			result = _ts.stringToTags(tagStr);
		});

		it('should output an array', function() {
			expect(_ts.stringToTags("")).toBeArray();
			expect(result).toBeArray();
		});

		it('should put single word tags into a single place in the output array', function() {
			expect(result[0]).toBe("tag1");
		});

		it('should put multi word tags into a single place in the output array', function() {
			expect(result[1]).toBe("the 2nd tag");
		});

	});

});

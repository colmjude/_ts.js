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

});

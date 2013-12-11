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

	describe('the tagsToString function', function() {
		var result;

		it('should return all tags in a single string', function() {
			result = _ts.tagsToString(['tag1', 'tag2']);
			expect(result).toBe("tag1 tag2");
		});

		it('should put multi word tags in tiddlywiki brackets [[]]', function() {
			result = _ts.tagsToString(['multi word tag']);
			expect(result).toBe("[[multi word tag]]");
		});

	});

	describe('the userIsAMember function', function() {
		var result,
			statusObj = {
				space: {
					recipe: "some-space_private",
					name: "Some name"
				}
			};

		beforeEach(function() {
			result = undefined;
		});

		it('should return true if the recipe contains private suffix', function() {
			result = _ts.userIsAMember(statusObj);
			expect(result).toBeTruthy();
		});

		it('should return false if the recipe contains public suffix', function() {
			statusObj.space.recipe = "some-space_public";
			result = _ts.userIsAMember(statusObj);
			expect(result).toBeFalsy();
		});
	});

    describe('the friendlyURI function', function() {
        var uri = "http://colm-htmlrep.tiddlyspace.com/bags/colm-htmlrep_public/tiddlers/HtmlJavascript",
            friendlyUri = "http://colm-htmlrep.tiddlyspace.com/HtmlJavascript";

        it('should return a friendly uri given canonical', function() {
            expect( _ts.friendlyURI(uri) ).toBe( friendlyUri );
        });
    });

    describe('the spaceFromBag function', function() {
        var space = "colmjude";

        it('should remove _public if bag is the public bag', function() {
            expect( _ts.spaceFromBag("colmjude_public") ).toBe( space );
        });

        it('should remove _private if bag is the private bag', function() {
            expect( _ts.spaceFromBag("colmjude_private") ).toBe( space );
        });

        it('should return str if str does not include private or public suffix', function() {
            expect( _ts.spaceFromBag("colmjude") ).toBe( space );
        });
    });

});

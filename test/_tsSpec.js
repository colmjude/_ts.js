describe('_ts.js library', function() {

	it('exists and is available on the window', function() {
		expect(window._ts).not.toBeUndefined();
		expect(window._ts).not.toBeNull();
	});

});
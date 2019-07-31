"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var nugget_service_1 = require("../../../app/core/service/nugget.service");
describe('NuggetService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(nugget_service_1.NuggetService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=nugget.service.spec.js.map
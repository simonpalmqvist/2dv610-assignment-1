"use strict";
var Action_1 = require("./Action");
var ConsoleUI_1 = require("./ConsoleUI");
var RecipeView_1 = require("./RecipeView");
var View_1 = require("./View");
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var SinonChai = require("sinon-chai");
describe('Class View', function () {
    chai_1.use(SinonChai);
    var stateMock;
    var consoleUIMock;
    var recipeViewMock;
    var sut;
    var blankLines = '\n\n';
    var startMessage = 'Welcome to this beer brewing app!';
    var hopForm = {
        alpha: 14,
        amount: 30,
        name: 'Amarillo',
        time: 60,
    };
    beforeEach(function () {
        stateMock = {};
        recipeViewMock = sinon_1.createStubInstance(RecipeView_1.RecipeView);
        consoleUIMock = sinon_1.createStubInstance(ConsoleUI_1.ConsoleUI);
        sut = new View_1.View(consoleUIMock, recipeViewMock);
    });
    describe('Method', function () {
        describe('render', function () {
            it('Should start new render with two blank rows', function () {
                sut.render(stateMock);
                chai_1.expect(consoleUIMock.print.withArgs(blankLines)).to.be.called;
            });
            it('Should present startup message on first render', function () {
                sut.render(stateMock);
                chai_1.expect(consoleUIMock.print.withArgs(startMessage)).to.be.called;
            });
            it('Should not present startup message second time', function () {
                sut.render(stateMock);
                sut.render(stateMock);
                chai_1.expect(consoleUIMock.print.withArgs(startMessage)).to.be.calledOnce;
            });
            it('Should show recipe information', function () {
                var expected = 'a';
                sut.render(stateMock);
            });
            it('Should show prompt last', function () {
                sut.render(stateMock);
                sinon_1.assert.callOrder(consoleUIMock.print.withArgs(blankLines), consoleUIMock.print.withArgs(startMessage), consoleUIMock.prompt);
            });
        });
        describe('handleUserAction', function () {
            it('Should have registered handler to console UI', function () {
                chai_1.expect(consoleUIMock.registerInputHandler).to.be.called;
            });
            it('Should show prompt after action', function () {
                consoleUIMock.registerInputHandler.callArgWith(0, 'some action');
                chai_1.expect(consoleUIMock.prompt).to.be.called;
            });
            it('Should show message if action doesnt exist', function () {
                var expected = 'Please use one of the following commands: [add hop]';
                consoleUIMock.registerInputHandler.callArgWith(0, 'no action');
                chai_1.expect(consoleUIMock.print).to.be.calledWith(expected);
            });
            it('Should show add hops form when input is "add hop"', function () {
                recipeViewMock.showAddHopsForm.returns(Promise.resolve(hopForm));
                consoleUIMock.registerInputHandler.callArgWith(0, 'add hop');
                chai_1.expect(recipeViewMock.showAddHopsForm).to.be.called;
            });
            it('Should emit action add hops when input is received from form', function (done) {
                var expected = [
                    hopForm.alpha,
                    hopForm.amount,
                    hopForm.name,
                    hopForm.time,
                ];
                recipeViewMock.showAddHopsForm.returns(Promise.resolve(hopForm));
                sut.on(Action_1.default.ADD_HOP, function () {
                    var actual = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        actual[_i - 0] = arguments[_i];
                    }
                    chai_1.expect(actual).to.deep.equal(expected);
                    done();
                });
                consoleUIMock.registerInputHandler.callArgWith(0, 'add hop');
            });
        });
    });
});

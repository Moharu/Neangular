'use strict';

describe('Neangular.neander module', function() {

  beforeEach(module('Neangular.neander'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('NeanderCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});

describe('Neander functions', function() {
    describe('NOP', function(){
        it('should increment access, instructions and PC', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: true,
                AC: 0,
                PC: 0,
                access: 0,
                instructions: 0
            };

            var afterNOPState = {
                memory: Array(256),
                N: false,
                Z: true,
                AC: 0,
                PC: 1,
                access: 1,
                instructions: 1
            };
            expect(NOP(initialState)).toEqual(afterNOPState);
        });
    });
    describe('STA', function(){
        it('should store the AC value in the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 0,
                access: 0,
                instructions: 0
            };
            var afterSTAState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 2,
                access: 3,
                instructions: 1
            };
            var address = 128;
            afterSTAState.memory[address] = initialState.AC;
            expect(STA(address, initialState)).toEqual(afterSTAState);
        });
    });
    describe('LDA', function(){
        it('should load the AC with the value in the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat)
            var address = 128;
            initialState.memory[address] = 55;
            var afterLDAState = JSON.parse(JSON.stringify(initialState));
            afterLDAState.AC = 55;
            afterLDAState.PC = 2;
            afterLDAState.access = 3;
            afterLDAState.instructions = 1;
            expect(LDA(address, initialState)).toEqual(afterLDAState);
        });
        it('should update Z when the loaded value is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat)
            var address = 128;
            initialState.memory[address] = 0;
            var afterLDAState = JSON.parse(JSON.stringify(initialState));
            afterLDAState.AC = 0;
            afterLDAState.Z = true;
            afterLDAState.PC = 2;
            afterLDAState.access = 3;
            afterLDAState.instructions = 1;
            expect(LDA(address, initialState)).toEqual(afterLDAState);
        });
        it('should update N when the loaded value is over 127', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat)
            var address = 128;
            initialState.memory[address] = 200;
            var afterLDAState = JSON.parse(JSON.stringify(initialState));
            afterLDAState.AC = 200;
            afterLDAState.N = true;
            afterLDAState.PC = 2;
            afterLDAState.access = 3;
            afterLDAState.instructions = 1;
            expect(LDA(address, initialState)).toEqual(afterLDAState);
        });
    });
});
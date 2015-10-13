'use strict';

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
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
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
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
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
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
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
    describe('ADD', function(){
        it('should add the AC with the value in the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 10,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 55;
            var afterADDState = JSON.parse(JSON.stringify(initialState));
            afterADDState.AC = 65;
            afterADDState.PC = 2;
            afterADDState.access = 3;
            afterADDState.instructions = 1;
            expect(ADD(address, initialState)).toEqual(afterADDState);
        });
        it('should update Z when the result is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 1,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 255;
            var afterADDState = JSON.parse(JSON.stringify(initialState));
            afterADDState.AC = 0;
            afterADDState.Z = true;
            afterADDState.PC = 2;
            afterADDState.access = 3;
            afterADDState.instructions = 1;
            expect(ADD(address, initialState)).toEqual(afterADDState);
        });
        it('should update N when the result is over 127', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 100,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 50;
            var afterADDState = JSON.parse(JSON.stringify(initialState));
            afterADDState.AC = 150;
            afterADDState.N = true;
            afterADDState.PC = 2;
            afterADDState.access = 3;
            afterADDState.instructions = 1;
            expect(ADD(address, initialState)).toEqual(afterADDState);
        });
    });
    describe('OR', function(){
        it('should bitwise OR the AC with the value in the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: true,
                Z: false,
                AC: 0b00001111,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0b11110000;
            var afterORState = JSON.parse(JSON.stringify(initialState));
            afterORState.AC = 0b11111111;
            afterORState.PC = 2;
            afterORState.access = 3;
            afterORState.instructions = 1;
            expect(OR(address, initialState)).toEqual(afterORState);
        });
        it('should update Z when the result is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0;
            var afterORState = JSON.parse(JSON.stringify(initialState));
            afterORState.AC = 0;
            afterORState.Z = true;
            afterORState.PC = 2;
            afterORState.access = 3;
            afterORState.instructions = 1;
            expect(OR(address, initialState)).toEqual(afterORState);
        });
        it('should update N when the result is over 127', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0b10001111,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0b00000100;
            var afterORState = JSON.parse(JSON.stringify(initialState));
            afterORState.AC = 0b10001111;
            afterORState.N = true;
            afterORState.PC = 2;
            afterORState.access = 3;
            afterORState.instructions = 1;
            expect(OR(address, initialState)).toEqual(afterORState);
        });
    });
    describe('AND', function(){
        it('should bitwise AND the AC with the value in the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0b11111111,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0b00001111;
            var afterANDState = JSON.parse(JSON.stringify(initialState));
            afterANDState.AC = 0b00001111;
            afterANDState.PC = 2;
            afterANDState.access = 3;
            afterANDState.instructions = 1;
            expect(AND(address, initialState)).toEqual(afterANDState);
        });
        it('should update Z when the result is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 255,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0;
            var afterANDState = JSON.parse(JSON.stringify(initialState));
            afterANDState.AC = 0;
            afterANDState.Z = true;
            afterANDState.PC = 2;
            afterANDState.access = 3;
            afterANDState.instructions = 1;
            expect(AND(address, initialState)).toEqual(afterANDState);
        });
        it('should update N when the result is over 127', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0b11111111,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            initialState.memory[address] = 0b11111111;
            var afterANDState = JSON.parse(JSON.stringify(initialState));
            afterANDState.AC = 0b11111111;
            afterANDState.N = true;
            afterANDState.PC = 2;
            afterANDState.access = 3;
            afterANDState.instructions = 1;
            expect(AND(address, initialState)).toEqual(afterANDState);
        });
    });
    describe('NOT', function(){
        it('should bitwise NOT the AC', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0b00000000,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var afterNOTState = JSON.parse(JSON.stringify(initialState));
            afterNOTState.AC = 0b11111111;
            afterNOTState.N = true;
            afterNOTState.PC = 1;
            afterNOTState.access = 1;
            afterNOTState.instructions = 1;
            expect(NOT(initialState)).toEqual(afterNOTState);
        });
        it('should update Z when the result is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 255,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var afterNOTState = JSON.parse(JSON.stringify(initialState));
            afterNOTState.AC = 0;
            afterNOTState.Z = true;
            afterNOTState.PC = 1;
            afterNOTState.access = 1;
            afterNOTState.instructions = 1;
            expect(NOT(initialState)).toEqual(afterNOTState);
        });
        it('should update N when the result is over 127', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0b00001111,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var afterNOTState = JSON.parse(JSON.stringify(initialState));
            afterNOTState.AC = 0b11110000;
            afterNOTState.N = true;
            afterNOTState.PC = 1;
            afterNOTState.access = 1;
            afterNOTState.instructions = 1;
            expect(NOT(initialState)).toEqual(afterNOTState);
        });
    });
    describe('JMP', function(){
        it('should set the PC to the specified address', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 1,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            var afterJMPState = JSON.parse(JSON.stringify(initialState));
            afterJMPState.PC = 128;
            afterJMPState.access = 2;
            afterJMPState.instructions = 1;
            expect(JMP(address, initialState)).toEqual(afterJMPState);
        });
    });
    describe('JN', function(){
        it('should set the PC to the specified address if AC is >= 128', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 128,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            var afterJNState = JSON.parse(JSON.stringify(initialState));
            afterJNState.PC = 128;
            afterJNState.access = 2;
            afterJNState.instructions = 1;
            expect(JN(address, initialState)).toEqual(afterJNState);
        });
        it('should proceed normally if AC is < 128', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 100,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            var afterJNState = JSON.parse(JSON.stringify(initialState));
            afterJNState.PC = 2;
            afterJNState.access = 2;
            afterJNState.instructions = 1;
            expect(JN(address, initialState)).toEqual(afterJNState);
        });
    });
    describe('JZ', function(){
        it('should set the PC to the specified address if AC is 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 0,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            var afterJZState = JSON.parse(JSON.stringify(initialState));
            afterJZState.PC = 128;
            afterJZState.access = 2;
            afterJZState.instructions = 1;
            expect(JZ(address, initialState)).toEqual(afterJZState);
        });
        it('should proceed normally if AC is not 0', function(){
            var initialState = {
                memory: Array(256),
                N: false,
                Z: false,
                AC: 100,
                PC: 0,
                access: 0,
                instructions: 0
            };
            initialState.memory = initialState.memory.join('0').split('').map(parseFloat);
            var address = 128;
            var afterJZState = JSON.parse(JSON.stringify(initialState));
            afterJZState.PC = 2;
            afterJZState.access = 2;
            afterJZState.instructions = 1;
            expect(JZ(address, initialState)).toEqual(afterJZState);
        });
    });
});
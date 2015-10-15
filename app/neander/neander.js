'use strict';

angular.module('Neangular.neander', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/neander', {
    templateUrl: 'neander/neander.html',
    controller: 'NeanderCtrl'
  });
}])

.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: true,
        transclude: false,
        link: function (scope, element, attrs) {
            $timeout(function(){
               document.getElementById('table-body').scrollTop = 6015;
            }, 0);
        }
    };
    return def;
}])

.controller('NeanderCtrl', ['$scope', function($scope) {
    $scope.neanderState = {
        memory: Array(256),
        N: false,
        Z: true,
        AC: 0,
        PC: 0,
        access: 0,
        instructions: 0
    };
    $scope.neanderState.memory = $scope.neanderState.memory.fill(0);
    $scope.refresh = function(){
        $scope.neanderState = _updateStatus($scope.neanderState);
        $scope.neanderMnemonics = getMnemonics($scope.neanderState.memory);
    }
    $scope.step = function(){
        $scope.neanderState = step($scope.neanderState);
    }
    $scope.run = function(){
        $scope.neanderState = run($scope.neanderState);
    }
    $scope.clearData = function(){
        $scope.neanderState.AC = 0;
        $scope.neanderState.PC = 0;
        $scope.neanderState.access = 0;
        $scope.neanderState.instructions = 0;
        $scope.refresh();
    }
    $scope.refresh();
}]);

function run(state){
    if(state.PC >= 255){
        return state;
    }
    if(state.memory[state.PC] >= 240){
        return step(state);
    }
    state = step(state);
    return run(state);
}

function getMnemonics(memory){
    var mnemonics = Array(memory.length).fill('');
    for(var i=0; i<256; i++){
        if(memory[i] < 16){
            mnemonics[i] = 'NOP';
        }
        else if(memory[i] < 32){
            mnemonics[i] = 'STA ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 48){
            mnemonics[i] = 'LDA ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 64){
            mnemonics[i] = 'ADD ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 80){
            mnemonics[i] = 'OR ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 96){
            mnemonics[i] = 'AND ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 128){
            mnemonics[i] = 'NOT';
        }
        else if(memory[i] < 144){
            mnemonics[i] = 'JMP ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 160){
            mnemonics[i] = 'JN ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
        else if(memory[i] < 176){
            mnemonics[i] = 'JZ ' + memory[i+1];
            mnemonics[i+1] = '-';
            i += 1;
        }
	else if(memory[i] >= 240){
	    mnemonics[i] = 'HLT';
	}
	else {
	    mnemonics[i] = '-';
	}
    }
    return mnemonics;
}

function step(state){
    var nextInstruction = state.memory[state.PC];
    if(nextInstruction < 16){
        return NOP(state);
    }
    else if(nextInstruction < 32){
        return STA(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 48){
        return LDA(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 64){
        return ADD(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 80){
        return OR(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 96){
        return AND(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 128){
        return NOT(state);
    }
    else if(nextInstruction < 144){
        return JMP(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 160){
        return JN(state.memory[state.PC+1], state);
    }
    else if(nextInstruction < 176){
        return JZ(state.memory[state.PC+1], state);
    }
    return NOP(state);
}

function NOP(state){
    state.access += 1;
    state.instructions += 1;
    state.PC += 1;
    return state;
}

function STA(address, state){
    state.memory[address] = state.AC;
    state.access += 3;
    state.instructions += 1;
    state.PC += 2;
    return state;
}

function LDA(address, state){
    state.AC = state.memory[address];
    state.access += 3;
    state.instructions += 1;
    state.PC += 2;
    return _updateStatus(state);
}

function ADD(address, state){
    state.AC = (state.memory[address] + state.AC) % 256;
    state.access += 3;
    state.instructions += 1;
    state.PC += 2;
    return _updateStatus(state);
}

function OR(address, state){
    state.AC = state.memory[address] | state.AC;
    state.access += 3;
    state.instructions += 1;
    state.PC += 2;
    return _updateStatus(state);
}

function AND(address, state){
    state.AC = state.memory[address] & state.AC;
    state.access += 3;
    state.instructions += 1;
    state.PC += 2;
    return _updateStatus(state);
}

function NOT(state){
    var aux = ~(-1 & 255); // necessary for 8-bit operation
    state.AC = ~(state.AC | aux);
    state.access += 1;
    state.instructions += 1;
    state.PC += 1;
    return _updateStatus(state);
}

function JMP(address, state){
    state.PC = address;
    state.access += 2;
    state.instructions +=1;
    return state;
}

function JN(address, state){
    if(state.AC >= 128){
        state.PC = address;
    } else {
        state.PC += 2;
    }
    state.access += 2;
    state.instructions +=1;
    return state;
}

function JZ(address, state){
    if(state.AC === 0){
        state.PC = address;
    } else {
        state.PC += 2;
    }
    state.access += 2;
    state.instructions +=1;
    return state;
}

function _updateStatus(state){
    if(state.AC === 0){
        state.Z = true;
    } else {
        state.Z = false;
    }
    if(state.AC >= 128){
        state.N = true;
    } else {
        state.N = false;
    }
    return state;
}

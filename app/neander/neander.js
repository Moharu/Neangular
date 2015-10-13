'use strict';

angular.module('Neangular.neander', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/neander', {
    templateUrl: 'neander/neander.html',
    controller: 'NeanderCtrl'
  });
}])

.controller('NeanderCtrl', [function() {

}]);

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
//Starter
function play(MinOrMax, struct){
    var root = new Structure(struct);
    if(MinOrMax === "min"){
        playMin(-Infinity, Infinity, root);
    }else if (MinOrMax === "max"){
        playMax(-Infinity, Infinity, root);
    }else{
        console.log("MinOrMax must be either the string 'min' or the string 'max' (case sensitive).");
    }
    if(typeof console.groupCollapsed === 'function'){
        return groupLog(root);
    } else {
        return loggable(root);
    }
}

//Main Algorithm
function playMax(alpha,beta,node){
    if(isCutOff(node)) return record(node, evaluation(node));
    var value = -Infinity;
    var children = successors(node);
    for (var i = 0; i <children.length; i++) {
        var child = children[i];
        value = max(value, playMin(alpha,beta,child));
        if(value > beta) return record(node, value);
        if(value > alpha) alpha = value;
    }
    return record(node, value);
}
function playMin(alpha,beta,node){
    if(isCutOff(node)) return record(node, evaluation(node));
    var value = Infinity;
    var children = successors(node);
    for (var i = 0; i <children.length; i++) {
        var child = children[i];
        value = min(value, playMax(alpha,beta,child));
        if(value <alpha) return record(node, value);
        if(value < beta) beta = value;
    }
    return record(node, value);
}

//Helper functions
function record(node, value){
    node.value = value;
    delete node.pruned;
    return value;
}
function isCutOff(node){
    return (typeof node.value !== "undefined");
}
function evaluation(node){
    return node.value;
}
function successors(node){
    return node.children;
}
function min(a,b){
    if(a<b)return a;
    else return b;
}
function max(a,b){
    if(a>b)return a;
    else return b
}

function Structure(struct){
    var result = this;
    result.pruned = true;
    if(Array.isArray(struct)){
        result.children = [];
        for(var i = 0; i<struct.length; i++){
            result.children.push(new Structure(struct[i]));
        }
    } else if(typeof struct === "number") {
        result.value = struct;
    } else {
        throw "The struct must consist of a combination of arrays and numbers to form a tree.";
    }
}
Structure.prototype.toString = function(){
    return result.pruned?'pruned':result.value;
}

function loggable(struct){
    if(struct.pruned) return 'pruned';
    else if (typeof struct.children === 'undefined') return struct.value;
    else {
        var result = {'$value':struct.value};
        for(var i = 0; i<struct.children.length; i++){
            result['c'+i] = (loggable(struct.children[i]));
        }
        return result;
    }
}
function groupLog(struct){
    if(struct.pruned) console.log('pruned');
    else if (typeof struct.children === 'undefined') console.log(struct.value);
    else {
        var result = {'$value':struct.value};
        console.groupCollapsed(struct.value);
        for(var i = 0; i<struct.children.length; i++){
            groupLog(struct.children[i]);
        }
        console.groupEnd();
    }
}

//ES5 shim
if(!Array.isArray) {  
  Array.isArray = function (arg) {  
    return Object.prototype.toString.call(arg) == '[object Array]';  
  };  
}

play('max',
    [[
        [[1,-15],[2,19]],[[18,23],[4,3]]
    ],[
        [[2,1],[7,8]],[[9,10],[-2,5]]
    ],[
        [[-1,-30],[4,7]],[[20,-1],[-1,-5]]
    ]]);
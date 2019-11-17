const fs = require('fs');
const pt = require('path');
const isClass = require('is-class');
const isFile = (path) => {return fs.existsSync(path) && fs.statSync(path).isFile();}
const isDir = (path) => {return fs.existsSync(path) && fs.statSync(path).isDirectory();}

const dirs = {};

function noader(dir, ...args) {
    const _map = new Map();
    const _root = {};
    _map.set(_root, {
        path: pt.join(dir || pt.dirname(module.parent.filename), './'),
        is_class: false
    });
    return creatLoader(_root);

    function creatLoader(obj) {
        return new Proxy(obj, {
            get: (target, prop) => {
                if(prop in target || typeof prop == 'symbol' || prop == 'inspect'){
                    return target[prop];
                }
                const tgt_map = _map.get(target);
                if(prop == '$prop'){
                    return tgt_map;
                }
                if(tgt_map.is_class){
                    if(!tgt_map.instance){
                        tgt_map.instance = new target(...args);
                    }
                    return tgt_map.instance[prop];
                }
                let child = {};
                const child_path = tgt_map.path + prop + '/';
                const child_file = tgt_map.path + prop + '.js';
                if(!dirs[child_path]){
                    if(isFile(child_file)){
                        dirs[child_path] = 'file';
                    }else if(isDir(child_path)){
                        dirs[child_path] = 'dir';
                    }else{
                        dirs[child_path] = 'none';
                    }
                }
                if(dirs[child_path] == 'file'){
                    child = require(child_file);
                }else if(dirs[child_path] != 'dir'){
                    return undefined;
                }
                _map.set(child, {
                    path: child_path,
                    is_class: isClass(child)
                });
                target[prop] = creatLoader(child);
                return target[prop];
            },
            set: (target, prop, value) => {
                if(prop in target){
                    target[prop] = value;
                    return true;
                }
                const tgt_map = _map.get(target);
                if(tgt_map.is_class){
                    if(!tgt_map.instance){
                        tgt_map.instance = new target(...args);
                    }
                    tgt_map.instance[prop] = value;
                    return true;
                }
            }
        });
    }
}

module.exports = noader;
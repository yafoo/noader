const fs = require('fs');
const pt = require('path');
const isClass = require('is-class');
const isFile = (path) => {return fs.existsSync(path) && fs.statSync(path).isFile();}
const isDir = (path) => {return fs.existsSync(path) && fs.statSync(path).isDirectory();}

const dirs = {};

function noader(dir='', ...args) {
    const box = new Map();
    const root = {};
    box.set(root, {
        path: pt.join(dir || pt.dirname(module.parent.filename), './'),
        class: false
    });
    return creatLoader(root);

    function creatLoader(obj) {
        return new Proxy(obj, {
            get: (target, prop) => {
                if(prop in target || typeof prop == 'symbol'){
                    return target[prop];
                }
                const tgt = box.get(target);
                if(prop == '$path'){
                    return tgt.path;
                }else if(prop == '$class'){
                    return tgt.class;
                }
                if(tgt.class){
                    if(!tgt.instance){
                        tgt.instance = new target(...args);
                    }
                    if(prop == '$instance'){
                        return tgt.instance;
                    }else{
                        return tgt.instance[prop];
                    }
                }
                let child = {};
                const child_path = tgt.path + prop + '/';
                const child_file = tgt.path + prop + '.js';
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
                box.set(child, {
                    path: child_path,
                    class: isClass(child)
                });
                return creatLoader(child);
            }
        });
    }
}

module.exports = noader;
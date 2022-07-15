const fs = require('fs')
const readCss = require('read-css')
const fileDir = './css_folder/'
fs.readdir(fileDir, (err, files) => {
    if(err) throw err;
    else{
        console.log(files)
        files.forEach((file) =>{ 
            let linenums= [];
            let changes = {};
            readCss(fileDir+file, (err, data) => {
                if(err) throw err;
                else{
                    if(data.type =='stylesheet'){
                        data = data.stylesheet;
                        (data.rules).forEach((rule) => {
                            if(rule.type == 'rule'){
                                rule.declarations.forEach((decl)=>{
                                    // console.log(decl.property+ " " +decl.value)
                                    if(decl.value && decl.value.includes('var') && decl.property == 'font-size'){
                                        // console.log('before : ')
                                        // console.log(decl.property + " " + decl.value)
                                        decl.value = decl.value.substring(6, decl.value.length-1)
                                        let value = ((decl.value).replace(/\D/g,''));
                                        let unit = (decl.value.replace(/[0-9]/g, '').replace(/fsize/g,''))
                                        decl.value = (`${value}${(unit == '' ? 'px' : unit)}`)
                                        // console.log('after : ')
                                        // console.log(decl.property + " " + decl.value)
                                        // console.log(decl.position)
                                        changes[decl.position.start.line-1] = `${decl.property} : ${decl.value};`;
                                        linenums.push(decl.position.start.line-1)
                                    }
                                })
                            }
                        })
                    }
                }
            })
            fs.readFile(fileDir+file,'utf-8', (err, info)=>{
                let infoArr = (info.split('\n'))
                // console.log(linenums)
                // linenums.forEach((val, index) => linenums[index] = val-1)
                // console.log(linenums)
                for( let i = 0;i<infoArr.length;i++){
                    // console.log(infoArr[i]);
                    // console.log(i)
                    if(linenums.includes(i)){
                        if(infoArr[i-1]&& !infoArr[i-1].includes('Variable:Ignore')){
                            // console.log(infoArr[i-1])
                            infoArr[i] = changes[i];
                            // console.log('line :', infoArr[i])
                        }
                    }
                }
                console.log()
                console.log(linenums)
                console.log()
                console.log('---------------------------------------------------------------')
                let str = infoArr.join('\n');
                // console.log(infoArr[33])
                fs.writeFile(fileDir+file, str, (err, success)=>{
                    if(err)throw err;
                    else{
                        console.log('done')
                    }
                });
            })
        })
    }
})
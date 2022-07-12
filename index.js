const fs = require('fs')
const readCss = require('read-css');
let fileDir = './css_folder/'
const addline = (linenums,rule) =>{
    if(rule.declarations){
        rule.declarations.forEach((decl) => {
            if(decl.property == 'font-size'){
                let unit = (decl.value.replace(parseInt(decl.value), ''));
                if(unit == 'px'){
                    linenums.push(decl.position.start.line-1)
                }
            }
        })
    }
}
fs.readdir('./css_folder', (err, files) =>{
    if(err) throw err;
    else{
        files.forEach((file) => {
            readCss(fileDir+file, (err, data) =>{
                let linenums = [];
                if(err) throw err;
                else{
                    // console.log(data);
                    if(data.type=='stylesheet'){
                        let rules = data.stylesheet.rules;
                        rules.forEach((rule) =>{
                            console.log(rule)
                            if(rule.type == 'rule'){
                                addline(linenums, rule)
                            }
                            else if(rule.type == 'media'){
                                rule.rules.forEach((subrule) =>{
                                    addline(linenums, subrule)
                                })
                            }
                        })
                        
                    }
                }
                fs.readFile(fileDir+file,'utf-8', (err, info)=>{
                    let infoArr = (info.split('\n'))
                    for( let i = 0;i<infoArr.length;i++){
                        if(linenums.includes(i)){
                            console.log(infoArr[i])
                            if(!infoArr[i].includes('Variable:Ignore'))
                            infoArr[i] = `\t/* Variable:Ignore */\r\n${infoArr[i]}`
                            console.log(infoArr[i])
                            console.log( i)
                        }
                    }
                    console.log()
                    console.log(linenums)
                    console.log()
                    console.log('---------------------------------------------------------------')
                    let str = infoArr.join('\n');
                    fs.writeFile(fileDir+file, str, (err, success)=>{
                        if(err)throw err;
                        else{
                            console.log('done')
                        }
                    });
                })

            } )
           
        })
    }
})
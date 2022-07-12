const fs = require('fs')
const readCss = require('read-css');
const {parse, generate, walk, findAll} = require('css-tree');
const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
  
    newItem,
  
    ...arr.slice(index)
  ];
fs.readdir('./css_folder', (err, files) =>{
    if(err) throw err;
    else{
        files.forEach((file, index) => {
            readCss('./css_folder/'+file, (err, data) =>{
                let linenums = [];
                if(err) throw err;
                else{
                    // console.log(data);
                    if(data.type=='stylesheet'){
                        let rules = data.stylesheet.rules;
                        rules.forEach((rule, index) =>{
                            // if(rules[index-1] && rules[index-1].type === 'comment' ){
                                // console.log(rule)
                                // console.log(rules[index-1].comment )
                                // console.log(rules[index-1].comment === 'Variable:Ignore')
                            // }
                            // else{
                            if(rule.declarations)
                            rule.declarations.forEach((decl) => {
                                // console.log(decl.property + " " +decl.value);
                                if(decl.property == 'font-size'){
                                    let unit = (decl.value.replace(parseInt(decl.value), ''));
                                    if(unit == 'px'){
                                        // let obj = {
                                        //     type: 'comment',
                                        //     comment: ' variable : ignore ',
                                        //   }
                                        // rules = insert(rules, index-1, obj);
                                        // console.log(decl.property + " " + decl.value)
                                        console.log(decl)
                                        linenums.push(decl.position.start.line-1)
                                    }else{
                                        // console.log(decl.property + "    " + decl.value)
                                        // console.log(rules.length, rules.slice(0, index-1).length,rules.slice(index-1, rules.length).length  )
                                        // console.log(decl)
                                    }
                                }
                            })
                        })
                    }
                }
                console.log(file ,linenums)
                fs.readFile('./css_folder/'+file,'utf-8', (err, info)=>{
                    let infoArr = (info.split('\n'))
                    // for( let i =0 ; i<infoArr.length;i++){
                    //         console.log(infoArr[i])
                    //         console.log(i)
                    //     }
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
                    fs.writeFile('./css_folder/'+file, str, (err, success)=>{
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
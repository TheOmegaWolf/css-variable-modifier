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
                            if(rule.declarations && index == 1)
                            rule.declarations.forEach((decl) => {
                                // console.log(decl.property + " " +decl.value);
                                if(decl.type == 'comment'){
                                    // console.log(decl)
                                }
                                if(decl.property == 'font-size'){
                                    let unit = (decl.value.replace(parseInt(decl.value), ''));
                                    if(unit == 'px'){
                                        let obj = {
                                            type: 'comment',
                                            comment: ' variable : ignore ',
                                          }
                                        rules = insert(rules, index-1, obj);
                                        console.log(rules[index-1], rules[index])
                                        // console.log(decl.property + " " + decl.value)
                                        // console.log(rule)
                                    }else{
                                        // console.log(decl.property + "    " + decl.value)
                                        // console.log(rules.length, rules.slice(0, index-1).length,rules.slice(index-1, rules.length).length  )
                                        // console.log(decl)
                                    }
                                }
                            })
                            // }
                        })
                    }
                }
            } )
           
        })
    }
})
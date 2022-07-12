 // fs.readFileSync(`./css_folder/${file}`, (err, data) => {
            //     if(err) throw err;
            //     else{
            //         console.log(data)
            //     }    
            // })
            // let contents = await (fs.readFileSync('./css_folder/'+file, "utf8"))
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
                            if(rule.declarations)
                            rule.declarations.forEach((decl) => {
                                // console.log(decl.property + " " +decl.value);
                                if(decl.property == 'font-size'){
                                    let unit = (decl.value.replace(parseInt(decl.value), ''));
                                    if(unit == 'px'){
                                        console.log(decl.property + " " + decl.value)
                                        // console.log(rule)
                                    }else{
                                        console.log(decl.property + "    " + decl.value)
                                    }
                                }
                            })
                            // }
                        })
                    }
                }
            } )
            // console.log('-------------------------------------------------------------------------------------------')
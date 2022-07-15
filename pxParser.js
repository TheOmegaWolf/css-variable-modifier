const fs = require('fs')
const readCss = require('read-css')
const fileDir = './css_folder/'
fs.readdir(fileDir, (err, files) => {
    if(err) throw err;
    else{
        console.log(files)
        files.forEach((file) =>{ 
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
                                        console.log('before : ')
                                        console.log(decl.property + " " + decl.value)
                                        decl.value = decl.value.substring(6, decl.value.length-1)
                                        let value = ((decl.value).replace(/\D/g,''));
                                        let unit = (decl.value.replace(/[0-9]/g, '').replace(/fsize/g,''))
                                        decl.value = (`${value}${(unit == '' ? 'px' : unit)}`)
                                        console.log('after : ')
                                        console.log(decl.property + " " + decl.value)
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    }
})
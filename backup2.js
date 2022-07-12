const fs = require('fs')
const readCss = require('read-css');
const {parse, generate, walk, findAll} = require('css-tree');
fs.readdir('./css_folder', (err, files) =>{
    if(err) throw err;
    else{
        files.forEach((file, index) => {
            fs.readFile('./css_folder/'+file, 'utf-8' , (err, data) =>{
            const ast = parse(data);
            walk(ast, (node, item, list) => {
                if (node.type === 'Declaration' && node.property === 'font-size' && list) {
                    // remove a declaration from a list it
                //    console.log( item.data.value.children.head.data.value )
                    let val = item.data.value.children.head.data;
                    console.log((val.value!== undefined ? val.value : val.name) + " " + (val.unit == undefined ?  val.children.head.data.name: val.unit))
                    // console.log()
                    if(val.unit == 'px'){
                        
                        console.log()
                    }
                }
                
            });
            const fontsizeDecls = findAll(ast, (node, item, list) =>
            node.type === 'Declaration' && node.property === 'font-size'
            );
            // console.log(fontsizeDecls)
            fontsizeDecls.map((decl )=>{
                
            })
            // csstree.walk(ast,(node) =>{
            //     console.log(node);
            // })
           })
           
        })
    }
})
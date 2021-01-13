const request = require('request');
const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const args = process.argv.slice(2)

const fetcher = function(data){
  request(data[0], (error, response, body)=> {
    if(error){
      throw error
    }
    
    console.log(body)

    fs.writeFile(data[1], body, { flag: 'wx'},(err) => {
      if(err){
        if(err.code === 'EEXIST'){
          rl.question('Would you like to overwrite the existing file (yes/no)', (answer) => {
            if(answer === 'yes'){
              fs.writeFile(data[1], body, (err)=> {
                if(err) throw err

                console.log('succesfully wrote to file')
              })
            }else{
              console.log('file was not overwritten')
            }
            rl.close()
          })
        }
      }else{
        rl.close()
      };
      console.log('The file has been saved!')
    })
  })
}

fetcher(args)
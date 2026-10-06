const checkNumber = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(num > 10){
                resolve("Number accepted");
            }
            else{
                reject("Number too small");
            }
        },1000)
    })
}


// checkNumber(5)
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })

async function testNumber(){
    try{
        const checkResult = await checkNumber(5);
        console.log(checkResult);
    }
    catch(err){
        console.log(err);
    }

}

testNumber();
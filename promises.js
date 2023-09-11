function timer(){
    return Promise.resolve('inside');
}

console.log('before');
timer()
  .then(result=>{
    console.log(result);
    console.log('after');
})

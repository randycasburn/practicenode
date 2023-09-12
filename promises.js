function timer(){
    return Promise.resolve('inside');
}

async function main() {
    console.log('before');
    const result = await timer();
    console.log(result);
    console.log('after');
    return "I am finished! whoot!"
}

main().then(console.log);
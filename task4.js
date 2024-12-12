async function* generateNumbers(count) {
    for (let i = 0; i < count; i++) {
        const randomNum = Math.floor(Math.random() * 20);
        console.log('Generated number:', randomNum);
        yield randomNum;
    }
}

async function main() {
    const generator = generateNumbers(10);

    const array = [];
    for await (const num of generator) {
        array.push(num);
    }

    console.log('Array to search:', array);
}

main();

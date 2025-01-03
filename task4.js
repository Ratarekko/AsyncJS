async function* generateNumbers(count) {
    for (let i = 0; i < count+1; i++) {
        const randomNum = Math.floor(Math.random() * 20);
        yield randomNum;
    }
}

async function main() {
    const generator = generateNumbers(10);
    let searchValue;
    const array = [];

    for await (const num of generator) {
        if (array.length < 10) {
            array.push(num);
        } else {
            searchValue = num;
        }
    }

    console.log('Array to search:', array);
    console.log('Value to search:', searchValue);

    try {
        const index = await asyncFindIndex(array, searchValue);
        console.log("Result:", index);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

main();

function asyncFindIndex(array, searchValue) {
    return new Promise((resolve, reject) => {

        if (!Array.isArray(array)) {
            return reject(new TypeError('First argument must be an array'));
        }
        if (typeof searchValue !== 'number') {
            return reject(new TypeError('Second argument must be a number'));
        }

        for (let i = 0; i < array.length; i++) {
            setTimeout(() => {
                if (array[i] === searchValue) {
                    resolve(i);
                }
                if (i === array.length - 1) {
                    resolve(-1);
                }
            }, 1500);
        }
    });
}
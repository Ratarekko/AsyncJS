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

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    try {
        const result = await asyncFindIndex(array, searchValue);
        console.log("Result:", result);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

asyncFindIndex(array, searchValue)
    .then(result => {
        console.log("Result:", result);
    })
    .catch(err => {
        console.log(`Caught error: ${err.message}`);
    });

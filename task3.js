function asyncFindIndex(array, searchValue, signal) {
    return new Promise((resolve, reject) => {

        if (!Array.isArray(array)) {
            return reject(new TypeError('First argument must be an array'));
        }
        if (typeof searchValue !== 'number') {
            return reject(new TypeError('Second argument must be a number'));
        }

        for (let i = 0; i < array.length; i++) {
            setTimeout(() => {
                if (signal.aborted) {
                    return reject (new Error('Operation aborted'))
                }
                if (array[i] === searchValue) {
                    resolve(i);
                }
                if (i === array.length - 1) {
                    resolve(-1);
                }
            }, 500);
        }
    });
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 1500);

    try {
        const index = await asyncFindIndex(array, searchValue, signal);
        console.log("Result:", index);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

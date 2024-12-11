async function asyncFindIndexPromise(array, searchValue, signal) {
    for (let i = 0; i < array.length; i++) {
        if (signal.aborted) {
            throw new Error('Operation aborted');
        }

        const result = await new Promise(resolve => {
            setTimeout(() => {
                resolve(array[i] === searchValue);
            }, 200);
        });

        if (result) {
            return i;
        }
    }

    throw new Error('Element not found');
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 1500);

    try {
        const index = await asyncFindIndexPromise(array, searchValue, signal);
        console.log("Result:", index);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

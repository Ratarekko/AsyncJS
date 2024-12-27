function asyncFindIndex(array, signal, asyncEvaluate) {
    return new Promise((resolve, reject) => {
        let isDone = false;

        for (let i = 0; i < array.length; i++) {
            asyncEvaluate(array[i])
                .then((result) => {
                    if (isDone) return;

                    if (signal.aborted) {
                        isDone = true;
                        return reject (new Error('Operation aborted'))
                    }
                    if (result) {
                        isDone = true;
                        resolve(i);
                    }
                    if (i === array.length - 1) {
                        resolve(-1);
                    }
                })
                .catch((err) => {
                    if (!isDone) {
                        isDone = true;
                        reject(err);
                    }
                });
        }
    });
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 1000);
    const sleep = (ms) => new Promise(resolve => {
        setTimeout(resolve, ms)
    });
    const delay = Math.floor(Math.random() * 1000) + 500;
    console.log('Delay:', delay)

    try {
        await sleep(delay)
        const result = await asyncFindIndex(array, signal, (item) => {
            return Promise.resolve(item === searchValue)
        });
        console.log("Result:", result);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

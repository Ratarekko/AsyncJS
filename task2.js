function asyncFindIndex(array, asyncEvaluate) {
    return new Promise((resolve, reject) => {
        let isDone = false;

        if (!Array.isArray(array)) {
            return reject(new TypeError('First argument must be an array'));
        }
        if (typeof searchValue !== 'number') {
            return reject(new TypeError('Second argument must be a number'));
        }

        for (let i = 0; i < array.length; i++) {
            asyncEvaluate(array[i])
                .then((result) => {
                    if (isDone) return;

                    if (result) {
                        isDone = true;
                        resolve(i);
                    }
                    if (i === array.length - 1 && !isDone) {
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
    try {
        const result = await asyncFindIndex(array, (item) => {
            return Promise.resolve(item === searchValue);
        });
        console.log("Result:", result);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

asyncFindIndex(array, (item) => {
    return new Promise((resolve) => {
        resolve(item === searchValue);
    });
})
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((err) => {
        console.log(`Caught error: ${err.message}`);
    });

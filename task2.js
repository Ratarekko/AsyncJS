function asyncFindIndexPromise(array, asyncPredicate) {
    return new Promise((resolve, reject) => {
        let foundIndex = -1;

        for (let i = 0; i < array.length; i++) {
            new Promise(resolve => {
                asyncPredicate(array[i], (err, result) => resolve({ err, result, index: i }));
            })
                .then(({ err, result, index }) => {
                    if (err) {
                        reject(err);
                    } else if (result) {
                        foundIndex = index;
                        resolve(foundIndex);
                    } else if (index === array.length - 1) {
                        resolve(-1);
                    }
                })
                .catch(reject);
        }
    });
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    try {
        const index = await asyncFindIndexPromise(array, (item) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(item === searchValue);
                }, 500);
            })
        );

        console.log("Result:", index);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

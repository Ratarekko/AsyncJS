function asyncFindIndexPromise(array, asyncPredicate) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        let found = false;

        for (let i = 0; i < array.length; i++) {
            asyncPredicate(array[i])
                .then((result) => {
                    if (found) return;

                    if (result) {
                        found = true;
                        return resolve(i);
                    }

                    completed++;

                    if (completed === array.length && !found) {
                        resolve(-1);
                    }
                })
                .catch((err) => {
                    if (!found) {
                        found = true;
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

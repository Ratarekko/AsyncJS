function asyncFindIndexPromise(array, asyncPredicate, signal) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        let found = false;

        signal.addEventListener("abort", () => {
            reject(new Error("Operation aborted"));
        });

        for (let i = 0; i < array.length; i++) {
            asyncPredicate(array[i], signal)
                .then((result) => {
                    if (found || signal.aborted) return;

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
                    if (!found && !signal.aborted) {
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
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 500);

    try {
        const index = await asyncFindIndexPromise(
            array,
            (item, signal) =>
                new Promise((resolve) => {
                    if (signal.aborted) {
                        throw new Error("Operation aborted");
                    }

                    setTimeout(() => {
                        resolve(item === searchValue);
                    }, 500);
                }),
            signal
        );

        console.log("Result:", index);
    } catch (err) {
        console.log(`Caught error: ${err.message}`);
    }
}

example();

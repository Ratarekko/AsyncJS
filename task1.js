function asyncFindIndex(array, asyncCallback, finalCallback) {
    let index = -1;
    let completed = 0;
    let found = false;

    for (let i = 0; i < array.length; i++) {
        asyncCallback(array[i], (err, result) => {
            if (found) return;

            if (err) {
                found = true;
                return finalCallback(err);
            }

            if (result) {
                found = true;
                index = i;
                return finalCallback(null, index);
            }

            completed++;

            if (completed === array.length && !found) {
                return finalCallback(null, -1);
            }
        });
    }
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

asyncFindIndex(
    array,
    (item, cb) => {
        setTimeout(() => {
            cb(null, item === searchValue);
        }, 1500);
    },
    (err, result) => {
        if (err) {
            console.log("err", err);
        } else {
            console.log("res", result);
        }
    }
);

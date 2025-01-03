async function asyncify(task, options) {
    const {
        minIteration = 5,
        maxIterations = 10,
        minDuration = 1000,
        maxDuration = 60000,
        timeout = 1000,
        totalIterations = 50,
    } = options;

    let completedIterations = 0;
    let globalStartTime = Date.now();

    const executeBatch = async () => {
        let batchIterations = 0;
        let batchStartTime = Date.now();

        while (batchIterations < maxIterations) {
            const now = Date.now();

            if (completedIterations >= totalIterations) {
                return true;
            }

            if ((now - batchStartTime) >= maxDuration) {
                console.log('Maximum batch duration reached.');
                break;
            }

            task(completedIterations);
            batchIterations++;
            completedIterations++;

            if (batchIterations >= minIteration && (now - batchStartTime) >= minDuration) {
                console.log(`Minimum iterations (${minIteration}) and duration (${minDuration} ms) reached.`);
                break;
            }
        }

        return false;
    };

    while ((Date.now() - globalStartTime) < maxDuration) {
        const finished = await executeBatch();

        if (finished) {
            console.log("Task fully completed.");
            break;
        }

        console.log(`Pausing for ${timeout} ms...`);
        await new Promise((resolve) => setTimeout(resolve, timeout));
    }

    console.log("Asyncify function completed.");
}

const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

(async () => {
    await asyncify((index) => {
        const number = index + 1;
        if (isPrime(number)) {
            console.log(`${number} is prime`);
        }
    }, {
        minIteration: 5,
        maxIterations: 10,
        minDuration: 1000,
        maxDuration: 60000,
        timeout: 1000,
        totalIterations: 50,
    });
})();

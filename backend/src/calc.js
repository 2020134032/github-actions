export const fact = (x) => {
    let result = 1;
    for (let i = 1; i <= x; i++) {
        result *= i;
    }
    return result;
};

export const fib = (x) => {
    let f0 = 0;
    let f1 = 1;
    let t;
    for (let i = 0; i < x; i++) {
        t = f1;
        f1 = f0 + f1;
        f0 = t;
    }
    return f0;
};

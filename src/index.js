function* Traverser(functions) {
    let i = 0;
    while (i < functions.length) {
        yield functions[i];
        i += 1;
    }
}

function validator(nodes) {
    nodes.forEach(f => {
        if (typeof f !== 'function') {
            throw new Error(
                `Expected a function but recieved ${typeof f} in Router`,
            );
        }
    });

    if (nodes.length < 1) {
        throw new Error('No functions passed in Router');
    }
}

export default function Router(...nodes) {
    validator(nodes);

    return (root, args, ctx, info) => {
        const traverser = Traverser(nodes);
        const next = err => {
            if (err) throw err;
            const nextNode = traverser.next().value;
            if (!nextNode) {
                throw new Error('Next funtion not available');
            }
            return nextNode({ root, args, ctx, info }, next);
        };
        return next();
    };
}

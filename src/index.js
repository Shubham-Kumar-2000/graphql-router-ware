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

/**
 * Use the function to call next function in the chain
 *
 * @typedef {function(Error=)} Next
 */

/**
 * The router functions
 *
 * @typedef {Object} Root - Graphql root object
 * @typedef {Object} Args - Graphql aguments
 * @typedef {Object} Ctx - Graphql context
 * @typedef {Object} Info - Graphql info object
 * @typedef {{ root: Root, args: Args, ctx: Ctx, info: Info}} Req - Incoming request
 * @typedef {function(Req,Next=)} RouterNode - Incoming request
 */

/**
 * Graphql resolver to route through all the middlewares
 * @param {RouterNode[]} nodes - The router functions
 */
export default function Router(...nodes) {
    validator(nodes);
    /**
     * GraphQL resolver
     *
     * @param {Object} root - Graphql root object
     * @param {Object} args - Graphql aguments
     * @param {Object} ctx - Graphql context
     * @param {Object} info - Graphql info object
     */
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

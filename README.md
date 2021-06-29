# Graphql-Router-Ware
> GraphQL resolver for using router level middlewares at ease.

#### Why?

- Easy to use.
- Actively maintained.
- Zero dependency.
- Handles router-level middleware in graphql just like in expressJs.

## Install

```
$ npm install graphql-router-ware
```

## Usage

#### Import in ES6 or ESM
```js
import Router from 'graphql-router-ware';

// your code here...
```

#### Require in CommonJS
```js
const Router = require('graphql-router-ware');

// your code here...
```

### Resolver
```js
import Router from 'graphql-router-ware';
import { checkPermission } from '../helpers/userhalper';
import Controller from '../controllers/page';

const resolvers = {
    Query: {
        singlePage: Router(Controller.singlePage)
    },
    Mutation: {
        createPage: Router(checkPermission,Controller.create),
        updatePage: Router(checkPermission,Controller.update),
    }
}

export default resolvers;
```
### Middleware
```js
// ....
export checkPermission=({ ctx },next)=>{

    if(!ctx.user){
        return next(new Error('Not logged in'));
        // or throw new Error('Not logged in')
    }

    // some more permission checks....
    return next();
};
// ....
```

### Controller
```js
// ....
export create=({ args,ctx })=>{
    // Already all the permissions have been verified...
    
    const page = { ...args, userId: ctx.user }; 
    
    // some more operations....

    return page;
};
// ....
```

## API

### Router(...functions)

It can take any number of functions which are called one by one using the **next** parameter passed in all functions.

### next(err?)

It is passed in each of your functions as the last parameter.
To continue the chain you need to return this function call at the end of your function

#### Example
```js
    next() // this will call the next function in chain
    next(err) // this will stop the chain and throws error to graphql
```
### Router-functions({ root, args, ctx, info }, next)

You will recieve all the graphql parameters in the first argument and next function as second argument.

**Note** : You need to return the next() from your router function to continue the chain.
## Contributors:

### Credits goes to these people: ✨

<table>
	<tr>
		<td>
            <a href="https://github.com/Shubham-Kumar-2000/graphql-router-ware/graphs/contributors">
                <img src="https://contrib.rocks/image?repo=Shubham-Kumar-2000/graphql-router-ware" />
            </a>
		</td>
	</tr>
</table>
<p align="center">
  <h2 align="center">Visitor's Count <img align="center" src="https://profile-counter.glitch.me/Shubham-Kumar-2000.graphql-router-ware/count.svg" alt="Visitor Count" /></h2>
</p>

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Avatar {
    url: String!
    width: Int!
    height: Int!
  }

  type Author {
    id: ID!
    name: String!
    avatar: Avatar!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    creationDate: String!
    author: Author
  }

  type Query {
    articles: [Article]!
    author(id: ID): Author
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Author: {
    avatar: (root, args, context) => {
      return {
        url: `https://zfibdhjsids.com/${parseInt((Math.random() * 10000), 10)}`,
        width: 300,
        height: 150,
      }
    }
  },
  Article: {
    author: (root, args, context) => {
      console.log('Article author queried');
      if (root.id === 'dkfjbhdfosr5') {
        return {
          id: 'adsfads8f',
          name: 'Luca Colonnello',
        };
      }

      if (root.id === 'dikfjbnislfg9') {
        return {
          id: 'dsfjndsgsg212',
          name: 'Tony Petrides',
        };
      }
    },
  },
  Query: {
    articles: (root, args, context) => {
      console.log('Articles queried');
      return [
        {
          id: 'dkfjbhdfosr5',
          title: 'First article',
          content: 'Lorem Ispum...',
          creationDate: new Date().toISOString(),
        },
        {
          id: 'dikfjbnislfg9',
          title: 'Second article',
          content: 'Lorem Ispum...',
          creationDate: new Date().toISOString(),
        }
      ];
    },
    author: (root, { id }, context) => {
      console.log('Article author queried');
      if (id === 'adsfads8f') {
        return {
          id: 'adsfads8f',
          name: 'Luca Colonnello',
        };
      }

      if (id === 'dsfjndsgsg212') {
        return {
          id: 'dsfjndsgsg212',
          name: 'Tony Petrides',
        };
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


/*
Try querying
```
# Write your query or mutation here
query ArticleTest($authorId: ID) {
  articles {
    id
    title
    content
    creationDate
    author {
      name
      avatar {
        url
        width
        height
      }
    }
  }
	author(id: $authorId) {
    id
    name
    avatar {
      url
      width
      height
    }
  }
}

```

With variables:
```
{
  "authorId": "adsfads8f"
}
```

*/
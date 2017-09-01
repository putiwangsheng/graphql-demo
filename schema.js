import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import subjectsData from './data/subjects';
import addressData from './data/address';

const count = 0;

const Subject = new GraphQLObjectType({
  name: 'Subject',
  description: '一个科目',
  fields: {
    id: {
      type: GraphQLInt
    },
    subjectName: {
      type: GraphQLString,
      resolve: (source, args) => {
        return `${source.subjectName}`;
      }
    }
  }
})

const AddressDetail = new GraphQLObjectType({
  name: 'AddressDetail',
  description: '一个地址信息',
  fields: {
    Id: { type: GraphQLInt },
    Name: { type: GraphQLString }
  }
})

const Address = new GraphQLObjectType({
  name: 'Address',
  description: '某字母开头的地址',
  fields: {
    ShortKey: { type: GraphQLString },
    Content: {
      type: new GraphQLList(AddressDetail),
      resolve: (source, args) => {
        console.log(source);
        return source.Content;
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'queryDemo',
  description: 'this is a demo',
  fields: {
    count: {
      type: GraphQLInt,
      resolve: () => {
        return count;
      }
    },
    subjects: {
      type: new GraphQLList(Subject),
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}, request) => {
        if(id) {
          return subjectsData.filter((item) => {
            return item.id === id;
          });
        } else {
          return subjectsData;
        }
      }
    },
    address: {
      type: new GraphQLList(Address),
      args: {
        nameKey: { type: GraphQLString }
      },
      resolve: (source, {nameKey}) => {
        console.log('root', source);
        if(nameKey) {
          return addressData.filter((item) => {
            return item.ShortKey === nameKey.toUpperCase();
          })
        } else {
          return addressData;
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'mutationDemo',
  description: '增删改数据',
  fields: {
    addSubject: {
      type: Subject,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        subjectName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (source, args) => {
        //获取传过来的数据
        let subjectsProps = Object.assign({}, args);
        subjectsData.push(subjectsProps);
        return subjectsProps;
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;

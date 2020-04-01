const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { SourceType, SourceTypeInput } = require("./types");
const { Bubble } = require("../model");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    mutateSource: {
      type: SourceType,
      args: {
        sourceType: { type: GraphQLNonNull(GraphQLString) },
        sourceObject: { type: SourceTypeInput }
      },
      resolve(parentValue, { sourceType, sourceObject }) {
        const { sourceTypeSelected } = sourceObject;
        if (sourceTypeSelected) {
          sourceType = sourceTypeSelected;
        }
        const opt = { upsert: true, new: true };
        const { source_url } = sourceObject;

        if (sourceType && sourceType.length > 0) {
          return Bubble[sourceType].findOneAndUpdate(
            { source_url },
            sourceObject,
            opt
          );
        } else {
          return;
        }
      }
    }
  })
});

module.exports = Mutation;

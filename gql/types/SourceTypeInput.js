const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;

const SourceTypeInput = new GraphQLInputObjectType({
  name: "SourceTypeInput",
  // description: "User type definition",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    source_url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    sourceTypeSelected: {
      type: GraphQLString
    },
    filtering: {
      type: FilteringType
    },
    archive: {
      type: ArchiveType
    },
    nuzzel: {
      type: NuzzelType
    }
  })
});

const FilteringType = new GraphQLInputObjectType({
  name: "Filtering",
  // description: "User type definition",
  fields: () => ({
    link_includer: {
      type: GraphQLString
    },
    link_excluder: {
      type: GraphQLString
    },
    beginning_identifier: {
      type: GraphQLString
    },
    end_identifier: {
      type: GraphQLString
    },
    number_of_links: {
      type: GraphQLInt
    }
  })
});

const ArchiveType = new GraphQLInputObjectType({
  name: "Archive",
  // description: "User type definition",
  fields: () => ({
    identifier_url: {
      type: GraphQLString
    },
    opening_url: {
      type: GraphQLString
    },
    archive_identifier_slug: {
      type: GraphQLString
    },
    archive_prepend_slug: {
      type: GraphQLString
    },
    latest_link_number: {
      type: GraphQLInt
    }
  })
});

const NuzzelType = new GraphQLInputObjectType({
  name: "Nuzzel",
  // description: "User type definition",
  fields: () => ({
    nuzzel_user_id: {
      type: GraphQLString
    },
    nuzzel_user_name: {
      type: GraphQLString
    },
    nuzzel_user_password: {
      type: GraphQLString
    }
  })
});

module.exports = SourceTypeInput;

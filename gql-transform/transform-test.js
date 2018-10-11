'use strict'

var _graphqlTransformerCore = require('graphql-transformer-core')

var _graphqlTransformerCore2 = _interopRequireDefault(_graphqlTransformerCore)

var _graphqlDynamodbTransformer = require('graphql-dynamodb-transformer')

var _graphqlDynamodbTransformer2 = _interopRequireDefault(
  _graphqlDynamodbTransformer
)

var _graphqlConnectionTransformer = require('graphql-connection-transformer')

var _graphqlConnectionTransformer2 = _interopRequireDefault(
  _graphqlConnectionTransformer
)

var _graphqlAuthTransformer = require('graphql-auth-transformer')

var _graphqlAuthTransformer2 = _interopRequireDefault(_graphqlAuthTransformer)

var _graphqlAppsyncTransformer = require('graphql-appsync-transformer')

var _graphqlAppsyncTransformer2 = _interopRequireDefault(
  _graphqlAppsyncTransformer
)

var _graphqlVersionedTransformer = require('graphql-versioned-transformer')

var _graphqlVersionedTransformer2 = _interopRequireDefault(
  _graphqlVersionedTransformer
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// Note: This is not exact as we are omitting the @searchable transformer.
var transformer = new _graphqlTransformerCore2.default({
  transformers: [
    new _graphqlAppsyncTransformer2.default(),
    new _graphqlDynamodbTransformer2.default(),
    new _graphqlAuthTransformer2.default(),
    new _graphqlConnectionTransformer2.default(),
    new _graphqlVersionedTransformer2.default(),
  ],
})
var schema =
  '\ntype Post @model {\n    id: ID!\n    title: String!\n    comments: [Comment] @connection(name: "PostComments")\n}\ntype Comment @model {\n    id: ID!\n    content: String!\n    post: Post @connection(name: "PostComments")\n}\n'
var cfdoc = transformer.transform(schema)
console.log(cfdoc)
fs.w
//var out = createStack(cfdoc, name, region)
console.log('OASUODIASPIDAS')
console.log(
  'Application creation successfully started. It may take a few minutes to finish.'
)

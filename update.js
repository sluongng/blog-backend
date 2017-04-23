/**
 * Created by NB on 4/18/2017.
 */

import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'BlogEntries',

    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      entryId: event.pathParameters.id,
    },

    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':content': data.content ? data.content : null,
      ':attachment': data.attachment ? data.attachment : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);

    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
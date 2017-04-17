/**
 * Created by NB on 4/18/2017.
 */

import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from  './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'BlogEntries',

    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      entryId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);

    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};
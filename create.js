/**
 * Created by NB on 4/16/2017.
 */

import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  const data = JSON.parse(event.body);

  const params = {
    TableName: 'BlogEntries',

    Item: {
      userId: event.requestContext.authorizer.claims.sub,
      entryId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, success(params.Item));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
}
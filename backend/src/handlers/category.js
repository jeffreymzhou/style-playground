import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

import middleware from '../common/middleware'

var createError = require('http-errors')

// initialize basic table info
const AWS = require('aws-sdk')
if (process.env.TABLE_REGION) {
    AWS.config.update({ region: process.env.TABLE_REGION });
} else {
    AWS.config.update({ region: 'us-east-1' });
}

let tableName = "categories-dev"
if (process.env.CATEGORIES_TABLE) {
    tableName = process.env.CATEGORIES_TABLE;
}

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getCategoriesByUser = middleware(async (event, context) => {
    const { userId } = event.pathParameters

    let params = {
        TableName: tableName,
        KeyConditionExpression: "#user = :user",
        ExpressionAttributeNames: {
            "#user": "userId"
        },
        ExpressionAttributeValues: {
            ":user": userId
        }
    };

    try {
        const result = await dynamodb.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})


// read a single category
const getCategory = middy(async (event, context) => {
    const { userId, cdate } = event.pathParameters

    const cdateAsNumber = Number.parseInt(cdate)
    if (Number.isNaN(cdateAsNumber)) {
        return {
            statusCode: 400,
            body: `failed to parse cdate: "${cdate}". It must be a number.`
        }
    }

    let params = {
        TableName: tableName,
        Key: {
            "userId": userId,
            "cdate": cdateAsNumber
        }
    };

    try {
        const result = await dynamodb.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
}).use([
    jsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
])



// Note: this method handles both "creation" and "update"
// always pass the whole document when updating the doc
const creatCategory = middy(async (event, context) => {
    const item = event.body

    let params = {
        TableName: tableName,
        Item: item
    };

    try {
        const result = await dynamodb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
}).use([
    jsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
])

const deleteCategory = middy(async (event, context) => {
    const { userId, cdate } = event.pathParameters
    console.log(userId, ":", cdate)

    const cdateAsNumber = Number.parseInt(cdate)
    if (Number.isNaN(cdateAsNumber)) {
        return {
            statusCode: 400,
            body: `failed to parse cdate: "${cdate}". It must be a number.`
        }
    }

    let params = {
        TableName: tableName,
        Key: {
            "userId": userId,
            "cdate": Number.parseInt(cdate)
        }
    };

    try {
        const result = await dynamodb.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
}).use([
    jsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
])


export { getCategoriesByUser, getCategory, creatCategory, deleteCategory }
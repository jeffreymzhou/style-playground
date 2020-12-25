import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

var createError = require('http-errors')

// initialize basic table info
const AWS = require('aws-sdk')
if (process.env.TABLE_REGION) {
    AWS.config.update({ region: process.env.TABLE_REGION });
} else {
    AWS.config.update({ region: 'us-east-1' });
}

var tableName = "tasks-dev"
if (process.env.TASKS_TABLE) {
    tableName = process.env.TASKS_TABLE;
}

var secondaryIndexName = "userAndCategoryIndex"
if (process.env.TASKS_TABLE_SECONDARY_INDEX_NAME) {
    secondaryIndexName = process.env.TASKS_TABLE_SECONDARY_INDEX_NAME;
}

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTasksByUser = middy(async (event, context) => {
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
}).use([
    jsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
])


// read a single task
const getTask = middy(async (event, context) => {
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


// get task by user and category
const getTaskByUserAndCategory = middy(async (event, context) => {
    const { userId, category } = event.pathParameters

    let params = {
        TableName: tableName,
        IndexName: secondaryIndexName,
        KeyConditionExpression: "#user = :user and #category = :category",
        ExpressionAttributeNames: {
            "#user": "userId",
            "#category": "category"
        },
        ExpressionAttributeValues: {
            ":user": userId,
            ":category": category
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
}).use([
    jsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
])



// Note: this method handles both "creation" and "update"
// always pass the whole document when updating the doc
const creatTask = middy(async (event, context) => {
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

const deleteTask = middy(async (event, context) => {
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


export { getTasksByUser, getTask, getTaskByUserAndCategory, creatTask, deleteTask }
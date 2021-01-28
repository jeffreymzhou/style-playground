/**
 * this file contains the lambda handlers for task CRUD operations
 */

import middleware from '../common/middleware'
import createError from 'http-errors'

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

/**
 * method to get tasks from a user
 */
const getTasksByUser = middleware(async (event, context) => {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.Items)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})


/**
 * method to read a single task by primary key: userId + cdate
 */
const getTask = middleware(async (event, context) => {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})


/**
 * method to get tasks by user and category
 * it uses the dynamoDB's global secondary index
 */
const getTasksByUserAndCategory = middleware(async (event, context) => {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.Items)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})



/**
 * method to create a task
 * Note: this method handles both "creation" and "update"
 * always pass the whole document when updating the doc
 */
const creatTask = middleware(async (event, context) => {
    const item = event.body

    let params = {
        TableName: tableName,
        Item: item
    };

    try {
        const result = await dynamodb.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})

/**
 * method to delete a task by primary key: userId + cdate
 */
const deleteTask = middleware(async (event, context) => {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
})

export { getTasksByUser, getTask, getTasksByUserAndCategory, creatTask, deleteTask }
const { path } = require('ramda')
const {
  isTruthy,
  spreadPath,
  isNilOrEmpty,
  renameKeys,
} = require('ramda-adjunct')
const unfetch = require('isomorphic-unfetch')
const parser = require('fast-xml-parser')
const he = require('he')
const { format } = require('date-fns')
const AWS = require('aws-sdk')

const newLastCheck = format(Date.now(), 'YYYYMMDDHHMM')
const ddb = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2',
  accessKeyId: 'AKIA4HHNOKXXW3YSBIXI',
  secretAccessKey: '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',
})

async function getLastC() {
  console.log(lastCheck)
}

getLastC()

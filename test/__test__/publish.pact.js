const pact = require('@pact-foundation/pact-node')
const path = require('path')

// DOTO try remove dotenv dependencies
require('dotenv').config()

if (!process.env.PUBLISH_PACT) {
  console.log('skipping Pact publish...')
  return
}

const pactBrokerUrl = process.env.PACT_BROKER_URL
const pactBrokerUsername = process.env.PACT_BROKER_USERNAME
const pactBrokerPassword = process.env.PACT_BROKER_PASSWORD

const gitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim()

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, './pacts/')],
  pactBroker: pactBrokerUrl,
  pactBrokerUsername: pactBrokerUsername,
  pactBrokerPassword: pactBrokerPassword,
  tags: ['test'],
  consumerVersion: gitHash
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log(`Head over to ${pactBrokerUrl} and login with`)
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })

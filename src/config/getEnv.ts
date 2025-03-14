/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/ban-ts-comment */

const {
  SecretsManagerClient,
  GetSecretValueCommand,
} =  require('@aws-sdk/client-secrets-manager')


async function getEnv() {
  console.log('Getting secret')
  let prefix = 'prod'
  if (process.env.ENV === 'preprod') {
    prefix = 'preprod'
  }
  const secret_name = prefix + '/lms'

  const client = new SecretsManagerClient({
    region: 'ap-south-1',
  })

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
    })
  )

  if (response) {
    const secret = response.SecretString
    // Create .env file in root directory
    // @ts-ignore
    require('fs').writeFileSync(`${__dirname}/../../.env.prod`, secret)
  }
}
getEnv()

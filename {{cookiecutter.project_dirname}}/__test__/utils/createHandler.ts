import { rest } from 'msw'
import SwaggerParser from '@apidevtools/swagger-parser'
import jsf from 'json-schema-faker'

type Options = {
  baseUrl: string
  content?: string
  method: 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put'
  openapiDocumentPath: string
  path: string
  statusCode: number
}

jsf.option({
  failOnInvalidFormat: false,
  failOnInvalidTypes: false,
  useExamplesValue: true,
  useDefaultValue: true
})

export const createHandler = async ({
  baseUrl,
  content = 'application/json',
  method,
  openapiDocumentPath,
  path,
  statusCode
}: Options) => {
  const api = await SwaggerParser.validate(openapiDocumentPath)
  const schema = api.paths[path][method].responses[statusCode].content[content].schema

  const handler = rest[method](`${baseUrl}${path}`, async (req, res, ctx) => {
    const response = await jsf.resolve(schema)
    return res(ctx.status(statusCode), ctx.json(response))
  })

  return handler
}

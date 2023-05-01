import * as process from 'process'
import {expect, test} from '@jest/globals'
import * as utils from '../src/utils'


test('test runs', () => {
    process.env['DATABRICKS_HOST'] = 'https://xyz.cloud.databricks.com'
    process.env['DATABRICKS_REPO_ID'] = '3704530822795627'
  })

test('databricks host', () => {
    const host = utils.get_databricks_host()
    expect(typeof host).toBe("string")
})


test('databricks repo id', () => {
    const host = utils.get_databricks_repo_id()
    expect(typeof host).toBe("string")
})
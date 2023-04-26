import * as core from '@actions/core'
import * as utils from './utils'
import axios from 'axios'

async function run(): Promise<void> {
    try {
        core.info('Starting Action')
        const databricks_host: string = utils.get_databricks_host()
        const databricks_repo_id: string = utils.get_databricks_repo_id()
        const databricks_branch: string = utils.get_repo_branch()
        const token = core.getInput('databricks-token')

        if (!token) {
            throw new Error('Authorization token is not set')
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const dbc_endpoint = `${databricks_host}/api/2.0/repos/${databricks_repo_id}`
        core.info(dbc_endpoint)
        core.info('Sending Request')
        const response = await axios.patch(
            dbc_endpoint,
            {
                branch: databricks_branch
            },
            config
        )

        const status = response.status
        core.info(`HTTP status code ${status}`)
        core.info(response.data)
        if (status === 200) {
            core.info('Deployed the code successfully')
        } else {
            core.setFailed('Failed to update the repo')
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()

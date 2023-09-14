import * as core from '@actions/core'
import * as utils from './utils'
import axios from 'axios'

async function run(): Promise<void> {
    try {
        const databricks_host: string = utils.get_databricks_host()
        const databricks_repo_id: string = utils.get_databricks_repo_id()
        const databricks_branch: string = utils.get_repo_branch()
        const token = utils.get_databricks_token()

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        core.info('Starting to deploy......')
        const dbc_endpoint = `${databricks_host}/api/2.0/repos/${databricks_repo_id}`
        const response = await axios.patch(
            dbc_endpoint,
            {
                branch: databricks_branch
            },
            config
        )

        const status = response.status
        core.info(`status code ${status}`)
        if (status === 200) {
            core.info('Deployed the code successfully')
        } else if (status === 401) {
            core.info(
                'Authentication error, please check your databricks token!'
            )
        } else {
            core.setFailed('Failed to update the repo')
        }
    } catch (error) {
        if (error instanceof Error) {
            core.info(error.message)
            core.setFailed(error.message)
        }
    }
}

run()

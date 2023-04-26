import * as core from '@actions/core'
import * as utils from './utils'
import axios from 'axios'

async function run(): Promise<void> {
    try {
        const databricks_host: string = utils.get_databricks_host()
        const databricks_repo_id: string = utils.get_databricks_repo_id()
        const databricks_branch: string = utils.get_repo_branch()
        const dbc_endpoint = `${databricks_host}/api/2.0/repos/${databricks_repo_id}`
        const response = await axios.patch(dbc_endpoint, {
            branch: databricks_branch
        })
        const status = response.status
        core.setOutput('Message', `HTTP status code ${status}`)
        core.setOutput('Message', response.data)
        if (status === 200) {
            core.setOutput('Message', 'Deployed the code successfully')
        } else {
            core.setFailed('Failed to update the repo')
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()

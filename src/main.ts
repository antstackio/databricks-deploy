import * as core from '@actions/core'
import axios from 'axios'

async function run(): Promise<void> {
    try {
        core.debug('Starting Action')
        const databricks_host: string = core.getInput('databricks-host')
        const databricks_repo_id: string = core.getInput('databricks-repo-id')
        const databricks_branch: string = core.getInput(
            'databricks-repo-branch'
        )
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
        core.debug(dbc_endpoint)
        core.debug('Sending Request')
        const response = await axios.patch(
            dbc_endpoint,
            {
                branch: databricks_branch
            },
            config
        )

        const status = response.status
        core.debug(`HTTP status code ${status}`)
        core.debug(response.data)
        if (status === 200) {
            core.debug('Deployed the code successfully')
        } else {
            core.setFailed('Failed to update the repo')
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()

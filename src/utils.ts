import * as core from '@actions/core'

export function get_databricks_host(): string {
    const databricks_host_input: string = core.getInput('databricks-host')
    const databricks_host_env: string = process.env['DATABRICKS_HOST'] || ''
    core.debug(`DATABRICKS HOST INPUT :: ${databricks_host_input}`)
    core.debug(`DATABRICKS HOST ENV :: ${databricks_host_env}`)

    if (!databricks_host_input && !databricks_host_env) {
        core.debug(
            'databricks-host or DATABRICKS_HOST environment variable must be set.'
        )
        throw new Error(
            'databricks-host or DATABRICKS_HOST environment variable must be set.'
        )
    } else {
        return databricks_host_input
            ? databricks_host_input
            : databricks_host_env
    }
}

export function get_databricks_repo_id(): string {
    const databricks_repo_input: string = core.getInput('databricks-repo-id')
    const databricks_repo_env: string = process.env['DATABRICKS_REPO_ID'] || ''
    if (!databricks_repo_input && !databricks_repo_env) {
        throw new Error(
            'databricks-repo-id or DATABRICKS_REPO_ID environment variable must be set.'
        )
    } else {
        return databricks_repo_input
            ? databricks_repo_input
            : databricks_repo_env
    }
}

export function get_repo_branch(): string {
    const databricks_branch: string = core.getInput('databricks-repo-branch')

    if (!databricks_branch) {
        throw Error('databricks-repo-branch must be set.')
    } else {
        return databricks_branch
    }
}

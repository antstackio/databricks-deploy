<p>
  <p align="center">
    <a><img alt="sonar-cloud-badge" src="https://sonarcloud.io/images/project_badges/sonarcloud-white.svg">
    </a>
  </p>

  <p align="center">
    <a href="https://github.com/antstackio/databricks-deploy/actions"><img alt="build-test status" src="https://github.com/antstackio/databricks-deploy/workflows/build-test/badge.svg"></a>
  </p>
</p>

# Databricks Deploy

Use this Github Action to perform continuous deployment in your Databricks repo.

## Usage

see [action.yml](action.yml)

<!-- start usage -->
```yaml
- uses: antstackio/databricks-deploy@v1.0.3
  with:
    databricks-repo-branch: 'your branch name'
    databricks-token: 'databricks token from github secret'
    databricks-host: 'https://xyz.cloud.databricks.com'
    databricks-repo-id: 'get repo id from databricks'
```
<!-- end usage -->
## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Code of Conduct
:wave: See our [Code of Conduct](CODE_OF_CONDUCT)


**PS. If you face any problem while using the action just create an issue.**
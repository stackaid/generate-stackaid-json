# generate-stackaid-json

A GitHub action to generate a stackaid.json file based on your repository's dependency graph

This action is primarily intended to support funding your dependencies on StackAid for ecosystems that are not yet natively supported (eg: Go, PHP, Python, etc.).

By using the GitHub dependency graph API this action is able to discover your direct and indirect dependencies and generate a `stackaid.json` file which can then be discovered and used by StackAid to fund your dependencies.

Here's an example workflow to add to your repository:

```yaml
name: 'fund-on-stackaid'
on:
  push:
    branches:
      - main
jobs:
  stackaid-json:
    runs-on: ubuntu-latest
    steps:
      - uses: stackaid/generate-stackaid-json@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

This will commit a `stackaid.json` file in your repository which will then automatically show up for funding in the StackAid dashboard.

The action also supports a few useful `inputs` and `outputs` so you can publish to a different repository or skip publishing all together and consume the generated stackaid.json in another action.

### Inputs

- `token`: An access token which has repo permissions. You can use the `${{ secrets.GITHUB_TOKEN }}` automatically provided by the action runner if publishing to the same repository.
- `publish_repo`: The full name of the repository, (eg: `username/repo-name`) to publish the generated stackaid.json file. Defaults to the current repository.
- `publish_path`: The path to publish to. By default the stackaid.json file is published to the root of the repository.
- `skip_publish`: Set to `true` if you do not want to publish the generated file.

**Note**: If you publish to a separate repo you will need to provide a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the appropriate repo permissions.

### Outputs

- `stackaid_json`: The generated stackaid.json file as a string.

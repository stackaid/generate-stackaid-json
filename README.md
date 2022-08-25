# generate-stackaid-json

A GitHub action to generate a stackaid.json file based on your repository's dependency graph

This action is primarily intended to support funding your dependencies on StackAid for ecosystems that are not natively supported yet, (eg: Go, PHP, Python, etc.)

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
      - uses: actions/generate-stackaid-json
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

This will add/update a `stackaid.json` file into your repository which will then automatically show up for funding in your StackAid dashboard.

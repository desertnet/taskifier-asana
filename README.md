# taskifier-asana

Task receiver for [taskifier](https://github.com/desertnet/taskifier) that generates Asana tasks.

## Installation

```
npm install taskifier-asana
```

## Configuration

First, you'll need to retrieve an Asana API key. With the Asana user you would like to have tasks appear to be created by, visit the user settings "App" tab. You'll find an API key there.

Next, you'll need the Asana workspace/organization ID. There's a command line utility included with this module that will help you get this value. Replace `<ASANA_API_KEY>` with the API key you got from the previous step.

```
./node_modules/taskifier-asana/bin/show-asana-workspaces <ASANA_API_KEY>
```

Now you'll need the project ID of the project you wish for taskifier-genrated tasks to appear in. Just visit the project in your browser, and note the number at the end of the URL.

Lastly, set up your taskifier config.json with a `taskifier-asana` config in `taskReceivers`. Set `apiKey`, `workspaceId`, and `projectId` with the values you obtained in the previous step. Your config may look something like this:

```json
{
  "port": 8809,
  "addr": "127.0.0.1",
  "inboxes": {
    "support": {
      "database": "./taskifier-test-db.leveldb",
      "taskReceivers": {
        "taskifier-asana": {
          "apiKey": "foo",
          "workspaceId": 888,
          "projectId": 999
        }
      }
    }
  }
}
```

## Contributing

Run the tests with `npm test`. By default, integration tests are skipped as they require Asana API access. To enable the integration tests, set the following environment variables: `ASANA_API_KEY`, `ASANA_WORKSPACE_ID`, and `ASANA_PROJECT_ID`.

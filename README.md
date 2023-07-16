# [CRC][TS] Auto Save

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

Automatically save position, health, and armour for logged in players.

## Requires

- [CRC DB](https://github.com/altv-crc/crc-db)

_Highly recommended to get the extension, for better event handling._

## Installation

1. Create a folder in your `src` folder called `crc-auto-save`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-auto-save`.

```
resources = [ 
    ...,
    'crc-auto-save',
    ...
]
```

_Resource structure may vary_
# How to?

```sh
docker-compose up
```

# Create query

```sh
curl -X POST http://localhost:3000/api/commit -H 'content-type: application/json' -d  '{"a": 78, "b": 42}'
```

# Retrieve result

```sh
curl http://localhost:3000/api/retrieve?id=TRANSACTION_ID
```
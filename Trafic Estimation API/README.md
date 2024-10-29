# Trafic Estimation API

This is an API for getting forcast of number of request which will be hit for a particulat criteria based on historical data.

## Setting up the API

For setting up the API run:

```
npm install
```

## Starting the API

For starting the API run:

```
npm start
```

## Endpoint: `/estimate/`

POST endpoint for getting estimated requests based on a criteria.

### Request body

```
{
    criteria: {
        countries?: string[],
        browsername?: string[],
        platformnames?: string[],
        vertical?: string[]
    },
    "totalRequestCount": number
}
```

### Exapmle call:

```
curl -X POST http://127.0.0.1:{PORT}/lime/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "criteria": {"platformnames": ["Android"]},
    "totalRequestCount": 100000
  }'
```

### Exapmle responce:

```jsx
{
    "estimatedTraffic": 46571
}

```

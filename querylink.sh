#!/bin/bash

# Make the POST request and extract the token
json_a=$(jq -n --arg scribe_token "$SCRIBE_TOKEN" \
'{
    "api_token": $scribe_token,
    "client_id": "string",
    "client_secret": "string"
  }')
echo "Scribe1: $json_a"
TOKEN=$(curl -s -X POST \
  'https://api.scribesecurity.com/v1/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d  "$json_a"| jq -r '.token')

# Optional: print the token (for debugging)
echo "TOKEN: $TOKEN"
echo "--------------------------------------------"
access_token=$(curl -s -X GET \
  'https://api.scribesecurity.com/dataset/token' \
-H "Authorization: Bearer $TOKEN" \
-H 'accept: */*' \
-H 'Content-Type: application/json'|jq -r '.access_token')
echo "access_token: $access_token"
echo "(1)-----------------------------------------"
json_body=$(jq -n --arg superset_token "$access_token" \
'{
    "superset_token": $superset_token,
    "validate": false, 
    "query": {
        "datasource": {
            "id": 3122,
            "type": "table"
        },
        "force": false,
        "queries": [
            {
               "columns": [
                    "attestation_timestamp",
                    "logical_app",
                    "logical_app_version",
                    "targetName",
                    "deeplink",
                    "run_id"
                ],
                "filters": [
                {
                    "col": "run_id",
                    "op": "==",
                    "val": "14239124682"
                    }
                ],
                "metrics": [],
                "row_limit": 0
            }
        ],
        "result_format": "json",
        "result_type": "results"
  }
}
')


echo $json_body


curl -s -X POST \
  'https://api.scribesecurity.com/dataset/data' \
-H "Authorization: Bearer $TOKEN" \
-H 'accept: */*' \
-H 'Content-Type: application/json' \
-d "$json_body"|jq -r '.result[].data[]|"https://app.scribesecurity.com\.deeplink)"'

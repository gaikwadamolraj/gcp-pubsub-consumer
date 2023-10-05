# Pub sub consumer & Java microservice API

This will read message from pub sub topic and push into db. REST API will expose that data with spring boot rest controller.

### Authenticate the gcloud application using below command

```sh
gcloud auth application-default login
```

## Sample message to push in pub sub

```sh
{
"data": {
  "project_name": "SCA",
  "env": "PROD",
  "status": "Passed",
  "total_passed": 10,
  "total": 10,
  "failed": 0
}
}
```

## Onboard new repo

1. Go to Cloud build > Repository > 2ND GEN > Create Host Connection
   Select Gitlab > Select Region > Add new name > Host details >
   select Host details > Network connection > PAT tokens > Connect

2. Then Link the repo > Select the repo > Select the file

## Triggers

1. Name > Provide the details

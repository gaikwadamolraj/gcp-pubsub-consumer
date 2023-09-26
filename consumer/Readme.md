# gcp-pub-sub-consumer

This will read the message 1 by 1 and after process it will ack so other service will not pick. If any error occurs then ack will not happen and other cosumer will process the message

### Authenticate the gcloud application using below command

```sh
gcloud auth application-default login
```

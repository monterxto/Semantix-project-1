## About the Application
Used the clean architecture in the applications, trying to decouple the layers as much as possible.
The cronjob application is the scheduler when scheduling a task you can use these options:
```
body: {
  name: string;
  job: string;
  repeat?: {
      cron: string;
      startAt?: string(IsoDateFormat);
      endAt?: string(IsoDateFormat);
      limit?: number;
    };
  delay?: string;
  data?: any;
}
```
The cron field is the crontab format, the job field has two options (it can be easily extended) of tasks the `UsersSemantixToDb` that takes all the users of the api and saves in the database, and the `CreateReportsToGofile` task that takes all database users, transform it into a csv file and upload it to the go file api.

I kept the .env file for easier testing

If you have any questions I'm at your disposal =D

## Start Application
I'm using docker compose to start the application together with mongodb.<br>
To start the application use:<br>
`docker-compose up -d`<br>

## Postman Documentation
[Documentation online](https://documenter.getpostman.com/view/12863884/UyxeqpT3)

## Postman collection
[Collection online](https://www.postman.com/monterxto/workspace/challenge/collection/12863884-c9ecdcb6-43ab-4310-b63b-aa417a0b2d1a?action=share&creator=12863884)
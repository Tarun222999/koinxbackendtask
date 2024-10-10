
1.Deployemnt Link: https://koinxbackendtask-production.up.railway.app/


2.Postman Collection Link:https://elements.getpostman.com/redirect?entityId=25926850-fe2a2f58-34bb-4587-ba83-332b50bc8612&entityType=collection



3.Postman API Link: https://api.postman.com/collections/25926850-fe2a2f58-34bb-4587-ba83-332b50bc8612?access_key=PMAT-01J9TNJ5S83THJQBMG32G8VA2A

  A server side application using Node.js and MongoDB 

  
![diagram-export-10-10-2024-12_51_04-PM](https://github.com/user-attachments/assets/2291f308-6037-4738-95bb-2f340b34f134)


## Features

-a background job that will fetch the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database for every 2 hours 
- [/api/stats?code=bitcoin](https://koinxbackendtask-production.up.railway.app/api/stats?coin=ethereum) that will return the latest data about the requested cryptocurrency.
- [/api/deviation?code=bitcoin](https://koinxbackendtask-production.up.railway.app/api/deviation?coin=bitcoin)  that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
## Tech Stack



**Server:** Node, Express

**Database:** Mongodb

**API:** CoinGecko




## Run Locally

Clone the project

```bash
  git clone https://github.com/Tarun222999/koinxbackendtask
```




Install dependencies in frontend and backend

```bash
  npm install
```

Start react in backend folder

```bash
  npm run dev
```



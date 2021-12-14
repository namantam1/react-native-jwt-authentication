React Native authentication with JWT

## Feature
- Authentication with JWT.
- Silent refresh of access token on expiration of access token using refresh token.
- Automatic session out on expiration of refresh token.

## Pre-requisite
- [Python](https://python.org) for backend setup.
- [Node.js](https://nodejs.dev/)
- Android emulator installed (option if testing on physical device).

## Usage

1. Installation node dependencies.
   ```bash
   yarn install
   ```
2. Setup backend. Click [here](./backend/README.md) for setup. 
3. Set URL of backend in `.env` file. To get IP of your system run command `ipconfig`, you should get output something like this to get you IP.
```bash
~$ ipconfig
Wireless LAN adapter Local Area Connection* 2:

   Connection-specific DNS Suffix  . : 
   ...
   IPv4 Address. . . . . . . . . . . : 192.168.xx.xx
   ...
```
1. Start metro bundler
   ```bash
   yarn start
   ```
2. Install app by running emulator.
   ```bash
   yarn android # for android
   yarn ios # for ios
   ```
3. Now login with default credential given in backend setup page.

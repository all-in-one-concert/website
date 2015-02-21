#all in one concert website
This is the work-in-progress repository of the new All in one Concert website that's going to replace the currently online website at http://aioc.ch and is built on top of [neutronJS](https://github.com/VanCoding/neutronJS).

You can use this repository as a demo-website for neutronJS

##setting up and running

1) Install mongodb on your computer

2) Clone this repository using `git clone https://github.com/all-in-one-concert/website.git`

3) Cd into the repository directory using `cd website`

4) Install dependencies using `npm install`

5) Create the following file with the following contents:

```
//config.js
exports.db = "mongodb://localhost/aioc"; //modify the path to point to your installed mongodb instance
exports.port = 80;
```

6) Run the website using `node ./`

7) Visit `http://localhost` for the website and `http://localhost/neutron/` for the admin panel

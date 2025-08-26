# Project Changes

## need update of the  api file to localhost into the ip address
first need to install the node js 16 version and angular 11 to run this application
after we setup the application then we need to install node modules 
then it should run by this cmd to avoid the further issues 

"set NODE_OPTIONS "--openssl-legacy-provider""
use this before runing the "ng serve" cmd


if it running fine then stop the application 
and run this cmd to build the project to deploy on the nginx 

ng build

then we need to install the nginx in the vm by using this cmd

sudo apt install -y nginx

then need to run this cmd to remove existing html file

sudo rm -rf /var/www/html/*

copy the build file and replace in the same loaction above 

sudo cp -r dist/examfront/* /var/www/html/

update the configuration of the ngix to run configuraation

sudo nano /etc/nginx/sites-available/default

update the below in above location 
.
server {
    listen 80;

    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}

and before build and deploy need change the the local host by seeing below 
In this path of this file need to update the file like localhost into ip address of vms  of backend ip address
"frontend/frontend/src/app/services/helper.ts"
And also need to update this also
"frontend/frontend/src/app/services/otherNewUrls.ts"
 

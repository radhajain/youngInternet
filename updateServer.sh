ng build
sudo cp -r dist/ /var/www/html/nodejs/tyi/
sudo pm2 list
sudo pm2 restart server
sudo service apache2 restart

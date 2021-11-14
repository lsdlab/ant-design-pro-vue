push:
	git add .; git commit -m "update"; git push origin master

deploy:
	yarn run build; scp -r dist/ root@45.33.58.139:/root/antdesignprovue/

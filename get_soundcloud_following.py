from bs4 import BeautifulSoup
import requests
import time
import csv
import datetime
from random import randint
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

#skip = input()
skip = 1
print(','.join(['from','to', 'weight', 'type']))
#for loop

driver = webdriver.Firefox()
#reader = csv.reader(open("the_young_internet_nodes.csv"))
reader = csv.reader(open("lil_nodes.csv"))
for x in range(skip):
	next(reader)
for row in reader:
	source = row[2]
	driver.get(source + "/following")
	lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
	match=False
	while(match==False):
		        lastCount = lenOfPage
		        time.sleep(randint(3,5))
		        lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
		        time.sleep(randint(5,10))
		        if lastCount==lenOfPage:
		            match=True
	elems = driver.find_elements_by_xpath("//a[@href]")

	del elems[0:12]
	elems = elems[:-5]

	elems = [x for x in elems if "pro" not in x.get_attribute("href")] 

	elems = elems[::2]

	for elem in elems:
		print(','.join([source, elem.get_attribute("href"), "1", 'Soundcloud']).encode('utf-8').strip())

	time.sleep(randint(20,30))	


driver.close()

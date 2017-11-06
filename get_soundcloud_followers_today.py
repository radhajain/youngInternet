from bs4 import BeautifulSoup
import requests
import time
import csv
import datetime

i = datetime.datetime.now()


i.strftime('%m.%d.%y')

# print(','.join(['artist_name', i.strftime('%m.%d.%y')]))
f = open('output.txt', 'w')
# f.write(','.join(['artist_name', i.strftime('%m.%d.%y')]) + '\n')
#for loop
strToWrite = ''
strToWrite += ','.join(['artist_name', i.strftime('%m.%d.%y')]) + '\n'
with open('little_nodes.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    next (readCSV)
    for row in readCSV:
        source = row[2]
        print(source)
        parsed_source = source.split("/")
        artist_url = parsed_source[3]
        web_page = requests.get(source)

        soup = BeautifulSoup(web_page.content, "html.parser")

	#artist = soup.find('a', href= "/" + artist_url).text
        artist = row[1]
        meta = soup.find('meta', property="soundcloud:follower_count")
        followers = meta["content"]
#        f.write(str(','.join([artist, followers]).encode('utf-8').strip()) + '\n')
        strToWrite += (str(','.join([artist, followers]).encode('utf-8').strip()) + '\n')
        time.sleep(3)
f.write(strToWrite)
f.close()


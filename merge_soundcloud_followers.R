setwd("~/Documents/the_young_internet")
library(tidyverse)
library(stringr)
library(ggplot2)
library(gtools)

full_data <- read.csv("soundcloud_followers_data.csv", check.names = FALSE)
new_data <- read.csv("soundcloud_followers_today.csv", check.names = FALSE)
nodes <- read.csv("the_young_internet_nodes.csv", check.names = FALSE)
new_data[,2]
nodes$soundcloud_followers <- new_data[,2]
nodes
new_data
full_data
full_data <- merge(full_data, new_data, all=TRUE)
full_data
nodes
nodes <- nodes[order(nodes$id),]
nodes

growth <- mutate(full_data, growth_percent = ((full_data[,ncol(full_data)] / full_data[,ncol(full_data)-3]) - 1) * 100 )
growth <- select(growth, artist = artist_name, new_growth = growth_percent)
growth
growth <- merge(nodes, growth, by = "artist", all.x = TRUE)
growth
growth <- select(growth, id, artist, new_growth)
growth <- growth[order(growth$id),]
nodes$growth_percent <- growth$new_growth
nodes

#
write.csv(full_data, file = "soundcloud_followers_data.csv", row.names = FALSE)
write.csv(nodes, file = "the_young_internet_nodes.csv", row.names = FALSE)
#

gather_data <- gather(full_data, date, count, -artist_name)
#gather_data$count[is.na(gather_data$count)] <- 0
gather_data$date <- as.Date(gather_data$date, "%m.%d.%y")
gather_data

small <- filter(gather_data, count < 10000)
small_graph <- ggplot(data = small, aes(x=date, y = count, group = artist_name)) + 
  geom_line(aes(color = artist_name)) +
  labs(title='Soundcloud Followers over Time', x="\nDate", y="Followers\n") +
  theme(legend.position = c(1, 1), 
        legend.justification = c(0,1),
        legend.key.width = unit(1, "lines"),
        plot.margin = unit(c(1, 5, 0.5, 0.5), "lines")) +
  scale_color_discrete(name = 'Name')
small_graph

under20 <- filter(gather_data, count < 20000 & count > 10000)
under20
under20_graph <- ggplot(data = under20, aes(x=date, y = count, group = artist_name)) + 
  geom_line(aes(color = artist_name)) +
  labs(title='Soundcloud Followers over Time', x="\nDate", y="Followers\n") +
  theme(legend.position = c(1, 1), 
        legend.justification = c(0,1),
        legend.key.width = unit(1, "lines"),
        plot.margin = unit(c(1, 5, 0.5, 0.5), "lines")) +
  scale_color_discrete(name = 'Name')
under20_graph

under30 <- filter(gather_data, count < 30000 & count > 20000)
under30_graph <- ggplot(data = under30, aes(x=date, y = count, group = artist_name)) + 
  geom_line(aes(color = artist_name)) +
  labs(title='Soundcloud Followers over Time', x="\nDate", y="Followers\n") +
  theme(legend.position = c(1, 1), 
        legend.justification = c(0,1),
        legend.key.width = unit(1, "lines"),
        plot.margin = unit(c(1, 5, 0.5, 0.5), "lines")) +
  scale_color_discrete(name = 'Name')
under30_graph
 

gather_data <- filter(gather_data, artist_name != 'XXXTENTACION')

p <- ggplot(data = gather_data, aes(x=date, y = count, group = artist_name)) + 
  geom_line(aes(color = artist_name)) +
  labs(title='Soundcloud Followers over Time', x="\nYear", y="Followers\n") +
  theme(legend.position = c(.01, .99), 
        legend.justification = c(0,1)) +
  scale_color_discrete(name = 'Name')
p

ggsave('followers_over_time.png', width=10, height=10, plot=p)

x <- filter(gather_data, artist_name == 'Pi\'erre Bourne' | 
              artist_name == '' | 
              artist_name == 'INDICA' |
              artist_name == 'OGxParker' |
              artist_name == 'SahBabii' |
              artist_name == 'Leven Kali' |
              artist_name == 'A.CHAL' |
              artist_name == '' |
              artist_name == '' |
              artist_name == '' |
              artist_name == '' |
              artist_name == '' |
              artist_name == '' |
              artist_name == '')
x

x_graph <- ggplot(data = x, aes(x=date, y = count, group = artist_name)) + 
  geom_line(aes(color = artist_name)) +
  labs(title='Soundcloud Followers over Time', x="\nDate", y="Followers\n") +
  theme(legend.position = c(1, 1), 
        legend.justification = c(0,1),
        legend.key.width = unit(1, "lines"),
        plot.margin = unit(c(1, 5, 0.5, 0.5), "lines")) +
  scale_color_discrete(name = 'Name')
x_graph

ggsave('select.png', width=10, height=10, plot=x_graph)


growth <- mutate(full_data, growth_percent = ((full_data[,ncol(full_data)] / full_data[,ncol(full_data)-5]) - 1) * 100 )
growth <- growth[order(growth$growth_percent),]
growth <- transform(growth, artist_name = reorder(artist_name, -growth_percent) )
growth
       
g <- ggplot(growth, aes(x=artist_name, y = growth_percent)) + geom_bar(stat = 'identity') + 
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
g

ggsave('soundcloud_growth.png', width=20, height=20, plot=g)

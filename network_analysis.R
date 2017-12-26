library(tidyverse)
library(stringr)
library(ggplot2)
library(igraph)
library(visNetwork) 
library(networkD3)
library(gtools)

#http://kateto.net/network-visualization

#Read Data
nodes <- read.csv("the_young_internet_nodes.csv", header=T, as.is=T)
links <- read.csv("the_young_internet_edges.csv", header=T, as.is=T)
nodes <- filter(nodes, artist != "NA")

nodes
links

#old count
#links <- group_by(links, to)
#count <- count(links, to)

#new pageRank
net <- graph_from_data_frame(links, directed = TRUE)
net
artist_rank <- page_rank(net, vids = V(net),
                         directed = TRUE, damping = 0.85, personalized = NULL, weights = NULL,
                         options = NULL)
artist_rank <- as.data.frame(artist_rank$vector)
#manually input column names
write.csv(artist_rank, file = "pagerank_score.csv", row.names = TRUE)
artist_rank <- read.csv("pagerank_score.csv", header=T, as.is=T)
artist_rank <- select(artist_rank, to = X, rank = artist_rank.vector)
artist_rank
####



count
to_ids <- select(nodes, to = id, artist = artist, followers = soundcloud_followers, type = type.label, url = soundcloud_url, growth = growth_percent, signed)
to_ids
merged <- merge(artist_rank, to_ids,all.x = TRUE)
merged
#### SCORE ####
merged <- mutate(merged, score =   (rank) * growth * 1000000000 )
####
merged <- merged[order(merged$score, decreasing = TRUE),]
#### TYPE ####
merged <- filter(merged, type == "Artist")
#merged <- filter(merged, location == "Atlanta")
#### SIGNED ####
merged <- filter(merged, signed == "no")
### Followers ###
merged <- filter(merged, followers > 3000)
### Rank ###
#merged <- head(merged, 30)
scores <- select(merged, id = to, score)
scores
scores <- merge(nodes, scores, by = "id", all.x = TRUE)
scores
scores <- select(scores, artist, score.y)
scores
nodes$score <- scores$score.y
nodes

write.csv(merged, file = "tyi_score.csv", row.names = TRUE)
write.csv(nodes, file = "the_young_internet_nodes.csv", row.names = FALSE)

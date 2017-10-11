setwd("~/Documents/the_young_internet")
library(tidyverse)
library(stringr)
library(ggplot2)

tyi_edges <- read.csv("the_young_internet_edges.csv", check.names = FALSE)
tyi_nodes <- read.csv("the_young_internet_nodes.csv", check.names = FALSE)
session_edges <- read.csv("following_session.csv", check.names = FALSE)
new_urls <- read.csv("new_urls.csv", check.names = FALSE)
total_edges <- read.csv("all_edges.csv", check.names = FALSE)

session_edges

from_ids <- select(tyi_nodes, from.id = id, from = soundcloud_url)
from_ids
session_ids <- merge(session_edges, from_ids, by = "from" )
session_ids
to_ids <- select(tyi_nodes, to.id = id, to = soundcloud_url)
to_ids
session_ids <- merge(session_ids, to_ids, by = "to")
session_ids

url <- setdiff(session_edges$to, tyi_nodes$soundcloud_url)
url <- tibble(url)
url

session_ids <- select(session_ids, from = from.id, to = to.id, weight, type)
session_ids

tyi_edges[,colSums(is.na(tyi_edges))<nrow(tyi_edges)]

tyi_edges <- tyi_edges[ , !duplicated(colnames(tyi_edges))]
tyi_edges <- select(tyi_edges, from, to, weight, type)
tyi_edges
tyi_edges <- rbind(session_ids, tyi_edges)
tyi_edges <- unique(tyi_edges)

new_urls <- rbind(new_urls, url)
new_urls <- unique(new_urls)
new_urls

total_edges <- rbind(total_edges, session_edges)
total_edges <- unique(total_edges)
total_edges

#
write.csv(total_edges, file = "all_edges.csv", row.names = FALSE)
write.csv(tyi_edges, file = "the_young_internet_edges.csv", row.names = FALSE)
write.csv(new_urls, file = "new_urls.csv", row.names = FALSE)
#



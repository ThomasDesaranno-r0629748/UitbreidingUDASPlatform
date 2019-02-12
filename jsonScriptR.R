library('rjson')
library(dplyr)
library(jsonlite)
library(rjson)

#dat = read.csv("csvdata\\2019-01_bme280.csv", header = TRUE, sep=";")
json_data <- fromJSON('all.json')
#json_data <- fromJSON("csvjson.json")



#df <- dat
df <- json_data
colnames(df) <- c("id", "type", "location", "lat", "lon", "time", "temperature", "humidity", "char")
#colnames(df) <- c("id", "type", "location", "lat", "lon", "time", "pressure", "altitude", "pressure_sealevel", "temperature", "humidity")

df <- df %>% separate(time, c("date", "time"), sep="T", fill = 'right')
df <- df[df$lat<=51, ]
df <- df[df$lat>=50, ]
df <- df[df$lon<=5, ]
df <- df[df$lon>=4, ]


uniqueId <- unique(df$id)
lastTimeMesurementDf <- data.frame()
for(i in 1:NROW(uniqueId)){  #NROW(uniqueId)
  dataset <- df[df$id == uniqueId[i], ]
  dataset <- dataset[order(dataset$date, decreasing = TRUE),]
  dataset <- dataset[order(dataset$time, decreasing = TRUE),]
  order(dataset$date, dataset$time)
  lastTimeMesurementDf <- rbind(lastTimeMesurementDf, dataset[1,])
}

exportJson <- toJSON(lastTimeMesurementDf, pretty=TRUE)
write(exportJson, "lastMesuraments.json")

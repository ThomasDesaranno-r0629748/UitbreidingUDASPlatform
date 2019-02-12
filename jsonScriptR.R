library('rjson')
library(dplyr)
library(jsonlite)


json_data <- fromJSON(file='all.json')

df <- lapply(json_data, function(play) # Loop through each "play"
{
  # Convert each group to a data frame.
  # This assumes you have 6 elements each time
  data.frame(matrix(unlist(play), ncol=9, byrow=T))
})

df <- do.call(rbind, df)
df <- df %>% separate(time, c("date", "time"), sep="T")
colnames(df) <- c("id", "type", "location", "lat", "lon", "time", "temp", "humidity", "char")


uniqueId <- unique(df$id)
lastTimeMesurementDf <- data.frame()
for(i in 1:11){
  dataset <- df[df$id == uniqueId[i], ]
  dataset <- dataset[order(dataset$date, decreasing = TRUE),]
  dataset <- dataset[order(dataset$time, decreasing = TRUE),]
  order(dataset$date, dataset$time)
  lastTimeMesurementDf <- rbind(lastTimeMesurementDf, dataset[1,])
}

exportJson <- toJSON(lastTimeMesurementDf, pretty=TRUE)
write(exportJson, "lastMesuraments.json")

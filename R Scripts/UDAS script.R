library(jsonlite)
all <- fromJSON("dummyData.json")
day <- fromJSON("dummyData24h.json")
twoDays <- fromJSON("dummyData2Days.json")
loc <- fromJSON("SensorLocaties.json")
allData <- list(all, day, twoDays, loc)
names(allData) <- c("allData", "dayData", "2DaysData", "sensorLocations")
export <- toJSON(allData)
write(export, "allData.json")

dummyData <- data.frame()
row <- sample(1:100,4,replace=F)
row <- append(row, 10)

dummyData <- data.frame(so2 = as.integer(), no2 = as.integer(), o3 = as.integer(), pm10 = as.integer(), deviceId= as.integer(), date = as.character(), time = as.character(), stringsAsFactors = FALSE)
date <- Sys.Date()
metingId <- 0
for(i in 1:10){
  for (j in 1:7){
    for(k in 1:4){
      metingId <- metingId + 1
      row <- sample(1:100,4,replace=F)
      row <- append(row, i)
      dataDate <-  as.character(date-j)
      row <- append(row, dataDate)
      row <- append(row, as.character(format(Sys.time()-(600*k), "%H:%M")))
      row <- append(row, metingId)
      row <- rbind(row, row)
      row <- as.data.frame(row, stringsAsFactors = FALSE)
      dummyData <- rbind(dummyData, row[1,])
    }
  }
}


names(dummyData) <- c("so2", "no2", "o3", "pm10","deviceId", "date", "time","metingId")

dummyData[1:5] <- lapply(dummyData[1:5], as.numeric)
dummyData$metingId <- as.numeric(dummyData$metingId)
exportJson <- toJSON(dummyData, pretty=TRUE)
write(exportJson, "dummyData.json")

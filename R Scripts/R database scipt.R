library(DBI)
library(sparklyr)
Sys.setenv(JAVA_HOME='C:\\Program Files\\Java\\jre1.8.0_151')
library(RJDBC)
library(tidyr)
library(plyr)
library(jsonlite)
drv <- JDBC("com.microsoft.sqlserver.jdbc.SQLServerDriver","C:\\Users\\Maarten Van den hof\\Downloads\\Accenture Docs\\Microsoft JDBC Driver 6.2 for SQL Server\\sqljdbc_6.2\\enu\\mssql-jdbc-6.2.2.jre8.jar")
drv <- JDBC("com.microsoft.sqlserver.jdbc.SQLServerDriver","E:\\Projects\\UitbreidingUDASPlatform\\R Scripts\\sqljdbc_6.2\\enu\\mssql-jdbc-6.2.2.jre8.jar")

conn <- dbConnect(drv, "jdbc:sqlserver://193.190.58.30", "snuffelpaal", "snuffelpaal")

# conn <- dbConnect(drv, "jdbc:sqlserver://193.190.58.30", "snuffelpaal", "snuffelpaal")

#then build a query and run it

sqlText <- paste("SELECT * FROM Metingen", sep="")

Metingen <- dbGetQuery(conn, sqlText)
Metingen <- Metingen %>% separate(date, c("date", "time"), sep=" ", fill = 'right')

exportJson <- toJSON(Metingen, pretty=TRUE)
write(exportJson, "DatabaseMetingen.json")

LaatsteMetingen <- Metingen[Metingen$date == Sys.Date(), ]
LaatsteMetingen <- LaatsteMetingen[order(LaatsteMetingen$time, decreasing = TRUE),]


exportJson <- toJSON(LaatsteMetingen[1,], pretty=TRUE)
write(exportJson, "LaatsteMetingen.json")


#Metingen om de 5min voor sensor 10
MetingenSensor10 <- Metingen[Metingen$date == Sys.Date(),]
MetingenSensor10 <- Metingen[Metingen$Deviceid == 10,]
MetingenSensor10$time <- gsub("\\..*","", MetingenSensor10$time) #millieseconden verwijderen
MetingenSensor10$time <- gsub('[^:]*$',"", MetingenSensor10$time) #Seconden verwijderen
MetingenSensor10$time <- gsub('.$',"", MetingenSensor10$time) #: verwijderen
JuisteTijden <- grep('[^:]5$', MetingenSensor10$time, value = TRUE) #Metingen pakken die eindigen op 5 -> metingen om de 10min
MetingenSensor10 <- MetingenSensor10[MetingenSensor10$time %in% JuisteTijden, ]
MetingenSensor10 <- ddply(MetingenSensor10, "time", function(z) tail(z,1))
MetingenSensor10 <- MetingenSensor10[order(MetingenSensor10$time, decreasing = FALSE),] #Ordenen van klein naar groot

exportJson <- toJSON(MetingenSensor10, pretty=TRUE)
write(exportJson, "MetingenSensor10.json")

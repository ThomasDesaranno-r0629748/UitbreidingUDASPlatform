library(DBI)
library(sparklyr)
Sys.setenv(JAVA_HOME='C:\\Program Files\\Java\\jre1.8.0_201')
library(RJDBC)
library(tidyr)
drv <- JDBC("com.microsoft.sqlserver.jdbc.SQLServerDriver","C:\\Users\\Maarten Van den hof\\Downloads\\Accenture Docs\\Microsoft JDBC Driver 6.2 for SQL Server\\sqljdbc_6.2\\enu\\mssql-jdbc-6.2.2.jre8.jar")

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

MetingenSensor10 <- Metingen[Metingen$date == Sys.Date(),]
MetingenSensor10 <- Metingen[Metingen$Deviceid == 10,]

exportJson <- toJSON(MetingenSensor10, pretty=TRUE)
write(exportJson, "MetingenSensor10.json")

lat<-c(50.933471,50.928063,50.930857,50.932385,50.927135,50.924951,50.927069,50.923334,50.926390,50.930399,50.930490,50.935476,50.936047,50.932265,50.929237,50.930953,50.926023,50.918839,50.928957,50.926217,50.921255,50.917671,50.940654,50.932589,50.929648,50.937926,50.934261,50.922217,50.935732,50.930636,50.938607,50.937728,50.930938,50.925388,50.928010,50.935442)

lon<-c(5.331897, 5.324434,5.332732,5.343030,5.345556,5.321018,5.326904,5.335597,5.317485,5.341612,5.329741,5.325955,5.318676,5.336000,5.335794,5.337670,5.339134,5.344845,5.349773,5.350385,5.349975,5.339901,5.334699,5.347298,5.356743,5.349373,5.355867,5.331327,5.340034,5.346273,5.333209,5.337989,5.321010,5.331060,5.342012,5.347134)

naam<-c("Vrijwilligersplein","Vredespark","Kruispunt Thonissenlaan","Kolonel Dusartplein","Kunstlaan","Runkstersteenweg punt1","Runkstersteenweg punt2","Samentuin De Tesch","VoetbalveldHVV","Persoonsstraat","Bampslaan","Plantenstraat","Kuringersteenweg","Minderbroederstraat","Havermarkt","Demerstraat","Toekomststraat","Luikersteenweg","Casterstraat","SintKatarinaplein","Kroonwinningsstraat","VanCaenegemlaan","Slachthuiskaai","SintJansplein","Voorstraat","Elfde-Liniestraat","Japanse Tuin","Sint-Truidersteenweg","Kempische steenweg","Maastrichtersteenweg","Lazarijstraat","Scheepvaartkaai","Spoorwegstraat","Boomkensstraat","Guffenslaan","Elfde-Liniestraat")

GPS_loc1<-cbind(lat,lon,naam)

GPS_loc1<-as.data.frame(GPS_loc1)

GPS_loc1$lat<-as.numeric(levels(GPS_loc1$lat))[GPS_loc1$lat];

GPS_loc1$lon<-as.numeric(levels(GPS_loc1$lon))[GPS_loc1$lon];

lat<-50.925012;

lon<-5.344373;

naam<-"Stadspark";

GPS_loc2<-cbind(lat,lon,naam)

GPS_loc2<-as.data.frame(GPS_loc2)

GPS_loc2$lat<-as.numeric(levels(GPS_loc2$lat))[GPS_loc2$lat];

GPS_loc2$lon<-as.numeric(levels(GPS_loc2$lon))[GPS_loc2$lon];
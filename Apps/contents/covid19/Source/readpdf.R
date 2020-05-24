
library(tabulizer)
library(purrr)
library("rvest")
library("stringr")

files <- list.files(pattern=".pdf")

i=102
df_list <- tabulizer::extract_tables(files[i],output="data.frame",header =F)
length(df_list)
tablenum <- 1



#~38
dat <- df_list[tablenum][[1]]
#38~
dat2 <- df_list[tablenum+1][[1]]
#46~
dat3 <- df_list[tablenum+2][[1]]
#46~
dat4 <- df_list[tablenum+3][[1]]
#46~
dat5 <- df_list[tablenum+4][[1]]
#95~
dat6 <- df_list[tablenum+5][[1]]


#arrenge china
#1-4
for (j in 1:nrow(df_list[tablenum][[1]])){
 if(substr(df_list[2][[1]][j,2],1,5) =="China" ){
    df_list[2][[1]][j,1] <-substr(df_list[2][[1]][j,2],1,5)
  }else{
    df_list[2][[1]][j,1] <-df_list[2][[1]][j,2]
  }
}


#del col
#1-4
dat <- dat[,-1]

dat <- dat[,-2]
dat <- dat[,-3]
dat <- dat[,-7]

dat2 <- dat2[,-3]
dat2 <- dat2[,-4]
dat3 <- dat3[,-3]
dat3 <- dat3[,-4]
dat4 <- dat4[,-3]
dat4 <- dat4[,-4]
dat5 <- dat5[,-3]
dat5 <- dat5[,-4]
dat6 <- dat5[,-3]
dat6 <- dat5[,-4]




#del  row
dat[1:4,] <- NA
dat <- na.omit(dat)
rownames(dat) <- 1:nrow(dat)



#split
#-30,31~
for (k in 1:nrow(dat)){
  dat[k,2] <- strsplit(dat[,2]," ")[k][[1]][1]
 # dat[k,3] <- strsplit(dat[,3]," ")[k][[1]][1]
}

#30
for (k in 1:nrow(dat)){
  str <- strsplit(dat[,2]," ")[k][[1]]
  len_str <- length(str)
  if(len_str == 1){
    dat2[k,2] <- str[1]
    }else if(len_str >= 3){
    dat2[k,1] <- str_c(str[1:(len_str-1)],collapse=" ")
    dat2[k,2] <- str[len_str]
#    dat2[k,3] <- strsplit(dat[,3]," ")[k][[1]][1]
  }else{
    dat[k,2] <- str[1]
    dat[k,3] <- str[len_str]
#    dat2[k,3] <- strsplit(dat[,3]," ")[k][[1]][1]
  }
}




dat[14,1]　<- "Lao People's Democratic Republic"
dat[24,1]　<- "Northern Mariana Islands (Commonwealth of the)"


dat2
dat2[35,1] <- "Bosnia and Herzegovina"

dat3
dat3[8,1]　<- "Kosovo"
dat3[31,1] <- "Iran (Islamic Republic of)"

dat4
dat4[6,1] <- "occupied Palestinian territory"
dat4[9,1] <- "United States of America"
dat4[2,1] <- "Venezuela (Bolivarian Republic of)"
dat4[4,1] <- "Bolivia (Plurinational State of)"
dat4[23,1] <- "Saint Vincent and the Grenadines"
dat4[31,1] <- "United States Virgin Island"
dat4[40,1] <- "Turks and Caicos Island"


dat5
dat5[3,1] <- "Democratic Republic of the Congo"
dat5[17,1] <- "United Republic of Tanzania"
dat5[28,1] <- "Central African Republic"

#rename colunm
#1-4
colname <- c("contry","region","confirmed")
#6-
colname <- c("contry","confirmed","death","Transmission classification","Days since last reported case")

names(dat) <- colname
names(dat2) <- colname
names(dat3) <- colname
names(dat4) <- colname
names(dat5) <- colname



#rbind
dat <- rbind(dat,dat2)
dat <- rbind(dat,dat3)
dat <- rbind(dat,dat4)
dat <- rbind(dat,dat5)



dat <- na.omit(dat)
rownames(dat) <- 1:nrow(dat)


#add date colunm
dat <- transform(dat,date = substr(files[i],1,8))

#write csv
write.csv(dat,paste(substr(files[i],1,8),".csv",sep=""))                                



#-csv------------------------
library(dplyr)
library(foreign)

setwd("~/Documents/GitHub/cesium/covid/Source/country")

cont <- read.dbf("shp/country.dbf")
cont <- select(.data = cont, country,xcoord, ycoord)


files <- list.files(pattern=".csv")


fact ="confirmed"
for (i in 1 : length(files)){ 

dat <- read.csv(files[i])
names(dat) <- sub("contry","country",names(dat))

dat <- select(.data = dat, country, fact)
names(dat) <- c("country",substr(files[i],1,8))


cont <- merge(cont,dat,by.x="country",by.y="country",all=T)
cont <- cont[0:300,]

}
write.csv(cont,"country_confirmed.csv")

names(cont)

#aa<- na.omit(cont)
cont[240:300,1]

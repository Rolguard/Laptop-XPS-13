employee_data <- read.csv("https://raw.githubusercontent.com/dat-analytics/data_assess_1_t2_2022/main/z5361153.csv")
# Create box plot 1
col1 = employee_data[,28]
col2 = employee_data[,3]
max(col1)
min(col1)
median(col1)
boxplot(col1, data=employee_data, xlab="Performance",
        main="Job Performance", horizontal=TRUE, col=c("coral"))
quantile(col1, c(0.25, 0.75))

# Create box plot 2
par(mar=c(10,5,2,2))
boxplot(col1 ~ col2, data=employee_data, xlab="",
        ylab="Job Performance", main="Job Performance vs Department",
        las=2, cex.axis=0.8, cex.lab=0.8, cex.main=1, col="coral1")

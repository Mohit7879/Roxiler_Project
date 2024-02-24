GET
API to initialize the database.
endpoint : http://localhost:3000/api/addData

--------------------------------

GET
API to list the all transactions
endpoint : http://localhost:3000/api/transactions/allTransactions?month=june&page=5&perPage=1


NOTE :
month value should be among these months ( january, february, march, april, may, june, july, august, september, october, november, december)
capital or small otherwise you will get error "invalid month" 


-----------------------------------

Get
 API for statistics

 endpoint : http://localhost:3000/api/statistics/allstatistics/june

 NOTE :
month value should be among these months ( january, february, march, april, may, june, july, august, september, october, november, december)
capital or small otherwise you will get error "invalid month" 


 -------------------------------------


GET
 API for bar chart of products sold on different price range
 end point : http://localhost:3000/api/barchart/bar-chart/june

NOTE :
month value should be among these months ( january, february, march, april, may, june, july, august, september, october, november, december)
capital or small otherwise you will get error "invalid month" 

Note : 
1) response is according to price range .
2) price range is taken 500



 -------------------------------------

GET
  API for pie chart
  end point : http://localhost:3000/api/piechart/pie-chart/june

NOTE :
month value should be among these months ( january, february, march, april, may, june, july, august, september, october, november, december)
capital or small otherwise you will get error "invalid month" 

------------------------------------------


GET
API which fetches the data from  3 APIs mentioned above,

end point : http://localhost:3000/api/allApi/allApidata/june

 NOTE :
month value should be among these months ( january, february, march, april, may, june, july, august, september, october, november, december)
capital or small otherwise you will get error "invalid month" 

----------------------------------------------

Some points

1) Errors are handled using error handler module and middleware
2) Months in words are changed to months in number using getMonth module created in utility folder


  

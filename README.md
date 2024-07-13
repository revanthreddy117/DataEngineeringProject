# Data Engineer Project

## Description
This project involves building an application to scrape, store, and visualize data from the [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) Trip Record Data 

## Contributed by Abhishek Pandey and Revanth Reddy.



## Steps

1. **Web Scraping to download data**
2. **Ingesting data to MongoDB**
3. **Backend Development for Rest API**
4. **Frontend Development**
   
**Step** 1. **Web Scraping to download data**
   - Libraries or modules required in this step are `requests`, `bs4`, `BeautifulSoup`, `pandas`, `os`, `re`, and `pyarrow`.
   - Web scraping refers to the automated process of extracting data from websites, typically using scripts or software tools to parse and retrieve information from web pages. It's commonly used for gathering large amounts of data for various purposes such as research, market analysis, or content aggregation.
   - Website: [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)
   - From the above-mentioned website, we have to download 2019, February and March data.
   - With the response of the GET request, if it is successful, parse the content to find parquet files and find all links to February and March 2019, and download them, storing them into our directory.

**Step** 2. **Ingesting data into MongoDB**
   - MongoDB is a document-oriented NoSQL database designed to store and manage unstructured data. It doesn’t require a predefined schema. For SQL databases we have to define schema for every file, so MongoDB removes that need to define schema.
   - Using the `pymongo` library to connect to a local MongoDB instance.
   - Ingesting all data from the downloaded files into a single collection.

   ![Screenshot (44)](https://github.com/user-attachments/assets/ad955524-857c-4f12-92db-1ec72616bbd1)


**Step** 3. **Creating REST API**
   - For the backend, we have used Express and Node.js.
   - We have created 10 REST APIs to interact with the data.
     
![Screenshot (136)](https://github.com/user-attachments/assets/05e7490e-b086-4843-a5b1-b44bb6583264)
![Screenshot (137)](https://github.com/user-attachments/assets/89f7fc3b-bc65-4e27-919f-73e5084655e7)


**Step** 4. **Frontend Development**
   - For the frontend, we have used HTML, CSS, and JavaScript.
    ![Screenshot (128)](https://github.com/user-attachments/assets/960f6493-cd99-4aff-b7c7-e382d27bac3f)
    ![Frontend Image]![Screenshot (130)](https://github.com/user-attachments/assets/fa0b8c5c-205d-4dff-89d9-efbc5a4a0f6c)
    ![Frontend Image]![Screenshot (131)](https://github.com/user-attachments/assets/7fb9e81e-4af5-4a23-8ad4-dae0794c0d0f)



    

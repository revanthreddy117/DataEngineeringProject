# Data Engineer Project

## Description
This project involves building an application to scrape, store, and visualize data from the [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) Trip Record Data 



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
   - MongoDB is a document-oriented NoSQL database designed to store and manage unstructured data. It doesn’t require a predefined schema.
   - Using the `pymongo` library to connect to a local MongoDB instance.
   - Ingesting all data from the downloaded files into a single collection.

   ![MongoDB Image]([Screenshot (44)](https://github.com/user-attachments/assets/2b61406e-21ab-4a79-8a67-370281fbd381)
end-image.png)

**Step** 3. **Creating REST API**
   - For the backend, we have used Express and Node.js.
   - We have created 10 REST APIs to interact with the data.

**Step** 4. **Frontend Development**
   - For the frontend, we have used HTML, CSS, and JavaScript.

    

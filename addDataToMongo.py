import os
import pandas as pd
import pyarrow.parquet as pq
import pymongo
 
# MongoDB connection details
mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["mynewdb"]
 
# Directory where Parquet files are saved
local_directory = './data'
 
# Get the MongoDB collection
collection = db["nyc_tlc_data"]
 
def process_and_insert(file_name, batch_size=10000):
    local_file_path = os.path.join(local_directory, file_name)
    print(f"Processing {local_file_path}...")
    # Load the Parquet file into pandas DataFrame
    df = pq.read_table(local_file_path).to_pandas()
 
    # Convert all timestamp columns to strings to avoid casting issues
    for col in df.select_dtypes(include=['datetime64[ns]']):
        df[col] = df[col].astype(str)
    # Convert columns with 'timestamp' in the name to strings
    for col in df.columns:
        if 'timestamp' in col:
            df[col] = df[col].astype(str)
    # Convert the DataFrame to a dictionary
    data_dict = df.to_dict("records")
 
    # Insert data in batches to MongoDB
    for i in range(0, len(data_dict), batch_size):
        batch = data_dict[i:i + batch_size]
        collection.insert_many(batch, ordered=False)  # Set ordered=False for faster insertion
        print(f"Inserted {len(batch)} records from {file_name}")
 
    print(f"Completed processing {file_name}")
 
# Get the list of Parquet files
parquet_files = [f for f in os.listdir(local_directory) if f.endswith(".parquet")]
 
# Process each file sequentially
for file_name in parquet_files:
    process_and_insert(file_name)
 
print("All files have been processed and ingested into MongoDB.")

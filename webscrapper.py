import requests
from bs4 import BeautifulSoup
import os
 
# URL of the webpage to scrape
url = 'https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page'
 
# Directory to save the parquet files
download_dir = 'parquet_files'
os.makedirs(download_dir, exist_ok=True)
 
# Function to download a file
def download_file(file_url, download_dir):
    local_filename = os.path.join(download_dir, file_url.split('/')[-1])
    with requests.get(file_url, stream=True, verify=False) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename
 
# Fetch the webpage
response = requests.get(url, verify=False)
response.raise_for_status()
 
# Parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')
 
# Extract all links
links = soup.find_all('a', href=True)
 
# Filter links for February and March 2019 Parquet files
parquet_links = []
for link in links:
    href = link['href']
    if '2019' in href and ('02' in href or '03' in href) and href.endswith('.parquet'):
        parquet_links.append(href)
 
# Download the parquet files
for link in parquet_links:
    if link.startswith('/'):
        link = 'https://www.nyc.gov' + link
    file_path = download_file(link, download_dir)
    print(f'Downloaded {file_path}')

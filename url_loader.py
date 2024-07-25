import requests
from bs4 import BeautifulSoup

def fetch_wikipedia_content(url):
    response = requests.get(url)
    if response.status_code == 200:
        page_content = response.content
        soup = BeautifulSoup(page_content, 'html.parser')
        return soup
    else:
        return None

def summarize_content(soup):
    summary = ''
    paragraphs = soup.find_all('p')  # Extracting all paragraphs
    for paragraph in paragraphs:
        summary += paragraph.get_text()
    return summary

url = "https://en.wikipedia.org/wiki/Hitler_family"
soup = fetch_wikipedia_content(url)
if soup:
    summary = summarize_content(soup)
    print("Summary of the content:")
    print(summary)
else:
    print("Failed to retrieve the content.")

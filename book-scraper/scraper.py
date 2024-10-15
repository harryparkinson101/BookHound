import requests
from bs4 import BeautifulSoup
import json  # Import the JSON module

# Base URLs for the categories
categories = {
    "1920s": "https://johnatkinsonbooks.co.uk/book-category/1920s-first-edition-books/page/",
    "pre-1920s": "https://johnatkinsonbooks.co.uk/book-category/pre-1920s/page/",
    "1930s": "https://johnatkinsonbooks.co.uk/book-category/1930s/page/",
    "1940s": "https://johnatkinsonbooks.co.uk/book-category/1940s/page/",
    "1950s": "https://johnatkinsonbooks.co.uk/book-category/1950s/page/",
    "1960s": "https://johnatkinsonbooks.co.uk/book-category/1960s/page/",
    "1970s": "https://johnatkinsonbooks.co.uk/book-category/1970s/page/",
    "1980s": "https://johnatkinsonbooks.co.uk/book-category/1980s/page/",
    "1990s": "https://johnatkinsonbooks.co.uk/book-category/1990s/page/",
    "2000s": "https://johnatkinsonbooks.co.uk/book-category/2000s/page/",
    "Agatha Christie": "https://johnatkinsonbooks.co.uk/book-category/agatha-christie/page/",
    "Autobiography/Biography": "https://johnatkinsonbooks.co.uk/book-category/autobiography-and-biography/page/",
    "Birthday Gifts": "https://johnatkinsonbooks.co.uk/book-category/gift-ideas/birthday-gifts/page/",
    "Books For Christmas": "https://johnatkinsonbooks.co.uk/book-category/books-for-christmas/page/",
    "Books Into Films": "https://johnatkinsonbooks.co.uk/book-category/the-books-you-didnt-know-were-films-but-you-did-know-somehow-and-some-you-thought-were-just-films-and-had-nothing-to-do-with-books/page/",
    "Books Into TV": "https://johnatkinsonbooks.co.uk/book-category/books-into-tv/page/",
    "Books Of The Great War": "https://johnatkinsonbooks.co.uk/book-category/books-of-the-great-war/page/",
    "Books under £99": "https://johnatkinsonbooks.co.uk/book-category/books-under-99/page/",
    "Charles Dickens": "https://johnatkinsonbooks.co.uk/book-category/charles-dickens/page/",
    "Children's and Christening Gift Ideas": "https://johnatkinsonbooks.co.uk/book-category/childrens-and-christening-gift-ideas/page/",
    "Crime": "https://johnatkinsonbooks.co.uk/book-category/crime/page/",
    "Gift Ideas": "https://johnatkinsonbooks.co.uk/book-category/gift-ideas/page/",
    "Gifts For Her": "https://johnatkinsonbooks.co.uk/book-category/gifts-for-her/page/",
    "Gifts For Him": "https://johnatkinsonbooks.co.uk/book-category/gifts-for-him/page/",
    "Ian Fleming": "https://johnatkinsonbooks.co.uk/book-category/ian-fleming/page/",
    "J K Rowling": "https://johnatkinsonbooks.co.uk/book-category/j-k-rowling/page/",
    "James Bond": "https://johnatkinsonbooks.co.uk/book-category/james-bond/page/",
    "John Le Carre": "https://johnatkinsonbooks.co.uk/book-category/john-le-carre/page/",
    "Julia Donaldson": "https://johnatkinsonbooks.co.uk/book-category/julia-donaldson/page/",
    "Poetry": "https://johnatkinsonbooks.co.uk/book-category/poetry/page/",
    "Proof Copies": "https://johnatkinsonbooks.co.uk/book-category/proof-copies/page/",
    "Roald Dahl": "https://johnatkinsonbooks.co.uk/book-category/roald-dahl/page/",
    "Sale": "https://johnatkinsonbooks.co.uk/book-category/sale/page/",
    "Sets Of Books": "https://johnatkinsonbooks.co.uk/book-category/sets-of-books/page/",
    "Showcase": "https://johnatkinsonbooks.co.uk/book-category/showcase/page/",
    "Signed Titles": "https://johnatkinsonbooks.co.uk/book-category/signed-titles/page/",
    "Sport": "https://johnatkinsonbooks.co.uk/book-category/sport/page/",
    "Stephen King": "https://johnatkinsonbooks.co.uk/book-category/stephen-king/page/",
    "The Booker Prize": "https://johnatkinsonbooks.co.uk/book-category/the-booker-prize/page/",
    "The Douglas Highton Collection": "https://johnatkinsonbooks.co.uk/book-category/the-douglas-highton-collection/page/",
    "Uncategorized": "https://johnatkinsonbooks.co.uk/book-category/uncategorized/page/",
    "Children's Books": "https://johnatkinsonbooks.co.uk/book-category/childrens-books/page/",
}

# Function to scrape books from a single page for a given category
def scrape_books(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return []
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    books = []

    # Find all product items on the page
    product_items = soup.find_all('li', class_='product-col')

    for item in product_items:
        title_tag = item.find('h3', class_='woocommerce-loop-product__title')
        price_tag = item.find('span', class_='woocommerce-Price-amount')
        img_tag = item.find('img', class_='wp-post-image')
        
        # Extract title, price, and image URL
        if title_tag and price_tag and img_tag:
            book = {
                'title': title_tag.get_text(strip=True),
                'price': price_tag.get_text(strip=True),
                'image_url': img_tag['src'],
                'category': url.split('/')[-4]  # Extract category from the URL
            }
            books.append(book)

    return books

# Function to scrape all pages for a given category
def scrape_all_books(category_name, base_url):
    all_books = []
    page_number = 1

    while True:
        print(f"Scraping {category_name} page {page_number}...")
        url = f"{base_url}{page_number}/"
        books = scrape_books(url)
        
        if not books:  # Break the loop if no books are found
            print(f"No more books found in {category_name}. Exiting.")
            break
        
        all_books.extend(books)
        page_number += 1
    
    return all_books

# Scrape books for all categories
all_books = []
for category_name, base_url in categories.items():
    category_books = scrape_all_books(category_name, base_url)
    all_books.extend(category_books)

# Output the results
for book in all_books:
    print(f"Category: {book['category']}, Title: {book['title']}, Price: {book['price']}, Image URL: {book['image_url']}")

# Save the data to a JSON file
with open('books.json', 'w') as json_file:
    json.dump(all_books, json_file, indent=4)

print("Scraping completed. Data saved to 'books.json'.")

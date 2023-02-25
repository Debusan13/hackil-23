from dotenv import load_dotenv
load_dotenv('.envrc')

import os
import csv

from pymongo import MongoClient


def get_database():
   client = MongoClient(os.environ.get('CONNECTION_URL'))
   return client['db']

  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    db = get_database()

    with open('uiuc-gpa-dataset.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        all_rows = []
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
                continue
            all_rows.append(row)
            line_count += 1
        
        db['gpa'].insert_many(all_rows)
        print(f'Inserted {line_count} lines.')

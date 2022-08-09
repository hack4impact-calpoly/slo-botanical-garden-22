import pandas as pd 

csvPath = "/Users/mckennareed/Downloads/logged_volunteer_data (100).csv"

df = pd.read_csv(csvPath)
df['hours'] = pd.to_numeric(df["hours"])
sums = df.groupby(['username'])['hours'].sum()
sums.to_csv("sums.csv")

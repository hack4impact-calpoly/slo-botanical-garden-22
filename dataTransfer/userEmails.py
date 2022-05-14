import pandas as pd
import numpy as np

if __name__ == '__main__':
    df = pd.read_csv("rawI.csv")
    for index, row in df.iterrows():
        print(row["username"])
        if pd.isna(row["username"]):
            row["username"] = row["email"]
    df.to_csv("users.csv")

    # with open ('rawI.csv', 'r+') as f:
    #     data = json.load(f)
    #     count = 1
    #     batch = 1
    #     for h in data['values']:
    #         newData['logged_hours'].append(formatHoursRequest(h))
    #         if count % 25 == 0 or count == 6435:
    #             with open("./HoursFormatted" + str(batch) + ".json", 'w') as outfile:
    #                 outfile.write(json.dumps(newData))
    #             batch += 1
    #             newData['logged_hours'] = []
    #         count += 1
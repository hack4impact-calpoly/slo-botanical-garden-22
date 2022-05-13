import json
from dateutil.parser import parse
import random

def formatHoursRequest(h):
    print(h)
    timestamp = parse(h[4]).timestamp()
    return { 
        "PutRequest": { 
            "Item": {
                "activity": {"S":str(h[0])},
                "description": {"S":str(h[1])},
                "hours": {"S":str(h[2])},
                "supervisor": {"S":str(h[3])},
                "date": {"S":str(h[4])},
                "username": {"S":str(h[5])},
                "primary_id": {"S":str(random.random() * parse(h[4]).timestamp())},
                "volunteerCount": {"S":"Not Recorded"},
                "volunteer": {"S":"From Pre Website Update"}
            }
        }
    }

if __name__ == '__main__':
    newData = {}
    newData['logged_hours'] = []
    with open ('loggedHoursRaw.json', 'r+') as f:
        data = json.load(f)
        count = 1
        batch = 1
        for h in data['values']:
            newData['logged_hours'].append(formatHoursRequest(h))
            if count % 25 == 0 or count == 6435:
                with open("./HoursFormatted" + str(batch) + ".json", 'w') as outfile:
                    outfile.write(json.dumps(newData))
                batch += 1
                newData['logged_hours'] = []
            count += 1
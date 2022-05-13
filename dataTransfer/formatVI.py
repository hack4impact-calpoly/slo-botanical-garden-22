import json

def formatPersonRequest(p):
    hours = 0
    if (p[24] != "" and p[24] != None):
        hours = str(p[24])
    
    return { 
        "PutRequest": { 
            "Item": {
                "username": {"S":str(p[16])},
                "First Name": {"S":p[17]}, 
                "Last Name": {"S":p[18]}, 
                "Email": {"S":p[19]},
                "Primary Phone": {"S":p[4]},
                "Secondary Phone": {"S": "N/A"},
                "Birth_date": { "S":str(p[1])},
                "Medical_Conditions": {"S":p[3]}, 
                "Photo-Permission": {"S":str(p[9])},
                "Emergency_Contact": {"S":p[5]},
                "Emergency_Contact_Phone": {"S":p[6]}, 
                "Volunter_Waiver_and_Release": {"S": "False"},
                "Covid_Waiver_and_Release": {"S": "False"}, 
                "Group": {"S":p[10]}, 
                "hourGoal": {"S": "Not Specified"},
                "Safety Training Status": {"S": "False"},
                "totalHours": {"S": str(hours)}, 
                "Community Service": {"S": "False"},
                "is_Admin":  {"S":str(p[20])},
                "liveScanned": {"S": "False"},
                "mailing_address": {"S": "Not Specified"},
            }
        }
    }

if __name__ == '__main__':
    newData = {}
    newData['volunteers_individual'] = []
    with open ('allVolunteersRaw.json', 'r+') as f:
        data = json.load(f)
        count = 1
        batch = 1
        for p in data['values']:
            newData['volunteers_individual'].append(formatPersonRequest(p))
            if count % 25 == 0 or count == 481:
                with open("volunteersFormatted" + str(batch) + ".json", 'w') as outfile:
                    outfile.write(json.dumps(newData))
                batch += 1
                newData['volunteers_individual'] = []
            count += 1


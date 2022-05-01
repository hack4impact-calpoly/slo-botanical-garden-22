#!/bin/bash

for ((i=2; i<=249; i++))
    do 
        fileName="HoursFormatted$i.json"
        aws dynamodb batch-write-item --request-items file://$fileName
        echo " $i Batch Finished "
    done
#!/bin/bash

for ((i=146; i<=146; i++))
    do 
        fileName="HoursFormatted$i.json"
        aws dynamodb batch-write-item --request-items file://$fileName
        echo " $i Batch Finished "
    done
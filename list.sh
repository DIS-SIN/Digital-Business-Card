#!/bin/bash

FILES=/home/darren/dev/Digital-Business-Card/people/*
if [ -e ppl.json ]
then
	rm ppl.json
fi
echo "[" >> ppl.json
for file in $FILES

do
	

	temp=($file"/info.json")
	cat $temp >> ppl.json
	
	echo "," >> ppl.json
	
done
echo "]" >> ppl.json

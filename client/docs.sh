#!/bin/bash
red="\033[0;31m";
green="\033[0;32m";
yellow="\033[1;33m";
default="\033[0m";

if [ -d docs ]
then
#echo -e "$red directory /docs/ will be deleted"
#rm -r docs
#echo -e "$red directory /docs/ has been deleted"
echo -e "$default ---------------------------------"
#echo -e "$yellow directory /docs/ will be created"
#mkdir docs
#echo -e "$green directory /docs/ has been created"
else
echo -e "$red directory /docs/ does not exist"
echo -e "$yellow directory /docs/ will be created"
mkdir docs
echo -e "$green directory /docs/ has been created"
fi



echo -e "$default ---------------------------"
echo " copying files & directories"
echo " ---------------------------"

if [ -d fonts ]
then
cp -r fonts/ docs/
echo -e "$green copied /fonts/ >>> /docs/"
else
echo -e "$red !!! directory /fonts/ does not exist"
fi

if [ -d images ]
then
cp -r images/ docs/
echo -e "$green copied /images/ >>> /docs/"
else
echo -e "$red !!! directory /images/ does not exist"
fi

if [ -d js ]
then
cp -r js/ docs/
echo -e "$green copied /js/ >>> /docs/"
else
echo -e "$red !!! directory /js/ does not exist"
fi

if [ -d css ]
then
cp -r css/ docs/
echo -e "$green copied /css/ >>> /docs/"
else
echo -e "$red !!! directory /css/ does not exist"
fi

if [ -d vendor ]
then
cp -r vendor/ docs/
echo -e "$green copied /vendor/ >>> /docs/"
else
echo -e "$red !!! directory /vendor/ does not exist"
fi

if [ -e index.html ]
then
cp -t docs/ index.html
echo -e "$green copied /index.html/ >>> /docs/"
else
echo -e "$red !!! file /index.html/ does not exist"
fi
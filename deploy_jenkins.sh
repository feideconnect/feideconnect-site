#!/usr/bin/env bash
set -e # halt script on error
app=$(jq -r .name nova.config.json)
oldapp="${app}-old"
domain="feideconnect.no"

echo "Ready to deploy updated version of ${domain}"


. ~/cf-login.sh
cf target -o system -s prod

gem install jekyll
gem install rouge

npm install
node_modules/bower/bin/bower install --config.interactive=false -p
if cf app "${app}" |egrep -q '#.*running'
then
    first='n'
    if cf app "${oldapp}"
    then
        cf delete -f "${oldapp}"
    fi
    cf rename "${app}" "${oldapp}"
else
    first='y'
fi
node_modules/grunt-cli/bin/grunt publish

cf map-route "${app}" "${domain}"

if [ "${first}" = 'n' ]
then
    cf unmap-route "${oldapp}" "${domain}"
    cf stop "${oldapp}"
fi

echo "Done."


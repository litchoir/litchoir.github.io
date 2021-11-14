#!/bin/bash
aws s3 cp ./all.json s3://lc-admin-website-dynamic-assets/data/all.json --cache-control "no-cache"
#!/bin/sh
pushd backend
npm run db &
npm run dev &
popd
pushd frontend
npm run dev
popd
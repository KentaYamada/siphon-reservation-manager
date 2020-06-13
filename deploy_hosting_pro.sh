#
# firebase deploy hosting script (To production server)
#
npm run build
firebase use gamoyon-reservation-c5cae
firebase deploy --only hosting

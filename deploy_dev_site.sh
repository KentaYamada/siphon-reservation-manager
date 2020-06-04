#
# firebase deploy hosting script (To dev server)
#
npm run build:dev
firebase use siphon-reservation-manager-dev
firebase deploy --only hosting

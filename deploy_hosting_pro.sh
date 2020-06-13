#
# firebase deploy hosting script (To production server)
#
source ./.env.production
npm run build
firebase use $FIREBASE_PROJECT_ID
firebase deploy --only hosting

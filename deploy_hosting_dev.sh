#
# firebase deploy hosting script (To dev server)
#
source ./.env.development
npm run build:dev
firebase use $FIREBASE_PROJECT_ID
firebase deploy --only hosting

COMMIT=${TRAVIS_COMMIT::8}
SANITIZED_BRANCH=$(echo $TRAVIS_BRANCH|sed 's|/|-|g')
REPO=sheltertechsf/askdarcel-web

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

if [[ -n "$TRAVIS_TAG" ]]; then
    TAG="$TRAVIS_TAG"
else
    if [ "$SANITIZED_BRANCH" == "master" ]; then
        TAG="latest"
    fi
fi

echo "{
  \"commit\": \"$COMMIT\",
  \"image\": \"$TAG\",
  \"build\": \"$TRAVIS_BUILD_NUMBER\"
}" > version.json

if [[ -n "$TAG" ]]; then
   docker build -f Dockerfile -t $REPO:$TAG .
   echo "Pushing tag for '$TAG'"
   docker push $REPO
fi
